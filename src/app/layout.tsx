import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-gstack-app.vercel.app";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Артем Козыренко — Senior Business Analyst",
    template: "%s | Артем Козыренко",
  },
  description:
    "Портфолио Senior Business Analyst с 6+ лет опыта. Финтех (Sber, Tinkoff), ретейл (X5 Group), аналитика данных. Открыт к предложениям.",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Артем Козыренко",
    title: "Артем Козыренко — Senior Business Analyst",
    description: "Senior BA. Финтех, ретейл, платформы. 6+ лет, 34 проекта.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Артем Козыренко — Senior Business Analyst",
    description: "Senior BA. Финтех, ретейл, платформы. 6+ лет, 34 проекта.",
  },
  robots: { index: true, follow: true },
  verification: { google: "-Ecb7X2duBqC67zqkRcgCEVmf55-T5VBiAVpJ7lFwoI" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Артем Козыренко",
  jobTitle: "Senior Business Analyst",
  url: siteUrl,
  sameAs: ["https://t.me/SleepyCoffeeT"],
  email: "arti.k.renko@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Omsk", addressCountry: "RU" },
  knowsAbout: ["Business Analysis", "BPMN", "BABOK", "SQL", "Kafka", "REST API", "Data Governance"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
