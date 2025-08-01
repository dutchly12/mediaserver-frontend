import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[hash][extname]',
        chunkFileNames: 'chunks/[hash].js',
        entryFileNames: 'entries/[hash].js',
      },
    },
  },
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
