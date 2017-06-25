// 检查NodeJS和npm的版本
require('./check-versions')()

//配置 production 作为当前的环境（生产环境）
process.env.NODE_ENV = 'production'

// 实现node.js 命令行环境的 loading效果
var ora = require('ora')
var spinner = ora('building for production...')
spinner.start()   // 开启loading动画


// 获取配置文件 config/index.js
var config = require('../config')
// 获取webpack配置 build/webpack.prod.conf
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')


// 用于删除目录  rimraf(f, [opts], callback)
var rm = require('rimraf')
// 引入node的path模块
var path = require('path')
// 定制控制台日志的输入样式，可以输出
var chalk = require('chalk')

  //输出文件的目标文件夹 path.join(config.buld.assetsRoot, config.build.assetsSubDirectory)
  //删除新的模板文件，生成新的目标文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop() // 停止loading动画
    if (err) throw err
    // 没有出错则输出相关信息
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
