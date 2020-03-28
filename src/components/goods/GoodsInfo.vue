<!--  -->
<template>
  <div class="goodsinfo-container">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>{{ goodsinfo.market_price }}</del
            >&emsp;&emsp;销售价：<span class="now_price">{{
              goodsinfo.sell_price
            }}</span>
          </p>
          <p>
            购买数量：<numbox
              @getcount="getSelectedCount"
              :max="goodsinfo.stock_quantity"
            ></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar"
              >加入购物车</mt-button
            >
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)"
          >图文介绍</mt-button
        >

        <mt-button type="danger" size="large" plain @click="goComment(id)"
          >评价详情</mt-button
        >
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'GoodsInfo',
  props: [],
  components: {
    swiper, numbox
  },
  data () {
    //这里存放数据
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {},
      ballFlag: false,
      selectedCount: 1
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getLunbotu () {
      this.$http.get('api/getthumimages/' + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src
          })
          this.lunbotu = result.body.message
        }
      })

    },
    getGoodsInfo () {
      this.$http.get('api/goods/getinfo/' + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0]
        }
      })
    },
    goDesc (id) {
      this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    goComment (id) {
      this.$router.push({ name: 'goodscomment', params: { id } })

    },
    addToShopCar () {
      this.ballFlag = !this.ballFlag
    },
    beforeEnter (el) {
      el.style.transform = "translate(0,0)"
    },
    enter (el, done) {
      el.offsetWidth;
      //优化动画适配各种设备及分辨率
      // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      const badgePosition = document.getElementById('badge').getBoundingClientRect()
      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top
      el.style.transform = `translate(${xDist}px,${yDist}px)`
      el.style.transition = "all .5s cubic-bezier(.27,-0.24,.58,.13)"
      done()
    },
    afterEnter (el) {
      this.ballFlag = !this.ballFlag
      el.style.opacity = 0.7
    },
    getSelectedCount (count) {
      this.selectedCount = count;
      console.log('父组件拿到的数量值为' + count);

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getLunbotu()
    this.getGoodsInfo()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #f00;
    position: absolute;
    z-index: 99;
    top: 392px;
    left: 147px;
  }
}
</style>