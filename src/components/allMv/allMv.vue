<template>
  <div class="allMv">
     <scroll class="suggest" 
        ref="suggest" 
        :pullup='pullup' 
        :data='mvs'
        :beforeScroll = 'beforeScroll'
        @scrollToEnd = 'searchMore'
     >
       <div>
           <div class="title">全部MV</div>
           <div class="mv-wrapper">
               <div class="mv-zone">
                   <div class="zone-wrapper">
                     <div class="zone">地区: </div> <div @click="selectArea(index)" :class="{'active-zone':index==areaIndex}" class="zone-item" v-for="(item,index) in area" :key="index">{{item}}</div>
                   </div>
                   <div class="zone-wrapper">
                     <div class="zone">类型: </div> <div @click="selectType(index)" :class="{'active-zone':index==typeIndex}" class="zone-item" v-for="(item,index) in type" :key="index">{{item}}</div>
                   </div>
                   <div class="zone-wrapper">
                     <div class="zone">排序: </div> <div @click="selectOrder(index)" :class="{'active-zone':index==orderIndex}" class="zone-item" v-for="(item,index) in order" :key="index">{{item}}</div>
                   </div>
               </div>
               <recomSong v-if="mvs.length>0" class="mvList" @seleRecomSong='seleMV' :showMv='true' :personalized='mvs'></recomSong>
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
import {_getMvAll} from 'network/mv.js'
import {loadMixin,loadUp,seleMvItem} from 'common/js/mixin.js'
import Scroll from 'base/scroll/scroll'
import recomSong from 'base/recomSong.vue'
import Load from 'base/Load.vue'
import LoadAlert from 'base/LoadAlert.vue'

export default {
  mixins: [seleMvItem,loadMixin,loadUp],
  name:'allMv',
  data(){
    return {
      area: ["全部", "内地", "港台", "欧美", "韩国", "日本"],
      type: ["全部", "官方版", "原声", "现场版", "网易出品"],
      order: ["上升最快", "最热", "最新"],
      areaIndex: 0,
      typeIndex: 0,
      orderIndex: 0,  
      mvs:[]     
    }
  },
  created() {
      this.getMvAll()
  },
  components: {
      recomSong,
      Scroll,
      Load,
      LoadAlert
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
      this.getMvAll()
    },  
      getMvAll() {
          this.loading = true
          _getMvAll(this.area[this.areaIndex],this.type[this.typeIndex],this.order[this.orderIndex],(this.limit*this.page)).then(res => {
              this.mvs = res.data.data
              // 判断是否还需要继续加载
              this._checkMore(this.mvs)
              //判断是否取消主加载条
              this.SETLOADSHOW(false) 
              this.loading = false
          })
      },
      selectArea(index) {
          this.areaIndex = index
          this.getMvAll()
      },
      selectType(index) {
          this.typeIndex = index
          this.getMvAll()
      },
      selectOrder(index) {
          this.orderIndex = index
          this.getMvAll()
      }
  },
  computed: {
      allPage() {
        return this.mvs ? parseInt(Math.floor(this.mvs.total/this.limit)) : 0
      },
      yuPage() {
        return this.mvs ? parseInt(this.mvs.total%this.limit) : 0
      }  
  }
}
</script>
<style scoped lang='scss' >
    .allMv{
        width: 100%;
        height: 100%;
        color: #fff;
        .suggest{
            width: 100%;
            height: 100%;
            overflow: hidden;
            .title{
                margin-bottom: .2rem;
                font-size: .2rem;
            }
            .mv-wrapper{
                width: 100%;
                padding: 0 0 0 9%;
                color: $color-text-l;
                font-size: .13rem;
                .mv-zone{
                    width: 90%;
                    .zone-wrapper{
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        margin-bottom: .2rem;
                        .zone{
                            margin-right: .30rem;
                        }
                        .zone-item{
                            padding: .02rem .1rem;
                            margin-right: .2rem;
                        }
                    }
                }
            }
        }
    }
    .active-zone{
        background: $color-text-d;
        color: #000;
    }
</style>