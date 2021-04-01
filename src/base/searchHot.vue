<template>
  <div class="searchHot">
    <scroll v-show="searchHot.length>0" :data='searchHot' ref="scroll" class="diyRecom-content">
      <div>
        <div class="search-history">
            <div class="title">搜索历史</div>
            <div @click="deleHistory" class="deleted">清空</div>
        </div>
        <div class="hisQuery">
            <div @click="selectHot(item)" class="his-item" v-for="(item,index) in hisQuery" :key="index">{{item}}</div>
        </div>
        <div class="title">热门搜索</div>
        <div @click="selectHot(item.searchWord)" v-for="(item,index) in searchHot" :key="index" class="hot-item">
           <div class="index" :class="{'active-index':index<3}">{{index+1}}</div> 
           <div class="hot-desc">
               <div class="title1">
                   <div class="name">{{item.searchWord}}</div>
                   <div class="hotNum">{{item.score}}</div>
                   <img class="veryHot" :src="item.iconUrl" alt="">
               </div>
               <div class="title2">{{item.content}}</div>
           </div> 
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import scroll from 'base/scroll/scroll.vue'

export default {
  props:{
      searchHot:{
          type:Array,
          default: ()=> []
      },
      hisQuery: {
          type:Array,
          default: ()=> []
      }
  },
  name:'searchHot',
  data(){
    return {
       
    }
  },
  components: {
      scroll
  },
  methods: {
      selectHot(searchKey) {
          this.$emit('selectHot',searchKey)
      },
      deleHistory() {
          this.$emit('deleHistory')
      }
  }
}
</script>
<style scoped lang='scss' >
    .searchHot{
        position: absolute;
        width: 400px;
        height: 530px;
        background: #2d2f33;
        color: #828385;
        top: 54px;
        z-index: 999;
        padding: .05rem .2rem 0rem .2rem;
        cursor: pointer;
        .diyRecom-content{
            width: 100%;
            height: 100%;
            overflow: hidden;
           .title{
            margin: 0 0 0 0; 
            font-size: .17rem;
            font-weight: 700;
           }
           .search-history{
            display: flex;
            align-items: center;
            margin-bottom: .1rem;
            .deleted{
                margin-left: .15rem;
            }
           }
           .hisQuery{
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              margin-bottom: .1rem;
              .his-item{
                  padding: .05rem .09rem;
                  border-radius: .05rem;
                  background: $color-tab;
                  margin: 0 .05rem .05rem 0;
              }
           }
           .hot-item{
            display: flex;
            align-items: center;
            height: .5rem;
            font-size: .13rem;
            .active-index{
                color: $color-bg-red;
            }
            .index{
                width: .4rem;
                font-size: .14rem;
            }
            .hot-desc{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: .5rem;
                .title1{
                    display: flex;
                    align-items: center;
                    .name{
                        color: #fff;
                    }
                    .hotNum{
                        margin: 0 .1rem;
                    }
                    .veryHot{
                        height: .15rem;
                    }
                }
            }
            
           }
        }
    }
</style>