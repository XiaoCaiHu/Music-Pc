<template>
  <div class="playMV">
      <scroll v-if="mvRank.length>0" :data='mvRank' ref="scroll" class="detailList-content">
        <div>
          <div class="title-wrapper">
            <div class="title">最新MV</div>
            <div @click="openAllMv" class="more">更多</div>
          </div>
          <recomSong v-if="mvs.length>0" class="mvList" @seleRecomSong='seleMV' :showMv='true' :personalized='mvs'></recomSong>
          <div class="title-wrapper">
            <div class="title">MV排行榜</div>
          </div>
          <div class="mv-rank">
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
        </div>
      </scroll>
  </div>
</template>
<script>
import {_getMvFirst,_getMvTop} from 'network/mv.js'
import {loadMixin,seleMvItem} from 'common/js/mixin.js'
import Scroll from 'base/scroll/scroll'
import recomSong from "base/recomSong.vue"

export default {
  mixins:[loadMixin,seleMvItem],
  name:'playMV',
  data(){
    return {
       mvs: [],
       mvRank:[]
    }
  },
  created() {
    this.getMvFirst()
    this.SETLOADSHOW(false)
  },
  components: {
    recomSong,
    Scroll
  },
  methods: {
    // 获取全部Mv
    getMvFirst() {
      _getMvFirst('',8).then(res => {
        this.mvs = res.data.data
        console.log(res);
        this.getMvTop()
      }) 
    },
    // 获取排行Mv
    getMvTop() {
      _getMvTop('',10).then(res => {
        this.mvRank = res.data.data
        console.log(this.mvRank);
      })
    },
    //  打开全部MV
    openAllMv() {
      console.log('open');
    }
  }
}
</script>
<style scoped lang='scss' >
    .playMV{
       position: fixed;
       cursor:default;
       top: 1.15rem;
       left: 15%;
       right: 0;
       bottom: .5rem;
       padding: 0 0 0 9%;
       color: $color-text-ll;
       .detailList-content{
         height: 100%;
         width: 100%;
         overflow: hidden;
         .title-wrapper{
         display: flex;
         justify-content: space-between;
         align-items: center;
         width: 83%;
         .title{
           font-size: .2rem;
         }
         .more{
           color: $color-text-l;
           font-size: .14rem;
         }
         }
         .mvList{
           margin-top: .2rem;
           width: 85%;
         }
         .mv-rank{
         display: flex;
         flex-wrap: wrap;
         justify-content: space-between;
         width: 85%;
         margin-top: .2rem;
         .rank-item{
           width: 50%;
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
                 font-size: .13rem;    
                 color: $color-bg-red;
                 padding: .02rem .02rem;
                 border: .015rem solid $color-bg-red;
                 margin-right: .05rem;
               }
               .t2{
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
       }
    }
</style>