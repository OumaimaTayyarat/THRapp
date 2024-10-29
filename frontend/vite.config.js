import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: {
      overlay: false, // Disable the overlay if needed
    },
  },
  build: {
    outDir: 'dist', // Spécifie le répertoire de sortie
    sourcemap: true, // Génère des sourcemaps pour le débogage
  },
})
