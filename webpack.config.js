
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

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

  plugins: [
    new UglifyJSPlugin({
      include: /\.min\.js$/
    })
  ]

}
