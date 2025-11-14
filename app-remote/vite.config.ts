import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app-remote",
      filename: "remoteEntry.js",
      exposes: {
        "./UserCard": "./src/UserCard.tsx",
        "./utils": "./src/utils.ts",
      },
      shared: ["react", "react-dom", "lodash"],
    }),
  ],
  build: {
    target: "esnext",
    modulePreload: false,
    cssCodeSplit: false,
    minify: false,
  },
  server: {
    port: 5001,
  },
});
