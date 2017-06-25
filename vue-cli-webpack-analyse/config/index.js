// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  // 生产环境配置
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),  // 编译输出的index.html文件
    assetsRoot: path.resolve(__dirname, '../dist'),        // 编译输出的目标文件夹路径
    assetsSubDirectory: 'static',                          // 编译输出的二级文件夹
    assetsPublicPath: '/',                                 // 编译输出的发布路径，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: true,                             // 是否启动SourceMap
    // 默认不打开开启gzip模式，如果设置为true，安装compression-webpack-plugin
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,                                  // 是否开启gzip模式
    productionGzipExtensions: ['js', 'css'],                // gzip模式下需要压缩的文件的扩展名
    // 运行 `npm run build --report` 查看分析报告
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // 开发环境配置
  dev: {
    env: require('./dev.env'),
    port: 8080,                                               // dev-server监听的端口
    autoOpenBrowser: true,                                    // 启动dev-server之后自动打开浏览器
    assetsSubDirectory: 'static',                             // 编译输出的二级文件夹
    assetsPublicPath: '/',                                    // 编译输出的发布路径，可配置为资源服务器域名或 CDN 域名
    proxyTable: {},                                           // 请求代理表，在这里可以配置特定的请求代理到对应的API接口
    cssSourceMap: false                                       // 是否开启 cssSourceMap。默认情况下，关闭 CSS Sourcemaps，因为使用相对路径会报错。
  }
}
