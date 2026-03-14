import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    checker({
      typescript: true,
    }),
  ],
})
