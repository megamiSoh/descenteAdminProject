import fetch from '@/utils/fetch'
import { getToken } from '@/utils/auth'
export function warmPart(data) {
  return fetch({
    url:
    '/warmup/GetWarmupPart',
    method: 'post',
    headers: {
       'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function getModel(data) {
  return fetch({
    url: '/Cheering/GetPhotoModels',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    data
  })
}

export function getWarm(data) {
    return fetch({
        url: '/Warmup/GetWarmups',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
}
export function EditIsAcive(data) {
    return fetch({
        url: '/Warmup/EditIsAcive',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
}

export function GetVideoMenus() {
    return fetch({
        url: '/Menu/GetVideoMenus',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export function getMedia(data) {
    return fetch({
        url: '/Video/GetEncodeVideos',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' +  getToken()
        },
        data
    })
}

export function GetWarmupPart(data) {
    return fetch({
        url: '/Warmup/GetWarmupPart',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data

    })
}

export function AddWarmup(data) {
    return fetch({
        url: '/Warmup/AddWarmup',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
}

export function getDetail(data) {
    return fetch({
        url: '/Warmup/GetDetail',
        method: 'post',    
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
}

export function editWarmup(data) {
    return fetch({
        url: '/Warmup/EditWarmup',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data
    })
}


// warmup Api End
// Main Api Start

export function getExerKind(){
    return fetch({
        url: '/MainExercise/GetExerKind',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export function getIntensity() {
    return fetch({
        url: 'MainExercise/GetIntensityCd',
        method: 'get',
        headers: {
            'Authorization': 'Bearer '+getToken()
        }
    })
}

export function getMuscleArea() {
    return fetch({
        url: 'MainExercise/GetMuscleArea',
        method: 'get',
        headers: {
            'Authorization': 'Bearer '+getToken()
        }
    })
}

export function getEffectCd() {
    return fetch({
        url: 'MainExercise/GetEffectUnitCd',
        method: 'get',
        headers: {
            'Authorization': 'Bearer '+getToken()
        }
    })
}

export function addMainExer(data) {
    return fetch({
        url: 'MainExercise/AddMainExercise',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function mainActive(data) {
    return fetch({
        url: 'MainExercise/EditIsAcive',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function getMain(data) {
    return fetch({
        url: 'MainExercise/GetMainExercises',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function getMainDetail(data) {
    return fetch({
        url: 'MainExercise/GetDetail',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+ getToken()
        },
        data
    })
}

export function editmainExer(data) {
    return fetch({
        url: 'MainExercise/EditMainExercise',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

// mainApiEnd
// CoolApiStart

export function getCool(data) {
    return fetch({
        url: '/Cooldown/GetCooldowns',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function coolActive(data) {
    return fetch({
        url: '/Cooldown/EditIsAcive',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function addCool(data) {
    return fetch({
        url: '/Cooldown/AddCooldown',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function coolDetail(data) {
    return fetch({
        url: '/Cooldown/GetDetail',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function coolRemove(data) {
    return fetch({
        url: '/Cooldown/EditCooldown',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

//coolApiEnd
//ThemeApiStart

export function getTheme(data) {
    return fetch({
        url: 'Theme/GetThemes',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function getPurposeCategory() {
    return fetch({
        url: 'Theme/GetPurposeCategory',
        method: 'get',
        headers: {
            'Authorization': 'Bearer '+getToken()
        }
    })
}

export function GetTimeRange() {
    return fetch({
        url: 'Theme/GetTimeRange',
        method: 'get',
        headers: {
            'Authorization': 'Bearer '+getToken()
        }
    })
}

export function addTheme(data) {
    return fetch({
        url: 'Theme/AddTheme',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function warmActive(data) {
    return fetch({
        url: 'Warmup/GetActiveWarmups',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function getMainActive(data) {
    return fetch({
        url: 'MainExercise/GetActiveMainExercises',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function getCoolActive(data) {
    return fetch({
        url: 'Cooldown/GetActiveCooldowns',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function themeDetail(data) {
    return fetch({
        url: 'Theme/GetDetail',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function EditTheme(data) {
    return fetch({
        url: 'Theme/EditTheme',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

// ThemeApiEnd
// cheerupApiStart

export function GetCheerings(data) {
    return fetch({
        url: 'Cheering/GetCheerings',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function AddCheering(data) {
    return fetch({
        url: 'Cheering/AddCheering',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function cheerDetail(data) {
    return fetch({
        url: 'Cheering/GetDetail',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function EditCheering(data) {
    return fetch({
        url: 'Cheering/EditCheering',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function themeActive(data) {
    return fetch({
        url: 'Theme/EditIsAcive',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}

export function footGroupName(name) {
    return fetch({
        url: 'FootPress/GetFootPresssGroupNames',
        method: 'get',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        params: {name}
    })
}

export function getvideoUrl(data) {
    return fetch({
        url: 'file/GetVideoUri',
        method: 'post',
        headers: {
            'Authorization': 'Bearer '+getToken()
        },
        data
    })
}