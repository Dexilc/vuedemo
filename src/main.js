// 入口文件
import app from './App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
var car = JSON.parse(localStorage.getItem('car') || '[]')
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
  // 储存共享数据的仓库
  state: {
    //将购物车中的商品数据，用一个数组存起来，在car数组中，存储一些商品的对象，咱们可以暂时将这个商品对象
    //{id:商品id,count:购买数量,price:商品价格,selected:false}
    car: car
  },
  mutations: {
    addToCar(state, goodsinfo) {
      var flag = false
      // 点击加入购物车，把商品信息保存到store中
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      if (!flag) {
        state.car.push(goodsinfo)
      }
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { // this.$store.getters.***
    //获取购物车中的所有商品数量
    getAllCount(state) {
      let c = 0;
      state.car.forEach(item => {
        c += item.count
      });
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = parseInt(item.count)
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * o.count
        }
      })
      return o
    }


  }
})
// 导入时间插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://api.cms.liulongbin.top' //设置请求根路径
Vue.http.options.emulateJSON = true;
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import 'vant/lib/index.css'
// 图片预览插件
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)
/* import {
  Header,
  Swipe,
  SwipeItem,
  Button,
  Lazyload,
  Switch
} from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)
Vue.component(Switch.name, Switch); */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
import router from './router.js'

const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})