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
});
