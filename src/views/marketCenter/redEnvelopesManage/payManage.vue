<template>
  <div class="page payManage">
    <div class="navBar">
      <c-search @init_getList="init_getList"></c-search>
      <NavbarRight></NavbarRight>
    </div>
    <section class="title">
      <c-title>
        <span slot="title">
           红包管理
        </span>
      </c-title>
    </section>
    <section class="page_body" v-if="getday<0">
      <Expire></Expire>
    </section>
    <section class="page_body" v-else>
      <section v-if="!editFlag">
        <section class="addTitle">
          <c-title>
            <span slot="secTxt" class="secTxt">
               支付管理
            </span>
          </c-title>
          <c-button>
            <span @click="openXM" class="main_button">添加账户</span>
          </c-button>
        </section>
        <section class="page_content">
          <section class="help_center">
            <span>帮助中心</span>
            <img src="../../../assets/images/info.png" alt="">
          </section>
          <c-content
              :page.sync="pages.page"
              :pagesize.sync="pages.num"
              :total.sync="pages.total"
              class="gray_page"
              @pagination="pageChange">
            <el-table
                slot="table"
                ref="multipleTable"
                width="100%"
                :data="dataList"
                max-height="500"
                class="expand--table">
              <el-table-column align="center" type="index" label="序号" width="100px"/>
              <el-table-column align="left" prop="pid" label="商户号" :show-overflow-tooltip="true"/>
              <el-table-column align="left" prop="app_id" label="微信公众号App ID" :show-overflow-tooltip="true"/>
              <el-table-column align="left" prop="sub_app_id" label="小程序App ID" :show-overflow-tooltip="true"/>
              <el-table-column align="left" label="创建日期" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.created_on)|formattime}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="create_user" label="操作人" :show-overflow-tooltip="true"/>
              <el-table-column align="left" label="操作" width="180">
                <template slot-scope="scope">
                  <c-button>
                    <span @click="openXM(scope.row)">编辑</span>
                    <span @click="handleDel(scope.row)" class="info">删除</span>
                  </c-button>
                </template>
              </el-table-column>
            </el-table>
          </c-content>
        </section>
      </section>
      <section v-else>
        <AddEdit ref="AddEdit" :row="row" @close="close"></AddEdit>
      </section>
    </section>
  </div>
</template>

<script>
import { getPayment,deletePayment } from '@/api/xapi'
import {getDay} from "@/plugins/auth";
export default {
  components: {
    CTitle: () => import('@/components/CTitle/index'),
    CContent: () => import('@/components/CContent'),
    CButton: () => import('@/components/CButton'),
    AddEdit:()=> import('./XM/AddEditPay'),
    CSearch: () => import('@/components/CSearch/index'),
    NavbarRight:() => import('@/components/NavbarRight'),
    Expire:()=> import('@/components/expire'),
  },
  data() {
    return {
      getday:getDay(),
      pages: this.$mpages,
      form: {},
      dataList: [],
      editFlag:false,
      row:{}
    }
  },
  created() {
    this.$getReset()
    this.getList()
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
      Object.assign(obj, {
        page:this.pages.page,
        num: this.pages.num,
      })
      const {data,count} = await getPayment(obj)
      this.dataList = this.dataList.concat(data);
      this.pages.total= count;
    },
    openXM(row) {
      this.row = row;
      this.editFlag = true;
    },
    close(){
      this.editFlag = false;
    },
    //删除
    handleDel(row){
      this.$layer.confirm(
          '<p class="font_main ft18">'+'删 除'+'</p>'+'</br>'+
          '<span class="font_white ft13 line-height15">'+
          '删除后，红包功能无法实现，请您确认是否删除'+'</span>',
          {
            shadeClose:false,
            btn:['确定','取消'],
            area: ['325px', '166px'],
          },
          async (index) => {
            const { code } = await deletePayment({ id: row.id })
            if (code === 200) {
              this.$message({ message: '删除成功', type: 'success' });
              this.pages.page = 1;
              this.dataList = [];
              this.$layer.close(index);
              this.getList()
            }
          },
      );
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

<style lang="scss" scoped>
  .payManage{
    .page_content{
      padding:50px;
    }
    .help_center{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height:30px;
      line-height: 30px;
      margin-bottom: 5px;
      span{
        font-family: PingFang HK;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        color: #CCCCCC;
      }
      img{
        width:24px;
        height:24px;
        margin-left: 10px;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
</style>
