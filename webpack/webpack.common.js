import path from "path";
const __dirname = path.resolve();
const srcDir = path.join(__dirname, "src");

// export const entry = {
//   entry: join(srcDir, "panel.js"),
// };
// export const output = {
//   path: join(__dirname, "../dist/js"),
//   filename: "[name].js",
// };

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
};
// export const optimization = {
//     splitChunks: {
//         name: "vendor",
//         chunks: "initial",
//     },
// };
// export const module = {
//     rules: [
//         {
//             test: /\.tsx?$/,
//             use: "ts-loader",
//             exclude: /node_modules/,
//         },
//     ],
// };
// export const resolve = {
//     extensions: [".ts", ".tsx", ".js"],
// };
// export const plugins = [
//     new CopyPlugin({
//         patterns: [{ from: ".", to: "../", context: "public" }],
//         options: {},
//     }),
// ];
