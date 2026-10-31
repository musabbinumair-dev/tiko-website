import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Navbar } from './Navbar';
import { HeadlineBlock } from './HeadlineBlock';
import { CardFan } from './CardFan';
import { HERO_STARS } from '../utils/heroConfig';
import { BlackHoleEffect } from './ui/black-hole-vortex-animation';

const easeCurve = [0.22, 1, 0.36, 1] as const;

interface HeroProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  onDownload?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentTab, onTabChange, onDownload }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero-section text-white select-none">
      {/* 21st.dev Black Hole Vortex Background Animation */}
      <BlackHoleEffect className="z-0 opacity-80" />

      {/* Film grain texture overlay */}
      <div
        className="absolute inset-0 bg-grain pointer-events-none z-10 opacity-50"
        aria-hidden="true"
      />

      {/* Composition div */}
      <div
        className="relative mx-auto overflow-visible flex flex-col justify-between"
        style={{
          width: 'calc(1440 * var(--u))',
          height: 'calc(900 * var(--u))',
        }}
      >
        {/* Faint 4-point sparkle stars scattered around */}
        <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
          {HERO_STARS.map((star, idx) => (
            <motion.svg
              key={idx}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{
                left: star.x,
                top: star.y,
                width: `calc(${star.size} * var(--u))`,
                height: `calc(${star.size} * var(--u))`,
                color: star.color,
              }}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.5, rotate: -45, x: '-50%', y: '-50%' }
              }
              animate={{
                opacity: star.opacity,
                scale: 1,
                rotate: 0,
                x: '-50%',
                y: '-50%',
              }}
              transition={{
                delay: 0.1 + idx * 0.08,
                duration: 0.5,
                ease: easeCurve,
              }}
            >
              <path d="M12 0 C12 6.6 6.6 12 0 12 C6.6 12 12 17.4 12 24 C12 17.4 17.4 12 24 12 C17.4 12 12 6.6 12 0 Z" />
            </motion.svg>
          ))}
        </div>

        {/* 1. Top Bar */}
        <Navbar
          currentTab={currentTab}
          onTabChange={onTabChange}
          onDownload={onDownload}
        />

        {/* Center content: Badge + Headline */}
        <div
          className="w-full mx-auto flex-1 flex flex-col justify-center items-center"
          style={{
            paddingTop: 'calc(8 * var(--u))',
            paddingBottom: 'calc(8 * var(--u))',
          }}
        >
          <HeadlineBlock />
        </div>

        {/* Card fan cropped by the bottom edge of the viewport */}
        <CardFan />
      </div>
    </section>
  );
};
