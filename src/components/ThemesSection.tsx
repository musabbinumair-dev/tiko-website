import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Flame, Sparkles } from 'lucide-react';

interface ThemesSectionProps {
  id?: string;
  onDownload?: () => void;
}

interface ThemeOption {
  id: string;
  name: string;
  accent: string;
  surface: string;
  text: string;
  cardBg: string;
  asset: string;
  vibe: string;
}

const THEMES: ThemeOption[] = [
  {
    id: 'citron',
    name: 'Citron Lime',
    accent: '#C8DB6A',
    surface: '#181A12',
    text: '#121214',
    cardBg: '#C8DB6A',
    asset: '/fire.webp',
    vibe: 'High-energy daily streak & momentum tracking',
  },
  {
    id: 'amber',
    name: 'Honey Amber',
    accent: '#FFB830',
    surface: '#1A1810',
    text: '#121214',
    cardBg: '#FFB830',
    asset: '/dumbell.webp',
    vibe: 'Warm morning workouts, health & fitness routines',
  },
  {
    id: 'violet',
    name: 'Electric Violet',
    accent: '#6C4FFF',
    surface: '#15121E',
    text: '#FFFFFF',
    cardBg: '#6C4FFF',
    asset: '/bag.webp',
    vibe: 'Focused professional sprints, meetings & deep work',
  },
  {
    id: 'dark',
    name: 'Dark OLED',
    accent: '#FFFFFF',
    surface: '#121214',
    text: '#FFFFFF',
    cardBg: '#18181A',
    asset: '/alarm.webp',
    vibe: 'Ultra clean black slate for OLED battery savings',
  },
  {
    id: 'cream',
    name: 'Almond Cream',
    accent: '#D4CEB8',
    surface: '#171614',
    text: '#1A1A1A',
    cardBg: '#EFEBDD',
    asset: '/book.webp',
    vibe: 'Gentle low-fatigue reading, notes & study sessions',
  },
];

export const ThemesSection: React.FC<ThemesSectionProps> = ({
  id = 'themes',
  onDownload,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(THEMES[0]);
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({ 0: true, 1: true });

  const toggleTask = (index: number) => {
    setCompletedTasks((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const sampleTasks = [
    { title: 'Morning stretching & 15m cardio', category: 'Health', time: '7:30 AM' },
    { title: 'Review product sprint changelog', category: 'Work', time: '10:00 AM' },
    { title: 'Read 25 pages of deep work principles', category: 'Study', time: '8:00 PM' },
  ];

  return (
    <section
      id={id}
      className="w-full bg-[#0E0E0E] text-white py-16 sm:py-24 px-4 sm:px-8 border-t border-white/5 relative z-30 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-[#C8DB6A] mb-3 tracking-wide">
            <span>🎨 Personalize Your Space</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit'] text-white">
            Themes that fit your rhythm
          </h2>
          <p className="text-sm sm:text-base text-white/60 mt-3 leading-relaxed">
            Every category comes paired with an OLED-optimized color palette. Switch tones anytime to match your focus mode.
          </p>
        </div>

        {/* Interactive Theme Selector Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto no-scrollbar pb-3 mb-10 max-w-2xl mx-auto">
          {THEMES.map((theme) => {
            const isSelected = selectedTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setSelectedTheme(theme)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
                  isSelected
                    ? 'text-white bg-white/15 border border-white/20 shadow-lg scale-105'
                    : 'text-white/60 hover:text-white bg-white/[0.04] border border-white/5 hover:border-white/10'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full shadow-sm"
                  style={{ backgroundColor: theme.accent }}
                />
                <span>{theme.name}</span>
                {isSelected && (
                  <motion.div
                    layoutId="active-theme-ring"
                    className="absolute inset-0 rounded-2xl border-2 border-[#C8DB6A] -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Live Theme Preview Card Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Column: Theme details & pitch */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
              <Sparkles size={14} style={{ color: selectedTheme.accent }} />
              <span>Theme Profile</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-white mb-3">
              {selectedTheme.name}
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
              {selectedTheme.vibe}
            </p>

            <div className="space-y-3 bg-[#141416] p-5 rounded-2xl border border-white/10 mb-6 text-xs sm:text-sm text-white/80">
              <div className="flex items-center justify-between">
                <span className="text-white/50">Primary Accent</span>
                <span className="font-mono font-bold" style={{ color: selectedTheme.accent }}>
                  {selectedTheme.accent}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Contrast Mode</span>
                <span className="font-medium text-white">Full OLED Black (0% Gray)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Haptic Weight</span>
                <span className="font-medium text-white">Snappy Spring Feedback</span>
              </div>
            </div>

            <a
              href="https://github.com/musabbinumair-dev/Tiko/releases/latest/download/tiko.apk"
              download="tiko.apk"
              onClick={() => onDownload?.()}
              className="w-full sm:w-auto self-start px-6 py-3.5 rounded-2xl bg-white text-black font-['Outfit'] font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg hover:bg-neutral-200 transition-all cursor-pointer no-underline text-center"
            >
              <span>Download with all 5 themes</span>
            </a>
          </div>

          {/* Right Column: Live Mock App Interface */}
          <div className="lg:col-span-7 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTheme.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm rounded-[36px] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)] border border-white/15 relative overflow-hidden"
                style={{ backgroundColor: selectedTheme.surface }}
              >
                {/* Simulated Phone Top Speaker & Notch */}
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono tracking-tight text-white/70">9:41</span>
                  </div>
                  <div className="w-16 h-3 rounded-full bg-white/10" />
                  <div className="flex items-center gap-1.5 text-xs text-white/70">
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Simulated App Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">Today's Focus</span>
                    <h4 className="text-xl font-bold font-['Outfit'] text-white">Sunday Tasks</h4>
                  </div>
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-md"
                    style={{
                      backgroundColor: selectedTheme.accent,
                      color: selectedTheme.text,
                    }}
                  >
                    <Flame size={18} className="fill-current" />
                  </div>
                </div>

                {/* Simulated Task Checklist with click toggle */}
                <div className="space-y-2.5 mb-6">
                  {sampleTasks.map((t, idx) => {
                    const isDone = !!completedTasks[idx];
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleTask(idx)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer text-left border ${
                          isDone
                            ? 'bg-white/[0.04] border-white/5 text-white/50'
                            : 'bg-white/[0.08] border-white/10 text-white shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                              isDone ? 'border' : 'border'
                            }`}
                            style={{
                              backgroundColor: isDone ? selectedTheme.accent : 'transparent',
                              borderColor: isDone ? selectedTheme.accent : 'rgba(255,255,255,0.3)',
                              color: selectedTheme.text,
                            }}
                          >
                            {isDone && <Check size={14} className="stroke-[3]" />}
                          </div>
                          <div>
                            <span
                              className={`text-xs sm:text-sm font-['Outfit'] block ${
                                isDone ? 'line-through text-white/40' : 'font-semibold text-white'
                              }`}
                            >
                              {t.title}
                            </span>
                            <span className="text-[10px] text-white/40">{t.time}</span>
                          </div>
                        </div>
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            color: isDone ? 'rgba(255,255,255,0.4)' : selectedTheme.accent,
                          }}
                        >
                          {t.category}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Category Mascot Banner */}
                <div
                  className="rounded-2xl p-4 flex items-center justify-between shadow-lg relative overflow-hidden"
                  style={{
                    backgroundColor: selectedTheme.cardBg,
                    color: selectedTheme.text,
                  }}
                >
                  <div className="relative z-10">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 block">
                      Active Theme
                    </span>
                    <strong className="text-lg font-black font-['Outfit'] block">
                      {selectedTheme.name}
                    </strong>
                    <span className="text-xs opacity-80 mt-0.5 block font-medium">
                      Tap tasks above to test haptics
                    </span>
                  </div>

                  <img
                    src={selectedTheme.asset}
                    alt={selectedTheme.name}
                    className="w-16 h-16 object-contain drop-shadow-lg -mr-2"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
