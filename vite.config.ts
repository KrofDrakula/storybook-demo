import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/main.ts"),
      name: "UIKit",
      fileName: "ui-kit",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
