import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/dist',
  },
  base: '/',
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/img': 'http://localhost:3000',
      '/audio': 'http://localhost:3000',
    },
  },
});
