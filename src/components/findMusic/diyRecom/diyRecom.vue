<template>
  <div class="diyRecom">
      <scroll v-show="banner" :data='newsong' ref="scroll" class="diyRecom-content">
        <div>
          <banner class="banner" :banner="banner"></banner>
          <div class="title">推荐歌单</div>
          <recomSong  @seleRecomSong = 'seleRecomSong' class="recomSong" :personalized="personalized"></recomSong>
          <div class="title">独家放送</div>
          <soleBroadcast class="soleBroadcast" :privatecontent="privatecontent"></soleBroadcast>
          <div class="title" style="font-size:20px;">最新音乐</div>
          <el-divider ></el-divider>
          <newSong class="newSong" :newSong="newsong"></newSong>
          <div class="kong"></div>
       </div>
    </scroll>
  </div>
</template>
<script>
import {loadMixin} from 'common/js/mixin'
import Banner from 'base/banner.vue'
import RecomSong from 'base/recomSong.vue'
import soleBroadcast from 'base/soleBroadcast.vue'
import newSong from 'base/newSong.vue'
import Scroll from 'base/scroll/scroll'
import {_getBanner,
        _getPersonalized,
        _getPrivatecontent,
        _getPerNewsong,
        } from 'network/diyRecom.js'

export default {
  mixins:[loadMixin],
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
       detailId:0 //歌单id
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
      _getPersonalized().then(res => {
        this.personalized = res.data.result.slice(0,15)
        this.getPrivatecontent()
        console.log(this.personalized)
      })
    },
// 获取独家放送入口
    getPrivatecontent() {
      _getPrivatecontent().then(res => {
         this.privatecontent = res.data.result.slice(0,3)
         this.getPerNewsong()
         console.log(this.privatecontent)
       })
    },
// 获取推荐新音乐
    getPerNewsong() {
      setTimeout(() => {
        _getPerNewsong().then(res => {
         this.newsong = res.data.result
         this.SETLOADSHOW(false)
         console.log(this.newsong);
        })
      },350)
    },
// 点击跳转到歌单详情页面
    seleRecomSong(id) {
      this.$router.push('/playListDetail/' + id);
    }
  },
}

</script>
<style scoped lang='scss' >
     
  .diyRecom{
    position: fixed;
    cursor:default;
    top: 115px;
    left: 15%;
    right: 0;
    bottom: 50px;
    width: 100%;
    overflow: auto;
    // .load{
    //      width: 100%;
    //      height: 100%; 
      .diyRecom-content{
        height: 100%;
        padding: 10px 0 0 7%;
        overflow: hidden;
      
        .banner{
          margin: 15px 0 0 0;
        }
        .recomSong{
          width: 70%;
        }
        .soleBroadcast{
          height: 110px;
          margin-bottom: 20px;
        }
        .el-divider--horizontal{
          width: 70%;
          margin: 5px 0 0 0;
        }
        .title{
          font-size:14px;
          color:$color-text-2;
          margin:0 0 10px 0;
        }
        // .newSong{
        //   // margin-bottom: 30px;
        // }
        .kong{
          height: 30px;
        }
      }
    // }
  }
</style>