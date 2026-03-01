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
      className="relative flex flex-col justify-center pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden w-full max-w-full"
      aria-label="Institutional branding"
    >
      <div className="absolute inset-0 grid-bg opacity-40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80 z-0" />

      <div className="relative max-w-5xl mx-auto w-full text-center z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4 sm:space-y-6"
        >
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 w-full px-2">
              <LogoImage
                src="/images/bcca.png"
                alt="BCCA Logo"
                containerClassName="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border border-red/70 bg-black/80 flex-shrink-0"
                className="object-contain p-1.5"
                sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                animate={false}
              />
              <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full border border-red/80 bg-black/80 shadow-[0_0_22px_rgba(255,0,0,0.3)] w-full sm:w-auto">
                <p className="font-heading font-semibold text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl tracking-wide text-white text-center break-words">
                  Bharatesh College of Computer Applications
                </p>
              </div>
              <LogoImage
                src="/images/25 year.png"
                alt="25 Years Silver Jubilee Logo"
                containerClassName="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border border-red/70 bg-black/80 flex-shrink-0"
                className="object-contain p-1.5"
                sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                animate={false}
                fallbackText="25"
              />
            </div>

            <p className="mt-2 text-xs sm:text-sm md:text-base text-light-gray/80 px-2">
              Celebrating 25 Years of Excellence in Computer Applications
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
