<!--  -->
<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="
                selectedChanged(
                  item.id,
                  $store.getters.getGoodsSelected[item.id]
                )
              "
            ></mt-switch>
            <img :src="item.thumb_path" alt="" />
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox
                  :initcount="$store.getters.getGoodsCount[item.id]"
                  :goodsid="item.id"
                ></numbox>
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>
                已勾选商品<span class="red">{{
                  $store.getters.getGoodsCountAndAmount.count
                }}</span
                >件，总价<span class="red"
                  >￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span
                >
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
    <p>{{ $store.getters.getGoodsSelected }}</p>
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
    },
    remove (id, index) {
      this.goodslist.splice(index, 1)
      this.$store.commit('removeFormCar', id)
    },
    selectedChanged (id, val) {
      // console.log(id + '---' + val);
      this.$store.commit('updateGoodsSelected', { id, selected: val })

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
      font-size: 13px;
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
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>