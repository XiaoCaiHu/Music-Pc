<template>
  <div class="singerList">
      <div @click="seleRecomSong(item.id)" v-for="(item,index) in artistslist" :key="index" class="singerList-item">
          <img :src="item.img1v1Url" alt="">
          <div class="name">{{item.name}}</div>
      </div>
  </div>
</template>
<script>
export default {
  props: {
      artistslist: {
          type:Array,
          default: ()=> []
      }
  },
  name:'singerList',
  data(){
    return {
       
    }
  },
  methods: {
      seleRecomSong(id) {
          this.$emit('seleRecomSong',id)
      }
  }
}
</script>
<style scoped lang='scss' >
    .singerList{
        width: 100%;
        .singerList-item{
            height: .3rem;
            width: 100%;
            display: flex;
            align-content: center;
            cursor:pointer;
            margin-bottom: .1rem;
            img{
                height: 100%;
            }
            .name{
                margin-left: .2rem;
                line-height: .3rem;
                font-size: .13rem;
                color: #fff;
            }
        }
    }
</style>