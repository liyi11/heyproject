<template>
  <div class="c-search">
    <el-form slot="search" :inline="true" class="search-form" @submit.native.prevent>
      <el-form-item size="large" class="search_name_box">
        <el-input placeholder="搜索" v-model="keyword"
                  clearable @keyup.native="init_getList('keyword',99999,0)"/>
        <i class="el-icon-search search_icon cursor_pointer" @click="init_getList()"></i>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getDay} from "@/plugins/auth";

export default {
  data() {
    return {
      keyword:'',
      getday:getDay()
    }
  },
  methods: {
    init_getList(){
      if(Number(this.getday) >= 0){
        this.$emit('init_getList',this.keyword)
      }else{
        // console.log('过期')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
