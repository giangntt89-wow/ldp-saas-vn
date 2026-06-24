'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Database, MapPin, Target, Network, Smartphone, AlertCircle, CheckCircle } from 'lucide-react';
import PopupForm from '@/src/components/PopupForm';

// ─── Component: Before (chaos / fragmented state) ───────────────────────────
const BeforeIllustration = () => (
  <div className="flex items-center gap-4 shrink-0 px-4">
    <div className="relative rotate-[-6deg]">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center animate-icon-popup animate-delay-0">
        <TrendingDown className="text-red-500 mb-1" size={24} strokeWidth={2} />
        <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
      </div>
    </div>
    
    <div className="relative z-10">
      <div className="w-20 h-20 bg-red-50 rounded-2xl shadow-md border border-red-100 flex items-center justify-center animate-icon-popup animate-delay-1">
        <Database className="text-red-500" size={32} strokeWidth={1.5} />
        <div className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-sm">
          <AlertCircle className="text-red-500" size={16} strokeWidth={2.5} />
        </div>
      </div>
    </div>

    <div className="relative rotate-[6deg]">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center animate-icon-popup animate-delay-2">
        <div className="relative">
          <MapPin className="text-slate-400" size={24} strokeWidth={2} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="w-8 h-1 bg-slate-200 rounded-full mt-1"></div>
      </div>
    </div>
  </div>
);

// ─── Component: After (dashboard / growth state) ────────────────────────────
const AfterIllustration = () => (
  <div className="flex items-center gap-4 shrink-0 px-4">
    <div className="relative rotate-[-6deg]">
      <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-cyan-100 flex flex-col items-center justify-center animate-icon-popup animate-delay-0">
        <Target className="text-cyan-600 mb-1" size={24} strokeWidth={2} />
        <div className="w-8 h-1 bg-cyan-100 rounded-full"></div>
      </div>
    </div>

    <div className="relative z-10">
      <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/30 flex items-center justify-center animate-icon-popup animate-delay-1">
        <Network className="text-white" size={36} strokeWidth={1.5} />
        <div className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-sm">
          <CheckCircle className="text-green-500" size={18} strokeWidth={2.5} />
        </div>
      </div>
    </div>
    
    <div className="relative rotate-[6deg]">
      <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-cyan-100 flex flex-col items-center justify-center animate-icon-popup animate-delay-2">
        <Smartphone className="text-cyan-600 mb-1" size={24} strokeWidth={2} />
        <div className="w-8 h-1 bg-cyan-100 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default function HeroSection() {
  const [showPopup, setShowPopup] = useState(false);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen pt-16 flex flex-col bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1 flex flex-col">

        {/* ── Heading block ── */}
        <motion.div 
          className="text-center mb-14"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">
            Khởi đầu hành trình chuyển đổi số
          </motion.p>

          <motion.h1 variants={itemVariants} className="font-bold text-slate-900 leading-[1.3] max-w-5xl mx-auto flex flex-col items-center px-4">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-center py-2" lang="vi">
              KIẾN TẠO CHUỖI PHÂN PHỐI THÔNG MINH
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-6 text-sm sm:text-base md:text-lg text-slate-500 max-w-none mx-auto leading-relaxed text-center px-4 whitespace-nowrap" lang="vi">
            Phá vỡ giới hạn của dữ liệu phân mảnh và tối ưu hóa từng khâu trong chuỗi cung ứng.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center">
            <button
              onClick={() => setShowPopup(true)}
              className="cta-primary px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors duration-200"
            >
              Đặt Lịch Tư Vấn Cùng Chuyên Gia
            </button>
          </motion.div>
        </motion.div>

        {/* ── Before / After — 2 stacked cards ── */}
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">

          {/* BEFORE card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 p-8 shadow-md"
          >
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-slate-700 text-slate-200 text-xs font-semibold rounded-full uppercase tracking-wide mb-4">
                  HỆ THỐNG GẶP VẤN ĐỀ
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-700 mb-5">
                  Đang Kẹt Trong &ldquo;Bẫy&rdquo; Vận Hành?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <TrendingDown className="text-slate-500 mt-0.5 shrink-0" size={18} strokeWidth={1.5} />
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-700">Mù mờ ngân sách:</span>{' '}
                      Thiếu công cụ đo lường ROI Trade MKT.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Database className="text-slate-500 mt-0.5 shrink-0" size={18} strokeWidth={1.5} />
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-700">Dữ liệu phân mảnh:</span>{' '}
                      Báo cáo tồn kho chậm, kẹt trên Excel.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="text-slate-500 mt-0.5 shrink-0" size={18} strokeWidth={1.5} />
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-700">Khó quản lý đi tuyến:</span>{' '}
                      Thiếu công cụ giám sát lộ trình thực tế.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="hidden sm:flex items-center justify-center self-center">
                <BeforeIllustration />
              </div>
            </div>
          </motion.div>

          {/* AFTER card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 p-8 shadow-xl"
          >
            <div className="flex items-center gap-6">
              {/* Line art – left corner */}
              <div className="hidden sm:flex items-center justify-center self-center">
                <AfterIllustration />
              </div>
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-cyan-600 text-white text-xs font-semibold rounded-full uppercase tracking-wide mb-4">
                  SAU KHI ĐỒNG HÀNH CÙNG HQSOFT
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-5">
                  Tự Động Hóa &amp; Quản Trị Minh Bạch
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Target className="text-cyan-600 mt-0.5 shrink-0" size={18} strokeWidth={1.5} />
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">Tối ưu Trade MKT:</span>{' '}
                      Tracking hiệu quả khuyến mãi Real-time.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Network className="text-cyan-600 mt-0.5 shrink-0" size={18} strokeWidth={1.5} />
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">Dữ liệu tập trung:</span>{' '}
                      Báo cáo tự động, ra quyết định tức thì.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Smartphone className="text-cyan-600 mt-0.5 shrink-0" size={18} strokeWidth={1.5} />
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">Giám sát thông minh:</span>{' '}
                      Quản lý lộ trình trực tiếp trên Mobile.
                    </p>
                  </li>
                </ul>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <p className="text-cyan-600 font-bold text-lg">40%</p>
                    <p className="text-slate-500 text-xs mt-0.5 leading-snug">Giảm sai sót báo cáo</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <p className="text-cyan-600 font-bold text-lg">3–5h</p>
                    <p className="text-slate-500 text-xs mt-0.5 leading-snug">Tiết kiệm/ngày/Sales</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <p className="text-cyan-600 font-bold text-base">Real-time</p>
                    <p className="text-slate-500 text-xs mt-0.5 leading-snug">Dữ liệu toàn chuỗi</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}
    </section>
  );
}
