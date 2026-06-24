'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/src/components/SectionWrapper';
import { ecosystemModules } from '@/src/constants/ecosystemData';

/* ─────────────────────────────────────────────────────────────────────────────
   Helper: pick a stable set of "related" module ids for each module.
   Each module is connected to the hub (id=0) plus 2 neighbours in the ring.
───────────────────────────────────────────────────────────────────────────── */
function buildRelatedIds(index: number, total: number): number[] {
  const prev = ((index - 1 + total) % total) + 1; // 1-based
  const next = (index % total) + 1;               // 1-based
  return [prev, next];
}

/* ─────────────────────────────────────────────────────────────────────────────
   Orbital data – maps ecosystemModules into the RadialOrbitalTimeline shape
───────────────────────────────────────────────────────────────────────────── */
const orbitalData = ecosystemModules.map((mod, i) => ({
  id: mod.id,
  name: mod.name,
  description: mod.description,
  icon: mod.icon,
  relatedIds: buildRelatedIds(i, ecosystemModules.length),
  // "energy" represents the module's integration depth — drives glow size
  energy: 60 + (i * 7) % 41, // values between 60-100
}));

/* ─────────────────────────────────────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────────────────────────────────────── */
export default function EcosystemSection_v4() {
  return (
    <SectionWrapper id="ecosystem" className="bg-[#050a18] relative overflow-hidden py-24">
      {/* Starfield backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08),transparent_70%)]" />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-8 relative z-10"
      >
        <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
          Hệ sinh thái toàn diện
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Hệ Sinh Thái Quản Trị Toàn Diện – HQSOFT 360
        </h2>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
          Kiến trúc linh hoạt, dữ liệu tập trung. Tùy biến theo quy mô, tích hợp liền mạch.
          Chọn giải pháp bạn cần, chúng tôi lo phần còn lại.
        </p>
        <p className="mt-2 text-blue-400/70 text-xs">
          ↗ Nhấp vào mỗi node để xem chi tiết sản phẩm
        </p>
      </motion.div>

      {/* Orbital diagram */}
      <OrbitalDiagram />

      {/* Mobile fallback grid */}
      <div className="lg:hidden mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        <MobileHubCard />
        {ecosystemModules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-blue-400" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">{mod.name}</h3>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-normal">{mod.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Orbital Diagram (desktop only)
───────────────────────────────────────────────────────────────────────────── */
function OrbitalDiagram() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseIds, setPulseIds] = useState<Set<number>>(new Set());
  const [centerOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

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
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  /* Toggle expand / collapse */
  const toggleNode = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      setAutoRotate(true);
      setPulseIds(new Set());
    } else {
      setExpandedId(id);
      setAutoRotate(false);
      // Rotate so selected node comes to the front (right side)
      const idx = orbitalData.findIndex((d) => d.id === id);
      const total = orbitalData.length;
      const targetAngle = (idx / total) * 360;
      setRotationAngle(0 - targetAngle);
      // Pulse related nodes
      const node = orbitalData.find((d) => d.id === id);
      if (node) setPulseIds(new Set(node.relatedIds));
    }
  };

  /* Click on canvas backdrop to close */
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      setExpandedId(null);
      setAutoRotate(true);
      setPulseIds(new Set());
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
        <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-[-24px] rounded-full border border-blue-400/6 animate-[spin_90s_linear_infinite_reverse]" />
        <div className="absolute inset-[24px] rounded-full border border-white/5 animate-[spin_45s_linear_infinite]" />
      </div>

      {/* Center Hub */}
      <div className="absolute z-20 flex items-center justify-center pointer-events-none" style={{ width: 140, height: 140, left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        {/* Pulsing rings */}
        <div className="absolute w-full h-full rounded-full border border-blue-500/30 animate-ping opacity-40" />
        <div className="absolute w-[120%] h-[120%] rounded-full border border-blue-400/20 animate-ping opacity-30" style={{ animationDelay: '0.7s' }} />
        {/* Hub card */}
        <div className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-[0_0_40px_rgba(37,99,235,0.5)] flex flex-col items-center justify-center pointer-events-auto cursor-default">
          <svg width="28" height="28" viewBox="0 0 26 26" fill="none" className="mb-1">
            <circle cx="13" cy="13" r="4" fill="white" />
            <circle cx="13" cy="13" r="8.5" stroke="white" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1" opacity="0.4" />
          </svg>
          <span className="text-white font-bold text-xs tracking-tight">HQSOFT 360</span>
          <span className="text-blue-200 text-[9px] mt-0.5 text-center px-2 leading-tight">Trung tâm dữ liệu tích hợp</span>
        </div>
      </div>

      {/* Orbital nodes */}
      {orbitalData.map((node, index) => {
        const pos = calcPosition(index, orbitalData.length);
        const isExpanded = expandedId === node.id;
        const isPulsing = pulseIds.has(node.id);
        const Icon = node.icon;

        return (
          <div
            key={node.id}
            ref={(el) => { nodeRefs.current[node.id] = el; }}
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
            {/* Glow aura behind node */}
            {(isPulsing || isExpanded) && (
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)',
                  width: `${node.energy * 0.6 + 40}px`,
                  height: `${node.energy * 0.6 + 40}px`,
                  left: `-${(node.energy * 0.6 + 40 - 40) / 2}px`,
                  top: `-${(node.energy * 0.6 + 40 - 40) / 2}px`,
                }}
              />
            )}

            {/* Icon button */}
            <div
              className={`
                w-11 h-11 rounded-full flex items-center justify-center
                border-2 transition-all duration-300
                ${isExpanded
                  ? 'bg-blue-500 border-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-150'
                  : isPulsing
                  ? 'bg-blue-500/40 border-blue-400 animate-pulse'
                  : 'bg-white/5 border-white/25 hover:border-blue-400 hover:bg-blue-500/20'
                }
              `}
            >
              <Icon size={16} className={isExpanded ? 'text-white' : isPulsing ? 'text-blue-300' : 'text-slate-300'} strokeWidth={1.5} />
            </div>

            {/* Module name label */}
            <div
              className={`
                absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                text-[10px] font-semibold tracking-wide transition-all duration-300
                ${isExpanded ? 'text-blue-300 scale-110' : 'text-slate-400'}
              `}
            >
              {node.name}
            </div>

            {/* Expanded info card */}
            {isExpanded && (
              <div
                className="absolute top-20 left-1/2 -translate-x-1/2 w-64
                  bg-[#0d1630]/95 backdrop-blur-xl border border-blue-500/30
                  rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.2)]
                  overflow-visible z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Connector line */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-blue-500/60" />

                {/* Card header */}
                <div className="px-4 pt-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Icon size={13} className="text-blue-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white font-bold text-sm leading-tight">{node.name}</h3>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{node.description}</p>
                </div>

                {/* Energy bar */}
                <div className="px-4 py-3 border-b border-white/10">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1.5">
                    <span>Mức tích hợp</span>
                    <span className="text-blue-400 font-mono">{node.energy}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700"
                      style={{ width: `${node.energy}%` }}
                    />
                  </div>
                </div>

                {/* Related nodes */}
                {node.relatedIds.length > 0 && (
                  <div className="px-4 pt-3 pb-4">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-medium">
                      Tích hợp với
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {node.relatedIds.map((relId) => {
                        const rel = orbitalData.find((d) => d.id === relId);
                        if (!rel) return null;
                        const RelIcon = rel.icon;
                        return (
                          <button
                            key={relId}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10
                              hover:border-blue-400/40 hover:bg-blue-500/10 transition-all duration-200
                              text-[10px] text-slate-400 hover:text-blue-300"
                            onClick={(e) => { e.stopPropagation(); toggleNode(relId); }}
                          >
                            <RelIcon size={10} strokeWidth={1.5} />
                            {rel.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* Mobile hub card */
function MobileHubCard() {
  return (
    <div className="col-span-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 rounded-2xl p-5 flex items-center justify-center gap-4 shadow-xl border border-blue-500/30">
      <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="4" fill="white" />
          <circle cx="13" cy="13" r="8.5" stroke="white" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>
      <div>
        <h3 className="text-white font-bold text-base">HQSOFT 360</h3>
        <p className="text-blue-100 text-xs mt-0.5">Trung tâm dữ liệu & tích hợp toàn hệ sinh thái</p>
      </div>
    </div>
  );
}
