<template>
  <div class="newSong">
    <div class="newSong-item" v-for="(item,index) in newSong" :key="index">
        <span class="item-num">{{index+1}}</span>
        <img :src="item.picUrl" alt="">
        <div class="newSong-desc">
            <div class="name">{{item.name}}</div>
            <div class="alg">{{item.alg}}</div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
      newSong:{
          type:Array,
          default: ()=> []
      }
  },
  name:'newSong',
  data(){
    return {
       
    }
  }
}
</script>
<style scoped lang='scss' >
    .newSong{
        display: flex;
        flex-wrap: wrap;
        width: 800px;
        font-size: 14px;
        color: #fff;
        .newSong-item{
            display: flex;
            justify-content: start;
            margin: 10px 0;
            padding: 0 0 0 20px;
            height: 50px;
            width: 400px;
            cursor:pointer;
            &:hover {
              background-color: $color-hot2;
            }
            .item-num{
                line-height: 50px;
            }
            img{
                margin: 0 10px;
                height: 100%;
            }
            .newSong-desc{
                display: flex;
                flex-direction: column;
                justify-content: space-around;;
            }
        }
    }
</style>