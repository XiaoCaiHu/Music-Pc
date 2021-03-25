<template>
    <div class="load"
        v-loading="loading"
        element-loading-text="拼命加载中"
    >
    </div>
</template>
<script>
export default {
  props: {
      loading: {
          type:Boolean,
          default:false
      }
  },
  name:'Load',
  data(){
    return {
       
    }
  }
}
</script>
<style  lang='scss' >
     .load{
       position: fixed;
       left: 0;
       right: 0;
       margin: auto;
       top: 50%;
       height: 6%;
       .el-loading-mask{
         background-color: rgba(0, 0, 0, 0);
         .el-loading-spinner{       
           .circular .path,.el-loading-text{
             color: $color-bg-red;
             stroke: $color-bg-red;
           }
         }
       }
     }
</style>