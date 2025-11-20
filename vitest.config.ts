import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    include: ['src/__test__/unit/**/*.spec.ts', 'src/__test__/e2e/**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
})
