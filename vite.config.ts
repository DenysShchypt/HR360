import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ['src/**/*.ts', 'src/**/*.tsx'], // Specify files to lint
      exclude: ['node_modules/**'], // Specify files to exclude
    }),
    svgr(),
  ],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },

  // server: {
  //   open: '/register',
  // },
});
