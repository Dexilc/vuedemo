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
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import {
  Header,
  Swipe,
  SwipeItem,
  Button
} from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
import router from './router.js'
import app from './App.vue'

const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router
})