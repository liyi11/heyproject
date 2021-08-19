<template>
  <div class="page user">
<!--    <div class="navBar navBarRight">-->
    <div class="navBar">
       <c-search @init_getList="init_getList"></c-search>
      <NavbarRight></NavbarRight>
    </div>
    <section class="marginBottom20">
      <c-title>
        <span slot="title"  class="title">
           公司信息
        </span>
      </c-title>
    </section>
    <section class="page_body">
      <section v-if="getday<0">
        <Expire></Expire>
      </section>
      <section v-else>
        <AddEdit ref="AddEdit" ></AddEdit>
      </section>
    </section>
  </div>
</template>

<script>
import { getManufacturer } from '@/api/xapi'
import {getDay} from "@/plugins/auth";
export default {
  components: {
    CTitle: () => import('@/components/CTitle/index'),
    CContent: () => import('@/components/CContent'),
    CButton: () => import('@/components/CButton'),
    AddEdit:()=> import('./XM/AddEdit'),
    CSearch: () => import('@/components/CSearch/index'),
    NavbarRight:() => import('@/components/NavbarRight'),
    Expire:()=> import('@/components/expire'),
  },
  data() {
    return {
      pages: this.$mpages,
      form: {
      },
      dataList: [],
      editFlag:false,
      getday:getDay()
    }
  },
  created() {
    if(Number(this.getday) >= 0){
      this.$getReset();
      this.getList()
    }
  },
  methods: {
    init_getList(e){
      this.form.search_name = e;
      this.$getReset();
      this.dataList = [];
      this.getList()
    },
    /* 查询 */
    async getList() {
      const obj = JSON.parse(JSON.stringify(this.form))
      const {data,count} = await getManufacturer(obj)
      this.dataList = this.dataList.concat(data);
      this.pages.total= count;
    },
    // 页码改变
    pageChange(param) {
      if(Math.ceil(Number(this.pages.total)/Number(this.pages.num)) > Number(this.pages.page)){
        this.pages.page = ++param.val
        this.getList()
      }else{
        this.$message({ message: '没有更多数据', type: 'success',duration:1000 })
      }
    },
  }
}
</script>

<style>

</style>
