<template>
  <section class="right-menu-item">
    <div class="flex">
      <section class="expirationtime" v-show="(this.isactive == 'false'||this.isactive == false ) && getday>=0">
        <p class="flex">
          <img src="@/assets/images/time_icon.png" alt="">
          <span>{{'剩余'+ getday +'天'}}</span>
        </p>
      </section>
      <el-dropdown class="avatar-container hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span style="font-size: 14px;cursor: pointer;margin-right:10px;"><span>{{nickname}}</span></span>
          <img :src="useravatar" class="user-avatar" v-if="useravatar">
          <img src="@/assets/images/icon_avatar.jpg" class="user-avatar" v-else >
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="changePassword">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;color: #F5222D;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Password from "../views/layout/XM/Password";
  import {setDay} from "../plugins/auth";
  export default {
    computed: {
      ...mapGetters([
        'nickname','useravatar','isactive','expirationtime'
      ])
    },
    data() {
      return {
        showDialog:false,
        showSpan:false,
        getday:'',
      }
    },
    created(){
      if(this.isactive == 'false' || this.isactive == false){
        var current_time = Math.ceil(new Date().getTime()/1000);
        var expirationtime =Math.ceil(new Date(this.expirationtime).getTime()/1000) ;
        let second_sub =Number(expirationtime) - Number(current_time);
        let day = parseInt(second_sub/ (24 * 3600)); //剩余天数
        this.getday = day;
        setDay(this.getday);
      }else{
        setDay('1');
      }
    },
    methods: {
      /* 修改密码 */
      changePassword() {
        this.$layer.iframe({
          shadeClose:false,
          content: {
            content: Password,
            parent: this,
            data: { row: {} }
          },
          maxmin: true,
          area: ['500px', '300px'],
          title: '修改密码'
        })
      },
      async logout() {
        this.$store.dispatch('pmsLogout').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
    }
  }
</script>

<style  lang="scss" scoped>
  .right-menu-item {
  height: 100%;
  font-size: 18px;
  vertical-align: text-bottom;
  .expirationtime{
    width:108px;
    border:1px solid #3B3B3B;
    border-radius: 22px;
    text-align: center;
    height:44px;
    margin-right: 67px;
    background: #000000;
    p{
      height: 44px;
      display: flex;
      justify-content: center;
      margin:auto;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      span{
        color:#FFBD2F;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      img{
        margin:auto 5px ;
      }
    }
  }
  .avatar-container {
    .avatar-wrapper {
      position: relative;
      min-width:106px;
      color: #fff;
      .user-avatar {
        width: 34px;
        height: 34px;
        border:1px solid #313131;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .avatar-wrapper:hover {
      cursor: pointer;
    }
  }
}
</style>

