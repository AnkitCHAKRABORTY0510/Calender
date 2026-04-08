import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import rvePlugin from 'react-tailwindcss-debugger/babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
      babel: {
        plugins: [rvePlugin]
      }
    }), tailwindcss()],
})
