export type ArtifactType = "pdf" | "png" | "jpg" | "jpeg" | "docx" | "xlsx" | "pptx" | "txt";

export interface Artifact {
  name: string;
  type: ArtifactType;
  size: string;
}

// Place your files in public/artifacts/ — filenames here must match exactly.
export const ARTIFACTS: Artifact[] = [];
