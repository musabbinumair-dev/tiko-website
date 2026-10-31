/**
 * Configuration and helpers for Tiko hero cards and floating chips.
 * All rotations, translations, heights, and asset variables are exposed
 * as CSS variables and explicit transform parameters.
 */

export interface CardConfig {
  id: string;
  title: string;
  titleColor: string;
  bgColor: string;
  border?: string;
  rotationDeg: number;
  heightPx: number;
  widthPx: number;
  translateYPx: number;
  translateXOffsetPx: number;
  zIndex: number;
  asset: {
    src: string;
    alt: string;
    widthPx: number;
    topPx: number;
    leftPercent: number;
    rotateDeg: number;
    shadowFilter?: string;
  };
  spark?: {
    color: string;
    positionClass: string;
    rotationDeg?: number;
  };
}

export const HERO_CARDS: CardConfig[] = [
  {
    id: 'work',
    title: 'Work',
    titleColor: '#FFFFFF',
    bgColor: '#6C4FFF',
    rotationDeg: -10,
    heightPx: 460,
    widthPx: 290,
    translateYPx: 70,
    translateXOffsetPx: 10,
    zIndex: 10,
    asset: {
      src: '/bag.webp',
      alt: 'Work briefcase',
      widthPx: 225,
      topPx: 95,
      leftPercent: 50,
      rotateDeg: -4,
      shadowFilter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.45))',
    },
    spark: {
      color: '#FFB830',
      positionClass: 'top-[95px] left-[65px]',
      rotationDeg: -20,
    },
  },
  {
    id: 'health',
    title: 'Health',
    titleColor: '#151515',
    bgColor: '#FFB830',
    rotationDeg: -7,
    heightPx: 490,
    widthPx: 290,
    translateYPx: 25,
    translateXOffsetPx: 5,
    zIndex: 20,
    asset: {
      src: '/dumbell.webp',
      alt: 'Health dumbbell',
      widthPx: 230,
      topPx: 105,
      leftPercent: 50,
      rotateDeg: 28,
      shadowFilter: 'drop-shadow(0 22px 28px rgba(0, 0, 0, 0.35))',
    },
  },
  {
    id: 'streak',
    title: 'Streak',
    titleColor: '#151515',
    bgColor: '#C8DB6A',
    rotationDeg: 0,
    heightPx: 520,
    widthPx: 310,
    translateYPx: -20,
    translateXOffsetPx: 0,
    zIndex: 30,
    asset: {
      src: '/fire.webp',
      alt: 'Streak mascot flame',
      widthPx: 270,
      topPx: 75,
      leftPercent: 50,
      rotateDeg: 0,
      shadowFilter: 'drop-shadow(0 24px 30px rgba(0, 0, 0, 0.3))',
    },
    spark: {
      color: '#FFB830',
      positionClass: 'top-[75px] left-[95px]',
      rotationDeg: -25,
    },
  },
  {
    id: 'personal',
    title: 'Personal',
    titleColor: '#FFFFFF',
    bgColor: '#151515',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    rotationDeg: 5,
    heightPx: 490,
    widthPx: 290,
    translateYPx: 25,
    translateXOffsetPx: -5,
    zIndex: 20,
    asset: {
      src: '/alarm.webp',
      alt: 'Personal alarm clock',
      widthPx: 215,
      topPx: 80,
      leftPercent: 50,
      rotateDeg: 2,
      shadowFilter: 'drop-shadow(0 24px 30px rgba(0, 0, 0, 0.6))',
    },
    spark: {
      color: '#FFB830',
      positionClass: 'top-[170px] right-[25px]',
      rotationDeg: 25,
    },
  },
  {
    id: 'study',
    title: 'Study',
    titleColor: '#151515',
    bgColor: '#EFEBDD',
    rotationDeg: 12,
    heightPx: 460,
    widthPx: 290,
    translateYPx: 70,
    translateXOffsetPx: -10,
    zIndex: 10,
    asset: {
      src: '/book.webp',
      alt: 'Study textbook',
      widthPx: 225,
      topPx: 105,
      leftPercent: 50,
      rotateDeg: 6,
      shadowFilter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.28))',
    },
    spark: {
      color: '#FFB830',
      positionClass: 'top-[125px] right-[25px]',
      rotationDeg: 30,
    },
  },
];

export interface BackgroundStar {
  x: string;
  y: string;
  size: number;
  color: string;
  opacity: number;
}

export const HERO_STARS: BackgroundStar[] = [
  { x: '9%', y: '21%', size: 18, color: '#FFFFFF', opacity: 0.35 },
  { x: '5%', y: '39%', size: 14, color: '#FFFFFF', opacity: 0.25 },
  { x: '20%', y: '52%', size: 15, color: '#FFFFFF', opacity: 0.3 },
  { x: '30%', y: '42%', size: 16, color: '#FFB830', opacity: 0.4 },
  { x: '21%', y: '63%', size: 13, color: '#FFFFFF', opacity: 0.25 },
  { x: '45%', y: '52%', size: 14, color: '#FFFFFF', opacity: 0.2 },
  { x: '71%', y: '55%', size: 14, color: '#FFFFFF', opacity: 0.28 },
  { x: '84%', y: '62%', size: 16, color: '#FFB830', opacity: 0.35 },
  { x: '93%', y: '20%', size: 18, color: '#FFFFFF', opacity: 0.3 },
  { x: '77%', y: '28%', size: 14, color: '#FFB830', opacity: 0.35 },
];

/**
 * Calculates CSS variables map for a card element to keep styling tweakable and animatable
 */
export function getCardStyleVariables(card: CardConfig) {
  return {
    '--card-rotate': `${card.rotationDeg}deg`,
    '--card-height': `calc(${card.heightPx} * var(--u))`,
    '--card-width': `calc(${card.widthPx} * var(--u))`,
    '--card-translate-y': `calc(${card.translateYPx} * var(--u))`,
    '--card-translate-x': `calc(${card.translateXOffsetPx} * var(--u))`,
    '--asset-rotate': `${card.asset.rotateDeg}deg`,
    '--asset-width': `calc(${card.asset.widthPx} * var(--u))`,
    '--asset-top': `calc(${card.asset.topPx} * var(--u))`,
  } as React.CSSProperties;
}
