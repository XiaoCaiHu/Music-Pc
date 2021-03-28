<template>
  <el-carousel :interval="4000" type="card" height="1.66rem">
    <el-carousel-item 
            v-for="(item,index) in banner" 
            :key="index" 
            class="el-carousel-item "
    >
    <img :src="item.imageUrl" fit="contain" >
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
  .el-carousel{
      width: 75%;
  }
  .el-carousel-item {
    width: 50%;
    border-radius: .06rem;
    img{
      width: 100%;
      border-radius: .1rem
    }
  }
  .clsH3{
      position: absolute;
      bottom: 0;
      right: 0;
      color: #fff;
      font-size: .12rem;
      border-radius: .03rem 0 .03rem 0;
  }
</style>