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
      '@config': `${__dirname}/src/config`,
      '@components': `${__dirname}/src/components`,
      '@actions': `${__dirname}/src/store/actions`,
      '@store': `${__dirname}/src/store`,
      '@utils': `${__dirname}/src/utils`,
      '@screens': `${__dirname}/src/screens`,
      '@containers': `${__dirname}/src/containers`,
      '@styles': `${__dirname}/src/styles`,
      '@const': `${__dirname}/src/const`,
      '@ws': `${__dirname}/src/ws`,
    },
  },
  devServer: {
    hot: true,
    compress: true,
    port: 3000,
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
