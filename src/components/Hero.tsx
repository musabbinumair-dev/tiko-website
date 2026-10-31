import React from 'react';
import { Navbar } from './Navbar';
import { HeadlineBlock } from './HeadlineBlock';
import { CardFan } from './CardFan';
import { HERO_STARS } from '../utils/heroConfig';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section text-white select-none">
      {/* Film grain texture overlay */}
      <div
        className="absolute inset-0 bg-grain pointer-events-none z-10 opacity-70"
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
            <svg
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
                opacity: star.opacity,
              }}
            >
              <path d="M12 0 C12 6.6 6.6 12 0 12 C6.6 12 12 17.4 12 24 C12 17.4 17.4 12 24 12 C17.4 12 12 6.6 12 0 Z" />
            </svg>
          ))}
        </div>

        {/* Lime swash under 'one': filled SVG shape, lime #C8DB6A, full opacity, from x 722 to x 911, vertical center y 376 */}
        <div
          className="absolute pointer-events-none select-none z-25"
          style={{
            left: 'calc(722 * var(--u))',
            top: 'calc(376 * var(--u))',
            width: 'calc(189 * var(--u))',
            height: 'calc(24 * var(--u))',
            transform: 'translateY(-50%)',
            transformOrigin: 'left center',
          }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 189 24"
            fill="none"
            className="w-full h-full overflow-visible"
          >
            <path
              d="M 0 20.5 C 30 19.5 75 14.5 110 8.5 C 140 5.5 165 4.8 184 5.5 C 187.8 5.8 189 7.2 189 9 C 189 10.8 187.8 12.2 184 12.2 C 165 11.5 140 12.0 110 15.0 C 75 17.8 30 21.0 0 20.5 Z"
              fill="#C8DB6A"
            />
          </svg>
        </div>

        {/* 1. Top Bar */}
        <Navbar />

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
