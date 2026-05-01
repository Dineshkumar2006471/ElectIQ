import { CandidateData } from './types';
import { CandidateProfile } from './CandidateProfile';

interface CandidateComparisonProps { candidates: CandidateData[]; onRemove: (index: number) => void; }

export function CandidateComparison({ candidates, onRemove }: CandidateComparisonProps) {
  if (candidates.length === 0) return null;
  return (
    <div className="w-full max-w-7xl mx-auto mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
          {candidates.length > 1 ? 'Comparison Dashboard' : 'Research Profile'}
        </h2>
        {candidates.length > 1 && (
          <span className="px-4 py-1.5 bg-[var(--accent-light)] border border-[var(--accent)]/15 text-[var(--accent)] rounded-lg text-sm font-semibold">
            Comparing {candidates.length} Profiles
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates.map((candidate, index) => (
          <div key={`${candidate.name}-${index}`} className="h-full">
            <CandidateProfile data={candidate} onRemove={() => onRemove(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}
