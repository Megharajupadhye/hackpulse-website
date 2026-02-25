'use client';

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

export default function TopBrandingSection() {
  return (
    <section
      className="relative flex flex-col justify-center pt-12 pb-8 px-4 overflow-hidden"
      aria-label="Institutional branding"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />

      <div className="relative max-w-5xl mx-auto w-full text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-4 sm:gap-5"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <LogoImage
                src="/images/bcca.png"
                alt="BCCA Logo"
                containerClassName="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-red/70 bg-black/80"
                className="object-contain p-1.5"
                sizes="96px"
                animate={false}
              />
              <div className="px-6 py-3 rounded-full border border-red/80 bg-black/80 shadow-[0_0_22px_rgba(255,0,0,0.3)]">
                <p className="font-heading font-semibold text-lg sm:text-xl md:text-2xl tracking-wide text-white text-center">
                  Bharatesh College of Computer Applications
                </p>
              </div>
              <LogoImage
                src="/images/25 year.png"
                alt="25 Years Silver Jubilee Logo"
                containerClassName="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-red/70 bg-black/80"
                className="object-contain p-1.5"
                sizes="96px"
                animate={false}
                fallbackText="25"
              />
            </div>

            <p className="mt-2 text-sm sm:text-base text-light-gray/80">
              Celebrating 25 Years of Excellence in Computer Applications
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
