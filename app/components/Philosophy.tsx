'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROFILE } from '@/data/profile';

export default function Philosophy() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);

  const quoteInView = useInView(quoteRef, { once: true, margin: '-100px' });
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' });
  const eduInView = useInView(eduRef, { once: true, margin: '-60px' });

  return (
    <section id="philosophy" className="bg-black">
      {/* Pull Quote */}
      <div ref={quoteRef} className="px-6 md:px-12 lg:px-20 py-24 md:py-36 border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={quoteInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="label-text mb-12 md:mb-20"
          >
            Philosophy
          </motion.p>

          <div className="max-w-4xl">
            <div className="overflow-hidden mb-4">
              <motion.span
                initial={{ y: '100%' }}
                animate={quoteInView ? { y: '0%' } : { y: '100%' }}
                transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
                className="block text-white/18 font-poppins font-black leading-none"
                style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
                aria-hidden
              >
                "
              </motion.span>
            </div>

            {PROFILE.philosophy.quote.split('.').filter(Boolean).map((sentence, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: '100%' }}
                  animate={quoteInView ? { y: '0%' } : { y: '100%' }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 1, ease: [0.33, 1, 0.68, 1] }}
                  className="font-cinematic font-black text-white leading-snug"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
                >
                  {sentence.trim()}.
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div ref={storyRef} className="px-6 md:px-12 lg:px-20 pb-24 md:pb-36 border-t border-white/8">
        <div className="max-w-6xl mx-auto pt-16 md:pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={storyInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="label-text mb-8"
              >
                The Person
              </motion.p>
              {PROFILE.philosophy.paragraphs.slice(0, 2).map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ delay: 0.15 + i * 0.15, duration: 0.9 }}
                  className="text-white/60 leading-relaxed font-light mb-6"
                  style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={storyInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="label-text mb-8"
              >
                The Approach
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.45, duration: 0.9 }}
                className="text-white/60 leading-relaxed font-light mb-8"
                style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
              >
                {PROFILE.philosophy.paragraphs[2]}
              </motion.p>

              {/* Three value pillars */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                {['#valuefinder', 'AI + GIS', 'Systems thinking'].map((val, i) => (
                  <motion.div
                    key={val}
                    initial={{ opacity: 0, y: 14 }}
                    animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.7 }}
                    className="border border-white/10 p-4"
                  >
                    <p className="text-white font-poppins font-semibold text-sm mb-1">{val}</p>
                    <p className="label-text" style={{ fontSize: '9px' }}>
                      {i === 0 ? 'Philosophy' : i === 1 ? 'Core focus' : 'Method'}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div ref={eduRef} className="px-6 md:px-12 lg:px-20 pb-24 md:pb-36 border-t border-white/8">
        <div className="max-w-6xl mx-auto pt-16 md:pt-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={eduInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="label-text mb-12"
          >
            Education & Credentials
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROFILE.philosophy.education.map((edu, i) => (
              <motion.div
                key={edu.credential}
                initial={{ opacity: 0, y: 20 }}
                animate={eduInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: i * 0.12, duration: 0.8 }}
                className="border border-white/8 p-6 hover:border-white/20 transition-colors duration-400 group"
              >
                <span className="label-text text-white/25 mb-4 block">{edu.type}</span>
                <h3 className="font-poppins font-semibold text-white mb-2 leading-snug text-sm md:text-base">
                  {edu.credential}
                </h3>
                <p className="text-white/50 text-sm mb-3">{edu.institution}</p>
                <p className="label-text text-white/25">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
