'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const education = [
  {
    institution: 'University of Moratuwa',
    degree: 'BSc.(hons) Urban Informatics & Planning',
    field: 'Information Technology',
    period: 'April 2022 - April 2026',
    description: 'Pursuing Bachelor of Science (Hons) in Urban Informatics & Planning, focusing on the integration of AI, GIS technologies, and data-driven methodologies for urban systems and sustainable development.',
    type: 'degree',
  },
  {
    institution: 'LAVTC',
    degree: 'Dip. Desktop publishing and Graphic Designing',
    field: 'Graphic Design',
    period: 'January 2021 - March 2022',
    description: 'Completed Diploma in Desktop Publishing and Graphic Designing, developing strong competencies in creative design and visual communication.',
    type: 'diploma',
  },
  {
    institution: 'University of Moratuwa',
    degree: 'Full Stack Developer',
    field: 'Information Technology',
    period: 'November 2022',
    description: 'Completed Full Stack Developer certification program.',
    type: 'certification',
  },
];

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8 md:mb-12 text-black text-center px-4">
            Education
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
            {education.map((edu, index) => (
              <motion.div
                key={`${edu.institution}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: 'easeOut' }}
                className="border border-black/20 p-4 md:p-6 hover:border-black transition-all duration-300"
              >
                <div className="inline-block px-2 py-1 md:px-3 md:py-1 mb-3 md:mb-4 text-xs font-semibold uppercase tracking-wider border border-black/30 text-black">
                  {edu.type === 'degree' ? 'Degree' : edu.type === 'diploma' ? 'Diploma' : 'Certification'}
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-black mb-2">
                  {edu.degree}
                </h3>
                <div className="text-base md:text-lg font-semibold text-black/80 mb-2">
                  {edu.institution}
                </div>
                <div className="text-xs md:text-sm text-black/60 mb-2 md:mb-3">
                  {edu.field}
                </div>
                <div className="text-xs md:text-sm text-black/50 mb-3 md:mb-4">
                  {edu.period}
                </div>
                <p className="text-black/70 text-xs md:text-sm leading-relaxed">
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
