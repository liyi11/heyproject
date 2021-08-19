<template>
  <div class="login-container register_container">
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
            <div class="title">注册账户</div>
            <p class="seTitle">
              <router-link to="/login">
                <span>已经有账号了？</span>登录
              </router-link>
            </p>
            <div class="login-center clearfix">
              <el-form-item class="login-center-input" prop="company_name">
                <el-input
                    v-model="form.company_name"
                    type="text"
                    placeholder="请输入公司名称"
                />
                <div class="login-center-input-text active">公司名称：</div>
              </el-form-item>
            </div>
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
            <el-row :span="24">
              <el-col :span="11">
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
              </el-col>
              <el-col :span="2">
                <span style="color:transparent">1</span>
              </el-col>
              <el-col :span="11">
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
              </el-col>
            </el-row>
            <div class="login-center clearfix">
              <el-form-item class="login-center-input" prop="phone_number">
                <div class="flex input_phone">
                  <div style="width:100px;">
                    <el-select  v-model="area_codeNum"
                                popper-class="select_national_info"
                                class="select_national_info" filterable>
                      <el-option v-for="(item,index) in national_info_list" :key="index"
                                 :value="item.phone_prefix" :label="item.phone_prefix" >
                        <div class="wrap">
                          <div class="wrap select_and">
                            <p class="select_cirl"></p>
                            <p class="name">
                              {{item.name}}
                            </p>
                          </div>
                          <img :src="item.image" alt="" height="20" >
                        </div>
                      </el-option>
                    </el-select>
                  </div>
                  <el-input class="noBorder" v-model.number="form.phone_number" clearable placeholder="请输入电话号码"/>
                </div>
                <div class="login-center-input-text active">手机号码：</div>
              </el-form-item>
            </div>
            <div class="login-center clearfix">
              <el-form-item class="login-center-input" prop="permission" >
                <el-select  v-model="form.permission"
                            clearable filterable
                            placeholder="请选择体验模块">
                  <el-option v-for="(item,index) in register_permissions_list" :key="index"
                             :value="item.value" :label="item.label" >
                    <p class="select_and"><span class="select_cirl"></span><span>{{item.label}}</span></p>
                  </el-option>
                </el-select>
                <div class="login-center-input-text active">选择体验模块：</div>
              </el-form-item>
            </div>
            <el-button class="login-button" @click.native.prevent="register('form')" :loading="loading">注册</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {get_national_info} from '@/api/xapi'
import {pmsRegister} from "@/api/user";
import {register_permissions_list} from "@/api/map";

export default {
  data () {
    return {
      register_permissions_list:register_permissions_list,
      area_codeNum: '',
      loading: false,
      form: {
        company_name:'',
        email: '',
        passwordone: '',
        passwordtwo:'',
        permission:'',
        phone_number:''
      },
      componeyfocus:false,
      emailfocus: false,
      passwordtwofocus: false,
      passwordonefocus:false,
      phonefocus:false,
      permissionfocus:false,
      rules: {
        phone_number:[{ required: true, trigger: 'blur',message:'必填' }],
        company_name: [{ required: true, trigger: 'blur',message:'必填' }],
        email: [{ required: true, message: '必填', trigger: 'blur' }],
        passwordone: [{ required: true, message: '必填', trigger: 'blur' }],
        passwordtwo: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      national_info_list:[]
    }
  },
  created(){
    this.get_national_info()
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
    ...mapActions({add_Routes: 'add_Routes'}),
    async get_national_info(){
      const res = await get_national_info()
      this.national_info_list = res.data;
    },
    register(formName){
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if(this.form.passwordone !== this.form.passwordtwo) {
            this.$message({ message: '两次密码输入不一致！', type: 'error' })
            return false;
          }
          this.loading = true
          const obj = {
            company_name:this.form.company_name,
            phone_number: this.area_codeNum + this.form.phone_number,
            email: this.form.email.trim(),
            password: this.form.passwordone.trim(),
          }
          if(this.form.permission){
            this.$set(obj,'permission',this.form.permission)
          }
          let res = await pmsRegister(obj)
          this.$message({ message: '注册成功', type: 'success',duration:1000 })
          if (res.code !== 200){
            this.loading = false
            return false
          }
          this.loading = false;
          setTimeout(()=>{
            this.$router.push({ path: this.redirect || '/' });
          },1000)
        } else {
          this.$refs[formName].validate();
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
        height: 700px;
        transform: translate(-78%, -50%);
        background: #FFFFFF;
        border-radius: 23px;
        .right_box_wrap{
          display: block;
          height: calc(100% - 65px);
          margin:57px 57px 0px 57px;
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
