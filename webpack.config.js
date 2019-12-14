const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { compact } = require('lodash')

module.exports = (env, argv) => {
  const isProduction = Boolean(
    (argv && argv.mode === 'production') ||
      process.env.NODE_ENV === 'production' ||
      (env && env.production)
  )

  return {
    mode: isProduction ? 'production' : 'development',
    target: 'webworker',
    output: {
      filename: `worker.js`,
      path: path.resolve(__dirname, 'lib')
    },
    devtool: 'source-map',
    plugins: compact([
      new CleanWebpackPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]),
    performance: {
      hints: false
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.mjs']
    },
    module: {
      rules: [
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
      ]
    }
  }
}
