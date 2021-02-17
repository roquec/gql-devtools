import scriptr from "./scriptr.js";

scriptr.run(
  `nodemon -q -e html,js,json,css --watch src -x "npm run build -- ${scriptr.params()}"`
);
