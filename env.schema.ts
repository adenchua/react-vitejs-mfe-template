import { z } from "zod";

// Keep in sync with src/vite-env.d.ts's ImportMetaEnv interface — that file
// can't import this schema (no imports allowed there, or the
// ImportMetaEnv augmentation breaks), so the two are hand-duplicated.
const envSchema = z.object({
  VITE_API_BASE_URL: z.url(),
  VITE_APP_TITLE: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

export default envSchema;
