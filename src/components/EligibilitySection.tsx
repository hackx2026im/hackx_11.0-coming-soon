"use client";

import React from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

export function EligibilitySection() {
  const { strings } = useLanguage();

  if (!strings) return null;

  const steps = [
    { num: "01", title: "Team Up", desc: "Form a team of 3–5 undergraduates." },
    { num: "02", title: "Innovate", desc: "Find a real-world problem and come up with an innovative solution." },
    { num: "03", title: "Submit", desc: "Submit your project proposal." },
    { num: "04", title: "Learn", desc: "Join workshops and mentoring sessions." },
    { num: "05", title: "Pitch", desc: "Pitch your startup idea at the Semi-Finals and Grand Finals." },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-[#010814] overflow-hidden">

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[400px] bg-bioluminance/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4 tracking-wider uppercase drop-shadow-[0_0_15px_rgba(91,187,255,0.1)]">
            Ready to Step Up?
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-gray-400 max-w-2xl text-center"
          >
            Follow these steps to compete and win.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {steps.map((item, index) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative p-6 xl:p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] flex flex-col hover:border-bioluminance/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(91,187,255,0.1)] backdrop-blur-sm overflow-hidden"
            >
              {/* Subtle inner hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-bioluminance/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-bioluminance to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="font-mono text-3xl font-bold text-gray-600 group-hover:text-bioluminance transition-colors duration-300 mb-6">
                  {item.num}
                </div>
                <h3 className="font-body text-lg text-white mb-3 font-semibold group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
