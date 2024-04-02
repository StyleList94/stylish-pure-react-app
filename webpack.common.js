const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { index: './src/index.js' },
  output: {
    filename: '[name].[fullhash].bundle.js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader',
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
        type: 'asset',
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  performance: {
    hints: false,
    maxAssetSize: 400000,
    maxEntrypointSize: 400000,
  },
  plugins: [
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'] }),
    new ESLintPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          globOptions: { ignore: ['**/index.html'] },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      minify: false,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.esbuildMinify,
        // `terserOptions` options will be passed to `esbuild`
        // Link to options - https://esbuild.github.io/api/#minify
        // Note: the `minify` options is true by default (and override other `minify*` options), so if you want to disable the `minifyIdentifiers` option (or other `minify*` options) please use:
        // terserOptions: {
        //   minify: false,
        //   minifyWhitespace: true,
        //   minifyIdentifiers: false,
        //   minifySyntax: true,
        // },
        terserOptions: {},
      }),
    ],
  },
};
