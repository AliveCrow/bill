/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2021-11-15 12:00:47
 * @LastEditTime: 2021-11-15 12:06:38
 */
const path = require('path')


module.exports = {
  publicPath: './',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Alice记账本',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include
      .add(dir)
      .end() //只在icons目录中
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ extract: false })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap(options => ({ ...options, plugins: [{ removeAttrs: { attrs: 'fill' } }] }))
      .end()

    config.plugin('svg-sprite')
      .use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])

    config.module.rule('svg')
      .exclude
      .add(dir) //其他的svg loader排除icons目录
  }
}