import { asyncRouterMap, constantRouterMap } from '@/router/index'

/**
 * meta.role을 사용하여 현재 사용자 권한이 일치하는지 확인하십시오
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // console.log(roles.meta)
  if (roles.indexOf('meta') >= 0) {
    // alert('xxxxxxx')
    return roles.some(role => route.meta.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 비동기식 라우팅 테이블을 반복적으로 필터링하고 사용자 역할 권한을 따르는 라우팅 테이블을 반환합니다.
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  // alert('filter')
  
  // alert(JSON.stringify(route.roles))
  // console.log(asyncRouterMap)
  // console.log(route.)
  const accessedRouters = asyncRouterMap.filter(route => {
    


    // console.log(route.meta)
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
        console.log(asyncRouterMap)

      }
      return true
    }
    return false
  })
  // console.log(accessedRouters)
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        // alert(JSON.stringify(roles))
        let accessedRouters
    //    alert(roles.indexOf('admin') >= 0)
        if (roles.length >= 0) {
          accessedRouters = asyncRouterMap
        //  alert(2)
        } else {
          // alert('else')
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
