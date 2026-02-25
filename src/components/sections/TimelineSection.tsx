'use client';

import { motion } from 'framer-motion';

const events = [
  { time: '8:00 AM - 9:00 AM', title: 'Registration ' },
  { time: '9:00 AM - 10:00 AM', title: 'Inauguration' },
  { time: '10:00 AM - 1:00 PM', title: 'Development Phase' },
  { time: '1:00 PM - 1:30 PM', title: 'Lunch Break' },
  { time: '1:30 PM - 3:00 PM', title: 'Modification Round ' },
  { time: '3:00 PM - 5:00 PM', title: 'Presentation Round' },
  { time: '5:00 PM - 5:30 PM', title: 'Valedictory Function' },
];  

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-20 px-4 bg-dark-gray/30">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl sm:text-3xl font-bold text-center text-light-gray mb-4"
        >
          Event Timeline
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-24 h-0.5 bg-red mx-auto mb-16"
        />

        <div className="relative pl-8 border-l-2 border-red/50">
          {events.map((event, i) => (
            <motion.div
              key={event.time}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative pb-10 last:pb-0"
            >
              <span className="absolute left-0 top-0 -translate-x-[calc(2rem+5px)] w-3 h-3 rounded-full bg-red shadow-[0_0_12px_rgba(255,0,0,0.5)]" />
              <p className="font-heading font-bold text-base sm:text-lg text-[#f5f5f5] mb-2 border-b border-red/60 pb-1 w-fit shadow-[0_0_8px_rgba(255,0,0,0.2)]">
                {event.time}
              </p>
              <p className="text-light-gray/90 mt-2">{event.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
