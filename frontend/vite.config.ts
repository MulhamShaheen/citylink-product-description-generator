import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  build: {
    cssMinify: "lightningcss",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../"),
    },
  },
});
