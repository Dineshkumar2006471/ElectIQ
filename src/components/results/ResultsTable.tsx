import { PartyResult } from '@/lib/types';

interface ResultsTableProps { results: PartyResult[]; totalSeats: number; }

export function ResultsTable({ results, totalSeats }: ResultsTableProps) {
  return (
    <div className="bg-white border border-[var(--border-default)] rounded-xl overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-[var(--border-default)]">
        <h3 className="text-base font-bold text-[var(--text-primary)]">Party-wise Results</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--bg-secondary)]">
              <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Party</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Won</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Vote %</th>
            </tr>
          </thead>
          <tbody>
            {results.map((party) => (
              <tr key={party.id} className="border-t border-[var(--border-default)] hover:bg-[var(--bg-secondary)] transition-colors">
                <td className="px-5 py-3.5 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: party.color }} />
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">{party.abbreviation}</span>
                    <p className="text-xs text-[var(--text-muted)] truncate max-w-[140px]">{party.name}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-right font-bold text-[var(--text-primary)]">{party.seats}</td>
                <td className="px-5 py-3.5 text-right">
                  <span className="text-[var(--text-secondary)]">{party.voteShare}%</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-[var(--border-strong)] bg-[var(--bg-secondary)]">
              <td className="px-5 py-3 font-bold text-[var(--text-primary)]">Total</td>
              <td className="px-5 py-3 text-right font-bold text-[var(--text-primary)]">{totalSeats}</td>
              <td className="px-5 py-3 text-right font-bold text-[var(--text-primary)]">100%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
