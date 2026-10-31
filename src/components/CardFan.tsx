import React from 'react';
import { HERO_CARDS } from '../utils/heroConfig';
import { HeroCard } from './HeroCard';

export const CardFan: React.FC = () => {
  return (
    <div
      className="w-full flex items-end justify-center relative z-20 pointer-events-none select-none"
      style={{
        // Positioned at the bottom, cropped by hero container overflow: hidden
        marginBottom: 'calc(-40 * var(--u))',
      }}
    >
      {HERO_CARDS.map((card, idx) => (
        <div
          key={card.id}
          style={{
            marginLeft: idx === 0 ? 0 : 'calc(-48 * var(--u))',
          }}
        >
          <HeroCard card={card} />
        </div>
      ))}
    </div>
  );
};
