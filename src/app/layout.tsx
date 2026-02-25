import type { Metadata } from 'next';
import { Orbitron, Inter } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HackPulse 2026 – Silver Jubilee Innovation Hackathon | BCCA',
  description:
    'HackPulse 2026 – Silver Jubilee Innovation Hackathon. Code. Compete. Create the Future. Organized by IIC & R&D, Bharatesh Education Trust – BCCA. AI/ML & Cloud Computing. Belagavi, Karnataka.',
  keywords: [
    'HackPulse 2026',
    'hackathon',
    'BCCA',
    'Bharatesh',
    'Silver Jubilee',
    'innovation',
    'AI',
    'ML',
    'Cloud Computing',
    'Belagavi',
  ],
  openGraph: {
    title: 'HackPulse 2026 – Silver Jubilee Innovation Hackathon',
    description: 'Code. Compete. Create the Future. One-day high-intensity hackathon at BCCA.',
    type: 'website',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable}`}>
      <body className="antialiased bg-black text-light-gray min-h-screen">
        <CustomCursor />
        <main className="min-h-screen flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
