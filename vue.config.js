module.exports = {
    // devServer用来配置服务器启动的方式
    lintOnSave: false,
    devServer: {
        host: "192.168.0.105", //是你的地址
        // 禁用webpack热重载检查 解决热更新失效问题
        https: false,
        port: 8080, // 端口号
        open: true, //配置自动启动浏览器
        // 配置多个代理（这个是代理跨域配置）
        proxy: {
            // 可以给你跨域的服务器起名字
            "/api": {
                target: "http://192.168.0.105:20001", // 跨域的服务器地址
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "" // 去掉接口地址中的api字符串
                    // 这个地方的名称必须^+你的跨域服务器起的名字
                }
            },
        }
    }
}