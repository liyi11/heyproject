<template>
  <div class="login-container">
    <div class="login-content">
      <div class="logo">
        <img src="../assets/images/login/logo_text.png" alt="">
      </div>
      <div class="content_box">
        <div class="left_box">
          <img src="../assets/images/login/left_bg.png" alt="">
        </div>
        <div class="right_box">
          <el-form class="right_box_wrap login"
                   autocomplete="off" label-position="left"
                   ref="form" :model="form" :rules="rules">
            <div class="title">忘记密码</div>
            <p class="seTitle">
              <router-link to="/login">登录</router-link>
              <span class="marginlr10">或</span>
              <router-link to="/register">注册</router-link>
            </p>
            <div class="login-center clearfix send_code_box">
              <el-form-item class="login-center-input" prop="email">
                <el-input
                    v-model="form.email"
                    type="text"
                    placeholder="请输入您的邮箱"
                />
                <div class="login-center-input-text active">邮箱：</div>
              </el-form-item>
              <span class="send_code" @click="send_code">发送验证码</span>
            </div>
            <div class="login-center clearfix">
              <el-form-item class="login-center-input" prop="code">
                <el-input
                    v-model="form.code"
                    type="password"
                    placeholder="请输入验证码"
                />
                <div class="login-center-input-text active">验证码：</div>
              </el-form-item>
            </div>
            <div class="login-center clearfix">
              <el-form-item class="login-center-input" prop="passwordone">
                <el-input
                    v-model="form.passwordone"
                    type="password" show-password
                    placeholder="请输入您的密码"
                />
                <div class="login-center-input-text active">密码：</div>
              </el-form-item>
            </div>
            <div class="login-center clearfix">
              <el-form-item class="login-center-input" prop="passwordtwo">
                <el-input
                    v-model="form.passwordtwo"
                    type="password" show-password
                    placeholder="请确认密码"
                />
                <div class="login-center-input-text active">确认密码：</div>
              </el-form-item>
            </div>
            <el-button  class="login-button" @click.native.prevent="saves('form')" :loading="loading">提 交</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {
  send_code,
} from "@/api/xapi";
import {
  forgetPass
} from "@/api/user";
export default {
  data () {
    return {
      loading: false,
      form: {
        email: '',
        code:'',
        passwordone: '',
        passwordtwo: '',
      },
      emailfocus: false,
      codefocus:false,
      passwordonefocus: false,
      passwordtwofocus: false,
      rules: {
        email: [{ required: true, message: '必填', trigger: 'blur' }],
        code: [{ required: true, message: '必填', trigger: 'blur' }],
        passwordone: [{ required: true, message: '必填', trigger: 'blur' }],
        passwordtwo: [{ required: true, message: '必填', trigger: 'blur' }]
      },
    }
  },
  created(){
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    saves(formName){
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.loading = true
          const obj = {
            password:this.form.passwordone.trim(),
            email: this.form.email.trim(),
            code: this.form.code,
          }
          console.log(obj);

          const res = await forgetPass(obj)
          this.btn_loading = false

          if (res.code !== 200) return false
          Object.assign(this.$data, this.$options.data())
          this.$layer.close(this.layerid)
          this.$message({ message: '密码修改成功, 请登陆。', type: 'success',duration:1000 })
          this.$router.push({ path: this.redirect || '/' });
          this.loading = false
        } else {
          this.$refs[formName].validate();
          return false
        }
      })
    },
    async send_code(){
      let obj = {
        email:this.form.email
      }
      const res = await send_code(obj)
      if (res.code !== 200) return false

      this.$message({ message: '发送成功，请查收', type: 'success',duration:1000 })
    }
  }
}
</script>
<style lang="scss">
.send_code_box{
  .el-form-item{
    margin-bottom: 0!important;
  }
}
</style>
<style lang="scss" scoped>
.send_code_box{
  text-align: center!important;
  .send_code{
    cursor:pointer;
    display: inline-block;
    min-width: 90px;
    line-height: 39px;
    margin-left: 10px;
    color:#000!important;
    font-size: 14px;
    border-bottom: 1px solid #ccc!important;
  }
}
a{
  color:#000!important;
}
$logintinge: #1D1D1F; // 登陆色调
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
  .login-content {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .logo{
      position: fixed;
      left: 5%;
      top: 6%;
      width: 16.7%;
      img{
        max-width:50%;
      }
    }
    .content_box{
      width: calc(100%);
      height: 100%;
      .left_box{
        position: fixed;
        top: 20%;
        left: 5%;
        width: 48%;
        img{
          max-width:90%;
        }
      }
      .right_box{
        position: fixed;
        top: 50%;
        left: 78%;
        width: 511px;
        height: 614px;
        transform: translate(-78%, -50%);
        background: #FFFFFF;
        border-radius: 23px;
        .right_box_wrap{
          margin:57px;
          .title{
            font-weight: 600;
            font-size: 32px;
            color: #000;
          }
          .seTitle{
            margin:10px 0;
            font-size: 14px;
            span{
              color: #868686;
            }
          }
        }
      }
    }
  }
  // 右登陆
  .login /deep/ {
    .login-top {
      font-size: 24px;
      color: #333333;
      box-sizing: border-box;
      margin: 50px auto;
      text-align: center;
    }
    .login-center {
      box-sizing: border-box;
      margin: 35px auto 25px;
      .login-center-img {
        display: block;
        font-size: 25px;
        float: left;
        margin-top: 6px;
        color: #666;
      }
      .login-center-input {
        width: 100%;
        height: 40px;
        position: relative;
        .el-form-item__content {
          height: 40px;
          line-height: 40px;
          .el-input__inner {border-radius: 0;}
        }
        input {
          z-index: 2;
          transition: all 0.5s;
          padding-left: 10px;
          color: #333333;
          width: 100%;
          height: 40px;
          border: 1px solid #fff;
          border-bottom: 1px solid #cccccc;
          box-sizing: border-box;
          outline: none;
          position: relative;
          &::placeholder { color: #757575; }
          &:focus { border-bottom: 1px solid $logintinge; }
        }
        .el-input__suffix {z-index: 999;} // 眼睛
      }
      .login-center-input-text {
        &.active {
          top: -4px;
          left:-1px;
          z-index: 3;
          opacity: 1;
          margin-top: -15px;
        }
        z-index: 0;
        background: transparent;
        position: absolute;
        opacity: 0;
        height: 20px;
        top: 50%;
        margin-top: -10px;
        font-size: 14px;
        left: 5px;
        color: $logintinge;
        line-height: 20px;
        transition: all 0.5s;
      }
    }
    .send_code_box{
      display: flex;
    }
    .login-button.el-button--medium.el-button {
      display: block;
      font-size: 18px!important;
      float:right;
      width: 105px;
      height: 42px!important;
      text-align: center;
      border-radius: 10px!important;
      border: none;
      color: white;
      cursor: pointer;
      background-color: $logintinge;
    }
  }
}

</style>
