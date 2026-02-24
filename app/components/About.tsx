'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 md:mb-8 text-black px-4 text-center md:text-left">
            About Me
          </h2>
          
          <div className="space-y-4 md:space-y-6 text-base md:text-lg text-black/80 leading-relaxed px-4">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            >
              I am currently pursuing a <span className="font-semibold text-black">Bachelor of Science (Hons) in Urban Informatics & Planning</span> at the University of Moratuwa, with a keen interest in the integration of artificial intelligence, GIS technologies, and data-driven methodologies to advance urban systems and sustainable development.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            >
              My academic and research interests are complemented by strong competencies in <span className="font-semibold text-black">graphic design, audio production, and other creative disciplines</span>, allowing me to approach problem-solving with both analytical and innovative perspectives.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            >
              I bring proven strengths in <span className="font-semibold text-black">leadership, public speaking, and collaborative teamwork</span>, and I excel in multidisciplinary environments where communication and strategic thinking are essential. I am deeply committed to contributing to impactful, forward-thinking urban solutions and continuously seek opportunities to learn, innovate, and contribute meaningfully to my field.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4"
          >
            <div className="border border-black/20 p-4 md:p-6 text-center hover:border-black transition-colors duration-300">
              <div className="text-xl md:text-2xl font-display font-bold text-black mb-2">#valuefinder</div>
              <div className="text-xs md:text-sm text-black/60 uppercase tracking-wider">My Philosophy</div>
            </div>
            <div className="border border-black/20 p-4 md:p-6 text-center hover:border-black transition-colors duration-300">
              <div className="text-xl md:text-2xl font-display font-bold text-black mb-2">AI + GIS</div>
              <div className="text-xs md:text-sm text-black/60 uppercase tracking-wider">Core Focus</div>
            </div>
            <div className="border border-black/20 p-4 md:p-6 text-center hover:border-black transition-colors duration-300">
              <div className="text-xl md:text-2xl font-display font-bold text-black mb-2">Innovation</div>
              <div className="text-xs md:text-sm text-black/60 uppercase tracking-wider">Driving Force</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
