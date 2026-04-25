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
  { name: "Тете.pdf",               type: "pdf",  size: "—",     folder: "Спецификации" },
  { name: "Process_Diagram.jpg",    type: "jpg",  size: "—",     folder: "Схемы"        },
  { name: "SportTech_Analytics.jpg",type: "jpg",  size: "—",     folder: "Схемы"        },
  { name: "IT_Research_v2.docx",    type: "docx", size: "—",     folder: "Исследования" },
];
