import { POST } from '@/app/api/candidates/route';

// Mock the gemini module
jest.mock('@/lib/gemini', () => ({
  generateCandidateInfo: jest.fn().mockResolvedValue(
    JSON.stringify({
      name: 'Test Party',
      type: 'Party',
      history: 'A well-known political party.',
      keyPositions: ['Education', 'Healthcare', 'Infrastructure'],
      pastPerformance: 'Won several state elections.',
      manifestoKeywords: ['Development', 'Unity', 'Progress'],
    })
  ),
}));

// Mock the rate-limit module
jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn().mockReturnValue({ allowed: true, remaining: 9, resetAt: Date.now() + 60000 }),
}));

function makeRequest(body: object): Request {
  return new Request('http://localhost:3000/api/candidates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/candidates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns 200 with valid query', async () => {
    const req = makeRequest({ query: 'BJP' });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty('candidateInfo');
    expect(data.candidateInfo).toHaveProperty('name');
  });

  test('returns 400 when query is missing', async () => {
    const req = makeRequest({});
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test('returns 400 when query is empty string', async () => {
    const req = makeRequest({ query: '' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test('returns 429 when rate limited', async () => {
    const { checkRateLimit } = require('@/lib/rate-limit');
    checkRateLimit.mockReturnValueOnce({ allowed: false, remaining: 0, resetAt: Date.now() + 60000 });

    const req = makeRequest({ query: 'test' });
    const res = await POST(req);
    expect(res.status).toBe(429);
  });

  test('returns 500 when generation fails', async () => {
    const { generateCandidateInfo } = require('@/lib/gemini');
    generateCandidateInfo.mockRejectedValueOnce(new Error('Generation failed'));

    const req = makeRequest({ query: 'test' });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
