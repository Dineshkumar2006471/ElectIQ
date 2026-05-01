import { POST } from '@/app/api/chat/route';

// Mock the gemini module
jest.mock('@/lib/gemini', () => ({
  chatWithElectIQ: jest.fn().mockResolvedValue('ElectIQ test response about elections.'),
}));

// Mock the rate-limit module
jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn().mockReturnValue({ allowed: true, remaining: 19, resetAt: Date.now() + 60000 }),
}));

function makeRequest(body: object): Request {
  return new Request('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/chat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns 400 when message is empty string', async () => {
    const req = makeRequest({ message: '', history: [], language: 'en' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test('returns 400 when message field is missing', async () => {
    const req = makeRequest({ history: [], language: 'en' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test('returns 200 with valid message', async () => {
    const req = makeRequest({
      message: 'How do I register to vote?',
      history: [],
      language: 'en',
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty('response');
    expect(typeof data.response).toBe('string');
    expect(data.response.length).toBeGreaterThan(0);
  });

  test('handles conversation history correctly', async () => {
    const req = makeRequest({
      message: 'What documents do I need?',
      history: [
        { role: 'user', content: 'How do I vote?' },
        { role: 'assistant', content: 'You need to be registered first.' },
      ],
      language: 'en',
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  test('returns 429 when rate limited', async () => {
    const { checkRateLimit } = require('@/lib/rate-limit');
    checkRateLimit.mockReturnValueOnce({ allowed: false, remaining: 0, resetAt: Date.now() + 60000 });

    const req = makeRequest({
      message: 'Test message',
      history: [],
      language: 'en',
    });
    const res = await POST(req);
    expect(res.status).toBe(429);
  });

  test('returns 500 when AI service fails', async () => {
    const { chatWithElectIQ } = require('@/lib/gemini');
    chatWithElectIQ.mockRejectedValueOnce(new Error('API unavailable'));

    const req = makeRequest({
      message: 'Test message',
      history: [],
      language: 'en',
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
