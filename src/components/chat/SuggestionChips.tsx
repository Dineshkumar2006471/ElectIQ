import React from 'react';
import { motion } from 'framer-motion';
import { IdentificationCard, Info, MapPin, CalendarCheck, Scales, Users } from '@phosphor-icons/react';

interface SuggestionChipsProps {
  onSelect: (query: string) => void;
}

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  const suggestions = [
    { id: 'reg', label: 'How do I register to vote?', icon: <IdentificationCard size={20} /> },
    { id: 'booth', label: 'Where is my polling booth?', icon: <MapPin size={20} /> },
    { id: 'docs', label: 'What ID proofs are accepted?', icon: <Info size={20} /> },
    { id: 'candidates', label: 'How to find candidate info?', icon: <Users size={20} /> },
    { id: 'dates', label: 'When are the next elections?', icon: <CalendarCheck size={20} /> },
    { id: 'rights', label: 'What are my rights as a voter?', icon: <Scales size={20} /> },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl mx-auto">
      {suggestions.map((item) => (
        <button key={item.id} onClick={() => onSelect(item.label)}
          className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border-default)] bg-white text-[var(--text-secondary)] text-left transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[var(--shadow-sm)]">
          <div className="flex-shrink-0 opacity-70">{item.icon}</div>
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}
    </motion.div>
  );
}
