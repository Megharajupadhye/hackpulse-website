'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl sm:text-3xl font-bold text-light-gray mb-4"
        >
          What is HackPulse?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          className="w-24 h-0.5 bg-red mb-10 origin-left"
        />

        <div className="space-y-6 text-light-gray/90 leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            HackPulse represents the technological heartbeat of Bharatesh Education Trust. It is conducted as part of the 25-Year Silver Jubilee celebration—a milestone that marks our commitment to excellence and innovation in education.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            This one-day, high-intensity build environment brings together innovators, developers, and problem-solvers. Focused on <strong className="text-light-gray">AI/ML</strong> and <strong className="text-light-gray">Cloud Computing</strong>, HackPulse is designed to test innovation, execution, and teamwork. Participation is limited to 20 elite teams, ensuring a focused and competitive experience.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            We emphasize discipline, creativity, and real-world solutions. HackPulse is not just a competition—it is a platform where ideas evolve into impact, and where the next generation of builders takes the stage.
          </motion.p>
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 pl-4 border-l-4 border-red py-2 text-light-gray italic"
        >
          &ldquo;HackPulse is not just a competition. It is a platform where ideas evolve into impact.&rdquo;
        </motion.blockquote>
      </div>
    </section>
  );
}
