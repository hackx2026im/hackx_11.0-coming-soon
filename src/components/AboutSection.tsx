"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Users, TrendingUp, Volume2, VolumeX, Maximize2, Minimize2, X } from "lucide-react";
import Player from "@vimeo/player";
import { useLanguage } from "@/context/LanguageContext";

export function AboutSection() {
  const { strings } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (iframeRef.current && !playerRef.current) {
      playerRef.current = new Player(iframeRef.current);
      
      // Hide the video until it actually starts playing to prevent white flashes or loading thumbnails
      playerRef.current.on('play', () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.setVolume(1);
        setIsMuted(false);
      } else {
        playerRef.current.setVolume(0);
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    // When the modal closes, resume playing the background video
    if (playerRef.current) {
      setTimeout(() => {
        playerRef.current?.play().catch((err) => console.log("Auto-resume failed:", err));
      }, 500); // Wait for modal animation to finish unmounting the other iframe
    }
  };

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
    <section className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-[#010E13] overflow-hidden">
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
          <h2 className="font-display text-3xl md:text-5xl text-white tracking-wider uppercase drop-shadow-[0_0_15px_rgba(114,229,248,0.1)]">
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

          {/* Right Side: Video wrapped in Glass Card */}
          <div className="flex-1 w-full flex flex-col justify-center mt-8 lg:mt-0 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-full relative p-3 sm:p-5 md:p-6 rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] group/card overflow-hidden"
            >
              {/* Subtle IM logo color gradient in the card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4ab2a6]/10 via-transparent to-transparent pointer-events-none" />
              
              {/* Video Container (Thumbnail) */}
              <div className="w-full relative aspect-video rounded-[1.25rem] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black/50 border border-white/10 group-hover/card:scale-[1.02] transform transition-all duration-500 group/video">
                <iframe
                  ref={iframeRef}
                  src="https://player.vimeo.com/video/1198058883?autoplay=1&muted=1&background=1&transparent=0"
                  className={`absolute inset-0 w-full h-full border-0 z-0 pointer-events-none transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
                
                {/* Fallback loading skeleton/background while video buffers */}
                {!isVideoLoaded && (
                  <div className="absolute inset-0 z-0 bg-[#010E13] flex items-center justify-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-bioluminance/20 border-t-bioluminance rounded-full animate-spin" />
                  </div>
                )}
                
                {/* Glass UI Controls Overlay */}
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                    className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#4ab2a6] hover:text-[#010E13] hover:border-transparent hover:scale-110 transition-all shadow-lg"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
                    className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#4ab2a6] hover:text-[#010E13] hover:border-transparent hover:scale-110 transition-all shadow-lg"
                    title="Maximize to Popup"
                  >
                    <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
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
                      <div className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] group-hover/item:border-bioluminance/30 group-hover/item:bg-bioluminance/10 transition-all duration-500 ease-out transform group-hover/item:-translate-y-1 group-hover/item:shadow-[0_0_20px_rgba(114,229,248,0.15)]">
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

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#010E13]/90 backdrop-blur-md"
            onClick={closeFullscreen}
          >
            <motion.div
              layoutId="video-player"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeFullscreen}
                className="absolute top-4 right-4 z-30 p-2.5 bg-black/60 hover:bg-black/90 hover:scale-110 rounded-full text-white transition-all backdrop-blur-md border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src="https://player.vimeo.com/video/1198058883?autoplay=1"
                className="w-full h-full border-0 z-20 absolute inset-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
