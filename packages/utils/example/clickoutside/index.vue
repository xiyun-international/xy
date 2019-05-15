<template>
  <div>
    <div class="main" v-xy-click-outside="handleClose">
      <button @click="show=!show">点击显示下拉菜单</button>
      <div class="dropdown" v-show="show">
        <p>下拉框的内容，点击外面区域可以关闭</p>
      </div>
    </div>
  </div>    
</template>
    
<script>
import xyClickoutside from "../../src/libraries/clickoutside.ts";

export default {
    name: 'XyClickoutside',
    directives: {
        'xy-click-outside': xyClickoutside,
    },
    data() {
        return {
            show:false,
        }
    },
    methods: {
        handleClose() {
            this.show = false;
        }
    }
}
</script>

<style lang="less">
.main{
  width:125px;
  margin-top: 20px;
  .dropdown{
    width:150px;
    height:150px;
    margin:5px auto;
    font-size:12px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow:0 1px 6px rgba(0,0,0,0.2);
    p{
      display:inline-block;
      padding:6px;
    }
  }
}
</style>
    