<template>
  <div class="page userRole">
    <div class="userRole_box">
      <div class="navBar">
        <c-search @init_getList="init_getList"></c-search>
        <NavbarRight></NavbarRight>
      </div>

       <section>
        <c-title>
        <span slot="title" class="title">
           代理商管理
        </span>
        </c-title>
      </section>

      
      <div class="maskActive page_body" v-if="maskActive">
        <p class="font_white ft36 tc line-height15">抱歉，您没有该模块权限，</br>若需开通，请联系Hyebird客服</p>
      </div>
      <section class="page_body" v-else>
        <Details v-if="editFlag" :editdata='editdata'></Details>
        <section v-if="!editFlag">
          <section class="addTitle">
            <c-title></c-title>
            <c-button>
              <span class="main_button" @click="go()">新增</span>
            </c-button>
          </section>
          <c-content
              :page.sync="pages.page"
              :pagesize.sync="pages.num"
              :total.sync="pages.total">
           <el-table
                slot="table"
                ref="multipleTable"
                width="100%"
                :data="tableData"
                max-height="500"
                class="expand--table active-row">
              <el-table-column align="center" prop="name" label="代理商名称" width="120"/>
              <el-table-column align="center" prop="number" label="编号" width="120" />
              <el-table-column align="center" prop="phone_number" label="手机号" width="120"/>
              <el-table-column align="center" prop="update_email" label="修改人" width="180"/>
              <el-table-column align="center" prop="modified_on" label="修改时间" />
              <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                  <c-button>
                    <span @click="go(scope.row)" class="edit">编辑</span>
                    <span @click="handleDel(scope.row)" class="info">删除</span>
                  </c-button>
                </template>
              </el-table-column>
            </el-table>

          </c-content>
        </section>
        <section v-else>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import {
  get_saleagent,
  delete_saleagent
} from "@/api/xapi";
export default {
  components: {
    CTitle: () => import("@/components/CTitle/index"),
    CContent: () => import("@/components/CContent"),
    CButton: () => import("@/components/CButton"),
    CSearch: () => import("@/components/CSearch/index"),
    NavbarRight: () => import("@/components/NavbarRight"),
    Details:()=> import('./XM/details'),
  },
  data() {
    return {
      pages: this.$mpages,
      tableData:[],
      editFlag:false,
      editdata:'',
      maskActive:false,
    };
  },
  created(){
    this.get_saleagent()
  },

  methods: {
    // 修改页面
    go(res){
      if(res){
        this.editdata = res
      }else{
        this.editdata = ''
      }
      this.editFlag=!this.editFlag
    },
    async get_saleagent(){
        let obj = {
          page : 1,
          num : 1000
        };
        const res = await get_saleagent(obj);
        this.tableData = res.data
        console.log(res)
    },
    init_getList(e) {
      this.form.search_name = e;
      this.$getReset();
      this.dataList = [];
      this.getList();
    },
    async handleDel(res){
      var obj= {
        id:res.id
      }
      var data = await delete_saleagent(obj);
      if (data.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.get_saleagent()
      } else {
        this.$message({
          message: "请稍后重试",
        });
      }
    }
  },
};
</script>

<style>
</style>