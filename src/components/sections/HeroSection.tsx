'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkle } from '@phosphor-icons/react';

export default function HeroSection() {
  return (
    <section className="relative pt-20 overflow-hidden">
      {/* ── Top Bar: Eyebrow ── */}
      <div className="container-narrow pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)] mb-5"
        >
          <Sparkle size={14} weight="fill" className="text-[var(--accent)]" />
          <span className="text-xs font-semibold text-[var(--accent)] tracking-wide uppercase">
            Powered by Google Gemini AI
          </span>
        </motion.div>

        {/* ── Single-line headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[4vw] sm:text-[3.5vw] md:text-4xl lg:text-[3.5rem] font-extrabold leading-tight tracking-tight text-[var(--text-primary)] whitespace-nowrap"
        >
          Understand Every Vote. <span className="text-[var(--accent)]">Exercise Every Right.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mt-4 leading-relaxed"
        >
          Your AI-powered civic companion — ask questions, track every phase, find your booth, and become an informed voter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 mt-7"
        >
          <Link href="/chat" className="btn-primary flex items-center gap-2 text-base py-3 px-7">
            Ask ElectIQ Now <ArrowRight size={18} weight="bold" />
          </Link>
          <Link href="#features" className="btn-outline flex items-center gap-2 text-base py-3 px-7">
            Explore Features
          </Link>
        </motion.div>
      </div>

      {/* ── Full-width hero image banner — 300px ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative w-full mt-4"
        style={{ height: '300px' }}
      >
        <Image
          src="/hero-banner.png"
          alt="Indian Parliament building at golden hour — the heart of democracy"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Subtle bottom fade for seamless transition */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
      </motion.div>

      {/* ── Horizontal scrolling highlights ── */}
      <div className="bg-[var(--bg-secondary)] py-8">
        <div className="container-narrow mb-4">
          <span className="eyebrow">Quick Highlights</span>
        </div>
        <div className="flex gap-5 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              className="snap-start shrink-0"
            >
              <Link href={item.href} className="block group">
                <div className="w-72 sm:w-80 rounded-xl overflow-hidden border border-[var(--border-default)] bg-white hover:shadow-[var(--shadow-lg)] hover:border-[var(--border-hover)] transition-all duration-300">
                  {/* Card image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="320px"
                    />
                    {/* Overlay text on image */}
                    <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                      <span className="text-white font-bold text-lg drop-shadow-md">{item.label}</span>
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="p-4">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                    <span className="text-xs font-semibold text-[var(--accent)] mt-2 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight size={12} weight="bold" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Highlight card data ── */
const HIGHLIGHTS = [
  {
    label: 'AI Chat Guide',
    desc: 'Ask any election question in your language. Get instant, unbiased answers.',
    image: '/feature-chat.png',
    href: '/chat',
  },
  {
    label: 'Election Timeline',
    desc: 'Follow all 9 phases from announcement to government formation.',
    image: '/feature-timeline.png',
    href: '/timeline',
  },
  {
    label: 'Find Your Booth',
    desc: 'Locate your polling station with real-time wait times and accessibility.',
    image: '/feature-map.png',
    href: '/locator',
  },
  {
    label: 'Live Results',
    desc: 'Track seat tallies, vote shares, and trends with interactive charts.',
    image: '/feature-results.png',
    href: '/results',
  },
  {
    label: 'Research Candidates',
    desc: 'Compare promises, track records, and manifesto keywords side-by-side.',
    image: '/feature-voting.png',
    href: '/candidates',
  },
  {
    label: 'Civic Quiz',
    desc: 'Test your knowledge of the Constitution, voting rights, and civic duties.',
    image: '/election-process.png',
    href: '/quiz',
  },
];
