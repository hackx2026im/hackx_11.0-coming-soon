"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LeadForm } from "./LeadForm";

export function StayUpdatedCTA() {
  const { strings } = useLanguage();

  if (!strings) return null;

  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-8 overflow-hidden flex justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/IMG_056.jpg"
          alt="Stay Updated Background"
          fill
          className="object-cover opacity-80"
        />
        {/* Overlay gradient for readability and smooth blending */}
        <div className="absolute inset-0 bg-[#010E13]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010E13] via-[#010E13]/40 to-[#010E13]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-6xl bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 md:p-14 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {strings.cardTitle}
            </h2>
            <p className="font-body text-lg text-white/90 leading-relaxed max-w-md mx-auto lg:mx-0 drop-shadow-md">
              {strings.cardBody}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[450px]"
          >
            <LeadForm />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
