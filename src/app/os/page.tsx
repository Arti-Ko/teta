import type { Metadata } from "next";
import OsClient from "./OsClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-gstack-app.vercel.app";

export const metadata: Metadata = {
  title: "ARTI.OS — Интерактивное резюме",
  description:
    "Интерактивная OS-среда с профилем, навыками и кейсами Артема Козыренко. Business Analyst: Purrweb, Т-Банк. Финтех, AI/ML, SaaS.",
  alternates: {
    canonical: `${siteUrl}/os`,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/os`,
    locale: "ru_RU",
    siteName: "Артем Козыренко",
    title: "ARTI.OS — Интерактивное резюме Артема Козыренко",
    description:
      "Откройте интерактивную OS с профилем, навыками и проектами BA.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ARTI.OS — Артем Козыренко" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARTI.OS — Интерактивное резюме Артема Козыренко",
    description: "Интерактивная OS-среда. BA: Purrweb, Т-Банк. Финтех, AI/ML, SaaS.",
    images: [{ url: "/opengraph-image", alt: "ARTI.OS — Артем Козыренко" }],
  },
};

export default function OsPage() {
  return <OsClient />;
}
