'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type LogoImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackText?: string;
  containerClassName?: string;
  animate?: boolean;
};

export default function LogoImage({
  src,
  alt,
  fill = true,
  className = 'object-contain',
  sizes,
  priority,
  fallbackText,
  containerClassName = 'relative w-40 h-40 sm:w-52 sm:h-52',
  animate = true,
}: LogoImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`${containerClassName} flex items-center justify-center rounded-lg border border-red/30 bg-dark-gray/50 text-red font-heading font-bold text-2xl`}
      >
        {fallbackText ?? alt.slice(0, 2)}
      </div>
    );
  }

  return (
    <motion.div
      className={`${containerClassName} transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,0,0,0.25)] rounded-lg`}
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={animate ? { duration: 0.5 } : undefined}
      whileHover={animate ? { y: -3, transition: { duration: 0.2 } } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
        priority={priority}
        onError={() => setError(true)}
        unoptimized
      />
    </motion.div>
  );
}
