// export function getToken() {
//   // return Cookies.get(TokenKey)
//   return localStorage.getItem('access_token')
// }

// export function setToken() {
//   // return Cookies.set(TokenKey, token)
//   return localStorage.setItem('access_token',response.data.access_token)
// }

// export function removeToken() {
//   return localStorage.removeItem('access_token')
// }

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const reTokenKey = 'Admin-ReToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function reToken() {
  return Cookies.get(reTokenKey)
}
export function setReToken(retoken) {
  return Cookies.set(reTokenKey, retoken)
}