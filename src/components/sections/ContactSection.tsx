'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type FormState = {
  name: string;
  email: string;
  phone: string;
  role: string;
  scale: string;
};

type Errors = Partial<FormState>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Vui lòng nhập họ và tên.';
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Email không hợp lệ.';
  if (!f.phone.trim() || !/^[0-9+\s\-()]{9,15}$/.test(f.phone)) e.phone = 'Số điện thoại không hợp lệ.';
  if (!f.role) e.role = 'Vui lòng chọn chức vụ.';
  return e;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', role: '', scale: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact_section' }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Gửi yêu cầu thất bại.');
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  }

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #0f172a 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Bắt Đầu Kỷ Nguyên Số Hóa Cùng HQSOFT
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Đội ngũ chuyên gia của chúng tôi đã sẵn sàng lắng nghe bài toán vận hành của doanh nghiệp bạn.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#0d1b3e] rounded-2xl p-12 text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Yêu cầu đã được gửi!</h3>
            <p className="text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
              Chuyên gia HQSOFT sẽ liên hệ quý khách trong thời gian sớm nhất. Chân thành cảm ơn quý khách đã tin tưởng và lựa chọn HQSOFT trên hành trình chuyển đổi số.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-[#0d1b3e] rounded-2xl p-8 sm:p-10 shadow-2xl"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <input
                    type="text"
                    placeholder="Họ và Tên *"
                    value={form.name}
                    onChange={set('name')}
                    className={`w-full px-4 py-3.5 rounded-xl border bg-white text-slate-900 text-sm outline-none transition-all ${
                      errors.name
                        ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {!errors.name && <p className="text-slate-400 text-xs mt-1.5 ml-1">Vui lòng nhập họ và tên</p>}
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email doanh nghiệp *"
                    value={form.email}
                    onChange={set('email')}
                    className={`w-full px-4 py-3.5 rounded-xl border bg-white text-slate-900 text-sm outline-none transition-all ${
                      errors.email
                        ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {!errors.email && <p className="text-slate-400 text-xs mt-1.5 ml-1">Nhập email công ty của bạn</p>}
                  {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Số điện thoại *"
                  value={form.phone}
                  onChange={set('phone')}
                  className={`w-full px-4 py-3.5 rounded-xl border bg-white text-slate-900 text-sm outline-none transition-all ${
                    errors.phone
                      ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                  }`}
                />
                {!errors.phone && <p className="text-slate-400 text-xs mt-1.5 ml-1">Số điện thoại liên hệ chính</p>}
                {errors.phone && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.phone}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <select
                    value={form.role}
                    onChange={set('role')}
                    className={`w-full px-4 py-3.5 rounded-xl border bg-white text-sm outline-none transition-all ${
                      !form.role ? 'text-slate-400' : 'text-slate-900'
                    } ${
                      errors.role
                        ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  >
                    <option value="" disabled hidden>Chức vụ *</option>
                    <option value="CEO / BOD">CEO / BOD</option>
                    <option value="Quản lý IT">Quản lý IT</option>
                    <option value="Sales / Trade MKT">Sales / Trade MKT</option>
                    <option value="Khác">Khác</option>
                  </select>
                  {!errors.role && <p className="text-slate-400 text-xs mt-1.5 ml-1">Chọn chức vụ</p>}
                  {errors.role && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.role}</p>}
                </div>
                <div className="flex flex-col">
                  <select
                    value={form.scale}
                    onChange={set('scale')}
                    className={`w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all ${
                      !form.scale ? 'text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    <option value="" disabled hidden>Quy mô User dự kiến</option>
                    <option value="Dưới 50">Dưới 50</option>
                    <option value="50 – 200">50 – 200</option>
                    <option value="Trên 200">Trên 200</option>
                  </select>
                  <p className="text-slate-400 text-xs mt-1.5 ml-1">Chọn quy mô nhân sự</p>
                </div>
              </div>

              {submitError && (
                <p className="text-red-400 text-sm text-center">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="cta-primary w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold rounded-xl text-sm tracking-wide"
              >
                {submitting ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU TƯ VẤN'}
              </button>
            </form>

            <p className="text-xs text-slate-400 mt-4 text-center">
              Đội ngũ chuyên gia sẽ phản hồi trong thời gian sớm nhất.
            </p>
            <p className="text-xs text-slate-400 mt-2 text-center leading-relaxed">
              Dữ liệu của bạn được quản lý nghiêm ngặt theo tiêu chuẩn bảo mật quốc tế. Chúng tôi cam kết chỉ
              sử dụng thông tin nhằm mục đích tư vấn và hỗ trợ triển khai giải pháp.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
