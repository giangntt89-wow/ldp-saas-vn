'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

type Props = {
  onClose: () => void;
};

export default function PopupForm({ onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', request: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'popup_form' }),
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

  return (
    <div
      className="popup-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="popup-card bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Đã nhận thông tin!</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Chuyên gia HQSOFT sẽ liên hệ quý khách trong thời gian sớm nhất. Chân thành cảm ơn quý khách đã tin tưởng và lựa chọn HQSOFT trên hành trình chuyển đổi số.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Đặt Lịch Tư Vấn</h2>
            <p className="text-slate-500 text-sm mb-6">Chuyên gia của chúng tôi sẵn sàng lắng nghe bạn.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Họ và Tên *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
              />
              <input
                required
                type="email"
                placeholder="Email doanh nghiệp *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
              />
              <input
                required
                type="tel"
                placeholder="Số điện thoại *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
              />
              <textarea
                required
                placeholder="Nội dung yêu cầu *"
                value={form.request}
                onChange={(e) => setForm({ ...form, request: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all text-slate-700 min-h-[100px] resize-y"
              />
              {submitError && (
                <p className="text-red-500 text-xs text-center">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="cta-primary w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-xl text-sm"
              >
                {submitting ? 'Đang gửi...' : 'Đặt Lịch Ngay'}
              </button>
            </form>
            <p className="text-xs text-slate-400 mt-4 text-center leading-relaxed">
              Dữ liệu của bạn được quản lý nghiêm ngặt theo tiêu chuẩn bảo mật quốc tế. Chúng tôi cam kết chỉ sử dụng thông tin nhằm mục đích tư vấn và hỗ trợ triển khai giải pháp.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
