import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
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
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"',
        useFlatConfig: true,
      },
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'bundle_statistics.html',
    }),
  ],
})
