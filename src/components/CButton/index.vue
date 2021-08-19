<template>
  <div class="c-button">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.c-button {
  span:not(:last-child){
    margin-right:13px;
  }
  span {
        font-size: 14px;
        color: #0D0E0F;
        background: #FFBD2F;
        outline: none;
        cursor: pointer;
        -webkit-transition: color .3s ease;
        transition: color .3s ease;
        display: inline-block;
        line-height: 1!important;
        text-align: center;
        padding: 5px 16px;
        border-radius: 4px;
        margin-bottom:5px;
        &:hover{
          opacity: 0.9;
        }
        &.disabled {
          color: #C8C9CC;
          cursor: not-allowed;
        }
        &.info{
          background:#6B6B6B ;
          color:#fff;
        }
        &.trans{
          background:#1D1D1F ;
          color:#fff;
        }
        &.main_button{
          font-size: 16px;
          padding: 16px 24px;
          border-radius: 12px;
        }
        &.main_button_gray{
          font-size: 16px;
          padding: 16px 24px;
          border-radius: 12px;
          background: #ccc;
        }
        &.saves{
          padding: 15px 48px;
          font-size: 16px;
          background:#0D0E0F;
          color:#fff;
          border-radius: 12px;
          margin-top:50px
        }
        &.close{
          padding: 15px 48px;
          font-size: 16px;
          border-radius: 12px;
          background:#6B6B6B;
          color:#fff;
        }
        &.green{
          background:#32D74B;
        }
    }
    /deep/ .el-checkbox__label {
        color: #38adff;
        -webkit-transition: color .3s ease;
        transition: color .3s ease;
        &:hover{ color:#68c1ff }
    }
}

</style>
