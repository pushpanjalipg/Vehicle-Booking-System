import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // 👈 vitest ko browser-like environment milega
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
})
