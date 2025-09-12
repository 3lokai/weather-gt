import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Vitest configuration for testing
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    projects: [{
      extends: true,
      plugins: [],
      test: {
        name: 'browser',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['./tests/setup.ts']
      }
    }]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});