/* ============================================
   ElectIQ — Rate Limiting (In-Memory)
   ============================================ */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Simple in-memory rate limiter.
 * Returns true if the request is allowed, false if rate limited.
 */
export function checkRateLimit(
  key: string,
  maxRequests: number = 20,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  // Clean up expired entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [k, v] of rateLimitMap) {
      if (v.resetAt < now) rateLimitMap.delete(k);
    }
  }

  if (!entry || entry.resetAt < now) {
    // New window
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
}
