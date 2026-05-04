'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROFILE } from '@/data/profile';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={sectionRef} className="bg-black border-t border-white/8">
      {/* Main contact area */}
      <div className="px-6 md:px-12 lg:px-20 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="label-text mb-10 md:mb-16"
          >
            End of the journey — beginning of collaboration
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : { y: '100%' }}
              transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
              className="font-poppins font-black text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
            >
              Let&apos;s
            </motion.h2>
          </div>

          <div className="overflow-hidden mb-16 md:mb-24">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : { y: '100%' }}
              transition={{ delay: 0.1, duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
              className="font-poppins font-black text-white/30 leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
            >
              Work Together
            </motion.h2>
          </div>

          {/* Closing line */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="text-white/45 font-light mb-16 md:mb-20 max-w-lg"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
          >
            {PROFILE.contact.closingLine}
          </motion.p>

          {/* Contact details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-20">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.45, duration: 0.8 }}
            >
              <p className="label-text mb-3">Email</p>
              <a
                href={`mailto:${PROFILE.contact.email}`}
                className="text-white/70 hover:text-white transition-colors duration-300 font-light underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
                style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1rem)' }}
              >
                {PROFILE.contact.email}
              </a>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.55, duration: 0.8 }}
            >
              <p className="label-text mb-3">LinkedIn</p>
              <a
                href={PROFILE.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-300 font-light underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
                style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1rem)' }}
              >
                linkedin.com/in/wsssilva
              </a>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.65, duration: 0.8 }}
            >
              <p className="label-text mb-3">Location</p>
              <p
                className="text-white/45 font-light"
                style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1rem)' }}
              >
                {PROFILE.contact.location}
              </p>
            </motion.div>
          </div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.75, duration: 0.8 }}
          >
            <a
              href={`mailto:${PROFILE.contact.email}`}
              className="group inline-flex items-center gap-4 px-10 py-5 border border-white/22 text-white text-xs tracking-[0.2em] uppercase font-medium transition-all duration-500 hover:bg-white hover:text-black hover:border-white"
            >
              Start a Conversation
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="px-6 md:px-12 lg:px-20 py-8 border-t border-white/8"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="label-text text-white/25">
            © {new Date().getFullYear()} Sandaruwan Sankalpa Silva. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="label-text text-white/18">
              Built with Next.js · Framer Motion · Tailwind CSS
            </p>
            <a
              href="/admin"
              className="label-text text-white/12 hover:text-white/30 transition-colors duration-300"
            >
              Admin
            </a>
          </div>
        </div>
      </motion.footer>
    </section>
  );
}
