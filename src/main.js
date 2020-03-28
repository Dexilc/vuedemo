// 入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入时间插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005' //设置请求根路径
Vue.http.options.emulateJSON = true;
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import 'vant/lib/index.css'
// 图片预览插件
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)
import {
  Header,
  Swipe,
  SwipeItem,
  Button,
  Lazyload
} from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)
/* import MintUI from 'mint-ui'
Vue.use(MintUI) */
import 'mint-ui/lib/style.css'
import router from './router.js'
import app from './App.vue'

const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router
})