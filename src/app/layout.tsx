import type { Metadata } from "next";
import { SourcePanel } from '@/components/SourcePanel';
import { AppProviders } from '@/components/AppProviders';
import { HeaderControls } from '@/components/HeaderControls';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Timetraveler",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport = {
  themeColor: "#228B22",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProviders>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-[var(--border)] bg-[var(--card-bg)] sticky top-0 z-10">
              <div className="px-4 py-3 flex items-center gap-4 overflow-x-auto">
                <h1 className="text-xl font-bold text-brand flex items-center gap-2 whitespace-nowrap">
                  <span className="bg-brand text-white px-1.5 py-0.5 rounded text-sm">TT</span>
                  Timetraveler
                </h1>
                <SourcePanel />
                <div className="ml-auto">
                  <HeaderControls />
                </div>
              </div>
            </header>
            <main className="flex-grow px-4 py-6">
              {children}
            </main>
            <footer className="py-8 border-t border-[var(--border)] text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Timetraveler. Minimalist Time Utility.
            </footer>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
