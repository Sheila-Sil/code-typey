import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base: "./"` makes all built asset paths relative, so the site works
// whether it's served from a GitHub Pages *project* site
// (https://user.github.io/repo-name/) or a *user/org* site
// (https://user.github.io/). No need to hardcode the repo name here.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
