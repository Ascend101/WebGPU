const path = require("path");
module.exports = {
  entry: "./src/hexconv/main.js",
  output: {
    filename: "main.js",
    path:path.resolve(__dirname, "dist")
  }
};