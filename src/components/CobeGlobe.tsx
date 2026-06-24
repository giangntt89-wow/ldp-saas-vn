'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function CobeGlobe({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let phi = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 12000,
      mapBrightness: 12,
      baseColor: [0.1, 0.1, 0.2],
      markerColor: [0.2, 0.8, 1],
      glowColor: [0.1, 0.3, 0.6],
      markers: [
        // HQSOFT HQ (Vietnam)
        { location: [10.8231, 106.6297], size: 0.08 },
        // Expanded Regional Reach
        { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
        { location: [-0.7893, 113.9213], size: 0.05 }, // Indonesia
        { location: [15.8700, 100.9925], size: 0.05 }, // Thailand
        { location: [4.2105, 101.9758], size: 0.05 }, // Malaysia
        { location: [12.8797, 121.7740], size: 0.05 }, // Philippines
        { location: [23.6978, 120.9605], size: 0.05 }, // Taiwan
        { location: [22.3193, 114.1694], size: 0.05 }, // Hong Kong
        { location: [35.9078, 127.7669], size: 0.04 }, // South Korea
      ],
      onRender: (state: any) => {
        // Called on every animation frame
        state.phi = phi;
        phi += 0.003; // Slow rotation
      },
    } as any);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className={`w-full max-w-[600px] aspect-square mx-auto relative ${className}`}>
      {/* Optional faint radial glow behind the globe */}
      <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          opacity: 1,
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  );
}
