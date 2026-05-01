/* ============================================
   ElectIQ — Security Utilities
   Input sanitization and rate-limiting helpers
   ============================================ */

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/**
 * Sanitize user input by trimming, enforcing length,
 * and stripping HTML tags to prevent XSS.
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input');
  }
  const trimmed = input.trim();
  if (trimmed.length > 1000) {
    throw new Error('Input exceeds maximum length of 1000 characters');
  }
  // Strip HTML tags
  const stripped = trimmed.replace(/<[^>]*>/g, '');
  return stripped;
}

/**
 * Simple in-memory rate limiter for security tests.
 * Returns whether the request is allowed and how many remain.
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 20
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute

  const current = rateLimitStore.get(ip);

  if (!current || now > current.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: maxRequests > 0, remaining: maxRequests - 1 };
  }

  if (current.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  return { allowed: true, remaining: maxRequests - current.count };
}
