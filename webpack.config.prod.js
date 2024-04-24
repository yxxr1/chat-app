/* eslint-disable */
const { mergeWithRules, CustomizeRule } = require('webpack-merge');
const common = require('./webpack.config.js');

const mergeRules = {
  module: {
    rules: {
      test: CustomizeRule.Match,
      loader: CustomizeRule.Replace,
      options: CustomizeRule.Replace,
    },
  },
};

module.exports = mergeWithRules(mergeRules)(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.prod.json',
        },
      },
    ],
  },
});
