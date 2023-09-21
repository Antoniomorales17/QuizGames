const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const port = 3000;
let publicUrl = `ws://localhost:${port}/ws`;

// Only for Gitpod
if (process.env.GITPOD_WORKSPACE_URL) {
  const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
  publicUrl = `wss://${port}-${host}/ws`;
}

// Only for Codespaces
if (process.env.CODESPACE_NAME) {
  publicUrl = `wss://${process.env.CODESPACE_NAME}-${port}.preview.app.github.dev/ws`;
}

module.exports = {
  entry: ['./src/js/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader', // Creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // Translates CSS into CommonJS
          },
        ],
      }, // CSS only files
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' },
        },
      }, // For images
      {
        test: /\.(woff($|\?)|woff2($|\?)|ttf($|\?)|eot($|\?)|svg($|\?)|mp3)$/,
        use: ['file-loader'], // Agrega esta regla para archivos de audio MP3
      }, // For fonts and MP3 audio files
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    port,
    hot: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    client: {
      webSocketURL: publicUrl,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // Uncomment the next line if you want to use ESLint in your project
    // new ESLintPlugin({
    //   files: path.resolve(__dirname, 'src'),
    // }),
    new HtmlWebpackPlugin({
      favicon: '4geeks.ico',
      template: 'template.html',
    }),
  ],
};
