'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const experiences = [
  {
    company: 'Suleco Pvt Ltd',
    position: 'GIS Developer & Data Analyst',
    period: 'September 2025 - Present (6 months)',
    location: 'Sri Lanka',
    description: 'Currently working with Suleco Pvt Ltd under the division of SPATIO SDS as a part-time GIS Developer and Data Analyst. My work mainly focuses on handling geospatial data, complex data systems, and running analysis to support different projects. I also contribute to data processing and visualization while working remotely, which gives me flexibility to balance tasks and deliver results effectively.',
    type: 'current',
  },
  {
    company: 'Suleco Pvt Ltd',
    position: 'Geographic Information System Developer',
    period: 'May 2025 - September 2025 (5 months)',
    location: 'Sri Lanka',
    description: 'I joined Suleco Pvt Ltd as a GIS Developer intern, where I worked on different geospatial projects. I got hands-on experience with GIS tools, mapping, and data analysis while learning how these solutions are applied in real-world situations. This role really helped me sharpen my technical skills and work closely with a great team and learned a lot of new skills.',
    type: 'past',
  },
  {
    company: 'Fiverr',
    position: 'GIS Developer & Data Analyst',
    period: 'December 2021 - Present (4 years 3 months)',
    location: 'Remote',
    description: 'As a proficient GIS Analyst, I have led numerous projects focused on data visualization and spatial analysis, providing critical insights and solutions across various sectors. My expertise includes leveraging advanced GIS tools and techniques to collect, analyze, and interpret spatial data, enabling effective decision-making. I specialize in creating detailed maps, interactive visualizations, and comprehensive reports that communicate complex spatial information clearly and accurately.',
    type: 'current',
  },
  {
    company: 'Alphagrid Global',
    position: 'Managing Director',
    period: 'December 2024 - Present (1 year 3 months)',
    location: 'Sri Lanka',
    description: 'Leading strategic initiatives and business development for Alphagrid Global.',
    type: 'current',
  },
  {
    company: 'Aleena International (Pvt) Ltd.',
    position: 'Managing Director',
    period: 'August 2024 - December 2024 (5 months)',
    location: 'Sri Lanka',
    description: 'This newly established company specializes in providing scented products, including candles and soaps. Additionally, we offer event planning services featuring our premium product line. Our team is committed to organizing events throughout Sri Lanka. I held the positions of Chief Operating Officer and Chief Marketing Officer, dedicated to achieving excellence and maximizing the company\'s potential.',
    type: 'past',
  },
  {
    company: 'Young Planners\' Forum Sri Lanka',
    position: 'Sub Committee member of Public Relations and Media',
    period: 'July 2024 - Present (1 year 8 months)',
    location: 'Sri Lanka',
    description: 'Currently giving critical thoughts to this sub committee and achieving real ground experience with the community at this level. Willing to do many works in here.',
    type: 'current',
  },
  {
    company: 'Young Planners\' Forum Sri Lanka',
    position: 'Executive Committee Member',
    period: 'July 2023 - July 2024 (1 year 1 month)',
    location: 'Sri Lanka',
    description: 'I was in the Executive committee member in YPF, and within that we did different innovative projects and within that I can highlight, rebuilding Sri Lanka together (RST) program. By this time I achieved so many skills and also I polished my current character and developed into next level.',
    type: 'past',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      // Calculate progress: 0 when section enters viewport, 1 when fully scrolled past
      const progress = Math.max(
        0,
        Math.min(
          1,
          (scrollPosition + windowHeight - sectionTop) / (sectionHeight + windowHeight)
        )
      );

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding bg-black py-12 md:py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8 md:mb-12 text-white text-center px-4">
            Professional Experience
          </h2>

          <div className="relative">
            {/* Static Timeline Line Background */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/20 transform md:-translate-x-1/2" />

            {/* Animated Timeline Line Progress */}
            <motion.div
              ref={timelineRef}
              className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-white transform md:-translate-x-1/2 origin-top"
              style={{
                height: timelineHeight,
              }}
            />

            <div className="space-y-8 md:space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${index}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
                  className={`relative flex items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-white rounded-full border-2 border-black transform md:-translate-x-1/2 z-10" />

                  {/* Content Card */}
                  <div
                    className={`flex-1 ml-12 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8 md:max-w-[45%]' : 'md:ml-auto md:pl-8 md:max-w-[45%]'
                    }`}
                  >
                    <div className={`border border-white/20 bg-white/5 p-4 md:p-6 hover:bg-white/10 transition-all duration-300 ${
                      exp.type === 'current' ? 'border-l-4 border-l-white' : ''
                    }`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-display font-bold text-white mb-1">
                          {exp.position}
                        </h3>
                        {exp.type === 'current' && (
                          <span className="inline-block px-2 py-1 md:px-3 md:py-1 bg-white/10 text-white text-xs font-semibold uppercase tracking-wider border border-white/20 mt-2 md:mt-0 w-fit">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-base md:text-lg font-semibold text-white/90 mb-2">
                        {exp.company}
                      </div>
                      <div className="text-xs md:text-sm text-white/60 mb-3 md:mb-4">
                        {exp.period} • {exp.location}
                      </div>
                      <p className="text-sm md:text-base text-white/80 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
