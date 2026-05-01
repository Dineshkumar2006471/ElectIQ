import { NextResponse } from 'next/server';
import { generateQuizQuestions } from '@/lib/gemini';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    // Rate limit quiz generation (more strict as it's a heavier generation)
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const rateLimit = checkRateLimit(`quiz_${ip}`, 5, 60_000); // 5 requests per minute

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute.' },
        { status: 429 }
      );
    }

    const { topic } = await req.json();

    // Call Gemini to generate the quiz
    const rawContent = await generateQuizQuestions(topic || 'Indian General Elections and Civic Duties');

    // Parse the JSON array from Gemini's response
    // Sometimes Gemini wraps JSON in markdown fences, so we strip them
    let jsonStr = rawContent;
    if (jsonStr.includes('```json')) {
      jsonStr = jsonStr.split('```json')[1].split('```')[0].trim();
    } else if (jsonStr.includes('```')) {
      jsonStr = jsonStr.split('```')[1].split('```')[0].trim();
    }

    const questions = JSON.parse(jsonStr);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('[Quiz API Error]:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz questions. Please try again.' },
      { status: 500 }
    );
  }
}
