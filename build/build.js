import scriptr from "./scriptr.js";

var environment = scriptr.env();

var cssFiles = [
  "node_modules/codemirror/lib/codemirror.css",
  "node_modules/codemirror/addon/fold/foldgutter.css",
  "node_modules/codemirror/theme/darcula.css",
];

var cssCommand = `copyfiles -f ${cssFiles.join(" ")} dist/${environment}/libs`;

scriptr.run(
  `node build/clean.js ${scriptr.params()}`,
  `webpack --config build/webpack/webpack.${environment}.js`,
  `copyfiles -au 1 src/**/*.{html,css,json} dist/${environment}`,
  cssCommand
);
