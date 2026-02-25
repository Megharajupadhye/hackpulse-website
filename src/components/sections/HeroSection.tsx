'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import LogoImage from '@/components/LogoImage';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const fadeItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-10 pb-16 px-4 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      <div className="relative max-w-5xl mx-auto w-full text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={item} className="flex justify-center">
            <LogoImage
              src="/images/hackpulse-logo.png"
              alt="HackPulse 2026 Logo"
              containerClassName="relative w-50 h-60 sm:w-60 sm:h-60"
              sizes="280px"
              priority
              fallbackText="HP"
              animate
            />
          </motion.div>
          <motion.h1
            variants={item}
            id="hero-title"
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-light-gray mt-4"
          >
            HackPulse <span className="logo-text">2026</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="font-heading text-lg sm:text-xl text-light-gray/90"
          >
           
          </motion.p>
          <motion.p
            variants={item}
            className="font-heading text-xl sm:text-2xl text-white font-semibold"
          >
            Code. Compete. Create the Future.
          </motion.p>

          <motion.div
            variants={item}
            className="pt-4 border-t border-dark-gray/80 max-w-2xl mx-auto"
          >
            <p className="text-light-gray/80 text-sm">
              Officially Organized by <strong className="text-light-gray">Institution&apos;s Innovation Council (IIC)</strong> and{' '}
              <strong className="text-light-gray">Research & Development Cell (R&D)</strong>,  – BCCA
            </p>
          </motion.div>

          <motion.div variants={item} className="pt-8">
            <Link
              href="/register"
              className="inline-block px-8 py-4 rounded-lg bg-black text-white border-2 border-red font-heading font-bold text-lg shadow-[0_0_20px_rgba(255,0,0,0.18)] hover:shadow-[0_0_30px_rgba(255,0,0,0.28)] transition-all duration-300 hover:scale-105"
            >
              Register Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
