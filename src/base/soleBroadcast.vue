<template>
  <div class="soleBroadcast">
    <div class="sole-item" v-for="(item,index) in privatecontent" :key="index">
      <div class="sole-desc"><i class="icon-6"></i></div>
      <img v-lazy="item.picUrl" alt="">
      <div class="sole-title"><span>{{item.name}}</span></div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    privatecontent:{
      type:Array,
      default: ()=> []
    }
  },
  name:'soleBroadcast',
  data(){
    return {
       
    }
  }
}
</script>
<style scoped lang='scss' >

  .soleBroadcast{
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    .sole-item{
      position: relative;
      margin-right: 20px;
      height: 100%;
      width: 300px;
      cursor:pointer;
      .sole-desc{
        position: absolute;
        padding-top: 5px;
        top: 5px;
        left: 5px;
        text-align: center;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.3);
        i{
          margin-top: 4px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
        }
      }
      img{
        height: 100%;
        width: 100%;
      }
      .sole-title{
        margin-top: 3px;
        color: #fff;
        width: 100%;
        font-size: 13px;
        line-height: 16px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }      
    }
  }
</style>