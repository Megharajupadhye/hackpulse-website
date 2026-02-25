'use client';

import { motion } from 'framer-motion';

const domains = [
  {
    title: 'AI & Machine Learning',
    description: 'Build intelligent solutions with machine learning, neural networks, and data-driven applications. From computer vision to NLP—push the boundaries of what AI can do.',
  },
  {
    title: 'Cloud Computing',
    description: 'Design scalable, resilient systems on the cloud. Leverage modern cloud services for deployment, serverless architectures, and distributed systems.',
  },
];

export default function DomainsSection() {
  return (
    <section id="domains" className="py-20 px-4 bg-dark-gray/30">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl sm:text-3xl font-bold text-center text-light-gray mb-4"
        >
          Domains
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-24 h-0.5 bg-white mx-auto mb-16"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-black border border-dark-gray rounded-xl p-6 sm:p-8 hover:border-red/50 hover:shadow-red-glow/20 transition-all duration-300"
            >
              <h3 className="font-heading font-bold text-xl text-white mb-3 border-b border-red/50 pb-2">
                {domain.title}
              </h3>
              <p className="text-light-gray/80 text-sm leading-relaxed">
                {domain.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
