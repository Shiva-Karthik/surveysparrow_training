const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/src/public/index.html", 
  filename: "./index.html"
});
module.exports = {
  mode: "development",
  entry: "./client/src/index",
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "/client/src/public"),
    // static: __dirname,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [htmlPlugin],
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {   test: /\.(js|jsx)$/, use: ["babel-loader"], exclude: /node_modules/ },
    ],
  },
};
