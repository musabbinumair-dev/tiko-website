/**
 * Unified APK download module for Tiko
 * Eliminates SPA index.html fallback downloads, cross-origin fetch/Blob issues,
 * and double-trigger errors.
 */

export const FALLBACK_APK_URL = 'https://github.com/musabbinumair-dev/Tiko/releases/latest/download/tiko.apk';
export const RELEASES_PAGE_URL = 'https://github.com/musabbinumair-dev/Tiko/releases/latest';
export const GITHUB_LATEST_RELEASE_API = 'https://api.github.com/repos/musabbinumair-dev/Tiko/releases/latest';

export const APK_CACHE_KEY = 'tiko_latest_apk_cache';
export const APK_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
export const MIN_APK_SIZE_BYTES = 1_000_000; // 1 MB minimum sanity check

export interface ApkCacheData {
  url: string;
  size: number;
  timestamp: number;
  version?: string;
}

export type DownloadState = 'idle' | 'preparing' | 'started' | 'error';

export interface DownloadResult {
  success: boolean;
  url?: string;
  error?: string;
}

// In-memory lock to prevent double triggers across 3 seconds
let isLocked = false;
let lockTimer: ReturnType<typeof setTimeout> | null = null;

// In-memory resolved APK URL from prefetch or cache
let prefetchedUrl: string | null = null;

export function _resetDownloadApkStateForTesting(): void {
  prefetchedUrl = null;
  isLocked = false;
  if (lockTimer) {
    clearTimeout(lockTimer);
    lockTimer = null;
  }
}

/**
 * Read cached APK info from localStorage if still within 10-minute TTL.
 */
export function getCachedApkData(): ApkCacheData | null {
  try {
    const raw = localStorage.getItem(APK_CACHE_KEY);
    if (!raw) return null;
    const parsed: ApkCacheData = JSON.parse(raw);
    const age = Date.now() - (parsed.timestamp || 0);
    if (age < APK_CACHE_TTL_MS && parsed.url && typeof parsed.size === 'number' && parsed.size > MIN_APK_SIZE_BYTES) {
      return parsed;
    }
  } catch {
    // Ignore localStorage read errors
  }
  return null;
}

/**
 * Save valid APK info to localStorage cache.
 */
export function setCachedApkData(data: Omit<ApkCacheData, 'timestamp'>): void {
  try {
    const payload: ApkCacheData = {
      ...data,
      timestamp: Date.now(),
    };
    localStorage.setItem(APK_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore localStorage write errors
  }
}

/**
 * Prefetch latest release from GitHub API with an 8s timeout.
 * Validates the release asset size and caches the direct download URL.
 */
export async function prefetchLatestApk(): Promise<string> {
  // Check memory cache first
  if (prefetchedUrl) return prefetchedUrl;

  // Check persistent localStorage cache
  const cached = getCachedApkData();
  if (cached?.url) {
    prefetchedUrl = cached.url;
    return cached.url;
  }

  try {
    // 8-second timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(GITHUB_LATEST_RELEASE_API, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.status === 403) {
      // Rate limited by GitHub API
      if (cached?.url) {
        prefetchedUrl = cached.url;
        return cached.url;
      }
      prefetchedUrl = FALLBACK_APK_URL;
      return FALLBACK_APK_URL;
    }

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const data = await response.json();
    const assets: Array<{ name?: string; size?: number; browser_download_url?: string }> = data.assets || [];

    // Find asset named "tiko.apk" (case-insensitive), fallback to first asset ending in .apk
    const apkAsset =
      assets.find((a) => a.name?.toLowerCase() === 'tiko.apk') ||
      assets.find((a) => a.name?.toLowerCase().endsWith('.apk'));

    // Sanity check: must exist and size must be over 1,000,000 bytes
    if (!apkAsset || !apkAsset.browser_download_url || typeof apkAsset.size !== 'number' || apkAsset.size <= MIN_APK_SIZE_BYTES) {
      throw new Error('NO_VALID_APK_ASSET');
    }

    const downloadUrl = apkAsset.browser_download_url;
    setCachedApkData({
      url: downloadUrl,
      size: apkAsset.size,
      version: data.tag_name || data.name || '',
    });

    prefetchedUrl = downloadUrl;
    return downloadUrl;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);

    // If the API succeeded but there was no valid APK asset in the release:
    if (errorMsg === 'NO_VALID_APK_ASSET') {
      throw err;
    }

    // For network failures, timeouts, or API errors:
    if (cached?.url) {
      prefetchedUrl = cached.url;
      return cached.url;
    }

    // Fallback URL (always valid)
    prefetchedUrl = FALLBACK_APK_URL;
    return FALLBACK_APK_URL;
  }
}

/**
 * Triggers plain browser navigation to the verified APK URL.
 * Prevents double triggers with a 3-second lockout.
 * Never fetches binary into memory, never creates Blob or object URL, never uses relative paths.
 */
export async function downloadLatestApk(): Promise<DownloadResult> {
  // Check 3-second lockout
  if (isLocked) {
    return { success: false, error: 'LOCKED' };
  }

  // Engage 3-second lockout
  isLocked = true;
  if (lockTimer) clearTimeout(lockTimer);
  lockTimer = setTimeout(() => {
    isLocked = false;
  }, 3000);

  try {
    const apkUrl = await prefetchLatestApk();

    // Trigger download with plain navigation to cross-origin GitHub CDN
    if (typeof window !== 'undefined') {
      if (typeof document !== 'undefined') {
        const anchor = document.createElement('a');
        anchor.href = apkUrl;
        anchor.target = '_self';
        anchor.rel = 'noopener noreferrer';
        document.body.appendChild(anchor);
        anchor.click();
        setTimeout(() => {
          if (anchor.parentNode) {
            anchor.parentNode.removeChild(anchor);
          }
        }, 200);
      } else if (typeof window.location?.assign === 'function') {
        window.location.assign(apkUrl);
      }
    }

    return { success: true, url: apkUrl };
  } catch (err: unknown) {
    // Release is missing valid APK asset or other fatal condition
    const message = err instanceof Error ? err.message : 'DOWNLOAD_ERROR';
    return { success: false, error: message };
  }
}
