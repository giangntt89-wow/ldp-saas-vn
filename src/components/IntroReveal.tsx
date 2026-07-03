'use client';

import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
   SVG Supply-Chain Diagram — Horizontal Flow Layout
   (redone to match the reference hero diagram in ldp-saas-sea: a single
   straight row Manufacture → Distributor → Retail → Consumer, with two
   feedback loops arcing back to Manufacture above the row, and an O2O
   loop arcing between Consumer and Retail below the row)

   ViewBox: 0 -50 920 360

   Node positions (center of 100×100 box, all on one row at cy=150):
     Manufacture  (M):  cx=130   → box x=80,  y=100, w=100, h=100
     Distributor  (D):  cx=360   → box x=310, y=100, w=100, h=100
     Retail Store (R):  cx=590   → box x=540, y=100, w=100, h=100
     Consumer     (C):  cx=820   → box x=770, y=100, w=100, h=100

   Flow paths (solid animated, straight horizontal segments):
     M → D : x180 → x310
     D → R : x410 → x540
     R → C : x640 → x770

   Feedback loops (dashed, arcing above the row back into Manufacture):
     nRetail loop: Retail top   → rail y=34  → Manufacture top
     1CX loop:     Consumer top → rail y=-26 → Manufacture top

   O2O loop (dashed, arcing below the row, Consumer ↔ Retail — "Online → In-store"):
     Consumer bottom → rail y=240 → Retail bottom

   Product badges:
     eSales Cloud DMS / Executive 360 → stacked below Manufacture
     eSales SFA                       → below the Distributor→Retail line
     nRetail                          → on the nRetail feedback rail
     1CX                              → on the 1CX feedback rail
     O2O                              → on the O2O rail
   ─────────────────────────────────────────────────────────────────── */

const SupplyChainDiagram = () => (
  <svg className="hero-svg" viewBox="0 -50 920 372" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0066FF" stopOpacity=".7" />
        <stop offset="100%" stopColor="#00B4D8" stopOpacity=".7" />
      </linearGradient>
      <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,.08)" />
        <stop offset="100%" stopColor="rgba(255,255,255,.02)" />
      </linearGradient>
      <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00B4D8" />
        <stop offset="100%" stopColor="#0066FF" />
      </linearGradient>

      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b" />
        <feFlood floodColor="#00B4D8" floodOpacity=".35" />
        <feComposite in2="b" operator="in" />
        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="nG" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="b" />
        <feFlood floodColor="#0066FF" floodOpacity=".12" />
        <feComposite in2="b" operator="in" />
        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="dG"><feGaussianBlur stdDeviation="4" /></filter>

      {/* Motion paths for animated dots */}
      <path id="mp1" d="M180,150 L310,150" />
      <path id="mp2" d="M410,150 L540,150" />
      <path id="mp3" d="M640,150 L770,150" />
      <path id="mpNR" d="M590,100 V50 Q590,34 574,34 H160 Q144,34 144,50 V100" />
      <path id="mp1cx" d="M820,100 V-10 Q820,-26 804,-26 H132 Q116,-26 116,-10 V100" />
      <path id="mpO2O" d="M820,200 V232 Q820,248 804,248 H621 Q605,248 605,232 V200" />
      <path id="mpMfg" d="M130,200 V273" />
      <path id="mpSFA" d="M360,200 V232 Q360,248 376,248 H559 Q575,248 575,232 V200" />
    </defs>

    {/* Decorative rings */}
    <circle cx="475" cy="150" r="280" fill="none" stroke="rgba(0,102,255,.03)" strokeWidth="1" />
    <circle cx="475" cy="150" r="190" fill="none" stroke="rgba(0,180,216,.02)" strokeWidth="1" strokeDasharray="4 8" />

    {/* ════════ BASE LINES (subtle, always visible) ════════ */}

    {/* Base: Manufacture → Distributor → Retail → Consumer (solid) */}
    <path d="M180,150 H310" stroke="#0066FF" strokeOpacity=".15" strokeWidth="1.5" fill="none" />
    <path d="M410,150 H540" stroke="#0066FF" strokeOpacity=".15" strokeWidth="1.5" fill="none" />
    <path d="M640,150 H770" stroke="#0066FF" strokeOpacity=".15" strokeWidth="1.5" fill="none" />

    {/* Base: nRetail feedback loop (Retail → Manufacture, dashed) */}
    <path d="M590,100 V50 Q590,34 574,34 H160 Q144,34 144,50 V100"
          stroke="#0066FF" strokeOpacity=".12" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />

    {/* Base: 1CX feedback loop (Consumer → Manufacture, dashed) */}
    <path d="M820,100 V-10 Q820,-26 804,-26 H132 Q116,-26 116,-10 V100"
          stroke="#0066FF" strokeOpacity=".12" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />

    {/* Base: O2O loop (Consumer → Retail, dashed, "Online → In-store") */}
    <path d="M820,200 V232 Q820,248 804,248 H621 Q605,248 605,232 V200"
          stroke="#12B5CB" strokeOpacity=".18" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />

    {/* Base: Manufacture → solution badges below (same style as nRetail/1CX loops) */}
    <path d="M130,200 V273"
          stroke="#0066FF" strokeOpacity=".12" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />

    {/* Base: Distributor + Retail Store → eSales SFA badge below (same style as nRetail/1CX loops) */}
    <path d="M360,200 V232 Q360,248 376,248 H559 Q575,248 575,232 V200"
          stroke="#0066FF" strokeOpacity=".12" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />

    {/* ════════ ANIMATED FLOW PATHS ════════ */}

    <path d="M180,150 H310" stroke="url(#pg)" strokeDasharray="8 16" strokeWidth="2" fill="none"
          style={{ animation: 'hero-flow-path 2s linear infinite' }} />
    <path d="M410,150 H540" stroke="url(#pg)" strokeDasharray="8 16" strokeWidth="2" fill="none"
          style={{ animation: 'hero-flow-path 2s linear infinite 0.4s' }} />
    <path d="M640,150 H770" stroke="url(#pg)" strokeDasharray="8 16" strokeWidth="2" fill="none"
          style={{ animation: 'hero-flow-path 2s linear infinite 0.8s' }} />

    {/* Feedback loops (dashed, slower flow) */}
    <path d="M590,100 V50 Q590,34 574,34 H160 Q144,34 144,50 V100"
          stroke="url(#pg)" strokeDasharray="6 10" strokeWidth="1.5" fill="none" strokeOpacity=".4"
          style={{ animation: 'hero-flow-path 3s linear infinite 0.7s' }} />
    <path d="M820,100 V-10 Q820,-26 804,-26 H132 Q116,-26 116,-10 V100"
          stroke="url(#pg)" strokeDasharray="6 10" strokeWidth="1.5" fill="none" strokeOpacity=".4"
          style={{ animation: 'hero-flow-path 3.5s linear infinite 0.2s' }} />
    <path d="M820,200 V232 Q820,248 804,248 H621 Q605,248 605,232 V200"
          stroke="#12B5CB" strokeDasharray="6 10" strokeWidth="1.5" fill="none" strokeOpacity=".45"
          style={{ animation: 'hero-flow-path 3s linear infinite 1s' }} />

    {/* Manufacture → solution badges (animated overlay) */}
    <path d="M130,200 V273"
          stroke="url(#pg)" strokeDasharray="6 10" strokeWidth="1.5" fill="none" strokeOpacity=".4"
          style={{ animation: 'hero-flow-path 3.2s linear infinite 0.3s' }} />

    {/* Distributor + Retail Store → eSales SFA badge (animated overlay) */}
    <path d="M360,200 V232 Q360,248 376,248 H559 Q575,248 575,232 V200"
          stroke="url(#pg)" strokeDasharray="6 10" strokeWidth="1.5" fill="none" strokeOpacity=".4"
          style={{ animation: 'hero-flow-path 3.3s linear infinite 0.9s' }} />

    {/* ════════ ANIMATED DOTS ════════ */}

    <circle r="5" fill="#00B4D8" opacity=".2" filter="url(#dG)">
      <animateMotion dur="2.5s" repeatCount="indefinite"><mpath href="#mp1" /></animateMotion>
    </circle>
    <circle r="2.5" fill="#00E5FF" opacity=".9">
      <animateMotion dur="2.5s" repeatCount="indefinite"><mpath href="#mp1" /></animateMotion>
    </circle>

    <circle r="5" fill="#00B4D8" opacity=".2" filter="url(#dG)">
      <animateMotion dur="2.5s" repeatCount="indefinite" begin=".5s"><mpath href="#mp2" /></animateMotion>
    </circle>
    <circle r="2.5" fill="#00E5FF" opacity=".9">
      <animateMotion dur="2.5s" repeatCount="indefinite" begin=".5s"><mpath href="#mp2" /></animateMotion>
    </circle>

    <circle r="5" fill="#00B4D8" opacity=".2" filter="url(#dG)">
      <animateMotion dur="2.5s" repeatCount="indefinite" begin="1s"><mpath href="#mp3" /></animateMotion>
    </circle>
    <circle r="2.5" fill="#00E5FF" opacity=".9">
      <animateMotion dur="2.5s" repeatCount="indefinite" begin="1s"><mpath href="#mp3" /></animateMotion>
    </circle>

    <circle r="4" fill="#00B4D8" opacity=".55" filter="url(#dG)">
      <animateMotion dur="9s" repeatCount="indefinite" begin=".4s"><mpath href="#mpNR" /></animateMotion>
    </circle>
    <circle r="4" fill="#12B5CB" opacity=".5" filter="url(#dG)">
      <animateMotion dur="11s" repeatCount="indefinite" begin="1.6s"><mpath href="#mp1cx" /></animateMotion>
    </circle>
    <circle r="4" fill="#12B5CB" opacity=".55" filter="url(#dG)">
      <animateMotion dur="8s" repeatCount="indefinite" begin=".8s"><mpath href="#mpO2O" /></animateMotion>
    </circle>
    <circle r="4" fill="#00B4D8" opacity=".55" filter="url(#dG)">
      <animateMotion dur="9s" repeatCount="indefinite" begin=".3s"><mpath href="#mpMfg" /></animateMotion>
    </circle>
    <circle r="4" fill="#00B4D8" opacity=".5" filter="url(#dG)">
      <animateMotion dur="10s" repeatCount="indefinite" begin="1.2s"><mpath href="#mpSFA" /></animateMotion>
    </circle>

    {/* ════════ PRODUCT BADGES ════════ */}

    {/* Badge: eSales Cloud DMS — below Manufacture */}
    <g filter="url(#glow)">
      <rect x="11" y="235" width="238" height="26" rx="13"
            fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.5)" strokeWidth="1" />
      <text x="130" y="252" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="12.35"
            fontWeight="700" fill="#00E5FF" letterSpacing=".5">eSales Cloud DMS</text>
    </g>

    {/* Badge: Executive 360 — below DMS badge, same size as DMS badge */}
    <g filter="url(#glow)">
      <rect x="11" y="273" width="238" height="26" rx="13"
            fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.5)" strokeWidth="1" />
      <text x="130" y="290" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="12.35"
            fontWeight="700" fill="#00E5FF" letterSpacing=".5">Executive 360</text>
    </g>

    {/* Badge: eSales SFA — below the Distributor→Retail line */}
    <g filter="url(#glow)">
      <rect x="408" y="235" width="135" height="26" rx="13"
            fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.5)" strokeWidth="1" />
      <text x="475" y="252" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="12.35"
            fontWeight="700" fill="#00E5FF" letterSpacing=".5">eSales SFA</text>
    </g>

    {/* Badge: nRetail — on the nRetail feedback rail */}
    <g filter="url(#glow)">
      <rect x="300" y="21" width="119" height="26" rx="13"
            fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.35)" strokeWidth="1" strokeDasharray="3 2" />
      <text x="360" y="38" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="12.35"
            fontWeight="700" fill="#00E5FF" letterSpacing=".5" opacity=".85">nRetail</text>
    </g>

    {/* Badge: 1CX — on the 1CX feedback rail */}
    <g filter="url(#glow)">
      <rect x="432" y="-39" width="86" height="26" rx="13"
            fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.35)" strokeWidth="1" strokeDasharray="3 2" />
      <text x="475" y="-22" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="13"
            fontWeight="700" fill="#00E5FF" letterSpacing=".5" opacity=".85">1CX</text>
    </g>

    {/* Badge: O2O — level with the eSales SFA badge, on the Consumer↔Retail rail ("Online → In-store") */}
    <g filter="url(#glow)">
      <rect x="609" y="235" width="192" height="26" rx="13"
            fill="rgba(4,18,48,.92)" stroke="#12B5CB" strokeWidth="1" strokeDasharray="3 2" />
      <text x="705" y="252" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="12.35"
            fontWeight="700" fill="#12B5CB" letterSpacing=".5">O2O · Online → In-store</text>
    </g>

    {/* ════════ NODES ════════ */}

    {/* ▸ NHÀ SẢN XUẤT (130, 150) */}
    <g className="node-g" filter="url(#nG)">
      <rect x="80" y="100" width="100" height="100" rx="20"
            fill="url(#ng)" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
      {/* Factory icon */}
      <g transform="translate(130, 150) scale(1.15)">
        <rect x="-20" y="-11" width="40" height="22" rx="2"
              fill="rgba(0,180,216,.08)" stroke="url(#ig)" strokeWidth="1.5" />
        <polyline points="-20,-11 -13,-21 -6,-11 1,-21 8,-11 15,-21 20,-11"
                  fill="none" stroke="#00B4D8" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="15" y="-29" width="7" height="10" rx="1.5"
              fill="rgba(0,102,255,.1)" stroke="#00B4D8" strokeWidth="1.2" opacity=".6" />
        <circle cx="18.5" cy="-33" r="2.5" fill="#00B4D8" opacity=".12">
          <animate attributeName="cy" values="-33;-39;-33" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".12;.04;.12" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="21" cy="-37" r="1.8" fill="#00B4D8" opacity=".06">
          <animate attributeName="cy" values="-37;-44;-37" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <rect x="-14" y="-6" width="6" height="5" rx="1" fill="#00B4D8" opacity=".35" />
        <rect x="-5" y="-6" width="6" height="5" rx="1" fill="#00B4D8" opacity=".25" />
        <rect x="4" y="-6" width="6" height="5" rx="1" fill="#00B4D8" opacity=".35" />
        <rect x="-4" y="1" width="8" height="10" rx="1.5" fill="#00B4D8" opacity=".12" stroke="#00B4D8" strokeWidth=".8" strokeOpacity=".3" />
      </g>
      <text x="130" y="222" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="10"
            fontWeight="600" fill="rgba(255,255,255,.55)" letterSpacing="1.2">NHÀ SẢN XUẤT</text>
    </g>

    {/* ▸ NHÀ PHÂN PHỐI (360, 150) */}
    <g className="node-g" filter="url(#nG)">
      <rect x="310" y="100" width="100" height="100" rx="20"
            fill="url(#ng)" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
      {/* Warehouse icon */}
      <g transform="translate(360, 150) scale(1.15)">
        <rect x="-22" y="-13" width="44" height="24" rx="2"
              fill="rgba(0,180,216,.08)" stroke="url(#ig)" strokeWidth="1.5" />
        <path d="M-24,-13 L-18,-23 L18,-23 L24,-13"
              fill="rgba(0,102,255,.06)" stroke="#00B4D8" strokeWidth="1.3" strokeLinejoin="round" />
        <line x1="-16" y1="-21" x2="16" y2="-21" stroke="#00B4D8" strokeWidth=".6" opacity=".3" />
        <rect x="-18" y="-7" width="14" height="16" rx="1.5"
              fill="rgba(0,180,216,.1)" stroke="#00B4D8" strokeWidth="1" strokeOpacity=".4" />
        <rect x="4" y="-7" width="14" height="16" rx="1.5"
              fill="rgba(0,180,216,.1)" stroke="#00B4D8" strokeWidth="1" strokeOpacity=".4" />
        <rect x="-15" y="0" width="5" height="5" rx=".8" fill="#00B4D8" opacity=".3" />
        <rect x="-9" y="2" width="4" height="4" rx=".8" fill="#00B4D8" opacity=".2" />
        <rect x="7" y="1" width="5" height="5" rx=".8" fill="#00B4D8" opacity=".25" />
        <rect x="10" y="-3" width="4" height="5" rx=".8" fill="#00B4D8" opacity=".18" />
      </g>
      <text x="360" y="222" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="10"
            fontWeight="600" fill="rgba(255,255,255,.55)" letterSpacing="1.2">NHÀ PHÂN PHỐI</text>
    </g>

    {/* ▸ CỬA HÀNG BÁN LẺ (590, 150) */}
    <g className="node-g" filter="url(#nG)">
      <rect x="540" y="100" width="100" height="100" rx="20"
            fill="url(#ng)" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
      {/* Store icon */}
      <g transform="translate(590, 150) scale(1.15)">
        <path d="M-20,-20 L-22,-10 L22,-10 L20,-20 Z"
              fill="rgba(0,102,255,.1)" stroke="url(#ig)" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M-22,-10 Q-15,-3 -8,-10 Q0,-3 8,-10 Q15,-3 22,-10"
              fill="none" stroke="#00B4D8" strokeWidth="1.2" opacity=".45" />
        <rect x="-20" y="-10" width="40" height="26" rx="1"
              fill="rgba(0,180,216,.06)" stroke="#00B4D8" strokeWidth="1.3" strokeOpacity=".5" />
        <rect x="-5" y="2" width="10" height="14" rx="2" fill="rgba(0,180,216,.15)" stroke="#00B4D8" strokeWidth="1" strokeOpacity=".4" />
        <circle cx="3" cy="10" r="1" fill="#00B4D8" opacity=".4" />
        <rect x="-17" y="-6" width="8" height="6" rx="1.5" fill="#00B4D8" opacity=".18" />
        <rect x="9" y="-6" width="8" height="6" rx="1.5" fill="#00B4D8" opacity=".18" />
      </g>
      <text x="590" y="222" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="10"
            fontWeight="600" fill="rgba(255,255,255,.55)" letterSpacing="1">CỬA HÀNG BÁN LẺ</text>
    </g>

    {/* ▸ NGƯỜI TIÊU DÙNG (820, 150) */}
    <g className="node-g" filter="url(#nG)">
      <rect x="770" y="100" width="100" height="100" rx="20"
            fill="url(#ng)" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
      {/* Person icon */}
      <g transform="translate(820, 150) scale(1.15)">
        <circle cx="0" cy="-15" r="9"
                fill="rgba(0,180,216,.1)" stroke="url(#ig)" strokeWidth="1.6" />
        <path d="M-15,15 C-15,0 -9,-4 0,-4 C9,-4 15,0 15,15"
              fill="rgba(0,102,255,.1)" stroke="#00B4D8" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="-3.5" cy="-16" r="1.2" fill="#00B4D8" opacity=".35" />
        <circle cx="3.5" cy="-16" r="1.2" fill="#00B4D8" opacity=".35" />
        <path d="M-3,-11 Q0,-8.5 3,-11" fill="none" stroke="#00B4D8" strokeWidth=".8" opacity=".22" />
      </g>
      <text x="820" y="222" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="10"
            fontWeight="600" fill="rgba(255,255,255,.55)" letterSpacing="1">NGƯỜI TIÊU DÙNG</text>
    </g>
  </svg>
);

/* ─────────────────────────────────────────────────────────────────
   IntroReveal — Hook Page (Hero V3)
   Fullscreen cover that transitions to main content on CTA click.
   ───────────────────────────────────────────────────────────────── */
export default function IntroReveal({ onReveal }: { onReveal: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%", filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <div className="hero-wrap">
        <div className="hero-bg" />
        <div className="grid-overlay" />

        <section className="hero-v3">
          {/* ════════ LEFT: Typography + CTA ════════ */}
          <motion.div
            className="hero-v3-left"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="hero-tagline">NỀN TẢNG QUẢN TRỊ PHÂN PHỐI &amp; BÁN LẺ HÀNG ĐẦU</p>
            <h1 className="hero-headline-1">KIẾN TẠO<br />CHUỖI PHÂN PHỐI<br />THÔNG MINH</h1>
            <h2 className="hero-headline-2">TỐI ƯU MỌI ĐIỂM CHẠM</h2>
            <p className="hero-sub-headline">Số hóa toàn diện quy trình từ nhà sản xuất đến người tiêu dùng.</p>
            <button className="hero-cta-btn" onClick={onReveal}>
              Trải nghiệm ngay
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* ════════ RIGHT: SVG Diagram ════════ */}
          <motion.div
            className="hero-v3-right"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <SupplyChainDiagram />
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
}
