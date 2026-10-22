import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/atlas-ideias-politicas/",
  test: {
    environment: "jsdom",
    include: ["src/tests/**/*.test.{ts,tsx}"],
    setupFiles: ["src/tests/setup.ts"],
  },
  build: { chunkSizeWarningLimit: 900 },
});
