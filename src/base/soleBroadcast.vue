<template>
  <div class="soleBroadcast">
    <div @click="seleMV(item.id)" class="sole-item" v-for="(item,index) in privatecontent" :key="index">
      <div class="sole-desc"><i class="icon-6"></i></div>
      <img v-lazy="item.picUrl" alt="">
      <div class="sole-title"><span>{{item.name}}</span></div>
    </div>
  </div>
</template>
<script>
import {seleMvItem} from 'common/js/mixin.js'

export default {
  mixins:[seleMvItem],
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
      margin-right: .2rem;
      height: 100%;
      width: 3rem;
      cursor:pointer;
      .sole-desc{
        position: absolute;
        padding-top: .05rem;
        top: .05rem;
        left: .05rem;
        text-align: center;
        width: .25rem;
        height: .25rem;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.3);
        i{
          margin-top: .04rem;
          font-size: .16rem;
          color: rgba(255, 255, 255, 0.9);
        }
      }
      img{
        height: 100%;
        width: 100%;
      }
      .sole-title{
        margin-top: .03rem;
        color: #fff;
        width: 100%;
        font-size: .13rem;
        line-height: .16rem;
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