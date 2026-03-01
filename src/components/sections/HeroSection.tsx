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
      className="relative min-h-screen flex flex-col justify-center pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden w-full max-w-full"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 grid-bg opacity-40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-0" />

      <div className="relative max-w-5xl mx-auto w-full text-center z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4 sm:space-y-6"
        >
          <motion.div variants={item} className="flex justify-center">
            <LogoImage
              src="/images/hackpulse-logo.png"
              alt="HackPulse 2026 Logo"
              containerClassName="relative w-40 h-48 sm:w-52 sm:h-60 md:w-60 md:h-72 max-w-full"
              sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, 240px"
              priority
              fallbackText="HP"
              animate
            />
          </motion.div>
          <motion.h1
            variants={item}
            id="hero-title"
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-light-gray mt-2 sm:mt-4 px-2"
          >
            HackPulse <span className="logo-text">2026</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="font-heading text-base sm:text-lg md:text-xl text-light-gray/90 px-2"
          >
           
          </motion.p>
          <motion.p
            variants={item}
            className="font-heading text-lg sm:text-xl md:text-2xl text-white font-semibold px-2"
          >
            Code. Compete. Create the Future.
          </motion.p>

          <motion.div
            variants={item}
            className="pt-3 sm:pt-4 border-t border-dark-gray/80 max-w-2xl mx-auto px-2"
          >
            <p className="text-light-gray/80 text-xs sm:text-sm leading-relaxed">
              Officially Organized by <strong className="text-light-gray">Institution&apos;s Innovation Council (IIC)</strong> and{' '}
              <strong className="text-light-gray">Research & Development Cell (R&D)</strong>,  – BCCA
            </p>
          </motion.div>

          <motion.div variants={item} className="pt-6 sm:pt-8">
            <Link
              href="/register"
              className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-black text-white border-2 border-red font-heading font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(255,0,0,0.18)] hover:shadow-[0_0_30px_rgba(255,0,0,0.28)] transition-all duration-300 hover:scale-105"
            >
              Register Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
