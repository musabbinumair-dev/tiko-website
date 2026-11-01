import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { InstallModal } from './components/InstallModal';
import { DownloadModal } from './components/DownloadModal';
import { useReleaseInfo } from './utils/useReleaseInfo';
import { prefetchLatestApk, downloadLatestApk, RELEASES_PAGE_URL } from './utils/downloadApk';

export default function App() {
  const [replayKey, setReplayKey] = useState(0);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

  const { releaseInfo } = useReleaseInfo();
  const latestVersion = releaseInfo?.version ? `v${releaseInfo.version}` : 'v1.2.0';

  // Prefetch release information on page load (rule 3)
  useEffect(() => {
    prefetchLatestApk().catch(() => {
      // Ignored here, errors are surfaced on actual user download trigger
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
        setReplayKey((prev) => prev + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDownload = async () => {
    setDownloadError(false);
    try {
      const res = await downloadLatestApk();
      if (!res.success) {
        if (res.error === 'LOCKED') return; // Debounce lockout
        setDownloadError(true);
        throw new Error(res.error || "Couldn't start the download");
      }
    } catch (err: unknown) {
      setDownloadError(true);
      throw err;
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'Download') {
      setShowDownloadModal(true);
      return;
    }
  };

  return (
    <main className="w-full h-screen h-[100dvh] md:h-auto md:min-h-[100dvh] bg-[#0E0E0E] text-white flex flex-col items-center overflow-hidden md:overflow-x-hidden md:overflow-y-auto selection:bg-[#C8DB6A] selection:text-black relative">
      {/* Exact Mockup Hero View */}
      <div className="w-full h-full h-[100dvh] md:h-auto md:min-h-[max(100dvh,640px)] overflow-hidden md:overflow-visible flex flex-col items-center justify-center md:justify-start">
        <Hero
          key={replayKey}
          currentTab="Home"
          onTabChange={handleTabChange}
          onDownload={handleDownload}
        />
      </div>

      {/* Interactive Modals */}
      <InstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />

      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />

      {/* Download Error State Alert Toast with Reset & GitHub Link */}
      {downloadError && (
        <aside
          role="alert"
          aria-live="assertive"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-32px)] bg-[#18181b] border border-red-500/40 rounded-2xl p-4 shadow-[0_16px_40px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Couldn't start the download</p>
              <a
                href={RELEASES_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#C8DB6A] hover:underline inline-flex items-center gap-1 mt-0.5"
              >
                <span>Open releases on GitHub</span>
                <span>→</span>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={() => {
                setDownloadError(false);
                handleDownload().catch(() => {});
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => setDownloadError(false)}
              className="p-1.5 rounded-lg text-white/50 hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        </aside>
      )}
    </main>
  );
}
