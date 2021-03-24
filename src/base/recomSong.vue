<template>
  <div class="recomSong">
      <div @click="seleItem(item.id)" class="recom-item" v-for="(item,index) in personalized" :key="index">
          <div class="recom-desc"><i class="icon-10"></i><span>{{Math.floor(item.playCount/10000)}}万</span></div>
          <img v-lazy="item.picUrl || item.coverImgUrl" alt="">
          <div class="recom-title"><span>{{item.name}}</span></div>
      </div>
      
     <!-- <el-image src='./logo2.jpg'>
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
      <div slot="error" class="image-slot">
        <i style="color:#fff;" class="el-icon-picture-outline"></i>
      </div>
    </el-image> -->
  </div>
</template>
<script>
// import {mapMutations} from 'vuex'
import {loadMixin} from 'common/js/mixin'

export default {
  mixins:[loadMixin],
  props:{
      personalized:{
          type:Array,
          default: () => []
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
    // ...mapMutations({
    //   SETLOADSHOW:'SETLOADSHOW'
    // }),
    seleItem(id) {
      this.SETLOADSHOW(true)
      this.$emit('seleRecomSong',id)
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
            width: 150px;
            margin: 0 10px 20px 0; 
            color: #fff;   
            cursor:pointer; 
            &:hover {
                  color: $color-bg-red !important;
            }      
            .recom-desc{
                position: absolute;
                text-align: right;
                padding: 1.5px 3px;
                width: 150px;
                z-index: 3;
                color: #fff;  
                font-size: 13px;
                background-color: $color-background-d;
            }
            img{
                width: 100%;
            }
            .recom-title{
                margin-top: 3px;
                
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