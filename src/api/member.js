import fetch from '@/utils/fetch'
import { getToken } from '@/utils/auth'
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

export function getUsers(data) {
  return fetch({
    url: '/user/GetDetail',
    method: 'post',
    data,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function sendPwd(data) {
  return fetch({
    url: '/user/InitialPassword',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function monthSummary(data) {
  return fetch({
    url: '/User/GetUserExerciseMonthSummary',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function exerDate(data) {
  return fetch({
    url: '/User/GetUserExerciseDates',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function getDayUserexer(data) {
  return fetch({
    url: '/User/GetDayUserExercises',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function bodyGroups(data) {
  return fetch({
    url: '/User/GetUserBodyGroups',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function askgroups(data) {
  return fetch({
    url: '/User/GetUserAskGroups',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function badgedetail(data) {
  return fetch({
    url: '/User/GetAchieveBadges',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function detailuserbadge(data) {
  return fetch({
    url: '/User/GetDetailUserBadge',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function badgeLevel(data) {
  return fetch({
    url: '/User/GetUserBadgeLevels',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function badgehistory(data) {
  return fetch({
    url: '/User/GetAchieveBadgeHistorys',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function askresultInfo(data) {
  return fetch({
    url: '/User/GetUserAskResultInfo',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function askanswer(data) {
  return fetch({
    url: '/User/GetUserAskAnswerInfo',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function themeuser(data) {
  return fetch({
    url: '/User/GetThemeUserExerciseInfo',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function getExerKind(){
  return fetch({
      url: '/MainExercise/GetExerKind',
      method: 'get',
      headers: {
          'Authorization': 'Bearer ' + getToken()
      }
  })
}