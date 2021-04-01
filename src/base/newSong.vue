<template>
  <div class="newSong">
    <div @click="selectSong(index)" class="newSong-item" v-for="(item,index) in songList" :key="index">
        <span class="item-num">{{index+1}}</span>
        <img :src="item.pic" alt="">
        <div class="newSong-desc">
            <div class="name">{{item.song}}</div>
            <div class="alg">{{item.name}}</div>
        </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
  props:{
      songList:{
          type:Array,
          default: ()=> []
      }
  },
  name:'newSong',
  data(){
    return {
       
    }
  },
  methods: {
  ...mapActions({
    selectPlay:'selectPlay'
  }),
// 选择播放歌曲
    selectSong(index){
      // console.log(this.newSong[index]);
      this.selectPlay({
        list:this.songList,
        index:index
      })
    },
  }
}
</script>
<style scoped lang='scss' >
    .newSong{
        display: flex;
        flex-wrap: wrap;
        width: 8rem;
        font-size: .14rem;
        color: #fff;
        .newSong-item{
            display: flex;
            justify-content: start;
            margin: .1rem 0;
            padding: 0 0 0 .2rem;
            height: .5rem;
            width: 4rem;
            cursor:pointer;
            &:hover {
              background-color: $color-hot2;
            }
            .item-num{
                line-height: .5rem;
            }
            img{
                margin: 0 .1rem;
                height: 100%;
            }
            .newSong-desc{
                display: flex;
                flex-direction: column;
                justify-content: space-around;;
            }
        }
    }
</style>