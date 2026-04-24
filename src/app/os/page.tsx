import type { Metadata } from "next";
import OsClient from "./OsClient";

export const metadata: Metadata = {
  title: "ARTI.OS — Интерактивное резюме",
  description:
    "Интерактивная OS-среда с профилем, навыками и кейсами Артема Козыренко. Senior Business Analyst: Sber, Tinkoff, X5 Group.",
  openGraph: {
    title: "ARTI.OS — Интерактивное резюме Артема Козыренко",
    description:
      "Откройте интерактивную OS с профилем, навыками и проектами Senior BA.",
  },
};

export default function OsPage() {
  return <OsClient />;
}
