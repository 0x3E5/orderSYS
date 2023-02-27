/*
 * @Author: 0x3E5
 * @Date: 2023-02-27 14:56:02
 * @LastEditTime: 2023-02-27 15:08:02
 * @LastEditors: 0x3E5
 * @Description: 
 * @FilePath: \orderSYS\client\vue.config.js
 */
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  publicPath: '/', // 根域上下文目录
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: { // 第三方插件配置
  },
  pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: { // 配置跨域
      '/api': {
        target: 'http://localhost:3000/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
