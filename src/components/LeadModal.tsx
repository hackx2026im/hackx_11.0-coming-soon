"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { X, Loader2 } from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── Registration target date ── */
const REGISTRATION_DATE = new Date("2026-06-23T00:00:00+05:30");

function getTimeLeft() {
  const now = new Date();
  const diff = Math.max(0, REGISTRATION_DATE.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* ── Flip card that mimics the classic split-flap display ── */
function FlipCard({ value }: { value: number }) {
  const display = String(value);
  const prevRef = useRef(display);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = prevRef.current;
    if (prev === display) return;
    prevRef.current = display;

    const el = cardRef.current;
    if (!el) return;

    // Remove old animation elements
    el.querySelectorAll(".top-flip, .bottom-flip").forEach((n) => n.remove());

    // Create top-flip (shows OLD value, flips down)
    const topFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    topFlip.textContent = prev;

    // Create bottom-flip (shows NEW value, flips up into place)
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add("bottom-flip");
    bottomFlip.textContent = display;

    // Update the static bottom half to new value immediately
    const topEl = el.querySelector(".top") as HTMLElement;
    const bottomEl = el.querySelector(".bottom") as HTMLElement;

    el.appendChild(topFlip);
    el.appendChild(bottomFlip);

    // After the top half finishes flipping, update it
    topFlip.addEventListener("animationend", () => {
      if (topEl) topEl.textContent = display;
      topFlip.remove();
    });

    bottomFlip.addEventListener("animationend", () => {
      if (bottomEl) bottomEl.textContent = display;
      bottomFlip.remove();
    });

    // Update bottom immediately so it shows through
    if (bottomEl) bottomEl.textContent = display;
  }, [display]);

  return (
    <div className="flip-card" ref={cardRef}>
      <div className="top">{display}</div>
      <div className="bottom">{display}</div>
    </div>
  );
}

/* ── A time segment: two flip cards (tens + ones) with a label ── */
function TimerSegment({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-1.5">
      <div className="flex gap-[2px] text-[1.1rem] sm:text-[1.4rem] md:text-[1.7rem]">
        <FlipCard value={tens} />
        <FlipCard value={ones} />
      </div>
      <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-bioluminance/60 font-body">
        {label}
      </span>
    </div>
  );
}

/* ── Colon separator ── */
function ColonSep() {
  return (
    <motion.div
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col gap-1 sm:gap-1.5 items-center justify-center self-start h-[1.5em] sm:h-[1.5em] md:h-[1.5em] select-none"
      style={{ fontSize: "1.1rem" }}
    >
      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-bioluminance/50" />
      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-bioluminance/50" />
    </motion.div>
  );
}

function MultilingualAnnouncement() {
  return (
    <div className="relative w-full overflow-hidden flex justify-center">
      <p className="font-body text-sm sm:text-base text-gray-400 leading-relaxed text-center px-2">
        Join the notification list and be the first to know when registrations officially go live.
      </p>
    </div>
  );
}

/* ════════════════════════════════════════
   ██  LEAD MODAL  ██
   ════════════════════════════════════════ */
export function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const { strings, language } = useLanguage();

  /* ── Countdown ── */
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    if (!isOpen) return;
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [isOpen]);

  /* ── Form state ── */
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      if (!university) {
        setError("Please enter your university name.");
        return;
      }
      if (showEmailInput && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
      const slPhoneRegex = /^(?:\+94|94|0)7\d{8}$/;
      if (!cleanPhone || !slPhoneRegex.test(cleanPhone)) {
        setError(
          "Please enter a valid Sri Lankan WhatsApp number (e.g., +94 77 123 4567 or 077 123 4567)."
        );
        return;
      }
      setLoading(true);
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            university,
            phone: cleanPhone,
            email,
            lang: language,
          }),
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || "Failed to submit. Please try again.");
        setIsSuccess(true);
        setTimeout(onClose, 3000);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [name, university, phone, email, language, onClose]
  );

  if (!strings) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-abyss/85 backdrop-blur-md"
          />

          {/* ── Modal card ── */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl max-h-[95vh] overflow-y-auto rounded-2xl border border-white/[0.08] shadow-[0_0_80px_rgba(91,187,255,0.08),0_0_0_1px_rgba(91,187,255,0.05)] hide-scrollbar"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(10,59,120,0.18) 0%, rgba(1,8,20,0.97) 60%)",
            }}
          >
            {/* Top glow bar */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-bioluminance/50 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-bioluminance/[0.06] blur-3xl rounded-full pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ── Content ── */}
            <div className="px-5 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8 md:px-10 md:pt-12 md:pb-10 flex flex-col items-center text-center">
              {/* Headline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="font-body text-[10px] sm:text-xs tracking-[0.25em] text-bioluminance/70 mb-3 sm:mb-4"
              >
                hackX 11.0
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="font-display text-xl sm:text-2xl md:text-3xl text-white mb-6 sm:mb-8 leading-tight"
              >
                Registrations<br />Open In
              </motion.h2>

              {/* ── Flip-Card Countdown Timer ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
                className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
              >
                <TimerSegment value={time.days} label="Days" />
                <ColonSep />
                <TimerSegment value={time.hours} label="Hours" />
                <ColonSep />
                <TimerSegment value={time.minutes} label="Minutes" />
                <ColonSep />
                <TimerSegment value={time.seconds} label="Seconds" />
              </motion.div>

              {/* ── Multilingual rotating announcement ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="w-full max-w-[95%] sm:max-w-lg mb-6 sm:mb-8"
              >
                <MultilingualAnnouncement />
              </motion.div>

              {/* ── Form or Success ── */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="w-full"
              >
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-8 animate-in fade-in zoom-in duration-500">
                    <div className="w-14 h-14 bg-bioluminance/10 rounded-full flex items-center justify-center mb-4 ring-1 ring-bioluminance/20">
                      <svg
                        className="w-7 h-7 text-bioluminance"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl text-white mb-1">
                      {strings.successTitle}
                    </h3>
                    <p className="font-body text-gray-400 text-sm">
                      {strings.successBody}
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 w-full"
                  >
                    {error && (
                      <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 text-sm font-body text-left">
                        {error}
                      </div>
                    )}

                    {/* Name */}
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={strings.namePlaceholder}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 sm:py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-bioluminance/40 focus:bg-white/[0.06] transition-all duration-300 font-body"
                    />

                    {/* University Name */}
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder={strings.uniPlaceholder}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 sm:py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-bioluminance/40 focus:bg-white/[0.06] transition-all duration-300 font-body"
                    />

                    {/* Phone */}
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder={strings.phonePlaceholder}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 sm:py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-bioluminance/40 focus:bg-white/[0.06] transition-all duration-300 font-body"
                    />

                    {!showEmailInput ? (
                      <button
                        type="button"
                        onClick={() => setShowEmailInput(true)}
                        className="text-left text-sm text-gray-400 hover:text-white transition-colors font-body mt-2 mb-2 ml-1"
                      >
                        + Get more info via email
                      </button>
                    ) : (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={strings.emailPlaceholder}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 sm:py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-bioluminance/40 focus:bg-white/[0.06] transition-all duration-300 font-body"
                      />
                    )}

                    {/* CTA */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-white hover:bg-gray-200 text-black font-semibold font-body py-3.5 rounded-full mt-1 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4" />
                          Processing...
                        </>
                      ) : (
                        "Notify Me When Registrations Open"
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-16 bg-current-cta/[0.04] blur-2xl rounded-full pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
