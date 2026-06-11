import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const mortend = localFont({
  src: [
    {
      path: '../../public/title font/mortend-mortend-light-200.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/title font/mortend-mortend-regular-400.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/title font/mortend-mortend-bold-700.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/title font/mortend-mortend-extra-bold-800.ttf',
      weight: '800',
      style: 'normal',
    }
  ],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hackX 11.0 | Coming Soon",
  description: "Sri Lanka's premier inter-university startup challenge.",
  icons: {
    icon: "/Xlogo-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mortend.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-body">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
