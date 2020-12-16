const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: { index: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[id].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_module/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  performance: {
    hints: false,
    maxAssetSize: 400000,
    maxEntrypointSize: 400000,
  },
  devServer: {
    port: 3000,
    open: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
};
