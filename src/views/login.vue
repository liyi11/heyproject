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
          <div>
            <el-form class="right_box_wrap login"
                     autocomplete="off" label-position="left"
                     ref="form" :model="form" :rules="rules">
              <div class="title">登录</div>
              <p class="seTitle">
                <router-link to="/register">
                  <span>新的用户？</span>创建账号
                </router-link>
              </p>
              <div class="login-center clearfix">
                <el-form-item class="login-center-input" prop="email">
                  <el-input
                      v-model="form.email"
                      type="text"
                      placeholder="请输入您的邮箱"
                  />
                  <div class="login-center-input-text active">邮箱：</div>
                </el-form-item>
              </div>
              <div class="login-center clearfix">
                <el-form-item class="login-center-input" prop="password">
                  <el-input
                      v-model="form.password"
                      type="password" show-password
                      @keyup.enter.native="loginIn('form')"
                      placeholder="请输入您的密码"
                  />
                  <div class="login-center-input-text active">密码：</div>
                </el-form-item>
              </div>
              <p class="seTitle">
                <router-link to="/forgetPass">
                  <span>忘记密码？</span>点击这里
                </router-link>
              </p>
              <el-button  class="login-button" @click.native.prevent="loginIn('form')" :loading="loading">登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error(' ')) // 登录账号长度最少一位
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error(' ')) // 密码长度最少一位
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        email: '',
        password: ''
      },
      usernamefocus: false,
      passwordfocus: false,
      rules: {
        email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      otherQuery: {}

    }
  },
  created(){
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({add_Routes: 'add_Routes'}),
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    /*登录*/
    loginIn(formName){
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.loading = true
          const params = {
            email: this.form.email.trim(),
            password: this.form.password.trim()
          }
          this.$store.dispatch('pmsLogin', params).then(() => {
            // this.$router.push({ path: this.redirect || '/' });
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            // location.reload();//避免第一次不加载
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$refs[formName].validate();
          this.$router.push({ path: this.redirect || '/' });
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
$logintinge: #1D1D1F; // 登陆色调

a{
  color:#000!important;
}
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  .login-content {
    width: 100%;
    height: 100%;
    position: relative;
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
      display: flex;
      justify-items: center;
      align-items: center;
      flex-wrap: nowrap;
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
        transform: translate(-78%, -50%);
        width: 511px;
        height: 502px;
        background: #FFFFFF;
        border-radius: 23px;
        .right_box_wrap{
          margin:57px;
          .title{
            font-weight: 600;
            font-size: 32px;
            color:#000;
          }
          .seTitle{
            margin:10px 0 54px 0;
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
