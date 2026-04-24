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
  { name: "AI_Scoring_BRD.pdf",          type: "pdf",  size: "420 KB", folder: "Спецификации" },
  { name: "LLM_RAG_Architecture.pdf",    type: "pdf",  size: "310 KB", folder: "Спецификации" },
  { name: "BPMN_Credit_Pipeline.png",    type: "png",  size: "540 KB", folder: "Схемы"        },
  { name: "Data_Governance_Model.png",   type: "png",  size: "380 KB", folder: "Схемы"        },
  { name: "Fintech_IT_Research.docx",    type: "docx", size: "64 KB",  folder: "Исследования" },
  { name: "SaaS_Discovery_Report.docx",  type: "docx", size: "48 KB",  folder: "Исследования" },
];
