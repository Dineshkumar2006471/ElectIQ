import { NextResponse } from 'next/server';
import { chatWithElectIQ } from '@/lib/gemini';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    // Basic IP-based rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const rateLimit = checkRateLimit(`chat_${ip}`, 20, 60_000); // 20 requests per minute

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) } }
      );
    }

    const body = await req.json();
    const { message, history, language } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Input validation: max 1000 chars, strip HTML
    let sanitizedMessage = message.trim().slice(0, 1000);
    sanitizedMessage = sanitizedMessage.replace(/<[^>]*>?/gm, ''); // Basic HTML stripping

    if (sanitizedMessage.length === 0) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    // Call Gemini
    const response = await chatWithElectIQ(sanitizedMessage, history, language || 'en');

    return NextResponse.json({ response });
  } catch (error) {
    console.error('[Chat API Error]:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while communicating with ElectIQ.' },
      { status: 500 }
    );
  }
}
