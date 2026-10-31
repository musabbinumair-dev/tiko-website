import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header
      className="w-full mx-auto flex items-center justify-between relative z-40 select-none"
      style={{
        paddingTop: 'calc(32 * var(--u))',
        paddingBottom: 'calc(16 * var(--u))',
        paddingLeft: 'calc(48 * var(--u))',
        paddingRight: 'calc(48 * var(--u))',
      }}
    >
      {/* Brand logo */}
      <div className="flex items-center gap-1">
        <a
          href="#home"
          className="text-white font-['Outfit'] font-black tracking-tight flex items-center"
          style={{
            fontSize: 'calc(34 * var(--u))',
          }}
        >
          Tik
          <span className="relative inline-block">
            o
            {/* Two small amber slanted dashes above the 'o' */}
            <span
              className="absolute right-0 flex pointer-events-none"
              style={{
                top: 'calc(-14 * var(--u))',
                gap: 'calc(2 * var(--u))',
              }}
              aria-hidden="true"
            >
              <span
                className="bg-[#FFB830] rounded-full -rotate-[22deg] origin-bottom shadow-[0_0_6px_rgba(255,184,48,0.5)]"
                style={{
                  width: 'calc(3.5 * var(--u))',
                  height: 'calc(12 * var(--u))',
                }}
              />
              <span
                className="bg-[#FFB830] rounded-full rotate-[18deg] origin-bottom shadow-[0_0_6px_rgba(255,184,48,0.5)]"
                style={{
                  width: 'calc(3.5 * var(--u))',
                  height: 'calc(12 * var(--u))',
                }}
              />
            </span>
          </span>
        </a>
      </div>

      {/* Floating pill navigation */}
      <nav
        aria-label="Primary"
        className="bg-[#1A1A1A]/90 border border-white/10 rounded-full flex items-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md"
        style={{
          padding: 'calc(6 * var(--u))',
          gap: 'calc(4 * var(--u))',
        }}
      >
        <a
          href="#home"
          className="bg-[#2D2D2D] text-white rounded-full font-medium tracking-wide shadow-inner"
          style={{
            padding: 'calc(6 * var(--u)) calc(20 * var(--u))',
            fontSize: 'max(14px, calc(14 * var(--u)))',
          }}
        >
          Home
        </a>
        <a
          href="#features"
          className="text-[#8E8E93] hover:text-white rounded-full font-medium transition-colors"
          style={{
            padding: 'calc(6 * var(--u)) calc(20 * var(--u))',
            fontSize: 'max(14px, calc(14 * var(--u)))',
          }}
        >
          Features
        </a>
        <a
          href="#themes"
          className="text-[#8E8E93] hover:text-white rounded-full font-medium transition-colors"
          style={{
            padding: 'calc(6 * var(--u)) calc(20 * var(--u))',
            fontSize: 'max(14px, calc(14 * var(--u)))',
          }}
        >
          Themes
        </a>
        <a
          href="#download"
          className="text-[#8E8E93] hover:text-white rounded-full font-medium transition-colors"
          style={{
            padding: 'calc(6 * var(--u)) calc(20 * var(--u))',
            fontSize: 'max(14px, calc(14 * var(--u)))',
          }}
        >
          Download
        </a>
      </nav>

      {/* Right actions */}
      <div
        className="flex items-center"
        style={{
          gap: 'calc(24 * var(--u))',
        }}
      >
        <button
          type="button"
          className="bg-white text-black font-semibold rounded-full shadow-md hover:bg-neutral-100 transition-colors cursor-pointer"
          style={{
            padding: 'calc(10 * var(--u)) calc(24 * var(--u))',
            fontSize: 'max(14px, calc(14 * var(--u)))',
          }}
        >
          Get the app
        </button>
      </div>
    </header>
  );
};
