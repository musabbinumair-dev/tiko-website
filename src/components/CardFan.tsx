import React from 'react';
import { HERO_CARDS } from '../utils/heroConfig';
import { HeroCard } from './HeroCard';

const MOBILE_WRAPPER_STYLES: Record<string, { marginLeft: string; transform: string }> = {
  work: { marginLeft: '0px', transform: 'translate(14px, 42px)' },
  health: { marginLeft: 'clamp(-126px, -31vw, -112px)', transform: 'translate(7px, 18px)' },
  streak: { marginLeft: 'clamp(-126px, -31vw, -112px)', transform: 'translate(0px, 0px)' },
  personal: { marginLeft: 'clamp(-126px, -31vw, -112px)', transform: 'translate(-7px, 18px)' },
  study: { marginLeft: 'clamp(-126px, -31vw, -112px)', transform: 'translate(-14px, 42px)' },
};

export const CardFan: React.FC = () => {
  return (
    <div
      className="w-full flex items-end justify-center relative z-20 pointer-events-none select-none card-fan-wrap"
      style={{
        // Positioned at the bottom, cropped by hero container overflow: hidden
        marginBottom: 'calc(-40 * var(--u))',
      }}
    >
      {HERO_CARDS.map((card, idx) => {
        const mob = MOBILE_WRAPPER_STYLES[card.id] ?? {
          marginLeft: idx === 0 ? '0px' : '-80px',
          transform: 'translate(0, 0)',
        };

        return (
          <div
            key={card.id}
            className="relative card-fan-col"
            style={{
              zIndex: card.zIndex,
              marginLeft: idx === 0 ? 0 : 'calc(-48 * var(--u))',
              transform: `translate(calc(${card.translateXOffsetPx} * var(--u)), calc(${card.translateYPx} * var(--u)))`,
              // CSS variables for mobile media query
              ['--m-margin-left' as string]: mob.marginLeft,
              ['--m-transform' as string]: mob.transform,
            }}
          >
            <HeroCard card={card} />
          </div>
        );
      })}
    </div>
  );
};
