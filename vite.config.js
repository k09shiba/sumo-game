import { defineConfig } from 'vite'

export default defineConfig({
  base: '/sumo-game/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  }
})
