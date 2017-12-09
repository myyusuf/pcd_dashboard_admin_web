var path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
  entry: './src/ceuapp.js',
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css!'
      }
    ],
  },
  // plugins: [
  //   new BabiliPlugin({}, {}),
  // ],
};
