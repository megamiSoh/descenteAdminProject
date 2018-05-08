import fetch from '@/utils/fetch'
import { getToken } from '@/utils/auth'
export function AdvertStates(data) {
  return fetch({
      url:
      'MainBanner/GetAdvertStates',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}
export function MainBanners(data) {
  return fetch({
    url:
    'MainBanner/GetMainBanners',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
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
export function EditIsAcive(data) {
  return fetch({
    url:
    'MainBanner/EditIsAcive',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function MainBanner(data) {
  return fetch({
    url:
    'MainBanner/AddMainBanner',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function GetDetail(data) {
  return fetch({
    url:
    'MainBanner/GetDetail',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function editMain(data) {
  return fetch({
    url:
    'MainBanner/EditMainBanner',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function getAdEvent(data) {
  return fetch({
    url:
    'AdEvent/GetAdEvents',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function AddAdEvent(data) {
  return fetch({
    url:
    'AdEvent/AddAdEvent',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function adDetail(data) {
  return fetch({
    url:
    'AdEvent/GetDetail',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function editAd(data) {
  return fetch({
    url:
    'AdEvent/EditAdEvent',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function getPush(data) {
  return fetch({
    url:
    'Push/GetPushs',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function GetSendPurposeCd() {
  return fetch({
    url:
    'Push/GetSendPurposeCd',
    method: 'get',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    }
  })
}
export function pushActive(data) {
  return fetch({
    url:
    'push/EditIsAcive',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function pushDetail(data) {
  return fetch({
    url:
    'Push/GetDetail',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function GetTargetSexCd() {
  return fetch({
    url:
    'Push/GetTargetSexCd',
    method: 'get',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    }
  })
}
export function GetTagetAgesCd() {
  return fetch({
    url:
    'Push/GetTagetAgesCd',
    method: 'get',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    }
  })
}
export function GetBoardStates() {
  return fetch({
    url:
    'Notice/GetBoardStates',
    method: 'get',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    }
  })
}
export function GetTargetShoesCd() {
  return fetch({
    url:
    'Push/GetTargetShoesCd',
    method: 'get',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    }
  })
}
export function GetActiveAdEvents(data) {
  return fetch({
    url:
    'AdEvent/GetActiveAdEvents',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function AddPushs(data) {
  return fetch({
    url:
    'Push/AddPushs',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}
export function EditPush(data) {
  return fetch({
    url:
    'Push/EditPush',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function testPush(data) {
  return fetch({
    url:
    'Notification/SendPushTest',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function GetAdminUserApps(data) {
  return fetch({
    url:
    'admin/GetAdminUserApps',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function adActive(data) {
  return fetch({
    url:
    'AdEvent/EditIsAcive',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function getsendstate() {
  return fetch({
    url:
    'Push/GetSendState',
    method: 'get',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    }
  })
}