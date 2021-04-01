<template>
  <div class="suggest">
      <div class="suggest-title">搜索<span style="color:#4A79CC;">"{{searchQuery}}"</span>相关结果</div>
      <div class="suggest-song">
          <div class="song-title"><i style="margin-right:0.05rem;" class="icon-10"></i>单曲</div>
          <div @click="selectSugg(item.name)"  v-for="(item,index) in searchSugg.songs" :key="index" class="song-item">{{item.name}} -  {{item.artists[0].name}}</div>
      </div>
      <div  class="suggest-song">
          <div class="song-title"><i style="margin-right:0.05rem;" class="icon-3"></i>歌手</div>
          <div @click="selectSugg(item.name)" v-for="(item,index) in searchSugg.artists" :key="index" class="song-item">{{item.name}}</div>
      </div>
  </div>
</template>
<script>
export default {
  props:{
      searchSugg: {
          type:Object,
          default: ()=> {}
      },
      searchQuery: {
          type:String,
          default: null
      }
  },
  name:'suggest',
  data(){
    return {
       
    }
  },
  methods: {
      selectSugg(key) {
          this.$emit('selectSugg',key)
      }
  }
}
</script>
<style scoped lang='scss' >
    .suggest{
        position: absolute;
        top: 54px;
        width: 4rem;
        padding: .1rem 0.1rem 0.05rem 0.1rem;
        z-index: 1000;
        background: #2d2f33;
        color: #828385;
         cursor: pointer;
        .suggest-title{
            font-size: .12rem;
        }
        .suggest-song{
            margin-top:0.1rem;
            .song-title{
                font-size: .14rem;
                color: #fff;
                background: #202226;
                line-height: .28rem;
                .song-i{
                    margin-left: .1rem;
                }
            }
            .song-item{
                font-size: .13rem;
                padding: .05rem 0 .05rem .2rem;
            }
        }
    }
</style>