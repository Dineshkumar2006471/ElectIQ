import { CandidateData } from './types';
import { User, Users, ClockCounterClockwise, Target, TrendUp, BookOpen, X } from '@phosphor-icons/react';

interface CandidateProfileProps { data: CandidateData; onRemove?: () => void; }

export function CandidateProfile({ data, onRemove }: CandidateProfileProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[var(--border-default)] relative h-full flex flex-col shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-md)] transition-shadow">
      {onRemove && (
        <button onClick={onRemove} className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--error)] hover:bg-[var(--error-light)] rounded-lg transition-colors" aria-label="Remove candidate">
          <X className="h-5 w-5" />
        </button>
      )}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--border-default)]">
        <div className="w-16 h-16 rounded-xl bg-[var(--accent-light)] flex items-center justify-center border border-[var(--accent)]/15 shrink-0">
          {data.type === 'Party' ? <Users className="h-8 w-8 text-[var(--accent)]" /> : <User className="h-8 w-8 text-[var(--accent)]" />}
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">{data.name}</h2>
          <span className="inline-block px-3 py-1 bg-[var(--bg-secondary)] text-[var(--accent)] text-xs font-semibold rounded-md mt-2 border border-[var(--border-default)]">{data.type}</span>
        </div>
      </div>
      <div className="space-y-6 flex-1">
        <section>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-2 uppercase tracking-wider">
            <ClockCounterClockwise className="h-4 w-4 text-[var(--info)]" /> History & Background
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{data.history}</p>
        </section>
        <section>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-3 uppercase tracking-wider">
            <Target className="h-4 w-4 text-[var(--error)]" /> Key Positions
          </h3>
          <ul className="space-y-2">
            {data.keyPositions.map((pos, idx) => (
              <li key={idx} className="text-[var(--text-secondary)] text-sm flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">•</span><span>{pos}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-2 uppercase tracking-wider">
            <TrendUp className="h-4 w-4 text-[var(--success)]" /> Past Performance
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{data.pastPerformance}</p>
        </section>
        <section className="mt-auto pt-6">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-3 uppercase tracking-wider">
            <BookOpen className="h-4 w-4 text-purple-500" /> Manifesto Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.manifestoKeywords.map((keyword, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] text-xs rounded-md font-medium">{keyword}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
