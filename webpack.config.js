const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './_js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, "./assets/js")
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  }
};