<template>
  <div class="singerIntr">
    <div v-for="(item,index) in introduction" :key="index" class="Intr-item">
        <div class="title"> {{item.ti}}</div>
        <div class="content">{{item.txt}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
      introduction:{
        type:Array,
        default: ()=> [] 
     }  
  },
  name:'singerIntr',
  data(){
    return {
       
    }
  }
}
</script>
<style scoped lang='scss' >
    .singerIntr{
        width: 100%;
        .Intr-item{
            margin-top: .2rem;
            .title{
                color: $color-text-2;
                font-size: .2rem;
                margin-bottom: .2rem;
            }
            .content{
                text-indent: .32rem;
                color: $color-text-l;
                font-size: .16rem;
                line-height: .26rem;
            }
        }
    }
</style>