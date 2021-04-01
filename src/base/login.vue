<template>
  <div @click="closeLogin" class="login-wrapper">
    <div class="logo">
        <img src="./logo2.jpg" alt="">
    </div>
    <div @click.stop class="login">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login-form"
      >
         <el-form-item class="username" prop="username">
           <el-input  placeholder="请输入手机号" v-model="loginForm.username" ></el-input>
         </el-form-item>
         <el-form-item class="password" prop="password">
           <el-input  placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
         </el-form-item>
           <el-form-item class="btn">
               <el-button @click="login" type="danger">登录</el-button>
           </el-form-item>
         
      </el-form>
    </div>
  </div>
</template>
<script>
import {_LoginCellphone} from 'network/user.js'

export default {
  name: "login",
  data() {
    return {
        loginName: null,
        loginPic: null,
        loginForm: {
          username: null,
          password: null
        },
        // 表單驗證規則對象
        loginFormRules: {
          // 驗證用戶名是否合法
          username: [
            { required: true, message: "请输入登入名称", trigger: "blur" },
            { min: 11, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ],
          //驗證密碼是否合法
          password: [
            { required: true, message: "请输入登入密碼", trigger: "blur" },
            { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
          ]
        }
    };
  },
  methods: {
//  关闭登录窗口
    closeLogin() {
      this.$emit("closeLogin");
    },
//  登录
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
            return
        }
        _LoginCellphone(this.loginForm.username,this.loginForm.password).then(res => {
            if (res.data.code !== 200) return this.$message.error("登录失败");
            this.$message.success("登录成功");
            this.loginName = res.data.profile.nickname
            this.loginPic = res.data.profile.avatarUrl
            window.sessionStorage.setItem("loginName", this.loginName);
            window.sessionStorage.setItem("loginPic", this.loginPic);
            window.sessionStorage.setItem("token", res.data.token);
            this.closeLogin()
        })
      })
    }
  },
};
</script>
<style scoped lang='scss' >
.login-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  .logo{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-0.75rem, -2.25rem);
      width: 1.5rem;
      border-radius: 50%;
      overflow: hidden;
      img{
          width: 100%;
      }
      z-index: 5;
      box-shadow: 0 0 .1rem #fff;
  }
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-2.5rem, -1.5rem);
    width: 5rem;
    height: 3rem;
    background: $color-main;
    box-shadow: 0 0 .1rem #fff;
    .password{
        width: 70%;
        margin-top: .15rem;
        margin-left: 15%;
    }
    .username{
        width: 70%;
        margin-top: 1rem;  
        margin-left: 15%;
    }
    .btn{
        width: 70%;
        margin-left: 15%;
        margin-top: .3rem;
        .el-button{
            width: 100%;
        }
    }
  }
}
</style>