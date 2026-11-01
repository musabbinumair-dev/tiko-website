import React from 'react';
import { motion } from 'motion/react';

const DOWNLOAD_URL = 'https://github.com/musabbinumair-dev/Tiko/releases/latest/download/tiko.apk';
const GITHUB_REPO_URL = 'https://github.com/musabbinumair-dev/Tiko';

interface NavbarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  onDownload?: () => void;
  onOpenInstallModal?: () => void;
}

const GitHubButton: React.FC<{ isDesktop?: boolean }> = ({ isDesktop = false }) => (
  <a
    href={GITHUB_REPO_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`bg-white text-black font-semibold rounded-full shadow-md hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 no-underline text-center ${
      isDesktop ? '' : 'pl-3.5 pr-2.5 py-1.5 text-xs sm:text-sm'
    }`}
    style={
      isDesktop
        ? {
            padding: 'calc(10 * var(--u)) calc(20 * var(--u))',
            fontSize: 'calc(14 * var(--u))',
          }
        : undefined
    }
  >
    <span>Rate on GitHub</span>
    <span
      className={`rounded-full bg-black text-white flex items-center justify-center shrink-0 ${
        isDesktop ? '' : 'w-5 h-5'
      }`}
      style={
        isDesktop
          ? {
              width: 'calc(20 * var(--u))',
              height: 'calc(20 * var(--u))',
            }
          : undefined
      }
    >
      <svg
        className="fill-white"
        style={{
          width: isDesktop ? 'calc(12 * var(--u))' : '12px',
          height: isDesktop ? 'calc(12 * var(--u))' : '12px',
        }}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    </span>
  </a>
);

export const Navbar: React.FC<NavbarProps> = ({
  onTabChange,
  onDownload,
}) => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onTabChange) {
      onTabChange('Home');
    }
  };

  return (
    <header
      className="w-full mx-auto flex items-center justify-between relative z-40 select-none px-5 pt-4 pb-3 sm:px-6 sm:pt-6 md:px-0 md:pt-[calc(32*var(--u))] md:pb-[calc(16*var(--u))] md:pl-[calc(48*var(--u))] md:pr-[calc(48*var(--u))]"
    >
      {/* Brand logo - clean without sparkles */}
      <div className="flex items-center">
        <a
          href="#home"
          onClick={handleLogoClick}
          className="text-white font-['Outfit'] font-black tracking-tight flex items-center cursor-pointer text-2xl xs:text-3xl md:text-[calc(34*var(--u))]"
        >
          Tiko
        </a>
      </div>

      {/* Mobile: Modern Animated Tiko GitHub Promotion Button */}
      <div className="flex items-center md:hidden">
        <GitHubButton />
      </div>

      {/* Desktop Right action: Both GitHub Promotion Button + Get the App */}
      <div
        className="hidden md:flex items-center"
        style={{
          gap: 'calc(12 * var(--u))',
        }}
      >
        <GitHubButton isDesktop />

        <a
          href={DOWNLOAD_URL}
          download="tiko.apk"
          onClick={() => onDownload?.()}
          className="bg-white text-black font-semibold rounded-full shadow-md hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 no-underline text-center"
          style={{
            padding: 'calc(10 * var(--u)) calc(20 * var(--u))',
            fontSize: 'calc(14 * var(--u))',
          }}
        >
          <span>Get the app</span>
          <span
            className="rounded-full bg-black text-white flex items-center justify-center shrink-0"
            style={{
              width: 'calc(20 * var(--u))',
              height: 'calc(20 * var(--u))',
            }}
          >
            <svg
              className="stroke-[2.5]"
              style={{
                width: 'calc(12 * var(--u))',
                height: 'calc(12 * var(--u))',
              }}
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
    </header>
  );
};

