import { defineConfig } from "vite";
import viteImagemin from "vite-plugin-imagemin";
import viteCompression from "vite-plugin-compression";
import fs from "fs-extra";
import path from "path";
import { minify } from "terser";

function compressPublicJs() {
  return {
    name: "compress-public-js",
    async writeBundle() {
      const publicJsDir = path.resolve(__dirname, "public/js");
      const distJsDir = path.resolve(__dirname, "public/dist/js");

      await fs.ensureDir(distJsDir);

      const jsFiles = await fs.readdir(publicJsDir);
      for (const file of jsFiles) {
        if (path.extname(file) === ".js") {
          const content = await fs.readFile(
            path.join(publicJsDir, file),
            "utf-8"
          );
          const minified = await minify(content);
          await fs.writeFile(path.join(distJsDir, file), minified.code);
        }
      }
    },
  };
}

export default defineConfig({
  base: "./",
  build: {
    minify: "esbuild",
    target: "es2015",
    cssTarget: "chrome80",
    // outDir: "dist/public",
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  // publicDir: "public", // 这确保 public 目录下的文件会被复制到 dist 目录
  plugins: [
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    compressPublicJs(),
  ],
});
