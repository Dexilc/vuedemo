<!--  -->
<template>
  <div class="goods-list">
    <!-- 编程式导航window.location.href -->
    <div
      class="goods-item"
      v-for="item in goodslist"
      :key="item.id"
      @click="goDetail(item.id)"
    >
      <img :src="item.img_url" alt="" />
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'container',
  props: {},
  components: {

  },
  data () {
    //这里存放数据
    return {
      pageindex: 1,
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
      this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
        if (result.body.status === 0) {
          this.goodslist = this.goodslist.concat(result.body.message)
        }
      })
    },
    //列表 加载更多
    getMore () {
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail (id) {
      // 使用JS进行路由导航
      // console.log(this);
      this.$router.push('/home/goodsinfo/' + id)

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getGoodsList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>