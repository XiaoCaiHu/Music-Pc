<template>
  <div class="detailList">
          <tab class="tab" @selectIndex="selectIndex" :tabName='tabItem'></tab>
          <singList ref="singList" :detailID='singerID' :musicList='songList' v-show="tabIndex===0"></singList>
          <commentOn :songComments='songComments' v-show="tabIndex===1"></commentOn>
          <collector :Subscribers='SongSubscribers' v-show="tabIndex===2"></collector>
  </div>
</template>
<script>


import tab from 'base/tab.vue'
import singList from './singList.vue'
import commentOn from './commentOn.vue'
import collector from './collector.vue'
import {mapGetters} from 'vuex'



export default {
  props:{
      tabItem:{
          type:Array,
          default: ()=> []
      },
      songList:{
          type:Array,
          default: ()=> []
      },
      songComments:{
          type:Array,
          default: ()=> []
      },
      SongSubscribers:{
          type:Array,
          default: ()=> []
      }
  },
  name:'detailList',
  data(){
    return {
       activeName: 'second',
       tabIndex:0,
       singID:0
    }
  },
  components: {
      tab,
      singList,
      commentOn,
      collector,
  },
  // mounted() {
  //   this.openlist()
  // },
  methods: {
// tab标签变换
    selectIndex(index) {
      this.tabIndex = index
      this.$emit('selecTab',index)
    },
//  打开singList组件的事件
    openlist() {
      //  主体singlist打开时使用(用于随机) 
      // this.$refs.singList.openRanList()
    }
  },
  computed: {
    ...mapGetters([
      'singerID'
    ])
  }
}
</script>
<style scoped lang='scss' >
    .detailList{
        width: 100%;
        .tab{
          margin-bottom: 10px;
        }
    }
</style>