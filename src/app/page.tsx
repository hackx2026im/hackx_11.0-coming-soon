"use client";

import React, { useState, useEffect } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { EligibilitySection } from "@/components/EligibilitySection";
import { TimelineSection } from "@/components/TimelineSection";
import { StayUpdatedCTA } from "@/components/StayUpdatedCTA";
import { Footer } from "@/components/Footer";
import { LeadModal } from "@/components/LeadModal";
import { useLanguage } from "@/context/LanguageContext";

// Feature flag to control multi-language support (English, Sinhala, Tamil)
const ENABLE_MULTILANGUAGE = false;

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);
  const [showLangSelector, setShowLangSelector] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [hasTriggeredModal, setHasTriggeredModal] = useState(false);

  useEffect(() => {
    if (!showSplash) {
      if (!ENABLE_MULTILANGUAGE) {
        setLanguage("en");
        setShowMainContent(true);
        setShowLangSelector(false);
      } else if (language) {
        setShowMainContent(true);
      } else {
        setShowLangSelector(true);
      }
    }
  }, [showSplash, language]);

  useEffect(() => {
    // Show popup after intro finishes with a 2-second delay
    if (showMainContent && !hasTriggeredModal) {
      const timer = setTimeout(() => {
        setShowLeadModal(true);
        setHasTriggeredModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showMainContent, hasTriggeredModal]);

  // Lock scroll when lead modal is open
  useEffect(() => {
    if (showLeadModal) {
      document.body.style.overflow = 'hidden';
    } else if (showMainContent && !showSplash && !showLangSelector) {
      document.body.style.overflow = 'unset';
    }
  }, [showLeadModal, showMainContent, showSplash, showLangSelector]);

  const handleLangSelect = () => {
    setShowLangSelector(false);
    setShowMainContent(true);
  };

  useEffect(() => {
    if (showSplash || showLangSelector) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showSplash, showLangSelector]);

  return (
    <main className="min-h-screen bg-[#010814] text-white overflow-x-hidden relative">
      {showMainContent && ENABLE_MULTILANGUAGE && (
        <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[90] flex bg-white/[0.02] border border-white/10 rounded-full p-1 backdrop-blur-md shadow-2xl">
          {[
            { label: 'EN', id: 'en' },
            { label: 'සිංහල', id: 'si' },
            { label: 'தமிழ்', id: 'ta' }
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-300 ${
                language === lang.id 
                  ? 'bg-lagoon text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}

      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {showLangSelector && (
        <LanguageSelector onSelect={handleLangSelect} />
      )}

      {showMainContent && (
        <div className="w-full">
          <Hero />
          <AboutSection />
          <EligibilitySection />
          <TimelineSection />
          <StayUpdatedCTA />
          <Footer />
        </div>
      )}

      <LeadModal 
        isOpen={showLeadModal} 
        onClose={() => setShowLeadModal(false)} 
      />
    </main>
  );
}
