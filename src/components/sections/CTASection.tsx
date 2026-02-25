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
        <p className="font-heading text-xl sm:text-2xl text-light-gray mb-8">
          Ready to build the future?
        </p>
        <Link
          href="/register"
          className="inline-block px-12 py-5 rounded-xl bg-red text-black font-heading font-bold text-xl hover:shadow-red-glow-lg transition-all duration-300 hover:scale-105"
        >
          Register Now
        </Link>
      </motion.div>
    </section>
  );
}
