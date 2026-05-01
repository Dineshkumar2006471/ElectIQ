'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChatCircle } from '@phosphor-icons/react';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[var(--bg-dark)]">
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
            Ready to become an <span className="text-[var(--saffron-400)]">informed voter?</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-muted)] mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Join millions of citizens making educated decisions. Ask ElectIQ anything about the election process, in your preferred language.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/chat" className="flex items-center justify-center gap-2 text-lg py-4 px-8 w-full sm:w-auto bg-[var(--accent)] text-white font-semibold rounded-[var(--radius-md)] hover:bg-[var(--accent-hover)] transition-all shadow-[var(--shadow-md)]">
              <ChatCircle size={24} weight="fill" />
              Ask ElectIQ Now
            </Link>
            <Link href="/quiz" className="flex items-center justify-center gap-2 text-lg py-4 px-8 w-full sm:w-auto bg-transparent text-white font-semibold rounded-[var(--radius-md)] border border-white/20 hover:bg-white/10 transition-all">
              Take the Civic Quiz
              <ArrowRight size={20} weight="bold" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
