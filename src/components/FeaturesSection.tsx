import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Flame, Smartphone, Palette, Terminal } from 'lucide-react';

interface FeaturesSectionProps {
  id?: string;
  onDownload?: () => void;
  onOpenInstallModal?: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  id = 'features',
  onDownload,
  onOpenInstallModal,
}) => {
  const features = [
    {
      icon: Flame,
      title: 'Daily Streak Engine',
      description: 'Keep your habits alive with momentum tracking and playful visual milestones that celebrate small wins.',
      badge: 'Motivation',
      badgeColor: '#FFB830',
      assetSrc: '/fire.webp',
    },
    {
      icon: Shield,
      title: '100% Offline & Private',
      description: 'Your data stays exclusively on your phone. No sign-in required, zero trackers, and zero telemetry.',
      badge: 'Privacy First',
      badgeColor: '#C8DB6A',
    },
    {
      icon: Smartphone,
      title: 'Featherweight APK',
      description: 'Under 35 MB total size. Instant launch in under 150ms with virtually zero battery or RAM overhead.',
      badge: 'Performance',
      badgeColor: '#6C4FFF',
      assetSrc: '/dumbell.webp',
    },
    {
      icon: Zap,
      title: 'Silky Spring Physics',
      description: 'Engineered with 120Hz micro-interactions, responsive haptic pulses, and intuitive swipe gestures.',
      badge: 'Fluid UI',
      badgeColor: '#C8DB6A',
    },
    {
      icon: Palette,
      title: 'Contextual Presets',
      description: 'Ready-to-use environments for Work, Health, Study, and Personal life with custom accent themes.',
      badge: 'Workflows',
      badgeColor: '#FFB830',
      assetSrc: '/bag.webp',
    },
    {
      icon: Terminal,
      title: 'Open Source Transparency',
      description: 'Fully inspectable, community-driven codebase with open issue trackers and direct release binaries.',
      badge: 'GPL v3',
      badgeColor: '#FFFFFF',
    },
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
            <span>✨ Pure Focus Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit'] text-white">
            Designed for real productivity
          </h2>
          <p className="text-sm sm:text-base text-white/60 mt-3 leading-relaxed">
            No endless subscription traps, no cluttered feeds. Just simple tasks, reliable streaks, and instant performance on your Android device.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="group relative p-6 sm:p-7 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle background glow */}
                <div
                  className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: feat.badgeColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center border border-white/10 shadow-sm"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                    >
                      <Icon size={20} style={{ color: feat.badgeColor }} />
                    </div>
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10"
                      style={{ color: feat.badgeColor }}
                    >
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-['Outfit'] tracking-tight text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {feat.assetSrc && (
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end">
                    <img
                      src={feat.assetSrc}
                      alt={feat.title}
                      className="w-14 h-14 object-contain opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300 drop-shadow-md"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#18181C] to-[#121214] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
          <div className="text-center sm:text-left">
            <h4 className="text-2xl font-bold font-['Outfit'] text-white">
              Ready to take control of your day?
            </h4>
            <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-md">
              Download the official Android APK directly from GitHub. Installs in under 30 seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="https://github.com/musabbinumair-dev/Tiko/releases/latest/download/tiko.apk"
              onClick={(e) => {
                if (onDownload) {
                  e.preventDefault();
                  onDownload();
                }
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-black font-['Outfit'] font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-neutral-200 transition-all cursor-pointer no-underline text-center"
            >
              <span>Download APK (34.2 MB)</span>
            </a>
            {onOpenInstallModal && (
              <button
                type="button"
                onClick={onOpenInstallModal}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-['Outfit'] font-semibold text-sm transition-all cursor-pointer text-center"
              >
                Installation Guide
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
