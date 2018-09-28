window.g = {
    AXIOS_TIMEOUT: 300000,
    /** 不需要跨域请求 配置服务器地址*/
    ApiUrl: 'http://118.89.27.88:8080',
    /** 需要跨域请求的本机地址*/
    Apilocal: 'http://localhost:8020/api',
    /** 本地的ip地址 **/
    // Apilocal:'http://192.168.3.27:8020/api'
    /**配置过滤的接口*/
    filterl:'/authentication/',  
    /** 登陆时需要在head中添加的Authorization所对应的值 **/
    clientId:'cloudlinking_front',
    /* 管理端使用 */
    // clientId:'cloudlinking_backend',
    clientSecret:"cloudlinking123456789"
  }
  