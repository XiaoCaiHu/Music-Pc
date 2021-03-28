<template>
  <div @click="sss" :class="mvMain" class="recomSong">
      <div @click="seleItem(item.id)" :class="mvList" class="recom-item" v-for="(item,index) in personalized" :key="index">
          <div :class="mvDe" class="recom-desc" v-if="item.playCount>-1"><i :class="icon" style="margin-right:0.05rem;"></i><span>{{item.playCount}}</span></div>
          <img v-lazy="item.picUrl || item.coverImgUrl || item.imgurl || item.cover" alt="">
          <div class="recom-title"><span>{{item.name}}</span></div>
      </div>
  </div>
</template>
<script>
import {loadMixin} from 'common/js/mixin'

export default {
  mixins:[loadMixin],
  props:{
      personalized:{
          type:Array,
          default: () => []
      },
      showMv:{
        type:Boolean,
        default: false
      }
  },
  name:'recomSong',
  data(){
    return {
      
    }
  },
  components: {

  },
  methods: {
    seleItem(id) {
      // this.SETLOADSHOW(true)
      this.$emit('seleRecomSong',id)
    },
    sss() {
      console.log(this.personalized);
    }
  },
  computed: {
    mvMain() {
      return this.showMv ? 'mvSong' : ''
    },
    mvList() {
      return this.showMv ? 'mvWidth' : ''
    },
    mvDe() {
      return this.showMv ? 'mvDesc' : ''
    },
    icon() {
      return this.showMv ? 'icon-6' : 'icon-10'
    }    
  }
}
</script>
<style scoped lang='scss' >
    .recomSong{
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        .recom-item{
            position: relative;
            width: 1.5rem;
            margin: 0 .1rem .2rem 0; 
            color: #fff;   
            cursor:pointer; 
            &:hover {
                  color: $color-bg-red !important;
            }      
            .recom-desc{
                position: absolute;
                text-align: right;
                right: 0;
                padding: .015rem .03rem;
                width: 1.5rem;
                z-index: 3;
                color: #fff;  
                font-size: .13rem;
                background-color: $color-background-d;
            }
            img{
                width: 100%;
            }
            .recom-title{
                margin-top: .03rem; 
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
    .mvSong{
      width: 100% !important;
    }
    .mvWidth{
      width: 2.3rem !important;
    }
    .mvDesc{
      width: 1rem !important;
    }
</style>