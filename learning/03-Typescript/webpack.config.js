const path = require("path");
module.exports = {
  mode:"development",
  entry: "./src/hexconv/main.ts",
  output: {
    filename: "main.js",
    path:path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{
      test: /.\.ts$/,
      exclude: /node_modules/,
      use: "ts-loader"
    }]
  },

  resolve:{
    extensions:[".ts"]
  }
};