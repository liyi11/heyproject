<template>
  <div class="page redEnvOrder order">
    <div class="navBar">
      <c-search @init_getList="init_getList"></c-search>
      <NavbarRight></NavbarRight>
    </div>
    <section  class="title">
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
      <section class="addTitle">
        <c-title>
          <span slot="secTxt" class="secTxt">
             红包订单管理
          </span>
        </c-title>
        <c-button>
          <span class="main_button" @click="jump_dataAnalysis">总数据概览</span>
        </c-button>
      </section>
      <section class="page_content" >
        <c-content
            :page.sync="pages.page"
            :pagesize.sync="pages.num"
            :total.sync="pages.total"
            class="gray_page"
            @pagination="pageChange">
          <div slot="title" class="content_title">
            <c-title>
              <span slot="secTxt" class="secTxt font_main">
                 所有红包规则
              </span>
            </c-title>
            <img src="../../../assets/images/orderIcon1.png" alt="" @click="jump_rule" class="cursor_pointer">
          </div>
          <el-table
              slot="table"
              ref="multipleTable"
              v-loading="tab_loading"
              width="100%"
              :data="dataList"
              max-height="500"
              class="expand--table">
            <el-table-column align="center" type="index" label="序号" width="100px"/>
            <el-table-column align="left" prop="order_number" label="订单编号" :show-overflow-tooltip="true"/>
            <el-table-column align="left" prop="cash_red_envelope_rule_info.rule_name" label="红包规则" :show-overflow-tooltip="true" />
            <el-table-column align="left" label="总金额（元）">
              <template slot-scope="scope">
                <p>￥{{scope.row.cash_red_envelope_rule_info.amount}}</p>
              </template>
            </el-table-column>
            <el-table-column align="left" label="已使用（元）">
              <template slot-scope="scope">
                <p>￥{{scope.row.cash_red_envelope_rule_info.amount_used}}</p>
              </template>
            </el-table-column>
            <el-table-column align="left" label="开始日期" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{new Date(scope.row.cash_red_envelope_rule_info.start_time)|formattime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="截止日期" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{new Date(scope.row.cash_red_envelope_rule_info.end_time)|formattime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="操作" width="100">
              <template slot-scope="scope">
                <c-button>
                  <span @click="openXM(scope.row)">明细</span>
                </c-button>
              </template>
            </el-table-column>
          </el-table>
        </c-content>
      </section>
    </section>
  </div>
</template>

<script>
import { getCashRedList } from '@/api/xapi'
import RedEnvelopelog from "./XM/redEnvelopelog";
import {getDay} from "@/plugins/auth";

export default {
  components: {
    CTitle: () => import('@/components/CTitle/index'),
    CContent: () => import('@/components/CContent'),
    CButton: () => import('@/components/CButton'),
    CSearch: () => import('@/components/CSearch/index'),
    NavbarRight:() => import('@/components/NavbarRight'),
    Expire:()=> import('@/components/expire'),
  },
  data() {
    return {
      tab_loading: false,
      pages: this.$mpages,
      form: {
        search_name:'',
      },
      dataList: [],
      checked_list:[],
      getday:getDay()
    }
  },
  created() {
    if(Number(this.getday) >= 0){
      this.$getReset();
      this.getList();
    }
  },
  methods: {
    jump_dataAnalysis(){
      this.$router.push('/redEnvelopesManage/dataAnalysis')
    },
    jump_rule(){
      this.$router.push('/redEnvelopesManage/rule')
    },
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
      const {data,count} = await getCashRedList(obj)
      this.dataList = this.dataList.concat(data);
      this.pages.total= count;
    },
    openXM(row) {
      this.$layer.iframe({
        shadeClose:false,
        content: {
          content: RedEnvelopelog,
          parent: this,
          data: {
            row:row
          },
        },
        maxmin: true,
        area: ['633px', '572px'],
      })
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
.redEnvOrder{
  .addTitle{
    margin-bottom: 20px;
  }
}
</style>
