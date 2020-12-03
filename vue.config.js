module.exports = {
    // devServer用来配置服务器启动的方式
    lintOnSave: false,
    devServer: {
        host: "192.168.0.105", //是你的地址
        // localhost:本机
        // 127.0.0.1：本机
        // 198.xx.xxx.xxx：真是地址，可以去CMD查
        // 禁用webpack热重载检查 解决热更新失效问题
        https: false,
        port: 8080, // 端口号
        https: false,
        open: true, //配置自动启动浏览器
        // 配置多个代理（这个是代理跨域配置）
        proxy: {
            // 可以给你跨域的服务器起名字
            "/api": {
                target: "http://127.0.0.1:20002", // 给我写你要跨域的服务器地址
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "" // 去掉接口地址中的api字符串
                    // 这个地方的名称必须^+你的跨域服务器起的名字
                }
            },
        }
    }
}