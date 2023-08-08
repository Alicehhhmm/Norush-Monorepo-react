/**
 * @description based config|基础默认配置
 * @param {string} output |核心模块入口文件配置
 * @param {Object} output |核心模块输出文件配置
 * @param {Object} module |核心模块化配置(万物皆可模块化)
 * @param {Object} resolve |解析配置
 * @param {Array} plugins |核心模块辅助插件配置
 * @param clean|clean-webpack-plugin(w4) |删除（清理）构建目录
 */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (isDev) => ({
  mode: isDev ? "development" : "production",
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
      filename: 'static/js/[name].[chunkhash:8].js',
      path: path.join(__dirname, "../dist"),
      clean: true, //w4 - clean-webpack-plugin
      publicPath: '/'
  },

  /**
   * @description 入口文件限制
   * @param assetFilter |只给出 js 文件的性能提示
   * @official https://webpack.docschina.org/configuration/performance/#performance
   */
  performance: {
    hints: 'warning',
    maxEntrypointSize: 40000000,
    maxAssetSize: 20000000,
    
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js')
    }
  },

  /**
   * @description Loaders|核心模块在打包文件之前-对象资源加载、编译、解析、压缩等
   * @param babel-loader |用babel来转换ES6文件到ES
   * @param style-loader |将css添加到DOM的内联样式标签style里
   * @param css-loader |允许将css文件通过require的方式引入，并返回css代码
   * @param less-loader|处理less
   * @param sass-loader|处理sass
   * @param postcss-loader|用postcss来处理CSS
   */
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
   * @param {String} extensions |文件后缀扩展
   * @param {object} alias |别名配置
   */
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      "@": path.join(__dirname, '../src')
    },
  },
  


  /**
   * @description plugins|插件配置
   * @param DefinePlugin|允许在编译时创建配置的全局对象
   * @param MiniCssExtractPlugin |提取 CSS 到一个单独的文件中
   * @param HTMLWebpackPlugin |根据指定的模板生成HTML文件(含打包后注入的JS)|minify(HTML压缩优化)
   */
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      inject: true,
      minify:{
        minifyCSS:false, // 是否压缩css
        collapseWhitespace:false, // 是否折叠空格
        removeComments:true // 是否移除注释
      }
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