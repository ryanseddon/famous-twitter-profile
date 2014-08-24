var path = require('path');
var prefix = process.cwd();
var webpack = require('webpack');

module.exports = {
  cache: true,
  context: __dirname,
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'main.js',
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(jpeg|png)$/, loader: 'url' }
    ]
  },
  resolve: {
    alias: {
      'famous.css'         : 'famous/core/famous.css',
      'core'               : 'famous/core',
      'surfaces'           : 'famous/surfaces',
      'views'              : 'famous/views',
      'transitions'        : 'famous/transitions',
      'modifiers'          : 'famous/modifiers',
      'inputs'             : 'famous/inputs',

      'Engine'             : 'core/Engine',
      'View'               : 'core/View',
      'Surface'            : 'core/Surface',
      'Modifier'           : 'core/Modifier',
      'Transform'          : 'core/Transform',

      'ImageSurface'       : 'surfaces/ImageSurface',
      'ContainerSurface'   : 'surfaces/ContainerSurface',

      'StateModifier'      : 'modifiers/StateModifier',

      'HeaderFooterLayout' : 'views/HeaderFooterLayout',
      'FlexibleLayout'     : 'views/FlexibleLayout',

      'Easing'             : 'transitions/Easing',

      'GenericSync'        : 'inputs/GenericSync',
      'MouseSync'          : 'inputs/MouseSync',
      'TouchSync'          : 'inputs/TouchSync'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
