<template>
  <section class="expire_box">
    <div>
      <p>对不起，体验已到期 </p>
      <p>继续使用，请联系Hyebird客服购买正式版</p>
      <p>Hyebird客服热线电话021-5990 3566</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created(){

  },
  methods: {

  }
}
</script>

<style  lang="scss" scoped>
.expire_box{
  height: 600px;
  font-family: PingFang HK;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  text-align: center;
  color: #FFFFFF;
  p:nth-child(1){
    padding-top:200px;
  }
  p:nth-child(3){
    margin-top:10px;
    font-family: PingFang HK;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
  }
}
</style>

