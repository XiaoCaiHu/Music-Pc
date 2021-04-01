<template>
  <div class="newMusic">
     <scroll class="suggest" 
        ref="suggest" 
        :pullup='pullup' 
        :data='musicList'
        :beforeScroll = 'beforeScroll'
        @scrollToEnd = 'searchMore'
     >
     <div class="newMusic-wrapper">
        <div class="newTag">
          <div @click="selectTag(index)" :class="{'tag-active':index==typeIndex}" v-for="(item,index) in type" :key="index" class="tag-item">{{item.name}}</div>
        </div>
        <singList :showPeration='false' :showPic='true' :detailID='type[typeIndex].id' class="singList" ref="singList" :tabHead='false' :showAlbum='false' :musicList='musicList'></singList>
     </div> 
    </scroll>
    <!-- 触底提示 -->
    <loadAlert :showAlert='showAlert'></loadAlert>
    <!-- 加载条 -->
    <load :loading='loading'></load>
  </div>
</template>
<script>
import {loadMixin,loadUp} from 'common/js/mixin'
import {_getSongTop,_getSongsDetail,songDetail} from 'network/diyRecom.js'
import Scroll from 'base/scroll/scroll'
import singList from 'components/playListDetail/singList.vue'
import Load from 'base/Load.vue'
import LoadAlert from 'base/LoadAlert.vue'

export default {
  mixins: [loadMixin,loadUp],
  name:'newMusic',
  data(){
    return {
       type: [
         {
           name:'全部',
           id: 0
         },
         {
           name:'华语',
           id: 7
         },
         {
           name:'欧美',
           id: 96
         },
         {
           name:'日本',
           id: 8
         },
         {
           name:'韩国',
           id: 16
         }
       ],
       typeIndex: 0,
       musicList: [],
       list: [],
       clear: false
    }
  },
  created() {
    this.getSongTop()
  },
  components: {
    Scroll,
    singList,
    LoadAlert,
    Load
  },
  computed: {
    showScroll() {
      return this.musicList.length>0 ? true : false
    },
    allPage() {
      return this.list ? parseInt(Math.floor(this.list.total/this.limit)) : 0
    },
    yuPage() {
      return this.list ? parseInt(this.list.total%this.limit) : 0
    }    
  },
  methods: {
// 获取最新音乐
    getSongTop() {
      this.loading = true
      _getSongTop(this.type[this.typeIndex].id).then(res => {
        this.musicList = [];
        this.list = res.data.data    
        for (let i in this.list) {
          _getSongsDetail(this.list[i].id).then(res => {
            let song = new songDetail(res.data.songs);
            this.musicList.push(song);
          });
        }  
      });
      this.SETLOADSHOW(false) 
      // 判断是否还需要继续加载
      this._checkMore(this.musicList)
      this.loading = false
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
      this.getSongTop()
    },   
// 切换歌曲标签
    selectTag(index) {
      this.typeIndex = index
      this.getSongTop()
    }
  }
}
</script>
<style scoped lang='scss' >
  .newMusic{
    position: fixed;
    cursor:default;
    top: 1.15rem;
    left: 15%;
    right: 0;
    bottom: .5rem;
    padding: 0 0 0 9%;
    color: #fff;
      .suggest{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .newMusic-wrapper{
          width: 90%;
          .newTag{
            display: flex;
            align-items: center;
            .tag-item{
              margin-right: .2rem;
              padding: 0.1rem 0.05rem;
              border-bottom: .02rem solid rgba($color: #000, $alpha:0);
            }
          }
          .singList{
            width: 100%;
          }
        }
        
      }
    .tag-active{
      color: $color-bg-red; 
      border-bottom: .02rem solid rgba($color: $color-text-main, $alpha: 1.0) !important;
    }
  }
</style>