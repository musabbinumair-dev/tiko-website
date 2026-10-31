export interface AppRelease {
  version: string;
  buildNumber: number;
  releaseDate: string;
  channel: 'Stable' | 'Beta' | 'Nightly';
  platform: 'Android' | 'iOS' | 'Desktop';
  fileSize: string;
  downloadUrl: string;
  isLatest: boolean;
  changelog: string[];
  minOs: string;
}

export const INITIAL_RELEASES: AppRelease[] = [
  {
    version: 'v1.2.0',
    buildNumber: 120,
    releaseDate: 'October 31, 2026',
    channel: 'Stable',
    platform: 'Android',
    fileSize: '34.2 MB',
    downloadUrl: '/downloads/tiko-v1.2.0.apk',
    isLatest: true,
    minOs: 'Android 8.0 or newer',
    changelog: [
      'Introduced frosted glass navigation & card fan animations',
      'Optimized 3D asset rendering across all desktop displays',
      'Enhanced streak tracking and haptic feedback response',
      'Bug fixes for task completion sync and alarm scheduler',
    ],
  },
  {
    version: 'v1.1.4',
    buildNumber: 114,
    releaseDate: 'October 15, 2026',
    channel: 'Stable',
    platform: 'Android',
    fileSize: '33.8 MB',
    downloadUrl: '/downloads/tiko-v1.1.4.apk',
    isLatest: false,
    minOs: 'Android 8.0 or newer',
    changelog: [
      'Added work, health, and study preset routines',
      'Improved battery efficiency during background streak countdowns',
    ],
  },
  {
    version: 'v1.3.0-beta.1',
    buildNumber: 131,
    releaseDate: 'In Testing',
    channel: 'Beta',
    platform: 'Android',
    fileSize: '35.1 MB',
    downloadUrl: '/downloads/tiko-v1.3.0-beta.apk',
    isLatest: false,
    minOs: 'Android 9.0 or newer',
    changelog: [
      'Early preview of Cloud AI task summarization',
      'Custom theme accent color picker',
    ],
  },
];
