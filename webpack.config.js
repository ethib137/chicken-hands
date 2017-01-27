var webpack = require('webpack');

var plugins = [];

if (process.env.TARGET === 'prod') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin(
      {
        compress: {
          warnings: false
        }
      }
    )
  );
}

module.exports = {
  entry: './src/index.js',

  output: {
    path: './dist',
    filename: 'index.js'
  },

  plugins: plugins,

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /(\.html|\.png|\.ico)$/,
        exclude: /node_modules/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ],
  },

  devServer: {
    inline: true,
    stats: 'errors-only'
  }
};