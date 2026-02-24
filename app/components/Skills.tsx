'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    category: 'Top Skills',
    skills: [
      { name: 'Data Handling', level: 95 },
      { name: 'Data Visualization', level: 92 },
      { name: 'Data Validation', level: 90 },
    ],
  },
  {
    category: 'GIS & Spatial Analysis',
    skills: [
      { name: 'GIS Development', level: 93 },
      { name: 'Geospatial Analysis', level: 91 },
      { name: 'Spatial Data Processing', level: 89 },
      { name: 'Mapping & Visualization', level: 94 },
    ],
  },
  {
    category: 'Technical Skills',
    skills: [
      { name: 'Data Analysis', level: 90 },
      { name: 'Full Stack Development', level: 85 },
      { name: 'AI Integration', level: 88 },
    ],
  },
  {
    category: 'Creative Skills',
    skills: [
      { name: 'Graphic Design', level: 92 },
      { name: 'Audio Production', level: 85 },
      { name: 'Brand Identity', level: 88 },
    ],
  },
  {
    category: 'Soft Skills',
    skills: [
      { name: 'Leadership', level: 90 },
      { name: 'Public Speaking', level: 88 },
      { name: 'Team Collaboration', level: 92 },
      { name: 'Strategic Thinking', level: 89 },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={ref} className="section-padding bg-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8 md:mb-12 text-white text-center px-4">
            Skills & Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.8, ease: 'easeOut' }}
                className="border border-white/20 bg-white/5 p-4 md:p-6 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-display font-bold mb-4 md:mb-6 text-white uppercase tracking-wider">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white/90">{skill.name}</span>
                        <span className="text-xs font-semibold text-white/70">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 1, ease: 'easeOut' }}
                          className="h-full bg-white rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
