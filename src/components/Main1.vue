<template>
<el-container>

  <el-header style="height:0.5rem;">
    <!-- logo -->
     <div class="logo">
       <img src="../assets/logo2.jpg" alt="">
     </div>
     <div class="title">小熊音乐</div>
     <!-- 返回 -->
     <div class="back">
        <i class="icon-11"></i>
     </div>
  </el-header>
  
  <el-container>
    <el-aside >
      <!-- 推荐 -->
      <div class="recommend">
        <div class="title">推荐</div>
        <ul class="recommend-wrapper">
          <router-link 
                 class="recommend-item" 
                 v-for="(item,index) in recom" :key="index"
                 :to="item.path" 
                 active-class="active"
          ><i :class="item.clss"></i>{{item.name}}</router-link>
        </ul>
        <!--  -->
        <div class="title">我的音乐</div>
        <ul class="recommend-wrapper">
          <router-link 
                class="recommend-item" 
                v-for="(item,index) in myMusic" :key="index"
                :to="item.path" 
                active-class="active"
          ><i :class="item.clss"></i>{{item.name}}</router-link>
        </ul>
        <div class="title">创建歌单</div>
      </div>
      <!-- 我的音乐 -->
      <div class="myMusic"></div>
    </el-aside>

    <div class="loadMain"
         v-loading="loadShow"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="#16181C"
         element-loading-color="#CC4A4A"
    >
      <el-main>
        <keep-alive>
         <router-view></router-view>
        </keep-alive>
      </el-main>
    </div>

  </el-container>

  <el-footer style="height:0.5rem;">
    <player></player>
  </el-footer>
  
</el-container>

</template>
<script>
import player from 'components/player/player.vue'
import {mapGetters} from 'vuex'

export default {
  name:'main1',
  data(){
    return {
        recom:[
         {
           name:"发现音乐",
           path:'/findMusic',
           clss:'icon-10'
         },
         {
           name:"全部MV",
           path:'/allMv',
           clss:'icon-8'
         },
         {
           name:"直播",
           path:'/nowTv',
           clss:'icon-14'
         },
         {
           name:"视频",
           path:'/Video',
           clss:'icon-6'
         },
         {
           name:"朋友",
           path:'/Friend',
           clss:'icon-3'
         },
       ],
       myMusic:[
         {
           name:"本地音乐",
           path:'/sdsd',
           clss:'icon-1'
         },
         {
           name:"下载管理",
           path:'/downManager',
           clss:'icon-9'
         },
         {
           name:"我的音乐云盘",
           path:'/mYun',
           clss:'icon-12'
         }
       ]
    }
  },
  computed: {
    ...mapGetters([
      'loadShow'
    ])
  },
  components: {
    player
  }
}
</script>
<style  lang="scss">
// 热点路由
    .active{
      padding-left: .2rem !important;
      background-color: $color-hot1;
      color: #fff !important;
    }
    .el-aside,.el-main{
        position: fixed;
        top: .5rem;
        bottom: .5rem;
    }
    .el-header,.el-footer{
        position: fixed;
        left: 0;
        right: 0;
        &.element.style{
          height: 0.5rem;
        }
    }
    // 头部
    .el-header{
        display: flex;
        align-items: center; 
        top: 0;
        height: .5rem;
        background-color: $color-tab;
        .logo{
            img{
                width: .36rem;
                border-radius: 50%;
            }
        }
        .title{
            margin-left: .1rem;
            font-size: $font-size-medium-x;
            color: #fff;
        }
        .back{
          margin-left: .5rem;
          .icon-11{
            font-weight: 700;
            font-size: .19rem;
            color: $color-text-main;
          }
        }
    }
    // 左侧
    .el-aside{
        left: 0;
        right: 15%;
        box-sizing: border-box;
        overflow: hidden;
        font-size: $font-size-medium;
        background-color: $color-aside;
        // 推荐
        .recommend{
          list-style: none;
          .title{
            height: .3rem;
            line-height: .3rem;
            margin-top: .1rem;
            padding: 0rem .1rem;
            font-size: .13rem;
            color: $color-text-main;
            &:hover{
              cursor:pointer;
              color: #fff;
              background-color: $color-hot2;
            }
          }
          .recommend-wrapper{
            width: 100%;
            .recommend-item{
              height: .3rem;
              line-height: .3rem;
              display: inline-block;
              width: 100%;
              padding: 0rem .15rem;
              color: $color-text-main;
              i{
                padding-right: .05rem;
              }
              &:hover{
                cursor:pointer;
                color: #fff;
                background-color: $color-hot2;
              }
            }
          }
        }        
    }
    // 主体
    .loadMain{
      position: fixed;
      top: .6rem;
      bottom: .6rem;
      left: 15%;
      right: 0;
      .el-loading-mask{
        //  background-color: rgba(0, 0, 0, 0);
         .el-loading-spinner{       
           .el-icon-loading,.el-loading-text{
             color: $color-bg-red;
           }
         }
       }
      .el-main{
          box-sizing: border-box;
          left: 15%;
          right: 0;
          background-color: $color-main;
      }      
    }

    // 尾部/
    .el-footer{
        bottom: 0;
        height: .5rem;
        background-color: $color-tab;
    }
</style>