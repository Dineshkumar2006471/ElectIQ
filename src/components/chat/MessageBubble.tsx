import React from 'react';
import { motion } from 'framer-motion';
import { Robot, User } from '@phosphor-icons/react';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user';

  const formattedContent = content.split('\n').map((line, i) => {
    if (line.includes('**')) {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="mb-2 last:mb-0">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="text-[var(--accent)] font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    }
    return <p key={i} className="mb-2 last:mb-0">{line}</p>;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
          isUser ? 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]' : 'bg-[var(--accent)] text-white'
        }`}>
          {isUser ? <User size={20} weight="bold" /> : <Robot size={24} weight="bold" />}
        </div>
        <div className={`p-4 rounded-xl ${
          isUser
            ? 'rounded-tr-none bg-[var(--bg-tertiary)] border border-[var(--border-default)] text-[var(--text-primary)]'
            : 'rounded-tl-none bg-white border border-[var(--border-default)] text-[var(--text-primary)]'
        }`}>
          <div className="text-[15px] leading-relaxed">
            {formattedContent}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
