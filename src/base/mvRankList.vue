<template>
  <div class="mvList">
    <div @click="seleMV(item.id)" class="rank-item" v-for="(item,index) in mvRank" :key="index">
      <span class="index1">{{index+1}}</span>
      <div class="mv-pic"><img :src="item.cover" alt=""></div>
      <div class="mv-title">
        <div class="title1">
          <div class="t1">MV</div>
          <div class="t2">{{item.name}}</div>
        </div>
        <div class="title2">{{item.artistName}}</div>
      </div>
    </div>    
  </div>
</template>
<script>
export default {
  props: {
    mvRank:{
      type:Array,
      default: ()=> []
    }
  },
  name:'mvList',
  data(){
    return {
       
    }
  },
  methods: {
    seleMV(id) {
      this.$emit('seleMV',id)
    }
  }
}
</script>
<style scoped lang='scss' >
      .mvList{
         width: 100%;
         .rank-item{
           width: 100%;
           display: flex;
           align-items: center;
           margin-bottom: .1rem;
           .index1{
             margin-right: .1rem;
             font-size: .14rem;
           }
           .mv-pic{
             height: .84rem;
             width: 1.5rem;
             margin-right: .05rem;
             img{
               height: 100%;
               width: 100%;
             }
           }
           .mv-title{
             height: .84rem;
             .title1{
               display: flex;
               align-items: center;
               font-size: .14rem;
               .t1{          
                 font-size: .10rem;    
                 color: $color-bg-red;
                 padding: .02rem .02rem;
                 border: .01rem solid $color-bg-red;
                 margin-right: .05rem;
               }
               .t2{
                 width: 1rem;
                 font-size: .13rem;
                 white-space: nowrap;      
                 overflow: hidden;         
                 text-overflow: ellipsis;  
               }
             }
             .title2{
               margin-top: .1rem;
               font-size: .14rem;
               color: $color-text-l;
             }
           }
         }
         }
</style>