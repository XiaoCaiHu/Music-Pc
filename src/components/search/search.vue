<template>
  <div class="search">
    <scroll v-show="selectItem.length>0" :data='selectItem' ref="scroll" class="detailList-content">
      <div>
         <div class="search-title">搜索<span>“{{searQuery}}”</span>,找到<span>{{musiclist.length}}</span>首单曲</div>
         <div class="search-tag">
           <div @click="selectTag(index)" :class="{'tag-search':index==currentIndex}" v-for="(item,index) in tag" :key="index" class="tag-item">{{item}}</div>
         </div>
         <singList v-show="currentIndex==0" :musicList='musiclist' :detailID='num'></singList>
         <singerList @seleRecomSong='seleRecomSong' :artistslist='artistslist' v-show="currentIndex==1"></singerList>
      </div>
    </scroll>
  </div>
</template>
<script>
import {_search} from 'network/search.js'
import {_getSongsDetail,
        songDetail} from 'network/diyRecom.js'
import {loadMixin} from 'common/js/mixin.js'
import singList from 'components/playListDetail/singList.vue'
import singerList from 'components/findMusic/Singer/singerList.vue'
import Scroll from 'base/scroll/scroll'
import {distinct} from 'common/js/tool.js'
        
export default {
  mixins:[loadMixin],
  name:'search',
  data(){
    return {
       musiclist: [],
       playlistDetail: [],
       searQuery: null,
       searcMultimatch: {},
       artistslist: [],
       mlist: [],
       tag: ['单曲','歌手'],
       currentIndex: 0,
       num: 0
    }
  },
  created() {
   this.getSearcMultimatch()
  },
  components: {
    singList,
    singerList,
    Scroll
  },
  computed: {
    selectItem() {
      return this.currentIndex == 0 ? this.musiclist : this.artistslist
    }
  },
  methods: {
//  获取搜索结果
    getSearcMultimatch(){
        this.num = this.num + 1
        this.searQuery = window.sessionStorage.getItem('searchKey')
        this.musiclist = []
        this.mlist = []
        this.artistslist = []
        _search(this.searQuery).then(res => {
          let list = res.data.result.songs;
          for (let i in list) {
            this.artistslist.push(list[i].artists[0]);
            this.mlist.push(list[i].id);
            if (i == list.length - 1) {
              for (let i of this.mlist) {
                _getSongsDetail(i).then(res => {
                  let song = new songDetail(res.data.songs);
                  this.musiclist.push(song);
                });
              }
              console.log(this.musiclist);
              this.artistslist = distinct(this.artistslist);
              this.SETLOADSHOW(false)
            }
          }
        })
    },
    selectTag(index) {
      this.currentIndex = index
      console.log(this.currentIndex);
    },
// 获取歌手详情
    seleRecomSong(id) {
      console.log(id);
      this.SETLOADSHOW(true)
      window.sessionStorage.setItem("singerID",id);
      this.$router.push('/singDetail/' + id);  
    },

  },
  watch: {
     // 如果路由有变化，会再次执行该方法
    '$route.params.key': 'getSearcMultimatch'
  },
}
</script>
<style scoped lang='scss' >
    .search{
        height: 100%;
        width: 100%;
        color: #fff;
        .detailList-content{
          width: 100%;
          height: 100%;
          overflow: hidden;
          .search-title{
            color: $color-text-l;
            font-size: .13rem;
            padding: .1rem 0;
            span{
              color: $color-banner-blue;
            }
          }
          .search-tag{
            display: flex;
            align-items: center;
            cursor:pointer;
            .tag-item{
              padding: .05rem 0.1rem;
              border-bottom: .02rem solid rgba($color: #000000, $alpha: 0);
              margin-bottom: .1rem;
            }
          }
        }
        .tag-search{
          color: $color-bg-red;
          border-bottom: .02rem solid rgba($color-bg-red, $alpha: 1)  !important;
        }
    }
</style>