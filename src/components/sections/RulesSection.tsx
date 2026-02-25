'use client';

import { motion } from 'framer-motion';

const rules = [
  'Two members per team',
  '₹500 registration fee per team',
  'More than one team can participate from a College',
  'College ID card is mandatory',
  'Participants should bring their own laptops',
  'All projects must be developed during the Hackathon ',
  'Problem statement will be provided on the previous night of the event',
  'Judge\'s decision is final',
  'All the Team Members should maintain discipline throughout the event, failing to do so will result in disqualification',
  
  'Wifi and Lunch will be provided ',
  'Participants are responsible for their personal belonging',
];

export default function RulesSection() {
  return (
    <section id="rules" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl sm:text-3xl font-bold text-light-gray mb-4"
        >
          Rules
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          className="w-24 h-0.5 bg-red mb-12 origin-left"
        />

        <ul className="space-y-4">
          {rules.map((rule, i) => (
            <motion.li
              key={rule}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 text-light-gray/90"
            >
              <span className="w-2 h-2 rounded-full bg-red shrink-0" />
              <span>{rule}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
