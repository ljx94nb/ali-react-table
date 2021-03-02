const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const apiMocker = require('webpack-api-mocker')

module.exports = (env = {}) => {
  return {
    entry: path.resolve(__dirname, 'src/main.tsx'),
    mode: 'production', // 配置sourcemap的必须项
    devtool: 'source-map', // 配置sourcemap的必须项
    optimization: {
      minimize: false,
    }, // 配置sourcemap的必须项
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      libraryTarget: 'umd',
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: `index.html`,
        template: path.resolve(__dirname, 'src/template.html'),
      }),
    ],

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsconfigPathsPlugin()],
    },

    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          loader: 'ts-loader',
          options: { transpileOnly: true },
          exclude: /node_modules/,
        },
        {
          test: /\.css?$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },

    devServer: {
      hot: true,
      port: 8080,
      before(app) {
        apiMocker(app, path.resolve(__dirname, './proxy.js'))
      },
      after() {
        const openBrowser = require('react-dev-utils/openBrowser')
        setTimeout(() => {
          openBrowser('http://localhost:8080/')
        }, 200)
      },
    },
  }
}
