import Vue from 'vue';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import App from './App';
import router from './router';
import store from './store';
import '@/icons'; // icon
import '@/permission';
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import '../static/style.css';
import VCharts from 'v-charts'
import VueVideoPlayer from 'vue-video-player'
import { VTable, VPagination } from 'vue-easytable'
import 'vue-easytable/libs/themes-base/index.css'
import 'video.js/dist/video-js.css'
import '../node_Modules/signalr/jquery.signalR.js'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueVideoPlayer)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.use(VCalendar)
Vue.use(VCharts)
new Vue({
  created() {
   window.addEventListener('beforeunload', this.handler)
   this.handler()
  },
  methods: {
    handler(event) {
      if(!window.performance.navigation.type == 1) {
        location.reload()
        store.dispatch('LogOut')
        
      }
    }
  },
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
  
})
