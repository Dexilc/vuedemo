<!--  -->
<template>
  <div class="container">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" :alt="item.url" :class="{ full: isfull }" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'swiper',
  props: ['lunbotuList', "isfull"],
  components: {

  },
  data () {
    //这里存放数据
    return {

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    /*  &:nth-child(1) {
      background-color: #f00;
    }
    &:nth-child(2) {
      background-color: #0f0;
    }
    &:nth-child(3) {
      background-color: #00f;
    } */
  }
  img {
    height: 100%;
  }
  .full {
    width: 100%;
  }
}
</style>