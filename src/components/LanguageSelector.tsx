"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/strings";

interface LanguageSelectorProps {
  onSelect: () => void;
}

export function LanguageSelector({ onSelect }: LanguageSelectorProps) {
  const { setLanguage } = useLanguage();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    onSelect();
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#010814] px-4">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm flex flex-col items-center"
      >
        <motion.p 
          variants={itemVariants}
          className="font-mono text-xs tracking-widest text-gray-500 uppercase mb-8"
        >
          Select Language
        </motion.p>

        <div className="flex flex-col gap-3 w-full">
          <motion.button
            variants={itemVariants}
            onClick={() => handleSelect("en")}
            className="w-full py-4 px-6 rounded-full bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-colors text-center"
          >
            <span className="font-mono text-sm tracking-wide text-gray-200">
              English
            </span>
          </motion.button>

          <motion.button
            variants={itemVariants}
            onClick={() => handleSelect("si")}
            className="w-full py-4 px-6 rounded-full bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-colors text-center"
          >
            <span className="font-body text-sm tracking-wide text-gray-200">
              සිංහල
            </span>
          </motion.button>

          <motion.button
            variants={itemVariants}
            onClick={() => handleSelect("ta")}
            className="w-full py-4 px-6 rounded-full bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-colors text-center"
          >
            <span className="font-body text-sm tracking-wide text-gray-200">
              தமிழ்
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
