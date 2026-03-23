import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/gsap/") ||
            id.includes("node_modules/@gsap/")
          ) {
            return "gsap";
          }

          if (id.includes("node_modules/lenis/")) {
            return "lenis";
          }

          if (
            id.includes("node_modules/@sanity/client/") ||
            id.includes("node_modules/@sanity/image-url/")
          ) {
            return "sanity";
          }

          return undefined;
        },
      },
    },
  },
});
