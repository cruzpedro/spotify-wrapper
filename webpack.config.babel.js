import { join } from 'path';

const nodeENV = process.env.NODE_ENV || 'production';

const include = join(__dirname, 'src');

export default {
  mode: nodeENV,
  devtool: 'source-map',
  entry: './index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'spotifyWrapper',
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', include },
    ],
  },
};
