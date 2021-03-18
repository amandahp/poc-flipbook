const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }, { loader: "eslint-loader" }]
      },
      {
        test: /\.worker\.js$/,
        use: [{ loader: "worker-loader", options: { publicPath: "/public/" } }]
      }
    ]
  },
  alias: { 'react-pdf': 'react-pdf/dist/entry.webpack' },
  plugins: [htmlPlugin]
};