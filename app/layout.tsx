import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import { PortfolioProvider } from "@/context/PortfolioContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://tejaswini-portfolio.vercel.app"),
  title: "Tejaswini Kummari | Computer Science Engineer & AI/ML Specialist",
  description:
    "Official personal portfolio of Tejaswini Kummari — Computer Science & Engineering graduate specializing in AI/ML, Full-Stack Web Architecture, and DevOps. Explorer of RazorPulse, Smart Analytics Engines, and NLP Chatbots.",
  keywords: [
    "Tejaswini Kummari",
    "Computer Science Engineer",
    "AI/ML Engineer",
    "Full-Stack Developer",
    "RazorPulse",
    "NLP Chatbot",
    "Data Science",
    "VBIT Hyderabad",
    "ServiceNow CSA",
    "DevOps",
  ],
  authors: [{ name: "Tejaswini Kummari", url: "https://github.com/Tejaswini2416" }],
  creator: "Tejaswini Kummari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tejaswini-portfolio.vercel.app",
    title: "Tejaswini Kummari | AI/ML & Full-Stack Developer",
    description:
      "Building RazorPulse, Smart Analytics Engines, and NLP Chatbots. Explore projects, credentials, and achievements.",
    siteName: "Tejaswini Kummari Portfolio",
    images: [
      {
        url: "/images/tej.jpeg",
        width: 1200,
        height: 1200,
        alt: "Tejaswini Kummari Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tejaswini Kummari | AI/ML & Full-Stack Developer",
    description: "Building RazorPulse, Smart Analytics Engines, and NLP Chatbots.",
    images: ["/images/tej.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#06080e] text-slate-100 antialiased relative flex flex-col justify-between selection:bg-cyan-500/30 selection:text-white">
        <PortfolioProvider>
          <BackgroundCanvas />
          <Navbar />
          <main className="relative z-10 flex-1 pt-24">{children}</main>
          <Footer />
        </PortfolioProvider>
      </body>
    </html>
  );
}
