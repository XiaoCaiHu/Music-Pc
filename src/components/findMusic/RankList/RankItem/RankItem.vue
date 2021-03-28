<template>
  <div @click="openSongList" class="RankItem">
    <!-- 排行列表 -->
    <div class="Rank-top" :class="titleItem[rankIndex].actClass">
       <div class="title">
          <div class="title1">{{titleItem[rankIndex].name}}</div>
          <div class="lit-title">
              <div class="title2">{{titleItem[rankIndex].name2}}</div>
              <div class="uptime">{{uptime}}</div>
          </div>
       </div>
        <img src="./xibofang.svg" alt="">
    </div>
    <!-- 歌曲列表 -->
    <singList ref="singList" :tabHead='false' :showAlbum='false' :showPeration='false' :showRank='true' :detailID='rankId' :musicList='songList.slice(0,8)' ></singList>
  </div>
</template>
<script>
import {loadMixin,seleItem} from 'common/js/mixin'
import singList from 'components/playListDetail/singList.vue'
import {formatDate} from 'assets/common/tool.js'
import {songDetail,_getSongsDetail,_getPlaylistDetail} from 'network/diyRecom.js'

export default {
  mixins: [loadMixin,seleItem],
  props: {
    // 排行列表
    rankList:{
        type:Array,
        default:()=> []
    },
    // 排行索引
    rankIndex:{
        type:Number,
        default:0
    },
    // 排行id
    rankId:{
        type:Number,
        default:0
    }
  },
  name:'RankItem',
  data(){
    return {
       time:'',
       titleItem: [
           {
               name:"飙",
               name2:"升榜",
               actClass:'actClass1'
           },
           {
               name:"新",
               name2:"歌榜",
               actClass:'actClass2'
           },
           {
               name:"原",
               name2:"创榜",
               actClass:'actClass3'
           },
           {
               name:"热",
               name2:"歌榜",
               actClass:'actClass4'
           },
           {
               name:"歌",
               name2:"手榜",
               actClass:'actClass5'
           }
       ],
       // 歌单id
       trackIds: [], 
       // 歌曲列表
       songList: [],
     //    
    }
  },
  created() {
      this._getParamId()
  },
  components: {
      singList
  },
  methods: {

// 获取歌单详情
    _getParamId() {
      _getPlaylistDetail(this.rankId).then(res => {
        this.trackIds = res.data.playlist.trackIds
        this._singDetail(this.trackIds)
      })
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
      
    },
// 打开歌曲列表
    openSongList() {
        this.seleRecomSong(this.rankId)
    }
  },
  computed: {
      uptime() {
          return formatDate(new Date(this.rankList[this.rankIndex].updateTime),'MM月dd日')
      }
  }
}
</script>
<style scoped lang='scss' >

    .RankItem{
       cursor: pointer;
       width: 300px;
       height: 400px;
       margin-right: 15px;
       .Rank-top{
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 1rem;
          width: 100%;
          color: #fff;
          
          .title{
               display: flex;
               align-items: center;
               margin-left: .15rem;
              .title1{
                 font-size: .54rem;
                 font-style: oblique;
              }
              .lit-title{
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  margin-left: .1rem;
                 .title2{
                     margin-bottom: 0.05rem;
                     font-size: .26rem;
                     font-style: oblique;
                 }
              }
          }

          img{
              margin-right: .2rem;
              width: .45rem;
              height: .45rem;
          }
       }
    }


  .actClass1{
    background: linear-gradient(to right, rgb(86, 161, 227), rgb(90, 139, 235));
  }
  .actClass2{
    background: linear-gradient(to right, rgb(52, 170, 190), rgb(86, 194, 205));
  }
  .actClass3{
    background: linear-gradient(to right, rgb(213, 61, 106), rgb(235, 99, 141));
  }
  .actClass4{
    background: linear-gradient(to right, rgb(199, 82, 60), rgb(204, 116, 85));
  }
  .actClass5{
    background: linear-gradient(to right, rgb(148, 85, 206), rgb(153, 70, 201));
  }
</style>