'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl sm:text-3xl font-bold text-light-gray mb-4"
        >
          For Registration & Queries
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-24 h-0.5 bg-red mx-auto mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-light-gray/90"
        >
          <div>
            <p className="font-heading font-semibold text-light-gray">Event Head</p>
            <a
              href="tel:+919686814550"
              className="text-red hover:underline"
            >
              +91 9686814550
            </a>
          </div>
          <div>
            <p className="font-heading font-semibold text-light-gray">Co-head</p>
            <a
              href="tel:+918139906820"
              className="text-red hover:underline"
            >
              +91 8139906820
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
