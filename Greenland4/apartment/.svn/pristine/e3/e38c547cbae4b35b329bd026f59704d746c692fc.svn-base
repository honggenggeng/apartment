import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {

        // 权限 token
        accessToken: '',

        // 刷新 Token
        refreshToken: ''
    },
    mutations: {

        // set 方法
        setAccessToken (state, data) {
            state.accessToken = data;
        },
        setRefreshToken (state, data) {
            state.refreshToken = data;
        },

        // delete 方法
        delAccessToken (state) {
            state.accessToken = '';
        },
        delRefreshToken (state) {
            state.refreshToken = '';
        }
    },
    getters: {
        getRefreshToken: state => {
            return state.refreshToken;
        },
        getAccessToken: state => {
            return state.accessToken;
        }
    },
    actions: {
        commitRefreshToken: ({commit}, refreshToken) => commit('setRefreshToken', refreshToken),
        commitAccessToken: ({commit}, accessToken) => commit('setAccessToken', accessToken)
    },
    modules: {
        app,
        user
    }
});

export default store;
