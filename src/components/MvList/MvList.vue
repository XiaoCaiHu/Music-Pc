<template>
  <div @click="mmmm" class="MvList">
      <scroll class="suggest" 
         ref="suggest" 
         :pullup='pullup' 
         :data='mvDetail.comments'
         :beforeScroll = 'beforeScroll'
         @scrollToEnd = 'searchMore'
      >
         <div class="mv-wrapper">
            <div class="left">
              <!-- MV名与作者 -->
              <div class="title-wrapper">
                <div class="title-tag">MV</div>
                <div class="title-song">{{mvDetail.name}}</div>
                <div class="title-name">{{mvDetail.artistName}}</div>
              </div>
              <!-- MV视频 -->
              <video :src="mvUrl" controls="controls" class="video" >您的浏览器不支持 video 标签。</video>
              <!-- Mv评论 -->
              <commentOn :songComments='mvComment.comments'></commentOn>
            </div>
            <div class="right">
              <div class="title-desc">MV介绍</div>
              <div class="desc-title">
                <div class="title1">发布时间{{mvDetail.publishTime}}</div>
                <div class="title2">播放次数{{mvDetail.playCount}}</div>
              </div>
              <div class="desc-wrapper">
                <span class="desc-title">简介：</span><span class="desc">{{mvDetail.desc}}</span>
              </div>
              <!-- 相关推荐 -->
              <div class="simi">相关推荐</div>
              <mvList class="mvList" @seleMV='seleMV' :mvRank='mvs'></mvList>
            </div>
         </div>
      </scroll>
      <!-- 触底提示 -->
     <loadAlert :showAlert='showAlert'></loadAlert>
     <!-- 加载条 -->
     <load :loading='loading'></load>
  </div>
</template>
<script>
import {loadMixin,loadUp} from 'common/js/mixin.js'
import {_getMvDetail,_getMvUrl,_getMvComment,_getMvSimi} from 'network/mv.js'
import Scroll from 'base/scroll/scroll'
import commentOn from 'components/playListDetail/commentOn.vue'
import Load from 'base/Load.vue'
import LoadAlert from 'base/LoadAlert.vue'
import mvList from "base/mvRankList.vue"
import {seleMvItem} from 'common/js/mixin'

export default {
  mixins:[loadMixin,loadUp,seleMvItem],
  name:'MvList',
  data(){
    return {
       mvId:0,
       mvUrl: null,
       mvDetail: {},
       mvComment: [],
       mvs:[]
    }
  },
  created() {
    this._getRouterId()
  },
  components: {
    commentOn,
    Scroll,
    Load,
    LoadAlert,
    mvList
  },
  computed: {
    allPage() {
      return this.mvComment ? parseInt(Math.floor(this.mvComment.total/this.limit)) : 0
    },
    yuPage() {
      return this.mvComment ? parseInt(this.mvComment.total%this.limit) : 0
    }
  },
  methods: {
    mmmm() {
      
    },
    _getRouterId(){
      this.SETLOADSHOW(true)
      this.mvId = window.localStorage.getItem("MvListID");
      this.getMvTitle()
    },
//  获取mv标题信息
    getMvTitle() {
      _getMvDetail(this.mvId).then(res => {
        this.mvDetail = res.data.data
        console.log(this.mvDetail);
      }) 
      //  获取Mv播放链接
      this.getMvUrl()
      //  获取相似MV
      this.getMvSimi()
    },
//  获取Mv播放链接
    getMvUrl() {
      _getMvUrl(this.mvId).then(res => {
        this.mvUrl = res.data.data.url
        this.getMvComment()
        this.SETLOADSHOW(false)
      })       
    },
//  获取Mv评论
    getMvComment() {
       this.loading = true
       _getMvComment(this.mvId,(this.page*this.limit)).then(res => {
         console.log(res);
          this.mvComment = res.data
          this.loading = false
          this._checkMore(res.data.comments)
       })
    },
// 获取相似MV
    getMvSimi() {
      _getMvSimi(this.mvId).then(res => {
        this.mvs = res.data.mvs
        console.log(this.mvs);
      })
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
      this.getMvComment()
    },   
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route.params.id":'_getRouterId'
  },
}
</script>
<style scoped lang='scss' >
  .MvList{
    width: 100%;
    height: 100%;
    color: $color-text-ll;
    padding-left: 7%;
    .suggest{
      height: 100%;
      overflow: hidden;
      .mv-wrapper{
        display: flex;
        align-items: flex-start;
        width: 100%;
        .left{
          width: 60%;
          .title-wrapper{
            display: flex;
            align-items: center;
            margin-bottom: .1rem;
            .title-tag{
              padding: .05rem .03rem;
              color: $color-bg-red;
              border: .015rem solid $color-bg-red;
            }
            .title-song{
              margin: 0 .1rem;
              font-size: .2rem;
            }
            .title-name{
              color: $color-text-l;
            }
          }
          .video{
            width: 100%;
          }
        }
        .right{
          margin-left: .2rem;
          width: 30%;
          height: 3rem;
          .title-desc{
            margin: .02rem 0 .14rem 0;
            font-size: .2rem;
          }
          .desc-title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: .12rem;
            color: $color-text-l;
          }
          .desc-wrapper{
            margin-top: .1rem;
            .desc-title{
              display: inline;
              font-size: .14rem;
              color: $color-banner-blue;
            }
            .desc{
              display: inline;
              font-size: .13rem;
              line-height: .16rem;
              color: $color-text-l;
            }
          }
          .simi{
            margin: .2rem 0;
            font-size: .18rem;
          }
          .mvList{
            width: 100%;
          }
        }
      }
    }
  }
</style>