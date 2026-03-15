import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const basePath = normalizeBasePath(
    env.VITE_APP_BASE_PATH || (mode === 'production' ? '/SoccerStat/' : '/'),
  )

  return {
    base: basePath,
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) {
              return
            }

            if (id.includes('react-router-dom')) {
              return 'vendor-router'
            }

            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query'
            }

            if (
              id.includes('/node_modules/rc-') ||
              id.includes('/node_modules/@rc-component/')
            ) {
              return 'vendor-antd-rc'
            }

            if (id.includes('/node_modules/antd/es/')) {
              const antdModule = id.split('/node_modules/antd/es/')[1]?.split('/')[0]

              if (antdModule) {
                return `vendor-antd-${antdModule}`
              }
            }

            if (
              id.includes('/node_modules/antd/') ||
              id.includes('/node_modules/@ant-design/')
            ) {
              return 'vendor-antd-core'
            }

            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react'
            }

            return 'vendor-misc'
          },
        },
      },
    },
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
      svgr(),
      babel({ presets: [reactCompilerPreset()] }),
      ...(mode === 'analyze'
        ? [
            visualizer({
              open: true,
              gzipSize: true,
              brotliSize: true,
              filename: 'bundle_statistics.html',
            }),
          ]
        : []),
    ],
  }
})
