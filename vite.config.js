import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import vitePluginSass from 'vite-plugin-sass';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    vitePluginSass()
  ]
});

