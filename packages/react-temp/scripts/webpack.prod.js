/**
 * @description productions
 */
const getBaseCfg = require('./webpack.base')
const { merge } = require('webpack-merge')
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// 优化， 压缩， 分治。
module.exports = merge(getBaseCfg(false), {
	/**
	 * @description 优化方案配置
	 * @param minimizer |压缩方案配置
	 * @param TerserPlugin |压缩JS
	 * @param CssMinimizerPlugin |压缩css
	 * @param splitChunks |代码切片 (https://webpack.docschina.org/plugins/split-chunks-plugin)
	 */
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true, // 并行压缩
				terserOptions: {
					compress: {
						pure_funcs: ['console.log', 'console.warn']
					}
				}
			}),
			new CssMinimizerPlugin({
				parallel: true
			})
		],
		splitChunks: {
			// 缓存配置
			chunks: 'async',
			minSize: 40000,
			minChunks: 1,
			cacheGroups: {
				vendors: {
					priority: 1,
					test: /node_modules/,
					name: 'vendors'
				},
				commons: {
					name: 'commons',
					minChunks: 3
				}
			}
		}
	}
})
