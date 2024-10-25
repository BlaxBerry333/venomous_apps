import path from "path";
import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      port: parseInt(env.VITE_ADMIN_CLIENT_SERVER_PORT),
    },

    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },

    plugins: [react()],

    build: {
      rollupOptions: {
        output: {
          // 分包策略
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              // node_modules 中使用的第三方依赖不会改变，单独打包出去
              // return "modules";
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          },
          chunkFileNames: "assets/js/[name]-[hash].js", // 引入文件名的名称
          entryFileNames: "assets/js/[name]-[hash].js", // 包的入口文件名称
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
        },
      },
    },

    optimizeDeps: {
      include: ["react", "react-dom", "sass"],
    },
  };
});
