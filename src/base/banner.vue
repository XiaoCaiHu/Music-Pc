<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item 
            v-for="(item,index) in banner" 
            :key="index" 
    >
    <el-image :src="item.imageUrl" fit="contain" style="height:200px; border-radius: 10px"></el-image>
    <el-tag size="mini"  
            class="clsH3" 
            :type="item.typeTitle === '独家' ? 'danger' : 'primary'" 
            effect="dark"
    >{{item.typeTitle}}</el-tag>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  props:{
      banner: {
          type: Array,
          default: () => []
      }
  },
  name:'banner',
  data(){
    return {
       
    }
  },
  computed: {
  }
}
</script>
<style scoped lang='scss' >
// 轮播图样式
  .el-carousel {
      width: 80%;
      
  }
  .el-carousel__item {
    border-radius: 6px;
  }
  .clsH3{
      position: absolute;
      bottom: 4px;
      right: 0;
      color: #fff;
      font-size: 12px;
      border-radius: 3px 0 3px 0;
  }
</style>