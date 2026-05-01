import React from 'react';
import { PollBooth } from '@/lib/types';
import { MapPin, Wheelchair, Clock, Users, ArrowSquareOut } from '@phosphor-icons/react';

interface BoothCardProps {
  booth: PollBooth;
  isActive: boolean;
  onClick: () => void;
}

export function BoothCard({ booth, isActive, onClick }: BoothCardProps) {
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${booth.lat},${booth.lng}`;
  };

  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
        isActive 
          ? 'bg-white border-[var(--accent)] shadow-[var(--shadow-md)]' 
          : 'bg-[var(--bg-secondary)] border-[var(--border-default)] hover:border-[var(--border-hover)] hover:bg-white'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className={`font-bold pr-4 text-sm ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
          {booth.name}
        </h3>
        {booth.isAccessible && (
          <div className="text-[var(--info)] flex-shrink-0" title="Wheelchair Accessible">
            <Wheelchair size={18} weight="fill" />
          </div>
        )}
      </div>

      <div className="flex items-start gap-2 text-[var(--text-muted)] text-xs mb-3">
        <MapPin size={14} className="mt-0.5 flex-shrink-0" />
        <p className="line-clamp-2">{booth.address}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] rounded-md p-1.5 border border-[var(--border-default)]">
          <Clock size={14} className="text-[var(--warning)]" />
          <span>{booth.hours || '7 AM - 6 PM'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] rounded-md p-1.5 border border-[var(--border-default)]">
          <Users size={14} className={booth.waitTime?.includes('30') ? 'text-[var(--error)]' : 'text-[var(--success)]'} />
          <span>Wait: {booth.waitTime || '~15m'}</span>
        </div>
      </div>

      <a 
        href={getDirectionsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
          isActive 
            ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]' 
            : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--accent)] hover:text-white'
        }`}
      >
        Get Directions
        <ArrowSquareOut size={16} />
      </a>
    </div>
  );
}
