<template>
  <div class="page codeOrder">
    <div class="navBar">
      <c-search @init_getList="init_getList"></c-search>
      <NavbarRight></NavbarRight>
    </div>
    <section>
      <c-title>
        <span slot="title"  class="title">
           二维码订单
        </span>
      </c-title>
    </section>
    <section class="page_body" v-if="getday<0">
      <Expire></Expire>
    </section>
    <section class="page_body" v-else>
      <section>
        <section class="addTitle">
          <c-title>
            <span slot="secTxt" class="secTxt">
               二维码订单列表
            </span>
          </c-title>
          <c-button>
            <span @click="openXM" class="main_button">购买二维码</span>
          </c-button>
        </section>
        <c-content
            :page.sync="pages.page"
            :pagesize.sync="pages.num"
            :total.sync="pages.total"
            @pagination="pageChange">
          <el-table
              slot="table"
              ref="multipleTable"
              width="100%"
              :data="dataList"
              max-height="500"
              class="expand--table">
            <el-table-column align="center" type="index" label="序号" width="90px"/>
            <el-table-column align="left" label="订单日期" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{new Date(scope.row.created_on)|formattime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="order_no" label="订单编号" :show-overflow-tooltip="true"/>
            <el-table-column align="left" label="二维码类型" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-for = "item in label_type_list" :key="item.value">
                  <span v-if="scope.row.label_type == item.value">
                    {{item.label}}
                  </span>
                </span>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="purchase_quantity" label="二维码数量（张）" :show-overflow-tooltip="true"/>
            <el-table-column align="left" prop="manufacturer_email" label="操作人" :show-overflow-tooltip="true"/>
            <el-table-column align="left" prop="" label="" :show-overflow-tooltip="true"/>
            <el-table-column align="left" label="订单状态" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span class="">{{scope.row.payment_status == true || scope.row.payment_status == 'true'?'已到账':'未到账'}}</span>
              </template>
            </el-table-column>
          </el-table>
        </c-content>
        <section class="addBtn">
          <img src="../../assets/images/code/infoIcon2.png" alt="" @click="concatCode" class="cursor_pointer">
        </section>
      </section>
    </section>
    <el-dialog title="" :visible.sync="dialogFormVisible"
               width="298px" height="409px"
               :close-on-click-modal="false">
      <ConcatCode  @close="closeConcatCode"></ConcatCode>
    </el-dialog>
    <el-dialog title="" :visible.sync="dialogFormVisibleAdd"
               width="435px" height="280px"
               :close-on-click-modal="false">
      <AddEdit  @close="closeAddEdit" :row="row" @initSaves="initSaves"></AddEdit>
    </el-dialog>
  </div>
</template>

<script>
import { getLabel_purchase } from '@/api/xapi'
import { label_type_list } from '@/api/map'
import AddEdit from "./XM/AddEdit";
import ConcatCode from "./XM/concatCode";
import {getDay} from "@/plugins/auth";
export default {
  components: {
    CTitle: () => import('@/components/CTitle/index'),
    CContent: () => import('@/components/CContent'),
    CButton: () => import('@/components/CButton'),
    CSearch: () => import('@/components/CSearch/index'),
    NavbarRight:() => import('@/components/NavbarRight'),
    Expire:()=> import('@/components/expire'),
    ConcatCode,
    AddEdit
  },
  computed: {
  },
  data() {
    return {
      label_type_list:label_type_list,
      pages: this.$mpages,
      form: {
        search_name:'',
      },
      dataList: [],
      row:{},
      getday:getDay(),
      dialogFormVisible:false,
      dialogFormVisibleAdd:false
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
    initSaves(){
      this.editFlag = !this.editFlag;
      setTimeout(()=>{
        this.dataList=[];
        this.pages.page = 1;
        this.getList()
      },1000)
    },
    closeConcatCode(){
      this.dialogFormVisible = false;
    },
    concatCode(){
      this.dialogFormVisible = true;
    },
    openXM(){
      this.dialogFormVisibleAdd = true;
    },
    closeAddEdit(){
      this.dialogFormVisibleAdd = false
    },
    /* 查询 */
    async getList() {
      const obj = JSON.parse(JSON.stringify(this.form))
      Object.assign(obj, {
        page:this.pages.page,
        num: this.pages.num,
      })
      const {data,count} = await getLabel_purchase(obj)
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
<style lang="scss">
.codeOrder{
  .el-dialog{
    border-radius: 24px!important;
    background: #000!important;
  }
}
</style>

