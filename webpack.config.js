/* eslint-disable */
require('dotenv').config();
const path = require('path');
const { DefinePlugin } = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@/app': path.resolve(__dirname, 'src', 'app'),
      '@/pages': path.resolve(__dirname, 'src', 'pages'),
      '@/widgets': path.resolve(__dirname, 'src', 'widgets'),
      '@/features': path.resolve(__dirname, 'src', 'features'),
      '@/entities': path.resolve(__dirname, 'src', 'entities'),
      '@/shared': path.resolve(__dirname, 'src', 'shared'),
    },
  },
  devServer: {
    hot: true,
    compress: true,
    port: process.env.DEV_PORT || 3000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL),
        WS_URL: JSON.stringify(process.env.WS_URL),
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, 'public'),
          to: 'public',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
    }),
  ],
};
