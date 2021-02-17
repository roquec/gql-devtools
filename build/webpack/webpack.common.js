import path from "path";
const __dirname = path.resolve();
const srcDir = path.join(__dirname, "src");

export default {
  entry: {
    panel: path.join(srcDir, "js/panel.js"),
    devtools: path.join(srcDir, "js/devtools.js"),
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
  },
  stats: "errors-only",
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000,
  },
};
