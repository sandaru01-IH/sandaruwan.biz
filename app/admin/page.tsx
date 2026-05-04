'use client';

import { useState, useEffect } from 'react';
import { PROFILE } from '@/data/profile';

const ADMIN_PASSWORD = 'sandaruwan2025';

type EditableProfile = typeof PROFILE;

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className="mb-5">
      <label className="block text-white/40 text-xs tracking-[0.2em] uppercase mb-2 font-medium">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full bg-white/4 border border-white/10 text-white text-sm p-3 font-light focus:outline-none focus:border-white/30 resize-vertical transition-colors"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/4 border border-white/10 text-white text-sm p-3 font-light focus:outline-none focus:border-white/30 transition-colors"
        />
      )}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<EditableProfile>(PROFILE);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'journey' | 'skills'>('profile');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('adminProfileOverride');
      if (stored) setData(JSON.parse(stored));
    } catch {}
  }, []);

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };

  const save = () => {
    localStorage.setItem('adminProfileOverride', JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const exportJson = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    localStorage.removeItem('adminProfileOverride');
    setData(PROFILE);
  };

  const updateProfile = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const updateContact = (key: string, value: string) => {
    setData((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value } }));
  };

  const updateExperience = (index: number, key: string, value: string) => {
    setData((prev) => {
      const exp = [...prev.experience];
      exp[index] = { ...exp[index], [key]: value } as typeof exp[0];
      return { ...prev, experience: exp };
    });
  };

  const updateJourney = (index: number, key: string, value: string) => {
    setData((prev) => {
      const journey = [...prev.journey];
      journey[index] = { ...journey[index], [key]: value };
      return { ...prev, journey };
    });
  };

  const updateSkillDesc = (index: number, value: string) => {
    setData((prev) => {
      const cats = [...prev.skillCategories];
      cats[index] = { ...cats[index], description: value };
      return { ...prev, skillCategories: cats };
    });
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8 font-medium">
            Admin Access
          </p>
          <h1 className="font-poppins font-bold text-white text-2xl mb-8">
            Content Manager
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Password"
            className="w-full bg-white/4 border border-white/10 text-white text-sm p-4 mb-4 focus:outline-none focus:border-white/30 transition-colors"
          />
          {error && <p className="text-red-400 text-xs mb-4">{error}</p>}
          <button
            onClick={login}
            className="w-full py-4 border border-white/20 text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            Enter
          </button>
          <p className="text-white/20 text-xs mt-6 text-center">
            Default password: sandaruwan2025
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile & Contact' },
    { id: 'experience', label: 'Experience' },
    { id: 'journey', label: 'Journey' },
    { id: 'skills', label: 'Skills' },
  ] as const;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <div className="border-b border-white/8 px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 bg-black/90 backdrop-blur-xl z-10">
        <div>
          <p className="label-text text-white/30 mb-0.5">Admin Panel</p>
          <h1 className="font-poppins font-bold text-white text-sm">Content Manager</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={reset}
            className="text-xs tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors"
          >
            Reset to Default
          </button>
          <button
            onClick={exportJson}
            className="px-5 py-2.5 border border-white/20 text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            Export JSON
          </button>
          <button
            onClick={save}
            className={`px-5 py-2.5 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
              saved ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white hover:text-black'
            }`}
          >
            {saved ? 'Saved ✓' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="px-6 md:px-12 py-8">
        {/* Info box */}
        <div className="border border-white/8 p-5 mb-8 max-w-3xl">
          <p className="label-text text-white/30 mb-2">How the admin panel works</p>
          <p className="text-white/50 text-sm leading-relaxed">
            Changes saved here are stored in your browser&apos;s localStorage for preview. To permanently update the live site, click{' '}
            <strong className="text-white/70">Export JSON</strong>, then replace the content in{' '}
            <code className="text-white/60 bg-white/5 px-1 py-0.5 text-xs">data/profile.ts</code>{' '}
            and redeploy.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-10 border-b border-white/8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-white border-b border-white -mb-px'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <p className="label-text text-white/30 mb-8">Core Identity</p>
              <Field label="Full Name" value={data.name} onChange={(v) => updateProfile('name', v)} />
              <Field label="Tagline" value={data.tagline} onChange={(v) => updateProfile('tagline', v)} />
              <Field label="Headline Quote" value={data.headline} onChange={(v) => updateProfile('headline', v)} multiline />
              <Field label="University" value={data.university} onChange={(v) => updateProfile('university', v)} />
              <Field label="Degree" value={data.degree} onChange={(v) => updateProfile('degree', v)} />

              <div className="h-px bg-white/8 my-8" />
              <p className="label-text text-white/30 mb-8">Contact Details</p>
              <Field label="Email" value={data.contact.email} onChange={(v) => updateContact('email', v)} />
              <Field label="LinkedIn URL" value={data.contact.linkedin} onChange={(v) => updateContact('linkedin', v)} />
              <Field label="Location" value={data.contact.location} onChange={(v) => updateContact('location', v)} />
              <Field label="Closing Line" value={data.contact.closingLine} onChange={(v) => updateContact('closingLine', v)} multiline />

              <div className="h-px bg-white/8 my-8" />
              <p className="label-text text-white/30 mb-8">Philosophy</p>
              <Field
                label="Pull Quote"
                value={data.philosophy.quote}
                onChange={(v) =>
                  setData((prev) => ({ ...prev, philosophy: { ...prev.philosophy, quote: v } }))
                }
                multiline
              />
              {data.philosophy.paragraphs.map((para, i) => (
                <Field
                  key={i}
                  label={`Story Paragraph ${i + 1}`}
                  value={para}
                  onChange={(v) =>
                    setData((prev) => {
                      const paragraphs = [...prev.philosophy.paragraphs];
                      paragraphs[i] = v;
                      return { ...prev, philosophy: { ...prev.philosophy, paragraphs } };
                    })
                  }
                  multiline
                />
              ))}
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div>
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-8 border border-white/8 p-6">
                  <p className="label-text text-white/30 mb-4">
                    Experience #{i + 1}
                  </p>
                  <Field label="Period" value={exp.period} onChange={(v) => updateExperience(i, 'period', v)} />
                  <Field label="Company" value={exp.company} onChange={(v) => updateExperience(i, 'company', v)} />
                  <Field label="Role" value={exp.role} onChange={(v) => updateExperience(i, 'role', v)} />
                  <Field label="Narrative" value={exp.narrative} onChange={(v) => updateExperience(i, 'narrative', v)} multiline />
                </div>
              ))}
            </div>
          )}

          {/* Journey Tab */}
          {activeTab === 'journey' && (
            <div>
              {data.journey.map((chapter, i) => (
                <div key={i} className="mb-8 border border-white/8 p-6">
                  <p className="label-text text-white/30 mb-4">Chapter {chapter.chapter}</p>
                  <Field label="Title" value={chapter.title} onChange={(v) => updateJourney(i, 'title', v)} />
                  <Field label="Subtitle" value={chapter.subtitle} onChange={(v) => updateJourney(i, 'subtitle', v)} />
                  <Field label="Year" value={chapter.year} onChange={(v) => updateJourney(i, 'year', v)} />
                  <Field label="Description" value={chapter.description} onChange={(v) => updateJourney(i, 'description', v)} multiline />
                </div>
              ))}
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div>
              {data.skillCategories.map((cat, i) => (
                <div key={i} className="mb-6 border border-white/8 p-6">
                  <p className="label-text text-white/30 mb-4">{cat.title}</p>
                  <Field
                    label="Description"
                    value={cat.description}
                    onChange={(v) => updateSkillDesc(i, v)}
                    multiline
                  />
                  <div>
                    <p className="label-text text-white/25 mb-3">Tools (comma-separated)</p>
                    <input
                      type="text"
                      value={cat.tools.join(', ')}
                      onChange={(e) =>
                        setData((prev) => {
                          const cats = [...prev.skillCategories];
                          cats[i] = { ...cats[i], tools: e.target.value.split(',').map((t) => t.trim()) };
                          return { ...prev, skillCategories: cats };
                        })
                      }
                      className="w-full bg-white/4 border border-white/10 text-white text-sm p-3 font-light focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
