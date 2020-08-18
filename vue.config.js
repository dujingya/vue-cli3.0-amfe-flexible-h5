/*
 * @Description: vue config js
 * @Autor: zhan
 * @Date: 2019-08-02 15:51:47
 * @LastEditors: zhan
 * @LastEditTime: 2020-03-13 18:03:41
 */
'use strict'
const path = require('path')
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'vue Admin Template' // page title

const port = 9528 // dev port
console.log(process.env.prefix, process.env.outputDir, 9999)

module.exports = {
  publicPath: process.env.prefix, // 基本路径
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  outputDir: process.env.outputDir, // 构建时的输出目录
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({ // 把px单位换算成rem单位
            rootValue: 37.5, // vant官方使用的是37.5
            rootValuePC: 192,
            selectorBlackList: ['vant', 'mu'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  },
  devServer: {
    port: port,
    open: true, // 自动打开页面
    compress: true, // 压缩
    hot: true, // 热加载
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/interface': {
        target: 'http://10.200.67.198:8011/',
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.NamedModulesPlugin(),  // 可配置也可不配置
      new webpack.HotModuleReplacementPlugin() // 这个是必须配置的插件
    ]
  }
}
