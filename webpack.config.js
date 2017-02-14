const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/client'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}

