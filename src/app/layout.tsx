import type { Metadata } from "next";
import { DM_Sans, Space_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-gstack-app.vercel.app";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Артем Козыренко — Senior Business Analyst",
    template: "%s | Артем Козыренко",
  },
  description:
    "Портфолио Senior Business Analyst с 4+ годами опыта. Финтех (Т-Банк, Purrweb), AI/ML, SaaS. 15+ успешных проектов. Открыт к предложениям.",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "ru_RU",
    siteName: "Артем Козыренко",
    title: "Артем Козыренко — Senior Business Analyst",
    description: "Senior BA. Финтех, AI/ML, SaaS-платформы. 4+ года, 15+ проектов.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Артем Козыренко — Senior Business Analyst",
    description: "Senior BA. Финтех, AI/ML, SaaS-платформы. 4+ года, 15+ проектов.",
    images: [{ url: "/opengraph-image", alt: "Артем Козыренко — Senior Business Analyst" }],
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
  sameAs: ["https://t.me/SleepyCoffeeT", "https://linkedin.com/in/kozyrenko"],
  email: "arti.k.renko@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Omsk", addressCountry: "RU" },
  knowsAbout: ["Business Analysis", "BPMN", "BABOK", "SQL", "Kafka", "REST API", "Data Governance"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${dmSans.variable} ${spaceMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#F7F6F2" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
