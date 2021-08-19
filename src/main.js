import Vue from 'vue'
import 'normalize.css/normalize.css'
import './assets/styles/index.scss' // global css
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

import Icon from 'vue-svg-icon/Icon.vue' //引入svg插件
Vue.component('Icon', Icon) //注册svg插件
import router from './plugins/router.js'
import './plugins/routerguard.js'

import './utils/index.js'
import store from './plugins/store.js'
import filter from './filter/index.js'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(Element, { size: 'medium' })
import uploader from 'vue-simple-uploader'
Vue.use(uploader)

// 后端API管理
Vue.prototype.$BASEAPI = process.env.VUE_APP_BASE_API;
Vue.prototype.$code = 200
Vue.prototype.$mpages = {
  page:1,
  num: 10,
  total: 0,
  isShow: true
}
Vue.prototype.$getReset = isIndex => {
  const vp = Vue.prototype
  vp.$mpages.page = 1
  vp.$mpages.num = 10
  vp.$mpages.total = 0
  if (isIndex) {
    vp.$mpages.isShow = false
  }
}

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css'
Vue.prototype.$layer = layer(Vue)

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import { FileBlot, Video, AudioBlot } from './utils/xquill.js'
Quill.register(FileBlot)
Quill.register(Video, true)
Quill.register(AudioBlot)
// 自定义字体大小
const Size = Quill.import('attributors/style/size')
Size.whitelist = [
  '12px', '13px', '14px', '15px',
  '16px', '17px', '18px', '19px', '20px',
  '21px', '22px', '23px', '24px', '25px', '26px'
]
Quill.register(Size, true)
Vue.use(VueQuillEditor, { placeholder: '请输入你的内容' })
Object.keys(filter).forEach(fn => Vue.filter(fn, filter[fn])) // 过滤器

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
