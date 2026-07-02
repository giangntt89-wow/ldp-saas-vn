'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionWrapper from '@/src/components/SectionWrapper';
import { ecosystemModules } from '@/src/constants/ecosystemData';

/* ─────────────────────────────────────────────────────────────────────────────
   Orbital data – maps ecosystemModules into the RadialOrbitalTimeline shape
───────────────────────────────────────────────────────────────────────────── */
const orbitalData = ecosystemModules.map((mod) => ({
  id: mod.id,
  name: mod.name,
  description: mod.description,
  benefit: mod.benefit,
  icon: mod.icon,
}));

/* ─────────────────────────────────────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────────────────────────────────────── */
export default function EcosystemSection_v4() {
  return (
    <SectionWrapper id="ecosystem" className="bg-[#F5F7FF] relative overflow-hidden py-24">
      {/* Soft radial glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.07),transparent_65%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl" />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-8 relative z-10"
      >
        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">
          Hệ sinh thái toàn diện
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Hệ Sinh Thái Quản Trị Toàn Diện – HQSOFT 360
        </h2>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          Kiến trúc linh hoạt, dữ liệu tập trung. Tùy biến theo quy mô, tích hợp liền mạch.
          Chọn giải pháp bạn cần, chúng tôi lo phần còn lại.
        </p>
        <p className="mt-2 text-blue-500/70 text-xs hidden lg:block">
          ↗ Nhấp vào mỗi node để xem chi tiết sản phẩm
        </p>
      </motion.div>

      {/* Desktop: Orbital diagram */}
      <OrbitalDiagram />

      {/* Mobile: Accordion list */}
      <MobileAccordion />
    </SectionWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Orbital Diagram (desktop only — lg and above)
───────────────────────────────────────────────────────────────────────────── */
function OrbitalDiagram() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Auto-rotation */
  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.25) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  /* Calculate position of each node on the orbit ring */
  const calcPosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 220;
    const radian = (angle * Math.PI) / 180;
    const x = Number((radius * Math.cos(radian)).toFixed(3));
    const y = Number((radius * Math.sin(radian)).toFixed(3));
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Number(
      Math.max(0.3, Math.min(1, 0.3 + 0.7 * ((1 + Math.sin(radian)) / 2))).toFixed(4)
    );
    return { x, y, angle, zIndex, opacity };
  };

  /* Toggle expand / collapse */
  const toggleNode = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      setAutoRotate(true);
    } else {
      setExpandedId(id);
      setAutoRotate(false);
      const idx = orbitalData.findIndex((d) => d.id === id);
      const total = orbitalData.length;
      const targetAngle = (idx / total) * 360;
      setRotationAngle(0 - targetAngle);
    }
  };

  /* Click on canvas backdrop to close */
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      setExpandedId(null);
      setAutoRotate(true);
    }
  };

  return (
    <div
      className="hidden lg:flex items-center justify-center relative z-10"
      style={{ height: '600px' }}
      ref={containerRef}
      onClick={handleCanvasClick}
    >
      {/* Orbit ring decorations */}
      <div className="absolute pointer-events-none" style={{ width: 480, height: 480, left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        <div className="absolute inset-0 rounded-full border border-blue-300/40 animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-[-24px] rounded-full border border-indigo-200/30 animate-[spin_90s_linear_infinite_reverse]" />
        <div className="absolute inset-[24px] rounded-full border border-blue-200/20 animate-[spin_45s_linear_infinite]" />
      </div>

      {/* Center Hub */}
      <div className="absolute z-20 flex items-center justify-center pointer-events-none" style={{ width: 140, height: 140, left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        {/* Pulsing rings */}
        <div className="absolute w-full h-full rounded-full border border-blue-400/40 animate-ping opacity-30" />
        <div className="absolute w-[120%] h-[120%] rounded-full border border-blue-300/25 animate-ping opacity-20" style={{ animationDelay: '0.7s' }} />
        {/* Hub card */}
        <div className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-[0_8px_40px_rgba(99,102,241,0.35)] flex flex-col items-center justify-center pointer-events-auto cursor-default">
          <svg width="28" height="28" viewBox="0 0 26 26" fill="none" className="mb-1">
            <circle cx="13" cy="13" r="4" fill="white" />
            <circle cx="13" cy="13" r="8.5" stroke="white" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1" opacity="0.4" />
          </svg>
          <span className="text-white font-bold text-xs tracking-tight">HQSOFT 360</span>
          <span className="text-blue-100 text-[9px] mt-0.5 text-center px-2 leading-tight">Ecosystem</span>
        </div>
      </div>

      {/* Orbital nodes */}
      {orbitalData.map((node, index) => {
        const pos = calcPosition(index, orbitalData.length);
        const isExpanded = expandedId === node.id;
        const Icon = node.icon;

        return (
          <div
            key={node.id}
            className="absolute transition-all duration-700 cursor-pointer"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
              zIndex: isExpanded ? 200 : pos.zIndex,
              opacity: isExpanded ? 1 : pos.opacity,
            }}
            onClick={(e) => { e.stopPropagation(); toggleNode(node.id); }}
          >
            {/* Icon button */}
            <div
              className={`
                w-11 h-11 rounded-full flex items-center justify-center
                border-2 transition-all duration-300
                ${isExpanded
                  ? 'bg-blue-500 border-blue-400 shadow-[0_4px_20px_rgba(59,130,246,0.45)] scale-150'
                  : 'bg-white border-blue-200 hover:border-blue-400 hover:bg-blue-50 shadow-sm'
                }
              `}
            >
              <Icon size={16} className={isExpanded ? 'text-white' : 'text-blue-500'} strokeWidth={1.5} />
            </div>

            {/* Module name label */}
            <div
              className={`
                absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                text-[10px] font-semibold tracking-wide transition-all duration-300
                ${isExpanded ? 'text-blue-600 scale-110' : 'text-slate-500'}
              `}
            >
              {node.name}
            </div>

            {/* Expanded info card */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-20 left-1/2 -translate-x-1/2 w-64
                    bg-white/95 backdrop-blur-xl border border-blue-100
                    rounded-2xl shadow-[0_8px_40px_rgba(99,102,241,0.15)]
                    overflow-visible z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Connector line */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-blue-300" />

                  {/* Card content */}
                  <div className="px-4 pt-4 pb-4">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-blue-500" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-slate-800 font-bold text-sm leading-tight">{node.name}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-[11px] leading-relaxed mb-3">
                      {node.description}
                    </p>

                    {/* Benefit pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-blue-600 text-[10px] font-medium leading-none">{node.benefit}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Mobile Accordion (visible below lg)
───────────────────────────────────────────────────────────────────────────── */
function MobileAccordion() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="lg:hidden mt-10 relative z-10 px-1 space-y-2">
      {/* Hub card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-lg border border-blue-400/30">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="4" fill="white" />
            <circle cx="13" cy="13" r="8.5" stroke="white" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">HQSOFT 360</h3>
          <p className="text-blue-100 text-[11px] mt-0.5">Ecosystem – Trung tâm tích hợp toàn hệ sinh thái</p>
        </div>
      </div>

      {/* Module accordion items */}
      {ecosystemModules.map((mod, i) => {
        const Icon = mod.icon;
        const isOpen = openId === mod.id;
        return (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden
              ${isOpen
                ? 'bg-white border-blue-200 shadow-[0_4px_20px_rgba(99,102,241,0.12)]'
                : 'bg-white/70 border-slate-200 hover:border-blue-200'
              }`}
          >
            {/* Accordion header */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              onClick={() => setOpenId(isOpen ? null : mod.id)}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300
                ${isOpen ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50 border border-slate-200'}`}>
                <Icon size={16} className={isOpen ? 'text-blue-500' : 'text-slate-400'} strokeWidth={1.5} />
              </div>
              <span className={`font-semibold text-sm flex-1 transition-colors duration-300 ${isOpen ? 'text-slate-800' : 'text-slate-600'}`}>
                {mod.name}
              </span>
              <ChevronDown
                size={15}
                className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`}
              />
            </button>

            {/* Accordion body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-0 border-t border-slate-100">
                    <p className="text-slate-500 text-[12px] leading-relaxed mt-3 mb-3">
                      {mod.description}
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-blue-600 text-[10px] font-medium">{mod.benefit}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
