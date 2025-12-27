import type { Metadata } from "next";
import "./globals.css";
import { ConditionalSidebar } from "@/src/components/layout/ConditionalSidebar";
import { NavigationTracker } from '@/src/components/layout/NavigationTracker';


export const metadata: Metadata = {
  title: "Capture-Now | Daily Notes App",
  description: "Capture your thoughts and ideas instantly with Capture-Now - A modern daily notes application",
  keywords: ["notes", "daily notes", "productivity", "thoughts", "capture"],
  authors: [{ name: "Brian Jaén" }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="es" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="h-full bg-background text-primary font-sans antialiased">
        <NavigationTracker />
        <div className="h-screen bg-background md:flex">
          {/* Main content area with mobile spacing */}
          <main className="flex-1 overflow-auto pt-16 md:pt-0">
            <div className="min-h-full">
              <ConditionalSidebar>
                {children}
              </ConditionalSidebar>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
