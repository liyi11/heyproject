<template>
  <div class="c-content">
    <!-- 查询 -->
    <slot name="title" />
    <slot name="search" />
    <!-- 表格 -->
    <slot name="table" />
    <div v-if="pagination">
         <p class="look_more" @click="handleCurrentChange(currentPage)" v-if="total>0">
           <span>
             查看更多
           </span>
         </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Boolean,
      default: true
    },
    page: {
      type: Number,
      default: 1
    },
    num: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 1
    },
  },
  computed: {
    /* 切换页码 */ 
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    /* 切换条数 */ 
    pageSize: {
      get() {
        return this.pagesize
      },
      set(val) {
        this.$emit('update:pagesize', val)
      }
    }
  },
  methods: {
    /* 条数改变触发 */ 
    handleSizeChange(val) {
      this.$emit('pagination', { type: 'sizes', val })
    },
    /* 页码改变触发 */ 
    handleCurrentChange(val) {
      this.$emit('pagination', { type: 'index', val })
    },
  }
}
</script>

<style lang="scss" scoped>
.c-content.table-scroll {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-table {
    flex: 1;
    overflow: auto;
  }

}
.look_more{
  margin:63px auto auto auto;
  width:160px;
  height: 54px;
  line-height: 54px;
  border-radius: 12px;
  text-align: center;
  font-size: 16px;
  color:#fff;
  background: #0D0E0F;
}
.look_more:hover{
  cursor: pointer;
  opacity: 0.9;
}
.gray_page{
  .look_more{
    background: #1B1D21!important;
  }
}
.fixedBot{
  .look_more{
    position: fixed;
    bottom:37px;
    left:32%;
  }
}
</style>

