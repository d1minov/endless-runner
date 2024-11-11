import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        test1: '/index.html',
        test2: '/game.html'
      }
    }
  }
})