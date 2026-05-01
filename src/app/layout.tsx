import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ElectIQ — Your AI-Powered Election Guide",
  description:
    "ElectIQ is a conversational AI civic assistant that helps citizens understand elections end-to-end — registration, candidates, voting, results, and transparency. Powered by Google Gemini.",
  keywords: [
    "election guide",
    "voting assistant",
    "civic tech",
    "AI election",
    "voter registration",
    "India elections",
    "Gemini AI",
    "ElectIQ",
  ],
  openGraph: {
    title: "ElectIQ — Your AI-Powered Election Guide",
    description:
      "Understand every vote. Exercise every right. AI-powered civic guidance for every citizen.",
    type: "website",
    locale: "en_IN",
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
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-heading)' }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-white focus:rounded-lg focus:font-bold"
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
