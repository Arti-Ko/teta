export type ArtifactType = "pdf" | "png" | "jpg" | "jpeg" | "docx" | "xlsx" | "pptx" | "txt" | "html";

export interface Artifact {
  name: string;
  type: ArtifactType;
  size: string;
}

// Place your files in public/artifacts/ — filenames here must match exactly.
export const ARTIFACTS: Artifact[] = [
  { name: "Тете.pdf",                    type: "pdf",  size: "232 KB" },
  { name: "IT_Research_v2.docx",         type: "docx", size: "36 KB"  },
  { name: "portfolio.html",              type: "html", size: "40 KB"  },
  { name: "2026-04-20 10-39-12.txt",     type: "txt",  size: "8 KB"   },
  { name: "a2c917921dded297528115e18ddfa6c9.jpg", type: "jpg", size: "76 KB" },
  { name: "Футбол - Frame 4 (1).jpg",    type: "jpg",  size: "1.2 MB" },
];
