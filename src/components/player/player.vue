<template>
  <div class="player">
    <!-- 大播放器 -->
    <transition name="fadeBig">
      <div class="player-big" v-if="playBig">
        <playerBig ref="playerBig" :currentSong='currentSong' :lyric='lyric'></playerBig>
      </div>
    </transition>

    <!-- 当前播放歌曲头像/大播放器开关  -->
    <transition name="fade1">
      <div @click="openPlayBig" v-if="fullScreen" class="player-avar">
        <div class="avar-img">
          <div class="avar-mask"><i class="icon-22"></i></div>
          <img v-lazy="currentSong.pic || currentSong.al.picUrl" alt="">
        </div>
        <div class="avar-title">
          <div class="title1">{{currentSong.name}}</div>
          <div class="title2">{{currentSong.song ||  currentSong.ar[0].name}}</div>
        </div>
      </div>
    </transition>

    <!-- 小播放器 -->
     <div class="player-small">
       <!-- 播放按钮 -->
       <div :class="ReadyGo" class="player-btn">  
         <!-- 后退播放 -->
          <div class="icon-left" >
            <i @click="prev" class="icon-16"></i>
          </div>
          <!-- 开始/暂停播放 -->
          <div class="icon-center" >
            <i @click="togglePlaying" :class="playStart"></i>
          </div>
          <!-- 前进播放 -->
          <div class="icon-right" >
            <i @click="next" class="icon-15"></i>
          </div>
       </div>
       <transition name="fade">
         <div class="slider-mode" v-show="fullScreen">
           <!-- 进度条 -->
           <div class="slider-wrapper">
             <span class="timer">{{handleDate(currentTime)}}</span>
             <el-slider @mousedown.native="isChange = true" 
                        @mouseup.native="isChange = false" 
                        :max="musicAllDuration"
                        @change="sliderChange" 
                        v-model="currentTime" 
                        :format-tooltip="formatTooltip" 
                        :show-tooltip="false"></el-slider>
             <span class="timer">{{handleDate(musicAllDuration)}}</span>
           </div>
    
           <!-- 播放模式 -->
           <div class="play-mode">
             <!-- 顺序/随机/单曲播放 -->
             <div @click="changeMode" class="playMode">
               <i :class="seleModel"></i>
             </div>
             <!-- 显示歌词 -->
             <div @click="showLry" :class="descLry" class="playMode">
               <i class="icon-24"></i>
             </div>
             <!-- 显示播放列表 -->
             <div @click="openList" class="playMode">
               <i class="icon-23"></i>
             </div>
           </div>
         </div>
      </transition>
    </div>

    <!-- 歌曲列表 -->
    <transition name="fade2">
      <scorll v-show="openSongList" ref="listContent" :class="{'singBorder':openSongList}" :refreshDelay='refreshDelay' :data='sequenceList' class="list-content">
          <singList ref="singList" :musicList='playlist' class="singList" v-show="openSongList"></singList>
      </scorll>
    </transition>

    <!-- 歌词展示 -->
    <transition name="singlyric">
      <div v-if="showLyric" class="singLry">
        <lyric ref="lyric" :lyric='lyric' :lyricNum='lyricNum' class="lry-wrapper"></lyric>
      </div>
    </transition>

    <!-- audio -->
    <audio :src="song" 
           ref="audio" 
           @play="ready" 
           @canplay="getDuration"
           @ended="end"
           @timeupdate="updateTime" ></audio>

  </div>
</template>
<script>
import singList from 'components/playListDetail/singList.vue'
import playerBig from './playerBig/playerBig.vue'
import Lyric from './lyric/lyric.vue'
import {playMode} from 'common/js/config'
import Scorll from 'base/scroll/scroll'
import {mapGetters,mapMutations,mapActions} from 'vuex'
// 引入洗牌函数
import {ranSing} from 'common/js/util'
import {format} from 'common/js/format.js'

export default {
  name:'player',
  data(){
    return {
       songReady:false,  //歌曲是否加载完毕
       musicAllDuration:0, //判断是否被拖动
       isChange: false,  //
       value3: 0, //进度条滑动时关闭audio timeupdate，鼠标弹起为true
       openSongList:false,
       timer:{},
       currentTime: 0, 
       refreshDelay:100, 
       playBig:false,  //控制大播放器开/关
       lyricNum: 0,  //歌词展示初始滚动值
       showLyric: false, //歌词显示
    }
  },
  components: {
    singList,
    playerBig,
    Lyric,
    Scorll
  },
  computed: {
    ...mapGetters([
      'playlist',
      'playing',
      'fullScreen',
      'sequenceList',
      'mode',
      'currentIndex',
      'song',
      'lyric',
      'currentSong'
    ]),
// 开始/暂停样式
    playStart() {
      return this.playing ? 'icon-13' : 'icon-4'
    },
// 顺序/随机/单曲样式
    seleModel() {
      return this.mode === playMode.sequence ? 'icon-17' : this.mode === playMode.loop ? 'icon-uniE90F' : 'icon-18' 
    },
//  播放进度条播放比例
    percent() {
      return (this.currentTime / this.currentSong.time);
    },
//  播放器样式
    ReadyGo() {
      return this.songReady ? '' : 'btn-desc'
    },
//  歌词显示样式
    descLry() {
      return this.showLyric ? 'descLry' : ''
    }  
  },
  methods: {
    ...mapActions({
      NextPrev:'NextPrev'
    }),
    ...mapMutations({
      setPlayList:'SET_PLAYLIST',
      setPlayMode:'SET_PLAY_MODE',
      setPlayIng:'SET_PLAYING',
      setCurrentIndex:'SET_CURRENT_INDEX',
      GETLYRICLINE:'GETLYRICLINE'
      // setRandomIndex:'SET_RANDOM_INDEX'
    }),
    formatTooltip(val) {
      return val*1000
    },
// 处理时间戳
    handleDate(date){
      return format(date)
    },
// 当播放器准备好播放时
    ready() {
      this.songReady = true
      this.GETLYRICLINE(true)
    },
//  播放完成后事件
    end() {
      // 判断是否处在循环模式
      this.mode === playMode.sequence ? this.next() : this.mode === playMode.loop ? this.loop() : this.random()
    },
// 开始/暂停播放
    togglePlaying() {
      if(this.songReady==false){
          return
      }
      if (this.fullScreen) {
        this.setPlayIng(!this.playing)
      }
    },
// 后退播放
    prev() {
        if(this.songReady==false){
          return
        }
        let index = this.currentIndex - 1
        this.NextPrev({
             list:this.playlist,
             index:index
        })
      
        if(index==-1) {
           index = this.playlist.length-1
           this.NextPrev({
                list:this.playlist,
                index:index
           })
        }
        this.setCurrentIndex(index)
        this.songReady = false
    },
// 前进播放
    next() {
        if(this.songReady==false){
          return
        }
        let index = this.currentIndex + 1
        this.NextPrev({
             list:this.playlist,
             index:index
        }) 
      
        if(index>=this.playlist.length) {
           index = 0
           this.NextPrev({
                list:this.playlist,
                index:index
           })
        }
        this.setCurrentIndex(index)
        this.songReady = false
    },
//  循环播放
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
    },
//  随机播放
    random() {
      let index = ranSing(0,this.playlist.length)
      this.NextPrev({
           list:this.playlist,
           index:index
      })
      this.setCurrentIndex(index)
    },

// 改变播放模式
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
    },
//获得播放歌曲总时长
    getDuration() {
        this.musicAllDuration = this.$refs.audio.duration
    },
// 显示歌曲列表
    openList() {
      // 打开SingList里的事件
      this.$refs.singList.openSingList()
      this.openSongList = !this.openSongList
      setTimeout(() => {
          this.$refs.listContent.refresh()
          this.scrollToCurrent(this.currentSong)
      },20)
    },
// 播放进度发生改变时
    updateTime(e) {
      if (this.isChange === true){
        return
      } else {
         this.currentTime = e.target.currentTime
        //  当打开大播放器时，调用子组件事件
         if(this.playBig) {
           this.$refs.playerBig.lrcDong(e.target.currentTime)
         } 
         if(this.showLyric) {
           this.$refs.lyric.LrcActive(e.target.currentTime)
         }
      } 
    },
// 进度条滑动结束后
    sliderChange() {
        this.$refs.audio.currentTime = this.currentTime
        this.isChange = false
      // 拖动前暂停,拖到后开始 
      if(!this.playing){
        // 歌曲开关
        this.togglePlaying()
      }
    },
  //   播放歌曲滚动至当前歌曲
    scrollToCurrent(current) {
      // 找到current索引
      const index = this.sequenceList.findIndex((song) => {
         return current.id === song.id
      }) 
     
       //   调用listContent scroll滚动到当前播放歌曲位置
      this.$refs.listContent.scrollToElement(this.$refs.singList.$refs.itemSong[index],300)    
    },
// 打开/关闭大播放器
    openPlayBig() {
      this.playBig = !this.playBig
      console.log(this.playBig);
    },
// 显示歌词
    showLry() {
      this.showLyric = !this.showLyric
    }
  },
  watch: {
    // 监听歌曲变化
    song() {
      if(!this.playing){
         return
      }else{
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.$refs.audio.play()
        },1000) 
      }
    },
    // 监听播放开关
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    },
    // 监听当前音乐(小列表好跳转到特定位置)
    currentSong(newCurrentSong,oldCurrentSong) {
      if(oldCurrentSong){
        if(newCurrentSong.id != oldCurrentSong.id){
          setTimeout(() => {
            this.$refs.listContent.refresh()
            this.scrollToCurrent(this.currentSong)
          },20)
        }
      }else {
          setTimeout(() => {
            this.$refs.listContent.refresh()
            this.scrollToCurrent(this.currentSong)
          },20)
      }  
    }
  }
}
</script>
<style  lang='scss' >
  .player{
    // 大播放器
    .player-big{
      position: fixed;
      cursor:default;
      top: .5rem;
      bottom: .59rem;
      left: 0;
      right: 0;
      &.fadeBig-enter-active {
        transition: all .3s ease;
      }
      &.fadeBig-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }
      &.fadeBig-enter, &.fadeBig-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateY(10rem);
        opacity: 0;
      }
    }
    // 播放歌曲头像
    .player-avar{
      position: fixed;
      display: flex;
      align-items: flex-start;
      cursor:default;
      left: 0;
      width: 15%;
      bottom: .6rem;
      background-color: rgba(25,27,31, 0.5) ;
      &.fade1-enter-active,&.fade1-leave-active {
        transition: opacity .3s;
      }
      &.fade1-enter, &.fade1-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }
      .avar-mask{
        position: absolute;
        z-index: 10;
        height: .6rem;
        width: 30%;
        text-align: center;
        line-height: .68rem;
        font-size: .5rem;
        i{
          color: rgba(255, 255, 255, 0.0);
        }
        &:hover{
          background-color: rgba(0, 0, 0, 0.5);
          i{
            color: rgba(255, 255, 255, 0.7);
          }          
        }
      }
      .avar-img{
        height: .6rem;
        width: 30%;
        img{
          height: 100%;
          width: 100%;
        } 
      }
      
      .avar-title{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 3%;
        font-size: .12rem;
        color: #fff;
        height: .6rem;
        width: 70%;
        .title1,.title2{
          width: 95%;
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
    //小播放器
    .player-small{
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 0;
        height: .6rem;
        right: 0;
        left: 0;
        background-color: $color-tab;
        color:$color-text-2;
       
        .player-btn{
          display: flex;
          justify-content:space-around;
          align-items: center;
          width: 15%;
          .icon-left,.icon-center,.icon-right{
            i{
              font-size: .3rem;
            }
          }
          .icon-center{
            i{
              font-size: .35rem;
            }
          }
        }
        .slider-mode{
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 85%;
            &.fade-enter-active,&.fade-leave-active {
              transition: opacity .3s;
            }
            &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
              opacity: 0;
            }
           .slider-wrapper{
              display: flex;
              align-items: center;
              width: 70%;
              .timer{
                 font-size: .14rem;
                 text-align: center;
                 width:.6rem;
              }
              .el-slider{
               margin: 0 .05rem 0 .1rem;
               width: 90%;
               .el-slider__runway{
                 display: flex;
                 align-items: center;
                 height: .03rem;
                 .el-slider__bar{
                   height: .03rem;
                   background-color: #b82525; 
                 }
                 .el-slider__button-wrapper{
                      width: .3rem;
                      height: .3rem;
                      line-height: .3rem;
                    .el-slider__button{
                      width: .13rem;
                      height: .13rem;
                      border: .02rem solid #b82525;
                    }
                  }
               }
              }
           }
           .play-mode{
             display: flex;
             align-items: center;
             justify-content:space-around;
             font-size: .2rem;
             width: 15%;
           }          
        }
            
    }
    // 小歌曲列表
    .list-content{
      position: fixed;
      cursor:pointer;
      // left: 45%;
      right: 0;
      top: 50%;
      bottom: .6rem;
      overflow: hidden;
      &.fade2-enter-active,&.fade2-leave-active {
        transition: opacity .5s;
      }
      &.fade2-enter, &.fade2-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }
      .singList{
        width: 100%;
      }
    }
    // 歌词展示
    .singLry{
      position: fixed;
      height: .35rem;
      width: 100%;
      bottom: .6rem;
      right: 0;
      left: 0;
      margin: auto;
      &.singlyric-enter-active, &.singlyric-leave-active {
        transition: opacity .3s;
      }
      &.singlyric-enter, &.singlyric-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }  
      .lry-wrapper{
        position: relative;
        height: 100%;
        width: 50%;
        margin: 0 0 0 30%;
      }
    }
  }
  
  .singBorder{
     background-color: $color-main;
     border-top: .02rem solid $color-text-main;
     border-left: .02rem solid $color-text-main;
     border-bottom: .02rem solid $color-text-main;
     border-radius: .05rem 0 0 .05rem;
  }

  .btn-desc{
    color:$color-text-d;
  }

  .descLry{
    color: $color-bg-red;
  }




</style>