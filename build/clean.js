import scriptr from "./scriptr.js";

var environment = scriptr.env();

scriptr.run(`rimraf dist/${environment}`);
