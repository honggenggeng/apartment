// config.dev.proxyTable['/api'].target="http://192.168.3.26:9500/"
import Vue from 'vue'
import config from '../../config/index.js';
import store from '../store/index.js';
import queryString from 'queryString';
var filterl=window.g.filterl
export default {
    deploy: function(url, params ){
        var data=""
        if(url.indexOf(filterl)>-1){
            store.commit('modulestoke/changeAutho1')
            data=params
            return data
        }else{
            store.commit('modulestoke/changeAutho2')
            data={
                "dataKey":JSON.stringify({
                    "code":"",
                    "msg":"",
                    "dataPackage":{
                        "cryptFlag":0,
                        "hashFlag":0,
                        "hash":"",
                        "signatureFlag":0,
                        "signature":"",
                        "business":{
                            "data":params
                        }
                    }
                })
            }
            return data
        }
    }
}
