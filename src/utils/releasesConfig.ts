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
    version: 'v1.0.118',
    buildNumber: 118,
    releaseDate: 'October 31, 2026',
    channel: 'Stable',
    platform: 'Android',
    fileSize: '30.7 MB',
    downloadUrl: 'https://github.com/musabbinumair-dev/Tiko/releases/latest/download/tiko.apk',
    isLatest: true,
    minOs: 'Android 8.0 or newer',
    changelog: [
      'Improve logout and delete account bottom sheets',
      'Add drag-to-dismiss, slide animations, and outside-tap dismissal',
      'Match delete-account typography and graphic sizing to logout sheet',
      'Keep delete-account form visible above keyboard',
    ],
  },
  {
    version: 'v1.1.4',
    buildNumber: 114,
    releaseDate: 'October 15, 2026',
    channel: 'Stable',
    platform: 'Android',
    fileSize: '33.8 MB',
    downloadUrl: 'https://github.com/musabbinumair-dev/Tiko/releases/download/v1.1.4/tiko.apk',
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
    downloadUrl: 'https://github.com/musabbinumair-dev/Tiko/releases/download/v1.3.0-beta.1/tiko.apk',
    isLatest: false,
    minOs: 'Android 9.0 or newer',
    changelog: [
      'Early preview of Cloud AI task summarization',
      'Custom theme accent color picker',
    ],
  },
];
