'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Activity, Database, TrendingUp, ShieldCheck, PieChart,
  ShoppingCart, Map, Camera, DollarSign, Target,
  Unplug, RefreshCw, Shield, Maximize, Server,
  MapPin, Users, Package, Store, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/src/components/SectionWrapper';

const tabs = [
  {
    id: 'clevel',
    label: 'C-Level / BOD',
    title: 'Nắm Quyền Kiểm Soát & Thúc Đẩy Tăng Trưởng',
    visual: '/mockups/executive_dashboard_new.png',
    bullets: [
      { icon: Activity, text: 'Báo cáo quản trị Real-time toàn chuỗi' },
      { icon: Database, text: 'Ra quyết định dựa trên dữ liệu thực (Data-driven)' },
      { icon: PieChart, text: 'Tối ưu ROI & Kiểm soát chi phí' },
      { icon: ShieldCheck, text: 'Minh bạch hóa hệ thống' },
      { icon: TrendingUp, text: 'Thúc đẩy tăng trưởng, năng lực cạnh tranh' },
    ],
  },
  {
    id: 'bo_sales',
    label: 'BO / Sales / Trade MKT',
    title: 'Tối Ưu Hiệu Suất Điểm Bán & Đột Phá Doanh Số',
    visual: '/mockups/bo_sales_mockup_new.png',
    bullets: [
      { icon: ShoppingCart, text: 'Tự động hóa quy trình đặt hàng và xử lý đơn hàng ngay tại điểm bán' },
      { icon: Map, text: 'Giám sát Real-time lộ trình di chuyển và hiệu suất viếng thăm của đội ngũ Sales' },
      { icon: Camera, text: 'Đo lường trực quan hiệu quả trưng bày (Display Audit) qua hình ảnh thực tế' },
      { icon: DollarSign, text: 'Triển khai, tối ưu và kiểm soát chặt chẽ ngân sách Trade Promotions' },
      { icon: Target, text: 'Theo dõi chỉ số KPI rõ ràng, thúc đẩy động lực bán hàng của nhân viên' },
    ],
  },
  {
    id: 'it',
    label: 'Khối IT',
    title: 'Hệ Thống Vững Chắc, Kết Nối Linh Hoạt & Bảo Mật',
    visual: '/mockups/it_architecture_mockup_new.png',
    bullets: [
      { icon: Unplug, text: 'Tích hợp mượt mà và linh hoạt thông qua hệ thống API mở chuẩn quốc tế' },
      { icon: RefreshCw, text: 'Đồng bộ hóa dữ liệu tự động, tức thời giữa hệ thống ERP, CRM và lõi phân phối' },
      { icon: Shield, text: 'Đảm bảo an toàn bảo mật thông tin tối đa, giảm thiểu rủi ro an ninh mạng' },
      { icon: Maximize, text: 'Khả năng mở rộng hệ thống (Scalability) linh hoạt theo tốc độ phát triển chuỗi' },
      { icon: Server, text: 'Tối ưu hóa hạ tầng kỹ thuật, giảm thiểu tối đa thời gian hệ thống gián đoạn' },
    ],
  }
];

const problemCards = [
  { id: 'visit', icon: MapPin, label: 'Thất thoát viếng thăm', sub: 'Khó kiểm soát lộ trình Sales' },
  { id: 'pg', icon: Users, label: 'Hiệu quả PG/PB', sub: 'Tốn ngân sách nhưng khó đo lường ROI' },
  { id: 'stock', icon: Package, label: 'Khủng hoảng Tồn kho', sub: 'Lệch tồn, Out-of-stock tại điểm bán' },
  { id: 'retail', icon: Store, label: 'Đứt gãy Khách lẻ', sub: 'Trải nghiệm kém, tỷ lệ rời bỏ cao' },
  { id: 'data', icon: Database, label: 'Phân mảnh Dữ liệu', sub: 'Báo cáo chậm trễ, kẹt trên Excel' },
];

type FieldConfig = {
  type: 'input' | 'dropdown';
  placeholder?: string;
  options?: string[];
};

const dynamicFields: Record<string, FieldConfig[]> = {
  visit: [{ type: 'input', placeholder: 'Số lượng NV Sales ước tính:' }],
  pg: [{ type: 'input', placeholder: 'Số lượng PG/PB:' }, { type: 'input', placeholder: 'Chi phí/người/tháng (VNĐ):' }],
  stock: [{ type: 'input', placeholder: 'Số lượng SKU:' }, { type: 'input', placeholder: 'Số Nhà phân phối / Kho:' }],
  retail: [{ type: 'input', placeholder: 'Ngân sách Trade MKT/Loyalty/năm (VNĐ):' }],
  data: [{ type: 'dropdown', placeholder: 'Hệ thống ERP/Kế toán đang dùng?', options: ['SAP', 'Oracle', 'Bravo', 'Khác', 'Chưa có'] }],
};

export default function LogicSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [step, setStep] = useState(1);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [dynValues, setDynValues] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: '', company: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

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

  function toggleProblem(id: string) {
    setSelectedProblems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const activeFields = selectedProblems.flatMap((id) =>
    (dynamicFields[id] || []).map((f) => ({ ...f, key: `${id}-${f.placeholder}` }))
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <SectionWrapper id="solution">
      {/* ── Tabs Section ── */}
      <div className="pt-10 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Giải Pháp Chuyên Biệt – Tối Ưu Mọi Điểm Chạm Vận Hành
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Headers */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === i 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content (60:40 Layout) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {tabs.map((tab, i) => (
              <div key={tab.id} className={activeTab === i ? 'block' : 'hidden'}>
                <div className="flex flex-col lg:flex-row">
                  {/* LEFT COLUMN (60%) */}
                  <div className="lg:w-[60%] p-8 md:p-10 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-5 w-max">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                      {tab.label}
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6 leading-tight">
                      {tab.title}
                    </h3>
                    
                    <ul className="space-y-4">
                      {tab.bullets.map((b, idx) => {
                        const Icon = b.icon;
                        return (
                          <li key={idx} className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                              <Icon size={18} className="text-blue-600" strokeWidth={1.5} />
                            </div>
                            <span className="text-slate-700 font-medium text-[15px] leading-snug">
                              {b.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* RIGHT COLUMN (40%) */}
                  <div className="lg:w-[40%] bg-slate-50 relative p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-100 min-h-[300px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none"></div>
                    <div className="relative w-full max-w-sm mx-auto shadow-lg rounded-xl overflow-hidden border border-slate-200">
                      <Image src={tab.visual} alt={tab.title} width={600} height={400} className="w-full h-auto object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Dự toán tối ưu vận hành ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div
          className="relative py-20 px-4 sm:px-12 lg:px-16 overflow-hidden rounded-[2.5rem] shadow-2xl border border-slate-800"
          style={{ background: 'linear-gradient(135deg, #0d1b3e 0%, #0f2347 45%, #0d1a38 100%)' }}
        >
          {/* Fine grid pattern */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }} aria-hidden="true">
            <defs>
              <pattern id="du-toan-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#du-toan-grid)" />
          </svg>

          {/* Decorative rounded blobs — tạo chiều sâu & rực rỡ */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-20 top-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[80px]"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.5) 0%, transparent 70%)' }} />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-20 -bottom-20 w-[600px] h-[600px] rounded-full pointer-events-none blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' }} />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-20 w-[400px] h-[400px] rounded-full pointer-events-none blur-[90px]"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)' }} />

          {/* Floating rounded glowing rectangles */}
          <motion.div 
            animate={{ y: [0, -30, 0], rotate: [12, 45, 12] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 left-[15%] w-32 h-32 rounded-3xl border border-white/20 pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-sm"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))' }} />
          <motion.div 
            animate={{ y: [0, 40, 0], rotate: [-6, -20, -6] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-24 right-[12%] w-40 h-40 rounded-[2rem] border border-blue-400/30 pointer-events-none shadow-[0_0_40px_rgba(59,130,246,0.2)] backdrop-blur-md"
            style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.02))' }} />
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [45, 90, 45] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[40%] right-[25%] w-20 h-20 rounded-2xl border border-purple-400/30 pointer-events-none shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-sm"
            style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.02))' }} />

        {/* Top + bottom fade for smooth blending */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0f172a] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Dự Toán Tối Ưu Vận Hành</h2>
            <p className="mt-2 text-slate-400 text-sm">Phân tích chi phí chìm cho doanh nghiệp</p>
          </motion.div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center py-12 rounded-3xl" style={{ background: 'rgba(255,255,255,0.97)', boxShadow: '0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12)' }}>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Cảm ơn Anh/Chị!</h3>
              <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
                Chúng tôi đã tiếp nhận thông số vận hành. Khối chuyên gia HQSOFT đang xử lý dữ liệu và sẽ gửi báo cáo dự toán qua Email trong thời gian sớm nhất.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="rounded-3xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.97)', boxShadow: '0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}>
              <div className="flex border-b border-slate-100">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`flex-1 py-2.5 text-center text-xs font-semibold transition-colors ${step === s ? 'text-blue-600 border-b-2 border-blue-600' : step > s ? 'text-green-600' : 'text-slate-400'}`}>Bước {s}</div>
                ))}
              </div>

              <div className="p-6 sm:p-8">
                {step === 1 && (
                  <div className="step-transition">
                    <p className="text-slate-700 font-semibold mb-4">Vấn đề nhức nhối nhất của bạn là gì? <span className="text-slate-400 font-normal text-xs">(Có thể chọn nhiều)</span></p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {problemCards.map((card) => {
                        const Icon = card.icon;
                        const selected = selectedProblems.includes(card.id);
                        return (
                          <button
                            key={card.id}
                            onClick={() => toggleProblem(card.id)}
                            className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${selected ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-300'}`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${selected ? 'bg-blue-100' : 'bg-slate-100'}`}>
                              <Icon size={14} className={selected ? 'text-blue-600' : 'text-slate-500'} strokeWidth={1.5} />
                            </div>
                            <div>
                              <p className={`text-sm font-semibold ${selected ? 'text-blue-700' : 'text-slate-800'}`}>{card.label}</p>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{card.sub}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <button disabled={selectedProblems.length === 0} onClick={() => setStep(2)} className="cta-primary mt-5 w-full py-2.5 bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2">Tiếp theo <ArrowRight size={16} /></button>
                  </div>
                )}
                {step === 2 && (
                  <div className="step-transition">
                    <p className="text-slate-700 font-semibold mb-4">Thông số vận hành hiện tại</p>
                    <div className="space-y-3">
                      {activeFields.map((field) => field.type === 'dropdown' ? (
                        <select key={field.key} value={dynValues[field.key] || ''} onChange={(e) => setDynValues({ ...dynValues, [field.key!]: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm text-slate-700">
                          <option value="">{field.placeholder}</option>
                          {field.options?.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input key={field.key} type="text" placeholder={field.placeholder} value={dynValues[field.key!] || ''} onChange={(e) => setDynValues({ ...dynValues, [field.key!]: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm" />
                      ))}
                    </div>
                    <div className="flex gap-3 mt-5">
                      <button onClick={() => setStep(1)} className="cta-secondary flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50">Quay lại</button>
                      <button onClick={() => setStep(3)} className="cta-primary flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2">Tiếp theo <ArrowRight size={16} /></button>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <form onSubmit={handleSubmit} className="step-transition">
                    <p className="text-slate-700 font-semibold mb-4">Thông tin nhận báo cáo</p>
                    <div className="space-y-3">
                      <input required type="text" placeholder="Họ và Tên *" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm" />
                      <input required type="text" placeholder="Tên công ty *" value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm" />
                      <input required type="tel" placeholder="Số điện thoại *" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm" />
                      <input required type="email" placeholder="Email doanh nghiệp *" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm" />
                    </div>
                    <div className="flex gap-3 mt-5">
                      <button type="button" onClick={() => setStep(2)} className="cta-secondary flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50">Quay lại</button>
                      <button type="submit" className="cta-primary flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl">Nhận báo cáo</button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
    </SectionWrapper>
  );
}
