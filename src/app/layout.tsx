import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-gstack-app.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "G-Stack App",
    template: "%s | G-Stack App",
  },
  description: "G-Stack App — built with Next.js, Supabase, and Tailwind CSS.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "G-Stack App",
    title: "G-Stack App",
    description: "G-Stack App — built with Next.js, Supabase, and Tailwind CSS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "G-Stack App",
    description: "G-Stack App — built with Next.js, Supabase, and Tailwind CSS.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "-Ecb7X2duBqC67zqkRcgCEVmf55-T5VBiAVpJ7lFwoI",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "G-Stack App",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
