'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { CandidateSearch } from '@/components/candidates/CandidateSearch';
import { CandidateComparison } from '@/components/candidates/CandidateComparison';
import { CandidateData } from '@/components/candidates/types';
import { Info } from '@phosphor-icons/react';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (candidates.length >= 3) { setError('You can compare up to 3 candidates or parties at a time.'); return; }
    setIsLoading(true); setError(null);
    try {
      const response = await fetch('/api/candidates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to search candidate');
      setCandidates(prev => [...prev, data.candidateInfo]);
    } catch (err) { setError(err instanceof Error ? err.message : 'An unexpected error occurred'); }
    finally { setIsLoading(false); }
  };

  const handleRemoveCandidate = (index: number) => {
    setCandidates(prev => prev.filter((_, i) => i !== index));
    if (error && candidates.length <= 3) setError(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <Navigation />

      {/* Visual storytelling banner */}
      <div className="relative w-full h-52 sm:h-64 mt-16">
        <Image src="/feature-voting.png" alt="Indian democratic election rally" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[var(--bg-secondary)]" />
        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Research & <span className="text-[var(--saffron-300)]">Compare</span>
          </h1>
          <p className="text-white/70 text-base md:text-lg mt-2 max-w-2xl">
            Get neutral, fact-based AI summaries. Compare up to 3 profiles side-by-side.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-12">
          <CandidateSearch onSearch={handleSearch} isLoading={isLoading} />
          {error && (
            <div className="mt-4 max-w-2xl mx-auto p-4 bg-[var(--error-light)] border border-[var(--error)]/30 rounded-lg flex items-start gap-3">
              <Info className="h-5 w-5 text-[var(--error)] shrink-0 mt-0.5" />
              <p className="text-sm text-[var(--error)]">{error}</p>
            </div>
          )}
        </div>
        {candidates.length > 0 ? (
          <CandidateComparison candidates={candidates} onRemove={handleRemoveCandidate} />
        ) : (
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <div className="bg-white border border-[var(--border-default)] p-12 rounded-xl">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Start your research</h3>
              <p className="text-[var(--text-muted)]">Search for a candidate or party above to see their AI-generated profile.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
