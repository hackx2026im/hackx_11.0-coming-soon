"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { strings } = useLanguage();
  const { scrollY } = useScroll();

  // Parallax effects as user scrolls down (gentle / slow)
  const bgY = useTransform(scrollY, [0, 800], [0, 60]);
  const contentY = useTransform(scrollY, [0, 800], [0, -25]);
  const contentOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  if (!strings) return null;

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-24">
      {/* Video Background with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110"
        >
          <source src="/Hero_Loop.mp4" type="video/mp4" />
        </video>
        {/* Dark Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010E13]/80 via-[#010E13]/60 to-[#010E13] z-10" />
        {/* Tall bottom fade for seamless blend into next section */}
        <div className="absolute -bottom-1 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#010E13] z-20" />
      </motion.div>

      {/* Content with scroll fade */}
      <motion.div
        className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 text-center flex flex-col items-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative w-40 h-16 md:w-56 md:h-24 mb-6"
          >
            <Image
              src="/hackxlogo.webp"
              alt="hackX Jr. 9.0"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(114,229,248,0.3)]"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-widest drop-shadow-2xl mb-6"
          >
            {strings.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="font-body font-light text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed mb-2"
          >
            {strings.heroSubtitle1}<br></br> {strings.heroSubtitle2}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center gap-0 mt-2"
        >
          <div className="flex items-center justify-center gap-1 md:gap-0.25 w-full max-w-[800px] py-4 mx-auto">
            <img
              src="/IMSSA.png"
              alt="IMSSA"
              className="h-16 md:h-24 lg:h-28 w-auto object-contain drop-shadow-lg"
            />
            <img
              src="/Ministry of Science & Technology.png"
              alt="Ministry of Science and Technology"
              className="h-28 md:h-36 lg:h-44 w-auto object-contain drop-shadow-lg"
            />
          </div>
          <p className="font-body text-xs md:text-sm text-gray-400 max-w-2xl mt-2 opacity-80 leading-relaxed px-4">
            {strings.organizersText}
          </p>
        </motion.div>


      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 md:bottom-6 lg:bottom-4 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-white/50 hover:text-white transition-colors p-2 focus:outline-none flex flex-col items-center gap-1"
          aria-label="Scroll down"
        >
          <span className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-70">Scroll Down</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.button>
      </motion.div>

    </section>
  );
}
