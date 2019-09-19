import axios from 'axios'
import router from '../router'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import { getLoginInfo } from '@/api/login'
import formurlencoded from 'form-urlencoded'
import Cookies from 'js-cookie'
import { login } from '@/api/login'

// import { getLoginInfo, login } from '@/api/login'
let isRefreshing = false;
let refreshSubsc = [];
//axios 인스턴스 만들기
const service = axios.create({
  baseURL: 'https://trainingservice-api-dev.azurewebsites.net/api/', // api의base_url
  // baseURL: 'https://smartshoe-api-dev.azurewebsites.net/api/',
  // timeout: 15000                  // 요청 제한 시간
})
// request Interceptor
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
    
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// responeInterceptor

    service.interceptors.response.use(
      response => { 
      return response.data
    },
     err => {


const originalRequest = err.response.config
  // if server sent status code 401, will start this function. By MegamiSoh
if(err.response.status === 401 && !originalRequest.__isRetryRequest && originalRequest) {
  console.log('401 interceptor!')
            
  if(!isRefreshing) {
    isRefreshing = true;
    console.log('401 interceptor! in here')
      var retoken = localStorage.getItem('refresh')
      var data = formurlencoded({ 'grant_type': 'refresh_token', 'refresh_token': retoken, 'client_id': 'DssfAdminWeb' })
   store.dispatch('Login', data) 
     .then(() => {
       isRefreshing = false
       originalRequest.__isRetryRequest = true
       console.log('tokenInhere')
       location.reload()
       // refresh page For Render this page  And then Refresh Token throwing Success. By MegamiSoh 
      onRefresh(getToken())
     })
     .catch(() => {
       // Be on top 401 function failure, error message render
      MessageBox.alert('세션이 만료되어, 로그아웃 되었습니다.', 'LogOut', {
        confirmButtonText: 'OK',
        center: true,
        type: 'error', 
        callback: action => {
          Message({
            message: '세션이 만료되어, 로그아웃 되었습니다.',
            type: 'error',
            duration: 5 * 1000
          });
          store.dispatch('LogOut')
          location.reload() 
        }
      })
      
      return Promise.reject(err)
     })
  } 

  const retryToken = new Promise((resolve, reject) => {    
        tokenRefresh(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token
        service.defaults.headers.common['Authorization'] = 'Bearer ' + token
        service.defaults.headers['Authorization'] = 'Bearer ' + token
          return Promise.resolve(service(originalRequest))
        })
      })
      return retryToken
} else if (err.response.status === 404 && !originalRequest._retry || err.response.status === 500 ) {
  originalRequest._retry = true
  Message({
    message: '관리자에 문의해 주세요.',
    type: 'error',
    duration: 5 * 1000
  });
  
} 
// else if(err.response.status === 400 && !originalRequest._retry) {
//     MessageBox.alert('로그아웃 되었습니다', 'LOGOUT', {
//       confirmButtonText: 'OK',
//       center: true,
//       type: 'error', 
//       callback: action => {
//         Message({
//           message: '로그아웃 되었습니다',
//           type: 'error',
//           duration: 5 * 1000
//         });
//         store.dispatch('LogOut')
//         location.reload() 
//       }
//     })
    
//     return Promise.reject(err)
//   }

    }
  )

  function tokenRefresh(cb) {
    refreshSubsc.push(cb)
  }

  function onRefresh(token) {
    refreshSubsc.map(cb=> cb(token))
  }
export default service
