<template>
  <div class="detailList2">
      <tab class="tab" @selectIndex="selectIndex" :tabName='tabItem'></tab>
      <singerAlbum v-show="tabIndex==0" @showAll='showAll' :hotSong='hotSong' :hotAlbums='hotAlbums' class="singerAlbum"></singerAlbum>
      <mvList @seleRecomSong='seleMV' v-show="tabIndex==1" :showMv='true' :personalized='mvs'></mvList>
  </div>
</template>
<script>
import tab from 'base/tab.vue'
import singerAlbum from 'components/findMusic/Singer/singerAlbum.vue'
import mvList from "base/recomSong.vue"
import {seleMvItem} from 'common/js/mixin'

export default {
  mixins: [seleMvItem],
  name:'detailList2',
  props: {
     tabItem:{
         type:Array,
         default: ()=> []
     },   
     hotSong:{
        type:Object,
        default: ()=> {} 
     },   
     hotAlbums:{
        type:Array,
        default: ()=> [] 
     },   
     mvs:{
        type:Array,
        default: ()=> [] 
     },   
     introduction:{
        type:Array,
        default: ()=> [] 
     }  
       
  },
  data(){
    return {
       tabIndex: 0
    }
  },
  components: {
      tab,
      singerAlbum,
      mvList
  },
  methods: {
// tab标签变换
    selectIndex(index) {
      this.tabIndex = index
      this.$emit('selecTab',index)
    },
// 更多歌曲显示
    showAll() {
        this.$emit('showAll')
    }
  }
}
</script>
<style scoped lang='scss' >
    .detailList2{
        width: 100%;
        .tab{
          margin-bottom: .1rem;
        }
        .singerAlbum,.mvList {
          width: 100%; 
          margin-top: .1rem;  
        }
    }
</style>