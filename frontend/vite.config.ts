import react from '@vitejs/plugin-react-swc';
import path from 'path';
import sass from 'sass';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    VITE_API_HOST: `'${process.env.VITE_API_HOST}'`,
  },
  build: {
    assetsDir: 'public',
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/common': path.resolve(__dirname, './src/common'),
    },
  },
});
