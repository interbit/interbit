/* global __dirname, require, module */

const webpack = require('webpack')

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const path = require('path')
const env = require('yargs').argv.env
const pkg = require('./package.json')

const libraryName = pkg.name

const plugins = []
let outputFile

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }))
  outputFile = `${libraryName}.min.js`
} else {
  outputFile = `${libraryName}.js`
}

const config = {
  entry: ['babel-polyfill', `${__dirname}/src/index.js`],
  devtool: 'source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src'),
      path.resolve('../../node_modules')
    ],
    extensions: ['.json', '.js']
  },
  plugins
}

module.exports = config
