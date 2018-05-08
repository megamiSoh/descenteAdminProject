import fetch from '@/utils/fetch'
import { getToken } from '@/utils/auth'
export function GetPurposeCategory() {
  return fetch({
    url:
    '/Sports/GetPurposeCategory',
    method: 'get',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    }
  })
}
  
  export function GetIntensityCd() {
    return fetch({
      url:
      '/MainExercise/GetIntensityCd',
      method: 'get',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      }
    })
}
export function orGetSpts(data) {
    return fetch({
      url:
      '/Sports/GetSports',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}
export function GetTimeRange() {
    return fetch({
      url:
      '/Theme/GetTimeRange',
      method: 'get',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      
    })
}
export function AddSports(data) {
    return fetch({
      url:
      '/Sports/AddSports',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}
export function Exercises(data) {
    return fetch({
      url:
      '/MainExercise/GetActiveMainExercises',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}
export function GetActiveWarmups(data) {
    return fetch({
      url:
      '/Warmup/GetActiveWarmups',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}
export function Cooldowns(data) {
    return fetch({
      url:
      'Cooldown/GetActiveCooldowns',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}
export function GetExerKind() {
    return fetch({
      url:
      'MainExercise/GetExerKind',
      method: 'get',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      
    })
}
export function PurposeCategory() {
    return fetch({
      url:
      'Sports/GetPurposeCategory',
      method: 'get',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      
    })
}
export function IntensityCd() {
    return fetch({
      url:
      'MainExercise/GetIntensityCd',
      method: 'get',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      
    })
}
export function PhotoModels(data) {
    return fetch({
      url:
      'Cheering/GetPhotoModels',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}
export function GetPurposeCategor() {
    return fetch({
      url:
      'Theme/GetPurposeCategory',
      method: 'get',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      
    })
}
export function GetEffectUnitCd() {
    return fetch({
      url:
      'MainExercise/GetEffectUnitCd',
      method: 'get',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      
    })
}
export function EncodeVideos(data) {
    return fetch({
      url:
      'Video/GetEncodeVideos',
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
      },
      
    })
}
export function GetWarmupPart(data) {
    return fetch({
      url:
      'Warmup/GetWarmupPart',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}
export function GetFaqDivision() {
    return fetch({
      url:
      'Faq/GetFaqDivision',
      method: 'get',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      
    })
}

export function editIsActive(data) {
  return fetch({
    url:
    'Sports/EditIsAcive',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function editSports(data) {
  return fetch({
    url:
    'Sports/EditSports',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function sportsDetail(data) {
  return fetch({
    url:
    'sports/GetDetail',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
