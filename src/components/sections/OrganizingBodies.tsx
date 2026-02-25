'use client';

import { motion } from 'framer-motion';
import LogoImage from '@/components/LogoImage';

const cards = [
  {
    title: 'Institution of Innovation Council (IIC)',
    description:
      'Driving entrepreneurship and startup incubation at BCCA. The IIC fosters innovation, supports student-led ventures, and connects ideas with mentorship and resources. Our mission is to build a culture where innovation meets execution.',
    image: '/images/iic-logo.png',
  },
  {
    title: 'Research & Development Cell (R&D)',
    description:
      'Championing research culture and academic excellence. The R&D Cell promotes technology advancement, collaborative research, and industry-academia partnerships. We enable students and faculty to push boundaries and contribute to real-world solutions.',
    image: '/images/bcca.png',
  },
];

export default function OrganizingBodies() {
  return (
    <section id="organizing" className="py-20 px-4 bg-dark-gray/30">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl sm:text-3xl font-bold text-center text-light-gray mb-4"
        >
          Organizing Bodies
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-24 h-0.5 bg-red mx-auto mb-16"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black border border-dark-gray rounded-xl p-6 sm:p-8 hover:border-red/50 transition-colors duration-300"
            >
              <div className="flex justify-center mb-4">
                <LogoImage
                  src={card.image}
                  alt={card.title}
                  containerClassName="relative w-20 h-20"
                  fallbackText={card.title.includes('IIC') ? 'IIC' : 'R&D'}
                  animate
                />
              </div>
              <h3 className="font-heading font-bold text-lg text-light-gray mb-2 border-b-2 border-red pb-2 w-fit">
                {card.title}
              </h3>
              <p className="text-light-gray/80 text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
