"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Feature flag to control visibility of AI generated/placeholder timeline photos
const SHOW_TIMELINE_IMAGES = false;



export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const events = [
    {
      date: "June 23, 2026",
      title: "Registration Opens",
      desc: "Applications open for all school students across the island.",
      images: [],
    },
    {
      date: "July 03, 2026",
      title: "Awareness Session",
      desc: "An introductory session for all registered teams to understand the expectations and format of the competition.",
      images: ["/timeline/awareness/1.png"],
    },
    {
      date: "October 3, 2026",
      title: "Semi-Finals (InnoX)",
      desc: "The top teams will present their prototypes and ideas to our panel of judges.",
      images: ["/timeline/semis/1.png"],
    },
    {
      date: "November 11, 2026",
      title: "Grand Finals",
      desc: "The ultimate showdown where the best innovations will be showcased on the grand stage.",
      images: ["/timeline/finals/1.png"],
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-[#010E13]" ref={containerRef}>
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-bioluminance/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-current-cta/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 text-center flex flex-col items-center"
        >
          <h2 className="font-display text-3xl md:text-5xl text-white tracking-wider uppercase drop-shadow-[0_0_15px_rgba(114,229,248,0.1)]">
            Mark Your Calendar
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Track Background */}
          <div className="absolute left-4 md:left-[220px] top-0 bottom-0 w-[2px] bg-white/10" />
          
          {/* Vertical Track Fill */}
          <motion.div
            style={{ height }}
            className="absolute left-4 md:left-[220px] top-0 w-[2px] bg-gradient-to-b from-bioluminance to-current-cta origin-top drop-shadow-[0_0_8px_rgba(114,229,248,0.6)]"
          />

          <div className="flex flex-col gap-24">
            {events.map((event, index) => (
              <div key={index} className="relative flex flex-col md:flex-row md:gap-16 w-full group">
                
                {/* Date / Left Side */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="md:w-[180px] pt-1 pl-12 md:pl-0 md:text-right sticky top-32 self-start hidden md:block"
                >
                  <span className="font-mono text-sm text-bioluminance bg-bioluminance/10 px-4 py-2 rounded-full border border-bioluminance/20 shadow-[0_0_15px_rgba(114,229,248,0.1)] group-hover:bg-bioluminance/20 group-hover:border-bioluminance/40 transition-colors duration-300">
                    {event.date}
                  </span>
                </motion.div>

                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute left-[11px] md:left-[215px] top-2.5 w-3 h-3 rounded-full bg-abyss border-2 border-bioluminance z-10 shadow-[0_0_10px_rgba(114,229,248,0.8)] group-hover:scale-125 group-hover:bg-bioluminance transition-all duration-300"
                />

                {/* Mobile Date */}
                <div className="pl-12 md:hidden mb-4 pt-1">
                  <span className="font-mono text-xs text-bioluminance bg-bioluminance/10 px-3 py-1.5 rounded-full border border-bioluminance/20 inline-block">
                    {event.date}
                  </span>
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="pl-12 md:pl-0 flex-1"
                >
                  <div className="p-6 md:p-8 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl shadow-2xl hover:bg-white/[0.06] hover:border-bioluminance/30 hover:shadow-[0_0_30px_rgba(114,229,248,0.1)] transition-all duration-300 transform hover:-translate-y-1">
                    <h3 className="font-body font-medium text-xl md:text-2xl text-white mb-3 group-hover:text-bioluminance transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="font-body text-gray-400 text-sm md:text-base leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                      {event.desc}
                    </p>

                    {SHOW_TIMELINE_IMAGES && event.images.length > 0 && (
                      <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                        {event.images.map((src, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 snap-center"
                          >
                            <Image
                              src={src}
                              alt={`${event.title} image`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
