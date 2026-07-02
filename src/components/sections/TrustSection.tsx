'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionWrapper from '@/src/components/SectionWrapper';
import { clientLogos } from '@/src/constants/clientLogosData';

const metrics = [
  { value: '10+', label: 'Quốc gia & Vùng lãnh thổ' },
  { value: '500+', label: 'Khách hàng Doanh nghiệp' },
  { value: '100.000+', label: 'Người dùng thực tế mỗi ngày' },
];

/* Triple the logos for seamless infinite scroll (translate -33.33%) */
const tripled = [...clientLogos, ...clientLogos, ...clientLogos];

const containerVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <SectionWrapper id="trust" className="bg-[#EEF2FF] pt-20">
      <div ref={sectionRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >

        <motion.div variants={itemVariants} className="text-center mb-14 relative z-10">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">
            Được Tin Chọn Bởi Các Doanh Nghiệp Dẫn Đầu
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Nền Tảng Được Tin Chọn Bởi Các Doanh Nghiệp Dẫn Đầu
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Hơn 20 năm đồng hành cùng sự tăng trưởng bền vững của các chuỗi phân phối quy mô lớn tại Châu Á.
          </p>
        </motion.div>

        {/* Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto relative z-10">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-blue-700">{m.value}</p>
              <p className="text-slate-500 text-sm mt-2">{m.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Infinite Marquee – GPU-accelerated, pause on hover, fade edges */}
        <motion.div variants={itemVariants} className="marquee-container">
          <div className="marquee-track">
            {tripled.map((logo, i) => (
              <div
                key={`${logo.id}-${i}`}
                className="inline-flex items-center justify-center min-w-[180px] h-20 bg-white rounded-xl px-6 shadow-sm shrink-0"
              >
                <Image
                  src={logo.logoPath}
                  alt={logo.name}
                  width={140}
                  height={50}
                  className="max-h-12 w-auto object-contain"
                  style={{ filter: 'none' }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      </div>
    </SectionWrapper>
  );
}
