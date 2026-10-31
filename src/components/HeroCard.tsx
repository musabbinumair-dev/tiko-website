import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CardConfig, getCardStyleVariables } from '../utils/heroConfig';

interface HeroCardProps {
  card: CardConfig;
}

const CARD_ANIM_CONFIG: Record<string, { startX: string; delay: number }> = {
  streak: { startX: '0%', delay: 0.80 },
  health: { startX: '99%', delay: 0.98 },
  personal: { startX: '-120%', delay: 0.98 },
  work: { startX: '175%', delay: 1.14 },
  study: { startX: '-225%', delay: 1.14 },
};

export const HeroCard: React.FC<HeroCardProps> = ({ card }) => {
  const cssVars = getCardStyleVariables(card);
  const isPersonal = card.id === 'personal';
  const isFire = card.id === 'streak';
  const shouldReduceMotion = useReducedMotion();
  const anim = CARD_ANIM_CONFIG[card.id] ?? { startX: '0%', delay: 0.80 };
  const assetDelay = anim.delay + 0.18;

  return (
    <motion.div
      className="relative shrink-0 overflow-hidden select-none will-change-transform"
      style={{
        ...cssVars,
        width: 'var(--card-width)',
        height: 'var(--card-height)',
        borderRadius: 'calc(40 * var(--u))',
        backgroundColor: card.bgColor,
        border: card.border ?? 'none',
        zIndex: card.zIndex,
        transformOrigin: 'bottom center',
        boxShadow: '0 calc(20 * var(--u)) calc(40 * var(--u)) rgba(0, 0, 0, 0.45)',
      }}
      initial={
        shouldReduceMotion
          ? false
          : {
              x: anim.startX,
              y: '40%',
              scale: 0.9,
              rotate: 0,
              opacity: 0,
            }
      }
      animate={{
        x: '0%',
        y: '0%',
        scale: 1,
        rotate: card.rotationDeg,
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 110,
        damping: 15,
        delay: anim.delay,
      }}
    >
      {/* Card Header: Title + circular button */}
      <div
        className="flex items-center relative z-20"
        style={{
          paddingTop: 'calc(28 * var(--u))',
          paddingLeft: 'calc(32 * var(--u))',
          paddingRight: 'calc(32 * var(--u))',
          gap: 'calc(12 * var(--u))',
        }}
      >
        <h2
          className="font-['Outfit'] font-semibold tracking-tight leading-none"
          style={{
            color: card.titleColor,
            fontSize: 'calc(32 * var(--u))',
          }}
        >
          {card.title}
        </h2>
        <div
          className="rounded-full flex items-center justify-center shrink-0 shadow-sm"
          style={{
            width: 'calc(32 * var(--u))',
            height: 'calc(32 * var(--u))',
            backgroundColor: isPersonal ? '#FFFFFF' : '#151515',
            opacity: 1,
          }}
          aria-hidden="true"
        >
          {/* Circular ↗ arrow */}
          <svg
            className="stroke-[2.5] fill-none"
            style={{
              width: 'calc(16 * var(--u))',
              height: 'calc(16 * var(--u))',
              stroke: isPersonal ? '#000000' : '#FFFFFF',
            }}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      {/* Optional spark accent dashes on the card */}
      {card.spark && (
        <div
          className={`absolute ${card.spark.positionClass} z-10 flex pointer-events-none`}
          style={{
            gap: 'calc(4 * var(--u))',
            transform: card.spark.rotationDeg ? `rotate(${card.spark.rotationDeg}deg)` : undefined,
          }}
          aria-hidden="true"
        >
          <span
            className="rounded-full"
            style={{
              width: 'calc(3 * var(--u))',
              height: 'calc(12 * var(--u))',
              backgroundColor: card.spark.color,
            }}
          />
          <span
            className="rounded-full"
            style={{
              width: 'calc(3 * var(--u))',
              height: 'calc(12 * var(--u))',
              backgroundColor: card.spark.color,
            }}
          />
        </div>
      )}

      {/* 3D Asset <img>: animated with spring bounce 0.18s after card starts */}
      <motion.img
        src={card.asset.src}
        alt={card.asset.alt}
        className="absolute pointer-events-none z-10 max-w-none will-change-transform"
        style={{
          width: 'var(--asset-width)',
          top: 'var(--asset-top)',
          left: `${card.asset.leftPercent}%`,
          filter: card.asset.shadowFilter ?? 'none',
        }}
        initial={
          shouldReduceMotion
            ? false
            : {
                x: '-50%',
                y: isFire ? '20%' : '18%',
                scale: isFire ? 0.5 : 0.6,
                rotate: isFire ? card.asset.rotateDeg - 10 : card.asset.rotateDeg - 14,
              }
        }
        animate={{
          x: '-50%',
          y: '0%',
          scale: 1,
          rotate: card.asset.rotateDeg,
        }}
        transition={{
          type: 'spring',
          stiffness: isFire ? 200 : 170,
          damping: isFire ? 11 : 13,
          delay: assetDelay,
        }}
        loading="eager"
      />
    </motion.div>
  );
};
