// import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// import vitePluginSass from 'vite-plugin-sass';
// import vitePluginCssModules from 'vite-plugin-css-modules';

// export default defineConfig({
//   plugins: [
//     react(),
//     svgr(),
//     // vitePluginSass(),
//     // vitePluginCssModules(),
//   ]
// });

export default {
  plugins: [
      react(),
      svgr(),
  ],
};
