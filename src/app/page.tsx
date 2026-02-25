'use client';

import Header from '@/components/Header';
import TopBrandingSection from '@/components/sections/TopBrandingSection';
import HeroSection from '@/components/sections/HeroSection';
import OrganizingBodies from '@/components/sections/OrganizingBodies';
import AboutSection from '@/components/sections/AboutSection';
import DomainsSection from '@/components/sections/DomainsSection';
import RulesSection from '@/components/sections/RulesSection';
import TimelineSection from '@/components/sections/TimelineSection';
import PrizesSection from '@/components/sections/PrizesSection';
import EventLocationSection from '@/components/sections/EventLocationSection';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-light-gray selection:bg-red selection:text-white">
      {/* 1. Top Branding Section (Bharatesh College...) */}
      <TopBrandingSection />

      {/* 2. Navigation Bar - Sticky below branding */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <Header />
      </div>

      {/* 3. Hero Section (HackPulse 2026) */}
      <HeroSection />

      <OrganizingBodies />
      <AboutSection />
      <DomainsSection />
      <RulesSection />
      <TimelineSection />
      <PrizesSection />
      <EventLocationSection />
      <ContactSection />
      <CTASection />
    </main>
  );
}