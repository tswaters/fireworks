
const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {

  entry: {
    'fireworks': './ts/fireworks.ts',
    'fireworks.min': './ts/fireworks.ts'
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: 'Fireworks',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  resolve: {
    extensions: ['.ts']
  },

  module: {
    rules: [
      {test: /\.ts$/, loader: 'awesome-typescript-loader'},
      {test: /\.js$/, loader: 'source-map-loader', enforce: 'pre'}
    ]
  },

  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        include: /\.min\.js$/
      })
    ]
  }

}
