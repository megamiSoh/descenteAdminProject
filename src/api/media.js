import fetch from '@/utils/fetch'
import { getToken } from '@/utils/auth'
export function GetEncodeStatess(data) {
    return fetch({
      url:
      'Video/GetEncodeStates',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}

export function GetVideoMenus() {
    return fetch({
      url:
      'Menu/GetVideoMenus',
      method: 'get',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      }
    })
}

export function GetVideos(data) {
    return fetch({
      url:
      'Video/GetVideos',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}

export function EncodeVide(data) {
    return fetch({
      url:
      'file/EncodeVideo',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}

export function Remove(data) {
    return fetch({
      url:
      'Video/Remove',
      method: 'put',
      headers: {
         'Authorization': 'Bearer ' + getToken(),
         'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data
    })
}

export function AddVideos(data) {
    return fetch({
      url:
      'Video/AddVideos',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}