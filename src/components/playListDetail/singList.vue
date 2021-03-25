<template>
  <div class="singList">
    <table style="width:100%;" class="sing-warpper">
      <thead v-show="tabHead" class="sing-head">
        <tr >
          <td style="width: 50px;"></td>
          <td v-show="showPeration" style="width: 80px;">操作</td>
          <td >音乐标题</td>
          <td style="width: 140px;">歌手</td>
          <td style="width: 180px;">专辑</td>
          <td style="width: 80px;">时长</td>
        </tr>
      </thead>
      <tbody class="sing-body">
        <tr ref="itemSong" @dblclick="selectSong(index)" v-for="(item,index) in musicList" :key="index" :class="{'tabCoubel':index%2===0}">
          <td style="width: 50px;text-align: center;"><i style="font-size:16px;" v-if="index==CurrentIndex1" class="icon-20"></i><span :class="{'rank':(index < 3 && showRank)}" v-if="index!==CurrentIndex1">0{{index+1}}</span> </td>
          <td v-show="showPeration" style="width: 80px;"><i style="font-size:16px;" class="icon-uniE91B"></i><i style="margin-left:5px;" class="icon-9"></i></td>
          <td >{{item.name}}</td>
          <td style="width: 140px;">{{item.song}}</td>
          <td v-show="showAlbum" style="width: 180px;">{{item.album}}</td>
          <td style="width: 80px;">{{handleDate(item.time)}}</td>
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
    }
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
        this.flag = true
      }else {
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
  // descRank() {
  //   return this.showRank ? 'true' : 'false'
  // }
  
}
</script>
<style scoped lang='scss' >
    .tabCoubel{
      background: #1A1C20;
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
              height:30px;
              line-height: 30px;
              border: 1px solid #23262c;
              font-size:14px;
              td{
                padding-left: 5px;
                border-right: 1px solid #23262c;
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
              width: 100%;
              color: #525252;
              border: none;
              .rank{
                color: $color-bg-red !important;
              }
              td{
                border-right: none;
                vertical-align:middle;
                font-size:13px;
                overflow:hidden; 
                white-space:nowrap; 
                text-overflow: ellipsis; 
                word-break:break-all;
              }
              td:nth-child(2){
                font-size: 19px;
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
                width: 180px;
              }
            }
          }
        }
    }
</style>