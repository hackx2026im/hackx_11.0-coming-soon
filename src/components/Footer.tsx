"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { strings } = useLanguage();

  if (!strings) return null;

  return (
    <footer className="w-full bg-[#010814] relative z-10 flex flex-col">
      <div className="w-full py-8 px-4 md:px-8">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 xl:gap-32 items-center lg:items-stretch px-4 lg:px-8">

          {/* Left Side: Organizers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center text-center w-full h-full"
          >
            <div className="relative w-56 h-20 md:w-64 md:h-24 lg:w-[280px] lg:h-[100px] mb-8 md:mb-10 mx-auto">
              <Image
                src="/hackx-logo.webp"
                alt="hackX 11.0 Logo"
                fill
                className="object-contain object-center"
              />
            </div>
            <p className="font-body text-[15px] md:text-base text-gray-300 leading-relaxed mb-8 md:mb-10 font-light tracking-wide w-full max-w-[420px] mx-auto text-center md:text-justify" style={{ textAlignLast: 'center' }}>
              Inter-University Startup Challenge for all undergraduates of universities in Sri Lanka. Premier event of the Department of Industrial Management, University of Kelaniya.
            </p>
            <div className="flex items-center justify-center gap-5 md:gap-6 w-full max-w-md mx-auto">
              <div className="h-12 md:h-14 w-[110px] md:w-[120px] overflow-hidden flex justify-start items-center">
                <img src="/mit.png" alt="MIT" className="h-full w-auto max-w-none object-left" />
              </div>
              <img src="/IMSSA.png" alt="IMSSA" className="h-12 md:h-14 w-auto object-contain" />
              <img src="/uok.png" alt="University of Kelaniya" className="h-12 md:h-14 w-auto object-contain" />
            </div>
          </motion.div>

          {/* Center: Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center w-full relative z-10 self-center"
          >
            <div className="flex flex-col items-center w-full max-w-[320px]">
              <h3 className="font-display text-xl lg:text-2xl text-white tracking-widest mb-6 uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 text-center w-full">
                Get in Touch
              </h3>

              <div className="flex flex-col w-full gap-3.5 mb-10">
                <a href="tel:+94772868600" className="w-full px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center justify-between group backdrop-blur-md hover:-translate-y-0.5">
                  <div className="flex flex-col text-left">
                    <span className="text-gray-300 font-body text-sm group-hover:text-white transition-colors">Praveen Madawalge</span>
                    <span className="text-gray-500 font-body text-[11px] md:text-xs mt-0.5 group-hover:text-gray-400 transition-colors">(Chief Coordinator)</span>
                  </div>
                  <span className="text-white font-mono text-sm whitespace-nowrap group-hover:text-[#00E5FF] transition-colors pl-2">+94 77 286 8600</span>
                </a>
                <a href="tel:+94707253446" className="w-full px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center justify-between group backdrop-blur-md hover:-translate-y-0.5">
                  <div className="flex flex-col text-left">
                    <span className="text-gray-300 font-body text-sm group-hover:text-white transition-colors">Tharushi Kulathunga</span>
                    <span className="text-gray-500 font-body text-[11px] md:text-xs mt-0.5 group-hover:text-gray-400 transition-colors">(Chief Coordinator)</span>
                  </div>
                  <span className="text-white font-mono text-sm whitespace-nowrap group-hover:text-[#00E5FF] transition-colors pl-2">+94 70 725 3446</span>
                </a>
              </div>

              <div className="flex justify-center lg:justify-between gap-4 w-full">
                <a
                  href="https://www.facebook.com/hackXJunior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex justify-center p-3.5 rounded-full bg-white/[0.02] border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 text-gray-400 hover:text-white group backdrop-blur-sm hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a
                  href="https://www.instagram.com/imssa.uok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex justify-center p-3.5 rounded-full bg-white/[0.02] border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 text-gray-400 hover:text-white group backdrop-blur-sm hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/imssauok/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex justify-center p-3.5 rounded-full bg-white/[0.02] border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 text-gray-400 hover:text-white group backdrop-blur-sm hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a
                  href="https://www.youtube.com/@hackX_UoK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex justify-center p-3.5 rounded-full bg-white/[0.02] border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 text-gray-400 hover:text-white group backdrop-blur-sm hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Ministry and NSF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center w-full"
          >
            <img
              src="/Ministry of Science & Technology.png"
              alt="Ministry of Science and Technology"
              className="h-24 md:h-32 lg:h-40 w-auto object-contain"
            />
          </motion.div>

        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full bg-[#00080B] border-t border-white/5 py-6 px-4 md:px-8"
      >
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-500 font-body text-center md:text-left">
          <p>Organized by The Industrial Management Science Students&apos; Association</p>
          <p className="md:text-right">© 2026 hackX 11.0 All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
}
