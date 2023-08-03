/**
 * @description development|开发环境
 * @param getBaseCfg |使用基础配置
 * @param {Object} merge |将多个 webpack 配置文件合并成一个
 */

 const getBaseCfg = require('./webpack.base');
 const { merge } = require('webpack-merge');
 const path = require('path');
 
 module.exports = merge(getBaseCfg(true), {
     devtool: "source-map",
     devServer: {
         port: 8297,
         compress: false, //|压缩
         hot: true, //|热更新
         historyApiFallback: true,//| 解决404的问题
         static: {
             directory: path.join(__dirname, '../public')
         }
     }
 })
