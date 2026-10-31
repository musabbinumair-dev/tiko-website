import test from 'node:test';
import assert from 'node:assert/strict';
import { HERO_CARDS, getCardStyleVariables } from './heroConfig';

test('hero cards configuration has exactly 5 cards with required IDs', () => {
  assert.equal(HERO_CARDS.length, 5);
  const ids = HERO_CARDS.map(c => c.id);
  assert.deepEqual(ids, ['work', 'health', 'streak', 'personal', 'study']);
});

test('center streak card is tallest and unrotated with highest z-index', () => {
  const streakCard = HERO_CARDS.find(c => c.id === 'streak');
  assert.ok(streakCard);
  assert.equal(streakCard.rotationDeg, 0);
  assert.equal(streakCard.zIndex, 30);
  assert.ok(streakCard.heightPx >= 440);
  assert.equal(streakCard.asset.src, '/fire.webp');
});

test('work and study cards sit lowest with correct rotations and assets', () => {
  const work = HERO_CARDS.find(c => c.id === 'work');
  const study = HERO_CARDS.find(c => c.id === 'study');
  assert.ok(work && study);
  assert.equal(work.rotationDeg, -10);
  assert.equal(work.asset.src, '/bag.webp');
  assert.equal(study.rotationDeg, 12);
  assert.equal(study.asset.src, '/book.webp');
});

test('health and personal cards have dumbbell and alarm assets', () => {
  const health = HERO_CARDS.find(c => c.id === 'health');
  const personal = HERO_CARDS.find(c => c.id === 'personal');
  assert.ok(health && personal);
  assert.equal(health.rotationDeg, -7);
  assert.equal(health.asset.src, '/dumbell.webp');
  assert.equal(personal.rotationDeg, 5);
  assert.equal(personal.asset.src, '/alarm.webp');
});

test('getCardStyleVariables exposes CSS variables for transforms and dimensions', () => {
  const work = HERO_CARDS[0];
  const vars = getCardStyleVariables(work) as Record<string, string>;
  assert.equal(vars['--card-rotate'], '-10deg');
  assert.equal(vars['--card-height'], 'calc(460 * var(--u))');
  assert.equal(vars['--asset-rotate'], '-4deg');
  assert.equal(vars['--asset-top'], 'calc(95 * var(--u))');
});
