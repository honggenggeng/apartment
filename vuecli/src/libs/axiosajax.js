import axios from 'axios'
import Vue from 'vue'
import $ from './jquery.min.js'
import queryString from 'queryString'
const API_HOST = process.env.API_HOST
// console.log('API_HOST',API_HOST)
var instance =axios.create({
    baseURL:API_HOST,//基础URL
    timeout:10000, //请求延时时间   个人认为给后台返回数据的时间
    headers: { //自定义请求头内容
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',//转换为key=value的格式必须增加content-type
    },
    responseType: 'json',  //请求数据类型包括  'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    params: {},  //无论请求为何种类型，在params中的属性都会以key=value的格式在urlzhong拼接
    transformRequest: [function (data) {
        // data.age = 30;  //发送之前增加的属性
        console.log('transformRequest',data)
        // return queryString.stringify(data) //data:'pomelo=tt&test=test&age=30'
        return data;//data:{pomelo: "tt", test: "test", age: 30}
    }],
    transformResponse: [function(data){
        // console.log('transformResponse',data)
        return data
    }],   //transformResponse` 在传递给 then/catch 前，允许修改响应数据
    validateStatus: function(status){
    　　return status < 400 //状态码小于400时均为成功（返回true）
    }, //validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    // cancelToken  //取消请求，下文详细说明
});
// http request 请求拦截器
instance.interceptors.request.use(//在发送请求之前 拦截数据 ， return 相当于继续向后台发送访问
    config => {
        console.log('发送拦截',config)
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
instance.interceptors.response.use(//在每次请求后台返回的数据之前 进行拦截 
    response => {
        console.log('返回拦截',response)
        // var data=response.data
        return response;
    },
    error => {
        console.log("返回数据报错了")
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
function apiAxios(method, url, params, sccess ,error) {//获取export default处理后的参数在进行下一步操作
    instance({//相当于axios请求
      method: method,
      url: url,
    //   data: method === 'POST' || method === 'PUT' ? params : null,
    //   params: method === 'GET' || method === 'DELETE' ? params : null,
      data:params //自己配置
    }).then(function (data) {
        sccess(data);
    }).catch(function (res) {
        error(res);
    })
  }
// export default {  //对发送的请求进行处理
    function get(url, params ,sccess , error) { //get请求的参数需要是{dat:{a:'1'}}
    //   params={data:params}
      return apiAxios("GET",url,params,sccess,error)
    }
    function post(url, params , sccess , error) {  //post请求的参数要是{a:'1'}
      return apiAxios("POST",url, params,sccess , error)
    }
    function put(url, params, response) {
      return apiAxios('PUT', url, params, response)
    }
    // function delete(url, params, response) {
    //   return apiAxios('DELETE', url, params, response)
    // }
// }


exports.install = function (Vue, options) {
    Vue.prototype.axiosajax = function (opts){
        console.log("参数",opts)
        this.type         = opts.type || "post";
        this.url          = opts.url;
        this.param        = opts.param || {};
        this.isShowLoader = opts.isShowLoader || false;
        this.dataType     = opts.dataType || "json";
        this.sccess     = opts.sccess;
        this.error      = opts.error;
        switch (this.type) {
            case "get":
                get(this.url,this.param,this.sccess,this.error);
            case "post":
                post(this.url,this.param,this.sccess,this.error);
        }
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