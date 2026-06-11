"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Loader2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LeadFormProps {
  onSuccess?: () => void;
}

export function LeadForm({ onSuccess }: LeadFormProps) {
  const { strings, language } = useLanguage();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!strings || !language) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select a role.");
      return;
    }
    // 1. Remove all spaces, dashes, and parentheses to normalize the number
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    // 2. Validate against Sri Lankan mobile number format (starts with +947, 947, or 07, followed by 8 digits)
    const slPhoneRegex = /^(?:\+94|94|0)7\d{8}$/;
    if (!cleanPhone || !slPhoneRegex.test(cleanPhone)) {
      setError("Please enter a valid Sri Lankan WhatsApp number (e.g., +94 77 123 4567 or 077 123 4567).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, phone: cleanPhone, lang: language }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setIsSuccess(true);
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-bioluminance/10 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-bioluminance" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-white mb-2">{strings.successTitle}</h3>
        <p className="font-body text-gray-400">{strings.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 text-sm font-body">
          {error}
        </div>
      )}

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={strings.namePlaceholder}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-bioluminance/50 transition-colors font-body"
        />
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full flex items-center justify-between bg-white/5 border ${isDropdownOpen ? "border-bioluminance/50" : "border-white/10"} rounded-lg px-5 py-4 focus:outline-none transition-colors font-body ${role ? "text-white" : "text-gray-500"}`}
        >
          <span>{role || strings.rolePlaceholder}</span>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-bioluminance/30 rounded-xl overflow-hidden z-[100] shadow-[0_10px_40px_rgba(0,0,0,0.8)] shadow-bioluminance/10"
            >
              <div className="py-1">
                {strings.roleOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setRole(opt);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-5 py-3.5 hover:bg-white/5 text-gray-300 hover:text-white transition-colors font-body border-b border-white/5 last:border-0 flex items-center justify-between group"
                  >
                    <span>{opt}</span>
                    {role === opt && (
                      <div className="w-2 h-2 rounded-full bg-bioluminance shadow-[0_0_8px_rgba(114,229,248,0.8)]" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder={strings.phonePlaceholder}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-bioluminance/50 transition-colors font-body"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white hover:bg-gray-200 text-black font-semibold font-body py-4 rounded-full mt-2 transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            Processing...
          </>
        ) : (
          strings.submitBtn
        )}
      </button>
    </form>
  );
}
