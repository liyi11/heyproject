<template>
  <p class="p-tip">
    <slot v-text="txt" name="title" />
    <slot v-text="secTxt" name="secTxt"  class="secTxt"/>
    <slot v-text="desc" name="desc"  class="desc"/>
  </p>
</template>

<script>
export default {
  props: {
    txt: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    secTxt:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.p-tip {
    height: 31px;
    line-height: 31px;
    font-size: 20px;
    color: #fff;
    font-family: PingFang HK;
    position: relative;
    //&::before {
    //    content: '';
    //    position: absolute;
    //    left: 0;
    //    top: 50%;
    //    width: 4px;
    //    height: 24px;
    //    transform: translateY(-50%);
    //    background-color: $btnPrimary;
    //}
    b {
      position: absolute;
      cursor: pointer;
      top: 0;
      right: 0;
      color: #409EFF;
    }
    .desc{
      margin-left: 20px;
      font-weight: 500;
      font-size: 12px;
    }
    .secTxt{
      margin:0px!important;
      font-size: 18px;
    }
}
</style>
