// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import AMap from 'vue-amap'
import  { XHeader, Flexbox, FlexboxItem,ToastPlugin, LoadingPlugin, TransferDom, Divider, LoadMore, AlertPlugin } from 'vux'
import animate from 'animate.css'
import Scroller from '@/components/base/scroller'
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)


FastClick.attach(document.body)

Vue.use(VueLazyLoad, {
  error: require('@/assets/default.png'),
  loading: require('@/assets/default.png'),
  preLoad: 1,
  attempt: 1
})

Vue.component('scroller', Scroller)

Vue.component('x-header', XHeader)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('divider', Divider)
Vue.component('load-more', LoadMore)
Vue.use(AlertPlugin)
Vue.directive('transfer-dom', TransferDom)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)





Vue.use(AMap)

AMap.initAMapApiLoader({
  // 高德的key
  key: '584dbe5784fa643bb2d979a8578dba9c',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
