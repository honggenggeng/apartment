import axios from 'axios'
import Vue from 'vue'
import $ from './jquery.min.js'
import queryString from 'queryString'
import store from '../store/index.js';
import config from '../../config/index.js';
import deploy from './deploy.js'
// 加密
let Base64 = require('js-base64').Base64;
var client=Base64.encode(window.g.clientId+':'+window.g.clientSecret)
/*打包之后获取的地址 可以配置(static的config.js文件中配置)*/
// const API_HOST = window.g.ApiUrl  //不许跨域 打包之后的请求地址
// const API_HOST = window.g.Apilocal//跨域之后需要配置的打包地址
//开发获取地址
const API_HOST = process.env.API_HOST1
// axios的配置
var instance =axios.create({
    baseURL:API_HOST,//基础URL
    // timeout:window.g.AXIOS_TIMEOUT, //请求延时时间   个人认为给后台返回数据的时间
    headers: { //自定义请求头内容
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',//转换为key=value的格式必须增加content-type
        "Authorization" :''
    },
    responseType: 'json',  //请求数据类型包括  'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    // params: {},  //无论请求为何种类型，在params中的属性都会以key=value的格式在urlzhong拼接
    transformRequest: [function (data) {
        // data.age = 30;  //发送之前增加的属性
        console.log("data:",data)
        return queryString.stringify(data)
    }],
    //transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function(data){
        return data
    }],
    //validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function(status){
        //状态码小于400时均为成功（返回true）
    　　return status < 400 
    }, 
    //取消请求，下文详细说明
    // cancelToken  
});
// http request 请求拦截器  在发送请求之前拦截数据,return相当于继续向后台发送访问
instance.interceptors.request.use(
    config => {
        //从sessstorage中获取Authorization的值
        let orization=sessionStorage.getItem('Authorization');
        console.log('发送拦截',config)
        // 根据store中的数据判断head请求中Authorization的值
        let flage=store.state.modulestoke.Authorization
        config.headers.Authorization=flage?("Basic"+" "+client):orization
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
instance.interceptors.response.use(//在每次请求后台返回的数据之前 进行拦截 
    response => {
        return response.data;//返回的数据进行处理返回到请求的方法中
    },
    error => {
        console.log("返回数据报错了",error)
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data)
    }
)
//获取export default处理后的参数在进行下一步操作
function apiAxios(method, url, params, sccess,error) {
    //相当于axios请求
    instance({
        method: method,
        url: url,
        data:params
    }).then(function (res) {
        sccess(res);
    }).catch(function (err) {
        error(err);
    })
  }
//对发送的请求进行处理
export default {  
    //get请求的参数需要是{data:{a:'1'}}
    get: function (url, params,sccess , error) { 
      var data={data:params}
      return apiAxios('GET', url , data , sccess,error)
    },
    //post请求的参数要是{a:'1'}
    post: function (url, params , sccess , error) {  
        var data = deploy.deploy(url, params)
        return apiAxios('POST', url , data , sccess,error)
    }
}

























// function Axios(opts){
//     let self=this
//     this.type         = opts.type || "get";
//     this.url          = opts.url;
//     this.data        = opts.data || {};
//     this.isShowLoader = opts.isShowLoader || false;
//     this.dataType     = opts.dataType || "json";
//     this.sccess     = opts.sccess;
//     this.error      =opts.error;
//     this.init()
// }
// Axios.prototype={
//     init: function(){
//         this.sendRequest();
//     },
//     showLoader:function(){
//         if(this.isShowLoader){
//             var loader = '<div class="ajaxLoader"><div class="loader">加载中...</div></div>';
//             $("body").append(loader);
//         }
//     },
//     hideLoader:function(){
//         if(this.isShowLoader){
//             $(".ajaxLoader").remove();
//         }
//     },
//     sendRequest:function(){
//         let self = this
//         axios({
//             method: this.type,
//             url: this.url,
//             data: this.data,
//             beforeSend: this.showLoader(),
//         }).then(function(data){//成功回调
//             self.hideLoader()
//             self.sccess(data)
//         },function(err){//失败回调
//             self.hideLoader()
//             self.error(err)
//         })
//     },
// }
// // var ajaxtwo = new Ajaxtwo()
// Vue.prototype.$axios=Axios
// export default{
//     Axios
// }