import merge from "webpack-merge";
import common from "./webpack.common.js";
import path from "path";
const __dirname = path.resolve();

export default merge.merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  output: {
    path: path.join(__dirname, "dist/dev/js"),
  },
});
