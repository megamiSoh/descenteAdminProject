import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 진행률 표시 줄
import 'nprogress/nprogress.css'// Progress 진행 스타일
import { getToken } from '@/utils/auth' // 승인
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    }  
    else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {

          const roles = res.menuAuth
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            next()
            router.addRoutes(store.getters.addRouters)     
            // console.log('stre' + JSON.stringify(store.getters.addRouters))
            // console.log({ ...to })
            next({ ...to })
          })
        })
      } else {
        // store.dispatch('GetInfo').then(res => {
          // const roles = res.menuAuth
          const roles = store.getters.roles
          // console.log(store.getters.roles)
          // console.log(roles)
            if(
            roles.filter(item => {
              return item.menuId === to.meta.menuId
            }).filter(item => {
              return item.authDivision === to.meta.authDivision
            }).length > 0
          ) {
  
              return next()
          } 
          else {
            if(to.path === '/dashboard') {
             return next() 
            } else {
            Message({
                  message: '권한이 없어 접근할 수 없습니다.',
                  type: 'error',
                  duration: 5 * 1000
                });
            NProgress.done()
            return next(false) 
          }
          }
        // })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // TheEnd Progress
})
