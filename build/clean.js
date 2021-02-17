import scriptr from "./scriptr.js";

var environment = scriptr.param("env", "");

scriptr.run(`rimraf dist/${environment}`);
