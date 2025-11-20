import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { RoadmapProvider } from "@/context/RoadmapContext";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Compass.ai - AI-Powered Learning Roadmaps",
  description: "A generic, schema-driven roadmap viewer for AI PM roadmaps and other structured learning paths",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistMono.variable} antialiased bg-bg-primary text-text-primary transition-colors duration-300`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="serene"
            enableSystem={false}
            disableTransitionOnChange
          >
            <RoadmapProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
            </RoadmapProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
