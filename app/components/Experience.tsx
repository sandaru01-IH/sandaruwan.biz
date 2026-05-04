'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROFILE } from '@/data/profile';

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof PROFILE.experience)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 0.05, duration: 0.7 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 md:py-14 border-t border-white/8"
    >
      <div className="md:col-span-2">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="label-text whitespace-nowrap"
        >
          {item.period}
        </motion.p>
      </div>

      <div className="md:col-span-8">
        <div className="flex items-start gap-3 flex-wrap mb-2">
          <div className="overflow-hidden">
            <motion.h3
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : { y: '100%' }}
              transition={{ delay: 0.12, duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
              className="font-poppins font-bold text-white"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
            >
              {item.role}
            </motion.h3>
          </div>

          {item.status === 'current' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="self-start mt-1 px-2 py-0.5 border border-white/18 text-white/45 text-xs tracking-[0.15em] uppercase"
            >
              Active
            </motion.span>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white/35 text-sm mb-5 font-medium tracking-wide"
        >
          {item.company}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.28, duration: 0.8 }}
          className="text-white/55 leading-relaxed font-light"
          style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1rem)', maxWidth: '54ch' }}
        >
          {item.narrative}
        </motion.p>
      </div>

      <div className="md:col-span-2 hidden md:flex justify-end items-start pt-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className={`w-2 h-2 rounded-full mt-1 ${item.status === 'current' ? 'bg-white' : 'bg-white/20'}`}
        />
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="bg-black px-6 md:px-12 lg:px-20 py-24 md:py-36 border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-4 md:mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="label-text mb-6"
          >
            Professional History
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={headerInView ? { y: '0%' } : { y: '100%' }}
              transition={{ duration: 1.05, ease: [0.33, 1, 0.68, 1] }}
              className="font-poppins font-black text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 7.5vw, 6rem)' }}
            >
              Experience
            </motion.h2>
          </div>
        </div>

        {PROFILE.experience.map((item, index) => (
          <ExperienceCard key={`${item.company}-${index}`} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
