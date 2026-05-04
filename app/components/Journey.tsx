'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROFILE } from '@/data/profile';

function Chapter({
  chapter,
  index,
}: {
  chapter: (typeof PROFILE.journey)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-16 md:py-24 border-t border-white/8 group">
      {/* Chapter number */}
      <div className="md:col-span-2 flex items-start">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="chapter-number"
        >
          {chapter.chapter}
        </motion.span>
      </div>

      {/* Left: year */}
      <div className="md:col-span-2 flex md:justify-end items-start pt-1">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="label-text whitespace-nowrap"
        >
          {chapter.year}
        </motion.p>
      </div>

      {/* Right: content */}
      <div className="md:col-span-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="label-text mb-3 text-white/30"
        >
          {chapter.subtitle}
        </motion.p>

        <div className="overflow-hidden mb-5">
          <motion.h3
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : { y: '100%' }}
            transition={{ delay: 0.2, duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
            className="font-cinematic font-black text-white"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            {chapter.title}
          </motion.h3>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ delay: 0.35, duration: 0.85 }}
          className="text-white/55 leading-relaxed font-light"
          style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', maxWidth: '56ch' }}
        >
          {chapter.description}
        </motion.p>
      </div>
    </div>
  );
}

export default function Journey() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="journey" className="bg-black px-6 md:px-12 lg:px-20 pt-24 md:pt-36 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="mb-6 md:mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="label-text mb-5"
          >
            The Story
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={headerInView ? { y: '0%' } : { y: '100%' }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
              className="font-cinematic font-black text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
              A Journey
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={headerInView ? { y: '0%' } : { y: '100%' }}
              transition={{ delay: 0.1, duration: 1, ease: [0.33, 1, 0.68, 1] }}
              className="font-cinematic font-black text-white/30 leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
              in Chapters
            </motion.h2>
          </div>
        </div>

        {/* Chapters */}
        <div>
          {PROFILE.journey.map((chapter, index) => (
            <Chapter key={chapter.chapter} chapter={chapter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
