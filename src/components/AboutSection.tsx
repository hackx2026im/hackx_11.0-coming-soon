"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function AboutSection() {
  const { strings } = useLanguage();

  if (!strings) return null;

  const rewards = [
    {
      title: strings.guidanceTitle,
      desc: strings.guidanceDesc,
      icon: Compass,
    },
    {
      title: strings.mentorshipTitle,
      desc: strings.mentorshipDesc,
      icon: Users,
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-[#010814] overflow-hidden">
      {/* Ambient background glow to lift the darkness */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bioluminance/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto flex flex-col gap-12 lg:gap-16 relative z-10">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center w-full"
        >
          <h2 className="font-display text-3xl md:text-5xl text-white tracking-wider uppercase drop-shadow-[0_0_15px_rgba(91,187,255,0.1)]">
            {strings.aboutTitle}
          </h2>
        </motion.div>

        {/* Top Part: Text & Video */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Left Side: Content */}
          <div className="flex-[1.2] flex flex-col gap-10 justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left"
            >
              <p className="font-body text-lg text-gray-300 leading-relaxed">
                {strings.aboutDesc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="border-t-2 lg:border-t-0 lg:border-l-4 border-bioluminance pt-6 lg:pt-0 lg:pl-8 py-2 text-center lg:text-left relative"
            >
              {/* Subtle glow behind the quote line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-bioluminance blur-[8px] opacity-50 hidden lg:block" />
              <h3 className="font-display text-2xl md:text-3xl text-white italic tracking-wide">
                {strings.aboutQuote}
              </h3>
            </motion.div>
          </div>

          {/* Right Side: Who Can Apply Card */}
          <div className="flex-1 w-full flex flex-col justify-center mt-8 lg:mt-0 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-full relative p-6 sm:p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] group/card overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-bioluminance/10 via-transparent to-transparent pointer-events-none" />
              
              <h3 className="font-display text-2xl text-bioluminance tracking-wider uppercase mb-6 relative z-10 text-center">
                Who Can Apply?
              </h3>
              
              <ul className="flex flex-col gap-5 font-body text-gray-300 text-[15px] leading-relaxed relative z-10">
                <li className="flex gap-4 items-start">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-bioluminance shadow-[0_0_8px_rgba(91,187,255,0.8)] flex-shrink-0" />
                  <p>Undergraduate students from recognized universities and higher education institutions in Sri Lanka.</p>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-bioluminance shadow-[0_0_8px_rgba(91,187,255,0.8)] flex-shrink-0" />
                  <p>Teams must consist of undergraduates of the same university. (Multiple teams from one university is allowed)</p>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-bioluminance shadow-[0_0_8px_rgba(91,187,255,0.8)] flex-shrink-0" />
                  <p>Participants must submit an original and innovative solution to a real-world problem.</p>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-bioluminance shadow-[0_0_8px_rgba(91,187,255,0.8)] flex-shrink-0" />
                  <p>Teams from any field of study are welcome to apply.</p>
                </li>
              </ul>
            </motion.div>
          </div>

        </div>

        {/* Bottom Part: Unified Card (Endless Freedom + 3 Icons) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-xl border border-white/[0.08] rounded-[2rem] flex flex-col lg:flex-row overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative group/main"
        >
          {/* Subtle hover glow for the entire card */}
          <div className="absolute inset-0 bg-bioluminance/5 opacity-0 group-hover/main:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Left portion: Endless Freedom */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative">
            {/* Gradient separator for desktop */}
            <div className="hidden lg:block absolute right-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            {/* Gradient separator for mobile */}
            <div className="block lg:hidden absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="relative z-10">
              <h4 className="font-mono text-bioluminance tracking-widest text-sm md:text-base uppercase mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-bioluminance/50 inline-block"></span>
                {strings.freedomTitle}
              </h4>
              <p className="font-body text-base md:text-lg text-gray-300 leading-relaxed max-w-lg">
                {strings.freedomDesc}
              </p>
            </div>
          </div>

          {/* Right portion: 3 Icons */}
          <div className="flex-[1.5] flex flex-col md:flex-row relative">
            {rewards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-1 relative group/item cursor-default">
                  {/* Vertical separator for desktop */}
                  {idx > 0 && (
                    <div className="hidden md:block absolute left-0 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                  )}
                  {/* Horizontal separator for mobile */}
                  {idx > 0 && (
                    <div className="block md:hidden absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  )}

                  <div className="w-full p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4 transition-colors duration-500 relative overflow-hidden">
                    {/* Item background hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col items-center gap-5">
                      {/* Icon Container */}
                      <div className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] group-hover/item:border-bioluminance/30 group-hover/item:bg-bioluminance/10 transition-all duration-500 ease-out transform group-hover/item:-translate-y-1 group-hover/item:shadow-[0_0_20px_rgba(91,187,255,0.15)]">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-gray-500 transition-colors duration-500 group-hover/item:text-bioluminance" />
                      </div>
                      
                      {/* Text Container */}
                      <div className="flex flex-col gap-2">
                        <h3 className="font-display tracking-wide font-medium text-base md:text-lg text-white/90 group-hover/item:text-white transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="font-body text-xs md:text-sm text-gray-500 leading-relaxed group-hover/item:text-gray-300 transition-colors duration-300 max-w-[12rem] mx-auto">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
