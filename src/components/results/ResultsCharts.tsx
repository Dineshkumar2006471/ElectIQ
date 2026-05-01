'use client';

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PartyResult } from '@/lib/types';

interface ResultsChartsProps { results: PartyResult[]; }

export function ResultsCharts({ results }: ResultsChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* Seat Distribution */}
      <div className="bg-white border border-[var(--border-default)] rounded-xl p-5">
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-4">Seat Distribution</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={results} dataKey="seats" nameKey="abbreviation" cx="50%" cy="50%" outerRadius={100} innerRadius={50} paddingAngle={3} strokeWidth={0}>
              {results.map((entry) => <Cell key={entry.id} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: 13, color: 'var(--text-primary)' }} />
            <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Vote Share */}
      <div className="bg-white border border-[var(--border-default)] rounded-xl p-5">
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-4">Vote Share (%)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={results} layout="vertical" margin={{ left: 5, right: 20 }}>
            <XAxis type="number" domain={[0, 40]} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={{ stroke: 'var(--border-default)' }} tickLine={false} />
            <YAxis type="category" dataKey="abbreviation" tick={{ fill: 'var(--text-primary)', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} width={50} />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: 13, color: 'var(--text-primary)' }} />
            <Bar dataKey="voteShare" radius={[0, 6, 6, 0]} barSize={18}>
              {results.map((entry) => <Cell key={entry.id} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
