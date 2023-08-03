/**
 * @description based config|基础默认配置
 * @param {Object} module |模块化配置
 * @param {Object} resolve |解析配置
 * @param {Array} plugins |插件配置
 */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (isDev) => ({
  entry: path.join(__dirname, '../src/index.tsx'),
  mode: isDev ? "development" : "production",
  output: {
      filename: 'static/js/[name].[chunkhash:8].js',
      path: path.join(__dirname, "../dist"),
      clean: true, //w4 - clean-webpack-plugin
      publicPath: '/'
  },
  module:{
    rules:[
      
      /**
       * @description ts解析
       * @method loader
       */
      {
        test: /.(ts|tsx)$/,
        use:{
          loader: "babel-loader",
        }
      },

      /**
       * @description css解析
       * @method postcss-loader
       */
      {
        oneOf: [
          { 
            // 定义一下，使用 xxx.module.（less|css)
            test: /.module.(less|css)$/,
            include: [path.resolve(__dirname, '../src')],
            use: [
              !isDev ? "style-loader" : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                    // 开启 css modules
                    modules: {
                      localIdentName: '[path][name]__[local]--[hash:base64:4]'
                    }
                }
              },
              "postcss-loader",
              "less-loader"
            ]
          },
          {
            test: /.(less)$/,
            use: [
                !isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
                "less-loader"
            ]
          },
          {
            test: /.(css)$/,
            use: [
                !isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
            ]
          },
        ] 
      },
      
      /**
       * @description assetss|静态资源配置
       * @param 图片、字体
       * @param 视频、音频
       */
      {
        test: /.(png|jpg|jepg|git|svg)$/,
        type: 'assets',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024,
            }
        },
        generator: {
            filename: 'static/images/[name][ext]'
        }
      },
      {
        test: /.(woff2|eot|ttf|otf)$/,
        type: 'assets',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024,
            }
        },
        generator: {
            filename: 'static/fonts/[name][ext]'
        }
      },
      {
        test: /.(mp4|mp3|webm)$/,
        type: 'assets',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024,
            }
        },
        generator: {
            filename: 'static/medias/[name][ext]'
        }
      }
      
    ]
  },

  /**
   * @description resolve|解析配置
   * @param alias |别名配置
   */
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      "@": path.join(__dirname, '../src')
    },
  },

  /**
   * @description plugins|插件配置
   * @param HTMLWebpackPlugin |根据指定的模板生成HTML文件(含打包后注入的JS)
   * @
   */
  plugins: [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"),
        inject: true,
    }),
    new MiniCssExtractPlugin({
        // [content hash] - chunk hash - hash : 内容变了，我才有消除缓存的意义和价值。
        filename: 'static/css/[name].[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env.PRIMARY': JSON.stringify(process.env.PRIMARY)
    })
  ]
})