"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");

module.exports = class extends Generator {
  initializing() {
    this.props = {};

    this.move = (target, dest) => {
      this.fs.copy(this.templatePath(target), this.destinationPath(dest));
    };
  }
  prompting() {
    this.log(
      yosay(
        `Welcome to the hunky-dory ${chalk.red(
          "generator-mm-rollup"
        )} generator!`
      )
    );
    const ques = [
      {
        name: "name",
        message: "请输入项目名称",
        default: "simple"
      }
    ];

    return this.prompt(ques).then(ans => {
      Object.keys(ans).forEach(key => {
        this.props[key] = ans[key];
      });
      this.destinationRoot(path.join(this.props.name));
    });
  }

  writing() {
    this.move("src", "src");
    this.move("_eslintrc.js", ".eslintrc.js");
    this.move("_editorconfig", ".editorconfig");
    this.move("_gitignore", ".gitignore");
    this.move("_prettierrc", ".prettierrc");
    this.move("rollup.config.js", "rollup.config.js");
    this.move("package.json", "package.json");
  }

  install() {
    this.yarnInstall();
  }
  end() {
    console.log(chalk.green.bold("\n\n🎉  Success 🎉 "));
    console.log(
      chalk.green.bold(`
   Get started:
   - cd ${this.props.name}
   - yarn dev
   - yarn build`)
    );
  }
};
