'use client';

import Image from 'next/image';
import { Activity, Database, TrendingUp, ShieldCheck, PieChart } from 'lucide-react';
import SectionWrapper from '@/src/components/SectionWrapper';
import { motion } from 'framer-motion';

const valueProps = [
  { icon: Activity, text: 'Báo cáo quản trị Real-time toàn chuỗi' },
  { icon: Database, text: 'Ra quyết định dựa trên dữ liệu thực (Data-driven)' },
  { icon: PieChart, text: 'Tối ưu ROI & Kiểm soát chi phí' },
  { icon: ShieldCheck, text: 'Minh bạch hóa hệ thống' },
  { icon: TrendingUp, text: 'Thúc đẩy tăng trưởng, năng lực cạnh tranh' },
];

export default function CLevelSection() {
  return (
    <SectionWrapper id="clevel-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
          
          <div className="flex flex-col lg:flex-row">
            {/* LEFT COLUMN (60% Width - Content) */}
            <div className="lg:w-[60%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 w-max">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                C-Level / BOD
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-10 leading-tight">
                Nắm Quyền Kiểm Soát &amp; Thúc Đẩy Tăng Trưởng
              </h2>
              
              <ul className="space-y-6">
                {valueProps.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-center gap-5 group">
                      <div className="w-11 h-11 rounded-xl bg-blue-50/80 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Icon size={18} className="text-blue-600" strokeWidth={1.5} />
                      </div>
                      <span className="text-slate-700 font-medium text-[16px]">
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* RIGHT COLUMN (40% Width - Visual Mockup) */}
            <div className="lg:w-[40%] bg-slate-50 relative p-8 md:p-12 lg:p-16 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-100">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none"></div>
              
              <div className="relative w-full max-w-[280px] mx-auto shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden border border-slate-200 bg-white transition-transform hover:-translate-y-1 duration-500">
                <Image
                  src="/mockups/executive_dashboard_new.png"
                  alt="Executive Dashboard Mockup"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
