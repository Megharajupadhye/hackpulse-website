'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/D7W6ncYZuih5AZF1pcjTIh?mode=gi_t';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <svg
            className="w-24 h-24 text-red drop-shadow-[0_0_12px_rgba(255,0,0,0.5)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading text-3xl font-bold text-light-gray mb-4"
        >
          Registration Successful
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-light-gray/80 mb-8"
        >
          Join the Official HackPulse WhatsApp Group.
        </motion.p>

        <motion.a
          href={WHATSAPP_GROUP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="inline-block px-8 py-4 rounded-lg bg-red text-black font-heading font-bold text-lg shadow-[0_0_24px_rgba(255,0,0,0.4)] hover:shadow-[0_0_32px_rgba(255,0,0,0.5)] transition-shadow mb-6"
        >
          Join WhatsApp Group
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-lg border-2 border-red text-red font-heading font-semibold hover:bg-red hover:text-black transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
