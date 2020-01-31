const path = require('path');

const webpack = require('webpack');
const Copy = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = [
  /*{
    mode: 'none',
    name: 'hyper-app',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    entry: './app/index.js',
    output: {
      path: path.join(__dirname, 'target'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new Copy([
        {
          from: './app/*.html',
          ignore: ['/node_modules/'],
          to: '.',
          flatten: true
        },
        {
          from: './app/*.json',
          ignore: ['/node_modules/'],
          to: '.',
          flatten: true
        },
        {
          from: './app/keymaps/*.json',
          ignore: ['/node_modules/'],
          to: './keymaps',
          flatten: true
        },
        {
          from: './app/static',
          to: './static'
        }
      ])
    ],
    target: 'electron-main'
  },*/
  {
    name: 'hyper',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    mode: 'none',
    devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map',
    entry: './lib/index.js',
    output: {
      path: path.join(__dirname, 'app', 'renderer'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.json/,
          loader: 'json-loader'
        },
        // for xterm.js
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/.*\.js.map$/i),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(nodeEnv)
        }
      }),
      new Copy([
        {
          from: './assets',
          to: './assets'
        }
      ])
    ],
    target: 'electron-renderer'
  },
  {
    name: 'hyper-cli',
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    mode: 'none',
    devtool: isProd ? 'none' : 'cheap-module-source-map',
    entry: './cli/index.js',
    output: {
      path: path.join(__dirname, 'bin'),
      filename: 'cli.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /index.js/,
          use: {
            loader: 'shebang-loader'
          },
          include: [/node_modules\/rc/]
        }
      ]
    },
    plugins: [
      // spawn-sync is required by execa if node <= 0.10
      new webpack.IgnorePlugin(/(.*\.js.map|spawn-sync)$/i),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(nodeEnv)
      })
    ],
    target: 'node'
  }
];
