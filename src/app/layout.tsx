import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Mono, Space_Grotesk, Noto_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-gstack-app.vercel.app";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0F0E" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Артем Козыренко — Business Analyst",
    template: "%s | Артем Козыренко",
  },
  description:
    "Портфолио Business Analyst с 4+ годами опыта. Финтех (Т-Банк, Purrweb), AI/ML, SaaS. 15+ успешных проектов. Открыт к предложениям.",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "ru_RU",
    siteName: "Артем Козыренко",
    title: "Артем Козыренко — Business Analyst",
    description: "BA. Финтех, AI/ML, SaaS-платформы. 4+ года, 15+ проектов.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Артем Козыренко — Business Analyst" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Артем Козыренко — Business Analyst",
    description: "BA. Финтех, AI/ML, SaaS-платформы. 4+ года, 15+ проектов.",
    images: [{ url: "/opengraph-image", alt: "Артем Козыренко — Business Analyst" }],
  },
  robots: { index: true, follow: true },
  verification: { google: "-Ecb7X2duBqC67zqkRcgCEVmf55-T5VBiAVpJ7lFwoI" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Артем Козыренко",
  jobTitle: "Business Analyst",
  url: siteUrl,
  image: `${siteUrl}/avatar.jpg`,
  sameAs: ["https://t.me/SleepyCoffeeT", "https://www.linkedin.com/in/kozyrenko"],
  email: "arti.k.renko@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Omsk", addressCountry: "RU" },
  knowsAbout: [
    "Business Analysis", "Systems Analysis", "BABOK", "BPMN 2.0", "UML", "ArchiMate", "TOGAF",
    "Requirements Engineering", "User Story", "Use Case", "BDD", "Agile", "SAFe", "Scrum",
    "SQL", "Python", "Power BI", "dbt", "Data Governance",
    "REST API", "OpenAPI", "Kafka", "gRPC", "Fintech", "AI/ML", "LLM", "RAG", "SaaS",
    "Confluence", "Jira", "Miro", "Figma",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${dmSans.variable} ${spaceMono.variable} ${spaceGrotesk.variable} ${notoSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash-of-wrong-theme by reading localStorage before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
