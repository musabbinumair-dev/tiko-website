import React from 'react';

interface FloatingChipProps {
  variant: 'left-gym' | 'right-streak';
  style?: React.CSSProperties;
}

export const FloatingChip: React.FC<FloatingChipProps> = ({ variant, style }) => {
  if (variant === 'left-gym') {
    return (
      <div
        className="absolute z-30 select-none pointer-events-none"
        style={{
          transform: 'rotate(var(--chip-rotate, -6deg))',
          ...style,
        }}
      >
        <div className="relative">
          {/* Two small violet slanted spark dashes at top-left */}
          <div
            className="absolute flex pointer-events-none"
            style={{
              top: 'calc(-14 * var(--u))',
              left: 'calc(-12 * var(--u))',
              gap: 'calc(4 * var(--u))',
            }}
            aria-hidden="true"
          >
            <span
              className="bg-[#6C4FFF] rounded-full -rotate-[40deg] origin-bottom shadow-[0_0_8px_rgba(108,79,255,0.6)]"
              style={{
                width: 'calc(3 * var(--u))',
                height: 'calc(12 * var(--u))',
              }}
            />
            <span
              className="bg-[#6C4FFF] rounded-full -rotate-[10deg] origin-bottom shadow-[0_0_8px_rgba(108,79,255,0.6)]"
              style={{
                width: 'calc(3 * var(--u))',
                height: 'calc(12 * var(--u))',
              }}
            />
          </div>

          {/* Pill content */}
          <div
            className="bg-[#6C4FFF] text-white rounded-full flex items-center shadow-[0_12px_28px_rgba(108,79,255,0.45)]"
            style={{
              padding: 'calc(10 * var(--u)) calc(20 * var(--u))',
              gap: 'calc(10 * var(--u))',
            }}
          >
            {/* White check icon */}
            <svg
              className="stroke-white stroke-[3] fill-none"
              style={{
                width: 'calc(16 * var(--u))',
                height: 'calc(16 * var(--u))',
              }}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span
              className="font-['Outfit'] font-semibold tracking-tight"
              style={{
                fontSize: 'max(14px, calc(17 * var(--u)))',
              }}
            >
              Gym done
            </span>
          </div>

          {/* White cursor arrow at bottom-right corner */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: 'calc(-12 * var(--u))',
              right: 'calc(-12 * var(--u))',
            }}
          >
            <svg
              className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
              style={{
                width: 'calc(24 * var(--u))',
                height: 'calc(24 * var(--u))',
              }}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.5 3.2L18.5 13.5L12.8 14.1L16.2 20.8L13.8 22L10.4 15.3L6.8 18.5L5.5 3.2Z"
                fill="white"
                stroke="#151515"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Right chip: 7 day streak
  return (
    <div
      className="absolute z-30 select-none pointer-events-none"
      style={{
        transform: 'rotate(var(--chip-rotate, 8deg))',
        ...style,
      }}
    >
      <div className="relative">
        {/* Two small amber spark dashes at top-right */}
        <div
          className="absolute flex pointer-events-none"
          style={{
            top: 'calc(-14 * var(--u))',
            right: 'calc(-12 * var(--u))',
            gap: 'calc(4 * var(--u))',
          }}
          aria-hidden="true"
        >
          <span
            className="bg-[#FFB830] rounded-full rotate-[15deg] origin-bottom shadow-[0_0_8px_rgba(255,184,48,0.6)]"
            style={{
              width: 'calc(3 * var(--u))',
              height: 'calc(12 * var(--u))',
            }}
          />
          <span
            className="bg-[#FFB830] rounded-full rotate-[42deg] origin-bottom shadow-[0_0_8px_rgba(255,184,48,0.6)]"
            style={{
              width: 'calc(3 * var(--u))',
              height: 'calc(12 * var(--u))',
            }}
          />
        </div>

        {/* Pill content */}
        <div
          className="bg-[#FFB830] text-[#151515] rounded-full flex items-center shadow-[0_12px_28px_rgba(255,184,48,0.45)]"
          style={{
            padding: 'calc(10 * var(--u)) calc(20 * var(--u))',
            gap: 'calc(10 * var(--u))',
          }}
        >
          {/* Flame icon */}
          <span
            className="leading-none select-none"
            role="img"
            aria-label="flame"
            style={{
              fontSize: 'max(14px, calc(18 * var(--u)))',
            }}
          >
            🔥
          </span>
          <span
            className="font-['Outfit'] font-bold tracking-tight"
            style={{
              fontSize: 'max(14px, calc(17 * var(--u)))',
            }}
          >
            7 day streak
          </span>
        </div>

        {/* White cursor arrow at bottom-right corner */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: 'calc(-12 * var(--u))',
            right: 'calc(-12 * var(--u))',
          }}
        >
          <svg
            className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
            style={{
              width: 'calc(24 * var(--u))',
              height: 'calc(24 * var(--u))',
            }}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5.5 3.2L18.5 13.5L12.8 14.1L16.2 20.8L13.8 22L10.4 15.3L6.8 18.5L5.5 3.2Z"
              fill="white"
              stroke="#151515"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
