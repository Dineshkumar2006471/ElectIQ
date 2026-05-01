'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

/*
 * "Boxes within boxes" layout:
 * - Outer box = white card with border
 * - Inner box = full-bleed background image with text overlay
 * - Text box = nested solid panel overlaid on the image
 */

const FEATURES = [
  {
    title: 'AI Chat Guide',
    description: 'Ask any election question in your language. Get instant, accurate, unbiased answers powered by Gemini AI. Supports 10 Indian languages.',
    image: '/feature-chat.png',
    href: '/chat',
    span: 'lg:col-span-2', // wide card
  },
  {
    title: 'Election Timeline',
    description: 'Follow all 9 phases from announcement to government formation with interactive milestones and citizen action steps.',
    image: '/feature-timeline.png',
    href: '/timeline',
    span: 'lg:col-span-1',
  },
  {
    title: 'Find Your Booth',
    description: 'Locate your nearest polling station on an interactive map with real-time wait times and accessibility info.',
    image: '/feature-map.png',
    href: '/locator',
    span: 'lg:col-span-1',
  },
  {
    title: 'Results Dashboard',
    description: 'Track live election results with interactive charts, seat tallies, and trend analysis across all constituencies.',
    image: '/feature-results.png',
    href: '/results',
    span: 'lg:col-span-2', // wide card
  },
  {
    title: 'Candidate Research',
    description: 'Compare candidates — their promises, track record, criminal cases, and asset declarations side-by-side.',
    image: '/feature-voting.png',
    href: '/candidates',
    span: 'lg:col-span-2',
  },
  {
    title: 'Civic Quiz',
    description: 'Test your election knowledge with AI-generated quizzes. Learn the Constitution, voting rights, and civic duties.',
    image: '/election-process.png',
    href: '/quiz',
    span: 'lg:col-span-1',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function FeaturesGrid() {
  return (
    <section className="section" id="features">
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="eyebrow mb-3 block">Complete Election Toolkit</span>
          <h2 className="section-title mb-4">
            Everything You Need to Vote <span className="accent-text">with Confidence</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Six powerful tools designed to guide you through every step of the democratic process.
          </p>
        </motion.div>

        {/* Boxes-within-boxes grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} className={feature.span}>
              <Link href={feature.href} className="block group h-full">
                {/* Outer box */}
                <div className="h-full rounded-xl border border-[var(--border-default)] overflow-hidden bg-white hover:shadow-[var(--shadow-xl)] hover:border-[var(--border-hover)] transition-all duration-300">
                  {/* Inner box — image with overlay */}
                  <div className="relative h-52 sm:h-56 overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Text box nested inside the image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1 drop-shadow-lg">
                        {feature.title}
                      </h3>
                      <span className="text-white/70 text-sm font-medium inline-flex items-center gap-1 group-hover:text-white transition-colors">
                        Explore <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Description box below image */}
                  <div className="p-5">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
