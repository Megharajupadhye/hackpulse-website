'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-dark-gray bg-black py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-light-gray/70 text-sm text-center sm:text-left">
          Acknowledgment: Institution of Innovation Council (IIC) and Research & Development Cell (R&D), Bharatesh Education Trust – BCCA
        </p>
        <div className="flex gap-6">
          <Link href="/" className="text-light-gray/70 hover:text-red text-sm transition-colors">
            Home
          </Link>
          <Link href="/register" className="text-light-gray/70 hover:text-red text-sm transition-colors">
            Register
          </Link>
        </div>
      </div>
      <p className="text-center text-light-gray/50 text-xs mt-6">
        © {new Date().getFullYear()} HackPulse 2026. All rights reserved.
      </p>
    </footer>
  );
}
