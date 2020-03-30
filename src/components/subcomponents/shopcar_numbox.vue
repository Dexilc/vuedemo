<!--  -->
<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import mui from '../../lib/mui/js/mui.js'
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'container',
  props: ['max'],
  components: {

  },
  data () {
    //这里存放数据
    return {

    };
  },
  //监听属性 类似于data概念
  computed: {},


  //方法集合
  methods: {
    countChanged () {

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    mui('.mui-numbox').numbox()
  },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>