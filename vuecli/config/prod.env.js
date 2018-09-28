'use strict'
module.exports = {
  // 作用很明显，就是导出一个对象，NODE_ENV是一个环境变量，指定production环境
  NODE_ENV: '"production"',
  // 打包过后在axios文件中baseURL属性的为API_HOST的值
  // API_HOST:'"http://192.168.3.27:8020/api"'  // 本地打包测试 本机的ip
  API_HOST:'"http://localhost:8020/api"' 
  // 本地的nginx 不能启动192.168.3.4:9556 服务
}
