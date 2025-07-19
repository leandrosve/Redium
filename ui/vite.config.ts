/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo (dev/production)
  const env = loadEnv(mode, process.cwd(), "");

  // Determinar el base path dinámicamente
  const base = env.VITE_GH_PAGES === "true" ? "/redium" : "/";
  return {
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    test: {
      environment: "jsdom",
      globals: true, // para usar describe/it/expect sin importar
      setupFiles: "./tests/setupTests.ts",
    },
    base: base,
  };
});
