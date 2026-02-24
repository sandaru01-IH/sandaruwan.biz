'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const contactInfo = [
  {
    type: 'Email',
    value: 'sandaruwan.business@gmail.com',
    link: 'mailto:sandaruwan.business@gmail.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    type: 'LinkedIn',
    value: 'linkedin.com/in/wsssilva',
    link: 'https://www.linkedin.com/in/wsssilva',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    type: 'Location',
    value: 'Panadura DS Division, Western Province, Sri Lanka',
    link: null,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 md:mb-6 text-black text-center px-4">
            Get In Touch
          </h2>
          <p className="text-center text-black/70 text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Let's connect and explore how we can work together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.type}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
                className={`border border-black/20 p-4 md:p-6 text-center hover:border-black transition-all duration-300 ${
                  contact.link ? 'cursor-pointer' : ''
                }`}
                onClick={() => contact.link && window.open(contact.link, '_blank')}
              >
                <div className="text-black mb-3 md:mb-4 flex justify-center">
                  {contact.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-black mb-2 uppercase tracking-wider">
                  {contact.type}
                </h3>
                <p className="text-xs md:text-sm text-black/70 break-words">
                  {contact.value}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <a
              href="mailto:sandaruwan.business@gmail.com"
              className="inline-block px-6 py-2.5 md:px-8 md:py-3 border-2 border-black bg-black text-white font-medium hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wider text-xs md:text-sm"
            >
              Send Me an Email
            </a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-black/20 text-center text-black/60 text-xs md:text-sm px-4"
        >
          <p>© {new Date().getFullYear()} Sandaruwan Sankalpa Silva. All rights reserved.</p>
          <p className="mt-2">Built with Next.js, Tailwind CSS, and Framer Motion</p>
        </motion.div>
      </div>
    </section>
  );
}
