<template>
    <div class="playerBig">
      <scroll class="suggest" 
         ref="suggest" 
         :pullup='pullup' 
         :data='songComments.comments'
         :beforeScroll = 'beforeScroll'
         @scrollToEnd = 'searchMore'
      >
        <div>
          <div class="title">{{currentSong.name}}</div>
          <!-- 音乐介绍 -->
          <div class="music-content">
      <!-- 左 -->
      <div class="left">
        <div :class="{'cdAnimation':CDtransform}" class="music-canned">
          <div class="music-border">
            <img :src="currentSong.pic" alt="" />
          </div>
        </div>
        <!-- 唱针 -->
        <div class="music-stylus">
          <!-- 唱针轴承 -->
          <div class="Bearing">
            <img src="./Bearing.png" alt="" />
          </div>
          <!-- 唱针1 -->
          <transition name="fade">
            <div class="needle" v-show="playing">
              <img src="./needle.png" alt="" />
            </div>
          </transition>
          <!-- 唱针2(用于动画) -->
          <transition name="fade1">
            <div class="needle2" v-show="!playing">
              <img src="./needle.png" alt="" />
            </div>
          </transition>
        </div>
      </div>
      <!-- 右 -->
      <div class="right">
        <!--歌词展示  -->
          <lyric ref="lyric" v-show="lyric" :lyric='lyric' class="music-lrc"></lyric>
      </div>
          </div>
          <!-- 评论 -->
          <div class="comment">
            <commentOn :songComments='songComments.comments'></commentOn>
          </div>
        </div>
     </scroll>
     <el-alert
       v-show="showAlert"
       class="el-alert"
       title="翻啥翻，再翻下去裤衩都给你翻没了(╯▔皿▔)╯"
       type="error"
       effect="dark">
     </el-alert>
     <div class="load"
         v-loading="loading"
         element-loading-text="拼命加载中"

     >
     </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import {_getMusicComment} from 'network/diyRecom'
import Lyric from '../lyric/lyric.vue'
import Scroll from 'base/scroll/scroll'
import commentOn from 'components/playListDetail/commentOn.vue'

export default {
  props:{
      currentSong: {
         type:Object,
         default: ()=> {}
      },
      lyric: {
          type:Array,
          default: ()=> []
      }
  },
  name: "playerBig",
  data() {
    return {
      songComments: [],
      id:this.currentSong.id,
      page:1,
      limit:20,
      pullup: true,
      beforeScroll: true, //判断是否开始滑动
      hasMore: true, //判断是否加载完
      showAlert:false, // alert是否显示
      timer:{},
      loading:false
    };
  },
  created() {
// 获取歌曲评论
    this.getMusicComment()
  },
  components: {
      Lyric,
      commentOn,
      Scroll
  },
  computed: {
    ...mapGetters(["playing"]),
    CDtransform() {
        return this.playing ? true : false
    },
    allPage() {
      return this.songComments ? parseInt(Math.floor(this.songComments.total/this.limit)) : 0
    },
    yuPage() {
      return this.songComments ? parseInt(this.songComments.total%this.limit) : 0
    }
  },
  methods: {
// 调用子组件歌词滚动
    lrcDong(currentTime) {
      this.$refs.lyric.LrcActive(currentTime)
    },
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
      this.getMusicComment()
    },    
// 获取歌曲评论
    getMusicComment() {
      this.loading = true
      _getMusicComment(this.id,(this.limit*this.page)).then(res => {
        if(res.data.code===200) {
          this.hasMore = true
          this.songComments = res.data
          this._checkMore(res.data.comments)
          this.loading = false
        }     
      })
    },
    _checkMore(data,page) {
      const song = data
      if(this.page == 5){
        this.hasMore = false
        return 
      }
      if(page > this.allPage) {
        this.hasMore = false
        return
      }
      if(!song.length) {
        this.hasMore = false
        return
      }
      if(page == this.allPage) {
        this.limit = this.yuPage
        this.hasMore = false
        return
      }
    },
    closeAlert() {
      this.showAlert = !this.showAlert
    }
  }
};
</script>
<style  lang='scss' >
   
    .playerBig {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 30px 15% 15px 15%;
      background: linear-gradient(-45deg, #333540, #070708, #333540);
      .suggest{
       width: 100%;
       height: 100%;
       overflow: hidden;
       .title {
         position: absolute;
         left: 0;
         right: 0;
         margin: auto;
         top: 20px;
         color: $color-text-2;
         text-align: center;
         font-size: 20px;
       }
       .music-content {
         display: flex;
         width: 100%;
         height: 405px;
         .left {
      position: relative;
      height: 100%;
      width: 50%;
      overflow: hidden;
      .music-stylus {
        .Bearing {
          position: absolute;
          top: -5px;
          left: 0;
          right: 0;
          margin: auto;
          width: 20px;
          z-index: 11;
          img {
            width: 100%;
          }
        }
        .needle,
        .needle2 {
          position: absolute;
          top: 5px;
          left: 77px;
          right: 0;
          margin: auto;
          width: 80px;
          z-index: 10;
          transform-origin: left top;
          img {
            width: 100%;
          }
          &.fade-enter-active,
          &.fade-leave-active {
            transition: all 0.5s;
          }
          &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            transform: rotate(-30deg);
          }
          &.fade1-enter-active,
          &.fade1-leave-active {
            transition: all 0.5s;
          }
          &.fade1-enter, &.fade1-leave-to /* .fade-leave-active below version 2.1.8 */ {
            transform: rotate(0deg);
          }
        }
        .needle2 {
          transform: rotate(-30deg);
        }
      }
      .music-canned {
        position: absolute;
        left: 0;
        right: 0;
        top: 60px;
        margin: auto;
        width: 270px;
        height: 270px;
        border: 40px solid #0e0e11;
        box-shadow: 0 0 10px #fff;
        border-radius: 50%;
        .music-border {
          width: 100%;
          height: 100%;
          border: 5px solid #fff;
          border-radius: 50%;
          img {
            position: absolute;
            top: 3px;
            left: 0;
            right: 0;
            width: 93%;
            margin: auto;
            border-radius: 50%;
          }
        }
      }
         }
         .right {
      position: relative;
      height: 100%;
      width: 50%;
        .music-lrc {
          position: absolute;
          left: 0;
          right: 0;
          margin-left: 15%;
          // margin: 60px auto;
          margin-top: 60px;
          width: 100%;
          height: 70%;
        }
      // }

         }
       }
       .comment{
         width: 100%;
        //  height: 1000px;
         // background-color: crimson;
       }
     }
     .el-alert{
       position: fixed;
       left: 0;
       right: 0;
       margin: auto;
       top: 50px;
       width: 50%;
     }
     .load{
       position: fixed;
       left: 0;
       right: 0;
       margin: auto;
       top: 10%;
       height: 6%;
       .el-loading-mask{
         background-color: rgba(0, 0, 0, 0);
         .el-loading-spinner{       
           .circular .path,.el-loading-text{
             color: $color-bg-red;
             stroke: $color-bg-red;
           }
         }
       }
     }
   }
// cd旋转
.cdAnimation{
   animation: mymove 20s linear infinite;
   -webkit-animation: mymove 20s linear infinite; /*Safari and Chrome*/
}
@keyframes mymove {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes mymove /*Safari and Chrome*/ {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>