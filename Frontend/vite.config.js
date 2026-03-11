import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tailwindConfig from './tailwind.config.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(tailwindConfig),
  ],
  server:{port:5173},
})
