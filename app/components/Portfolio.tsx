'use client';

import { useEffect, useState } from 'react';
import { PROFILE } from '@/data/profile';
import CityScene from './CityScene';
import type { CityLayer } from './city-renderer';

const layers: { id: CityLayer; title: string; short: string; description: string }[] = [
  {
    id: 'form',
    title: 'Read the city.',
    short: 'Urban form',
    description:
      'Every street, building, and open space tells part of a larger story. Spatial thinking connects the pieces.',
  },
  {
    id: 'green',
    title: 'Find the connections.',
    short: 'Green spaces',
    description:
      'Look beyond individual buildings. A different layer reveals how open spaces connect to the urban fabric.',
  },
  {
    id: 'data',
    title: 'Make patterns visible.',
    short: 'Data intensity',
    description:
      'Changing the visual language brings hidden patterns into focus. Analysis becomes useful when people can understand it.',
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '↗'}</span>;
}

function MapArtwork({ type }: { type: 'spatial' | 'data' | 'systems' }) {
  if (type === 'data')
    return (
      <svg viewBox="0 0 600 380" role="img" aria-label="Illustrative spatial data contour map">
        <defs>
          <radialGradient id="heat">
            <stop stopColor="#dc9471" />
            <stop offset=".48" stopColor="#bdc795" />
            <stop offset="1" stopColor="#e6e6cc" />
          </radialGradient>
        </defs>
        <rect width="600" height="380" fill="#d9debf" />
        <ellipse cx="310" cy="190" rx="235" ry="150" fill="url(#heat)" />
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M${-80 + i * 22} ${180 + i * 8} Q ${140 + i * 15} ${-180 + i * 18} ${350 + i * 13} ${150 + i * 8} T ${700 + i * 5} ${210 + i * 12}`}
            fill="none"
            stroke="#567453"
            strokeWidth="1"
            opacity=".45"
          />
        ))}
        {Array.from({ length: 35 }, (_, i) => (
          <circle
            key={i}
            cx={80 + ((i * 73) % 450)}
            cy={60 + ((i * 47) % 260)}
            r={i % 4 === 0 ? 5 : 2}
            fill={i % 4 === 0 ? '#ce714e' : '#476244'}
          />
        ))}
        <path d="M70 310H120M95 285V335" stroke="#3b563d" />
        <text x="440" y="330" fontSize="10" fill="#3b563d" letterSpacing="2">
          PATTERN / INSIGHT
        </text>
      </svg>
    );
  if (type === 'systems')
    return (
      <svg viewBox="0 0 600 380" role="img" aria-label="Illustrative decision-support interface">
        <rect width="600" height="380" fill="#a2ae89" />
        <rect x="58" y="58" width="484" height="270" rx="12" fill="#f3efde" />
        <rect x="58" y="58" width="484" height="34" rx="12" fill="#e7e5d0" />
        {[78, 93, 108].map((x) => (
          <circle key={x} cx={x} cy="76" r="3" fill="#819171" />
        ))}
        <path d="M88 126H150M88 143H132M88 160H143" stroke="#98a687" strokeWidth="5" />
        <rect x="178" y="112" width="336" height="110" rx="4" fill="#d0d6b7" />
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M${178 + i * 30} 112L${155 + i * 30} 222M178 ${112 + i * 10}H514`}
            stroke="#a2b18b"
            fill="none"
          />
        ))}
        <path
          d="M220 198 270 145 330 177 375 135 410 162 465 133"
          fill="none"
          stroke="#45674e"
          strokeWidth="3"
        />
        {Array.from({ length: 10 }, (_, i) => (
          <rect
            key={i}
            x={190 + i * 31}
            y={293 - ((i * 17) % 52)}
            width="18"
            height={10 + ((i * 17) % 52)}
            fill={i % 3 === 0 ? '#c48765' : '#7e9565'}
          />
        ))}
        <text x="88" y="296" fontSize="9" fill="#3b563d" letterSpacing="1">
          SPATIAL
        </text>
        <text x="88" y="310" fontSize="9" fill="#3b563d" letterSpacing="1">
          INTELLIGENCE
        </text>
      </svg>
    );
  return (
    <svg viewBox="0 0 600 380" role="img" aria-label="Illustrative cartographic street network">
      <rect width="600" height="380" fill="#cfdbb3" />
      {Array.from({ length: 30 }, (_, i) => (
        <rect
          key={i}
          x={(i % 6) * 105 - 20}
          y={Math.floor(i / 6) * 90 - 35}
          width={72 + (i % 2) * 9}
          height="58"
          rx="3"
          fill={i % 5 === 0 ? '#7c965b' : '#b4c39a'}
          transform="rotate(-12 300 190)"
        />
      ))}
      <path
        d="M-10 265C80 225 145 285 230 175S395 125 620 48"
        fill="none"
        stroke="#86aaa6"
        strokeWidth="27"
      />
      <path
        d="M-10 265C80 225 145 285 230 175S395 125 620 48"
        fill="none"
        stroke="#bed7c4"
        strokeWidth="1"
      />
      <path
        d="M80-10 400 395M-10 70 620 285M140-10 490 395"
        stroke="#f5f0de"
        strokeWidth="8"
        fill="none"
      />
      <path
        d="M80-10 400 395M-10 70 620 285M140-10 490 395"
        stroke="#aaa98b"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="309" cy="178" r="22" fill="#ba744e" />
      <circle cx="309" cy="178" r="8" fill="#f5f0de" />
      <path d="M332 178H410V148" stroke="#496146" fill="none" />
      <text x="422" y="150" fontSize="10" fill="#3b563d" letterSpacing="1.2">
        CONNECT THE MAP
      </text>
      <text x="422" y="166" fontSize="10" fill="#3b563d" letterSpacing="1.2">
        TO THE DECISION.
      </text>
    </svg>
  );
}

export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [paused, setPaused] = useState(false);
  const [layer, setLayer] = useState<CityLayer>('form');
  const [skill, setSkill] = useState('gis');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const selectedLayer = layers.find((l) => l.id === layer)!;
  const selectedSkill = PROFILE.skillCategories.find((s) => s.id === skill)!;
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menu) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false);
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [menu]);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timer);
  }, [copied]);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Sandaruwan Silva, home">
          <span className="brand-symbol" aria-hidden="true">
            s.
          </span>
          <span>
            SANDARUWAN
            <br />
            SILVA
          </span>
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          <a href="#perspective">Perspective</a>
          <a href="#practice">Practice</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-contact" href="#contact">
          Let’s talk <Arrow />
        </a>
        <button
          className="menu-button"
          aria-expanded={menu}
          aria-controls="mobile-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? 'Close −' : 'Menu +'}
        </button>
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className={`mobile-nav ${menu ? 'is-open' : ''}`}
          hidden={!menu}
        >
          {[
            ['Perspective', '#perspective'],
            ['Practice', '#practice'],
            ['About', '#about'],
            ['Contact', '#contact'],
          ].map(([label, url]) => (
            <a key={url} href={url} onClick={() => setMenu(false)}>
              {label}
              <Arrow />
            </a>
          ))}
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-heading">
          <div className="hero-kicker">
            <span className="status-dot" />
            URBAN INFORMATICS & CREATIVE TECHNOLOGY
          </div>
          <div className="hero-copy">
            <h1 id="hero-heading">
              Cities.
              <br />
              <span>Data.</span>
              <br />
              <em>Possibilities.</em>
            </h1>
            <p>
              I’m Sandaruwan. I connect spatial intelligence, design, and technology to make complex
              places easier to understand.
            </p>
            <a className="text-link" href="#perspective">
              Explore my perspective <Arrow />
            </a>
          </div>
          <div className="hero-city">
            <div className="scene-cross cross-one">+</div>
            <div className="scene-cross cross-two">+</div>
            <CityScene paused={paused} />
            <div className="scene-label">
              <span className="status-dot" />
              SPATIAL THINKING, IN MOTION
            </div>
            <span className="model-note">CONCEPT MODEL / 001</span>
          </div>
          <div className="hero-bottom">
            <span>
              BASED IN SRI LANKA
              <br />
              THINKING BEYOND BOUNDARIES
            </span>
            <a href="#perspective" className="scroll-cue">
              SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
            </a>
            <button
              onClick={() => setPaused(!paused)}
              aria-pressed={paused}
              className="motion-button"
            >
              {paused ? '▶ Enable motion' : 'Ⅱ Pause motion'}
            </button>
          </div>
        </section>

        <section
          className="perspective-section"
          id="perspective"
          aria-labelledby="perspective-heading"
        >
          <div className="section-top">
            <span className="eyebrow">01 / THE PERSPECTIVE</span>
            <span className="eyebrow">A DIFFERENT WAY OF SEEING</span>
          </div>
          <div className="perspective-intro" data-reveal>
            <h2 id="perspective-heading">
              A city is more
              <br />
              than a <em>map.</em>
            </h2>
            <div>
              <p className="large-copy">
                It’s a living system.
                <br />
                The interesting part is
                <br />
                how everything connects.
              </p>
              <p>
                Between geography and technology. Between information and intuition. Between the
                places we build and the people who live in them.
              </p>
            </div>
          </div>
          <div className="layer-lab" data-reveal>
            <div className="lab-copy">
              <span className="eyebrow">ONE PLACE. DIFFERENT PERSPECTIVES.</span>
              <h3>{selectedLayer.title}</h3>
              <p>{selectedLayer.description}</p>
              <div className="layer-tabs" role="group" aria-label="City model layers">
                {layers.map((l, i) => (
                  <button key={l.id} onClick={() => setLayer(l.id)} aria-pressed={layer === l.id}>
                    <span>0{i + 1}</span>
                    {l.short}
                    <span aria-hidden="true">{layer === l.id ? '●' : '○'}</span>
                  </button>
                ))}
              </div>
              <p className="demo-note">
                Illustrative model. Layer colours demonstrate a way of seeing; they do not represent
                measured city data.
              </p>
            </div>
            <div className="lab-scene">
              <CityScene layer={layer} paused={paused} />
              <div className="layer-legend">
                <span className={`legend-dot ${layer}`} />
                {layer === 'data'
                  ? 'Relative intensity · illustrative'
                  : layer === 'green'
                    ? 'Open space & roof gardens'
                    : 'Buildings, streets & open space'}
              </div>
            </div>
          </div>
        </section>

        <section className="practice-section" id="practice" aria-labelledby="practice-heading">
          <div className="section-top">
            <span className="eyebrow">02 / THE PRACTICE</span>
            <span className="eyebrow">FROM COMPLEXITY TO CLARITY</span>
          </div>
          <div className="section-heading" data-reveal>
            <h2 id="practice-heading">
              Maps with meaning.
              <br />
              Data with <em>direction.</em>
            </h2>
            <p>
              My work moves across disciplines.
              <br />
              The purpose stays the same:
              <br />
              make insight useful.
            </p>
          </div>
          <div className="practice-grid">
            {[
              {
                type: 'spatial' as const,
                number: '01',
                tag: 'GEOGRAPHY → UNDERSTANDING',
                title: 'Spatial intelligence',
                text: 'Cartography, GIS analysis, and web maps that connect a spatial question to a clear answer.',
                tools: 'ArcGIS Pro / QGIS / PostGIS',
                skill: 'gis',
              },
              {
                type: 'data' as const,
                number: '02',
                tag: 'INFORMATION → INSIGHT',
                title: 'Data, made legible',
                text: 'Analysis and visual narratives that bring patterns into focus and communicate what matters.',
                tools: 'Python / GeoPandas / Power BI',
                skill: 'data',
              },
              {
                type: 'systems' as const,
                number: '03',
                tag: 'IDEAS → WORKING SYSTEMS',
                title: 'Tools for better decisions',
                text: 'Web applications, urban dashboards, and AI-assisted workflows built around real planning questions.',
                tools: 'React / Next.js / Spatial AI',
                skill: 'dev',
              },
            ].map((item) => (
              <article key={item.type} className="practice-card" data-reveal>
                <div className="map-art">
                  <MapArtwork type={item.type} />
                  <span className="art-number">{item.number}</span>
                  <span className="art-caption">ILLUSTRATIVE STUDY</span>
                </div>
                <span className="eyebrow">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="card-bottom">
                  <span>{item.tools}</span>
                  <a
                    href="#toolkit"
                    onClick={() => setSkill(item.skill)}
                    aria-label={`Explore ${item.title} skills`}
                  >
                    <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="capability-list" data-reveal>
            <span className="eyebrow">HOW I CAN HELP</span>
            <div>
              {PROFILE.capabilities.map((c, i) => (
                <details key={c.title}>
                  <summary>
                    <span className="service-index">{String(i + 1).padStart(2, '0')}</span>
                    {c.title}
                    <span className="details-icon" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{c.description}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-heading">
          <div className="section-top">
            <span className="eyebrow">03 / THE PERSON</span>
            <span className="eyebrow">CURIOSITY IS THE COMMON THREAD</span>
          </div>
          <div className="about-grid">
            <div className="portrait-panel" data-reveal>
              <img
                src="/images/me.jpeg"
                alt="Sandaruwan Sankalpa Silva"
                width="720"
                height="900"
                loading="lazy"
              />
              <div className="portrait-caption">
                <span>
                  SANDARUWAN
                  <br />
                  SANKALPA SILVA
                </span>
                <span>
                  PANADURA,
                  <br />
                  SRI LANKA ↗
                </span>
              </div>
            </div>
            <div className="about-copy" data-reveal>
              <h2 id="about-heading">
                Analytical mind.
                <br />
                <em>Creative instinct.</em>
              </h2>
              <p className="about-lead">
                I’ve always been drawn to the spaces between disciplines.
              </p>
              <p>
                Graphic design taught me how to see. Urban Informatics & Planning at the University
                of Moratuwa gave my curiosity a framework. GIS became the language that connected it
                all.
              </p>
              <p>
                Today, I work across geospatial analysis, data, development, and visual
                communication. I’m interested in systems that help cities understand themselves
                better—and in making that understanding useful.
              </p>
              <a className="text-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                Connect on LinkedIn <Arrow />
              </a>
            </div>
          </div>
          <blockquote data-reveal>
            “Cities are conversations
            <br />
            between data and
            <br />
            <em>human experience.</em>”
            <footer>MY WORK IS TO MAKE THOSE CONVERSATIONS SMARTER.</footer>
          </blockquote>
          <div className="journey-strip" data-reveal>
            <span className="eyebrow">THE THREAD SO FAR</span>
            <div>
              {PROFILE.journey.map((j) => (
                <details key={j.chapter}>
                  <summary>
                    <span className="eyebrow">{j.year}</span>
                    <h3>{j.title}</h3>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{j.description}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="toolkit-section" id="toolkit" aria-labelledby="toolkit-heading">
          <div className="section-top">
            <span className="eyebrow">04 / THE TOOLKIT</span>
            <span className="eyebrow">CONNECTED DISCIPLINES</span>
          </div>
          <div className="toolkit-grid">
            <div data-reveal>
              <h2 id="toolkit-heading">
                Different tools.
                <br />
                <em>One mindset.</em>
              </h2>
              <p className="toolkit-intro">
                The right tool depends on the question.
                <br />
                The value is in knowing how they connect.
              </p>
              <div className="skill-tabs" role="group" aria-label="Skill disciplines">
                {PROFILE.skillCategories.map((s, i) => (
                  <button key={s.id} onClick={() => setSkill(s.id)} aria-pressed={skill === s.id}>
                    <span>0{i + 1}</span>
                    {s.title}
                    <Arrow />
                  </button>
                ))}
              </div>
            </div>
            <div className="skill-panel" aria-live="polite">
              <div className="orbit-diagram" aria-hidden="true">
                <div className="orbit-ring ring-one" />
                <div className="orbit-ring ring-two" />
                <div className="orbit-ring ring-three" />
                <div className="orbit-core">s.</div>
                <span className="orbit-node node-one">GIS</span>
                <span className="orbit-node node-two">DATA</span>
                <span className="orbit-node node-three">DESIGN</span>
                <span className="orbit-node node-four">CODE</span>
              </div>
              <span className="eyebrow">IN MY TOOLKIT</span>
              <h3>{selectedSkill.title}</h3>
              <p>{selectedSkill.description}</p>
              <ul className="tool-tags">
                {selectedSkill.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="experience-section" aria-labelledby="experience-heading">
          <div className="section-top">
            <span className="eyebrow">05 / THE EXPERIENCE</span>
            <span className="eyebrow">LEARNING THROUGH DOING</span>
          </div>
          <div className="experience-heading" data-reveal>
            <h2 id="experience-heading">
              Built through
              <br />
              <em>real work.</em>
            </h2>
            <p>
              Professional practice. Independent work.
              <br />
              Leadership and community.
            </p>
          </div>
          <div className="experience-list" data-reveal>
            {PROFILE.experience.map((e, i) => (
              <details key={`${e.company}-${i}`}>
                <summary>
                  <span className="experience-period">{e.period}</span>
                  <div>
                    <h3>{e.role}</h3>
                    <span>{e.company}</span>
                  </div>
                  <span className="details-icon" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{e.narrative}</p>
              </details>
            ))}
          </div>
          <div className="education-row" data-reveal>
            {PROFILE.philosophy.education.map((e) => (
              <div key={e.credential}>
                <span className="eyebrow">{e.type}</span>
                <h3>{e.credential}</h3>
                <p>{e.institution}</p>
                <span>{e.period}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="section-top">
            <span className="eyebrow">06 / WHAT’S NEXT?</span>
            <span className="eyebrow">START WITH A CONVERSATION</span>
          </div>
          <div className="contact-content" data-reveal>
            <h2 id="contact-heading">
              Have a complex
              <br />
              question?
              <br />
              <em>Let’s connect.</em>
            </h2>
            <a
              className="contact-arrow"
              href={`mailto:${PROFILE.email}`}
              aria-label={`Email ${PROFILE.email}`}
            >
              <Arrow />
            </a>
          </div>
          <div className="contact-bottom">
            <div>
              <p>
                Maps, data, cities, or a new idea.
                <br />
                I’d like to hear what you’re thinking.
              </p>
              <a className="email-link" href={`mailto:${PROFILE.email}`}>
                {PROFILE.email}
              </a>
              <button className="copy-button" onClick={copyEmail}>
                {copied ? 'Copied ✓' : 'Copy email ↗'}
              </button>
              <span className="copy-status" role="status">
                {copyError
                  ? 'Please select and copy the email address above.'
                  : copied
                    ? 'Email copied to clipboard.'
                    : ''}
              </span>
            </div>
            <div className="contact-links">
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Arrow />
              </a>
              <a href="https://github.com/sandaru01-IH" target="_blank" rel="noreferrer">
                GitHub <Arrow />
              </a>
              <a href="/Profile.pdf" target="_blank" rel="noreferrer">
                Profile PDF <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a href="#top" className="footer-brand">
          s.
        </a>
        <span>© {new Date().getFullYear()} SANDARUWAN SANKALPA SILVA</span>
        <span>MADE OF CURIOSITY.</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </div>
  );
}
