'use client';

import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ElectionTimeline } from '@/components/timeline/ElectionTimeline';

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <Navigation />

      {/* Visual storytelling banner */}
      <div className="relative w-full h-52 sm:h-64 mt-16">
        <Image src="/feature-timeline.png" alt="Election Commission announcement" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[var(--bg-secondary)]" />
        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Election <span className="text-[var(--saffron-300)]">Timeline</span>
          </h1>
          <p className="text-white/70 text-base md:text-lg mt-2 max-w-2xl">
            Follow the complete journey from announcement to government formation.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ElectionTimeline />
      </main>
      <Footer />
    </div>
  );
}
