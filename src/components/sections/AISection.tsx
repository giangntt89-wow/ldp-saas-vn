'use client';

import { useState, useEffect, useRef } from 'react';
import SectionWrapper from '@/src/components/SectionWrapper';
import { AlertTriangle, ShoppingCart, TrendingUp, Sparkles, BrainCircuit, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

/* ─── AI use-case scenarios with simulated "AI conversation" outputs ─── */
const aiScenarios = [
  {
    id: 'inventory',
    icon: AlertTriangle,
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    title: 'Dự báo Thiếu hụt Tồn kho',
    desc: 'AI phân tích lịch sử bán hàng, mùa vụ, và trend thị trường để cảnh báo sớm nguy cơ đứt gãy hàng hóa tại từng điểm bán.',
    // Simulated AI insight output
    aiPrompt: 'Phân tích rủi ro tồn kho tuần tới cho khu vực HCM...',
    aiResponse: [
      { type: 'alert', text: '⚠️ 3 SKU có nguy cơ OOS tại 12 điểm bán Quận 7' },
      { type: 'metric', label: 'Xác suất thiếu hụt', value: '87%', trend: 'high' },
      { type: 'action', text: '→ Đề xuất: Đặt PO bổ sung 500 thùng trước 48h' },
    ],
    valueMetric: { number: '40%', label: 'Giảm tình trạng Out-of-stock' },
  },
  {
    id: 'ordering',
    icon: ShoppingCart,
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    title: 'Gợi ý Đơn hàng Thông minh',
    desc: 'Tự động đề xuất số lượng và mặt hàng tối ưu dựa trên lịch sử nhập hàng, sức mua vùng miền, và xu hướng thị trường.',
    aiPrompt: 'Gợi ý đơn hàng tối ưu cho NPP Miền Tây...',
    aiResponse: [
      { type: 'alert', text: '📦 Phát hiện 5 cửa hàng chưa nhập hàng trong 14 ngày' },
      { type: 'metric', label: 'Đơn hàng đề xuất', value: '23 đơn', trend: 'up' },
      { type: 'action', text: '→ Ước tính doanh thu tăng thêm: 120M VND/tháng' },
    ],
    valueMetric: { number: '25%', label: 'Tăng giá trị đơn hàng trung bình' },
  },
  {
    id: 'trademarketing',
    icon: TrendingUp,
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    title: 'Tối ưu Trade Marketing',
    desc: 'Đánh giá hiệu quả từng chương trình khuyến mãi theo thời gian thực, phân bổ ngân sách thông minh theo ROI thực tế.',
    aiPrompt: 'Đánh giá hiệu quả CTKM "Mua 5 tặng 1" Q2...',
    aiResponse: [
      { type: 'alert', text: '📊 ROI chiến dịch: 3.2x — cao hơn benchmark 40%' },
      { type: 'metric', label: 'Chi phí/đơn chuyển đổi', value: '45K VND', trend: 'down' },
      { type: 'action', text: '→ Đề xuất: Mở rộng sang 3 tỉnh có profile tương tự' },
    ],
    valueMetric: { number: '3.2x', label: 'ROI trung bình chiến dịch' },
  },
];

/* ─── Typing animation hook ─── */
function useTypingEffect(text: string, speed: number = 30, trigger: boolean = false) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!trigger) { 
      setTimeout(() => { setDisplayed(''); setDone(false); }, 0); 
      return; 
    }
    setTimeout(() => { setDisplayed(''); setDone(false); }, 0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, trigger]);

  return { displayed, done };
}

/* ─── AI Response Card (simulated chat-style output) ─── */
function AIResponseCard({ scenario, isActive }: { scenario: typeof aiScenarios[0]; isActive: boolean }) {
  const prompt = useTypingEffect(scenario.aiPrompt, 25, isActive);
  const [showResponse, setShowResponse] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isActive) { 
      setTimeout(() => { setShowResponse(false); setVisibleLines(0); }, 0); 
      return; 
    }
  }, [isActive]);

  useEffect(() => {
    if (prompt.done) {
      const t = setTimeout(() => setShowResponse(true), 300);
      return () => clearTimeout(t);
    }
  }, [prompt.done]);

  useEffect(() => {
    if (!showResponse) return;
    if (visibleLines >= scenario.aiResponse.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 400);
    return () => clearTimeout(t);
  }, [showResponse, visibleLines, scenario.aiResponse.length]);

  return (
    <div className="relative group w-full">
      {/* Glowing animated background effect for AI box */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
      
      <div className="relative bg-[#0b1120] border border-blue-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl min-h-[340px] flex flex-col shadow-2xl overflow-hidden">
        {/* Scanline / Grid effect inside */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_10%,black_50%,transparent_90%)]"></div>
        {/* AI prompt input simulation */}
        <div className="relative flex items-start gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-xs mb-1 font-medium">HQSOFT AI</p>
          <p className="text-white text-sm leading-relaxed">
            {prompt.displayed}
            {!prompt.done && <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse align-middle" />}
          </p>
        </div>
      </div>

      {/* AI response lines */}
      {showResponse && (
        <div className="relative space-y-3 flex-1">
          {scenario.aiResponse.map((line, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 ${idx < visibleLines ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            >
              {line.type === 'alert' && (
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-slate-200 text-sm">{line.text}</p>
                </div>
              )}
              {line.type === 'metric' && (
                <div className="bg-blue-600/15 border border-blue-500/30 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-slate-300 text-sm">{line.label}</span>
                  <span className={`font-bold text-lg ${
                    line.trend === 'high' ? 'text-amber-400' : line.trend === 'up' ? 'text-emerald-400' : 'text-blue-400'
                  }`}>{line.value}</span>
                </div>
              )}
              {line.type === 'action' && (
                <div className="bg-emerald-600/15 border border-emerald-500/30 rounded-xl px-4 py-3">
                  <p className="text-emerald-300 text-sm font-medium">{line.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom value badge */}
      {visibleLines >= scenario.aiResponse.length && showResponse && (
        <div className="relative mt-6 pt-5 border-t border-blue-500/20 flex items-center justify-between animate-[fadeIn_0.5s_ease-out]">
          <span className="text-slate-400 text-xs">Giá trị mang lại</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{scenario.valueMetric.number}</span>
            <span className="text-slate-400 text-xs max-w-[120px] leading-tight">{scenario.valueMetric.label}</span>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default function AISection() {
  const [activeScenario, setActiveScenario] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  // Auto-cycle through scenarios
  useEffect(() => {
    if (!sectionVisible) return;
    const interval = setInterval(() => {
      setActiveScenario((prev) => (prev + 1) % aiScenarios.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [sectionVisible, activeScenario]);

  // Detect when section is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="ai" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* AI badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/15 border border-blue-500/30 rounded-full mb-6">
            <BrainCircuit size={14} className="text-blue-400" />
            <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Công nghệ tương lai</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            AI Không Chỉ Phân Tích —{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              AI Chủ Động Đề Xuất
            </span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Chuyển đổi từ &ldquo;quản lý dữ liệu tĩnh&rdquo; sang{' '}
            <strong className="text-slate-200">hệ thống thông minh tự đưa ra quyết định</strong>,
            giúp doanh nghiệp luôn đi trước một bước trên thị trường.
          </p>
        </motion.div>

        {/* ─── Two-column layout: scenario tabs (left) + AI demo (right) ─── */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mt-12">
          {/* Left: Scenario selector cards */}
          <div className="space-y-4">
            {aiScenarios.map((scenario, i) => {
              const Icon = scenario.icon;
              const isActive = activeScenario === i;
              return (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
                >
                  <button
                    onClick={() => setActiveScenario(i)}
                    className={`w-full text-left rounded-2xl p-5 border transition-all duration-300 group ${
                      isActive
                        ? 'bg-white/10 border-blue-500/50 shadow-lg shadow-blue-500/10'
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 ${scenario.iconBg} rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                        <Icon size={20} className={scenario.iconColor} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-bold text-base transition-colors ${isActive ? 'text-white' : 'text-slate-200'}`}>
                            {scenario.title}
                          </h3>
                          {isActive && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 rounded-full">
                              <Zap size={10} className="text-blue-400" />
                              <span className="text-blue-400 text-[10px] font-bold">LIVE</span>
                            </div>
                          )}
                        </div>
                        <p className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                          {scenario.desc}
                        </p>
                      </div>
                      <ArrowRight size={18} className={`mt-1 shrink-0 transition-all duration-300 ${
                        isActive ? 'text-blue-400 translate-x-0 opacity-100' : 'text-slate-600 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50'
                      }`} />
                    </div>

                    {/* Progress bar for active scenario */}
                    {isActive && (
                      <div className="mt-4 h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          style={{ animation: 'progress-fill 8s linear' }}
                        />
                      </div>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Right: AI demo output */}
          <div className="relative w-full">
            <AIResponseCard
              key={activeScenario}
              scenario={aiScenarios[activeScenario]}
              isActive={sectionVisible}
            />
          </div>
        </div>

        {/* Bottom status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600/10 border border-blue-500/30 rounded-full">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
              <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <span className="text-blue-300 text-sm font-medium">AI engine hoạt động 24/7 — tự học và cải thiện liên tục</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
