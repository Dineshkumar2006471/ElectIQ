// Tests for input sanitization and rate limiting logic

import { sanitizeInput, checkRateLimit } from '@/lib/security';

describe('sanitizeInput', () => {
  test('strips HTML tags from input', () => {
    const result = sanitizeInput('<script>alert("xss")</script>Hello');
    expect(result).not.toContain('<script>');
    expect(result).toContain('Hello');
  });

  test('trims whitespace', () => {
    const result = sanitizeInput('  hello world  ');
    expect(result).toBe('hello world');
  });

  test('rejects input longer than 1000 characters', () => {
    expect(() => sanitizeInput('a'.repeat(1001))).toThrow();
  });

  test('allows normal election-related input', () => {
    const input = 'How do I register as a voter in Delhi?';
    expect(sanitizeInput(input)).toBe(input);
  });

  test('throws on empty string', () => {
    expect(() => sanitizeInput('')).toThrow('Invalid input');
  });

  test('throws on null input', () => {
    expect(() => sanitizeInput(null as any)).toThrow('Invalid input');
  });
});

describe('checkRateLimit', () => {
  test('allows requests under the limit', () => {
    const result = checkRateLimit('test-ip-1', 20);
    expect(result.allowed).toBe(true);
  });

  test('blocks requests over the limit', () => {
    const result = checkRateLimit('test-ip-2', 0);
    expect(result.allowed).toBe(false);
  });

  test('returns remaining count', () => {
    const result = checkRateLimit('test-ip-3', 10);
    expect(result.remaining).toBe(9);
  });
});
