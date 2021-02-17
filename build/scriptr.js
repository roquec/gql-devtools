import { performance } from "perf_hooks";
import { execSync } from "child_process";

export default {
  run: run,
  param: param,
  params: params,
};

function run(...commands) {
  console.log("\u001b[1;33m [SCRIPTR] Running commands...\u001b[0m");

  var t0 = performance.now();

  commands.forEach((cmd) => console.log(`    ${cmd}`));

  var command = commands.join(" && ");
  execSync(command, {
    stdio: "inherit",
  });

  var t1 = performance.now();

  console.log(
    `\u001b[1;32m [SCRIPTR] Done in ${Math.round(t1 - t0)}ms!\u001b[0m`
  );
}

function param(name, fallback = null) {
  var parameter = process.argv.reverse().find((p) => p.startsWith(`--${name}`));

  if (!parameter) {
    return fallback;
  }

  if (parameter.length <= `--${name}=`.length) {
    return true;
  }

  var value = parameter.substr(`--${name}=`.length, parameter.length);

  return value;
}

function params() {
  var parameters = process.argv.filter((p) => p.startsWith(`--`));

  if (!parameters) {
    return "";
  }

  return parameters.join(" ");
}
