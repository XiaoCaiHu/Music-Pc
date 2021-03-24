<template>
  <div class="commentOn">
    <div class="commen-input">
      <!-- 输入评论 -->
      <el-input
        type="textarea"
        :rows="3"
        placeholder="来这发表你的感受!>_<!"
        v-model="textarea">
      </el-input>
      <!-- 添加评论按钮 -->
      <div class="btn"><span class="btn-item">评论</span></div>
    </div>
    <div style="margin:15px 0 15px 0;">精彩评论</div>
    <div class="commen-item" v-for="(item,index) in songComments" :key="index">
      <!-- 用户头像 -->
      <el-avatar size="medium" :src="item.user.avatarUrl"></el-avatar>
      <div class="user-wrapper">
        <!-- 用户名/用户评论 -->
        <div class="user-desc">
          <div class="user-name">{{item.user.nickname}}：</div>
          <div class="user-commen">{{item.content}}</div>
        </div>
        <!-- 评论日期 -->
        <div class="commen-time">20{{timeM(item.time)}}</div>
      </div>
    </div>
  </div>
</template>
<script>

import {formatDate} from "assets/common/tool"
export default {
  props: {
    songComments:Array,
    default: ()=> []
  },
  name:'commentOn',
  data(){
    return {
       textarea: ''
    }
  },
  methods: {
    timeM(item) {
       return formatDate(new Date(item), "yy年MM月dd日 hh:mm:ss")
    }
  },
  computed: {
  }
}
</script>
<style  lang='scss' >
    .commentOn{
        color: #fff;
        .commen-input{
          text-align: right;
          width: 100%;
          padding: 10px; 
          background: #1c1e23;
          .btn{
            .btn-item{
              display: inline-block;
              padding: 10px 0 5px 0;
              cursor:pointer;
            }
          }
          .el-textarea{
            .el-textarea__inner{
              color: #fff;
              background-color: #2B2C31;
              border: 1px solid #2B2C31;
            }
          }
        }
        .commen-item{
          display: flex;
          align-items: center;
          padding: 20px 0 10px 30px;
          border: 1px solid #23262c;
          .user-wrapper{
            display: flex;
            flex-direction:column;
            justify-content:space-between;
            width: 100%;
            margin-left: 10px;
            height: 36px;
            color: $color-text-2;
            font-size: 13px;
            .user-desc{
              display: flex;
              align-items: center;
              .user-name{
                color: $color-banner-blue;
              }
              .user-commen{
                width: 85%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
    }
</style>