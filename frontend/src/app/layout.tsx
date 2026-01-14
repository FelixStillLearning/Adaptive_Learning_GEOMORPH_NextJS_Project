
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Emotion-Aware Adaptive Learning",
  description: "Futuristic AI-based Math Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="permissions-policy" content="accelerometer=(), autoplay=(), camera=(), clipboard-write=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()" />
      </head>
      <body className={cn(
        "min-h-screen bg-slate-950 font-sans antialiased",
        inter.variable,
        outfit.variable
      )}>
        {children}
      </body>
    </html>
  );
}
