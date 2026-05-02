import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // {
    //   name: "glsl-as-text",
    //   configureServer(server) {
    //     server.middlewares.use((req, res, next) => {
    //       if (req.url?.endsWith(".glsl")) {
    //         res.setHeader("Content-Type", "text/plain");
    //       }
    //       next();
    //     });
    //   },
    // },
  ],
  root: './',
  // base: process.env.NODE_ENV === 'production' ? '/threejs-inspector/' : './',
  base: './',
  publicDir: '../shaders',
  server: {
    host: true,
    open: true
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  esbuild: {
    supported: {
      'top-level-await': true
    }
  },
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true,
    sourcemap: true,
    assetsInlineLimit: 0,
    target: 'esnext'
  },
  resolve: {
    alias: {
      // src: path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  assetsInclude: []
});
