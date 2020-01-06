const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HappyPack = require('happypack');



const srcDir = path.join(__dirname, '../src');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/index.js'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunk:8].js',
    chunkFilename: 'chunk/[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   include: [srcDir],
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   options: {
      //     fix: true,
      //   },
      // },
      {
        test: /\.(js|jsx)$/,
        include: [srcDir],
        exclude: /(node_modules|bower_components)/,
        use: ['happypack/loader?id=happybabel'],
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: ['url-loader'],
        include: [srcDir],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: ['url-loader'],
        include: [srcDir],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['url-loader'],
        include: [srcDir],
      },
    ],
  },
  plugins: [
    // 开启 happypack 的线程池
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      cache: true,
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      favicon: 'public/favicon.png',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: `public/favicon.png`,
        to: 'favicon.png',
      },
    ]),
  ],
  resolve: {
    alias: {
      '@': srcDir,
      '@pages': `${srcDir}/pages`,
    },
  },
  // optimization: {
  //   removeAvailableModules: true, // 删除已解决的chunk (默认 true)
  //   removeEmptyChunks: true, // 删除空的chunks (默认 true)
  //   mergeDuplicateChunks: true // 合并重复的chunk (默认 true)
  // }
};
