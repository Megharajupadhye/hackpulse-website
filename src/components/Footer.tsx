'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-dark-gray bg-black py-8 sm:py-12 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <p className="text-light-gray/70 text-xs sm:text-sm text-center sm:text-left leading-relaxed">
          Acknowledgment: Institution of Innovation Council (IIC) and Research & Development Cell (R&D), Bharatesh Education Trust – BCCA
        </p>
        <div className="flex gap-4 sm:gap-6 flex-shrink-0">
          <Link href="/" className="text-light-gray/70 hover:text-red text-xs sm:text-sm transition-colors whitespace-nowrap">
            Home
          </Link>
          <Link href="/register" className="text-light-gray/70 hover:text-red text-xs sm:text-sm transition-colors whitespace-nowrap">
            Register
          </Link>
        </div>
      </div>
      <p className="text-center text-light-gray/50 text-xs mt-4 sm:mt-6 px-2">
        © {new Date().getFullYear()} HackPulse 2026. All rights reserved.
      </p>
    </footer>
  );
}
