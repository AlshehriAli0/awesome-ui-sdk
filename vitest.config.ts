import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['website/src/**/*.test.{ts,tsx}'],
    setupFiles: ['./website/src/test/setup.ts'],
  },
});
