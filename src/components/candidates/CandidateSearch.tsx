import { useState } from 'react';
import { MagnifyingGlass, Spinner } from '@phosphor-icons/react';

interface CandidateSearchProps { onSearch: (query: string) => Promise<void>; isLoading: boolean; }

export function CandidateSearch({ onSearch, isLoading }: CandidateSearchProps) {
  const [query, setQuery] = useState('');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (query.trim()) { onSearch(query.trim()); setQuery(''); } };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MagnifyingGlass className="h-5 w-5 text-[var(--text-muted)]" />
        </div>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a candidate or political party..."
          className="w-full pl-12 pr-12 py-4 bg-white border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all shadow-[var(--shadow-sm)]"
          disabled={isLoading} />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button type="submit" disabled={!query.trim() || isLoading}
            className="p-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {isLoading ? <Spinner className="h-5 w-5 animate-spin" /> : <span className="font-semibold text-sm px-2">Search</span>}
          </button>
        </div>
      </div>
      <p className="text-[var(--text-muted)] text-xs text-center mt-3">Powered by Gemini. Generates neutral AI summaries based on public data.</p>
    </form>
  );
}
