import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Capture-Now | Daily Notes App",
  description: "Capture your thoughts and ideas instantly with Capture-Now - A modern daily notes application",
  keywords: ["notes", "daily notes", "productivity", "thoughts", "capture"],
  authors: [{ name: "Brian Jaén" }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
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
    <html lang="es" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="h-full bg-background text-primary font-sans antialiased">
        <div className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
