<template>
  <div class="singList">
    <table style="width:100%;" class="sing-warpper">
      <thead v-show="tabHead" class="sing-head">
        <tr >
          <td style="width: .5rem;"></td>
          <td v-show="showPeration" style="width: .8rem;">操作</td>
          <td >音乐标题</td>
          <td style="width: 1.4rem;">歌手</td>
          <td style="width: 1.8rem;">专辑</td>
          <td style="width: .8rem;">时长</td>
        </tr>
      </thead>
      <tbody class="sing-body">
        <tr ref="itemSong" @dblclick="selectSong(index)" v-for="(item,index) in musicList" :key="index" :class="{'tabCoubel':index%2===0}">
          <td style="width: .5rem;text-align: center;"><i style="font-size:.16rem;" v-if="index==CurrentIndex1" class="icon-20"></i><span :class="{'rank':(index < 3 && showRank)}" v-if="index!==CurrentIndex1">0{{index+1}}</span> </td>
          <td v-show="showPeration" style="width: .8rem;"><i style="font-size:.16rem;" class="icon-uniE91B"></i><i style="margin-left:.05rem;" class="icon-9"></i></td>
          <td :class="{'td-width':!showPeration}">{{item.name}}</td>
          <td v-if="showSongName" style="width: 1.4rem;">{{item.song || item.al.name}}</td>
          <td v-show="showAlbum" style="width: 1.8rem;">{{item.album}}</td>
          <td style="width: .8rem;">{{handleDate(item.time)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {mapMutations,mapActions,mapGetters} from 'vuex'
import {format} from 'common/js/format.js'

export default {
  props:{
    musicList:{
      type:Array,
      default: ()=> []
    },
    detailID:{
      type:Number,
      default: 0,
    },
    showSongName:{
      type:Boolean,
      default:true
    },
    // 头部显示
    tabHead:{
      type:Boolean,
      default:true
    },
    // 歌单显示
    showAlbum:{
      type:Boolean,
      default:true
    },
    // 操作显示
    showPeration:{
      type:Boolean,
      default:true
    },
    // 排行显示
    showRank:{
      type:Boolean,
      default:false
    },
  },
  name:'singList',
  data(){
    return {
      currentIndex1:-1,
      flag: false,
    }
  },
  components: {
    
  },
  methods: {
  ...mapActions({
    selectPlay:'selectPlay'
  }),
  ...mapMutations({
    setCurrentIndex:'SET_CURRENT_INDEX',
    setPlayMode:'SET_PLAY_MODE'

  }),
// 选择播放歌曲
    selectSong(index){
      if(this.showRank) {
        return
      }
      this.flag = true
      this.selectPlay({
        list:this.musicList,
        index:index
      })
    },
// 其他组件打开音乐列表时的事件(一般用于子列表)
    openSingList() {
      this.flag = true
    },
// 处理时间戳
    handleDate(date){
      return format(date)
    }
  },
  watch: {
    detailID(newID,oldID) {
      if (newID==oldID) {
        // console.log(newID);
        this.flag = true
      }else {
        console.log(newID);
        this.flag = false
      }
    }
  },
  computed: {
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'currentIndex',
      'mode'
    ]),
    CurrentIndex1() {
      if(this.flag) {
        return this.currentIndex
      }else {
        return -10
      }
    }
  }
  
}
</script>
<style scoped lang='scss' >
    .tabCoubel{
      background: #1A1C20;
    }
    .td-width{
      display: inline-block;
      overflow:hidden; 
      white-space:nowrap; 
      text-overflow: ellipsis; 
      word-break:break-all;
      width: 1.45rem !important;
    }
    .singList{
        width: 100%;
        color: #fff;
        cursor:pointer;
        background-color: $color-main;
        .sing-warpper{
          width: 100%;
          .sing-head,.sing-body{
            width: 100%;
            color: #828385;
            tr{
              height:.3rem;
              line-height: .3rem;
              border: .01rem solid #23262c;
              font-size:.14rem;
              td{
                padding-left: .05rem;
                border-right: .01rem solid #23262c;
              }

              td:nth-last-child(1){
                border-right: none;
              }
              &:hover{
                background: $color-hot2;
              }
            }
          }
          .sing-body{
            tr{
              height: .3rem;
              width: 100%;
              color: #525252;
              border: none;
              .rank{
                color: $color-bg-red !important;
              }
              td{
                border-right: none;
                vertical-align:middle;
                font-size:.13rem;
                overflow:hidden; 
                white-space:nowrap; 
                text-overflow: ellipsis; 
                word-break:break-all;
              }
              td:nth-child(2){
                font-size: .19rem;
                color: #828385;
              }
              td:nth-child(3){
                color: $color-text-2;
              }
              td:nth-child(5),td:nth-child(2){
                display: inline-block;
                overflow:hidden; 
                white-space:nowrap; 
                text-overflow: ellipsis; 
                word-break:break-all;
              }
              td:nth-child(5){
                width: 1.8rem;
              }
            }
          }
        }
    }
</style>