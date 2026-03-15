'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="font-heading text-xl sm:text-2xl text-light-gray mb-4">
          HackPulse 2026 Registration
        </p>
        <div className="inline-block max-w-xl text-left bg-black/70 border border-red/60 rounded-2xl px-6 py-5 shadow-[0_0_30px_rgba(255,0,0,0.18)]">
          <p className="text-red font-heading font-semibold mb-2 text-lg">
            🚨 Registration Closed
          </p>
          <p className="text-light-gray/90 text-sm sm:text-base mb-2">
            Thank you for the overwhelming response to HackPulse 2026. We have successfully reached the maximum limit of 20 participating teams.
          </p>
          <p className="text-light-gray/80 text-sm sm:text-base mb-2">
            Registrations are now officially closed.
          </p>
          <p className="text-light-gray/60 text-xs sm:text-sm">
            For queries, please contact the HackPulse organizing team.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
