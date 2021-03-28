<template>
  <div class="findMusic">
      <!-- 导航 -->
      <div class="menu">
        <ul class="menu-wrapper">
          <router-link class="menu-item"
                       v-for="(item,index) in tab1"
                       :key="index"
                       active-class="active2"
                       :to='item.path'
          >{{item.name}}</router-link>
        </ul>
      </div>
      <!--  -->
      <div class="wrapper">
        <router-view></router-view>
      </div>
  </div>
</template>
<script>
export default {
  name:'findMusic',
  data(){
    return {
       activeIndex: '1',
       activeIndex2: '0',
       tab1:[
           {
               id:0,
               name:'个性推荐',
               path:'/findMusic/diyRecom'             
           },
           {
               id:1,
               name:'歌单',
               path:'/findMusic/Detail'
           },
           {
               id:2,
               name:'排行榜',
               path:'/findMusic/RankList'
           },
           {
               id:3,
               name:'歌手',
               path:'/findMusic/Singer'
           },
           {
               id:4,
               name:'最新音乐',
               path:'/findMusic/newMusic'
           },
           {
               id:5,
               name:'MV',
               path:'/findMusic/playMV'
           },
       ]
    }
  },
  computed: {
  },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      toPath() {
        this.$router.push('/findMusic/diyRecom')
      },
      toPath2(path) {
        this.$router.push(path)
      }
  }
}
</script>
<style scoped lang='scss' >
  .findMusic{
      position: fixed;
      display: flex;
      flex-direction: column;
      align-items: center;
      top: .5rem;
      bottom: .5rem;
      left: 15%;
      right: 0;
  }
  .ac{
      opacity: 1;
  }
  .ae{
      opacity: 0.5;
  }
// 导航栏样式
  .menu{
    width: 100%;
    height: .45rem;
    .menu-wrapper{
      display: flex;
      align-items:center;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content:center;
      .menu-item{
        text-align: center;
        font-size: .14rem;
        width: 1rem;
        padding:  .2rem 0 .1rem 0;
        color: #939496;
        box-sizing: border-box;
        &.active2{
          // color: #939496 !important;
          border-bottom: .02rem solid #939496;
        }
      }
    }
  }

  .el-menu{
      display: flex;
      justify-content:center;
      padding: 0 0 .2rem 0;
  }
  .el-menu.el-menu--horizontal{
      border-bottom: none;
  }

</style>