'use client';

import { useState, useEffect, useCallback } from 'react';
import SectionWrapper from '@/src/components/SectionWrapper';
import { testimonials } from '@/src/constants/testimonialsData';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  return (
    <SectionWrapper id="testimonials" className="bg-slate-50">
      <div className="text-center mb-14">
        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">
          CHIA SẺ TỪ KHÁCH HÀNG
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          LỰA CHỌN TIN DÙNG BỞI CÁC NHÀ LÃNH ĐẠO
        </h2>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          Hàng trăm chuỗi phân phối hàng đầu đã và đang chuyển đổi thành công cùng HQSOFT.
        </p>
      </div>

      <div 
        className="max-w-6xl mx-auto relative px-4 sm:px-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative min-h-[350px] sm:min-h-[260px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md w-full max-w-4xl flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={16} className="text-amber-400 fill-amber-400" strokeWidth={0} />
                    ))}
                  </div>
                  <blockquote className="text-slate-700 text-sm sm:text-base italic leading-relaxed mb-5">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </blockquote>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">{testimonials[currentIndex].initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{testimonials[currentIndex].name}</p>
                    <p className="text-slate-500 text-xs truncate">{testimonials[currentIndex].title}</p>
                    <p className="text-blue-600 text-xs font-medium truncate">{testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors hidden sm:flex z-10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors hidden sm:flex z-10"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-blue-600 w-8' : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
