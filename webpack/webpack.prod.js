import merge from "webpack-merge";
import common from "./webpack.common.js";
import path from "path";
const __dirname = path.resolve();

export default merge.merge(common, {
  mode: "production",
  output: {
    path: path.join(__dirname, "dist/prod/js"),
  },
});
