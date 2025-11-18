import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { RoadmapProvider } from "@/context/RoadmapContext";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roadmap Viewer - Schema-Driven Roadmap Visualization",
  description: "A generic, schema-driven roadmap viewer for AI PM roadmaps and other structured learning paths",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-black`}
        >
          <RoadmapProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
          </RoadmapProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
