import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useReleaseInfo } from '../utils/useReleaseInfo';

const easeCurve = [0.22, 1, 0.36, 1] as const;

export const HeadlineBlock: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { releaseInfo, loading } = useReleaseInfo();

  return (
    <div className="flex flex-col items-center text-center relative z-20 select-none">
      {/* 2. Badge */}
      <div style={{ marginBottom: 'calc(16 * var(--u))' }}>
        <motion.div
          className="inline-flex items-center rounded-full bg-[#181818]/90 border border-white/10 backdrop-blur-md shadow-sm will-change-transform"
          style={{
            padding: 'calc(6 * var(--u)) calc(16 * var(--u))',
          }}
          initial={shouldReduceMotion ? false : { scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.30,
            duration: 0.5,
            ease: easeCurve,
          }}
        >
          <span
            className="font-semibold text-white/90 tracking-wide font-['Outfit'] inline-flex items-center gap-1.5"
            style={{
              fontSize: 'calc(13 * var(--u))',
            }}
          >
            <span>Now on Android</span>
            <span className="text-white/30">•</span>
            {loading && !releaseInfo ? (
              <span
                className="inline-block bg-white/10 rounded-full animate-pulse"
                style={{
                  width: 'calc(48 * var(--u))',
                  height: 'calc(10 * var(--u))',
                }}
              />
            ) : releaseInfo && releaseInfo.version ? (
              <span className="text-white/70 font-normal">
                {releaseInfo.version}
                {releaseInfo.sizeMB ? ` (${releaseInfo.sizeMB} MB)` : ''}
              </span>
            ) : (
              <span className="text-white/70 font-normal">Latest version</span>
            )}
          </span>
        </motion.div>
      </div>

      {/* 3. Headline */}
      <div className="relative flex flex-col items-center">
        <h1
          className="font-extrabold tracking-[-0.04em] text-white flex items-center justify-center relative z-20"
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: 'calc(150 * var(--u))',
            lineHeight: 0.9,
          }}
        >
          {/* Word 1: "Get" */}
          <span
            className="inline-block overflow-hidden"
            style={{
              paddingBottom: '0.12em',
              marginRight: '0.22em',
            }}
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={shouldReduceMotion ? false : { y: '110%' }}
              animate={{ y: '0%' }}
              transition={{
                delay: 0.40,
                duration: 0.9,
                ease: easeCurve,
              }}
            >
              Get
            </motion.span>
          </span>

          {/* Word 2: "things" */}
          <span
            className="inline-block overflow-hidden"
            style={{
              paddingBottom: '0.12em',
              paddingRight: '0.14em',
              marginRight: '-0.14em',
            }}
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={shouldReduceMotion ? false : { y: '110%' }}
              animate={{ y: '0%' }}
              transition={{
                delay: 0.52,
                duration: 0.9,
                ease: easeCurve,
              }}
            >
              things
            </motion.span>
          </span>
        </h1>

        {/* "Done" in Pinyon Script - kept behind headline layer */}
        <div
          className="relative flex flex-col items-center z-10"
          style={{
            marginTop: 'calc(-62 * var(--u))',
          }}
        >
          <motion.span
            className="text-white select-none inline-block will-change-transform"
            style={{
              fontFamily: 'var(--font-pinyon)',
              fontSize: 'calc(210 * var(--u))',
              lineHeight: 0.78,
              paddingLeft: 'calc(32 * var(--u))',
              paddingRight: 'calc(64 * var(--u))',
              paddingBottom: 'calc(14 * var(--u))',
              paddingTop: 'calc(8 * var(--u))',
            }}
            initial={
              shouldReduceMotion
                ? false
                : {
                    clipPath: 'inset(0 100% 0 0)',
                    x: '-4%',
                    opacity: 0,
                  }
            }
            animate={{
              clipPath: 'inset(-10% -25% -10% 0)',
              x: '0%',
              opacity: 1,
            }}
            transition={{
              clipPath: {
                delay: 0.95,
                duration: 0.9,
                ease: easeCurve,
              },
              x: {
                delay: 0.95,
                duration: 0.3,
                ease: easeCurve,
              },
              opacity: {
                delay: 0.95,
                duration: 0.3,
                ease: easeCurve,
              },
            }}
          >
            Done
          </motion.span>
        </div>
      </div>
    </div>
  );
};
