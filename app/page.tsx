'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from "@/src/components/Header";
import HeroSection from "@/src/components/sections/HeroSection";
import LogicSection from "@/src/components/sections/LogicSection";
import TrustSection from "@/src/components/sections/TrustSection";
import EcosystemSection_v4 from "@/src/components/sections/EcosystemSection_v4";
import MockupSection from "@/src/components/sections/MockupSection";
import AISection from "@/src/components/sections/AISection";
import TestimonialsSection from "@/src/components/sections/TestimonialsSection";
import ContactSection from "@/src/components/sections/ContactSection";
import Footer from "@/src/components/Footer";
import SmoothScroll from "@/src/components/SmoothScroll";
import IntroReveal from "@/src/components/IntroReveal";

export default function Page() {
  const [isRevealed, setIsRevealed] = useState(false);

  // When not revealed, lock body scroll to prevent cheating the intro
  useEffect(() => {
    if (!isRevealed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isRevealed]);

  return (
    <SmoothScroll>
      <AnimatePresence>
        {!isRevealed && <IntroReveal key="intro" onReveal={() => setIsRevealed(true)} />}
      </AnimatePresence>

      <main className={`transition-opacity duration-1000 ${isRevealed ? "opacity-100" : "opacity-0 h-screen overflow-hidden"}`}>
        <Header />
        <HeroSection />
        <LogicSection />
        <TrustSection />
        <EcosystemSection_v4 />
        <MockupSection />
        <AISection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
