import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Navbar } from './Navbar';
import { HeadlineBlock } from './HeadlineBlock';
import { CardFan } from './CardFan';
import { HERO_STARS } from '../utils/heroConfig';
import GradientASCII from './GradientASCII';

const easeCurve = [0.22, 1, 0.36, 1] as const;

interface HeroProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  onDownload?: () => void;
  onOpenInstallModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentTab,
  onTabChange,
  onDownload,
  onOpenInstallModal,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero-section text-white select-none">
      {/* React Bits GradientASCII Background Animation - desktop and mobile view hero */}
      <div className="absolute inset-0 z-0 opacity-85 pointer-events-none overflow-hidden">
        <GradientASCII
          colors={["#1e3fd8", "#c8db6a", "#a5d8ff", "#38bdf8"]}
          shape="horizon"
          direction="top-to-bottom"
          characters=" ░▒▓█"
          cellSize={18}
          density={0.77}
          glyphOpacity={0.65}
          glow={1.15}
          gradientOpacity={0.83}
        />
      </div>

      {/* Film grain texture overlay */}
      <div
        className="absolute inset-0 bg-grain pointer-events-none z-10 opacity-50"
        aria-hidden="true"
      />

      {/* Composition div */}
      <div
        className="relative mx-auto overflow-hidden md:overflow-visible flex flex-col justify-between w-full h-full min-h-[100dvh] max-h-[100dvh] md:min-h-0 md:max-h-none md:w-[calc(1440*var(--u))] md:h-[calc(900*var(--u))]"
      >
        {/* Faint 4-point sparkle stars scattered around - desktop only */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block" aria-hidden="true">
          {HERO_STARS.map((star, idx) => (
            <motion.svg
              key={idx}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
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
          onOpenInstallModal={onOpenInstallModal}
        />

        {/* Center content: Badge + Headline + Subtitle + Mobile CTA */}
        <div
          className="w-full mx-auto flex-1 flex flex-col justify-center items-center py-2 md:py-0 md:pt-[calc(8*var(--u))] md:pb-[calc(8*var(--u))]"
        >
          <HeadlineBlock onDownload={onDownload} />
        </div>

        {/* Card fan cropped by the bottom edge of the viewport */}
        <CardFan />
      </div>
    </section>
  );
};
