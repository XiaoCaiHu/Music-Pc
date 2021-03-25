<template>
  <div class="Detail">
     <scroll class="suggest" 
        ref="suggest" 
        :pullup='pullup' 
        :data='DetailList'
        :beforeScroll = 'beforeScroll'
        @scrollToEnd = 'searchMore'
     >
       <div>
        <div class="detail-zone">
            <div class="title">热门标签:</div>
            <div class="zone-item"
                 @click="selectItem(item.name,index)"
                 :class="{'active1':index==indexItem}"
                 v-for="(item,index) in tags" 
                 :key="index"
            >{{item.name}}</div>
        </div>
        <recomSong @seleRecomSong = 'seleRecomSong' class="recomSong" :personalized="DetailList"></recomSong>
       </div>
    </scroll>
    <!-- 触底提示 -->
    <loadAlert :showAlert='showAlert'></loadAlert>
    <!-- 加载条 -->
    <load :loading='loading'></load>
  </div>
</template>
<script>
import {_getHot,_getHigDetail} from 'network/Detail.js'
import RecomSong from 'base/recomSong.vue'
import Scroll from 'base/scroll/scroll'
import Load from 'base/Load.vue'
import LoadAlert from 'base/LoadAlert.vue'
import {loadMixin,loadUp} from 'common/js/mixin.js'
// 
export default {
  mixins:[loadMixin,loadUp],
  name:'Detail',
  data(){
    return {
       tags:[],
       currentIndex: 0,
       DetailList: [],
       detNumList: []
    }
  },
  created() {
      this.getHot()
  },
  components: {
      RecomSong,
      Scroll,
      LoadAlert,
      Load
  },
  methods: {
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
      this.getHigDetail()
    },   
// 选择分类标签
      selectItem(name,index) {
          this.currentIndex = index
          this.getHigDetail()
          console.log(name);
      },
// 获取歌单歌曲
      seleRecomSong(id) {
        this.$router.push('/playListDetail/' + id);
      },
// 获取标签
      getHot() {
          _getHot().then(res => {
              this.tags = res.data.tags
              console.log(res.data.tags);
              this.getHigDetail()
          })
      },
// 获取当前分类歌单
      getHigDetail() {
          this.loading = true
          _getHigDetail(this.tags[this.currentIndex].name,this.page*this.limit).then(res => {
              this.DetailList = res.data.playlists
              this.detNumList = res.data
              // 判断是否还需要继续加载
              this._checkMore(this.DetailList)
              //判断是否取消主加载条
              this.SETLOADSHOW(false) 
              this.loading = false
              console.log(this.detNumList);
          })
      }
  },

  computed: {
      indexItem() {
          return this.currentIndex
      },
      allPage() {
        return this.detNumList ? parseInt(Math.floor(this.detNumList.total/this.limit)) : 0
      },
      yuPage() {
        return this.detNumList ? parseInt(this.detNumList.total%this.limit) : 0
      }    
  }
}
</script>
<style scoped lang='scss' >
  .Detail{
    position: fixed;
    cursor:default;
    top: 115px;
    left: 15%;
    right: 0;
    bottom: 50px;
    width: 100%;
    overflow: auto;
    padding: 0 0 0 9%;
    color: #fff;
    .suggest{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .detail-zone{
            display: flex;
            margin-top: 10px;
            // align-items: center;
            color: $color-text-l;
            .title{
                font-size: 16px;
                color: #fff;
            }
            .zone-item{
                margin-top: 2px;
                font-size: 14px;
                margin-left: 20px;
                &.active1{
                    color: $color-bg-red !important;
                }
            }

        }
        .recomSong{
            margin-top: 30px;
            width: 60%;
            // height: 1000px;
        }
    }
  }

  
</style>