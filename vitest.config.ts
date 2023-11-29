import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**'],
    coverage: {
      all: true,
      reporter: ['lcov', 'text-summary']
    },
    singleThread: true
  }
});
