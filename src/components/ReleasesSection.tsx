import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const RELEASES_CACHE_KEY = 'tiko_releases_list_cache';
const RELEASES_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

interface ReleaseAsset {
  name: string;
  size: number;
  browser_download_url: string;
  digest?: string;
}

interface ReleaseItem {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  html_url: string;
  assets: ReleaseAsset[];
}

interface ReleasesSectionProps {
  id?: string;
  onDownload?: () => void;
}

export const ReleasesSection: React.FC<ReleasesSectionProps> = ({
  id = 'updates',
  onDownload,
}) => {
  const [releases, setReleases] = useState<ReleaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const [copiedDigestId, setCopiedDigestId] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;

    async function loadReleases() {
      // 1. Check local cache
      try {
        const cachedRaw = localStorage.getItem(RELEASES_CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          const age = Date.now() - (cached.timestamp || 0);
          if (age < RELEASES_CACHE_TTL && Array.isArray(cached.data) && cached.data.length > 0) {
            if (isMounted) {
              setReleases(cached.data);
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // Cache read fallback
      }

      // 2. Fetch from GitHub API
      try {
        const res = await fetch('https://api.github.com/repos/musabbinumair-dev/Tiko/releases?per_page=10');
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }
        const data: ReleaseItem[] = await res.json();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setReleases(data);
            try {
              localStorage.setItem(
                RELEASES_CACHE_KEY,
                JSON.stringify({ data, timestamp: Date.now() })
              );
            } catch {
              // Ignore localStorage write errors
            }
          } else {
            setError(true);
          }
          setLoading(false);
        }
      } catch {
        // 3. Fallback to cached data if request fails or is rate-limited (HTTP 403)
        if (isMounted) {
          try {
            const cachedRaw = localStorage.getItem(RELEASES_CACHE_KEY);
            if (cachedRaw) {
              const cached = JSON.parse(cachedRaw);
              if (Array.isArray(cached.data) && cached.data.length > 0) {
                setReleases(cached.data);
                setLoading(false);
                return;
              }
            }
          } catch {
            // Ignore
          }
          setError(true);
          setLoading(false);
        }
      }
    }

    loadReleases();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyDigest = async (releaseId: number, digestText: string) => {
    try {
      const cleanHash = digestText.replace(/^sha256:/i, '').trim();
      await navigator.clipboard.writeText(cleanHash);
      setCopiedDigestId(releaseId);
      setTimeout(() => {
        setCopiedDigestId(null);
      }, 2000);
    } catch {
      // Clipboard write fallback
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section
      id={id}
      className="w-full bg-[#0E0E0E] text-white py-20 px-6 sm:px-8 border-t border-white/5 relative z-30"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-white/10 text-xs font-semibold text-white/80 mb-3 tracking-wide">
              <span>Updates &amp; Changelog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Outfit'] text-white">
              Releases
            </h2>
          </div>
          <p className="text-sm text-white/50 max-w-sm">
            Download the latest APK builds directly or inspect past releases with full changelogs and verification checksums.
          </p>
        </div>

        {/* 5. How to install Block */}
        <div className="mb-12 p-6 sm:p-7 rounded-3xl bg-[#141416]/80 border border-white/10 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-full bg-[#C8DB6A]/15 text-[#C8DB6A] flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">How to install Tiko APK</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-white/80">
            <div className="flex items-start gap-3 bg-white/[0.03] p-3.5 rounded-2xl border border-white/5">
              <span className="w-6 h-6 rounded-full bg-white/10 text-[#C8DB6A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="block text-white font-semibold">Open the downloaded file</strong>
                <span className="text-white/60 text-xs mt-0.5 block leading-relaxed">
                  Tap <code className="text-white bg-white/10 px-1 py-0.5 rounded text-[11px]">tiko.apk</code> in your downloads folder or browser notification.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/[0.03] p-3.5 rounded-2xl border border-white/5">
              <span className="w-6 h-6 rounded-full bg-white/10 text-[#C8DB6A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="block text-white font-semibold">Allow installation</strong>
                <span className="text-white/60 text-xs mt-0.5 block leading-relaxed">
                  If asked, allow "Install unknown apps" for your browser in system settings.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/[0.03] p-3.5 rounded-2xl border border-white/5">
              <span className="w-6 h-6 rounded-full bg-white/10 text-[#C8DB6A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="block text-white font-semibold">Tap Install</strong>
                <span className="text-white/60 text-xs mt-0.5 block leading-relaxed">
                  Confirm installation when prompted and launch Tiko once finished.
                </span>
              </div>
            </div>
          </div>

          {/* Android warning note */}
          <div className="mt-4 pt-3.5 border-t border-white/5 flex items-start gap-2 text-xs text-white/50 leading-relaxed">
            <svg className="w-4 h-4 text-[#C8DB6A]/80 shrink-0 mt-0.5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong>Note:</strong> Android may warn that APK files can be harmful. This is standard system behavior for apps downloaded directly outside the Google Play Store.
            </span>
          </div>
        </div>

        {/* Releases List */}
        {loading ? (
          /* 4. Skeleton cards */
          <div className="space-y-4" aria-busy="true" aria-label="Loading releases">
            {[1, 2, 3].map((skeletonIndex) => (
              <div
                key={skeletonIndex}
                className="p-6 rounded-3xl bg-[#141416]/60 border border-white/5 animate-pulse"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-6 bg-white/10 rounded-full" />
                    <div className="w-20 h-4 bg-white/5 rounded" />
                  </div>
                  <div className="w-28 h-9 bg-white/10 rounded-full" />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="w-full h-3 bg-white/5 rounded" />
                  <div className="w-5/6 h-3 bg-white/5 rounded" />
                  <div className="w-3/4 h-3 bg-white/5 rounded" />
                </div>
                <div className="w-48 h-4 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : error || releases.length === 0 ? (
          /* 4. Failure or empty state */
          <div className="p-8 text-center rounded-3xl bg-[#141416]/60 border border-white/10">
            <p className="text-white/80 font-medium mb-3">
              Couldn't load releases right now
            </p>
            <a
              href="https://github.com/musabbinumair-dev/Tiko/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8DB6A] hover:underline"
            >
              <span>View all releases on GitHub</span>
              <svg className="w-3.5 h-3.5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ) : (
          /* 2 & 3. Vertical list of release cards */
          <div className="space-y-4">
            {releases.map((release, idx) => {
              const version = (release.tag_name || release.name || '').replace(/^v/i, '').trim();
              const isLatest = idx === 0;
              const isExpanded = !!expandedCards[release.id];

              // Find tiko.apk or first .apk asset
              const apkAsset =
                release.assets?.find((a) => a.name?.toLowerCase() === 'tiko.apk') ||
                release.assets?.find((a) => a.name?.toLowerCase().endsWith('.apk'));

              const downloadUrl =
                apkAsset?.browser_download_url ||
                `https://github.com/musabbinumair-dev/Tiko/releases/download/${release.tag_name}/tiko.apk`;

              const sizeMB = apkAsset?.size
                ? (apkAsset.size / (1024 * 1024)).toFixed(1)
                : '';

              const digest = apkAsset?.digest;
              const cleanHash = digest ? digest.replace(/^sha256:/i, '').trim() : '';
              const isCopied = copiedDigestId === release.id;

              return (
                <motion.div
                  key={release.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-6 sm:p-7 rounded-3xl bg-[#141416]/80 border border-white/10 hover:border-white/20 transition-colors backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                >
                  {/* Card Header: Version, Date, Latest Badge, and Download Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white tracking-tight">
                        v{version}
                      </span>

                      {isLatest && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C8DB6A]/15 text-[#C8DB6A] border border-[#C8DB6A]/30 tracking-wide">
                          Latest
                        </span>
                      )}

                      <span className="text-xs sm:text-sm text-white/40">
                        {formatDate(release.published_at)}
                      </span>
                    </div>

                    {/* Download Button linking to APK */}
                    <a
                      href={downloadUrl}
                      download="tiko.apk"
                      onClick={() => onDownload?.()}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-100 active:scale-95 transition-all shadow-md self-start sm:self-auto cursor-pointer whitespace-nowrap"
                    >
                      <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download APK</span>
                      {sizeMB && (
                        <span className="text-black/60 font-medium">({sizeMB} MB)</span>
                      )}
                    </a>
                  </div>

                  {/* Release Notes (body) */}
                  {release.body && (
                    <div className="mt-4">
                      <div
                        className={`text-xs sm:text-sm text-white/70 leading-relaxed font-sans whitespace-pre-line ${
                          isExpanded ? '' : 'line-clamp-3'
                        }`}
                      >
                        {release.body}
                      </div>

                      {release.body.length > 140 && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(release.id)}
                          className="mt-2 text-xs font-semibold text-[#C8DB6A] hover:underline cursor-pointer focus:outline-none"
                        >
                          {isExpanded ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* 3. SHA-256 Digest Row with Copy Button */}
                  {cleanHash && (
                    <div className="mt-5 pt-3.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-semibold text-white/50 tracking-wider text-[11px] uppercase shrink-0">
                          SHA-256
                        </span>
                        <code className="text-white/40 font-mono text-[11px] truncate max-w-[220px] sm:max-w-md bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">
                          {cleanHash}
                        </code>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyDigest(release.id, cleanHash)}
                        aria-label="Copy SHA-256 checksum"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 text-xs text-white/80 hover:text-white transition-all border border-white/10 cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <svg className="w-3.5 h-3.5 text-[#C8DB6A] stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[#C8DB6A] font-semibold text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5 stroke-[2] text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
