'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionWrapper from '@/src/components/SectionWrapper';
import { Monitor, BarChart3, MapPin, CheckCircle2 } from 'lucide-react';

const devices = [
  {
    role: 'Back Office / Admin',
    tagline: 'Trung tâm vận hành dữ liệu',
    icon: Monitor,
    benefits: [
      'Quản lý đơn hàng, tồn kho, công nợ trên một giao diện',
      'Xử lý hàng nghìn bản ghi không lag',
      'Phân quyền chi tiết theo phòng ban',
    ],
    platform: 'Web App',
    color: 'border-blue-200 hover:border-blue-400',
    bgColor: 'bg-blue-50',
    accentColor: 'text-blue-600',
    accentBg: 'bg-blue-100',
    imageSrc: '/mockups/backoffice_dashboard.png',
    imageAlt: 'HQSOFT Back Office Dashboard — quản lý đơn hàng và tồn kho',
    parallaxSpeed: 0.05,
  },
  {
    role: 'C-Level / Quản lý',
    tagline: 'Ra quyết định bằng dữ liệu',
    icon: BarChart3,
    benefits: [
      'Dashboard KPI real-time: doanh thu, tăng trưởng, đạt target',
      'Drill-down phân tích theo vùng, kênh, sản phẩm',
      'Nhận cảnh báo bất thường tức thì trên điện thoại',
    ],
    platform: 'Web App & Mobile App',
    color: 'border-emerald-200 hover:border-emerald-400',
    bgColor: 'bg-emerald-50',
    accentColor: 'text-emerald-600',
    accentBg: 'bg-emerald-100',
    imageSrc: '/mockups/clevel_dashboard.png',
    imageAlt: 'HQSOFT Executive 360 — KPI dashboard cho lãnh đạo',
    parallaxSpeed: 0.10,
  },
  {
    role: 'Salesman / PG',
    tagline: 'Tối ưu năng suất ngoài thị trường',
    icon: MapPin,
    benefits: [
      'Check-in GPS tại điểm bán, chụp ảnh trưng bày',
      'Tạo đơn hàng nhanh ngay tại cửa hàng',
      'Xem lộ trình đi tuyến & tiến độ theo ngày',
    ],
    platform: 'Mobile App',
    color: 'border-violet-200 hover:border-violet-400',
    bgColor: 'bg-violet-50',
    accentColor: 'text-violet-600',
    accentBg: 'bg-violet-100',
    imageSrc: '/mockups/salesman_field_app.png',
    imageAlt: 'HQSOFT SFA — ứng dụng đi tuyến cho Salesman',
    parallaxSpeed: 0.15,
  },
];

export default function MockupSection() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function handleScroll() {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const windowH = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const offset = (center - windowH / 2) * devices[i].parallaxSpeed;
        card.style.transform = `translateY(${offset}px)`;
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SectionWrapper id="mockup">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">
          Trải nghiệm đa nền tảng
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Trải Nghiệm Đồng Nhất – Quản Trị Mọi Lúc, Mọi Nơi
        </h2>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          Giao diện trực quan, được thiết kế may đo để tối ưu hóa hiệu suất làm việc cho từng vai trò trong doanh nghiệp.
        </p>
      </motion.div>

      <div ref={cardsContainerRef} className="grid lg:grid-cols-3 gap-8">
        {devices.map((d, i) => {
          const Icon = d.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.2 }}
              className="h-full"
            >
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="parallax-card h-full"
              >
              <div className={`rounded-2xl border-2 ${d.bgColor} ${d.color} p-6 flex flex-col group h-full transition-all duration-300 hover:shadow-xl`}>
                {/* Department header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${d.accentBg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={20} className={d.accentColor} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-tight">{d.role}</h3>
                    <p className={`text-xs font-medium ${d.accentColor}`}>{d.tagline}</p>
                  </div>
                </div>

                {/* Device mockup image */}
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-white border border-slate-100 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={d.imageSrc}
                    alt={d.imageAlt}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Benefits list */}
                <ul className="space-y-2.5 mb-4 flex-1">
                  {d.benefits.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className={`${d.accentColor} mt-0.5 shrink-0`} strokeWidth={2} />
                      <span className="text-slate-600 text-[13px] leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Platform badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${d.accentBg} rounded-lg self-start`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${d.accentColor === 'text-blue-600' ? 'bg-blue-500' : d.accentColor === 'text-emerald-600' ? 'bg-emerald-500' : 'bg-violet-500'}`} />
                  <span className={`text-xs font-semibold ${d.accentColor}`}>{d.platform}</span>
                </div>
              </div>
            </div>
          </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
