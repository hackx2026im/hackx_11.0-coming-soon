"use client";

import React from "react";
import { motion } from "framer-motion";

export function RewardsSection() {
  const items = [
    {
      title: "National Guidance",
      desc: "Direct support from national government organizations.",
    },
    {
      title: "Elite Mentorship",
      desc: "Exclusive coaching from industry leaders for teams advancing from the semi-finals onwards.",
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-[#010814] border-y border-white/[0.05]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4 tracking-wider">
            More Than Just a Competition
          </h2>
        </motion.div>

        <div className="flex flex-col border-t border-white/[0.08]">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col md:flex-row md:items-center py-8 border-b border-white/[0.08] hover:bg-white/[0.02] transition-colors -mx-4 px-4"
            >
              <div className="md:w-1/3 mb-2 md:mb-0">
                <h3 className="font-body text-xl text-white">
                  {item.title}
                </h3>
              </div>
              <div className="md:w-2/3">
                <p className="font-body text-lg text-gray-400">
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
