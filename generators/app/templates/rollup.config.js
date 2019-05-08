import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";

export default [
  // for browser
  {
    input: "src/main.js",
    output: {
      name: "howLongUntilLunch",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs() // so Rollup can convert `ms` to an ES module
    ]
  },
  // for builder

  {
    input: "src/main.js",
    external: ["ms"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ]
  }
];
