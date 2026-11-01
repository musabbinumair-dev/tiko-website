import React, { useState, useEffect } from 'react';

const CACHE_KEY = 'tiko_latest_release_cache';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export interface ReleaseInfo {
  version: string; // e.g. "1.0.118"
  sizeMB: string;  // e.g. "29.3"
  isFallbackOnly?: boolean;
}

interface CachePayload {
  version: string;
  sizeMB: string;
  timestamp: number;
}

export function useReleaseInfo() {
  const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo | null>(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed: CachePayload = JSON.parse(raw);
        if (parsed.version) {
          return {
            version: parsed.version,
            sizeMB: parsed.sizeMB,
          };
        }
      }
    } catch {
      // localStorage unavailable or corrupted
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(!releaseInfo);

  useEffect(() => {
    let mounted = true;

    async function fetchRelease() {
      // Check cache freshness
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const parsed: CachePayload = JSON.parse(raw);
          const age = Date.now() - (parsed.timestamp || 0);
          if (age < CACHE_TTL_MS && parsed.version) {
            if (mounted) {
              setReleaseInfo({ version: parsed.version, sizeMB: parsed.sizeMB });
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // Ignore cache read errors
      }

      try {
        const res = await fetch('https://api.github.com/repos/musabbinumair-dev/Tiko/releases/latest');
        if (!res.ok) {
          throw new Error(`GitHub API returned status ${res.status}`);
        }
        const data = await res.json();
        
        // Strip leading 'v' or 'V'
        const rawTag = data.tag_name || data.name || '';
        const version = rawTag.replace(/^v/i, '').trim();

        // Find tiko.apk or first .apk asset
        const assets: Array<{ name?: string; size?: number }> = data.assets || [];
        const apkAsset =
          assets.find((a) => a.name?.toLowerCase() === 'tiko.apk') ||
          assets.find((a) => a.name?.toLowerCase().endsWith('.apk'));

        let sizeMB = '';
        if (apkAsset && typeof apkAsset.size === 'number' && apkAsset.size > 0) {
          sizeMB = (apkAsset.size / (1024 * 1024)).toFixed(1);
        }

        const newRelease: ReleaseInfo = { version, sizeMB };

        try {
          const cachePayload: CachePayload = {
            version,
            sizeMB,
            timestamp: Date.now(),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
        } catch {
          // localStorage write failed (e.g. quota or incognito)
        }

        if (mounted) {
          setReleaseInfo(newRelease);
          setLoading(false);
        }
      } catch {
        // If request fails or is rate limited (HTTP 403)
        if (mounted) {
          // Use cached data if there is any
          try {
            const raw = localStorage.getItem(CACHE_KEY);
            if (raw) {
              const parsed: CachePayload = JSON.parse(raw);
              if (parsed.version) {
                setReleaseInfo({ version: parsed.version, sizeMB: parsed.sizeMB });
                setLoading(false);
                return;
              }
            }
          } catch {
            // Ignore
          }

          // Otherwise show "Latest version" without a number
          setReleaseInfo({ version: '', sizeMB: '', isFallbackOnly: true });
          setLoading(false);
        }
      }
    }

    fetchRelease();

    return () => {
      mounted = false;
    };
  }, []);

  return { releaseInfo, loading };
}
