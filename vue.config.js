const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  crossorigin: "anonymous",
  devServer: {
    open: true,
    allowedHosts: "all",
    host: 'localhost',
    port: 8080,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { //配置跨域
      '/api/v1': {
        target: 'http://127.0.0.1:6678/api/v1', //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/api/v1': '' //请求的时候使用这个api就可以
        }
      }
    }
  },
})
