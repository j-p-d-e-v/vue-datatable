import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";
import libCss from "vite-plugin-libcss";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      useFsEvents: true,
    },
  },
  build: {
    lib: {
      "entry": "src/index.ts",
      "name": "VDataTablePlugin",
      "fileName": (format) => `v-data-table-plugin.${format}.js`,
    },
    rollupOptions: {
      external: "vue",
      output: {
        globals: {
          vue: "Vue"
        },
        exports: "named", 
      }
    }
  },
  plugins: [vue(), vueDevTools(), tailwindcss(),libCss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
