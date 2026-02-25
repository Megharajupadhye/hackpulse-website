'use client';

import { motion } from 'framer-motion';

const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=Bharatesh+College+of+Computer+Applications+Fort+Road+Belagavi+Karnataka';
const EMBED_QUERY = encodeURIComponent('Bharatesh College of Computer Applications,Arihantgiri Campus Old PB-Road , Belagavi, Karnataka');
const IFRAME_SRC = `https://www.google.com/maps?q=${EMBED_QUERY}&output=embed`;

export default function EventLocationSection() {
  return (
    <section id="location" className="py-20 px-4 bg-dark-gray/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl sm:text-3xl font-bold text-center text-light-gray mb-4"
        >
          Venue
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-24 h-0.5 bg-red mx-auto mb-10"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="font-heading font-bold text-lg sm:text-xl text-light-gray">
            Bharatesh College of Computer Applications (BCCA)
          </p>
          <p className="text-light-gray/80 mt-2">
            Fort Road, Belagavi, Karnataka, India
          </p>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-red text-black font-heading font-bold hover:shadow-red-glow transition-shadow"
          >
            View on Google Maps
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-red/30 overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.1)] bg-dark-gray"
        >
          <iframe
            src={IFRAME_SRC}
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BCCA Location Map"
            className="block overflow-hidden"
          />
        </motion.div>
        <p className="text-center text-light-gray/60 text-sm mt-3">
          Click the button above to get live directions.
        </p>
      </div>
    </section>
  );
}
