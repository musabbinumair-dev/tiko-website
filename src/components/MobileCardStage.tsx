import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { HERO_CARDS, CardConfig } from '../utils/heroConfig';
import { ChevronLeft, ChevronRight, Check, Flame } from 'lucide-react';

interface MobileCardStageProps {
  onDownload?: () => void;
  onOpenInstallModal?: () => void;
}

const CATEGORY_META: Record<string, { emoji: string; chipLabel: string; chipIcon: 'check' | 'flame' }> = {
  streak: { emoji: '🔥', chipLabel: '7 day streak', chipIcon: 'flame' },
  health: { emoji: '💪', chipLabel: 'Gym done', chipIcon: 'check' },
  work: { emoji: '💼', chipLabel: 'Sprint done', chipIcon: 'check' },
  personal: { emoji: '⏰', chipLabel: 'Wake up 6:30', chipIcon: 'check' },
  study: { emoji: '📚', chipLabel: 'Read 20 mins', chipIcon: 'check' },
};

export const MobileCardStage: React.FC<MobileCardStageProps> = ({
  onDownload,
  onOpenInstallModal,
}) => {
  const [activeIndex, setActiveIndex] = useState(2); // Start on 'streak' (center card)
  const shouldReduceMotion = useReducedMotion();

  const currentCard = HERO_CARDS[activeIndex];
  const meta = CATEGORY_META[currentCard.id] || { emoji: '✨', chipLabel: 'Task done', chipIcon: 'check' };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? HERO_CARDS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === HERO_CARDS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-center select-none pt-4 pb-2 px-2">
      {/* Category Horizontal Pill Switcher */}
      <div className="w-full max-w-sm flex items-center justify-between gap-1 p-1 bg-white/[0.05] border border-white/10 rounded-2xl backdrop-blur-xl mb-6 overflow-x-auto no-scrollbar">
        {HERO_CARDS.map((card, idx) => {
          const isSelected = idx === activeIndex;
          const cardMeta = CATEGORY_META[card.id];

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[40px] ${
                isSelected
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80 active:scale-95'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="active-mobile-cat-pill"
                  className="absolute inset-0 rounded-xl bg-white/[0.14] border border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
              <span className="relative z-10 text-sm">{cardMeta.emoji}</span>
              <span className="relative z-10 font-['Outfit']">{card.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full max-w-[340px] xs:max-w-[360px] h-[400px] xs:h-[420px] flex items-center justify-center">
        {/* Navigation arrows */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous card"
          className="absolute -left-3 xs:-left-4 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 border border-white/15 backdrop-blur-md text-white flex items-center justify-center shadow-lg transition-transform cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next card"
          className="absolute -right-3 xs:-right-4 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 border border-white/15 backdrop-blur-md text-white flex items-center justify-center shadow-lg transition-transform cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>

        {/* Card Stage Card Frame */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.92, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, scale: 0.92, y: -16 }
            }
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 22,
            }}
            className="w-[285px] xs:w-[310px] h-[375px] xs:h-[395px] rounded-[36px] relative overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between"
            style={{
              backgroundColor: currentCard.bgColor,
              border: currentCard.border || '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Top Bar inside card */}
            <div className="flex items-center justify-between p-7 relative z-20">
              <div className="flex items-center gap-3">
                <h3
                  className="font-['Outfit'] font-black tracking-tight text-3xl leading-none"
                  style={{ color: currentCard.titleColor }}
                >
                  {currentCard.title}
                </h3>
              </div>

              {/* Circular Action Button */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
                style={{
                  backgroundColor: currentCard.id === 'personal' ? '#FFFFFF' : '#151515',
                }}
              >
                <svg
                  className="w-4 h-4 stroke-[2.5]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={currentCard.id === 'personal' ? '#000000' : '#FFFFFF'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>

            {/* Spark accent dashes if configured */}
            {currentCard.spark && (
              <div
                className="absolute top-20 left-8 z-10 flex gap-1 pointer-events-none"
                style={{
                  transform: currentCard.spark.rotationDeg
                    ? `rotate(${currentCard.spark.rotationDeg}deg)`
                    : undefined,
                }}
              >
                <span
                  className="w-1 h-3.5 rounded-full"
                  style={{ backgroundColor: currentCard.spark.color }}
                />
                <span
                  className="w-1 h-3.5 rounded-full"
                  style={{ backgroundColor: currentCard.spark.color }}
                />
              </div>
            )}

            {/* Centered High-Res 3D Asset */}
            <div className="relative flex-1 flex items-center justify-center -mt-6">
              <motion.img
                src={currentCard.asset.src}
                alt={currentCard.asset.alt}
                className="w-56 xs:w-60 h-auto object-contain pointer-events-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                initial={
                  shouldReduceMotion
                    ? false
                    : { scale: 0.8, rotate: -5 }
                }
                animate={{ scale: 1, rotate: currentCard.asset.rotateDeg }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 15,
                  delay: 0.1,
                }}
              />
            </div>

            {/* Interactive Floating Completion Chip over bottom of card */}
            <div className="px-5 pb-5 relative z-20">
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0.8, y: 10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 18 }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 text-white shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#C8DB6A] text-black flex items-center justify-center font-bold text-xs">
                    {meta.chipIcon === 'flame' ? (
                      <Flame size={12} className="text-black fill-black" />
                    ) : (
                      <Check size={12} className="stroke-[3]" />
                    )}
                  </div>
                  <span className="font-['Outfit'] font-semibold text-xs tracking-wide">
                    {meta.chipLabel}
                  </span>
                </div>
                <span className="text-[11px] text-white/60 font-mono">Today</span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {HERO_CARDS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === activeIndex
                ? 'w-7 h-2 bg-white'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Mobile Quick Action Buttons beneath card */}
      <div className="w-full max-w-sm flex flex-col gap-2.5 mt-6 px-4">
        <a
          href="https://github.com/musabbinumair-dev/Tiko/releases/latest/download/tiko.apk"
          download="tiko.apk"
          onClick={() => onDownload?.()}
          className="w-full min-h-[50px] py-3.5 px-6 rounded-2xl bg-white text-black font-['Outfit'] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_12px_28px_rgba(255,255,255,0.15)] active:scale-[0.98] transition-transform text-center no-underline cursor-pointer"
        >
          <svg className="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download Tiko APK (v1.2.0)</span>
        </a>

        {onOpenInstallModal && (
          <button
            type="button"
            onClick={onOpenInstallModal}
            className="w-full min-h-[44px] py-2 px-4 rounded-xl text-white/60 hover:text-white font-['Outfit'] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>📱 How to install APK on Android</span>
            <span className="text-white/40">→</span>
          </button>
        )}
      </div>
    </div>
  );
};
