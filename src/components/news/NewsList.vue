<!-- 新闻列表 -->
<template>
  <div class="container">
    <ul class="mui-table-view">
      <li
        class="mui-table-view-cell mui-media"
        v-for="item in newslist"
        :key="item.id"
      >
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h4>{{ item.title }}</h4>
            <p class="mui-ellipsis">
              <span> 发表时间：{{ item.add_time | dateFormat }} </span>
              <span class="mui-pull-right"> 点击：{{ item.click }}次 </span>
            </p>
          </div>
        </router-link>
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
  name: 'container',
  props: {},
  components: {

  },
  data () {
    //这里存放数据
    return {
      newslist: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getNewsList () {
      this.$http.get('api/getnewslist').then(result => {
        if (result.body.status === 0) {
          this.newslist = result.body.message
          //   console.log(result);

        } else {
          Toast('新闻加载失败…………')
        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getNewsList()
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
</style>