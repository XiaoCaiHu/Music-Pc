<template>
<scroll class="middle-r" ref="lyricList" :data="lyric.ms">
  <div class="lyric">
    <div class="lyric-wrapper"
         v-if="showLry"
    >
        <p ref="lyricLine" :class="{'currentActive':index==currentLineNum}" class="lyric-item" v-for="(item,index) in lyric.ms"
          :key="index"
        >{{item.text}}</p>
    </div>
    <div class="lyric-wrapper2"
         v-if="!showLry"
    >
        <p>暂无歌词</p>
    </div>
  </div>
  
</scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import {mapMutations,mapGetters} from 'vuex'

export default {
  props: {
      lyric: {
          type:Array,
          default: ()=> []
      },
      lyricNum: {
        type:Number,
        default: 4
      }
  },
  name:'lyric',
  data(){
    return {
        playingLyric: '',
        currentLineNum:0,   
        showLry: true    
    }
  },
  computed: {
    ...mapGetters([
      'lyricLine1'
    ]),

  },
  components: {
    Scroll
  },
  methods: {
    ...mapMutations({
      GETLYRICLINE:'GETLYRICLINE'
    }),
    LrcActive(currentTime) {
        if(this.lyric.ms == undefined){
          return this.showLry = false
        }
        this.showLry = true
        // 歌词滚动
         this.lyric.ms.forEach((element,index) => {
          
          if(index >= this.lyric.ms.length-1){
            return
          }
          if(currentTime<this.lyric.ms[index + 1].time && currentTime>this.lyric.ms[index].time) {
            
            this.currentLineNum = index; //通过比较我们歌词属性里的时间与当前播放时间，来定位到该歌词
            if(this.lyricLine1) {
              this.$refs.lyricList.scrollToElement(this.$refs.lyricLine[this.currentLineNum],1000)
              this.GETLYRICLINE(false)
              return
            }
            if(this.currentLineNum > this.lyricNum){
              let lineEl = this.$refs.lyricLine[this.currentLineNum - this.lyricNum]
              this.$refs.lyricList.scrollToElement(lineEl,1000)
            }else{
              this.$refs.lyricList.scrollToElement(0,0,1000)
            }
            // 唱片下显示歌词
            this.playingLyric = this.lyric.ms[this.currentLineNum].text
            // this.GETLYRICLINE(false)
          }
        });
    }
  },


}
</script>
<style scoped lang='scss' >
   .middle-r{
     
     width: 100%;
     height: 100%;
     
     overflow: hidden;
    .lyric{
        width: 70%;
        // height: 100%;
        // background: aqua;
        .lyric-wrapper{
          position: relative;
          width: 100%;
          // height: 100%;   
          .lyric-item{
              line-height: 32px;
              text-align: center;
              font-size: 14px;
              color: #5e6062 ;
          }
        }
        .lyric-wrapper2{
          position: absolute;
          top: 25%;
          left: -15%;
          font-weight: 700;
          font-size: 20px;
          width: 100%;
          text-align: center;
          color: #5e6062;
        }
    }
  }

 .currentActive{
   color: $color-banner-red !important;
   font-size: 17px  !important;
   font-weight: 700;
 }
</style>