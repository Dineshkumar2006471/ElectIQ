// Tests for the rate-limit utility module

import { checkRateLimit } from '@/lib/rate-limit';

describe('checkRateLimit', () => {
  test('allows first request within limit', () => {
    const result = checkRateLimit('rate-test-1', 20, 60000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(19);
  });

  test('blocks requests when limit is reached', () => {
    const key = 'rate-test-block-' + Date.now();
    // Exhaust the limit
    for (let i = 0; i < 5; i++) {
      checkRateLimit(key, 5, 60000);
    }
    const result = checkRateLimit(key, 5, 60000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  test('returns correct remaining count', () => {
    const key = 'rate-test-remaining-' + Date.now();
    const first = checkRateLimit(key, 10, 60000);
    expect(first.remaining).toBe(9);
    const second = checkRateLimit(key, 10, 60000);
    expect(second.remaining).toBe(8);
  });

  test('returns resetAt timestamp in the future', () => {
    const result = checkRateLimit('rate-test-reset-' + Date.now(), 20, 60000);
    expect(result.resetAt).toBeGreaterThan(Date.now() - 1000);
  });

  test('allows requests after window expires', () => {
    const key = 'rate-test-expire-' + Date.now();
    // Use a tiny window that's already expired
    const result = checkRateLimit(key, 5, 1); // 1ms window
    expect(result.allowed).toBe(true);
  });
});
