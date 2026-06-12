"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Loader2 } from "lucide-react";

interface LeadFormProps {
  onSuccess?: () => void;
}

export function LeadForm({ onSuccess }: LeadFormProps) {
  const { strings, language } = useLanguage();

  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!strings || !language) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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
        body: JSON.stringify({ name, university, phone: cleanPhone, email, lang: language }),
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

      <div>
        <input
          type="text"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          placeholder={strings.uniPlaceholder}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-bioluminance/50 transition-colors font-body"
        />
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

      {!showEmailInput ? (
        <button
          type="button"
          onClick={() => setShowEmailInput(true)}
          className="text-left text-sm text-gray-400 hover:text-white transition-colors font-body mb-2"
        >
          + Get more info via email
        </button>
      ) : (
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={strings.emailPlaceholder}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-bioluminance/50 transition-colors font-body"
          />
        </div>
      )}

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
