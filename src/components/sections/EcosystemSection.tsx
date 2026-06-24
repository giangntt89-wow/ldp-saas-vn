'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/src/components/SectionWrapper';
import { ecosystemModules } from '@/src/constants/ecosystemData';

/* ─── Layout: 4 primary (top row) → Hub center → 5 supporting (bottom row) ─── */
const topModules = ecosystemModules.slice(0, 4);    // DMS, SFA, nRetail, 1CX
const bottomModules = ecosystemModules.slice(4, 9); // Xspire, Executive 360, Manager, Delivery, PG

/*
 * SVG curved paths — viewBox 0 0 1000 640
 *
 * Card grid alignment (percentage-based gaps for SVG sync):
 *   Top row    (grid-cols-4, gap 2.5%): centers at x ≈ 116, 372, 628, 884
 *   Hub        (centered):              center at  x = 500, y = 315
 *   Bottom row (grid-cols-5, gap 2%):   centers at x ≈ 92, 296, 500, 704, 908
 *
 * Vertical layout:
 *   Top cards y = 0–110  |  Gap 125px  |  Hub y = 235–395  |  Gap 125px  |  Bottom cards y = 520–630
 */
const topPaths = [
  'M 500 245 C 500 185, 116 145, 116 110',
  'M 500 245 C 500 190, 372 145, 372 110',
  'M 500 245 C 500 190, 628 145, 628 110',
  'M 500 245 C 500 185, 884 145, 884 110',
];

const bottomPaths = [
  'M 500 385 C 500 445, 92 485, 92 520',
  'M 500 385 C 500 435, 296 485, 296 520',
  'M 500 385 C 485 430, 515 475, 500 520',
  'M 500 385 C 500 435, 704 485, 704 520',
  'M 500 385 C 500 445, 908 485, 908 520',
];

/* Staggered animation delays for light pulses */
const topDelays = ['0s', '0.7s', '1.4s', '2.1s'];
const bottomDelays = ['0.35s', '1.05s', '1.75s', '2.45s', '3.15s'];

export default function EcosystemSection() {
  const [hoveredCardId, setHoveredCardId] = useState<number | 'hub' | null>(null);

  const containerVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <SectionWrapper id="ecosystem" className="bg-slate-50 relative overflow-hidden py-24">
      {/* Background radial soft light overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent_60%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">
          Hệ sinh thái toàn diện
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Hệ Sinh Thái Quản Trị Toàn Diện – HQSOFT 360
        </h2>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          Kiến trúc linh hoạt, dữ liệu tập trung. Tùy biến theo quy mô, tích hợp liền mạch. Chọn giải pháp
          bạn cần, chúng tôi lo phần còn lại.
        </p>
      </motion.div>

      {/* ═══ Desktop: Orbit layout — top row (4) → Hub → bottom row (5) ═══ */}
      <div className="hidden lg:block">
        <div className="relative w-full max-w-[1100px] mx-auto" style={{ height: '640px' }}>

          {/* SVG Connection Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 640"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Glow filter for the traveling light pulse */}
              <filter id="laser-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Neon glowing line filter when connection is hovered */}
              <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Default branch gradients (fade out towards cards) */}
              <linearGradient id="top-branch-grad" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="bottom-branch-grad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>

              {/* Active/hovered branch gradients (bright blue highlights) */}
              <linearGradient id="top-branch-active" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="1" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="bottom-branch-active" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="1" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Top branches (hub → top cards) */}
            {topPaths.map((path, idx) => {
              const mod = topModules[idx];
              const isHighlighted = hoveredCardId === 'hub' || hoveredCardId === mod.id;
              return (
                <g key={`top-${mod.id}`}>
                  <path
                    d={path}
                    fill="none"
                    stroke={isHighlighted ? 'url(#top-branch-active)' : 'url(#top-branch-grad)'}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    opacity={isHighlighted ? 1.0 : 0.5}
                    className="transition-all duration-300"
                    filter={isHighlighted ? 'url(#line-glow)' : undefined}
                  />
                  <circle r={isHighlighted ? 4.5 : 3.5} fill={isHighlighted ? '#ffffff' : '#93c5fd'} filter="url(#laser-glow)">
                    <animateMotion path={path} dur="3s" begin={topDelays[idx]} repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}

            {/* Bottom branches (hub → bottom cards) */}
            {bottomPaths.map((path, idx) => {
              const mod = bottomModules[idx];
              const isHighlighted = hoveredCardId === 'hub' || hoveredCardId === mod.id;
              return (
                <g key={`bottom-${mod.id}`}>
                  <path
                    d={path}
                    fill="none"
                    stroke={isHighlighted ? 'url(#bottom-branch-active)' : 'url(#bottom-branch-grad)'}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    opacity={isHighlighted ? 1.0 : 0.5}
                    className="transition-all duration-300"
                    filter={isHighlighted ? 'url(#line-glow)' : undefined}
                  />
                  <circle r={isHighlighted ? 4.5 : 3.5} fill={isHighlighted ? '#ffffff' : '#93c5fd'} filter="url(#laser-glow)">
                    <animateMotion path={path} dur="3s" begin={bottomDelays[idx]} repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}

            {/* ── Decorative: orbit rings around hub ── */}
            <circle cx="500" cy="315" r="75" fill="none" stroke="#3b82f6" strokeWidth="0.7" opacity="0.12" strokeDasharray="4 4">
              <animateTransform attributeName="transform" type="rotate" from="0 500 315" to="360 500 315" dur="30s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="315" r="110" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.08" strokeDasharray="6 6">
              <animateTransform attributeName="transform" type="rotate" from="360 500 315" to="0 500 315" dur="45s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="315" r="150" fill="none" stroke="#93c5fd" strokeWidth="0.4" opacity="0.06" strokeDasharray="8 8">
              <animateTransform attributeName="transform" type="rotate" from="0 500 315" to="360 500 315" dur="60s" repeatCount="indefinite" />
            </circle>

            {/* ── Decorative: connection dots at card endpoints ── */}
            {[116, 372, 628, 884].map((cx, i) => (
              <circle key={`td-${i}`} cx={cx} cy="110" r="3" fill="#3b82f6" opacity={hoveredCardId === 'hub' || hoveredCardId === topModules[i]?.id ? 0.8 : 0.25} className="transition-all duration-300" />
            ))}
            {[92, 296, 500, 704, 908].map((cx, i) => (
              <circle key={`bd-${i}`} cx={cx} cy="520" r="3" fill="#3b82f6" opacity={hoveredCardId === 'hub' || hoveredCardId === bottomModules[i]?.id ? 0.8 : 0.25} className="transition-all duration-300" />
            ))}

            {/* ── Subtle radial glow behind hub ── */}
            <circle cx="500" cy="315" r="60" fill="url(#hub-radial-glow)" opacity="0.15" />
            <defs>
              <radialGradient id="hub-radial-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Interactive Cards Layer */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10 w-full h-full"
          >
            {/* Top Row — 4 primary modules */}
            <motion.div
              variants={itemVariants}
              className="absolute top-0 left-0 right-0 grid grid-cols-4 gap-[2.5%]"
            >
              {topModules.map((mod) => (
                <ModuleCard
                  key={mod.id}
                  mod={mod}
                  isHovered={hoveredCardId === mod.id}
                  onMouseEnter={() => setHoveredCardId(mod.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                />
              ))}
            </motion.div>

            {/* Central Hub */}
            <motion.div
              variants={itemVariants}
              className="absolute left-1/2 -translate-x-1/2 w-[220px] z-10"
              style={{ top: '235px' }}
            >
              <HubCard
                isHovered={hoveredCardId === 'hub'}
                onMouseEnter={() => setHoveredCardId('hub')}
                onMouseLeave={() => setHoveredCardId(null)}
              />
            </motion.div>

            {/* Bottom Row — 5 supporting modules */}
            <motion.div
              variants={itemVariants}
              className="absolute left-0 right-0 grid grid-cols-5 gap-[2%]"
              style={{ top: '520px' }}
            >
              {bottomModules.map((mod) => (
                <ModuleCard
                  key={mod.id}
                  mod={mod}
                  isHovered={hoveredCardId === mod.id}
                  onMouseEnter={() => setHoveredCardId(mod.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══ Mobile / Tablet: Hub card at top, modules in responsive grid below ═══ */}
      <div className="lg:hidden space-y-6">
        <div className="max-w-[320px] mx-auto">
          <HubCard />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ecosystemModules.map((mod) => (
            <ModuleCard key={mod.id} mod={mod} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function ModuleCard({
  mod,
  onMouseEnter,
  onMouseLeave,
  isHovered,
}: {
  mod: typeof ecosystemModules[0];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
}) {
  const Icon = mod.icon;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`module-card-hover h-[110px] bg-white rounded-2xl border p-4 group cursor-pointer transition-all duration-300 flex flex-col justify-center ${
        isHovered
          ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] scale-[1.02]'
          : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
            isHovered ? 'bg-blue-100' : 'bg-blue-50 group-hover:bg-blue-100'
          }`}
        >
          <Icon size={18} className="text-blue-600" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 text-sm leading-tight">{mod.name}</h3>
          <p className="text-slate-500 text-[11px] mt-0.5 leading-normal line-clamp-2">
            {mod.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function HubCard({
  onMouseEnter,
  onMouseLeave,
  isHovered,
}: {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`hub-glow h-[160px] bg-blue-600 rounded-2xl p-5 text-white flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden transition-all duration-300 cursor-pointer ${
        isHovered ? 'scale-[1.05] shadow-[0_0_25px_rgba(37,99,235,0.4)] bg-blue-700' : 'bg-blue-600'
      }`}
    >
      {/* Orbiting ring decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="orbit-ring w-[140%] h-[140%] border border-white/10 rounded-full" />
      </div>
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-2 mx-auto">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="4" fill="white" />
            <circle cx="13" cy="13" r="8.5" stroke="white" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>
        <h3 className="font-bold text-base tracking-tight">HQSOFT 360</h3>
        <p className="text-blue-100 text-[10px] mt-0.5 leading-normal max-w-[180px] mx-auto">
          Trung tâm dữ liệu &amp; tích hợp toàn hệ sinh thái
        </p>
      </div>
    </div>
  );
}
