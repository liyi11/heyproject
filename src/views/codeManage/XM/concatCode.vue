<template>
  <section class="xm-content concatCode">
    <section class="tips">
      <p class="ft18">添加您的一对一专属客服</p>
    </section>
    <p class="ft12">长按保存或截图保存</p>
    <div class="imgWrap">
      <img src="https://newbackstages3.s3.cn-northwest-1.amazonaws.com.cn/wechat_image/1.jpg"
           alt="codeImg">
    </div>
    <div class="xm-close gray" @click="close">
      <span>×</span>
    </div>
  </section>
</template>

<script>
export default {
  components:{
  },
  props: {
    layerid: {
      default: 0
    },
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
  .xm-content.concatCode{
    padding:15px;
  }
 .concatCode{
   text-align: center;
   color: #fff;
   .tips{
     margin-top:41px;
     margin-bottom: 11px;
   }
   .imgWrap{
     margin-top:20px;
     height:270px;
     background: #1C1C1E;
     text-align: center;
     vertical-align: middle;
     border-radius: 16px;
     img{
       margin:20px;
       width:calc(100% - 40px);
       height:calc(100% - 40px);
       border-radius: 18px;
     }
   }
 }
</style>