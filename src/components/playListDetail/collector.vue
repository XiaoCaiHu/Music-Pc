<template>
<!-- 收藏 -->
  <div class="collector">
    <div v-for="(item,index) in Subscribers" 
        :key="index"  
        class="collector-item"
    >
       <img style="width:60px;border-radius:50%;"   v-lazy="item.avatarUrl" />
       <div class="collector-name">{{item.nickname}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Subscribers:{
      type:Array,
      default: ()=> []
    }
  },
  name:'Collectors',
  data(){
    return {
       size:'number'
    }
  }
}
</script>
<style scoped lang='scss' >
  .collector{
    display: flex;
    flex-wrap:wrap;
    // justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    color: #fff;
    .collector-item{
        display: flex;
        flex-direction:column ;
        align-items: center;
        padding: 30px;
        .collector-name{
          margin-top: 10px;
          font-size: 12px;
          color: $color-text-2;
        }
    }
  }
</style>