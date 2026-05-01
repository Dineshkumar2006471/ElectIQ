'use client';

import { motion } from 'framer-motion';
import { ChatCircle, Compass, Rocket } from '@phosphor-icons/react';

const STEPS = [
  {
    number: '01',
    title: 'Ask Your Question',
    description: 'Type or speak any election-related question in your preferred language. No jargon, no confusion — just ask naturally.',
    icon: <ChatCircle size={28} weight="duotone" />,
    color: 'var(--accent)',
  },
  {
    number: '02',
    title: 'Get Guided Answers',
    description: 'ElectIQ breaks down complex election processes into simple, step-by-step guidance with official sources.',
    icon: <Compass size={28} weight="duotone" />,
    color: 'var(--info)',
  },
  {
    number: '03',
    title: 'Take Action',
    description: 'Register to vote, find your booth, research candidates, or track results. Every answer leads to action.',
    icon: <Rocket size={28} weight="duotone" />,
    color: 'var(--success)',
  },
];

export default function HowItWorks() {
  return (
    <section className="section relative" id="how-it-works">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="eyebrow mb-3 block">Simple as 1-2-3</span>
          <h2 className="section-title mb-4">
            How <span className="accent-text">ElectIQ</span> Works
          </h2>
          <p className="section-subtitle mx-auto">
            From question to action in three simple steps. No sign-up required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px border-t-2 border-dashed border-[var(--border-default)]" />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div
                className="relative mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2"
                style={{ background: `${step.color}10`, borderColor: `${step.color}30`, color: step.color }}
              >
                {step.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: step.color }}>
                Step {step.number}
              </span>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{step.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
