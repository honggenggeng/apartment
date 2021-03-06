import axios from 'axios';
import env from '../../build/env';
import semver from 'semver';
import packjson from '../../package.json';
import store from '../store/index.js';

let util = {};
util.title = function (title) {
    title = title || 'iView admin';
    window.document.title = title;
};
      // 'http://192.168.0.137:8081',
      // 'http://65.52.174.145:8081',
      // 'http://192.168.0.149:8081',
      // 192.168.0.151:8085
      //  13.70.0.249
// 此处url最后面都不加/，接口调用时最前面都加/，做到格式统一
const ajaxUrl = env === 'development'
    ? 'http://65.52.174.145:8082'
    : env === 'production'
        ? 'http://65.52.174.145:8082'
        : 'http://65.52.174.145:8082';

        
// edit by aptenodyte 修改跨域配置 before
// util.ajax = axios.create({
//     baseURL: ajaxUrl,
//     timeout: 30000
// });

util.ajaxUrl = ajaxUrl;

// edit by aptenodyte 修改跨域配置 after
util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    withCredentials: true // 允许带凭据
    // headers: {'Content-Type': 'application/json;charset=utf-8'} // 请求类型
});

// add by aptenodyte 刷新token的请求方法
function getRefreshToken () {
    // oauth2 只能识别url中的参数，所以该参数不可能在body中，刷新接口：/uaa/oauth/token?grant_type=refresh_token&refresh_token=
    return util.ajax.post('/auth/oauth/token?grant_type=refresh_token&refresh_token=' + localStorage.getItem('refresh_token'));
}

//add by aptenodyte 请求拦截器
util.ajax.interceptors.request.use(
    config => {
        // console.log('ajax.interceptors.request.use accessToken = ' + localStorage.getItem('access_token'));

        // 添加 Basic Auth 验证参数(不同 Module 的 Basic Auth 不一样，登录时根据页面上的“系统管理员”选项将 Basic Auth 写到 localStorage)
        config.headers.Authorization = localStorage.getItem('basic_auth');

        
         //config.headers['Content-Type'] = 'application/x-www-form-urlencoded'; // 不能加这句

        // 去除前后空格
        config.url = config.url.trim();
        //oauth2 接口 /oauth/token 不用自动加access_token
        if (config.url.indexOf('/auth/oauth/token') == -1) {
            // (oauth2 只能识别url中的access_token，所以该参数不可能在body中)
            if (config.url.indexOf('?') > 0) {
                config.url += 'access_token=' + localStorage.getItem('access_token');
            } else {
                config.url += '?access_token=' + localStorage.getItem('access_token');
            }
        }

        return config;
    },
    err => {
        console.log('请求拦截器出错，错误信息：' + err);
    }
);

//add by aptenodyte 响应拦截器
util.ajax.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    // console.log('axios.interceptors.response error:' + err.toLocaleString());

    if (err.response !== undefined && err.response.status !== undefined && err.response.status === 401) {
        // 删除过期的access_token
        // store.commit('delAccessToken');

        var testToken = getRefreshToken();
        testToken.then(function (res) {
            //if (res.status === 200 && res.data.status === true) {
            if (res.status === 200 ) {
                // 更新 access_token
                localStorage.setItem('access_token', res.data.access_token);

                // 更新 refresh_token
                localStorage.setItem('refresh_token', res.data.refresh_token);

                // 将url里的域名去掉，防止请求中域名连续拼两次
                err.config.url = err.config.url.replace(ajaxUrl, '');

                // url 中 access_token 前面的部分
                var urlFront = err.config.url.substring(0, err.config.url.indexOf('access_token'));

                // url 中 access_token 后面的部分（如果后面没有&符号，说明后面无参数，该部分为空）
                var urlBack = '';
                if (err.config.url.indexOf('&', err.config.url.indexOf('access_token')) !== -1) {
                    urlBack = err.config.url.substring(err.config.url.indexOf('&', err.config.url.indexOf('access_token')), err.config.url.length);
                }

                // 更新请求URL中的 access_token(oauth2 只能识别url中的access_token，所以该参数不可能在body中)
                err.config.url = urlFront + 'access_token=' + localStorage.getItem('access_token') + urlBack;

                // 再次请求原来的接口
                return axios(err.config);
            } else {
                // // 清空 token 信息
                // localStorage.setItem('access_token', '');
                // localStorage.setItem('refresh_token', '');

                //跳转到主页， 跳转时会经过 src/router/index.js 里的路由拦截器，localStorage里没有access_token就跳转到登录页
                location.replace('/');
            }
        });
    } 
    else {
        // // 清空 token 信息
        //  localStorage.setItem('access_token', '');
        //  localStorage.setItem('refresh_token', '');

        // // 跳转到主页， 跳转时会经过 src/router/index.js 里的路由拦截器，localStorage里没有access_token就跳转到登录页
        // location.replace('/');
    }
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
     } else {
    //     let currentPathObj = vm.$store.state.app.routers.filter(item => {
    //         if (item.children.length <= 1) {
    //             return item.children[0].name === name;
    //         } else {
    //             let i = 0;
    //             let childArr = item.children;
    //             let len = childArr.length;
    //             while (i < len) {
    //                 if (childArr[i].name === name) {
    //                     return true;
    //                 }
    //                 i++;
    //             }
    //             return false;
    //         }
    //     })[0];
    //     if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
    //         currentPathArr = [
    //             {
    //                 title: '首页',
    //                 path: '',
    //                 name: 'home_index'
    //             }
    //         ];
    //     } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
    //         currentPathArr = [
    //             {
    //                 title: '首页',
    //                 path: '/home',
    //                 name: 'home_index'
    //             },
    //             {
    //                 title: currentPathObj.title,
    //                 path: '',
    //                 name: name
    //             }
    //         ];
    //     } else {
    //         let childObj = currentPathObj.children.filter((child) => {
    //             return child.name === name;
    //         })[0];
    //         currentPathArr = [
    //             {
    //                 title: '首页',
    //                 path: '/home',
    //                 name: 'home_index'
    //             },
    //             {
    //                 title: currentPathObj.title,
    //                 path: '',
    //                 name: currentPathObj.name
    //             },
    //             {
    //                 title: childObj.title,
    //                 path: currentPathObj.path + '/' + childObj.path,
    //                 name: name
    //             }
    //         ];
    //     }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
    // 全屏相关
};

// util.checkUpdate = function (vm) {
//     axios.get('https://api.github.com/repos/iview/iview-admin/releases/latest').then(res => {
//         let version = res.data.tag_name;
//         vm.$Notice.config({
//             duration: 0
//         });
//         if (semver.lt(packjson.version, version)) {
//             vm.$Notice.info({
//                 title: 'iview-admin更新啦',
//                 desc: '<p>iView-admin更新到了' + version + '了，去看看有哪些变化吧</p><a style="font-size:13px;" href="https://github.com/iview/iview-admin/releases" target="_blank">前往github查看</a>'
//             });
//         }
//     });
// };
//格式化时间
util.formatTime=function(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var    Y = date.getFullYear() + '-';
    var   M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var    D = date.getDate() < 10 ? '0'+date.getDate()+' ' : date.getDate()+' ';
    var    h = date.getHours() < 10 ? '0'+date.getHours()+":" : date.getHours()+":";
    var   m = date.getMinutes() < 10 ? '0'+date.getMinutes()+":" : date.getMinutes()+":";
    var   s = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m+s;
}
export default util;
