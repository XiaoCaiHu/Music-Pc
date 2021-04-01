<template>
  <div class="diyRecom">
      <scroll v-show="banner" :data='newsong' ref="scroll" class="diyRecom-content">
        <div>
          <banner class="banner" :banner="banner"></banner>
          <div class="title">推荐歌单</div>
          <recomSong  @seleRecomSong = 'seleRecomSong' class="recomSong" :personalized="personalized"></recomSong>
          <div class="title">独家放送</div>
          <soleBroadcast class="soleBroadcast" :privatecontent="privatecontent"></soleBroadcast>
          <div class="title2" >最新音乐</div>
          <el-divider></el-divider>
          <newSong class="newSong" :songList="songList"></newSong>
          <div class="kong"></div>
       </div>
    </scroll>
  </div>
</template>
<script>
import {loadMixin,seleItem} from 'common/js/mixin'
import Banner from 'base/banner.vue'
import RecomSong from 'base/recomSong.vue'
import soleBroadcast from 'base/soleBroadcast.vue'
import newSong from 'base/newSong.vue'
import Scroll from 'base/scroll/scroll'
import {_getBanner,
        _getPersonalized,
        _getPrivatecontent,
        _getPerNewsong,
        _getSongsDetail,
        songDetail
        } from 'network/diyRecom.js'

export default {
  mixins:[loadMixin,seleItem],
  name:'diyRecom',
  components:{
      Banner,
      RecomSong,
      soleBroadcast,
      newSong,
      Scroll
  },
  data(){
    return {
       banner:[], //轮播图
       personalized:[], //推荐歌单
       privatecontent:[], //独家放送
       newsong:[], //新歌推荐
       playlistDetail:[], //歌单详情
       detailId:0, //歌单id
       songList:[]
    }
  },
  created() {
    
// 获取轮播图
    _getBanner().then(res => {
      this.banner = res.data.banners.slice(0, 6)
      this.getgetPersonalized()
      console.log(this.banner)
    })
  },
  computed: {
    loading() {
      return this.newsong.length>0 ? false : true;
    }
  },
  methods: {
// 获取推荐歌单
    getgetPersonalized() {
      // 加载显示
      this.SETLOADSHOW(true)
      _getPersonalized().then(res => {
        this.personalized = res.data.result.slice(0,15)
        this.getPrivatecontent()
      })
    },
// 获取独家放送入口
    getPrivatecontent() {
      _getPrivatecontent().then(res => {
         this.privatecontent = res.data.result.slice(0,3)
         this.getPerNewsong()
       })
    },
// 获取推荐新音乐
    getPerNewsong() {
        this.songList = []
        _getPerNewsong().then(res => {
         this.newsong = res.data.result
         for (let i in this.newsong) {
             _getSongsDetail(this.newsong[i].id).then(res => {
             let song = new songDetail(res.data.songs);
             this.songList.push(song);
           })
         }
         console.log(this.songList);
         //  加载消失
         this.SETLOADSHOW(false)
        })
    }
  },
}

</script>
<style scoped lang='scss' >
     
  .diyRecom{
    position: fixed;
    cursor:default;
    top: 1.15rem;
    left: 15%;
    right: 0;
    bottom: .5rem;
    width: 100%;
    overflow: auto;
      .diyRecom-content{
        height: 100%;
        padding: .1rem 0 0 9%;
        overflow: hidden;
      
        .banner{
          margin: .15rem 0 0 0;
        }
        .recomSong{
          width: 70%;
        }
        .soleBroadcast{
          height: 1.5rem;
          padding-bottom: .4rem;
          // margin-bottom: .2rem;
        }
        .el-divider--horizontal{
          width: 70%;
          margin: .05rem 0 0 0;
        }
        .title{
          font-size:.2rem;
          color:$color-text-2;
          margin:0 0 .1rem 0;
        }
        .title2{
          font-size:.2rem;
          color:$color-text-2;
          margin-top: .2rem;
        }
        .kong{
          height: .3rem;
        }
      }
    // }
  }
</style>