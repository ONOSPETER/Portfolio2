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
      "@workspace/api-client-react": path.resolve(
        import.meta.dirname,
        "..",
        "..",
        "lib",
        "api-client-react",
        "src",
        "index.ts",
      ),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
  outDir: "dist",
  emptyOutDir: true,
  sourcemap: false,
},
