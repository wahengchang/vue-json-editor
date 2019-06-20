const pkg = require("./package.json");
module.exports = {
  lintOnSave: false,
  publicPath: pkg.name
};
