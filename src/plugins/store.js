import { pmsLogin, pmsLogout } from '@/api/user.js'

import {
    getToken, setToken, removeToken,
    setPermission, removePermission,
    getNickName, setNickName, removeNickName,
    getUserAvatar, setUserAvatar, removeUserAvatar,
    getExpirationTime, setExpirationTime, removeExpirationTime,
    getIsActive, setIsActive, removeIsActive,
    getEmail, setEmail, removeEmail,
    removeDay,
} from './auth.js'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Cookies from "js-cookie";
import router, {asyncRoutes, constantRoutes, resetRouter} from './router'
import {filterAsyncRoutes} from "./filterRoutes";

const store = new Vuex.Store({
  state: {
      email:getEmail()||'',
      token: getToken(),
      nickname:getNickName() || '',
      useravatar:getUserAvatar() || '',
      expirationtime:getExpirationTime()||'',
      getday:'',
      isactive:getIsActive()||'',
      permission:[],
      roles:[],
      routes: [],
      addRoutes: [],
      //路由
      sidebar: {
        opened: !+Cookies.get('sidebarStatus'),
        withoutAnimation: false
      },
      device: 'desktop',
  },
	getters: {
      email: state => state.email,
      token: state => state.token,
      nickname: state => state.nickname,
      useravatar: state => state.useravatar,
      getday : state => state.getday,
      expirationtime : state => state.expirationtime,
      isactive : state => state.isactive,
      permission: state => state.permission,
      roles: state => state.roles,
      //  路由
      sidebar: state => state.sidebar,
      device: state => state.device,
    },

	mutations: {
      SET_DAY: (state, getday) => {
         state.getday = getday
      },
      SET_EMAIL: (state, email) => {
        state.email = email
      },
      SET_TOKEN: (state, token) => {
        state.token = token
      },
      SET_NICKNAME: (state, nickname) => {
        state.nickname = nickname
      },
      SET_USERAVATAR: (state, useravatar) => {
        state.useravatar = useravatar
      },
      SET_EXPIRATIONTIME: (state, expirationtime) => {
        state.expirationtime = expirationtime
      },
      SET_ISACTIVE: (state, isactive) => {
        state.isactive = isactive
      },
      SET_PERMISSION: (state, auth) => {
        state.permission = auth
      },
      SET_ROLES: (state, roles) => {
            state.roles = roles
      },
      SET_ROUTES: (state, routes) => {
            state.addRoutes = routes
            state.routes = constantRoutes.concat(routes)
      },
      TOGGLE_SIDEBAR: state => {
        if (state.sidebar.opened) {
          Cookies.set('sidebarStatus', 1)
        } else {
          Cookies.set('sidebarStatus', 0)
        }
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
      },
      CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 1)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
      },
      TOGGLE_DEVICE: (state, device) => {
        state.device = device
      },
    },

	actions: {
      // 登陆
      pmsLogin({ commit, state, dispatch }, formData) {
        return new Promise((resolve, reject) => {
          pmsLogin({ ...formData}).then(async res => {
            const { data } = res;
            commit('SET_EMAIL', data.email );
            setEmail(data.email);
            commit('SET_TOKEN', data.token );
            setToken(data.token);
            commit('SET_EXPIRATIONTIME', data.expiration_time);
            setExpirationTime(data.expiration_time);
            commit('SET_ISACTIVE', data.is_active);
            setIsActive(data.is_active);
            commit('SET_NICKNAME', data.nickname);
            setNickName(data.nickname);
            commit('SET_USERAVATAR', data.avatar);
            setUserAvatar(data.avatar);
            // 权限
            commit('SET_PERMISSION', data.authority_model||[])
            setPermission(data.authority_model || []);
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 退出
      pmsLogout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            commit('SET_EMAIL', '');
            commit('SET_TOKEN', '');
            commit('SET_USERAVATAR', '');
            commit('SET_NICKNAME', '');
            commit('SET_EXPIRATIONTIME', '');
            commit('SET_PERMISSION', '');
            commit('SET_ROLES', []);
            commit('SET_ISACTIVE', '');
            commit('SET_DAY', '');
            removeEmail();
            removeDay();
            resetRouter();
            removeToken();
            removeNickName();
            removePermission();
            removeUserAvatar();
            removeExpirationTime();
            removeIsActive();
            sessionStorage.clear();
            localStorage.clear();
            //刷新避免菜单栏不重新加载
            window.location.reload();
            resolve();
        })
      },
      // 清空
      pmsRemove({ commit }) {
        return new Promise(resolve => {
          commit('SET_EMAIL', '');
          commit('SET_TOKEN', '');
          commit('SET_USERNAME', '');
          commit('SET_USERID', '');
          commit('SET_NICKNAME', '');
          commit('SET_PERMISSION', '');
          commit('SET_DAY', '');
          removeDay();
          removeEmail();
          removeToken();
          removeNickName();
          removePermission();
          removeUserAvatar();
          removeIsActive();
          resolve()
        })
      },
      ToggleSideBar: ({ commit }) => {
         commit('TOGGLE_SIDEBAR')
      },
      CloseSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
      },
      ToggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
      },
      generateRoutes({ commit }, roles) {
            return new Promise(resolve => {
                let accessedRoutes
                if (roles.includes('All')) {
                    accessedRoutes = asyncRoutes || []
                } else {
                    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                }
                commit('SET_ROLES', accessedRoutes)
                resolve(accessedRoutes)
            })
      }
  }
})

export default store
