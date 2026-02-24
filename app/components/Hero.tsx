'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/me.jpeg"
          alt="Sandaruwan Sankalpa Silva"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-custom text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <img
              src="/images/img.png"
              alt="Profile"
              className="mx-auto rounded-full border-4 border-white/20 object-cover w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-3 md:mb-4 text-white px-2"
          >
            Sandaruwan
            <br />
            <span className="text-white/90">Sankalpa Silva</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-light mb-4 md:mb-6 text-white/80 tracking-wide uppercase px-2"
          >
            GIS Developer & Data Analyst
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            className="text-sm sm:text-base md:text-lg text-white/70 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Transforming spatial data into actionable intelligence through advanced GIS technologies and data-driven methodologies
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            onClick={scrollToAbout}
            className="px-6 py-2.5 md:px-8 md:py-3 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 hover:border-white/50 transition-all duration-300 uppercase tracking-wider text-xs md:text-sm"
          >
            Explore My Work
          </motion.button>
        </div>
      </div>
    </section>
  );
}
