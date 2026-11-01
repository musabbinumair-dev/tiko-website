import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FALLBACK_APK_URL,
  APK_CACHE_KEY,
  prefetchLatestApk,
  downloadLatestApk,
  getCachedApkData,
  setCachedApkData,
  _resetDownloadApkStateForTesting,
} from './downloadApk.js';

// Setup mock localStorage and window environment for Node.js test environment
const mockStorage: Record<string, string> = {};
globalThis.localStorage = {
  getItem: (key: string) => mockStorage[key] || null,
  setItem: (key: string, value: string) => {
    mockStorage[key] = value;
  },
  removeItem: (key: string) => {
    delete mockStorage[key];
  },
  clear: () => {
    for (const k of Object.keys(mockStorage)) delete mockStorage[k];
  },
  length: 0,
  key: () => null,
};

globalThis.window = {
  location: {
    assign: () => {},
  },
} as any;

test('Scenario 1: API success returns direct asset URL and caches for 10 minutes', async () => {
  _resetDownloadApkStateForTesting();
  delete mockStorage[APK_CACHE_KEY];
  const expectedUrl = 'https://github.com/musabbinumair-dev/Tiko/releases/download/v1.2.0/tiko.apk';

  // Mock successful fetch
  globalThis.fetch = async () =>
    ({
      ok: true,
      status: 200,
      json: async () => ({
        tag_name: 'v1.2.0',
        assets: [
          {
            name: 'tiko.apk',
            size: 32_500_000, // 32.5 MB (> 1MB)
            browser_download_url: expectedUrl,
          },
        ],
      }),
    } as any);

  const url = await prefetchLatestApk();
  assert.equal(url, expectedUrl);

  const cached = getCachedApkData();
  assert.ok(cached);
  assert.equal(cached.url, expectedUrl);
  assert.equal(cached.size, 32_500_000);
});

test('Scenario 2: API 403 (Rate limited) uses cache if available, or fallback URL', async () => {
  _resetDownloadApkStateForTesting();
  delete mockStorage[APK_CACHE_KEY];

  // Mock 403 rate limit
  globalThis.fetch = async () =>
    ({
      ok: false,
      status: 403,
    } as any);

  // 2a. Without cache -> returns fallback URL
  const fallbackResult = await prefetchLatestApk();
  assert.equal(fallbackResult, FALLBACK_APK_URL);

  // 2b. With valid cache -> returns cached URL
  _resetDownloadApkStateForTesting();
  const cachedUrl = 'https://github.com/musabbinumair-dev/Tiko/releases/download/v1.1.9/tiko.apk';
  setCachedApkData({
    url: cachedUrl,
    size: 30_000_000,
  });

  const cachedResult = await prefetchLatestApk();
  assert.equal(cachedResult, cachedUrl);
});

test('Scenario 3: API fails / offline returns fallback URL', async () => {
  _resetDownloadApkStateForTesting();
  delete mockStorage[APK_CACHE_KEY];

  // Mock network rejection
  globalThis.fetch = async () => {
    throw new Error('Failed to fetch (offline)');
  };

  const url = await prefetchLatestApk();
  assert.equal(url, FALLBACK_APK_URL);
});

test('Scenario 4: Release has NO tiko.apk asset or tiny size (< 1MB) throws error and prevents download', async () => {
  _resetDownloadApkStateForTesting();
  delete mockStorage[APK_CACHE_KEY];

  // Mock API returning assets without valid tiko.apk or size <= 1MB
  globalThis.fetch = async () =>
    ({
      ok: true,
      status: 200,
      json: async () => ({
        tag_name: 'v1.2.0',
        assets: [
          {
            name: 'notes.txt',
            size: 500,
            browser_download_url: 'https://github.com/.../notes.txt',
          },
        ],
      }),
    } as any);

  let caughtError: any = null;
  try {
    await prefetchLatestApk();
  } catch (err: any) {
    caughtError = err;
  }

  assert.ok(caughtError, 'Expected prefetchLatestApk to throw NO_VALID_APK_ASSET');
  assert.equal(caughtError.message, 'NO_VALID_APK_ASSET');
});

test('Lockout: prevents double trigger within 3 seconds', async () => {
  _resetDownloadApkStateForTesting();
  delete mockStorage[APK_CACHE_KEY];

  // Setup valid fetch
  globalThis.fetch = async () =>
    ({
      ok: true,
      status: 200,
      json: async () => ({
        tag_name: 'v1.2.0',
        assets: [
          {
            name: 'tiko.apk',
            size: 30_000_000,
            browser_download_url: 'https://github.com/musabbinumair-dev/Tiko/releases/download/v1.2.0/tiko.apk',
          },
        ],
      }),
    } as any);

  const res1 = await downloadLatestApk();
  assert.equal(res1.success, true);

  // Immediate second trigger should be locked out
  const res2 = await downloadLatestApk();
  assert.equal(res2.success, false);
  assert.equal(res2.error, 'LOCKED');
});
