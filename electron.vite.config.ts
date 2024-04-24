import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { dirname, normalize, resolve } from "path";

import reactPlugin from "@vitejs/plugin-react";
import injectProcessEnvPlugin from "rollup-plugin-inject-process-env";

import { ElectronAPI } from "@electron-toolkit/preload";
import { main, resources } from "./package.json";

const [nodeModules, devFolder] = normalize(dirname(main)).split(/\/|\\/g);
const devPath = [nodeModules, devFolder].join("/");

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],

    build: {
      rollupOptions: {
        input: {
          index: resolve("src/main/index.ts"),
        },

        output: {
          dir: resolve(devPath, "main"),
        },
      },
    },
  },

  preload: {
    plugins: [externalizeDepsPlugin()],

    build: {
      outDir: resolve(devPath, "preload"),
    },
  },

  renderer: {
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.platform": JSON.stringify(process.platform),
    },

    server: {
      port: 4927,
    },

    plugins: [reactPlugin()],
    publicDir: resolve(resources, "public"),

    build: {
      outDir: resolve(devPath, "renderer"),

      rollupOptions: {
        plugins: [
          injectProcessEnvPlugin({
            NODE_ENV: "production",
            platform: process.platform,
          }),
        ],

        input: {
          index: resolve("src/renderer/index.html"),
        },

        output: {
          dir: resolve(devPath, "renderer"),
        },
      },
    },
  },
});
