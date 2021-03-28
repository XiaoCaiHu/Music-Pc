<template>
  <div class="singDetail">
     <scroll v-if="selectItem" :data='selectItem' ref="scroll" class="detailList-content">
         <div>
            <!-- 歌手介绍 -->
            <div class="suggest">
              <!-- 图片 -->
              <div class="title">
                 <img :src="Artists.picUrl" alt="">
              </div>
              <!-- 介绍主体 -->
              <div class="content">
                <!--  -->
                 <div class="top">
                   <span class="top-title"><span class="top-sing">歌单</span><span class="top-name">{{Artists.name}}</span></span>
                    <el-tag class="tag" color="#25272B">收藏</el-tag>
                 </div>
                 <!--  -->
                 <div class="center">
                   <el-tag class="tag" color="#25272B">歌曲数({{Artists.musicSize}})</el-tag>
                   <el-tag class="tag" color="#25272B">专辑数({{Artists.albumSize}})</el-tag>
                 </div>
                 <!--  -->
                 <div class="footer">
                   <div class="description">个人介绍：<a style="color:#4A79CC;" href="javascript:;">{{Artists.briefDesc}}</a></div>
                 </div>
              </div>
            </div>
            <!-- 歌手详情 -->
            <detailList2 
                    v-show="hotSong" 
                    @showAll='showAll'
                    @selecTab='selecTab' 
                    :tabItem='tabItem' 
                    class="detailList2"
                    :hotSong="hotSong"
                    :hotAlbums='hotAlbums'
                    :mvs='mvs'
                    :introduction='introduction'
            ></detailList2>
         </div>
     </scroll>
  </div>
</template>
<script>
import { loadMixin } from "common/js/mixin.js";
import { _getArtists,_getArtistsAlbum,_getArtistsMV,_getArtistsDesc } from "network/Detail.js";
import Scroll from "base/scroll/scroll";
import detailList2 from 'components/findMusic/Singer/detailList2'

export default {
  mixins: [loadMixin],
  name: "singDetail",
  data() {
    return {
      singId: 0,
      limit: 50,  //歌手专辑数量
      page: 1,  
      Artists: [], //歌手详情
      hotSong: {}, //歌手热门歌曲
      hotAlbums: [], //歌手专辑
      mvs: [], //歌手mv
      introduction: [], //歌手履历
      currentIndex: 0, //当前tab标签
      tabItem: [
          {
              name:'专辑'
          },
          {
              name:'MV'
          },
          {
              name:'歌手详情'
          },
          {
              name:'相似歌手'
          }
      ]
    };
  },
  created() {
    this._getRouterId();
  },
  components: {
    Scroll,
    detailList2
  },
  computed: {
      selectItem() {
        return this.currentIndex==0 ?  this.hotSong.hotSongs : this.currentIndex==1 ? this.mvs : this.currentIndex==2 ? this.introduction : this.hotAlbums
      }
  },
  methods: {
// 获取路由id (歌手ID)
    _getRouterId() {
        this.singId = window.sessionStorage.getItem("singerID");
        this.getArtists();
    },

// 获取歌手详情
    getArtists() {
      _getArtists(this.singId).then((res) => {
        this.Artists = res.data.artist;
        this.hotSong = res.data;
      })
        //获取歌手专辑
        this.getArtistsAlbum()
        // 获取歌手MV
        this.getArtistsMV() 
        // 获取歌手履历
        this.getArtistsDesc()
    },

// 获取歌手专辑
    getArtistsAlbum() {
        _getArtistsAlbum(this.singId).then(res => {
            this.hotAlbums = res.data.hotAlbums
        })
    },

// 获取歌手MV
    getArtistsMV() {
        _getArtistsMV(this.singId).then(res => {
            this.mvs = res.data.mvs
        })        
    },

// 获取歌手履历
    getArtistsDesc(){
        _getArtistsDesc(this.singId).then(res => {
            this.introduction = res.data.introduction
        })
    },

// 切换标签
    selecTab(index) {
        this.currentIndex = index
    },

// 刷新页面高度
    showAll() {
        this.$refs.scroll.refresh()
    }

  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route.params.id":'_getRouterId'
  },
};
</script>
<style scoped lang='scss' >
.singDetail {
  width: 100%;
  height: 100%;
  cursor: default;
  padding: 0.15rem 0.5rem 0.15rem 0.15rem;
  overflow: hidden;
  .detailList-content {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .suggest {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 2rem;
      .title {
        height: 2rem;
        img {
          width: 100%;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 1;
        height: 2rem;
        margin-left: 0.2rem;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .top-title {
            display: flex;
            align-items: center;
            .top-sing {
              display: inline-block;
              font-size: 0.12rem;
              padding: 0.04rem 0.03rem;
              border: 0.01rem solid $color-banner-red;
              border-radius: 0.03rem;
              color: $color-banner-red;
            }
            .top-name {
              margin-left: 0.2rem;
              color: $color-text-2;
              font-size: 0.2rem;
            }
          }
          .tag {
            font-size: 0.14rem;
            border: none;
            margin-right: 0.2rem;
            border-radius: 0.1rem;
            color: $color-text-2;
            cursor: pointer;
          }
        }
        .center {
          display: flex;
          align-items: center;
          .tag {
            font-size: 0.14rem;
            border: none;
            margin-right: 0.2rem;
            border-radius: 0.1rem;
            color: $color-text-2;
            cursor: pointer;
          }
        }
        .footer {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-size: 0.14rem;
          color: $color-text-2;
          .description {
            line-height: 1.2;
            width: 9rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .detailList2{
        margin-top: .15rem;
    }
  }
}
</style>