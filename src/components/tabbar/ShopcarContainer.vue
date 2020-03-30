<!--  -->
<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img :src="item.thumb_path" alt="" />
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox></numbox>
                <a href="#">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'ShopcarContainer',
  props: {},
  components: {
    numbox
  },
  data () {
    //这里存放数据
    return {
      goodslist: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getGoodsList () {
      var idArr = []
      this.$store.state.car.forEach(item => idArr.push(item.id))
      if (idArr.length <= 0) {
        return
      }
      this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
        if (result.body.status === 0) {
          this.goodslist = result.body.message
        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getGoodsList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, //生命周期 - 创建之前
  beforeMount () { }, //生命周期 - 挂载之前
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner {
    display: flex;
    align-items: center;
    img {
      width: 55px;
    }
    h1 {
      font-size: 14px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
</style>