import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import formurlencoded from 'form-urlencoded'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import { getLoginInfo, login } from '@/api/login'
import { authMenu } from '@/api/admin'
const user = {
  state: {
    token: getToken(),
    retoken: reToken(),
    name: '',
    avatar: '',
    roles: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    RE_TOKEN: (state, token) => {
      state.retoken = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 로그인
    Login({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      
      return new Promise((resolve, reject) => {
        login(userInfo)
              .then(response => {
                const data = response
                commit('SET_TOKEN', data.access_token)
                setToken(data.access_token)
                console.log('inLogin')
                localStorage.setItem('refresh', data.refresh_token)
                resolve()
            })
        .catch(error => {
          console.log(error)
          reject(error)
          })
        })
      },
    
      reLogin({ commit }, tokenInfo) {
        return new Promise((resolve, reject) => {
          login(tokenInfo)
            .then(response => {
              alert('relogin')
              removeToken()
              const data = response
              setToken(data.access_token)
              commit('SET_TOKEN', data.access_token)
              localStorage.setItem('refresh', data.refresh_token)
              console.log(1 + localStorage.getItem('refresh'))

              resolve()
            })
          .catch(error => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
            location.reload()
            })
          })
        },
  
    
    // 사용자 정보 얻기
    
    GetInfo({ commit, state }, userInfo) {
      return new Promise((resolve, reject) => {
      getLoginInfo(state.token)
      .then(response => {
        console.log('info')
        commit('SET_NAME', response.admin.name)
        commit('SET_ROLES', response.menuAuth)
        resolve(response)
      })
      .catch(response => {
        Message({
          message: '관리자 권한이 없어 접근할 수 없습니다.',
          type: 'error',
          duration: 5 * 1000
        });
        commit('SET_TOKEN', '')
        removeToken()
        localStorage.clear();
        localStorage.getItem('')
        resolve()
      })
      })
    },

    // 로그 아웃
    LogOut({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('paging', '')
        commit('list', '')
        commit('search', '')
        localStorage.clear();
        removeToken()
        resolve()
      })
    }
    },

    // 정면 출구
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        localStorage.clear();
        removeToken()
        resolve()
      })
    }
}

export default user
