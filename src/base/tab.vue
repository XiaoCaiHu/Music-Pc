<template>
  <div class="tab">
     <ul class="tab-wrapper">
         <li @click="selectItem(index)" 
             class="tab-item" 
             :class="{'active':it===index}" 
             v-for="(item,index) in tabName" 
             :key="index"
         >{{item.name}}{{item.num}}</li>
     </ul>
  </div>
</template>
<script>
export default {
  props:{
      tabName:{
          type:Array,
          default: ()=> []
      }
  },
  name:'tab',
  data(){
    return {
       it:0
    }
  },
  methods: {
      selectItem(index) {
          this.it = index
          this.$emit('selectIndex',index)
      }
  },
  computed: {
  }
}
</script>
<style scoped lang='scss' >
    .tab{
        box-sizing: border-box;
        .tab-wrapper{
            display: flex;
            align-items: center;
            .tab-item{
                padding: 10px 15px;
                margin-left: 20px;
                font-size: 14px;
                color: $color-text-2;
            }
        }
    }
    .active{
        border-bottom: 3px solid $color-bg-red;
    }
</style>