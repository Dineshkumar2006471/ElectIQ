'use client';

import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { QuizInterface } from '@/components/quiz/QuizInterface';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <Navigation />

      {/* Visual storytelling banner */}
      <div className="relative w-full h-48 sm:h-56 mt-16">
        <Image src="/election-process.png" alt="Students learning about the Indian Constitution" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[var(--bg-secondary)]" />
        <div className="absolute bottom-6 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Civic <span className="text-[var(--saffron-300)]">Knowledge Quiz</span>
          </h1>
          <p className="text-white/70 text-base md:text-lg mt-2">
            Test your understanding of the Indian electoral process with AI-generated questions.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <QuizInterface />
      </main>
      <Footer />
    </div>
  );
}
