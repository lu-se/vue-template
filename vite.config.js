import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
// import { resolve, dirname } from 'node:path'
// import { fileURLToPath } from 'node:url'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({ /* options */ }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    // Below would be needed if we built the package
    // rollupOptions: {
    //   external: ['vue', 'vue-router', 'vue-i18n', '@fortawesome/fontawesome-svg-core', '@fortawesome/pro-solid-svg-icons', '@fortawesome/pro-light-svg-icons', '@fortawesome/vue-fontawesome'],
    // },
  },
  server: {
    port: 8080, // default 3000
  },
  preview: {
    port: 8080, // default 5000 which doesn't work with chrome
  },
})
