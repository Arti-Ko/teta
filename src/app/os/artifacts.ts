export type ArtifactType = "pdf" | "png" | "jpg" | "jpeg" | "docx" | "xlsx" | "pptx" | "txt" | "html";

export interface ArtifactFolder {
  name: string;
  description: string;
}

export interface Artifact {
  name: string;
  type: ArtifactType;
  size: string;
  folder: string;
}

// Subfolders — add new folders here and place matching dirs in public/artifacts/
export const FOLDERS: ArtifactFolder[] = [
  { name: "Спецификации", description: "ТЗ, BRD, SRS, требования" },
  { name: "Схемы",        description: "BPMN, UML, диаграммы процессов" },
  { name: "Исследования", description: "Аналитика, исследования, отчёты" },
  { name: "Прочее",       description: "Прочие артефакты" },
];

// Place files in public/artifacts/<folder>/ — name must match exactly.
export const ARTIFACTS: Artifact[] = [
  { name: "Тете.pdf",                             type: "pdf",  size: "232 KB", folder: "Спецификации" },
  { name: "IT_Research_v2.docx",                  type: "docx", size: "36 KB",  folder: "Исследования" },
  { name: "portfolio.html",                       type: "html", size: "40 KB",  folder: "Прочее"       },
  { name: "2026-04-20 10-39-12.txt",              type: "txt",  size: "8 KB",   folder: "Прочее"       },
  { name: "a2c917921dded297528115e18ddfa6c9.jpg", type: "jpg",  size: "76 KB",  folder: "Схемы"        },
  { name: "Футбол - Frame 4 (1).jpg",             type: "jpg",  size: "1.2 MB", folder: "Схемы"        },
];
