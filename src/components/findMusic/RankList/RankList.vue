<template>
  <div class="RankList">
    <scroll v-show="show" :data='rankList' ref="scroll" class="diyRecom-content">
      <div>
        <!-- 热门榜 -->
        <div class="rank-wrapper">
          <rankItem class="rankItem"  
                    v-if="rankList.length>0" 
                    :rankIndex='0' 
                    :rankId='rankList[0].id' 
                    :rankList='rankList'>
          </rankItem>
          <rankItem class="rankItem"  
                    v-if="rankList.length>0" 
                    :rankIndex='1' 
                    :rankId='rankList[1].id' 
                    :rankList='rankList'>
          </rankItem>
          <rankItem class="rankItem"  
                    v-if="rankList.length>0" 
                    :rankIndex='2' 
                    :rankId='rankList[2].id' 
                    :rankList='rankList'>
          </rankItem>
          <rankItem class="rankItem"  
                    v-if="rankList.length>0" 
                    :rankIndex='3' 
                    :rankId='rankList[3].id' 
                    :rankList='rankList'>
          </rankItem>
          <rankItem class="rankItem"  
                    v-if="rankList.length>0" 
                    :rankIndex='4' 
                    :rankId='rankList[4].id' 
                    :rankList='rankList'>
          </rankItem>
        </div>
        <!-- 全球榜 -->
        <div class="title">全球榜</div>
        <div class="ran-wrapper2">
          <recomSong  @seleRecomSong = 'seleRecomSong' class="recomSong" :personalized="rankDetail"></recomSong>
        </div>
      </div>
     </scroll>
  </div>
</template>
<script>
import {loadMixin,seleItem} from 'common/js/mixin'
import {_getTopList} from 'network/Detail.js'
import RecomSong from 'base/recomSong.vue'
import RankItem from 'components/findMusic/RankList/RankItem/RankItem.vue'
import Scroll from 'base/scroll/scroll'

export default {
  mixins: [loadMixin,seleItem],
  name:'RankList',
  data(){
    return {
       rankList:[],
       rankDetail:[],
       show: false
    }
  },
  created() {
    this.getTopList()
  },
  mounted() {
    this.ranShow()
  },
  components: {
    RankItem,
    RecomSong,
    Scroll
  },
  methods: {
// 获取所有排行榜
    getTopList() {
      // 加载条显示
      this.SETLOADSHOW(true)
      _getTopList().then(res => {
        this.rankList = res.data.list
        this.rankDetail =  this.rankList.splice(5,this.rankList.length)
      })
    },
    ranShow() {
      this.show = true
      // 加载条消失
      setTimeout(() => {
        this.SETLOADSHOW(false)
      }, 500);
      
    }
  },
  computed: {

  }
}
</script>
<style scoped lang='scss' >
  .RankList{
    position: fixed;
    top: 1.15rem;
    bottom: .5rem;
    left: 15%;
    right: 0;
    padding: 0 0 0 9%;
    color: #fff;
    .diyRecom-content{
       height: 100%;
       width: 100%;
       overflow: hidden;
       .rank-wrapper{
          display: flex;
          flex-wrap: wrap;
          .rankItem{
            margin-right: .15rem;
          }
       }
       .title{
         font-size: .16rem;
         margin-bottom: .15rem;
       }
    }
  }
</style>