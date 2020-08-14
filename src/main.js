/*
 * @Description: new file
 * @Autor: zhan
 * @Date: 2020-03-11 15:55:13
 * @LastEditors: zhan
 * @LastEditTime: 2020-03-12 13:27:39
 */
/*
 * @Description: new file
 * @Autor: zhan
 * @Date: 2020-03-11 15:15:09
 * @LastEditors: zhan
 * @LastEditTime: 2020-03-11 15:27:29
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'amfe-flexible'
import './assets/js/common.js'
import './assets/css/reset.scss'
import './assets/css/color.less' // 切换主题颜色
import vueMoment from 'vue-moment'
import { Toast, Icon, Collapse, CollapseItem, Picker, DatetimePicker, Sticky, Swipe, Loading, SwipeItem, Circle, RadioGroup, Radio, Popup, Tab, Tabs, List, ImagePreview, Overlay } from 'vant'
import 'vant/lib/index.css'
import share from './services/share.js' // 封装的分享组件
import VueLazyload from 'vue-lazyload'
import echarts from 'echarts'
// import VConsole from 'vconsole'
import 'normalize.css'

const FastClick = require('fastclick')
Vue.use(Toast).use(Icon).use(Picker).use(DatetimePicker).use(Swipe).use(Loading).use(SwipeItem).use(Circle).use(RadioGroup).use(Radio).use(Popup).use(Sticky).use(Collapse).use(CollapseItem).use(Tab).use(Tabs).use(List).use(ImagePreview).use(Overlay)
Vue.prototype.$echarts = echarts
Vue.use(VueLazyload, {
  error: require('./assets/img/defaultrobot.png'), // 这个是请求失败后显示的图片
  loading: require('./assets/img/defaultrobot.png'), // 这个是加载的loading过渡效果
  try: 10 // 这个是加载图片数量
})
const deviceIsWindowsPhone = navigator.userAgent.indexOf('Windows Phone') >= 0
const deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone
FastClick.prototype.needsClick = function (target) {
  // 下面这句
  // 这是jq写法
  // if ($(target).parents('.needsclick').length) return true
  while (target.tagName !== 'BODY') {
    // 放在本地插件库, 请将includes换成indexOf判断
    if (target.className.includes('needsclick')) return true
    target = target.parentNode
  }

  switch (target.nodeName.toLowerCase()) {
      // Don't send a synthetic click to disabled inputs (issue #62)
    case 'button':
    case 'select':
    case 'textarea':
      if (target.disabled) {
        return true
      }
      break
    case 'input':
      // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
      if ((deviceIsIOS && target.type === 'file') || target.disabled) {
        return true
      }
      break
    case 'label':
    case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
    case 'video':
      return true
  }

  return (/\bneedsclick\b/).test(target.className)
}
FastClick.attach(document.body)
// Vue.use(Mint)
Vue.use(share)
Vue.use(vueMoment)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.notRequireAuth)) {
    const accessToken = window.localStorage.getItem('access_token')
    if (accessToken) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
  next()
})
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
