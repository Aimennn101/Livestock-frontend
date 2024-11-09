import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  build: { sourcemap: false },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_APP_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
