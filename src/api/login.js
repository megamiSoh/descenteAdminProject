import fetch from '@/utils/fetch'
import { getToken, reToken } from '@/utils/auth'
export function login(data) {
  return fetch({
    url:
    'https://trainingservice-auth-dev.azurewebsites.net/token',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return fetch({
    url: '/user/GetUserName',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export function submitForm(data) {
  return fetch({
    url: 'user/Getusers',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function getLoginInfo() {
  return fetch({
      url: '/admin/GetLoginUserInfo',
      method: 'get',
      headers: {
          'Authorization': 'Bearer ' + getToken()
      }
  })
}
// export function logout() {
//   return fetch({
//     url: '/user/logout',
//     method: 'post'
//   })
// }

// import fetch from '@/utils/fetch'

// export function login(username, password) {
//   return fetch({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

// export function getInfo(token) {
//   return fetch({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return fetch({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
