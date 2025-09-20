import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rohan Akode - Web Developer Portfolio",
  description: "Full-stack web developer specializing in React, Next.js, and modern web technologies",
  keywords: ["web developer", "react", "nextjs", "typescript", "portfolio"],
  authors: [{ name: "Rohan Akode" }],
  creator: "Rohan Akode",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rohanakode.dev",
    title: "Rohan Akode - Web Developer Portfolio",
    description: "Full-stack web developer specializing in React, Next.js, and modern web technologies",
    siteName: "Rohan Akode Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Akode - Web Developer Portfolio",
    description: "Full-stack web developer specializing in React, Next.js, and modern web technologies",
    creator: "@rohanakode",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
