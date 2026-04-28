import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TimeProvider } from "@/hooks/useTimeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timetraveler | Modern Timezone Converter",
  description: "Instant, accurate timezone comparisons for global teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TimeProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-[var(--border)] py-4 bg-[var(--card-bg)] sticky top-0 z-10">
              <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-brand tracking-tight flex items-center gap-2">
                  <span className="bg-brand text-white p-1 rounded">TT</span>
                  Timetraveler
                </h1>
                <nav className="text-sm text-gray-500 font-medium">
                  Client-Only Time Engine
                </nav>
              </div>
            </header>
            <main className="flex-grow mx-auto px-4 py-8 w-full max-w-[80%]">
              {children}
            </main>
            <footer className="py-8 border-t border-[var(--border)] text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Timetraveler. Minimalist Time Utility.
            </footer>
          </div>
        </TimeProvider>
      </body>
    </html>
  );
}
