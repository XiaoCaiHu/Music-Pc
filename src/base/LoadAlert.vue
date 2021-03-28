<template>
     <el-alert
       v-show="showAlert"
       class="el-alert"
       :title='title'
       type="error"
       effect="dark">
     </el-alert>
</template>
<script>
export default {
  name:'LoadAlert',
  props: {
      showAlert: {
          type: Boolean,
          default: false
      },
      title: {
        type:String,
        default:'翻啥翻，再翻下去裤衩都给你翻没了(╯▔皿▔)╯'
      }
  },
  data(){
    return {
       
    }
  }
}
</script>
<style  lang='scss' >
     .el-alert{
       position: fixed;
       left: 0;
       right: 0;
       margin: auto;
       top: .5rem;
       width: 50%;
     }
</style>