import { ReactNode } from 'react';

interface KPICardProps { icon: ReactNode; label: string; value: string; color: string; }

export function KPICard({ icon, label, value, color }: KPICardProps) {
  return (
    <div className="bg-white border border-[var(--border-default)] rounded-xl p-5 flex flex-col items-start gap-3 hover:shadow-[var(--shadow-md)] transition-shadow">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, color }}>
        {icon}
      </div>
      <div>
        <p className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">{value}</p>
        <p className="text-sm text-[var(--text-muted)] font-medium">{label}</p>
      </div>
    </div>
  );
}
