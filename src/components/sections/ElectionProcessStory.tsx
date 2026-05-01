'use client';

import { motion } from 'framer-motion';
import { ELECTION_PHASES } from '@/lib/constants';
import {
  Megaphone, FileText, MagnifyingGlass, UserMinus,
  Flag, CheckSquare, ChartBar, Trophy, Buildings, MapPin
} from '@phosphor-icons/react';

const ICONS: Record<string, React.ReactNode> = {
  Megaphone: <Megaphone size={28} weight="duotone" />,
  FileText: <FileText size={28} weight="duotone" />,
  MagnifyingGlass: <MagnifyingGlass size={28} weight="duotone" />,
  UserMinus: <UserMinus size={28} weight="duotone" />,
  Flag: <Flag size={28} weight="duotone" />,
  CheckSquare: <CheckSquare size={28} weight="duotone" />,
  ChartBar: <ChartBar size={28} weight="duotone" />,
  Trophy: <Trophy size={28} weight="duotone" />,
  Buildings: <Buildings size={28} weight="duotone" />,
};

const STATUS_MAP: Record<string, { dot: string; label: string; color: string; border: string }> = {
  completed: { dot: 'bg-[var(--success)]', label: 'Completed', color: 'text-[var(--success)]', border: 'border-[var(--success)]' },
  active: { dot: 'bg-[var(--accent)]', label: 'In Progress', color: 'text-[var(--accent)]', border: 'border-[var(--accent)]' },
  upcoming: { dot: 'bg-[var(--text-muted)]', label: 'Upcoming', color: 'text-[var(--text-muted)]', border: 'border-[var(--text-muted)]' },
};

export default function ElectionProcessStory() {
  // Chunk phases into rows of 3 for the desktop snake layout
  const rows = [];
  for (let i = 0; i < ELECTION_PHASES.length; i += 3) {
    rows.push(ELECTION_PHASES.slice(i, i + 3));
  }

  return (
    <section className="section-alt relative overflow-hidden" id="election-process">
      {/* Decorative dashed lines in background for map vibe */}
      <div className="absolute top-10 left-10 w-32 h-32 border-t-4 border-l-4 border-dashed border-[var(--border-default)] rounded-tl-[100px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border-b-4 border-r-4 border-dashed border-[var(--border-default)] rounded-br-[150px] opacity-30 pointer-events-none" />
      
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-default)] bg-white mb-6 shadow-sm">
            <MapPin size={20} weight="fill" className="text-[var(--accent)]" />
            <span className="text-sm font-bold tracking-widest uppercase text-[var(--text-primary)]">
              The Civic Treasure Map
            </span>
          </div>
          <h2 className="section-title mb-4">
            9 Steps from <span className="accent-text">Announcement to Government</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Follow the path to government formation. Every phase is a milestone in the world&apos;s largest democratic exercise.
          </p>
        </motion.div>

        {/* --- DESKTOP SNAKE LAYOUT --- */}
        <div className="hidden lg:flex flex-col relative w-full pb-10">
          {rows.map((row, rowIndex) => {
            const isReverseRow = rowIndex % 2 === 1;
            
            return (
              <div key={rowIndex} className={`flex w-full ${isReverseRow ? 'flex-row-reverse' : 'flex-row'}`}>
                {row.map((phase, colIndex) => {
                  const s = STATUS_MAP[phase.status];
                  const isLastInRow = colIndex === row.length - 1;
                  const isVeryLast = rowIndex === rows.length - 1 && isLastInRow;
                  
                  return (
                    <div key={phase.id} className="w-1/3 px-6 py-6 relative flex flex-col group">
                      
                      {/* Node Point */}
                      <div className="absolute top-10 left-1/2 w-8 h-8 -ml-4 rounded-full bg-white border-4 border-[var(--border-default)] z-20 flex items-center justify-center transition-colors duration-300 group-hover:border-[var(--accent)] shadow-md">
                        <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                      </div>
                      
                      {/* Horizontal connecting dashed line */}
                      {!isVeryLast && !isLastInRow && (
                        <div className={`absolute top-[54px] w-full border-t-4 border-dashed border-[var(--border-default)] z-10 ${isReverseRow ? 'right-1/2' : 'left-1/2'} transition-colors duration-500 group-hover:border-[var(--accent)]`} />
                      )}
                      
                      {/* Vertical connecting dashed line to next row */}
                      {!isVeryLast && isLastInRow && (
                        <div className="absolute top-[54px] left-1/2 h-full border-l-4 border-dashed border-[var(--border-default)] z-10 -ml-[2px] transition-colors duration-500 group-hover:border-[var(--accent)]" />
                      )}

                      {/* Content Card */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: colIndex * 0.1 }}
                        className="mt-14 card flex-1 flex flex-col relative bg-white hover:-translate-y-2 transition-transform duration-300 z-30"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-default)] ${s.color}`}>
                            {ICONS[phase.icon]}
                          </div>
                          <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] ${s.color}`}>
                            Phase {phase.id}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-extrabold text-[var(--text-primary)] mb-2">{phase.title}</h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">{phase.description}</p>
                        
                        <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-default)] mt-auto">
                          <p className="text-sm font-bold text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
                            <span className="text-[var(--accent)]">🎯</span> Action:
                          </p>
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{phase.citizenAction}</p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* --- MOBILE / TABLET VERTICAL TIMELINE --- */}
        <div className="flex lg:hidden flex-col relative pl-6 pb-10">
          {/* Vertical dashed line */}
          <div className="absolute top-12 bottom-0 left-[24px] w-[4px] border-l-4 border-dashed border-[var(--border-default)] z-10" />
          
          {ELECTION_PHASES.map((phase, i) => {
            const s = STATUS_MAP[phase.status];
            const isLast = i === ELECTION_PHASES.length - 1;
            
            return (
              <motion.div 
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative py-6 pl-10"
              >
                {/* Node Point */}
                <div className="absolute top-12 -left-[18px] w-8 h-8 rounded-full bg-white border-4 border-[var(--border-default)] z-20 flex items-center justify-center shadow-md">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                </div>
                
                <div className="card bg-white hover:-translate-y-1 transition-transform duration-300 relative z-30">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-default)] ${s.color}`}>
                      {ICONS[phase.icon]}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] ${s.color}`}>
                      Phase {phase.id}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-extrabold text-[var(--text-primary)] mb-2">{phase.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{phase.description}</p>
                  
                  <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-default)]">
                    <p className="text-sm font-bold text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
                      <span className="text-[var(--accent)]">🎯</span> Action:
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{phase.citizenAction}</p>
                  </div>
                </div>
                
                {/* Hide the vertical line after the last item */}
                {isLast && (
                  <div className="absolute top-[80px] bottom-0 left-[24px] w-[8px] bg-[var(--bg-secondary)] z-15" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
