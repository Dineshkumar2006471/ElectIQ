'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  List,
  X,
  ChatCircle,
  Translate,
} from '@phosphor-icons/react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/locator', label: 'Find Booth' },
  { href: '/candidates', label: 'Candidates' },
  { href: '/results', label: 'Results' },
  { href: '/quiz', label: 'Quiz' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white border-b border-[var(--border-default)] shadow-[var(--shadow-sm)]'
            : 'bg-white/80'
        }`}
        style={{ height: '64px' }}
      >
        <div className="container-narrow h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 group" aria-label="ElectIQ Home">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-[var(--text-primary)]">Elect</span>
              <span className="text-[var(--accent)]">IQ</span>
            </span>
            <span
              className="w-2 h-2 rounded-full bg-[var(--accent)] transition-transform group-hover:scale-125"
              aria-hidden="true"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 z-0 rounded-lg bg-[var(--accent-light)] border border-[var(--accent)]/15"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Change language"
            >
              <Translate size={18} weight="bold" />
              <span>EN</span>
            </button>

            <Link
              href="/chat"
              className="btn-primary hidden md:flex items-center gap-2 text-sm py-2 px-5"
            >
              <ChatCircle size={16} weight="fill" />
              Ask ElectIQ
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 text-[var(--text-primary)]"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-white md:hidden"
          >
            <motion.nav
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
              className="flex flex-col items-center justify-center h-full gap-6"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`text-2xl font-bold transition-colors ${
                      pathname === link.href
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--text-primary)] hover:text-[var(--accent)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link href="/chat" className="btn-primary flex items-center gap-2 text-lg px-8 py-3">
                  <ChatCircle size={20} weight="fill" />
                  Ask ElectIQ
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
