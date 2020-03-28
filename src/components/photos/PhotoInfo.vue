<!--  -->
<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span
      ><span>点击：{{ photoinfo.click }}次</span>
    </p>
    <hr />
    <div class="thumbs">
      <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 放置评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import comment from '../subcomponents/comment.vue'
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'PhotoInfo',
  props: {},
  components: {
    "cmt-box": comment
  },
  data () {
    //这里存放数据
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getPhotoInfo () {
      this.$http.get('api/getimageInfo/' + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0]
        }
      })
    },
    getThumbs () {
      this.$http.get('api/getthumimages/' + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.w = 600;   //设置以大图浏览时的宽度
            item.h = 400;     //设置以大图浏览时的高度
            item.msrc = item.src;
          })
          this.list = result.body.message
        }
      })
    },
    handleClose () {
      console.log('close event')
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getPhotoInfo();
    this.getThumbs()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },

}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .thumbs {
    /deep/ .my-gallery {
      //deep深层作用选择器
      display: flex;
      flex-wrap: wrap; //默认换行
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
          box-shadow: 0 0 8px #999;
          border-radius: 5px;
        }
      }
    }
  }
  .content {
    font-size: 14px;
  }
}
</style>