'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#domains', label: 'Domains' },
  { href: '/#rules', label: 'Rules' },
  { href: '/#timeline', label: 'Timeline' },
  { href: '/#prizes', label: 'Prizes' },
  { href: '/#location', label: 'Location' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading font-bold text-lg logo-text transition-colors"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-red text-red bg-black/60">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 11L12 3l9 8" />
              <path d="M5 10v10h14V10" />
            </svg>
          </span>
          <span>HackPulse 2026</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-light-gray/90 hover:text-red transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="px-4 py-2 rounded-md bg-red text-black font-semibold text-sm hover:shadow-red-glow transition-shadow"
          >
            Register Now
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 text-light-gray"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-dark-gray/50 bg-black"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-light-gray hover:text-red"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="mt-2 py-3 text-center rounded-md bg-red text-black font-semibold"
              >
                Register Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
