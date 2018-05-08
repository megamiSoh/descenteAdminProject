import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

const service1 = axios.create({
    // baseURL: 'http://smartshoe-auth.azurewebsites.net',// api의base_url
  baseURL:  process.env.BASE_API,
  timeout: 15000                  // 요청 제한 시간
  })
// request 인터셉터
service1.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 각 요청에 실제 상황에 따라 사용자 지정 토큰을 전달하게합니다.
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone인터셉터
service1.interceptors.response.use(
  response => {
    service1.interceptors.response.use(
     function(response) {
        // continue sending response to the then() method
       return Promise.resolve(response)
      },
      function (error) {
        // check if unauthorized error returned
        if (error.response.status === 401) {
          router.replace({ name: 'Signin' })
        }
        // request is rejected and will direct logic to the catch() method
        return Promise.reject(error)
      }) }
)
 service1: ({ action, next, error, getState, dispatch }, actionOptions) => {
    console.log('400,500 response goes here');
    console.log('i even can dispatch action in here');
  }
  export default service1
