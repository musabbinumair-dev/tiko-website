import React from 'react';
import { motion } from 'motion/react';
import { Home, Sparkles, Layers, Palette, Download } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onDownload: () => void;
  latestVersion?: string;
}

interface NavTabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  isDownload?: boolean;
  badge?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onTabChange,
  onDownload,
  latestVersion = 'v1.2.0',
}) => {
  const tabs: NavTabItem[] = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Updates', label: 'Updates', icon: Sparkles, badge: latestVersion },
    { id: 'Features', label: 'Features', icon: Layers },
    { id: 'Themes', label: 'Themes', icon: Palette },
    { id: 'Download', label: 'Get APK', icon: Download, isDownload: true },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#121214]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] pb-safe"
    >
      <div className="grid grid-cols-5 items-center justify-around h-15 max-w-md mx-auto px-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                if (tab.isDownload) {
                  onDownload();
                } else {
                  onTabChange(tab.id);
                }
              }}
              className={`relative flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-colors cursor-pointer outline-none select-none ${
                isActive ? 'text-white' : 'text-white/50 hover:text-white/80 active:text-white'
              }`}
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="active-mobile-tab-pill"
                  className="absolute inset-x-2 top-1.5 bottom-1.5 rounded-2xl bg-white/[0.08] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] -z-10"
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                />
              )}

              {/* Icon with optional badge */}
              <div className="relative">
                <Icon
                  size={20}
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-110 text-[#C8DB6A]' : 'scale-100 text-white/60'
                  }`}
                />
                {tab.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#C8DB6A]" />
                )}
              </div>

              {/* Caption */}
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 truncate max-w-[64px] ${
                  isActive ? 'font-semibold text-white' : 'text-white/60'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
