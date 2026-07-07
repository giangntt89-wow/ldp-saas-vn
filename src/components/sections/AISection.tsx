'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Route, ShoppingCart, AlertTriangle, Camera, Sparkles, X } from 'lucide-react';

/* ─── Left column: feature list ─── */
const aiFeatures = [
  { icon: TrendingUp, title: 'Dự báo Nhu cầu', desc: 'Dự đoán nhu cầu theo từng SKU, khu vực & mùa vụ.' },
  { icon: Route, title: 'Tối ưu Lộ trình', desc: 'Tự động lên lộ trình để phủ tối đa điểm bán.' },
  { icon: ShoppingCart, title: 'Gợi ý Đơn hàng', desc: 'Đề xuất đặt hàng thông minh theo từng điểm bán, từng lượt viếng thăm.' },
  { icon: AlertTriangle, title: 'Phát hiện Bất thường', desc: 'Cảnh báo tức thì thất thoát, gian lận & sai lệch bất thường.' },
];

/* ─── Panel 1: shelf product icons ─── */
function MilkIcon() {
  return (
    <svg viewBox="0 0 32 48" fill="none" className="w-full max-w-[30px] h-auto drop-shadow-[0_3px_5px_rgba(0,0,0,0.45)]">
      <path d="M6 14 L16 4 L26 14 V44 Q26 46 24 46 H8 Q6 46 6 44 Z" fill="#E0F2FE" />
      <path d="M6 14 L16 4 L26 14 H6 Z" fill="#BAE6FD" />
      <rect x="6" y="24" width="20" height="12" fill="#3B82F6" />
      <circle cx="16" cy="30" r="3" fill="#FFFFFF" />
    </svg>
  );
}
function ColaIcon() {
  return (
    <svg viewBox="0 0 32 48" fill="none" className="w-full max-w-[30px] h-auto drop-shadow-[0_3px_5px_rgba(0,0,0,0.45)]">
      <rect x="7" y="10" width="18" height="34" rx="2" fill="#EF4444" />
      <ellipse cx="16" cy="10" rx="9" ry="3" fill="#D1D5DB" />
      <ellipse cx="16" cy="44" rx="9" ry="3" fill="#B91C1C" />
      <rect x="7" y="20" width="18" height="10" fill="#FFFFFF" />
      <path d="M12 24 C14 22 18 22 20 24" stroke="#EF4444" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
function JuiceIcon() {
  return (
    <svg viewBox="0 0 32 48" fill="none" className="w-full max-w-[30px] h-auto drop-shadow-[0_3px_5px_rgba(0,0,0,0.45)]">
      <rect x="8" y="14" width="16" height="30" rx="1" fill="#F97316" />
      <path d="M8 14 L12 10 H24 L20 14 Z" fill="#FDBA74" />
      <circle cx="16" cy="24" r="4" fill="#FEF08A" />
      <path d="M18 6 L16 12" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
function WaterIcon() {
  return (
    <svg viewBox="0 0 32 48" fill="none" className="w-full max-w-[30px] h-auto drop-shadow-[0_3px_5px_rgba(0,0,0,0.45)]">
      <rect x="13" y="4" width="6" height="6" rx="1" fill="#3B82F6" />
      <path d="M11 10 Q16 10 21 10 L23 18 V44 Q23 46 21 46 H11 Q9 46 9 44 V18 Z" fill="#67E8F9" opacity={0.8} />
      <rect x="9" y="24" width="14" height="10" fill="#0EA5E9" />
      <path d="M12 27 H20" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

const shelfRows = [
  [MilkIcon, MilkIcon, ColaIcon, ColaIcon, JuiceIcon, JuiceIcon],
  [WaterIcon, WaterIcon, WaterIcon, ColaIcon, ColaIcon, ColaIcon],
  [JuiceIcon, JuiceIcon, MilkIcon, WaterIcon, WaterIcon, WaterIcon],
];

/* ─── Panel 1: scan cycle state machine (scan line → flash → success popup → repeat) ─── */
function useShelfScan() {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [runId, setRunId] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runScan = useCallback(() => {
    clearTimers();
    setRunId((v) => v + 1);
    setPhase('scanning');
    timersRef.current.push(
      setTimeout(() => {
        setPhase('success');
        timersRef.current.push(
          setTimeout(() => {
            setPhase('idle');
            timersRef.current.push(setTimeout(runScan, 2200));
          }, 3000)
        );
      }, 1700)
    );
  }, [clearTimers]);

  useEffect(() => {
    timersRef.current.push(setTimeout(runScan, 1200));
    return clearTimers;
  }, [runScan, clearTimers]);

  return { phase, runId, triggerScan: runScan };
}

function DisplayScanPanel() {
  const { phase, runId, triggerScan } = useShelfScan();
  const scanning = phase === 'scanning';

  return (
    <div>
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg,#07101e,#0b1828)' }}>
        <div className="flex flex-col gap-1 p-4 pb-2">
          {shelfRows.map((row, ri) => (
            <div key={ri} className="flex items-end gap-1.5 pb-2.5 px-1.5 pt-1 border-b-4 border-white/20 min-h-[66px]">
              {row.map((Icon, ci) => (
                <div key={ci} className="flex-1 min-w-0 flex items-end justify-center">
                  <Icon />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Scan overlay: corner brackets + moving line */}
        <div className={`absolute inset-0 pointer-events-none z-[5] transition-opacity duration-300 ${scanning ? 'opacity-100' : 'opacity-0'}`}>
          <span className="absolute w-[18px] h-[18px] top-2 left-2 border-t-2 border-l-2 border-cyan-400" />
          <span className="absolute w-[18px] h-[18px] top-2 right-2 border-t-2 border-r-2 border-cyan-400" />
          <span className="absolute w-[18px] h-[18px] bottom-2 left-2 border-b-2 border-l-2 border-cyan-400" />
          <span className="absolute w-[18px] h-[18px] bottom-2 right-2 border-b-2 border-r-2 border-cyan-400" />
          {scanning && (
            <div
              key={runId}
              className="absolute left-2 right-2 h-0.5"
              style={{
                top: '8px',
                background: 'linear-gradient(to right, transparent, #22d3ee 40%, #06b6d4 60%, transparent)',
                boxShadow: '0 0 10px 2px rgba(34,211,238,0.6)',
                animation: 'ai-scan-move 1.6s ease-in-out forwards',
              }}
            />
          )}
        </div>

        {/* Flash overlay */}
        {scanning && (
          <div
            key={`flash-${runId}`}
            className="absolute inset-0 bg-white pointer-events-none z-10"
            style={{ animation: 'ai-flash 0.5s ease-out 1.45s forwards', opacity: 0 }}
          />
        )}

        {/* Success popup */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-emerald-500/55 px-6 py-3.5 text-center whitespace-nowrap shadow-2xl z-20 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            phase === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.6] pointer-events-none'
          }`}
          style={{ background: 'linear-gradient(135deg,#064e3b,#065f46)' }}
        >
          <div className="text-2xl mb-1">✅</div>
          <div className="text-sm font-extrabold text-white mb-0.5">100% Tuân thủ Trưng bày</div>
          <div className="text-[10px] text-white/60">18/18 SKU · Đúng chuẩn Planogram</div>
        </div>
      </div>

      <button
        onClick={triggerScan}
        disabled={scanning}
        className="w-[calc(100%-32px)] mx-4 mt-2.5 mb-3.5 bg-cyan-500/10 border border-cyan-400/35 text-cyan-300 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all hover:bg-cyan-500/20 hover:border-cyan-400 disabled:opacity-60 disabled:cursor-default"
      >
        <Camera size={14} />
        Quét &amp; Nhận diện Trưng bày
      </button>
    </div>
  );
}

/* ─── Panel 2: AI order suggestion ─── */
const orderProducts = [
  { id: 'A', name: 'Sữa tươi hộp 1L', qty: '3 thùng' },
  { id: 'B', name: 'Nước ngọt lon 330ml', qty: '4 thùng' },
  { id: 'C', name: 'Nước khoáng 500ml', qty: '6 thùng' },
  { id: 'D', name: 'Nước cam hộp 250ml', qty: '2 thùng' },
];

function useOrderAI() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [promoVisible, setPromoVisible] = useState(false);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const openSuggestions = useCallback(() => {
    clearTimers();
    setPopupOpen(true);
    setVisibleCount(0);
    setPromoVisible(false);
    orderProducts.forEach((_, i) => {
      timersRef.current.push(setTimeout(() => setVisibleCount((v) => Math.max(v, i + 1)), 120 + i * 110));
    });
    timersRef.current.push(setTimeout(() => setPromoVisible(true), 600));
  }, [clearTimers]);

  const closePopup = useCallback(() => setPopupOpen(false), []);

  const applyOrder = useCallback(() => {
    clearTimers();
    setPopupOpen(false);
    orderProducts.forEach((p, i) => {
      timersRef.current.push(setTimeout(() => setAppliedIds((prev) => new Set(prev).add(p.id)), i * 100));
    });
  }, [clearTimers]);

  return { popupOpen, visibleCount, promoVisible, appliedIds, openSuggestions, closePopup, applyOrder };
}

function OrderAIPanel() {
  const { popupOpen, visibleCount, promoVisible, appliedIds, openSuggestions, closePopup, applyOrder } = useOrderAI();

  return (
    <div className="p-3.5 relative min-h-[308px]">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 whitespace-nowrap">
          Đơn hàng · Điểm bán: Siêu thị An Khang
        </span>
        <span className="flex-1 h-px bg-white/10" />
      </div>

      <div className="flex flex-col gap-1 mb-0.5">
        {orderProducts.map((p) => {
          const applied = appliedIds.has(p.id);
          return (
            <div
              key={p.id}
              className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg border transition-all duration-300 ${
                applied ? 'bg-cyan-500/10 border-cyan-400/25' : 'bg-white/[0.04] border-white/[0.06]'
              }`}
            >
              <span className="text-[11px] text-white/65 flex-1 leading-tight">{p.name}</span>
              <span className={`text-[11px] font-extrabold min-w-[68px] text-right transition-colors duration-300 ${applied ? 'text-cyan-400' : 'text-white/20'}`}>
                {applied ? p.qty : '— thùng'}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={openSuggestions}
        className="w-[calc(100%-32px)] mx-4 mt-2.5 mb-3.5 bg-indigo-500/15 border border-indigo-400/40 text-indigo-300 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all hover:bg-indigo-500/25"
      >
        <Sparkles size={14} />
        Gợi ý Đơn hàng AI
      </button>

      {/* Suggestion popup sliding up from bottom */}
      <div
        className={`absolute inset-0 rounded-b-2xl flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] z-[15] ${
          popupOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ background: 'linear-gradient(170deg,#06111f,#091828)' }}
      >
        <div className="flex justify-between items-center px-3.5 py-2.5 border-b border-cyan-400/20 bg-cyan-500/[0.07]">
          <span className="text-[11.5px] font-extrabold text-cyan-400">✦ Gợi ý Đơn hàng AI</span>
          <button onClick={closePopup} className="text-white/35 hover:text-white hover:bg-white/10 p-1 rounded">
            <X size={13} />
          </button>
        </div>
        <div className="px-3.5 py-2.5 flex-1 flex flex-col gap-1.5 overflow-y-auto">
          {orderProducts.map((p, i) => (
            <div
              key={p.id}
              className={`flex justify-between items-center px-2.5 py-2 rounded-lg bg-white/5 border border-white/[0.07] transition-all duration-300 ${
                i < visibleCount ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
              }`}
            >
              <span className="text-[11px] text-white/75 flex-1">{p.name}</span>
              <span className="text-xs font-extrabold text-cyan-400 min-w-[68px] text-right">{p.qty}</span>
            </div>
          ))}
          <div
            className={`px-3 py-2 rounded-lg bg-amber-400/[0.07] border border-amber-400/30 text-[10.5px] font-bold text-amber-300 text-center transition-opacity duration-500 ${
              promoVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            🎁 Mua 3 Tặng 1 · Sữa tươi — Đã áp dụng
          </div>
        </div>
        <button
          onClick={applyOrder}
          className="mx-3.5 mb-3 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 hover:-translate-y-px text-white text-xs font-bold transition-all"
        >
          ✓ Áp dụng Đơn hàng
        </button>
      </div>
    </div>
  );
}

export default function AISection() {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);

  return (
    <section id="ai" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* LEFT: badge + headline + feature list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-400/30 rounded-full mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
              </span>
              <span className="text-cyan-400 text-[11px] font-bold uppercase tracking-wider">Nền tảng AI</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              Trí Tuệ Được Tích Hợp Sâu Vào <span className="text-cyan-400">Mọi Hoạt Động Vận Hành</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-9 max-w-md">
              HQSOFT tích hợp AI trực tiếp vào quy trình phân phối và bán lẻ — không phải tính năng đính kèm, mà là động cơ thúc đẩy các quyết định thông minh ở mọi cấp độ vận hành.
            </p>

            <div className="flex flex-col">
              {aiFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className={`flex items-start gap-3.5 py-4 ${i === 0 ? 'pt-0' : ''} ${
                      i < aiFeatures.length - 1 ? 'border-b border-white/[0.07]' : 'pb-0'
                    }`}
                  >
                    <div className="w-9 h-9 bg-cyan-500/10 rounded-[9px] flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-cyan-400" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">{f.title}</div>
                      <div className="text-[12.5px] text-white/45 leading-snug">{f.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: interactive AI dashboard demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -top-4 right-5 z-10 bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-[11px] font-bold tracking-wide px-3.5 py-1 rounded-full shadow-lg shadow-indigo-500/40">
              ✦ HQSOFT AI Engine
            </div>

            <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Mac-window style header + tabs */}
              <div className="bg-white/[0.06] border-b border-white/[0.06] px-[18px] py-3 flex items-center gap-1.5 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E63329]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] ml-1" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] ml-1" />
                <span className="text-white/40 text-[11px] font-semibold mx-2 tracking-wide whitespace-nowrap">
                  HQSOFT AI · Trí tuệ Vận hành
                </span>
                <div className="flex gap-1 ml-auto">
                  <button
                    onClick={() => setActiveTab(0)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap text-center min-w-[92px] transition-all ${
                      activeTab === 0
                        ? 'bg-cyan-500 border border-cyan-500 text-white'
                        : 'bg-white/[0.07] border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
                    }`}
                  >
                    📷 Trưng bày
                  </button>
                  <button
                    onClick={() => setActiveTab(1)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap text-center min-w-[92px] transition-all ${
                      activeTab === 1
                        ? 'bg-cyan-500 border border-cyan-500 text-white'
                        : 'bg-white/[0.07] border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
                    }`}
                  >
                    🛒 AI Đặt hàng
                  </button>
                </div>
              </div>

              {activeTab === 0 ? <DisplayScanPanel key="scan" /> : <OrderAIPanel key="order" />}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
