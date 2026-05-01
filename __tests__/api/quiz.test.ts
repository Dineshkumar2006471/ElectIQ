import { POST } from '@/app/api/quiz/route';

// Mock the gemini module
jest.mock('@/lib/gemini', () => ({
  generateQuizQuestions: jest.fn().mockResolvedValue(
    JSON.stringify([
      {
        id: 1,
        question: 'What is the minimum voting age in India?',
        options: ['16', '18', '21', '25'],
        correctIndex: 1,
        explanation: 'The 61st Amendment of 1988 lowered the voting age to 18.',
      },
      {
        id: 2,
        question: 'Which body conducts general elections in India?',
        options: ['Parliament', 'Supreme Court', 'Election Commission', 'Cabinet'],
        correctIndex: 2,
        explanation: 'The Election Commission of India is a constitutional body.',
      },
    ])
  ),
}));

// Mock the rate-limit module
jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn().mockReturnValue({ allowed: true, remaining: 4, resetAt: Date.now() + 60000 }),
}));

function makeRequest(body: object = {}): Request {
  return new Request('http://localhost:3000/api/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/quiz', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns 200 with questions', async () => {
    const req = makeRequest({ topic: 'Indian Elections' });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty('questions');
    expect(Array.isArray(data.questions)).toBe(true);
  });

  test('each question has required fields', async () => {
    const req = makeRequest({ topic: 'Indian Elections' });
    const res = await POST(req);
    const data = await res.json();
    data.questions.forEach((q: any) => {
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('options');
      expect(q).toHaveProperty('correctIndex');
      expect(q).toHaveProperty('explanation');
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBe(4);
    });
  });

  test('correctIndex is a valid index within options array', async () => {
    const req = makeRequest({ topic: 'Indian Elections' });
    const res = await POST(req);
    const data = await res.json();
    data.questions.forEach((q: any) => {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
    });
  });

  test('returns 429 when rate limited', async () => {
    const { checkRateLimit } = require('@/lib/rate-limit');
    checkRateLimit.mockReturnValueOnce({ allowed: false, remaining: 0, resetAt: Date.now() + 60000 });

    const req = makeRequest({ topic: 'test' });
    const res = await POST(req);
    expect(res.status).toBe(429);
  });

  test('returns 500 when generation fails', async () => {
    const { generateQuizQuestions } = require('@/lib/gemini');
    generateQuizQuestions.mockRejectedValueOnce(new Error('Generation failed'));

    const req = makeRequest({ topic: 'test' });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
