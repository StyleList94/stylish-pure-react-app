const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  plugins: [new EnvironmentPlugin({})],
});
