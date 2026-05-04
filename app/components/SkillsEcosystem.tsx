'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PROFILE } from '@/data/profile';

type SkillCategory = (typeof PROFILE.skillCategories)[0];

// Positions for 6 nodes in a circle (angle in degrees, starting from top, clockwise)
const ANGLES = [-90, -30, 30, 90, 150, -150]; // degrees
const RADIUS = 42; // as percentage of container

function polarToPercent(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  };
}

function SkillNode({
  skill,
  angle,
  index,
  isActive,
  onClick,
  inView,
}: {
  skill: SkillCategory;
  angle: number;
  index: number;
  isActive: boolean;
  onClick: () => void;
  inView: boolean;
}) {
  const pos = polarToPercent(angle, RADIUS);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      onClick={onClick}
      className="absolute flex items-center justify-center group"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
        width: 'clamp(80px, 12vw, 120px)',
        height: 'clamp(80px, 12vw, 120px)',
      }}
    >
      <div
        className={`w-full h-full rounded-full border flex items-center justify-center transition-all duration-500 ${
          isActive
            ? 'bg-white border-white'
            : 'bg-black border-white/20 hover:border-white/50 hover:bg-white/5'
        }`}
      >
        <p
          className={`text-center font-poppins font-semibold leading-tight transition-colors duration-300 ${
            isActive ? 'text-black' : 'text-white/70 group-hover:text-white'
          }`}
          style={{ fontSize: 'clamp(0.5rem, 1.1vw, 0.7rem)', padding: '8px', maxWidth: '80%' }}
        >
          {skill.title}
        </p>
      </div>
    </motion.button>
  );
}

export default function SkillsEcosystem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeSkill = PROFILE.skillCategories.find((s) => s.id === activeId) ?? null;

  const toggleSkill = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="skills" className="bg-black px-6 md:px-12 lg:px-20 py-24 md:py-36 border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="label-text mb-6"
          >
            Knowledge Ecosystem
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : { y: '100%' }}
              transition={{ duration: 1.05, ease: [0.33, 1, 0.68, 1] }}
              className="font-cinematic font-black text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 7.5vw, 6rem)' }}
            >
              Skills
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-white/40 mt-4 font-light"
            style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1rem)', maxWidth: '44ch' }}
          >
            Six domains that define how I approach problems. Select any to explore tools and context.
          </motion.p>
        </div>

        <div ref={sectionRef} className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Orbital diagram — desktop */}
          <div className="hidden md:block flex-shrink-0" style={{ width: 'min(480px, 80vw)', height: 'min(480px, 80vw)' }}>
            <div className="relative w-full h-full">
              {/* SVG lines from center to nodes */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                {PROFILE.skillCategories.map((skill, i) => {
                  const pos = polarToPercent(ANGLES[i], RADIUS);
                  return (
                    <motion.line
                      key={skill.id}
                      x1="50"
                      y1="50"
                      x2={pos.x}
                      y2={pos.y}
                      stroke="white"
                      strokeOpacity={activeId === skill.id ? '0.3' : '0.06'}
                      strokeWidth="0.3"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                    />
                  );
                })}

                {/* Orbit circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.04"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ delay: 0.2, duration: 1.2 }}
                />
              </svg>

              {/* Center node */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute border border-white/15 rounded-full flex items-center justify-center"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'clamp(90px, 14vw, 130px)',
                  height: 'clamp(90px, 14vw, 130px)',
                }}
              >
                <div className="text-center">
                  <p className="font-poppins font-bold text-white" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
                    Knowledge
                  </p>
                  <p className="font-poppins font-bold text-white" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
                    Ecosystem
                  </p>
                </div>
              </motion.div>

              {/* Skill nodes */}
              {PROFILE.skillCategories.map((skill, i) => (
                <SkillNode
                  key={skill.id}
                  skill={skill}
                  angle={ANGLES[i]}
                  index={i}
                  isActive={activeId === skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  inView={inView}
                />
              ))}
            </div>
          </div>

          {/* Mobile grid */}
          <div className="md:hidden w-full grid grid-cols-2 gap-3">
            {PROFILE.skillCategories.map((skill, i) => (
              <motion.button
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                onClick={() => toggleSkill(skill.id)}
                className={`p-4 border text-left transition-all duration-400 ${
                  activeId === skill.id
                    ? 'bg-white border-white text-black'
                    : 'border-white/15 hover:border-white/35'
                }`}
              >
                <p
                  className={`font-poppins font-semibold text-sm leading-snug ${
                    activeId === skill.id ? 'text-black' : 'text-white'
                  }`}
                >
                  {skill.title}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="flex-1 min-h-[260px] flex items-start">
            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full"
                >
                  <p className="label-text text-white/30 mb-4">Selected Domain</p>
                  <h3 className="font-poppins font-bold text-white mb-4"
                    style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
                    {activeSkill.title}
                  </h3>
                  <p className="text-white/55 leading-relaxed font-light mb-8"
                    style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1rem)', maxWidth: '42ch' }}>
                    {activeSkill.description}
                  </p>
                  <div>
                    <p className="label-text mb-4">Tools &amp; Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {activeSkill.tools.map((tool, i) => (
                        <motion.span
                          key={tool}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          className="px-3 py-1.5 border border-white/15 text-white/60 font-medium"
                          style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col justify-center"
                >
                  <p className="label-text text-white/20 mb-6">Select a domain</p>
                  <p className="text-white/20 font-light leading-relaxed"
                    style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', maxWidth: '38ch' }}>
                    Click any node in the ecosystem to explore skills, tools, and context for that domain.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
