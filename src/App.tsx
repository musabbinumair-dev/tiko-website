import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ReleasesSection } from './components/ReleasesSection';

export default function App() {
  const [replayKey, setReplayKey] = useState(0);
  const [currentTab, setCurrentTab] = useState('Home');

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
    setCurrentTab('Updates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full min-h-screen bg-[#0E0E0E] flex flex-col items-center overflow-x-hidden">
      {currentTab === 'Updates' ? (
        <div className="w-full min-h-screen bg-[#0E0E0E] flex flex-col items-center">
          {/* Top navigation header for Updates page */}
          <div className="w-full max-w-[1440px] mx-auto z-40">
            <Navbar
              currentTab={currentTab}
              onTabChange={handleTabChange}
              onDownload={handleDownload}
            />
          </div>

          {/* Standalone Releases section */}
          <div className="w-full flex-1">
            <ReleasesSection id="updates" onDownload={handleDownload} />
          </div>
        </div>
      ) : (
        <Hero
          key={replayKey}
          currentTab={currentTab}
          onTabChange={handleTabChange}
          onDownload={handleDownload}
        />
      )}
    </main>
  );
}
