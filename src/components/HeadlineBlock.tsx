import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Smartphone } from 'lucide-react';
import SlideCommit from './SlideCommit';
import { prefetchLatestApk } from '../utils/downloadApk';

const easeCurve = [0.22, 1, 0.36, 1] as const;

interface HeadlineBlockProps {
  onDownload?: () => void;
}

export const HeadlineBlock: React.FC<HeadlineBlockProps> = ({ onDownload }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleConfirmDownload = async () => {
    // Prefetch/validate the APK URL so errors show the error state before done animation
    await prefetchLatestApk();
  };

  const handleDownloadComplete = () => {
    // Trigger the file download only after the download started animation completes
    onDownload?.();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center relative z-25 select-none w-full px-2 my-auto">
      {/* 2. Android Badge */}
      <div className="mb-3.5 sm:mb-4 md:mb-[clamp(10px,min(1.2vw,1.8dvh),20px)]">
        <div
          className="inline-flex items-center rounded-full bg-white/[0.07] border border-white/[0.14] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden px-4 py-1.5 md:py-[clamp(3px,0.5dvh,6px)] md:px-[clamp(12px,1.2vw,18px)]"
        >
          <span className="font-semibold text-white/95 tracking-wide font-['Outfit'] inline-flex items-center gap-2 text-xs sm:text-sm md:text-[clamp(11px,min(1vw,1.6dvh),15px)] leading-none">
            <img
              src="/assets/aistudio/52172d58-fe5a-48b7-940c-263d1d1e0f22_removalai_preview_d29ac9c6.png"
              alt="Android Mascot"
              className="inline-block object-contain self-end h-[15px] sm:h-[17px] md:h-[clamp(17px,min(1.6vw,2.5dvh),25px)] w-auto -mb-[1px] -mr-0.5"
            />
            <span>Now on Android</span>
          </span>
        </div>
      </div>

      {/* 3. Headline */}
      <div className="relative flex flex-col items-center justify-center w-full">
        <h1
          className="font-extrabold tracking-[-0.035em] text-white flex items-center justify-center relative z-20 text-[60px] xs:text-[72px] sm:text-[84px] md:text-[clamp(56px,min(9vw,14dvh),160px)]"
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
        <div className="relative flex flex-col items-center justify-center z-10 -mt-4 xs:-mt-5 sm:-mt-7 md:-mt-[0.41em]">
          <span
            className="text-white select-none inline-block text-[92px] xs:text-[110px] sm:text-[130px] md:text-[clamp(78px,min(12.6vw,19.6dvh),224px)]"
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
        className="text-[#A1A1AA] font-normal tracking-tight text-center text-[17px] xs:text-[19px] sm:text-[21px] md:text-[clamp(15px,min(1.4vw,2.3dvh),22px)] mt-3 xs:mt-4 sm:mt-5 md:mt-[clamp(8px,min(1vw,1.6dvh),16px)]"
      >
        Simple tasks. Big results.
      </p>

      {/* 5. Download CTA Button: SlideCommit for both desktop and mobile */}
      <div className="hero-main-download mt-5 xs:mt-6 sm:mt-7 md:mt-[clamp(12px,min(1.3vw,2dvh),20px)] flex justify-center w-full relative z-30">
        <SlideCommit
          label="Slide to Download"
          doneLabel="Download Started"
          errorLabel="Couldn't start the download"
          onConfirm={handleConfirmDownload}
          onDone={handleDownloadComplete}
          trackColor="#161619"
          handleColor="#ffffff"
          successColor="#C8DB6A"
          dangerColor="#ef4444"
          width={280}
          height={54}
          radius={27}
          pad={2.5}
          speed={50}
          returnBounce={0.38}
          landingDip={0.026}
          holdMs={1800}
        />
      </div>
    </div>
  );
};
