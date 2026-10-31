import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const NAV_ITEMS = ['Home', 'Updates', 'Features', 'Themes', 'Download'];
const DOWNLOAD_URL = 'https://github.com/musabbinumair-dev/Tiko/releases/latest/download/tiko.apk';
const easeCurve = [0.22, 1, 0.36, 1] as const;

interface NavbarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  onDownload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onDownload,
}) => {
  const [internalTab, setInternalTab] = useState('Home');
  const activeTab = currentTab !== undefined ? currentTab : internalTab;
  const shouldReduceMotion = useReducedMotion();

  const handleTabClick = (item: string) => {
    if (onTabChange) {
      onTabChange(item);
    } else {
      setInternalTab(item);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onTabChange) {
      onTabChange('Home');
    } else {
      setInternalTab('Home');
    }
  };

  return (
    <header
      className="w-full mx-auto flex items-center justify-between relative z-40 select-none"
      style={{
        paddingTop: 'calc(32 * var(--u))',
        paddingBottom: 'calc(16 * var(--u))',
        paddingLeft: 'calc(48 * var(--u))',
        paddingRight: 'calc(48 * var(--u))',
      }}
    >
      {/* Brand logo - clean without sparkles */}
      <motion.div
        className="flex items-center will-change-transform"
        initial={shouldReduceMotion ? false : { y: '-40%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ delay: 0.10, duration: 0.6, ease: easeCurve }}
      >
        <a
          href="#home"
          onClick={handleLogoClick}
          className="text-white font-['Outfit'] font-black tracking-tight flex items-center cursor-pointer"
          style={{
            fontSize: 'calc(34 * var(--u))',
          }}
        >
          Tiko
        </a>
      </motion.div>

      {/* Floating pill navigation with snappy, stretchy frosted glass toggle */}
      <motion.nav
        aria-label="Primary"
        className="bg-[#141416]/75 border border-white/[0.08] rounded-full flex items-center shadow-[0_12px_36px_rgba(0,0,0,0.55)] backdrop-blur-2xl relative will-change-transform"
        style={{
          padding: 'calc(5 * var(--u))',
          gap: 'calc(3 * var(--u))',
        }}
        initial={shouldReduceMotion ? false : { y: '-50%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7, ease: easeCurve }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item;
          const isDownload = item === 'Download';

          if (isDownload) {
            return (
              <motion.a
                key={item}
                href={DOWNLOAD_URL}
                download="tiko.apk"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleTabClick(item);
                  onDownload?.();
                }}
                className={`relative rounded-full font-medium tracking-wide transition-colors duration-200 cursor-pointer outline-none whitespace-nowrap inline-flex items-center justify-center no-underline ${
                  isActive ? 'text-white' : 'text-[#8E8E93] hover:text-[#D1D1D6]'
                }`}
                style={{
                  padding: 'calc(7 * var(--u)) calc(22 * var(--u))',
                  fontSize: 'calc(14 * var(--u))',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.10] border border-white/[0.13] shadow-[0_4px_16px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.18)] backdrop-blur-xl"
                    transition={{
                      type: 'spring',
                      stiffness: 360,
                      damping: 24,
                      mass: 0.75,
                    }}
                  />
                )}
                <span className="relative z-10 block">{item}</span>
              </motion.a>
            );
          }

          return (
            <motion.button
              key={item}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabClick(item)}
              className={`relative rounded-full font-medium tracking-wide transition-colors duration-200 cursor-pointer outline-none whitespace-nowrap ${
                isActive ? 'text-white' : 'text-[#8E8E93] hover:text-[#D1D1D6]'
              }`}
              style={{
                padding: 'calc(7 * var(--u)) calc(22 * var(--u))',
                fontSize: 'calc(14 * var(--u))',
              }}
            >
              {/* Premium frosted glass active pill with snappy, stretchy spring */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.10] border border-white/[0.13] shadow-[0_4px_16px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.18)] backdrop-blur-xl"
                  transition={{
                    type: 'spring',
                    stiffness: 360,
                    damping: 24,
                    mass: 0.75,
                  }}
                />
              )}
              <span className="relative z-10 block">{item}</span>
            </motion.button>
          );
        })}
      </motion.nav>

      {/* Right action */}
      <motion.div
        className="flex items-center will-change-transform"
        initial={shouldReduceMotion ? false : { y: '-40%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.6, ease: easeCurve }}
      >
        <a
          href={DOWNLOAD_URL}
          download="tiko.apk"
          onClick={() => onDownload?.()}
          className="bg-white text-black font-semibold rounded-full shadow-md hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer whitespace-nowrap inline-flex items-center justify-center text-center no-underline"
          style={{
            padding: 'calc(10 * var(--u)) calc(24 * var(--u))',
            fontSize: 'calc(14 * var(--u))',
          }}
        >
          Get the app
        </a>
      </motion.div>
    </header>
  );
};

