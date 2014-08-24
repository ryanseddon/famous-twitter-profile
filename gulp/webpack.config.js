var path = require('path');
var prefix = process.cwd();

module.exports = {
  cache: true,
  entry: path.join(prefix, '/app/src/main.js'),
  output: {
    path: path.join(prefix, 'dist'),
    filename: 'main.js'
  },
  module: {
    loaders: [
      { test: /\famous.css$/, loader: 'style/url!file' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js$/, loader: 'es6-loader' },
      { test: /\.jpeg$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    alias: {
      // Framework
      'famous.css': 'http://code.famo.us/famous/0.2/famous.css',
      styles: path.join(prefix + '/app/styles'),
      images: path.join(prefix + '/app/content/images'),
      src: path.join(prefix + '/app'),
      views: path.join(prefix + '/app/src/views')
    }
  }
};
