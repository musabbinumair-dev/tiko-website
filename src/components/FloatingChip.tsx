import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface FloatingChipProps {
  variant: 'left-gym' | 'right-streak';
  style?: React.CSSProperties;
}

export const FloatingChip: React.FC<FloatingChipProps> = ({ variant, style }) => {
  const reduced = useReducedMotion();
  const isGym = variant === 'left-gym';
  const chipDelay = isGym ? 1.60 : 1.78;
  const finalRotate = isGym ? -6 : 8;

  return (
    <motion.div
      className="absolute z-30 select-none pointer-events-none"
      style={{
        ...style,
        willChange: 'transform',
      }}
      initial={
        reduced
          ? false
          : {
              scale: 0,
              rotate: finalRotate - 14,
            }
      }
      animate={{
        scale: 1,
        rotate: finalRotate,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 12,
        delay: chipDelay,
      }}
    >
      <div className="relative">
        {/* Spark dashes: flick in with scale 0 to 1 and opacity 0 to 1, 0.25s, 0.15s after chip */}
        <motion.div
          className={`absolute flex pointer-events-none ${
            isGym
              ? 'top-[calc(-14*var(--u))] left-[calc(-12*var(--u))]'
              : 'top-[calc(-14*var(--u))] right-[calc(-12*var(--u))]'
          }`}
          style={{
            gap: 'calc(4 * var(--u))',
          }}
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: chipDelay + 0.15,
            ease: EASE,
          }}
          aria-hidden="true"
        >
          {isGym ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </motion.div>

        {/* Pill content */}
        <div
          className={`rounded-full flex items-center ${
            isGym
              ? 'bg-[#6C4FFF] text-white shadow-[0_12px_28px_rgba(108,79,255,0.45)]'
              : 'bg-[#FFB830] text-[#151515] shadow-[0_12px_28px_rgba(255,184,48,0.45)]'
          }`}
          style={{
            padding: 'calc(10 * var(--u)) calc(20 * var(--u))',
            gap: 'calc(10 * var(--u))',
          }}
        >
          {isGym ? (
            <>
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
                  fontSize: 'calc(17 * var(--u))',
                }}
              >
                Gym done
              </span>
            </>
          ) : (
            <>
              <span
                className="leading-none select-none"
                role="img"
                aria-label="flame"
                style={{
                  fontSize: 'calc(18 * var(--u))',
                }}
              >
                🔥
              </span>
              <span
                className="font-['Outfit'] font-bold tracking-tight"
                style={{
                  fontSize: 'calc(17 * var(--u))',
                }}
              >
                7 day streak
              </span>
            </>
          )}
        </div>

        {/* Cursor arrow: starts 0.3s after chip, travels from x/y offset (24px, 24px) with opacity 0 */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            bottom: 'calc(-12 * var(--u))',
            right: 'calc(-12 * var(--u))',
          }}
          initial={
            reduced
              ? false
              : {
                  x: 'calc(24 * var(--u))',
                  y: 'calc(24 * var(--u))',
                  opacity: 0,
                }
          }
          animate={{
            x: 'calc(0 * var(--u))',
            y: 'calc(0 * var(--u))',
            opacity: 1,
          }}
          transition={{
            duration: 0.45,
            delay: chipDelay + 0.30,
            ease: EASE,
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
        </motion.div>
      </div>
    </motion.div>
  );
};
