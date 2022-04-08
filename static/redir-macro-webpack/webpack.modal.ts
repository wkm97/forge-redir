import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';
import { Configuration } from 'webpack';
import baseConfig from './webpack.base'

const config: Configuration = {
  ...baseConfig,
  entry: './src/redir-modal.tsx',
  output: {
    clean: true,
    filename: 'index.js',
    path: path.resolve(__dirname, 'build', 'redir-modal'),
  }
};
export default config;
