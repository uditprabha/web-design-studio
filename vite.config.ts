import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          thankYou: path.resolve(__dirname, 'thank-you/index.html'),
          privacy: path.resolve(__dirname, 'privacy/index.html'),
          terms: path.resolve(__dirname, 'terms/index.html'),
          admin: path.resolve(__dirname, 'admin/index.html'),
          adminLogin: path.resolve(__dirname, 'admin/login/index.html'),
        },
      },
    },
  };
});
