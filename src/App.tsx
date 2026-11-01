import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { InstallModal } from './components/InstallModal';
import { DownloadModal } from './components/DownloadModal';
import { DownloadToast } from './components/DownloadToast';
import { useReleaseInfo } from './utils/useReleaseInfo';

export default function App() {
  const [replayKey, setReplayKey] = useState(0);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showDownloadToast, setShowDownloadToast] = useState(false);

  const { releaseInfo } = useReleaseInfo();
  const latestVersion = releaseInfo?.version ? `v${releaseInfo.version}` : 'v1.2.0';

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

  const handleDownload = () => {
    setShowDownloadToast(true);
    // Trigger direct APK download from GitHub
    const link = document.createElement('a');
    link.href = 'https://github.com/musabbinumair-dev/Tiko/releases/latest/download/tiko.apk';
    link.download = 'tiko.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'Download') {
      setShowDownloadModal(true);
      return;
    }
  };

  return (
    <main className="w-full h-screen h-[100dvh] bg-[#0E0E0E] text-white flex flex-col items-center overflow-hidden selection:bg-[#C8DB6A] selection:text-black">
      {/* Exact Mockup Hero View */}
      <div className="w-full h-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
        <Hero
          key={replayKey}
          currentTab="Home"
          onTabChange={handleTabChange}
          onDownload={handleDownload}
        />
      </div>

      {/* Interactive Modals & Toasts */}
      <InstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />

      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />

      <DownloadToast
        show={showDownloadToast}
        onClose={() => setShowDownloadToast(false)}
        onHowToInstall={() => {
          setShowDownloadToast(false);
          setShowInstallModal(true);
        }}
      />
    </main>
  );
}

