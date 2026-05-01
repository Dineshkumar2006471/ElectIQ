'use client';

import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { KPICard } from '@/components/results/KPICard';
import { ResultsCharts } from '@/components/results/ResultsCharts';
import { ResultsTable } from '@/components/results/ResultsTable';
import { DEMO_RESULTS } from '@/lib/constants';
import { TrendUp, UsersThree, CheckCircle, Clock } from '@phosphor-icons/react';

export default function ResultsPage() {
  const totalSeats = DEMO_RESULTS.reduce((sum, p) => sum + p.seats, 0);

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <Navigation />

      {/* Visual storytelling banner */}
      <div className="relative w-full h-52 sm:h-64 mt-16">
        <Image src="/feature-results.png" alt="Election results counting center" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[var(--bg-secondary)]" />
        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Election <span className="text-[var(--saffron-300)]">Results Dashboard</span>
          </h1>
          <p className="text-white/70 text-base md:text-lg mt-2 max-w-2xl">
            Live seat tallies, vote share breakdowns, and interactive data visualizations.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <KPICard icon={<UsersThree size={24} />} label="Total Seats" value={totalSeats.toLocaleString()} color="var(--info)" />
          <KPICard icon={<TrendUp size={24} />} label="Majority Mark" value="272" color="var(--accent)" />
          <KPICard icon={<CheckCircle size={24} />} label="Declared" value={`${totalSeats - 31}`} color="var(--success)" />
          <KPICard icon={<Clock size={24} />} label="Counting" value="31" color="var(--warning)" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
          <div className="xl:col-span-2"><ResultsCharts results={DEMO_RESULTS} /></div>
          <div className="xl:col-span-1"><ResultsTable results={DEMO_RESULTS} totalSeats={totalSeats} /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
