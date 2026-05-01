import React from 'react';
import { motion } from 'framer-motion';
import * as PhosphorIcons from '@phosphor-icons/react';
import { ElectionPhase } from '@/lib/types';

interface PhaseCardProps {
  phase: ElectionPhase;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  index: number;
}

export function PhaseCard({ phase, isActive, isCompleted, onClick, index }: PhaseCardProps) {
  const IconComponent = (PhosphorIcons as any as Record<string, React.ElementType>)[phase.icon] || PhosphorIcons.Info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className={`relative w-full md:w-[400px] flex-shrink-0 cursor-pointer rounded-xl p-6 border transition-all duration-300 group ${
        isActive 
          ? 'bg-white border-[var(--accent)] shadow-[var(--shadow-lg)]' 
          : isCompleted
            ? 'bg-white border-[var(--border-default)] hover:border-[var(--accent)] hover:shadow-[var(--shadow-md)]'
            : 'bg-[var(--bg-secondary)] border-[var(--border-default)] opacity-70 hover:opacity-100 hover:border-[var(--border-hover)]'
      }`}
    >
      {/* Status Indicator Bar */}
      <div className={`absolute top-0 left-0 w-full h-1 rounded-t-xl ${
        isActive 
          ? 'bg-[var(--accent)]' 
          : isCompleted
            ? 'bg-[var(--info)]'
            : 'bg-[var(--border-default)]'
      }`} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 mt-2">
        <div className={`p-3 rounded-lg flex items-center justify-center ${
          isActive 
            ? 'bg-[var(--accent-light)] text-[var(--accent)]' 
            : isCompleted
              ? 'bg-[var(--info-light)] text-[var(--info)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
        }`}>
          <IconComponent size={28} weight={isActive ? "duotone" : "regular"} />
        </div>
        
        <div className="text-right">
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isActive ? 'text-[var(--accent)]' : isCompleted ? 'text-[var(--info)]' : 'text-[var(--text-muted)]'
          }`}>
            Phase {phase.id}
          </span>
          <p className="text-sm text-[var(--text-muted)] mt-1">{phase.date}</p>
        </div>
      </div>

      {/* Content */}
      <h3 className={`text-xl font-bold mb-3 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}>
        {phase.title}
      </h3>
      
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
        {phase.description}
      </p>

      {/* Action Area */}
      <div className={`pt-4 border-t ${isActive ? 'border-[var(--accent)]/20' : 'border-[var(--border-default)]'}`}>
        <div className="flex items-start gap-2">
          <PhosphorIcons.CheckCircle 
            size={20} 
            className={`flex-shrink-0 mt-0.5 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} 
            weight={isCompleted ? "fill" : "regular"}
          />
          <span className="text-sm text-[var(--text-secondary)]">
            <strong className={isActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}>Your Action: </strong>
            {phase.citizenAction}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
