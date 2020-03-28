<!--  -->
<template>
  <div class="container">
    <van-tabs @click="getPhotoListByCateId">
      <van-tab v-for="item in cates" :title="item.title" :key="item.id">
        <ul class="photo-list">
          <router-link
            v-for="item in list"
            :key="item.id"
            :to="'/home/photoinfo/' + item.id"
            tag="li"
          >
            <img v-lazy="item.img_url" />
            <div class="info">
              <h1 class="info-title">{{ item.title }}</h1>
              <div class="info-body">{{ item.zhaiyao }}</div>
            </div>
          </router-link>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Vue from 'vue'
import { Tab, Tabs, Toast } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);

export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'PhotoList',
  props: {},
  components: {
    // Tab, Tabs
  },
  data () {
    //这里存放数据
    return {

      cates: [],//所有目录
      list: []//图片列表
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getAllCategory () {
      this.$http.get('api/getimgcategory').then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: '全部', id: 0 })
          this.cates = result.body.message
          this.getPhotoListByCateId(0)
        }
      })
    },
    getPhotoListByCateId (index) {
      this.$http.get('api/getimages/' + this.cates[index].id).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message
        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getAllCategory()
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
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: 0 auto;
    }
    .info {
      position: absolute;
      color: #fff;
      text-align: left;
      bottom: 0;
      max-height: 84px;
      padding: 0 2px;
      background-color: rgba(0, 0, 0, 0.6);
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>