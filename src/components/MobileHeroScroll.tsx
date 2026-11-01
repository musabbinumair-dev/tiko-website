import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
} from 'framer-motion';
import { HERO_CARDS, CardConfig } from '../utils/heroConfig';

interface MobileHeroScrollProps {
  onDownload?: () => void;
}

// Sparkles configuration matching mobile visual target (Image 2)
const MOBILE_STARS = [
  { x: '14%', y: '18%', size: 16, color: '#FFFFFF', opacity: 0.4 },
  { x: '10%', y: '28%', size: 14, color: '#FFB830', opacity: 0.5 },
  { x: '12%', y: '39%', size: 12, color: '#FFFFFF', opacity: 0.3 },
  { x: '11%', y: '52%', size: 15, color: '#FFB830', opacity: 0.45 },
  { x: '26%', y: '62%', size: 12, color: '#FFFFFF', opacity: 0.35 },
  { x: '86%', y: '22%', size: 14, color: '#FFB830', opacity: 0.5 },
  { x: '89%', y: '57%', size: 16, color: '#FFFFFF', opacity: 0.4 },
  { x: '78%', y: '65%', size: 14, color: '#FFB830', opacity: 0.45 },
];

// Segments and tilts for the 5 cards:
// Order: Work (purple), Health (amber), Streak (lime), Personal (near-black), Study (cream)
// In the final stack, front-to-back: Study (50), Personal (40), Streak (30), Health (20), Work (10)
const CARD_METADATA = [
  { id: 'work', start: 0.04, end: 0.20, initialRot: 0, finalRot: -2, zIndex: 10 },
  { id: 'health', start: 0.20, end: 0.38, initialRot: 7, finalRot: 2, zIndex: 20 },
  { id: 'streak', start: 0.38, end: 0.56, initialRot: 7, finalRot: -2, zIndex: 30 },
  { id: 'personal', start: 0.56, end: 0.74, initialRot: -7, finalRot: 2, zIndex: 40 },
  { id: 'study', start: 0.74, end: 0.92, initialRot: 7, finalRot: -2, zIndex: 50 },
];

// Smooth ease-out curve with a gentle overshoot
function easeOutOvershoot(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  // Back-out easing function with subtle overshoot (~5%)
  const c1 = 1.35;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(clamped - 1, 3) + c1 * Math.pow(clamped - 1, 2);
}

export const MobileHeroScroll: React.FC<MobileHeroScrollProps> = ({ onDownload }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Viewport dimensions for responsive pixel calculations
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 375,
    height: typeof window !== 'undefined' ? window.innerHeight : 812,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload all 5 card 3D images with async decoding
  useEffect(() => {
    const imagesToPreload = [
      '/bag.webp',
      '/dumbell.webp',
      '/fire.webp',
      '/alarm.webp',
      '/book.webp',
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decoding = 'async';
    });
  }, []);

  // Framer-motion scroll tracking over the track element
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Spring-smoothed scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.0001,
  });

  // Track the active (top) card index based on smoothed progress
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (latest < 0.20) {
      setActiveCardIndex(0); // Work
    } else if (latest < 0.38) {
      setActiveCardIndex(1); // Health
    } else if (latest < 0.56) {
      setActiveCardIndex(2); // Streak
    } else if (latest < 0.74) {
      setActiveCardIndex(3); // Personal
    } else {
      setActiveCardIndex(4); // Study
    }
  });

  // Hero block dims on scroll (Image 1 -> Image 2)
  // The page stays in place, hero dims to ~0.38, and cards animate on scroll
  const heroOpacity = useTransform(smoothProgress, [0, 0.14], [1, 0.38]);
  const sparklesOpacity = useTransform(smoothProgress, [0, 0.14], [1, 0.40]);

  // Progress dots visibility: hidden until p > 0.2, then fade in
  const dotsOpacity = useTransform(smoothProgress, [0.18, 0.24], [0, 1]);

  // -------------------------------------------------------------
  // PREFERS-REDUCED-MOTION: simple vertical stack, no pinned track
  // -------------------------------------------------------------
  if (shouldReduceMotion) {
    return (
      <div className="w-full min-h-screen bg-[#0E0E0E] text-white flex flex-col items-center select-none pb-20">
        <div className="fixed inset-0 bg-grain pointer-events-none opacity-50 z-0" aria-hidden="true" />
        
        {/* Compact Navbar */}
        <header className="w-full px-6 pt-5 pb-3 flex items-center justify-between relative z-40">
          <span className="font-['Outfit'] font-black text-2xl text-white">Tiko</span>
          <button
            type="button"
            aria-label="Navigation menu"
            className="w-10 h-10 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5 stroke-[2] fill-none stroke-current" viewBox="0 0 24 24">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </header>

        {/* Hero Block */}
        <div className="w-full flex flex-col items-center text-center pt-8 pb-10 px-4 relative z-20">
          <div className="inline-flex items-center rounded-full bg-[#181818]/90 border border-white/10 px-4 py-1.5 mb-5">
            <span className="font-semibold text-white/90 text-xs tracking-wide font-['Outfit']">
              Now on Android
            </span>
          </div>
          <h1 className="font-extrabold text-[52px] tracking-tight font-['Outfit'] text-white leading-[0.9]">
            Get things
          </h1>
          <span className="font-['Pinyon_Script'] text-[78px] text-white leading-[0.75] -mt-2 mb-6">
            Done
          </span>
          <a
            href="https://github.com/musabbinumair-dev/Tiko/releases/latest/download/tiko.apk"
            download="tiko.apk"
            onClick={() => onDownload?.()}
            className="bg-white text-black font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg active:scale-95 transition-transform inline-flex items-center justify-center no-underline"
          >
            Get the app
          </a>
        </div>

        {/* Vertical cards stack: each card centered, 16px gap */}
        <div className="w-full flex flex-col items-center gap-4 px-4 z-20" aria-hidden="true">
          {HERO_CARDS.map((card) => {
            const isPersonal = card.id === 'personal';
            return (
              <div
                key={card.id}
                className="relative overflow-hidden rounded-[40px] p-6 shadow-xl flex flex-col justify-between"
                style={{
                  width: 'min(86vw, 340px)',
                  height: 'calc(min(86vw, 340px) * 1.33)',
                  backgroundColor: card.bgColor,
                  border: card.border ?? 'none',
                }}
              >
                <div className="flex items-center justify-between z-20">
                  <h2
                    className="font-['Outfit'] font-semibold text-2xl tracking-tight leading-none"
                    style={{ color: card.titleColor }}
                  >
                    {card.title}
                  </h2>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: isPersonal ? '#FFFFFF' : '#151515' }}
                  >
                    <svg
                      className="w-4 h-4 stroke-[2.5] fill-none"
                      style={{ stroke: isPersonal ? '#000000' : '#FFFFFF' }}
                      viewBox="0 0 24 24"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center relative">
                  <img
                    src={card.asset.src}
                    alt={card.asset.alt}
                    decoding="async"
                    loading="eager"
                    className="max-h-[220px] max-w-[85%] object-contain"
                    style={{
                      filter: card.asset.shadowFilter ?? 'none',
                      transform: `rotate(${card.asset.rotateDeg}deg)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // FULL MOTION SCROLL ANIMATION
  // -------------------------------------------------------------
  const cardW = Math.min(viewport.width * 0.86, 340);
  const cardH = cardW * 1.33;
  const vh = viewport.height;

  // At p = 0, Work card top peeks up 15% from bottom of screen.
  // Stage center is 52% of vh. Center of resting card is 52% * vh.
  // Resting card top = 0.52 * vh - cardH * 0.5.
  // Target peek top = 0.85 * vh.
  // Required peek displacement = 0.85 * vh - (0.52 * vh - cardH * 0.5) = 0.33 * vh + cardH * 0.5.
  const yPeek = 0.33 * vh + cardH * 0.5;

  return (
    <div
      ref={trackRef}
      className="relative w-full select-none"
      style={{
        // 100dvh + 5 * 70dvh with standard vh fallback
        minHeight: 'calc(100vh + 350vh)',
        height: 'calc(100dvh + 5 * 70dvh)',
      }}
    >
      {/* Pinned Sticky Stage */}
      <div
        className="sticky top-0 w-full overflow-hidden flex flex-col justify-between"
        style={{
          minHeight: '100vh',
          height: '100dvh',
          backgroundColor: '#0E0E0E',
        }}
      >
        {/* Background Film Grain */}
        <div
          className="absolute inset-0 bg-grain pointer-events-none opacity-50 z-0"
          aria-hidden="true"
        />

        {/* Faint 4-point sparkle stars scattered around (dims with scroll) */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 will-change-transform"
          style={{
            opacity: sparklesOpacity,
          }}
          aria-hidden="true"
        >
          {MOBILE_STARS.map((star, idx) => (
            <svg
              key={idx}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{
                left: star.x,
                top: star.y,
                width: `${star.size}px`,
                height: `${star.size}px`,
                color: star.color,
                opacity: star.opacity,
              }}
            >
              <path d="M12 0 C12 6.6 6.6 12 0 12 C6.6 12 12 17.4 12 24 C12 17.4 17.4 12 24 12 C17.4 12 12 6.6 12 0 Z" />
            </svg>
          ))}
        </motion.div>

        {/* 1. Compact Navbar (Logo left, Menu icon right) */}
        <header className="w-full px-6 pt-5 pb-3 flex items-center justify-between relative z-40">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-white font-['Outfit'] font-black tracking-tight text-2xl flex items-center cursor-pointer no-underline"
          >
            Tiko
          </a>
          <button
            type="button"
            aria-label="Navigation menu"
            className="w-10 h-10 rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform cursor-pointer outline-none"
          >
            <svg
              className="w-5 h-5 stroke-[2] fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </header>

        {/* 2. Hero Block: Badge, Headline, Button (Stays in place, dims on scroll as in Image 1 -> Image 2) */}
        <motion.div
          style={{
            opacity: heroOpacity,
          }}
          className="relative z-20 w-full flex flex-col items-center text-center px-4 pt-6 pb-2 will-change-transform"
        >
          {/* Badge: "Now on Android" */}
          <div className="mb-4">
            <div className="inline-flex items-center rounded-full bg-[#181818]/90 border border-white/10 px-4 py-1.5 shadow-sm">
              <span className="font-semibold text-white/90 text-xs tracking-wide font-['Outfit']">
                Now on Android
              </span>
            </div>
          </div>

          {/* Headline: "Get things" / "Done" */}
          <div className="flex flex-col items-center">
            <h1 className="font-extrabold text-[52px] tracking-tight font-['Outfit'] text-white leading-[0.9]">
              Get things
            </h1>
            <span
              className="font-['Pinyon_Script'] text-[82px] text-white leading-[0.75] -mt-2 mb-6 select-none"
              style={{
                fontFamily: 'var(--font-pinyon)',
              }}
            >
              Done
            </span>
          </div>

          {/* Action button: "Get the app" */}
          <div>
            <a
              href="https://github.com/musabbinumair-dev/Tiko/releases/latest/download/tiko.apk"
              download="tiko.apk"
              onClick={() => onDownload?.()}
              className="bg-white text-black font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg active:scale-95 transition-transform inline-flex items-center justify-center no-underline"
            >
              Get the app
            </a>
          </div>
        </motion.div>

        {/* 3. The 5 Cards Stack Stage */}
        <div
          className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
          aria-hidden="true"
        >
          {HERO_CARDS.map((card, i) => (
            <AnimatedMobileCard
              key={card.id}
              index={i}
              card={card}
              meta={CARD_METADATA[i]}
              smoothProgress={smoothProgress}
              activeCardIndex={activeCardIndex}
              cardW={cardW}
              cardH={cardH}
              vh={vh}
              yPeek={yPeek}
            />
          ))}
        </div>

        {/* 4. Progress Dots (5 dots, bottom center, 28px from bottom, hidden until p > 0.2) */}
        <motion.div
          style={{ opacity: dotsOpacity }}
          className="absolute bottom-[28px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-40 pointer-events-none will-change-transform"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((idx) => {
            const isActive = activeCardIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-full transition-all duration-200 ease-out ${
                  isActive
                    ? 'w-[10px] h-[10px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                    : 'w-[6px] h-[6px] bg-white/25'
                }`}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Sub-component for an individually animated mobile card in the stack
// ----------------------------------------------------------------------
interface AnimatedMobileCardProps {
  index: number;
  card: CardConfig;
  meta: (typeof CARD_METADATA)[number];
  smoothProgress: any;
  activeCardIndex: number;
  cardW: number;
  cardH: number;
  vh: number;
  yPeek: number;
}

const AnimatedMobileCard: React.FC<AnimatedMobileCardProps> = ({
  index,
  card,
  meta,
  smoothProgress,
  activeCardIndex,
  cardW,
  cardH,
  vh,
  yPeek,
}) => {
  const isPersonal = card.id === 'personal';
  const isTopCard = activeCardIndex === index;

  // Compute all arrival and stack transforms from smoothed progress p
  const cardY = useTransform(smoothProgress, (p: number) => {
    // 1. Arrival of this card
    let arrival = 0;
    if (index === 0) {
      // Work: peeks at p <= 0.04, arrives between 0.04 and 0.20
      if (p <= 0.04) {
        arrival = 0;
      } else if (p >= 0.20) {
        arrival = 1;
      } else {
        arrival = easeOutOvershoot((p - 0.04) / 0.16);
      }
    } else {
      // Other cards: below screen until start, arrives between start and end
      if (p <= meta.start) {
        arrival = 0;
      } else if (p >= meta.end) {
        arrival = 1;
      } else {
        arrival = easeOutOvershoot((p - meta.start) / (meta.end - meta.start));
      }
    }

    // Base translateY
    let baseTranslateY = 0;
    if (index === 0) {
      baseTranslateY = (1 - arrival) * yPeek;
    } else {
      // 105% of viewport height offscreen below
      baseTranslateY = (1 - arrival) * (vh * 1.05);
    }

    // 2. Stack depth offset: when cards arrive after this card (k > index)
    // each card that arrives pushes this card 18px higher
    let stackLevels = 0;
    for (let k = index + 1; k < CARD_METADATA.length; k++) {
      const kMeta = CARD_METADATA[k];
      if (p >= kMeta.end) {
        stackLevels += 1;
      } else if (p > kMeta.start) {
        stackLevels += Math.max(0, Math.min(1, (p - kMeta.start) / (kMeta.end - kMeta.start)));
      }
    }

    const stackY = -18 * stackLevels;
    return baseTranslateY + stackY;
  });

  // Scale down by 0.04 per level behind (minimum 0.84)
  const cardScale = useTransform(smoothProgress, (p: number) => {
    let stackLevels = 0;
    for (let k = index + 1; k < CARD_METADATA.length; k++) {
      const kMeta = CARD_METADATA[k];
      if (p >= kMeta.end) {
        stackLevels += 1;
      } else if (p > kMeta.start) {
        stackLevels += Math.max(0, Math.min(1, (p - kMeta.start) / (kMeta.end - kMeta.start)));
      }
    }
    return Math.max(0.84, 1 - 0.04 * stackLevels);
  });

  // Card rotation: tilts from initialRot to finalRot over its arrival segment
  const cardRotate = useTransform(smoothProgress, (p: number) => {
    if (index === 0) {
      if (p <= 0.04) return 0;
      if (p >= 0.20) return meta.finalRot;
      const t = (p - 0.04) / 0.16;
      return meta.initialRot + (meta.finalRot - meta.initialRot) * easeOutOvershoot(t);
    }
    if (p <= meta.start) return meta.initialRot;
    if (p >= meta.end) return meta.finalRot;
    const t = (p - meta.start) / (meta.end - meta.start);
    return meta.initialRot + (meta.finalRot - meta.initialRot) * easeOutOvershoot(t);
  });

  // Dim overlay: dims to ~60% brightness (up to 0.40 opacity) when cards arrive on top
  const dimOpacity = useTransform(smoothProgress, (p: number) => {
    let stackLevels = 0;
    for (let k = index + 1; k < CARD_METADATA.length; k++) {
      const kMeta = CARD_METADATA[k];
      if (p >= kMeta.end) {
        stackLevels += 1;
      } else if (p > kMeta.start) {
        stackLevels += Math.max(0, Math.min(1, (p - kMeta.start) / (kMeta.end - kMeta.start)));
      }
    }
    return Math.min(0.40, 0.10 * stackLevels);
  });

  // 3D Icon entrance: starts at 40% of the card's arrival segment
  // Rises 40px to 0, scales from 0.85 to 1 with small overshoot
  const iconEntranceY = useTransform(smoothProgress, (p: number) => {
    if (index === 0) {
      // Work icon rises as Work moves from peek
      if (p <= 0.04) return 40;
      if (p >= 0.20) return 0;
      const t = (p - 0.04) / 0.16;
      return (1 - easeOutOvershoot(t)) * 40;
    }
    const iconStart = meta.start + 0.40 * (meta.end - meta.start);
    if (p <= iconStart) return 40;
    if (p >= meta.end) return 0;
    const t = (p - iconStart) / (meta.end - iconStart);
    return (1 - easeOutOvershoot(t)) * 40;
  });

  const iconEntranceScale = useTransform(smoothProgress, (p: number) => {
    if (index === 0) {
      if (p <= 0.04) return 0.85;
      if (p >= 0.20) return 1;
      const t = (p - 0.04) / 0.16;
      return 0.85 + 0.15 * easeOutOvershoot(t);
    }
    const iconStart = meta.start + 0.40 * (meta.end - meta.start);
    if (p <= iconStart) return 0.85;
    if (p >= meta.end) return 1;
    const t = (p - iconStart) / (meta.end - iconStart);
    return 0.85 + 0.15 * easeOutOvershoot(t);
  });

  const iconEntranceOpacity = useTransform(smoothProgress, (p: number) => {
    if (index === 0) {
      // Work icon is hidden at peek (p <= 0.04) so only title/arrow show
      if (p <= 0.05) return 0;
      if (p >= 0.15) return 1;
      return (p - 0.05) / 0.10;
    }
    const iconStart = meta.start + 0.40 * (meta.end - meta.start);
    if (p <= iconStart) return 0;
    if (p >= meta.start + 0.65 * (meta.end - meta.start)) return 1;
    return (p - iconStart) / (0.25 * (meta.end - meta.start));
  });

  // Title and Arrow entrance: start at 60% of card's segment
  // Title slides in from left (translateX -16px to 0)
  // Arrow button scales from 0.6 to 1
  const titleX = useTransform(smoothProgress, (p: number) => {
    if (index === 0) return 0; // Already visible at p=0 for Work
    const headerStart = meta.start + 0.60 * (meta.end - meta.start);
    if (p <= headerStart) return -16;
    if (p >= meta.end) return 0;
    const t = Math.max(0, Math.min(1, (p - headerStart) / (meta.end - headerStart)));
    return (1 - t) * -16;
  });

  const arrowScale = useTransform(smoothProgress, (p: number) => {
    if (index === 0) return 1; // Already visible at p=0 for Work
    const headerStart = meta.start + 0.60 * (meta.end - meta.start);
    if (p <= headerStart) return 0.6;
    if (p >= meta.end) return 1;
    const t = Math.max(0, Math.min(1, (p - headerStart) / (meta.end - headerStart)));
    return 0.6 + 0.4 * t;
  });

  return (
    <motion.div
      className="absolute overflow-hidden will-change-transform"
      style={{
        width: cardW,
        height: cardH,
        borderRadius: '40px',
        backgroundColor: card.bgColor,
        border: card.border ?? 'none',
        zIndex: meta.zIndex,
        // Centered horizontally, resting center at 52% of the stage
        left: '50%',
        marginLeft: -cardW / 2,
        top: '52%',
        marginTop: -cardH * 0.5,
        y: cardY,
        scale: cardScale,
        rotate: cardRotate,
        boxShadow: '0 24px 48px rgba(0, 0, 0, 0.55)',
      }}
    >
      {/* Dim Overlay Div: changes opacity when cards arrive on top (faster than CSS filter) */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none z-30 rounded-[40px] will-change-transform"
        style={{ opacity: dimOpacity }}
      />

      {/* Card Header: Title + Arrow button */}
      <div className="relative z-20 flex items-center justify-between p-6">
        <motion.h2
          style={{
            x: titleX,
            color: card.titleColor,
          }}
          className="font-['Outfit'] font-semibold text-2xl tracking-tight leading-none will-change-transform"
        >
          {card.title}
        </motion.h2>

        <motion.div
          style={{
            scale: arrowScale,
            backgroundColor: isPersonal ? '#FFFFFF' : '#151515',
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm will-change-transform"
          aria-hidden="true"
        >
          <svg
            className="w-4 h-4 stroke-[2.5] fill-none"
            style={{ stroke: isPersonal ? '#000000' : '#FFFFFF' }}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </motion.div>
      </div>

      {/* Optional spark accent dashes on the card (as in Image 2) */}
      {card.spark && (
        <div
          className={`absolute ${card.spark.positionClass} z-10 flex pointer-events-none`}
          style={{
            gap: '4px',
            transform: card.spark.rotationDeg ? `rotate(${card.spark.rotationDeg}deg)` : undefined,
          }}
          aria-hidden="true"
        >
          <span
            className="rounded-full"
            style={{
              width: '3.5px',
              height: '14px',
              backgroundColor: card.spark.color,
            }}
          />
          <span
            className="rounded-full"
            style={{
              width: '3.5px',
              height: '14px',
              backgroundColor: card.spark.color,
            }}
          />
        </div>
      )}

      {/* 3D Asset Icon: Entrance motion + Idle Float on Top Card */}
      <div className="relative flex-1 w-full h-[calc(100%-80px)] flex items-center justify-center">
        {/* Entrance rise (40px -> 0) and scale (0.85 -> 1) */}
        <motion.div
          style={{
            y: iconEntranceY,
            scale: iconEntranceScale,
            opacity: iconEntranceOpacity,
          }}
          className="w-full flex items-center justify-center will-change-transform"
        >
          {/* Idle float: only the active top card floats slowly (~6px, 3.5s, ease-in-out) */}
          <motion.div
            animate={isTopCard ? { y: [0, -6, 0] } : { y: 0 }}
            transition={
              isTopCard
                ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
            className="w-full flex items-center justify-center will-change-transform pointer-events-none"
          >
            <img
              src={card.asset.src}
              alt={card.asset.alt}
              decoding="async"
              loading="eager"
              className="max-h-[230px] max-w-[85%] object-contain will-change-transform"
              style={{
                filter: card.asset.shadowFilter ?? 'none',
                transform: `rotate(${card.asset.rotateDeg}deg)`,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
