import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/f2e-3rd-tour-guide/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
