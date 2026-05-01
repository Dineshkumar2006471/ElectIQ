'use client';

import Link from 'next/link';
import { GithubLogo, EnvelopeSimple, Heart } from '@phosphor-icons/react';

const FOOTER_LINKS = {
  'Learn': [
    { label: 'How to Vote', href: '/timeline' },
    { label: 'Ask ElectIQ', href: '/chat' },
    { label: 'Civic Quiz', href: '/quiz' },
    { label: 'Find Your Booth', href: '/locator' },
  ],
  'Resources': [
    { label: 'Election Commission', href: 'https://eci.gov.in', external: true },
    { label: 'NVSP Portal', href: 'https://nvsp.in', external: true },
    { label: 'MyNeta.info', href: 'https://myneta.info', external: true },
    { label: 'ADR India', href: 'https://adrindia.org', external: true },
  ],
  'About': [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Accessibility', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-secondary)]">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <Link href="/" className="inline-flex items-center gap-1 mb-4">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-[var(--text-primary)]">Elect</span>
                <span className="text-[var(--accent)]">IQ</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
              AI-powered civic guidance for every citizen. Understand elections, exercise your rights.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all" aria-label="GitHub">
                <GithubLogo size={18} />
              </a>
              <a href="mailto:contact@electiq.in" className="w-9 h-9 rounded-lg border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all" aria-label="Email">
                <EnvelopeSimple size={18} />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--border-default)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} ElectIQ. Built for Virtual Prompts by Google Cloud &amp; Hack2Skill.
          </p>
          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <span>Made with</span>
            <Heart size={14} weight="fill" className="text-[var(--error)]" />
            <span>using Google Cloud, Gemini AI, and Firebase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
