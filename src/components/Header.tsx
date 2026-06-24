'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import PopupForm from '@/src/components/PopupForm';

const navLinks = [
  { label: 'Giải Pháp', href: '#solution' },
  { label: 'Hệ Sinh Thái', href: '#ecosystem' },
  { label: 'Khách Hàng', href: '#trust' },
  { label: 'AI', href: '#ai' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:backdrop-blur-md ${
          scrolled ? 'bg-white/95 shadow-sm border-b border-slate-100' : 'bg-transparent'
        }`}
        style={{ backdropFilter: scrolled ? 'blur(12px)' : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
              <Image
                src="/[HQSOFT]-Logo-tagline.png"
                alt="HQSOFT Logo"
                width={140}
                height={40}
                className="h-9 w-auto"
                priority
              />
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPopup(true)}
                className="cta-primary hidden md:inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl"
              >
                Đăng ký tư vấn
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-slate-600"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setShowPopup(true); }}
              className="w-full mt-2 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl"
            >
              Đăng ký tư vấn
            </button>
          </div>
        )}
      </header>

      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}
    </>
  );
}
