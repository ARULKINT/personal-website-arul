import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/personal-website-arul/',
  server: {
    host: true,
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1500,
  },
});
