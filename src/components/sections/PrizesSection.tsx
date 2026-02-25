'use client';

import { motion } from 'framer-motion';

const prizes = [
  { position: '1st Prize', reward: 'Cash Prize Rs.5000/- with Grand Winner Trophy ' },
  { position: '2nd Prize', reward: 'Cash Prize Rs.3000/- with Runner-Up Trophy ' },
  { position: 'All Participants', reward: 'Official participation certificate' },
];

export default function PrizesSection() {
  return (
    <section id="prizes" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl sm:text-3xl font-bold text-center text-light-gray mb-4"
        >
          Prizes
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-24 h-0.5 bg-red mx-auto mb-12"
        />

        <div className="space-y-6">
          {prizes.map((prize, i) => (
            <motion.div
              key={prize.position}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-lg border border-dark-gray hover:border-red/40 transition-colors"
            >
              <span className="font-heading font-bold text-red">{prize.position}</span>
              <span className="text-light-gray/90">{prize.reward}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
