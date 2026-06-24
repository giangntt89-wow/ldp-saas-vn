'use client';

import { useEffect, useRef } from 'react';

/**
 * InteractiveParticles – Organic wave-based particle system
 *
 * Creates multiple layers of particles that flow in large sinusoidal waves
 * across the screen. Layers have different speeds, sizes and opacities to
 * produce a convincing sense of depth.  Mouse / touch interaction sends
 * radial ripples that temporarily displace nearby particles.
 */
export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    // ── Mouse state ──────────────────────────────────────────────
    const mouse = { x: w / 2, y: h / 2, active: false };
    const ripples: { x: number; y: number; radius: number; life: number }[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      // Spawn a ripple every few frames
      if (Math.random() < 0.3) {
        ripples.push({ x: e.clientX, y: e.clientY, radius: 0, life: 1 });
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
      if (Math.random() < 0.3) {
        ripples.push({ x: mouse.x, y: mouse.y, radius: 0, life: 1 });
      }
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      buildParticles();
    };
    window.addEventListener('resize', handleResize);

    // ── Layer configuration ──────────────────────────────────────
    // Each layer moves at a different speed & particle size → parallax depth
    interface LayerConfig {
      count: number;
      minSize: number;
      maxSize: number;
      baseAlpha: number;
      speedX: number;       // base horizontal drift
      waveAmplitude: number; // vertical wave height
      waveFrequency: number; // how tight the wave oscillation is
      waveSpeed: number;     // how fast the wave scrolls
      color: string;         // rgb string
    }

    const layers: LayerConfig[] = [
      // Far background – tiny, slow, dim
      {
        count: 180,
        minSize: 0.6,
        maxSize: 1.4,
        baseAlpha: 0.15,
        speedX: 0.15,
        waveAmplitude: 60,
        waveFrequency: 0.0015,
        waveSpeed: 0.3,
        color: '100, 160, 255',
      },
      // Mid layer
      {
        count: 140,
        minSize: 1.0,
        maxSize: 2.5,
        baseAlpha: 0.25,
        speedX: 0.35,
        waveAmplitude: 90,
        waveFrequency: 0.0020,
        waveSpeed: 0.5,
        color: '140, 200, 255',
      },
      // Near foreground – bigger, faster, brighter
      {
        count: 80,
        minSize: 1.8,
        maxSize: 3.8,
        baseAlpha: 0.4,
        speedX: 0.6,
        waveAmplitude: 120,
        waveFrequency: 0.0025,
        waveSpeed: 0.7,
        color: '200, 230, 255',
      },
      // Accent sparks – very few, bright, large glow
      {
        count: 25,
        minSize: 2.5,
        maxSize: 5.0,
        baseAlpha: 0.55,
        speedX: 0.45,
        waveAmplitude: 140,
        waveFrequency: 0.0012,
        waveSpeed: 0.6,
        color: '220, 240, 255',
      },
    ];

    // ── Particle data ────────────────────────────────────────────
    interface Particle {
      x: number;
      baseY: number;
      size: number;
      alpha: number;
      layerIdx: number;
      phaseOffset: number;   // unique wave phase offset
      secondaryPhase: number; // secondary sine for organic feel
    }

    let particles: Particle[] = [];

    function buildParticles() {
      particles = [];
      layers.forEach((layer, li) => {
        for (let i = 0; i < layer.count; i++) {
          particles.push({
            x: Math.random() * w * 1.4 - w * 0.2, // spread wider than viewport
            baseY: Math.random() * h,
            size: layer.minSize + Math.random() * (layer.maxSize - layer.minSize),
            alpha: layer.baseAlpha * (0.5 + Math.random() * 0.5),
            layerIdx: li,
            phaseOffset: Math.random() * Math.PI * 2,
            secondaryPhase: Math.random() * Math.PI * 2,
          });
        }
      });
    }
    buildParticles();

    // ── Render loop ──────────────────────────────────────────────
    let time = 0;

    function animate() {
      time += 0.016; // ~60fps timestep
      ctx!.clearRect(0, 0, w, h);

      // Update ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        ripples[r].radius += 4;
        ripples[r].life -= 0.018;
        if (ripples[r].life <= 0) ripples.splice(r, 1);
      }

      // Draw particles
      for (const p of particles) {
        const layer = layers[p.layerIdx];

        // Horizontal drift
        p.x += layer.speedX;
        if (p.x > w + 40) p.x = -40;

        // Primary + secondary waves for organic motion
        const wave1 = Math.sin(p.x * layer.waveFrequency + time * layer.waveSpeed + p.phaseOffset) * layer.waveAmplitude;
        const wave2 = Math.sin(p.x * layer.waveFrequency * 1.7 + time * layer.waveSpeed * 0.6 + p.secondaryPhase) * layer.waveAmplitude * 0.35;
        let dy = wave1 + wave2;

        // Mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dyMouse = (p.baseY + dy) - mouse.y;
          const dist = Math.sqrt(dx * dx + dyMouse * dyMouse);
          const repelRadius = 160;
          if (dist < repelRadius) {
            const force = (1 - dist / repelRadius) * 30;
            dy += (dyMouse / (dist || 1)) * force;
          }
        }

        // Ripple displacement
        for (const rp of ripples) {
          const rdx = p.x - rp.x;
          const rdy = (p.baseY + dy) - rp.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const band = Math.abs(rdist - rp.radius);
          if (band < 40) {
            const rippleForce = (1 - band / 40) * rp.life * 18;
            dy += (rdy / (rdist || 1)) * rippleForce;
          }
        }

        const finalY = p.baseY + dy;

        // Subtle alpha pulse
        const alphaPulse = 0.85 + 0.15 * Math.sin(time * 1.2 + p.phaseOffset);
        const finalAlpha = p.alpha * alphaPulse;

        // Draw glow
        ctx!.beginPath();
        ctx!.arc(p.x, finalY, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${layer.color}, ${finalAlpha})`;
        ctx!.fill();

        // Soft bloom for larger / brighter particles
        if (p.size > 2.0) {
          const grad = ctx!.createRadialGradient(p.x, finalY, 0, p.x, finalY, p.size * 4);
          grad.addColorStop(0, `rgba(${layer.color}, ${finalAlpha * 0.3})`);
          grad.addColorStop(1, `rgba(${layer.color}, 0)`);
          ctx!.beginPath();
          ctx!.arc(p.x, finalY, p.size * 4, 0, Math.PI * 2);
          ctx!.fillStyle = grad;
          ctx!.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 opacity-90"
    />
  );
}
