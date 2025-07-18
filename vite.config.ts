import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import "dotenv/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  envDir: 'env-files',
  resolve: {
    alias: [{
     find: "@", replacement: path.resolve(__dirname, "./src"),
    },]
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});