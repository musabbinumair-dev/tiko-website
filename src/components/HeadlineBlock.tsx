import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Smartphone } from 'lucide-react';

const easeCurve = [0.22, 1, 0.36, 1] as const;

interface HeadlineBlockProps {
  onDownload?: () => void;
}

export const HeadlineBlock: React.FC<HeadlineBlockProps> = ({ onDownload }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center justify-center text-center relative z-25 select-none w-full px-2 my-auto">
      {/* 2. Android Badge */}
      <div className="mb-3.5 sm:mb-4 md:mb-[calc(16*var(--u))]">
        <div
          className="inline-flex items-center rounded-full bg-white/[0.07] border border-white/[0.14] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden px-4 py-1.5 md:py-[calc(4*var(--u))] md:px-[calc(16*var(--u))]"
        >
          <span className="font-semibold text-white/95 tracking-wide font-['Outfit'] inline-flex items-center gap-2 text-xs sm:text-sm md:text-[calc(13*var(--u))] leading-none">
            <img
              src="/assets/aistudio/52172d58-fe5a-48b7-940c-263d1d1e0f22_removalai_preview_d29ac9c6.png"
              alt="Android Mascot"
              className="inline-block object-contain self-end h-[15px] sm:h-[17px] md:h-[calc(22*var(--u))] w-auto -mb-[1px] -mr-0.5"
            />
            <span>Now on Android</span>
          </span>
        </div>
      </div>

      {/* 3. Headline */}
      <div className="relative flex flex-col items-center justify-center w-full">
        <h1
          className="font-extrabold tracking-[-0.035em] text-white flex items-center justify-center relative z-20 text-[60px] xs:text-[72px] sm:text-[84px] md:text-[calc(150*var(--u))]"
          style={{
            fontFamily: 'var(--font-bricolage)',
            lineHeight: 0.9,
          }}
        >
          {/* Word 1: "Get" */}
          <span className="inline-block overflow-hidden pb-[0.06em] mr-[0.18em]">
            <span className="inline-block">
              Get
            </span>
          </span>

          {/* Word 2: "things" */}
          <span className="inline-block overflow-hidden pb-[0.06em] pr-[0.1em] -mr-[0.1em]">
            <span className="inline-block">
              things
            </span>
          </span>
        </h1>

        {/* "Done" in Pinyon Script */}
        <div className="relative flex flex-col items-center justify-center z-10 -mt-4 xs:-mt-5 sm:-mt-7 md:mt-[calc(-62*var(--u))]">
          <span
            className="text-white select-none inline-block text-[92px] xs:text-[110px] sm:text-[130px] md:text-[calc(210*var(--u))]"
            style={{
              fontFamily: 'var(--font-pinyon)',
              lineHeight: 0.72,
              paddingLeft: '0.15em',
              paddingRight: '0.25em',
              paddingBottom: '0.04em',
            }}
          >
            Done
          </span>
        </div>
      </div>

      {/* 4. Subtitle: "Simple tasks. Big results." */}
      <p
        className="text-[#A1A1AA] font-normal tracking-tight text-center text-[17px] xs:text-[19px] sm:text-[21px] md:text-[calc(20*var(--u))] mt-3 xs:mt-4 sm:mt-5 md:mt-[calc(14*var(--u))]"
      >
        Simple tasks. Big results.
      </p>

      {/* 5. Mobile Primary CTA Button: "Get the app ->" */}
      <div className="mt-6 xs:mt-7 sm:mt-8 md:hidden flex justify-center w-full">
        <a
          href="https://github.com/musabbinumair-dev/Tiko/releases/latest/download/tiko.apk"
          download="tiko.apk"
          onClick={() => onDownload?.()}
          className="bg-white text-black font-bold rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.7)] hover:bg-neutral-100 active:scale-95 transition-all inline-flex items-center gap-3.5 pl-7 pr-3 py-3.5 text-lg sm:text-xl no-underline cursor-pointer"
        >
          <span>Get the app</span>
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
};
