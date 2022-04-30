import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    plugins: [vue()],
    base: '/f2e-3rd-tour-guide/',
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  })
}
