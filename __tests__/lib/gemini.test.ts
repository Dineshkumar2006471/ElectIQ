// Unit tests for the Gemini utility wrapper

jest.mock('@google/genai', () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: jest.fn().mockResolvedValue({
        text: 'Mocked Gemini response about elections.',
      }),
    },
  })),
}));

import { chatWithElectIQ, generateQuizQuestions, generateCandidateInfo } from '@/lib/gemini';

describe('chatWithElectIQ', () => {
  test('returns a non-empty string', async () => {
    const result = await chatWithElectIQ('How do I vote?');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('accepts conversation history without throwing', async () => {
    await expect(
      chatWithElectIQ(
        'Follow up question',
        [{ role: 'user', content: 'Previous message' }]
      )
    ).resolves.not.toThrow();
  });

  test('throws on API failure', async () => {
    const { GoogleGenAI } = require('@google/genai');
    GoogleGenAI.mockImplementationOnce(() => ({
      models: {
        generateContent: jest.fn().mockRejectedValue(new Error('API unavailable')),
      },
    }));

    // Re-import to pick up new mock — use dynamic require
    jest.resetModules();
    jest.mock('@google/genai', () => ({
      GoogleGenAI: jest.fn().mockImplementation(() => ({
        models: {
          generateContent: jest.fn().mockRejectedValue(new Error('API unavailable')),
        },
      })),
    }));
    const gemini = require('@/lib/gemini');

    await expect(
      gemini.chatWithElectIQ('message', [])
    ).rejects.toThrow();
  });
});

describe('generateQuizQuestions', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock('@google/genai', () => ({
      GoogleGenAI: jest.fn().mockImplementation(() => ({
        models: {
          generateContent: jest.fn().mockResolvedValue({
            text: JSON.stringify([{ id: 1, question: 'Test?', options: ['A', 'B', 'C', 'D'], correctIndex: 0, explanation: 'Test' }]),
          }),
        },
      })),
    }));
  });

  test('returns a string containing JSON', async () => {
    const gemini = require('@/lib/gemini');
    const result = await gemini.generateQuizQuestions('Indian Elections');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('generateCandidateInfo', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock('@google/genai', () => ({
      GoogleGenAI: jest.fn().mockImplementation(() => ({
        models: {
          generateContent: jest.fn().mockResolvedValue({
            text: JSON.stringify({ name: 'Test Party', type: 'Party' }),
          }),
        },
      })),
    }));
  });

  test('returns a string with candidate info', async () => {
    const gemini = require('@/lib/gemini');
    const result = await gemini.generateCandidateInfo('BJP');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
