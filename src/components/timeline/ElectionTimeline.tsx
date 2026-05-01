'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ELECTION_PHASES } from '@/lib/constants';
import { PhaseCard } from './PhaseCard';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

export function ElectionTimeline() {
  const [activePhase, setActivePhase] = useState(6);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 400;
      const targetScroll = containerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      containerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const cardWidth = 400 + 24;
      const targetScroll = (activePhase - 1) * cardWidth - window.innerWidth / 2 + cardWidth / 2;
      containerRef.current.scrollTo({ left: targetScroll, behavior: 'auto' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full relative py-4">
      {/* Controls */}
      <div className="flex items-center justify-end px-4 md:px-8 max-w-7xl mx-auto mb-6">
        <div className="hidden md:flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-3 rounded-lg bg-white border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            aria-label="Scroll left"
          >
            <CaretLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-3 rounded-lg bg-white border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            aria-label="Scroll right"
          >
            <CaretRight size={24} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[var(--bg-tertiary)] mb-8 sticky top-[64px] z-20">
        <motion.div 
          className="h-full bg-[var(--accent)] origin-left" 
          style={{ scaleX }}
        />
      </div>

      {/* Timeline Scroll Container */}
      <div 
        ref={containerRef}
        className="flex gap-6 overflow-x-auto px-4 md:px-8 pb-12 pt-4 snap-x snap-mandatory scrollbar-hide relative"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-[3800px] h-px bg-[var(--border-default)] -z-10 hidden md:block" />
        
        {ELECTION_PHASES.map((phase, index) => {
          const isCompleted = index + 1 < activePhase;
          const isActive = phase.id === activePhase;
          
          return (
            <div key={phase.id} className="snap-center md:snap-start shrink-0 pt-8 pb-4">
              <PhaseCard 
                phase={phase}
                index={index}
                isActive={isActive}
                isCompleted={isCompleted}
                onClick={() => setActivePhase(phase.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
