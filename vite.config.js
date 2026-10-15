import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './', // Use relative paths for assets to support GitHub Pages subpath deployments
  build: {
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        reviewManagement: resolve('review-management.html'),
        reviewApproval: resolve('review-approval.html')
      }
    }
  }
})
