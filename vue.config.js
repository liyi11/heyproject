module.exports = {
    devServer:{         //有些值像 host、port 和 https 可能会被命令行参数覆写。
      host:'localhost',
      port: 9527,
      proxy:{      // devServer.proxy
        '/api':{              //将路径/api代理到 target上
          target: process.env.VUE_APP_BASE_API,
          changeOrigin: true, //将主机头的来源更改为目标URL
          pathRewrite:{  // 设置路径的转发规则为空
            '/api': ''
          }
        }
      }
    },
    publicPath:'./',
    outputDir:'dist',       //修改最终打包的文件夹的名称
    assetsDir: 'static',
    indexPath:'index.html',  //修改入口文件的输出路径
    lintOnSave:true,
    productionSourceMap:false,
    chainWebpack(config) {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item.use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: './src/assets/styles/variable.scss',
                })
                .end()
        })
    }

}