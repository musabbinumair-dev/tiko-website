import React from 'react';

export const HeadlineBlock: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center relative z-20 select-none">
      {/* 2. Badge — no green dot */}
      <div style={{ marginBottom: 'calc(16 * var(--u))' }}>
        <div
          className="inline-flex items-center rounded-full bg-[#181818]/90 border border-white/10 backdrop-blur-md shadow-sm"
          style={{
            padding: 'calc(6 * var(--u)) calc(16 * var(--u))',
          }}
        >
          <span
            className="font-semibold text-white/90 tracking-wide font-['Outfit']"
            style={{
              fontSize: 'max(14px, calc(13 * var(--u)))',
            }}
          >
            Now on iOS &amp; Android
          </span>
        </div>
      </div>

      {/* 3. Headline */}
      <div className="relative flex flex-col items-center">
        <h1
          className="font-extrabold tracking-[-0.04em] text-white"
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: 'calc(150 * var(--u))',
            lineHeight: 0.9,
          }}
        >
          Get things
        </h1>

        {/* "Done" in Pinyon Script */}
        <div
          className="relative flex flex-col items-center"
          style={{
            marginTop: 'calc(-62 * var(--u))',
          }}
        >
          <span
            className="text-white select-none"
            style={{
              fontFamily: 'var(--font-pinyon)',
              fontSize: 'calc(210 * var(--u))',
              lineHeight: 0.78,
              paddingLeft: 'calc(24 * var(--u))',
              paddingRight: 'calc(16 * var(--u))',
              paddingBottom: 'calc(8 * var(--u))',
            }}
          >
            Done
          </span>
        </div>
      </div>
    </div>
  );
};
