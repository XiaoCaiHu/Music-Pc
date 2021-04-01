<template>
  <div class="search-wrapper">
    <input v-model="query" @keydown="searchMu($event)"  @focus="searchFocus" placeholder="起风了"  class="search"  type="text" >
  </div>
</template>
<script>
import {debounce} from 'common/js/util.js'

export default {
  name:'search',
  data(){
    return {
       query: ''
    }
  },
  created() {
//   监听query
      this.$watch('query',debounce((newQuery) => {
          this.$emit('query',newQuery)
          this.$emit('showHot',false)
      },350))
  },
  computed: {
      
  },
  methods: {
      searchFocus() {
          this.$emit('showHot',true)
      },
      searchBlur() {
          this.$emit('showHot',false)
      },
      searchMu(e) {
          if(e.keyCode == 13){
              this.$emit('searchMu',e.target.value)
          } 
      }
  }
}
</script>
<style scoped lang='scss' >
    .search-wrapper{
        width: 100%;
        height: 100%;
        .search{
            width: 100%;
            height: 100%;
            padding: 0 .1rem;
            border-radius: .1rem;
            outline: none;
        }
    }
</style>