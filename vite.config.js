import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // При использовании поддомена Cloudflare Pages (*.pages.dev) base равен '/'
  // Для GitHub Pages (project site) можно указать '/<repo-name>/'
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'xlsx']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
