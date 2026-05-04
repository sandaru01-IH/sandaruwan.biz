'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROFILE } from '@/data/profile';

const roles = ['Urban Informatics', 'GIS Developer', 'Data Analyst', 'Creative Technologist'];

function WordReveal({
  text,
  delay = 0,
  className = '',
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-none" style={{ marginRight: '0.22em' }}>
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ delay: delay + i * 0.09, duration: 0.95, ease: [0.33, 1, 0.68, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => { setReady(true); }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/me.jpeg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut }}
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 will-change-transform"
      >
        <div className="max-w-5xl">
          {ready && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.2 }}
              className="label-text mb-10 md:mb-14"
            >
              Urban Informatics &amp; Planning — University of Moratuwa
            </motion.p>
          )}

          <h1
            className="font-cinematic font-black text-white leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9.5rem)', letterSpacing: '-0.01em' }}
          >
            {ready && (
              <>
                <WordReveal text="Sandaruwan" delay={0.35} className="block" />
                <WordReveal text="Sankalpa" delay={0.55} className="block text-white/65" />
                <WordReveal text="Silva" delay={0.72} className="block" />
              </>
            )}
          </h1>

          {ready && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.15, duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
              className="h-px bg-white/18 max-w-sm origin-left mb-8"
            />
          )}

          {ready && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.9 }}
              className="text-white/70 font-light leading-relaxed max-w-lg mb-10 md:mb-14"
              style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.3rem)' }}
            >
              {PROFILE.headline}
            </motion.p>
          )}

          {ready && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex flex-wrap gap-x-4 gap-y-2 mb-12 md:mb-16"
            >
              {roles.map((role, i) => (
                <span key={role} className="flex items-center gap-4">
                  <span className="label-text">{role}</span>
                  {i < roles.length - 1 && <span className="text-white/15 text-xs">·</span>}
                </span>
              ))}
            </motion.div>
          )}

          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.85, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollTo('journey')}
                className="group inline-flex items-center gap-3 px-8 py-4 border border-white/22 text-white text-xs tracking-[0.2em] uppercase font-medium transition-all duration-500 hover:bg-white hover:text-black hover:border-white"
              >
                Explore Journey
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-3 px-8 py-4 text-white/45 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:text-white"
              >
                Contact Me
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll cue */}
      {ready && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="label-text" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>SCROLL</span>
          <motion.div
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
            className="w-px h-8 bg-white/30 origin-top"
          />
        </motion.div>
      )}
    </section>
  );
}
