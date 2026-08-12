import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import envSchema from "./env.schema.ts";

export default defineConfig(({ mode }) => {
  // Third arg 'VITE_' filters loadEnv's result to only VITE_-prefixed keys,
  // matching the "only VITE_-prefixed vars reach client code" rule. loadEnv
  // already implements the .env < .env.{mode} < .env.{mode}.local < real
  // process.env priority this project relies on.
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const parsed = envSchema.safeParse(env);
  if (!parsed.success) {
    console.error(`\nInvalid environment variables for mode "${mode}":\n`);
    for (const issue of parsed.error.issues) {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    }
    console.error("");
    throw new Error("Invalid environment variables. Aborting build.");
  }

  return {
    plugins: [
      react(),
      federation({
        name: "example-remote-app",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App.tsx",
          "./routes": "./src/routes/index.tsx",
          "./ExampleWidget": "./src/components/ExampleWidget.tsx",
        },
        // The root tsconfig.json is solution-style (no compilerOptions of
        // its own — see tsconfig.app.json/tsconfig.node.json), but the DTS
        // generator defaults to reading it directly and needs `jsx` set to
        // compile the exposed .tsx files. Point it at tsconfig.app.json.
        dts: {
          tsConfigPath: "./tsconfig.app.json",
        },
        shared: {
          react: { singleton: true, requiredVersion: "^19.2.8" },
          "react-dom": { singleton: true, requiredVersion: "^19.2.8" },
          "react-router-dom": { singleton: true, requiredVersion: "^7.18.2" },
        },
      }),
    ],
    build: {
      // Module Federation's runtime relies on top-level await; chrome89 is
      // the documented minimum baseline target for @module-federation/vite.
      target: "chrome89",
      // Separate output dirs per mode so staging and production builds can
      // coexist on disk for side-by-side verification, instead of the
      // second build's emptyOutDir wiping the first.
      outDir: mode === "staging" ? "dist/staging" : "dist/production",
    },
  };
});
