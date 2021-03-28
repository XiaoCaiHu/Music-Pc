<template>
  <div class="albums">
     <div class="hotSong">
         <div class="title">{{album.name}}</div>
         <div class="hotSong-wrapper">
            <div class="image">
                <img v-lazy="album.picUrl" alt="">
            </div>
            <div @click="selectAlbums(albumId)" v-if="musicList.length>0" ref="singList" class="singList-wrapper">
              <singList class="singList" :detailID='singerID' :tabHead='false' :showSongName='true'   :musicList='musicList'></singList>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import {_getAlbum} from 'network/Detail.js'
import {_getSongsDetail,songDetail} from 'network/diyRecom.js'
import singList from 'components/playListDetail/singList.vue'
import {SeDbclick,loadMixin} from 'common/js/mixin.js'

export default {
  mixins:[SeDbclick,loadMixin],
  props:{
      album:{
          type:Object,
          default: ()=> {}
      },
      albumId:{
        type:Number,
        default:0
      }
  },
  name:'albums',
  data(){
    return {
       musicList:[],
       showMusic: false,
    }
  },
  components: {
      singList
  },
  computed: {
  },
  created() {
    this.getSong()
  },
  methods: {
    getSong() {
       if (this.album != null) {
         this.musicList= []
         _getAlbum(this.album.id).then(res => {  
           for (let i of res.data.songs) {
             _getSongsDetail(i.id).then(res => {
               let song = new songDetail(res.data.songs);
               this.musicList.push(song);
             });
           }
           this.showMusic = true
         });
       }
       // 加载条消失
       setTimeout(() => {
         this.SETLOADSHOW(false);  
       }, 100);
      
    }
  },
  watch: {
    albumId(newID,oldID) {
      if(newID == oldID) {
        return
      }else {
        this.getSong()
      }
    }
  }
}
</script>
<style scoped lang='scss' >
   .albums{
        width: 100%;
        .hotSong{
             margin-top: .2rem;
            .title{
                margin-left: 25%;
                margin-bottom: .15rem;
                color: #fff;
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
              width: 75%;        
              .singList{
                  width: 100%;  
                  border:.01rem solid $color-text-l;
              }
            }
          }
        }
   }
</style>