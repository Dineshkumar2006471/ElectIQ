/* ============================================
   ElectIQ — Gemini AI Client
   Using @google/genai SDK with Vertex AI ADC
   ============================================ */

import { GoogleGenAI } from '@google/genai';
import { ELECTIQ_SYSTEM_PROMPT } from './constants';

// Initialize with Vertex AI (Application Default Credentials)
// Falls back to API key if GOOGLE_API_KEY is set
const ai = new GoogleGenAI({
  ...(process.env.GOOGLE_API_KEY 
    ? { apiKey: process.env.GOOGLE_API_KEY } 
    : {
        vertexai: process.env.GOOGLE_CLOUD_PROJECT
          ? {
              project: process.env.GOOGLE_CLOUD_PROJECT,
              location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
            } as any
          : undefined
      })
});

const MODEL_ID = 'gemini-2.5-flash';

/**
 * Send a chat message to ElectIQ and get a response.
 * Maintains conversation context via the history array.
 */
export async function chatWithElectIQ(
  userMessage: string,
  history: { role: 'user' | 'model'; content: string }[] = [],
  language: string = 'en'
): Promise<string> {
  try {
    const languageSuffix =
      language !== 'en'
        ? `\n\nIMPORTANT: The user prefers responses in ${language}. Please respond in that language while keeping technical terms in English where appropriate.`
        : '';

    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: [
        ...history.map((msg) => ({
          role: msg.role as 'user' | 'model',
          parts: [{ text: msg.content }],
        })),
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
      ],
      config: {
        systemInstruction: ELECTIQ_SYSTEM_PROMPT + languageSuffix,
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 2048,
      },
    });

    return response.text || 'I apologize, but I was unable to generate a response. Please try again.';
  } catch (error) {
    console.error('[ElectIQ Gemini Error]:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to communicate with ElectIQ AI'
    );
  }
}

/**
 * Generate quiz questions using Gemini
 */
export async function generateQuizQuestions(topic: string = 'Indian Elections'): Promise<string> {
  try {
    const prompt = `Generate exactly 5 multiple-choice quiz questions about ${topic} and Indian civic knowledge. 

Return ONLY a valid JSON array in this exact format (no markdown, no code fences):
[
  {
    "id": 1,
    "question": "Your question here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation of the correct answer."
  }
]

Rules:
- Questions should be educational and factual
- Cover voter registration, EVM voting, election phases, the Constitution, and civic rights
- Mix difficulty: 2 easy, 2 medium, 1 hard
- Options should be plausible — no obviously wrong answers
- Explanations should teach something new`;

    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.8,
        maxOutputTokens: 2048,
      },
    });

    return response.text || '[]';
  } catch (error) {
    console.error('[ElectIQ Quiz Generation Error]:', error);
    throw new Error('Failed to generate quiz questions');
  }
}

/**
 * Generate candidate/party information using Gemini
 */
export async function generateCandidateInfo(query: string): Promise<string> {
  try {
    const prompt = `Generate a neutral, factual profile for the political candidate or party: "${query}". 

Return ONLY a valid JSON object in this exact format (no markdown, no code fences):
{
  "name": "Full Name of Candidate or Party",
  "type": "Candidate" | "Party",
  "history": "A 2-3 sentence background and history.",
  "keyPositions": [
    "Position 1",
    "Position 2",
    "Position 3"
  ],
  "pastPerformance": "A brief summary of past electoral performance or key achievements.",
  "manifestoKeywords": ["Keyword1", "Keyword2", "Keyword3"]
}

Rules:
- Strictly maintain political neutrality. Do not endorse or criticize.
- Focus on well-documented facts.
- Extract the most important themes into manifestoKeywords in plain language.
- Ensure the output is strictly valid JSON.`;

    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.2, // Lower temperature for more factual, consistent output
        maxOutputTokens: 2048,
      },
    });

    return response.text || '{}';
  } catch (error) {
    console.error('[ElectIQ Candidate Generation Error]:', error);
    throw new Error('Failed to generate candidate information');
  }
}

