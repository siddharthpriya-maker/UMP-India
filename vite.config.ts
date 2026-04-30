import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

function figmaAssetPlugin() {
  return {
    name: "figma-asset-resolver",
    resolveId(source: string) {
      if (source.startsWith("figma:asset/")) {
        const filename = source.replace("figma:asset/", "");
        return path.resolve(__dirname, "src/assets/figma", filename);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), figmaAssetPlugin()],
  // Listen on all interfaces so `http://127.0.0.1:PORT` works, not only `localhost`
  // (default can bind to IPv6-only; embedded browsers and bookmarks often use 127.0.0.1).
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
});
