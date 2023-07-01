import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/main.ts", import.meta.url)),
      formats: ["es"],
      fileName: "main"
    },
    rollupOptions: {
      external: [
        "fs",
        "node:path",
        "os",
        "path",
        "https",
        "net",
        "tls",
        "http",
        "events",
        "assert",
        "util"
      ],
      output: {
        globals: {
          fs: "fs",
          "node:path": "node:path",
          os: "os",
          path: "path",
          https: "https",
          net: "net",
          tls: "tls",
          http: "http",
          events: "events",
          assert: "assert",
          util: "util"
        }
      }
    }
  }
});
