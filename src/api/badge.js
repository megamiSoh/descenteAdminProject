import fetch from '@/utils/fetch'
import { getToken } from '@/utils/auth'
export function badgeCon() {
  return fetch({
    url:
    '/Badge/GetBadgeItem',
    method: 'get',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function getDetailData(data) {
  return fetch({
    url: '/Badge/GetDetail',
    method: 'post',
    data,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function badgeAdd(data) {
  return fetch({
    url: '/Badge/AddBadge',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function getBadge(data) {
    return fetch({
        url: '/Badge/GetBadges',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
}

export function getActivate(data) {
    return fetch({
        url: '/Badge/EditIsAcive',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data

    })
}

export function badgeRemove(data) {
    return fetch({
        url: '/Badge/EditBadge',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data

    })
}