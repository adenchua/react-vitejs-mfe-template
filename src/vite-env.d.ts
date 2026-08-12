/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

// Keep in sync with env.schema.ts's Zod schema — this file can't import
// that schema (no imports allowed here, or the ImportMetaEnv augmentation
// breaks), so the two are hand-duplicated.
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
