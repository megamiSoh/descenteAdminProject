import fetch from '@/utils/fetch'
import { getToken } from '@/utils/auth'
export function GetAdmins(data) {
  return fetch({
    url:
    '/admin/GetAdmins',
    method: 'post',
    header: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function getMenu() {
  return fetch({
    url: 'Menu/GetMenus',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function onlyUser(data) {
  return fetch({
    url: 'user/GetOnlyUsers',
    method: 'post',
    header: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function getUsers(data) {
    return fetch({
        url: '/user/GetDetail',
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

export function adminDetail(data) {
    return fetch({
        url: '/admin/GetDetail',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
}

export function authMenu() {
    return fetch({
        url: '/Menu/GetAdminMenus',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export function getAdmin(data) {
    return fetch({
        url: '/admin/GetAdmins',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data

    })
}

export function addAdmin(data) {
    return fetch({
        url: '/admin/AddAdmin',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data

    })
}

export function removeAdmin(data) {
    return fetch({
        url: '/admin/RemoveAdminRole',
        method: 'put',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data

    })
}

export function editAdmin(data) {
    return fetch({
        url: '/admin/EditAdmin',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
}

export function quitAdmin(data) {
    return fetch({
        url: '/admin/GetQuitAdmins',
        method: 'post',    
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
}

export function quitDetail(data) {
    return fetch({
        url: '/admin/GetQuitDetail',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
}

export function RestoreAdminRole(data) {
    return fetch({
        url: '/admin/RestoreAdminRole',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
}


export function footDetail(data) {
    return fetch({
        url: '/FootPress/GetLogFootPressures',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + 1
        },
        data
    })
  }

  export function footData(data) {
    return fetch({
        url: '/FootPress/GetDetailLogFootPressure',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
  }

  export function footLogKind() {
    return fetch({
        url: '/Log/GetUseLogFootPressKinds',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
  }

  export function deleteChart(data) {
    return fetch({
        url: '/FootPress/RemoveLogFootPressure',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function editChart(data) {
    return fetch({
        url: '/FootPress/EditUseLogFootPressData',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function sliceChart(data) {
    return fetch({
        url: '/Log/AddLogFootPressCutStartEnd',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function addGroup(data) {
    return fetch({
        url: '/Log/AddLogFootGroup',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function getLogFootGroup(data) {
    return fetch({
        url: '/FootPress/GetLogFootGroups',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function footGroupName( division, name) {
    return fetch({
        url: 'FootPress/GetFootPresssGroupNames',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        params: {
            division: division,
            name: name
        }
    })
}

export function footpressgroups() {
    return fetch({
        url: 'FootPress/GetFootPresssGroups',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
  }

  export function getLogFootGroups(data) {
    return fetch({
        url: 'FootPress/GetLogFootGroups',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function removeFootGroup(data) {
    return fetch({
        url: 'FootPress/RemoveLogFootGroup',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }
  export function detailFootGroup(data) {
    return fetch({
        url: 'FootPress/GetDetailLogFootGroup',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function footGroupRegist(data) {
    return fetch({
        url: 'FootPress/AddLogFootGroup',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }
  

  export function footGroupRegistItem(data) {
    return fetch({
        url: 'FootPress/AddLogFootGroupItem',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function footCutInfo(data) {
    return fetch({
        url: 'FootPress/AddLogFootPressCutInfo',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function footCutInfos(data) {
    return fetch({
        url: 'FootPress/GetLogFootPressCutInfos',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function removeCutInfo(data) {
    return fetch({
        url: 'FootPress/RemoveLogFootPressCutInfo',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function movefootInfo(data) {
    return fetch({
        url: 'FootPress/MoveLogFootPressCutInfo',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function copyfootInfo(data) {
    return fetch({
        url: 'FootPress/CopyLogFootPressCutInfo',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function editFootGroup(data) {
    return fetch({
        url: 'FootPress/EditLogFootGroup',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }
  export function retoreOrigin(data) {
    return fetch({
        url: 'FootPress/RestoreOriginFootData',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }

  export function homeSummary(data) {
    return fetch({
        url: 'Home/GetHomeSummary',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
  }

  export function editLogFoot(data) {
    return fetch({
        url: 'FootPress/EditLogFootPressure',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
  }