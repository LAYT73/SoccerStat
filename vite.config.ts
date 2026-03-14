import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint .',
      },
    }),
  ],
})
