<template>
  <div class="playListDetail">
      <scroll v-show="scrollItem" :data='scrollItem' ref="scroll" class="detailList-content">
        <div>
            <!-- 歌单介绍 -->
            <div class="suggest">
              <!-- 图片 -->
              <div class="title">
                 <img :src="playlistDetail.coverImgUrl" alt="">
              </div>
              <!--  -->
              <div class="content">
                <!--  -->
                 <div class="top">
                   <span class="top-title"><span class="top-sing">歌单</span><span class="top-name">{{playlistDetail.name}}</span></span>
                   <span class="top-data">
                     <span class="num">
                       <div>歌曲数</div>
                       <div style="margin-top:.05rem;">{{playlistDetail.trackCount}}</div>
                     </span>
                     <span class="num">
                       <div>歌曲数</div>
                       <div style="margin-top:.05rem;">{{playlistDetail.playCount}}</div>
                     </span>
                   </span>
                 </div>
                 <!--  -->
                 <div class="center">
                   <el-tag class="tag" color="#CD2929">播放全部</el-tag>
                   <el-tag class="tag" color="#25272B">收藏({{playlistDetail.subscribedCount}})</el-tag>
                   <el-tag class="tag" color="#25272B">分享({{playlistDetail.shareCount}})</el-tag>
                 </div>
                 <!--  -->
                 <div class="footer">
                   <div v-if="playlistDetail.tags" style="margin-bottom:.1rem;">标签 : <a style="color:#4A79CC;" href="javascript:;">{{playlistDetail.tags[0]}}</a></div>
                   <div class="description" style=""
                    >{{playlistDetail.description}}</div>
                 </div>
              </div>
            </div>
            <!-- 歌单详情/评论 -->
            <detailList @selecTab='selecTab' 
                
                        class="detailList" 
                        v-show="songList" 
                        :tabItem='tabItem' 
                        :songList='songList'
                        :songComments='songComments'
                        :SongSubscribers='SongSubscribers'></detailList>
        </div>
      </scroll>
    </div>
</template>
<script>

import {_getPlaylistDetail,
        _getSongsDetail,
        songDetail,
        _getSongsComment,
        _getSongSubscribers,} from 'network/diyRecom.js'
import detailList from './detailList.vue'
import {mapMutations} from 'vuex'
import Scroll from 'base/scroll/scroll'

export default {
  name:'playListDetail',
  data(){
    return {
       paramId:"",
       playlistDetail:[],
       tabItem:[
         {
           name:'歌曲列表'
         },
         {
           name:'评论',
           num:'0'
         },
         {
           name:'收藏者'
         }
       ],
       tabIndex: 0,
       songList: [],
       songComments:[],
       SongSubscribers:[]
    }
  },
  components: {
    detailList,
    Scroll
  },
  computed: {
    loading() {
      return this.songList.length > 0 ? false : true;
    },
    // scroll 组件刷新值 
    scrollItem() {
      if (this.tabIndex==0) {
        return this.songList
      }else if(this.tabIndex==1) {
        return this.songComments
      }else {
        return this.SongSubscribers
      }
    }
  },
  created() {
     
  },
  mounted() {
    this._getRouterId()
  },
  methods: {
    ...mapMutations({
      getSingerID:'GETSINGERID',
      SETLOADSHOW:'SETLOADSHOW'
    }),
// 返回前一个页面
    back() {
      this.$router.go(-1)
    },

// 根据子组件选项返回index索引，以便scroll刷新页面
    selecTab(index) {
      this.tabIndex = index
    },

// 获取路由id
    _getRouterId() {
      // this.SETLOADSHOW(true)
      if (window.localStorage.getItem("playListDetail")) {
        this.paramId = window.localStorage.getItem("playListDetail");
        // 每次更新router时清空songlist列表
        this.songList = []
        this._getParamId()
      }else {
        return
      }
    },

// 获取歌单详情/歌曲详情
    _getParamId() {
      if (this.paramId) {
        // 获取歌单详情
        _getPlaylistDetail(this.paramId).then(res => {
          this.playlistDetail = res.data.playlist
          // 将tab项num值赋值
          this.tabItem[1].num = this.playlistDetail.commentCount
          console.log(this.playlistDetail)
          // 获取歌曲详情
          this._singDetail(this.playlistDetail.trackIds)
          // 获取歌单评论
          this._singComment(this.playlistDetail.id)
          // 获取歌单收藏者
          this._songSubscribers(this.playlistDetail.id)
          // 获取歌单ID
          this.getSingerID(this.playlistDetail.id)

        })
      }else {
        this.back()
      }
    },

// 获取歌曲详情
    _singDetail(trackIds) {
      this.songList = []
      for (let i in trackIds) {
          _getSongsDetail(trackIds[i].id).then(res => {
          let song = new songDetail(res.data.songs);
          this.songList.push(song);
        })
      }
       // 加载条消失
       this.SETLOADSHOW(false)
    },

// 获取歌单评论
    _singComment(id) {
      _getSongsComment(id,20).then(res => {
        this.songComments = res.data.comments
      })
    },

// 获取歌单收藏者
    _songSubscribers(id) {
      _getSongSubscribers(id,30).then(res => {
        console.log('--------------');
        // console.log(res.data.comments);
        this.SongSubscribers = res.data.subscribers
        console.log(this.SongSubscribers);
      })
    }
    
  },
  watch: {
     // 如果路由有变化，会再次执行该方法
    '$route.params.id': '_getRouterId'
  },
}
</script>
<style scoped lang='scss' >
  .playListDetail{
    width: 100%;
    height: 100%;
    cursor:default;
    padding: .15rem .5rem .15rem .15rem;
    overflow: hidden;
      .detailList-content {
        height: 100%;
        overflow: hidden;
          .suggest{
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 2rem;
            // background-color: black;
            .title{
              width: 2rem;
              img{
                width: 100%;
              }
            }
            .content{
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              flex: 1;
              height: 2rem;
              margin-left: .2rem;
              .top{
                display: flex;
                align-items: center;
                justify-content:  space-between;
                .top-title{
                  display: flex;
                  align-items: center;
                  .top-sing{
                    display: inline-block;
                    font-size: .12rem;
                    padding: .04rem .03rem;
                    border: .01rem solid $color-banner-red;
                    border-radius: .03rem;
                    color: $color-banner-red;
                  }
                  .top-name{
                    margin-left: .2rem;
                    color: $color-text-2;
                    font-size: .2rem;
                  }
                }
                .top-data{
                  display: flex;
                  align-items: center;
                  .num{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-left: .15rem;
                    color: $color-text-d;
                    font-size: .12rem;
                  }
                }
              }
              .center{
                display: flex;
                align-items: center;
                .tag{
                  font-size: .14rem;
                  border: none;
                  margin-right: .2rem;
                  border-radius: .1rem;
                  color: $color-text-2;
                  cursor:pointer;
                }
              }
              .footer{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                font-size: .14rem;
                color: $color-text-2;
                .description{
                  line-height:1.2;
                  width:9rem;    
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
          .detailList{
            margin-top: .1rem;
          }
        }
    // }
  }
</style>