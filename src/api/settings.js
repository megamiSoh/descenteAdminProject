import fetch from '@/utils/fetch'
import { getToken } from '@/utils/auth'
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

export function AddFaq(data) {
    return fetch({
      url:
      'Faq/AddFaq',
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
      'Faq/GetDetail',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}
export function GetNotices(data) {
    return fetch({
      url:
      'Notice/GetNotices',
      method: 'post',
      headers: {
         'Authorization': 'Bearer ' + getToken()
      },
      data
    })
}

export function EditNotice(data) {
  return fetch({
    url:
    'Notice/EditNotice',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function GetBoardStates() {
  return fetch({
    url:
    'Notice/GetBoardStates',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    
    })
}
export function EditIsAcive(data) {
  return fetch({
    url:
    'Notice/EditIsAcive',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function themeActive(data) {
  return fetch({
    url:
    'ThemeKind/EditIsAcive',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function noticeDetail(data) {
  return fetch({
    url:
    'Notice/GetDetail',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function GetFaqs(data) {
  return fetch({
    url:
    'Faq/GetFaqs',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function faqActive(data) {
  return fetch({
    url:
    'Faq/EditIsAcive',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function EditFaq(data) {
  return fetch({
    url:
    'Faq/EditFaq',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function themeDetail(data) {
  return fetch({
    url:
    'ThemeKind/GetDetail',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function themeRegist(data) {
  return fetch({
    url:
    'ThemeKind/EditThemeKind',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function AddThemeKind(data) {
  return fetch({
    url:
    'ThemeKind/AddThemeKind',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function GetThemeKinds(data) {
  return fetch({
    url:
    'ThemeKind/GetThemeKinds',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function inforegist(data) {
  return fetch({
    url:
    'Notice/AddNotice',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}