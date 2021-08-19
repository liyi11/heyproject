<template>
  <div :class="{'is-active':isActive}"
       class="menu-btn" @click="toggleClick" :style="!isActive ?'padding:0!important;width:100%!important':''">
      <img src="../../assets/images/burger_icon.png" alt="" width="22" height="22">
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
  .menu-btn{
    //position: absolute;
    //top:15px;
    //z-index: 5;
    cursor: pointer;
    width:37px;
    display: inline-block;
    //padding: 0px 15px;
    border:0px!important;
  }
</style>
<style lang="scss">
/deep/.menu-btn{
  border:0px!important;
}
</style>
