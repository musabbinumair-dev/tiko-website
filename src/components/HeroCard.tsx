import React from 'react';
import { CardConfig, getCardStyleVariables } from '../utils/heroConfig';

interface HeroCardProps {
  card: CardConfig;
}

export const HeroCard: React.FC<HeroCardProps> = ({ card }) => {
  const cssVars = getCardStyleVariables(card);
  const isPersonal = card.id === 'personal';

  return (
    <div
      className="relative shrink-0 overflow-hidden select-none"
      style={{
        ...cssVars,
        width: 'var(--card-width)',
        height: 'var(--card-height)',
        borderRadius: 'calc(40 * var(--u))',
        backgroundColor: card.bgColor,
        border: card.border ?? 'none',
        zIndex: card.zIndex,
        transform: `translate(var(--card-translate-x), var(--card-translate-y)) rotate(var(--card-rotate))`,
        transformOrigin: 'bottom center',
        boxShadow: '0 calc(20 * var(--u)) calc(40 * var(--u)) rgba(0, 0, 0, 0.45)',
      }}
    >
      {/* Card Header: Title + circular button (solid white circle with black arrow on Personal card) */}
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
            fontSize: 'max(18px, calc(32 * var(--u)))',
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

      {/* 3D Asset <img>: absolutely positioned inside the card with position/size/rotation variables */}
      <img
        src={card.asset.src}
        alt={card.asset.alt}
        className="absolute pointer-events-none z-10 max-w-none"
        style={{
          width: 'var(--asset-width)',
          top: 'var(--asset-top)',
          left: `${card.asset.leftPercent}%`,
          transform: `translateX(-50%) rotate(var(--asset-rotate))`,
          filter: card.asset.shadowFilter ?? 'none',
        }}
        loading="eager"
      />
    </div>
  );
};
