import * as path from 'path'
import * as webpack from 'webpack'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
const isProd = process.env.NODE_ENV === 'production'
const resolve = (dir: string) => { return path.join(__dirname, dir) }

export default {
  mode: isProd ? 'production' : 'development',
  context: resolve('../../../'),
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: resolve('../../public/index'),
    publicPath: '/public/index/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.ts', '.vue', '.js', '.json'],
    alias: {
      // 'public': path.resolve(__dirname, '../public')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cacheBusting: true,
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          { loader: 'ts-loader', options: { appendTsxSuffixTo: [/\.vue$/] } },
          { loader: 'tslint-loader', options: { configFile: resolve('../../../tslint.json') } }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: isProd
        ? ExtractTextPlugin.extract({
          use: [{ loader: 'css-loader', options: { minimize: true } }],
          fallback: 'vue-style-loader'
        })
        : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: isProd
  ? [
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css'
    })
  ]
  : [
    new VueLoaderPlugin()
  ]
}
