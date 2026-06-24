import Image from 'next/image';
import { MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

const FacebookIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const LinkedinIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const YoutubeIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);


export default function Footer() {
  return (
    <footer className="bg-[#0b1120] text-slate-300 py-16 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Logo & Intro */}
          <div className="lg:col-span-5 space-y-6">
            <Image
              src="/[HQSOFT]-Logo-tagline-white.png"
              alt="HQSOFT Logo"
              width={180}
              height={56}
              className="h-14 w-auto drop-shadow-md"
            />
            <p className="text-sm leading-relaxed text-slate-400 pr-8">
              HQSOFT tự hào là nhà cung cấp giải pháp quản lý phân phối (DMS) và bán lẻ hàng đầu tại Việt Nam và khu vực. Chúng tôi đồng hành cùng doanh nghiệp trên hành trình chuyển đổi số toàn diện.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://web.facebook.com/HQSOFT" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-slate-800/50 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 rounded-full transition-all duration-300 hover:-translate-y-1 group">
                <FacebookIcon size={18} className="text-slate-400 group-hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/company/hqsoft/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-slate-800/50 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 rounded-full transition-all duration-300 hover:-translate-y-1 group">
                <LinkedinIcon size={18} className="text-slate-400 group-hover:text-white" />
              </a>
              <a href="https://www.youtube.com/@hqsoft-giaiphapdmshangau7121" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-slate-800/50 hover:bg-red-600 border border-slate-700 hover:border-red-500 rounded-full transition-all duration-300 hover:-translate-y-1 group">
                <YoutubeIcon size={18} className="text-slate-400 group-hover:text-white" />
              </a>
              <a href="https://zalo.me/3120691008578991301" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-slate-800/50 hover:bg-blue-500 border border-slate-700 hover:border-blue-400 rounded-full transition-all duration-300 hover:-translate-y-1 overflow-hidden group p-2">
                <Image src="/zalo-icon.png" alt="Zalo" width={24} height={24} className="object-contain w-full h-full" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5 lg:col-start-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-600 rounded-full inline-block"></span>
              HEAD OFFICE
            </h3>
            <div className="space-y-5 text-sm">
              <p className="font-bold text-blue-400 uppercase tracking-wide">CÔNG TY CỔ PHẦN CÔNG NGHỆ HQSOFT</p>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-lg bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-800/50">
                  <MapPin size={16} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <span className="block text-slate-300">Lầu 2, Tòa nhà Aga Building 72/24 Phan Đăng Lưu, Phường Đức Nhuận, TP. Hồ Chí Minh</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-800/50">
                  <Phone size={16} className="text-blue-400" />
                </div>
                <a href="tel:02873006878" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">028.7300.6878</a>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-800/50">
                  <Mail size={16} className="text-blue-400" />
                </div>
                <a href="mailto:info@hqsoft.com.vn" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">info@hqsoft.com.vn</a>
              </div>
              
              <div className="flex items-center gap-4 pt-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-blue-400 border border-blue-800/50 bg-blue-900/30 w-full h-full rounded-lg flex items-center justify-center">MST</span>
                </div>
                <p className="text-slate-300 font-mono text-sm">0304352155</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800/60 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500">© {new Date().getFullYear()} <span className="text-slate-400 font-medium">HQSOFT</span>. All rights reserved.</p>
          <p className="text-slate-500">Dữ liệu của bạn được quản lý nghiêm ngặt theo tiêu chuẩn bảo mật.</p>
        </div>
      </div>
    </footer>
  );
}
