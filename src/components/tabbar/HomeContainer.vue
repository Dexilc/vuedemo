<!-- 主页模板 -->
<template>
  <div class="container">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in lunbotuList" :key="item.id">
        <img :src="item.img" :alt="item.url" />
      </mt-swipe-item>
    </mt-swipe>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu1.png" alt="" />
          <div class="mui-media-body">新闻资讯</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt="" />

          <div class="mui-media-body">图片分享</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" alt="" />
          <div class="mui-media-body">商品购买</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="" />
          <div class="mui-media-body">留言反馈</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="" />
          <div class="mui-media-body">视频专区</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="" />
          <div class="mui-media-body">联系我们</div></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Toast } from 'mint-ui'

export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'HomeContainer',
  props: {},
  components: {

  },
  data () {
    //这里存放数据
    return {
      lunbotuList: []//轮播图数组
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getLunbotu () {
      this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          this.lunbotuList = result.body.message;
          //   Toast('加载轮播图成功………………')
        } else {
          Toast('加载轮播图失败………………')
        }

      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getLunbotu()
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
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    &:nth-child(1) {
      background-color: #f00;
    }
    &:nth-child(2) {
      background-color: #0f0;
    }
    &:nth-child(3) {
      background-color: #00f;
    }
  }
  img {
    height: 100%;
    width: 100%;
  }
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>