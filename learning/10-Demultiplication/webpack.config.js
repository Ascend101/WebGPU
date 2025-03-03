const path = require("path");
module.exports = {
  mode:"development",
  entry: "./srcs/index.ts",
  output: {
    filename: "index.js",
    path:path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{
      test: /.\.ts$/,
      exclude: /node_modules/,
      use: "ts-loader"
    },
    {
      test: /\.wgsl$/,
      use :"ts-shader-loader"
    }
  ]
  },
  resolve:{
    extensions:[".ts"]
  }
};