import { NextResponse } from 'next/server';
import { generateCandidateInfo } from '@/lib/gemini';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    // Rate limit candidate generation
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const rateLimit = checkRateLimit(`candidate_${ip}`, 10, 60_000); // 10 requests per minute

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute.' },
        { status: 429 }
      );
    }

    const { query } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Valid search query is required.' },
        { status: 400 }
      );
    }

    // Call Gemini to generate candidate info
    const rawContent = await generateCandidateInfo(query);

    // Parse the JSON object from Gemini's response
    let jsonStr = rawContent;
    if (jsonStr.includes('```json')) {
      jsonStr = jsonStr.split('```json')[1].split('```')[0].trim();
    } else if (jsonStr.includes('```')) {
      jsonStr = jsonStr.split('```')[1].split('```')[0].trim();
    }

    const candidateInfo = JSON.parse(jsonStr);

    return NextResponse.json({ candidateInfo });
  } catch (error) {
    console.error('[Candidate API Error]:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve candidate information. Please try again.' },
      { status: 500 }
    );
  }
}
