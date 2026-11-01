import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_RELEASES, AppRelease } from '../utils/releasesConfig';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [releases, setReleases] = useState<AppRelease[]>(INITIAL_RELEASES);
  const [activeTab, setActiveTab] = useState<'download' | 'history' | 'admin'>('download');
  const [downloadingVersion, setDownloadingVersion] = useState<string | null>(null);

  // New release form state for admin
  const [newVersion, setNewVersion] = useState('v1.2.1');
  const [newChangelog, setNewChangelog] = useState('Performance improvements and bug fixes');
  const [newSize, setNewSize] = useState('34.5 MB');

  const latestRelease = releases.find((r) => r.isLatest) || releases[0];

  const handleDownload = (release: AppRelease) => {
    setDownloadingVersion(release.version);
    setTimeout(() => {
      setDownloadingVersion(null);
      // Trigger mock download or file link
      const blob = new Blob([`Tiko App Release ${release.version} (Build ${release.buildNumber})\nSimulated APK binary package. Place actual .apk in /public/downloads/`], { type: 'application/vnd.android.package-archive' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tiko-${release.version}.apk`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1200);
  };

  const handleAddNewRelease = (e: React.FormEvent) => {
    e.preventDefault();
    const created: AppRelease = {
      version: newVersion,
      buildNumber: releases.length + 120,
      releaseDate: 'Just Now',
      channel: 'Stable',
      platform: 'Android',
      fileSize: newSize,
      downloadUrl: `/downloads/tiko-${newVersion}.apk`,
      isLatest: true,
      minOs: 'Android 8.0 or newer',
      changelog: [newChangelog, 'Updated build manifest and dependencies'],
    };

    // Mark previous as not latest
    const updated = releases.map((r) => ({ ...r, isLatest: false }));
    setReleases([created, ...updated]);
    setActiveTab('download');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-2xl max-h-[90dvh] flex flex-col bg-[#141416] border border-white/15 rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden z-10 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-5 sm:py-6 border-b border-white/10 bg-[#1A1A1E] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C8DB6A] text-black font-black flex items-center justify-center text-xl shadow-lg shrink-0">
                T
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">Tiko App Release Center</h3>
                <p className="text-xs text-[#8E8E93]">Official builds, changelogs & version manager</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 bg-[#111113] px-4 sm:px-8 py-2 gap-2 sm:gap-4 overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => setActiveTab('download')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'download'
                  ? 'bg-white/15 text-white shadow-inner'
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              Latest Build
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'history'
                  ? 'bg-white/15 text-white shadow-inner'
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              History ({releases.length})
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'admin'
                  ? 'bg-[#C8DB6A] text-black shadow-inner'
                  : 'text-[#8E8E93] hover:text-white bg-white/5'
              }`}
            >
              <span>⚙️</span> Publish
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-8 flex-1 overflow-y-auto">
            {activeTab === 'download' && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8DB6A]/20 text-[#C8DB6A] text-xs font-bold mb-3 border border-[#C8DB6A]/30">
                      <span>🔥</span> Latest Stable Release ({latestRelease.version})
                    </div>
                    <h4 className="text-2xl font-bold tracking-tight mb-1">Tiko for Android</h4>
                    <p className="text-sm text-[#8E8E93]">
                      Build #{latestRelease.buildNumber} • {latestRelease.fileSize} • {latestRelease.minOs}
                    </p>
                  </div>
                  <button
                    disabled={downloadingVersion !== null}
                    onClick={() => handleDownload(latestRelease)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-black font-bold hover:bg-neutral-200 transition-all shadow-xl cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {downloadingVersion === latestRelease.version ? (
                      <>
                        <span className="animate-spin">⏳</span> Preparing APK...
                      </>
                    ) : (
                      <>
                        <span>📥</span> Download APK ({latestRelease.fileSize})
                      </>
                    )}
                  </button>
                </div>

                {/* Changelog */}
                <div className="flex flex-col gap-3">
                  <h5 className="text-sm font-semibold text-[#8E8E93] uppercase tracking-wider">Release Notes & Changes</h5>
                  <ul className="flex flex-col gap-2.5 bg-black/30 p-6 rounded-2xl border border-white/5">
                    {latestRelease.changelog.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white/90">
                        <span className="text-[#C8DB6A] font-bold">✓</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="flex flex-col gap-4">
                <h5 className="text-sm font-semibold text-[#8E8E93] uppercase tracking-wider mb-2">All Published Builds</h5>
                {releases.map((rel) => (
                  <div
                    key={rel.version}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg">{rel.version}</span>
                        {rel.isLatest && (
                          <span className="px-2 py-0.5 rounded-full bg-[#C8DB6A] text-black text-[10px] font-extrabold">
                            LATEST
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 text-[10px] font-semibold">
                          {rel.channel}
                        </span>
                      </div>
                      <p className="text-xs text-[#8E8E93]">
                        Released on {rel.releaseDate} • Build #{rel.buildNumber} • {rel.fileSize}
                      </p>
                    </div>
                    <button
                      disabled={downloadingVersion === rel.version}
                      onClick={() => handleDownload(rel)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all cursor-pointer border border-white/10"
                    >
                      {downloadingVersion === rel.version ? 'Downloading...' : 'Download APK'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'admin' && (
              <form onSubmit={handleAddNewRelease} className="flex flex-col gap-5">
                <div className="p-4 rounded-2xl bg-[#C8DB6A]/10 border border-[#C8DB6A]/20 text-sm text-[#C8DB6A] leading-relaxed">
                  💡 <strong>How to publish new app updates manually:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-white/90 text-xs">
                    <li>Export your compiled release APK from Android Studio / Flutter / React Native.</li>
                    <li>Place the APK binary file into the project folder: <code className="bg-black/40 px-1.5 py-0.5 rounded text-[#C8DB6A]">/public/downloads/tiko-vX.X.X.apk</code></li>
                    <li>Enter the version number and changelog below and click <strong>Publish Release</strong>.</li>
                  </ol>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#8E8E93]">New Version Tag</label>
                    <input
                      type="text"
                      value={newVersion}
                      onChange={(e) => setNewVersion(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#C8DB6A]"
                      placeholder="e.g. v1.2.1"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#8E8E93]">File Size</label>
                    <input
                      type="text"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#C8DB6A]"
                      placeholder="e.g. 34.5 MB"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#8E8E93]">Release Notes / Changelog Summary</label>
                  <textarea
                    value={newChangelog}
                    onChange={(e) => setNewChangelog(e.target.value)}
                    rows={3}
                    className="px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#C8DB6A] resize-none"
                    placeholder="Describe what's new in this update..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#C8DB6A] text-black font-bold hover:bg-[#b5c857] transition-all shadow-xl cursor-pointer mt-2"
                >
                  🚀 Publish Release & Update Download Hub
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
