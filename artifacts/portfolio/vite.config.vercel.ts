import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  customLogger: (() => {
    const logger = createLogger();
    const warn = logger.warn.bind(logger);
    logger.warn = (msg, opts) => {
      if (msg.includes("Can't resolve original location of error")) return;
      warn(msg, opts);
    };
    return logger;
  })(),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "../../vercel-out"),
    emptyOutDir: true,
    sourcemap: false,
  },
});
