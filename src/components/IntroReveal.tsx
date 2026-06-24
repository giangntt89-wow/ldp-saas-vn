'use client';

import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
   SVG Supply-Chain Diagram — Revised Layout

   ViewBox: 0 0 820 600
   
   Node positions (center of 100×100 box):
     Manufacture  (M):  cx=140, cy=140   → box x=90,  y=90,  w=100, h=100
     Distributor  (D):  cx=140, cy=460   → box x=90,  y=410, w=100, h=100
     Retail Store (R):  cx=480, cy=300   → box x=430, y=250, w=100, h=100
     Consumer     (C):  cx=700, cy=300   → box x=650, y=250, w=100, h=100

   Flow paths (solid animated):
     Path 1 (forward): M → D  (Manufacture ↓ Distributor): M140,190 V410
     Path 2 (forward): D → R  (Distributor → Retail):      M190,460 H430 A16,16 0 0,0 446,444 V350
     Path 5 (consumer → retail): C→R straight:             M650,300 H530

   Dashed return paths:
     Path 3 (nRetail feedback): R → M  straight then up:   M480,250 V156 A16,16 0 0,0 464,140 H190
       BUT user wants straight lines only: M480,250 V170 H190 V190 (L-shape using 90° turns)
     Path 4 (1CX feedback):     C → M  straight then across: horizontal then vertical
       M700,250 V70 H140 V90  (go up then left then down — all right-angles)

   Product badges (no product names — just small icon-like pills):
     eSales Cloud DMS  → below Manufacture:          x≈140, y≈215
     Executive 360     → also below Manufacture:     x≈140, y≈240 (second badge stacked)
     eSales SFA        → midpoint Dist→Retail line:  midpoint of path 2
     nRetail           → midpoint R→M path (dashed): midpoint of dashed path 3
     1CX               → midpoint C→M path (dashed): midpoint of dashed path 4

   ─────────────────────────────────────────────────────────────────── */

const SupplyChainDiagram = () => (
  <svg className="hero-svg" viewBox="0 0 820 600" xmlns="http://www.w3.org/2000/svg">
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
      {/* Path 1: Manufacture ↓ Distributor */}
      <path id="mp1" d="M140,190 L140,410" />
      {/* Path 2: Distributor → Retail Store (corner turn) */}
      <path id="mp2" d="M190,460 L430,460 A16,16 0 0,0 446,444 L446,350" />
      {/* Path 5: Consumer → Retail Store (straight horizontal) */}
      <path id="mp5" d="M650,300 L530,300" />
    </defs>

    {/* Decorative rings */}
    <circle cx="400" cy="300" r="290" fill="none" stroke="rgba(0,102,255,.03)" strokeWidth="1" />
    <circle cx="400" cy="300" r="200" fill="none" stroke="rgba(0,180,216,.02)" strokeWidth="1" strokeDasharray="4 8" />

    {/* ════════ BASE LINES (subtle, always visible) ════════ */}

    {/* Base 1: Manufacture ↓ Distributor (solid) */}
    <path d="M140,190 V410"
          stroke="#0066FF" strokeOpacity=".15" strokeWidth="1.5" fill="none" />

    {/* Base 2: Distributor → Retail Store (solid, corner) */}
    <path d="M190,460 H430 A16,16 0 0,0 446,444 V350"
          stroke="#0066FF" strokeOpacity=".15" strokeWidth="1.5" fill="none" />

    {/* Base 3: Retail Store → Manufacture (dashed: straight right-angle lines only) */}
    {/* Go up from Retail top (480,250) → 480,160 → left to 156 → down to Manufacture top (140,190) */}
    <path d="M480,250 V160 H156 A16,16 0 0,0 140,176 V190"
          stroke="#0066FF" strokeOpacity=".12" strokeWidth="1.5" fill="none"
          strokeDasharray="5 5" />

    {/* Base 4: Consumer → Manufacture (dashed: straight right-angle lines only) */}
    {/* Go up from Consumer top (700,250) → 700,80 → left to 156 → down to Manufacture top (140,90) */}
    <path d="M700,250 V80 H156 A16,16 0 0,0 140,96 V90"
          stroke="#0066FF" strokeOpacity=".12" strokeWidth="1.5" fill="none"
          strokeDasharray="5 5" />

    {/* Base 5: Consumer → Retail Store (solid, straight horizontal) */}
    <path d="M650,300 H530"
          stroke="#0066FF" strokeOpacity=".15" strokeWidth="1.5" fill="none" />

    {/* ════════ ANIMATED FLOW PATHS ════════ */}

    {/* Path 1: Manufacture ↓ Distributor */}
    <path d="M140,190 V410"
          stroke="url(#pg)" strokeDasharray="8 16" strokeWidth="2" fill="none"
          style={{ animation: 'hero-flow-path 2s linear infinite' }} />

    {/* Path 2: Distributor → Retail Store */}
    <path d="M190,460 H430 A16,16 0 0,0 446,444 V350"
          stroke="url(#pg)" strokeDasharray="8 16" strokeWidth="2" fill="none"
          style={{ animation: 'hero-flow-path 2s linear infinite 0.4s' }} />

    {/* Path 3: Retail → Manufacture (dashed feedback, no animated dot) */}
    <path d="M480,250 V160 H156 A16,16 0 0,0 140,176 V190"
          stroke="url(#pg)" strokeDasharray="6 10" strokeWidth="1.5" fill="none"
          strokeOpacity=".4"
          style={{ animation: 'hero-flow-path 3s linear infinite 0.7s' }} />

    {/* Path 4: Consumer → Manufacture (dashed feedback, no animated dot) */}
    <path d="M700,250 V80 H156 A16,16 0 0,0 140,96 V90"
          stroke="url(#pg)" strokeDasharray="6 10" strokeWidth="1.5" fill="none"
          strokeOpacity=".4"
          style={{ animation: 'hero-flow-path 3.5s linear infinite 0.2s' }} />

    {/* Path 5: Consumer → Retail Store */}
    <path d="M650,300 H530"
          stroke="url(#pg)" strokeDasharray="8 16" strokeWidth="2" fill="none"
          style={{ animation: 'hero-flow-path 2s linear infinite 0.5s' }} />

    {/* ════════ ANIMATED DOTS (solid paths only) ════════ */}

    {/* Dot – Path 1 */}
    <circle r="5" fill="#00B4D8" opacity=".2" filter="url(#dG)">
      <animateMotion dur="2.5s" repeatCount="indefinite"><mpath href="#mp1" /></animateMotion>
    </circle>
    <circle r="2.5" fill="#00E5FF" opacity=".9">
      <animateMotion dur="2.5s" repeatCount="indefinite"><mpath href="#mp1" /></animateMotion>
    </circle>

    {/* Dot – Path 2 */}
    <circle r="5" fill="#00B4D8" opacity=".2" filter="url(#dG)">
      <animateMotion dur="3s" repeatCount="indefinite" begin=".5s"><mpath href="#mp2" /></animateMotion>
    </circle>
    <circle r="2.5" fill="#00E5FF" opacity=".9">
      <animateMotion dur="3s" repeatCount="indefinite" begin=".5s"><mpath href="#mp2" /></animateMotion>
    </circle>

    {/* Dot – Path 5 */}
    <circle r="5" fill="#00B4D8" opacity=".2" filter="url(#dG)">
      <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#mp5" /></animateMotion>
    </circle>
    <circle r="2.5" fill="#00E5FF" opacity=".9">
      <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#mp5" /></animateMotion>
    </circle>

    {/* ════════ PRODUCT BADGES (icon pills, no product name text) ════════ */}

    {/* Badge: eSales Cloud DMS — below Manufacture, left-aligned */}
    <g filter="url(#glow)">
      <rect x="52" y="208" width="176" height="24" rx="12"
            fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.5)" strokeWidth="1" />
      {/* DMS icon: network/grid dots */}
      <circle cx="68" cy="220" r="2.5" fill="#00E5FF" opacity=".9" />
      <circle cx="75" cy="214" r="1.8" fill="#00B4D8" opacity=".7" />
      <circle cx="75" cy="226" r="1.8" fill="#00B4D8" opacity=".7" />
      <line x1="68" y1="220" x2="74" y2="214" stroke="#00B4D8" strokeWidth=".8" opacity=".6" />
      <line x1="68" y1="220" x2="74" y2="226" stroke="#00B4D8" strokeWidth=".8" opacity=".6" />
      <text x="138" y="224" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="9.5"
            fontWeight="700" fill="#00E5FF" letterSpacing=".5">eSales Cloud DMS</text>
    </g>

    {/* Badge: Executive 360 — below DMS badge */}
    <g filter="url(#glow)">
      <rect x="70" y="238" width="140" height="24" rx="12"
            fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.5)" strokeWidth="1" />
      {/* E360 icon: chart bar */}
      <rect x="83" y="246" width="3" height="8" rx="1" fill="#00E5FF" opacity=".9" />
      <rect x="88" y="250" width="3" height="4" rx="1" fill="#00B4D8" opacity=".7" />
      <rect x="93" y="244" width="3" height="10" rx="1" fill="#00E5FF" opacity=".8" />
      <text x="149" y="254" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="9.5"
            fontWeight="700" fill="#00E5FF" letterSpacing=".5">Executive 360</text>
    </g>

    {/* Badge: eSales SFA — midpoint of Dist→Retail arc, approx (310, 460) */}
    <g filter="url(#glow)">
      <rect x="264" y="447" width="100" height="24" rx="12"
            fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.5)" strokeWidth="1" />
      {/* SFA icon: person with arrow */}
      <circle cx="278" cy="459" r="3" fill="#00B4D8" opacity=".8" />
      <path d="M275,463 Q278,468 281,463" fill="none" stroke="#00B4D8" strokeWidth=".9" opacity=".6" />
      <path d="M284,459 L289,459 M287,457 L289,459 L287,461" fill="none" stroke="#00E5FF" strokeWidth="1" opacity=".8" />
      <text x="323" y="463" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="9.5"
            fontWeight="700" fill="#00E5FF" letterSpacing=".5">eSales SFA</text>
    </g>

    {/* Badge: nRetail — midpoint of dashed R→M path: approx midpoint of (480,250)→(480,160)→(156,160) */}
    {/* Midpoint is roughly at (318, 160) */}
    <g filter="url(#glow)">
      <rect x="274" y="149" width="88" height="24" rx="12"
            fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.35)" strokeWidth="1"
            strokeDasharray="3 2" />
      {/* nRetail icon: store */}
      <path d="M286,161 L284,156 L300,156 L298,161" fill="none" stroke="#00B4D8" strokeWidth="1" opacity=".8" />
      <rect x="284" y="161" width="14" height="8" rx="1" fill="rgba(0,180,216,.1)" stroke="#00B4D8" strokeWidth=".8" strokeOpacity=".5" />
      <rect x="287" y="163" width="4" height="6" rx=".8" fill="#00B4D8" opacity=".3" />
      <text x="340" y="165" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="9.5"
            fontWeight="700" fill="#00E5FF" letterSpacing=".5" opacity=".85">nRetail</text>
    </g>

    {/* Badge: 1CX — midpoint of dashed C→M path: approx midpoint of (700,250)→(700,80)→(156,80) */}
    {/* Midpoint is roughly at (428, 80) */}
    <g filter="url(#glow)">
      <rect x="396" y="69" width="64" height="24" rx="12"
            fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.35)" strokeWidth="1"
            strokeDasharray="3 2" />
      {/* 1CX icon: headset/users */}
      <circle cx="410" cy="81" r="4" fill="none" stroke="#00B4D8" strokeWidth="1" opacity=".8" />
      <circle cx="410" cy="81" r="1.5" fill="#00B4D8" opacity=".5" />
      <path d="M407,85 Q410,89 413,85" fill="none" stroke="#00B4D8" strokeWidth=".9" opacity=".6" />
      <text x="443" y="85" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="10"
            fontWeight="700" fill="#00E5FF" letterSpacing=".5" opacity=".85">1CX</text>
    </g>

    {/* ════════ NODES ════════ */}

    {/* ▸ NHÀ SẢN XUẤT (140, 140) */}
    <g className="node-g" filter="url(#nG)">
      <rect x="90" y="90" width="100" height="100" rx="20"
            fill="url(#ng)" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
      {/* Factory icon */}
      <g transform="translate(140, 140) scale(1.15)">
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
      <text x="140" y="210" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="10"
            fontWeight="600" fill="rgba(255,255,255,.55)" letterSpacing="1.2">NHÀ SẢN XUẤT</text>
    </g>

    {/* ▸ NHÀ PHÂN PHỐI (140, 460) */}
    <g className="node-g" filter="url(#nG)">
      <rect x="90" y="410" width="100" height="100" rx="20"
            fill="url(#ng)" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
      {/* Warehouse icon */}
      <g transform="translate(140, 460) scale(1.15)">
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
      <text x="140" y="530" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="10"
            fontWeight="600" fill="rgba(255,255,255,.55)" letterSpacing="1.2">NHÀ PHÂN PHỐI</text>
    </g>

    {/* ▸ CỬA HÀNG BÁN LẺ (480, 300) */}
    <g className="node-g" filter="url(#nG)">
      <rect x="430" y="250" width="100" height="100" rx="20"
            fill="url(#ng)" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
      {/* Store icon */}
      <g transform="translate(480, 300) scale(1.15)">
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
      <text x="480" y="370" textAnchor="middle"
            fontFamily="var(--font-urbanist), sans-serif" fontSize="10"
            fontWeight="600" fill="rgba(255,255,255,.55)" letterSpacing="1">CỬA HÀNG BÁN LẺ</text>
    </g>

    {/* ▸ NGƯỜI TIÊU DÙNG (700, 300) */}
    <g className="node-g" filter="url(#nG)">
      <rect x="650" y="250" width="100" height="100" rx="20"
            fill="url(#ng)" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
      {/* Person icon */}
      <g transform="translate(700, 300) scale(1.15)">
        <circle cx="0" cy="-15" r="9"
                fill="rgba(0,180,216,.1)" stroke="url(#ig)" strokeWidth="1.6" />
        <path d="M-15,15 C-15,0 -9,-4 0,-4 C9,-4 15,0 15,15"
              fill="rgba(0,102,255,.1)" stroke="#00B4D8" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="-3.5" cy="-16" r="1.2" fill="#00B4D8" opacity=".35" />
        <circle cx="3.5" cy="-16" r="1.2" fill="#00B4D8" opacity=".35" />
        <path d="M-3,-11 Q0,-8.5 3,-11" fill="none" stroke="#00B4D8" strokeWidth=".8" opacity=".22" />
      </g>
      <text x="700" y="370" textAnchor="middle"
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
            <h1 className="hero-headline-1">KIẾN TẠO CHUỖI<br />PHÂN PHỐI THÔNG MINH</h1>
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
