<template>
<el-container >
 <div @click="hiddenSearch">
  <el-header style="height:0.5rem;">
    <!-- logo -->
     <div class="logo">
       <img src="../assets/logo2.jpg" alt="">
     </div>
     <div class="title">小熊音乐</div>
     <!-- 返回 -->
     <div @click="back" class="back">
        <i class="icon-11"></i>
     </div>
     <!-- 搜索 -->
     <div @click.stop  class="search">
       <search @searchMu='searchMu' @showHot='showHot' @query='selectQuery'></search>
       <searchHot @deleHistory='deleHistory' :hisQuery='hisQuery' @selectHot='selectHot' v-show="showH" :searchHot='searchHot' class="searchHot"></searchHot>
       <suggest  @selectSugg='selectHot' v-show="showSuggest" :searchQuery='searchQuery' :searchSugg='searchSugg' class="suggest"></suggest>
     </div>
     <!-- 登录 -->
     <div @click="login" style="margin-left:45%;cursor: pointer;" class="logo">
       <img :src="loginPic" alt="">
     </div>
     <div class="title">{{loginName}}</div>
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
 </div> 
  <alert v-show="showAlert" @alertBtn='alertBtn'>确定删除历史记录？</alert>
  <login @closeLogin='closeLogin' v-show="showLogin"></login>
</el-container>
</template>
<script>
import player from 'components/player/player.vue'
import search from 'base/search.vue'  
import searchHot from 'base/searchHot.vue'
import suggest from 'base/suggest.vue'
import {searchQueryHis} from 'common/js/util.js'
import alert from 'base/alert.vue' 
import login from 'base/login.vue'
import {_getSearctHot,_getSearcSuggest} from 'network/search.js'
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
       ],
       searchHot: [], //热门搜索
       searchSugg: {}, //推荐搜索
       searcMultimatch: {}, //多重搜索
       searchQuery:'',  //搜索值
       showH: false,  //显示热门搜索
       showSuggest: false, //显示搜索建议
       hisQuery: [], //搜索历史
       showAlert: false, //弹窗
       showLogin: false,  //登录窗口
       loginName: null, // 登录状态
       loginPic: '未登录' //头像
    }
  },
  created() {
    this.getSearctHot()
    this.loginCheck()
  },
  computed: {
    ...mapGetters([
      'loadShow'
    ])
  },
  components: {
    player,
    search,
    searchHot,
    suggest,
    alert,
    login
  },
  methods: {
//  登录检查
    loginCheck() {
      let tok = window.sessionStorage.getItem("token");
      if(tok != null) {
        this.loginName = window.sessionStorage.getItem("loginName");
        this.loginPic = window.sessionStorage.getItem("loginPic");
      }
    },
//  弹窗
    alertBtn(bool) {
      this.showAlert = false,
      console.log(bool);
      bool ? this.hisQuery = [] : ''
    },
//  返回按钮
    back() {
      this.$router.go(-1)
    },
//  搜索
    selectQuery(newQuery) {
      this.showSuggest = true
      this.showH = false
      this.searchQuery = newQuery
      // 判断输入值是否为空
      if(newQuery.length==0) {
        this.showSuggest = false
        return
      }
      _getSearcSuggest(newQuery).then(res => {
        this.searchSugg = res.data.result
        console.log(res);
      })
    },
//  搜索热词
    getSearctHot() {
      
      _getSearctHot().then(res => {
        this.searchHot = res.data.data
        console.log(this.searchHot);
      })
    },
//  显示热搜列表
    showHot(show) {
      // 当搜索框内容不为空时，显示建议，隐藏热度排行
      if(this.searchQuery.length>0) {
        this.showH = false
        this.showSuggest = true
        return
      }
      this.showH = show 
    },
//  搜索框回车获取歌曲数据
    searchMu(value) {
      searchQueryHis(this.hisQuery,value)
      this.showSuggest = false
      window.sessionStorage.setItem('searchKey',value)
      this.$router.push('/search/' + value)
    },
//  隐藏热门搜索
    hiddenSearch() {
      this.showH = false
      this.showSuggest = false
    },
//  热门搜索点击传值
    selectHot(key) {
      this.searchMu(key)
    },
//  清空搜索历史
    deleHistory() {
      if(this.hisQuery.length<=0) {
         window.alert('暂无历史记录')
         return
      }
      this.showAlert = true
      this.hiddenSearch()
    },
//  登录
    login() {
      this.showLogin = true
    },
//  关闭登录
    closeLogin() {
      this.showLogin = false
      
      
    }
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
    // 头部
    .el-header{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
        display: flex;
        align-items: center; 
        background-color: $color-tab;
        width: 100%;
        height: .5rem;
        .logo{
            height: .36rem;
            width: .36rem;
            background: #fff;
            border-radius: 50%;
            overflow: hidden;
            img{
                height: 100%;
                width: 100%;  
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
        .search{
          margin-left: 10%;
          width: 1.8rem;
          height: .25rem;
          
        }
        .login{
          margin-left: 45%;
          width: 1.8rem;
          height: .25rem;
          background: rosybrown;
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
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: .5rem;
        background-color: $color-tab;
    }


</style>