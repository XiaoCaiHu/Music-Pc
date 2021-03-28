<template>
  <div class="Singer">
     <scroll class="suggest" 
        ref="suggest" 
        :pullup='pullup' 
        :data='DetailList'
        :beforeScroll = 'beforeScroll'
        @scrollToEnd = 'searchMore'
     >
       <div>
        <div class="singer-zone">
            <div class="title">语种:</div>
            <div class="zone-item"
                 @click="selectItem(item.name,index)"
                 :class="{'active1':index==indexItem}"
                 v-for="(item,index) in type" 
                 :key="index"
            >{{item.name}}</div>
        </div>
        <div class="singer-zone">
            <div class="title">分类:</div>
            <div class="zone-item"
                 @click="selectAreaItem(item.name,index)"
                 :class="{'active1':index==areaItem}"
                 v-for="(item,index) in area" 
                 :key="index"
            >{{item.name}}</div>
        </div>
        <recomSong @seleRecomSong = 'seleRecomSong' class="recomSong" :personalized="DetailList"></recomSong>
       </div>
    </scroll>
    <!-- 触底提示 -->
    <loadAlert :showAlert='showAlert'></loadAlert>
    <!-- 加载条 -->
    <load :loading='loading'></load>
  </div>
</template>
<script>
import {_getArtistList} from 'network/Detail.js'
import RecomSong from 'base/recomSong.vue'
import Scroll from 'base/scroll/scroll'
import Load from 'base/Load.vue'
import LoadAlert from 'base/LoadAlert.vue'
import {loadMixin,loadUp} from 'common/js/mixin.js'

// 
export default {
  mixins:[loadMixin,loadUp],
  name:'Singer',
  data(){
    return {
       tags:[],
       currentIndex: 0,
       areaIndex:0,
       DetailList: [],
       detNumList: [],
       type: [
         {
           type:-1,
           name:'全部'
         },
         {
           type:1,
           name:'男歌手'
         },
         {
           type:2,
           name:'女歌手'
         },
         {
           type:3,
           name:'乐队'
         }
       ],
       area: [
         {
           area:-1,
           name:'全部'
         },
         {
           area:7,
           name:'华语'
         },
         {
           area:96,
           name:'欧美'
         },
         {
           area:8,
           name:'日本'
         },
         {
           area:16,
           name:'韩国'
         },
         {
           area:0,
           name:'其他'
         }
       ]
    }
  },
  created() {
    this.getArtistList()
  },
  components: {
      RecomSong,
      Scroll,
      LoadAlert,
      Load
  },
  methods: {
// 加载更多数据
    searchMore() {
      if(!this.hasMore) {
        this.closeAlert()
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.closeAlert()
        }, 2000);
        return
      }
      this.page++
      this.getArtistList()
    },   
// 选择语种标签
      selectItem(name,index) {
          this.currentIndex = index
          this.getArtistList()
          console.log(name);
      },
// 选择分类标签
      selectAreaItem(name,index) {
          this.areaIndex = index
          this.getArtistList()
          console.log(name);
      },      
// 获取歌手详情
      seleRecomSong(id) {
        this.SETLOADSHOW(true)
        window.sessionStorage.setItem("singerID",id);
        this.$router.push('/singDetail/' + id);  
      },
// 获取标签

// 获取当前分类歌单
      getArtistList() {
          this.loading = true
          _getArtistList(this.type[this.currentIndex].type,this.area[this.areaIndex].area,(this.limit*this.page)).then(res => {
              this.DetailList = res.data.artists
              this.detNumList = res.data
              // 判断是否还需要继续加载
              this._checkMore(this.DetailList)
              //判断是否取消主加载条
              this.SETLOADSHOW(false) 
              this.loading = false
              console.log(res);
          })
      }
  },

  computed: {
      indexItem() { 
        return this.currentIndex
      },
      areaItem() {
        return this.areaIndex
      },
      allPage() {
        return this.detNumList ? parseInt(Math.floor(this.detNumList.total/this.limit)) : 0
      },
      yuPage() {
        return this.detNumList ? parseInt(this.detNumList.total%this.limit) : 0
      }    
  }
}
</script>
<style scoped lang='scss' >
  .Singer{
    position: fixed;
    cursor:default;
    top: 1.15rem;
    left: 15%;
    right: 0;
    bottom: .5rem;
    width: 100%;
    overflow: auto;
    padding: 0 0 0 9%;
    color: #fff;
    .suggest{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .singer-zone{
            display: flex;
            margin: .1rem 0 .2rem 0;
            align-items: center;
            color: $color-text-l;
            .title{
                font-size: .14rem;
            }
            .zone-item{
                font-size: .14rem;
                margin-left: .2rem;
                &.active1{
                    color: $color-bg-red !important;
                }
            }

        }
        .recomSong{
            margin-top: .3rem;
            width: 60%;
        }
    }
  }

  
</style>