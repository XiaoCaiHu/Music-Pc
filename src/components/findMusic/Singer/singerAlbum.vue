<template>
  <div v-if="showAlbum" @click="sels" class="singerAlbum">
      <div class="hotSong">
         <div class="title">热门{{hotSong.hotSongs.length}}首</div>
         <div class="hotSong-wrapper">
            <div class="image">
                <img :src="hotSong.hotSongs[0].al.picUrl" alt="">
            </div>
            <div @click="selectAlbums(hotSong.artist.id)" ref="singList" :class="showAlls" class="singList-wrapper">
              <singList class="singList" :detailID='singerID' :showSongName='true'   :tabHead='false'  :musicList='hotSong.hotSongs'></singList>
            </div>
        </div>
        <div @click="showAll" class="title">查看全部歌曲</div>
      </div>
      <albums  class="albums" v-for="(item,index) in hotAlbums" :key="index" :albumId='item.id' :album='item'></albums>
  </div>
</template>
<script>
import singList from 'components/playListDetail/singList.vue'
import albums from 'components/findMusic/Singer/albums.vue'
import {SeDbclick} from 'common/js/mixin.js'

export default {
  mixins:[SeDbclick],
  props:{
      hotSong:{
         type:Object,
         default: ()=> {} 
      }, 
      hotAlbums:{
          type:Array,
          default: ()=> []
      }
  },
  name:'singerAlbum',
  data(){
    return {
       show:false
    }
  },
  components: {
      singList,
      albums
  },
  computed: {
      showAlbum() {
          return this.hotSong.hotSongs.length>0 ? true : false
      },
      showAlls() {
          return this.show ? 'showList' : 'hiddenList'
      }
  },
  methods: {
      sels() {
          console.log(this.hotSong.artist.id);
      },
//  点击显示全部歌曲 (控制父组件刷新scroll)
      showAll() {
          this.show = !this.show
          if(this.show){
              this.$refs.singList.style.height = (.312 * this.hotSong.hotSongs.length)   + 'rem'
          }else {
              this.$refs.singList.style.height = (.312 * 10)   + 'rem'
          }
          this.$emit('showAll')
      }
  }
}
</script>
<style scoped lang='scss' >
    .singerAlbum{
        width: 100%;
        .hotSong{
             margin-top: .2rem;
            .title{
                color: #fff;
                height:.1rem;
                margin:0.1rem 0 0.25rem 25%;
            }
            .hotSong-wrapper{
             display: flex;
             justify-content: space-between;
            .image{
                width: 1.5rem;
                img{
                    width: 100%;
                }
            }
            .singList-wrapper{
              height: 3.1rem;
              width: 75%;
              border:.01rem solid $color-text-l;
              .singList{
                  width: 100%;
              }
            }
          }
        }
        .albums{
            margin-top: .2rem;
            width: 100%;
        }


    .showList{
        overflow: none !important;
    }
    .hiddenList{
        overflow: hidden !important;
    }

    }
</style>