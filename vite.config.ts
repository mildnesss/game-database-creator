import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "pp-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: [
      "preview--game-database-creator.poehali.dev",
      "localhost",
      "127.0.0.1",
    ],
    hmr: {
      overlay: false,
      host: "preview--game-database-creator.poehali.dev",
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: [
      "preview--game-database-creator.poehali.dev",
      "localhost",
      "127.0.0.1",
    ],
  },
}));
