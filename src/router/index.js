import Vue from 'vue'
import Router from 'vue-router'
// import { getMenu } from '@/api/admin'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/

// alert(this.menuName)
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: Layout,
    redirect: '/dashboard',
    name: '404',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  }
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    noDropdown: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  },
  {
    path: '/member',
    component: Layout,
    icon: 'form',
    meta: { authDivision: 'DR', menuId: 1 },
    children: [
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'memberlist', component: _import('page/memberlist'), hidden: true, meta: { authDivision: 'DR', menuId: 2 }},
          { path: '/memberlist/memdetail', component: _import('page/memdetail/memdetail'), hidden: true, meta: { authDivision: 'DR', menuId: 2 }}]
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    icon: 'clipboard',
    meta: { authDivision: 'DR', menuId: 3 },
    children: [
      { path: '/', component: _import('appChild'),
        children: [
            { path: 'adminlist', component: _import('admin/adminlist1'), meta: { authDivision: 'DR', menuId: 4 }},
            { path: 'profile', component: _import('admin/profile'), hidden: true, meta: { authDivision: 'DR', menuId: 4 }},
            { path: 'registAdmin', component: _import('admin/registadmin'), meta: { authDivision: 'UD', menuId: 4 }},
            { path: 'admindetail', component: _import('admin/admindetail'), hidden: true, meta: { authDivision: 'DR', menuId: 4 }},
            { path: '/admindetail/adminremove', component: _import('admin/adminremove'), hidden: true, meta: { authDivision: 'UD', menuId: 4 }}
        ]
      },
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'admindel', component: _import('admin/admindel'), hidden: true, meta: { authDivision: 'DR', menuId: 5 }},
          { path: 'admindel/admindeldetail', component: _import('admin/admindeldetail'), hidden: true, meta: { authDivision: 'DR', menuId: 5 }}]
      }
    ]
  },
  {
    path: '/exercise',
    component: Layout,
    redirect: 'noredirect',
    icon: 'excel',
    meta: {
      authDivision: 'DR',
      menuId: 6
    },
    children: [
      { path: '/', component: _import('appChild'),
        meta: {
          authDivision: 'DR',
          menuId: 6
        },
        children: [
            { path: 'warmup', component: _import('exercise/warmup'), hidden: true, meta: { menuId: 7, authDivision: 'DR' }},
            { path: 'warmup/warmregist', component: _import('exercise/registration/warmregist'), meta: { menuId: 7, authDivision: 'CU' }, hidden: true },
            { path: 'warmup/warmremove', component: _import('exercise/registration/warmremove'), meta: { menuId: 7, authDivision: 'CU' }, hidden: true },
            { path: 'warmup/warmdetail', component: _import('exercise/registration/warmdetail'), meta: { menuId: 7, authDivision: 'DR' }, hidden: true }]
      },
      { path: '/', component: _import('appChild'),
        children: [
            { path: 'mainlist', component: _import('exercise/mainlist'), meta: { menuId: 8, authDivision: 'DR' }, hidden: true },
            { path: 'mainlist/mainregist', meta: { menuId: 8, authDivision: 'CU' }, component: _import('exercise/registration/mainregist'), hidden: true },
            { path: 'mainlist/mainremove', meta: { menuId: 8, authDivision: 'CU' }, component: _import('exercise/registration/mainremove'), hidden: true },
            { path: 'mainlist/maindetail', meta: { menuId: 8, authDivision: 'DR' }, component: _import('exercise/registration/maindetail'), hidden: true }]
      },
      { path: '/', component: _import('appChild'),
        children: [
            { path: 'cooldown', meta: { menuId: 9, authDivision: 'DR' }, component: _import('exercise/cooldown'), hidden: true },
            { path: 'cooldown/coolregist', meta: { menuId: 9, authDivision: 'CU' }, component: _import('exercise/registration/coolregist'), hidden: true },
            { path: 'cooldown/coolremove', meta: { menuId: 9, authDivision: 'CU' }, component: _import('exercise/registration/coolremove'), hidden: true },
            { path: 'cooldown/cooldetail', meta: { menuId: 9, authDivision: 'DR' }, component: _import('exercise/registration/cooldetail'), hidden: true }]
      },
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'themecontents', meta: { menuId: 10, authDivision: 'DR' }, component: _import('exercise/themecontents'), hidden: true },
          { path: 'themecontents/themedetail', meta: { menuId: 10, authDivision: 'DR' }, component: _import('exercise/themedetail'), hidden: true },
          { path: 'themeregist', meta: { menuId: 10, authDivision: 'CU' }, component: _import('exercise/registration/themeregist'), hidden: true },
          { path: 'themecontents/themeremove', meta: { menuId: 10, authDivision: 'CU' }, component: _import('exercise/registration/themeremove'), hidden: true }]
      },
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'cheeruplist', meta: { menuId: 11, authDivision: 'DR' }, component: _import('exercise/cheeruplist'), hidden: true },
          { path: 'cheeruplist/cheerupDetail', meta: { menuId: 11, authDivision: 'DR' }, component: _import('exercise/cheerupdetail'), hidden: true },
          { path: 'cheeruplist/cheerregist', meta: { menuId: 11, authDivision: 'CU' }, component: _import('exercise/registration/cheerregist'), hidden: true },
          { path: 'cheeruplist/cheerremove', meta: { menuId: 11, authDivision: 'CU' }, component: _import('exercise/registration/cheerremove'), hidden: true }]
      }
    ]
  },
  {
    path: '/sports',
    component: Layout,
    redirect: 'noredirect',
    icon: 'excel',
    meta: {
      authDivision: 'DR',
      menuId: 12
    },
    children: [
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'sportscontent', meta: { menuId: 13, authDivision: 'DR' }, component: _import('sports/sportscontents'), hidden: true },
          { path: 'sportsregist', meta: { menuId: 13, authDivision: 'CU' }, component: _import('sports/sportsregist'), hidden: true },
          { path: 'sportsdetail', meta: { menuId: 13, authDivision: 'DR' }, component: _import('sports/sportsdetail'), hidden: true },
          { path: 'sportsremove', meta: { menuId: 13, authDivision: 'CU' }, component: _import('sports/sportsremove'), hidden: true }
        ] }
    ] },
  {
    path: '/badge',
    component: Layout,
    redirect: 'noredirect',
    icon: 'example',
    meta: {
      authDivision: 'DR',
      menuId: 14
    },
    children: [
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'badgelist', meta: { menuId: 15, authDivision: 'DR' }, hidden: true, component: _import('badge/badgelist') },
          { path: 'badgelist/badgeregist', meta: { menuId: 15, authDivision: 'CU' }, hidden: true, component: _import('badge/badgeregist') },
          { path: 'badgelist/badgedetail', meta: { menuId: 15, authDivision: 'DR' }, hidden: true, component: _import('badge/badgedetail') },
          { path: 'badgelist/badgeremove', meta: { menuId: 15, authDivision: 'CU' }, hidden: true, component: _import('badge/badgeremove') }]
      }]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: 'noredirect',
    icon: 'example',
    meta: {
      authDivision: 'DR',
      menuId: 16
    },
    children: [
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'faqlist', meta: { menuId: 18, authDivision: 'DR' }, component: _import('settings/faqlist'), hidden: true },
          { path: 'faqregist', meta: { menuId: 18, authDivision: 'CU' }, component: _import('settings/settingregist/faqregist'), hidden: true },
          { path: 'faqlist/faqdetail', meta: { menuId: 18, authDivision: 'DR' }, component: _import('settings/faqdetail'), hidden: true },
          { path: 'faqlist/faqremove', meta: { menuId: 18, authDivision: 'CU' }, component: _import('settings/faqremove'), hidden: true }
        ] },
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'themelist', meta: { menuId: 19, authDivision: 'DR' }, component: _import('settings/themelist'), hidden: true },
          { path: 'themeregist', meta: { menuId: 19, authDivision: 'CU' }, component: _import('settings/settingregist/themeregist'), hidden: true },
          { path: 'settingdetail', meta: { menuId: 19, authDivision: 'DR' }, component: _import('settings/settingdetail'), hidden: true },
          { path: 'settingremove', meta: { menuId: 19, authDivision: 'CU' }, component: _import('settings/settingremove'), hidden: true }
        ] },
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'infolist', meta: { menuId: 17, authDivision: 'DR' }, component: _import('settings/infolist'), hidden: true },
          { path: 'infodetail', meta: { menuId: 17, authDivision: 'DR' }, component: _import('settings/infodetail'), hidden: true },
          { path: 'infolist/inforemove', meta: { menuId: 17, authDivision: 'CU' }, component: _import('settings/inforemove'), hidden: true },
          { path: 'inforegist', meta: { menuId: 17, authDivision: 'CU' }, component: _import('settings/settingregist/inforegist'), hidden: true }]
      }]
  },
  {
    path: '/marketing',
    component: Layout,
    redirect: 'noredirect',
    icon: 'table',
    meta: {
      authDivision: 'DR',
      menuId: 20
    },
    children: [
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'mainbanner', meta: { menuId: 21, authDivision: 'DR' }, component: _import('marketing/mainbanner'), hidden: true },
          { path: 'mainbanner/mainregist', meta: { menuId: 21, authDivision: 'CU' }, component: _import('marketing/mainregist'), hidden: true },
          { path: 'mainbanner/maindetail', meta: { menuId: 21, authDivision: 'DR' }, component: _import('marketing/maindetail'), hidden: true },
          { path: 'mainbanner/mainremove', meta: { menuId: 21, authDivision: 'CU' }, component: _import('marketing/mainremove'), hidden: true }]
      },
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'adverlist', meta: { menuId: 22, authDivision: 'DR' }, component: _import('marketing/adverlist'), hidden: true },
          { path: 'adverlist/adverdetail', meta: { menuId: 22, authDivision: 'DR' }, component: _import('marketing/adverdetail'), hidden: true },
          { path: 'adverlist/adverregist', meta: { menuId: 22, authDivision: 'CU' }, component: _import('marketing/registration/adverregist'), hidden: true },
          { path: 'adverlist/adverremove', meta: { menuId: 22, authDivision: 'CU' }, component: _import('marketing/adverremove'), hidden: true }]
      },
      { path: '/', component: _import('appChild'),
        children: [
        { path: 'pushlist', meta: { menuId: 23, authDivision: 'DR' }, component: _import('marketing/pushlist'), hidden: true },
        { path: 'pushlist/pushregist', meta: { menuId: 23, authDivision: 'CU' }, component: _import('marketing/registration/pushregist'), hidden: true },
        { path: 'pushlist/pushdetail', meta: { menuId: 23, authDivision: 'DR' }, component: _import('marketing/registration/pushdetail'), hidden: true },
        { path: 'pushlist/pushremove', meta: { menuId: 23, authDivision: 'CU' }, component: _import('marketing/registration/pushremove'), hidden: true }]
      }
    ]
  },
  {
    path: '/media',
    component: Layout,
    redirect: 'noredirect',
    icon: 'table',
    meta: {
      authDivision: 'DR',
      menuId: 24
    },
    children: [
      { path: '/', component: _import('appChild'),
        children: [
        { path: 'medialist', component: _import('media/medialist'), meta: { menuId: 25, authDivision: 'DR' }},
        { path: 'mediaregist', component: _import('media/mediaregist'), hidden: true, meta: { menuId: 25, authDivision: 'CU' }}]
      }
    ]
  },
  {
    path: '/foot',
    component: Layout,
    redirect: 'noredirect',
    icon: 'table',
    meta: {
      authDivision: 'DR',
      menuId: 26
    },
    children: [
      { path: '/', component: _import('appChild'),
        children: [
          { path: 'footlist',
            component: _import('foot/footlist'),
            meta: { menuId: 27, authDivision: 'DR' }
          },
          { path: 'footgroupdetail',
            component: _import('foot/detail/footgroupdetail'),
            meta: { menuId: 28, authDivision: 'DR' },
            hidden: true
          },
          { path: 'footgroupregist',
            component: _import('foot/detail/footgroupregist'),
            meta: { menuId: 28, authDivision: 'UD' },
            hidden: true
          },
          { path: 'footchart',
            component: _import('foot/detail/footchart'),
            meta: { menuId: 27, authDivision: 'CU' },
            hidden: true
          },
          { path: 'footgroup',
            component: _import('foot/footgroup'),
            meta: { menuId: 28, authDivision: 'DR' }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
