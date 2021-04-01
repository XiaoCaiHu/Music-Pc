<template>
  <div class="singerSimi">
    <recomSong :showMv='true' @seleRecomSong = 'seleRecomSong' class="recomSong" :personalized="simiArtist"></recomSong>
  </div>
</template>
<script>
import {loadMixin} from 'common/js/mixin'
import {_getSimiArtist} from 'network/diyRecom.js'
import recomSong from 'base/recomSong.vue'

export default {
  mixins:[loadMixin],
  name:'',
  data(){
    return {
       simiArtist: []
    }
  },
  created() {
      this.getSimiArtist()
  },
  components: {
      recomSong
  },
  methods: {
      getSimiArtist() {
          let singId = window.sessionStorage.getItem("singerID");
          console.log(singId);
          _getSimiArtist(singId).then(res => {
              this.simiArtist = res.data.artists
              console.log(res);
          })
      },
// 获取歌手详情
      seleRecomSong(id) {
        this.SETLOADSHOW(true)
        window.sessionStorage.setItem("singerID",id);
        this.$router.push('/singDetail/' + id);  
      },    
  }
}
</script>
<style scoped lang='scss' >
    .singerSimi{
        width: 100%;
    }
</style>