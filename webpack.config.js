/* eslint-disable */
const path = require('path');
const { DefinePlugin } = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@app': `${__dirname}/src/app`,
      '@pages': `${__dirname}/src/pages`,
      '@widgets': `${__dirname}/src/widgets`,
      '@features': `${__dirname}/src/features`,
      '@entities': `${__dirname}/src/entities`,
      '@store': `${__dirname}/src/shared/store`,
      '@config': `${__dirname}/src/shared/config`,
      '@ui': `${__dirname}/src/shared/ui`,
      '@utils': `${__dirname}/src/shared/utils`,
      '@styles': `${__dirname}/src/shared/styles`,
      '@const': `${__dirname}/src/shared/const`,
      '@ws': `${__dirname}/src/shared/ws`,
      '@i18n': `${__dirname}/src/shared/i18n`,
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
      template: 'src/index.html',
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
