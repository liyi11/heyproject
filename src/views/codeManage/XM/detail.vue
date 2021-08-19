<template>
  <div class="page codeDetail">
    <div class="navBar">
      <c-search @init_getList="init_getList"></c-search>
      <NavbarRight></NavbarRight>
    </div>
    <section>
      <c-title>
        <span slot="title" class="title">
           二维码订单
        </span>
      </c-title>
    </section>
    <section class="page_body">
      <section>
        <section class="addTitle">
          <c-title>
          <span slot="secTxt" class="secTxt">
             订单详情
          </span>
          </c-title>
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
            <el-table-column align="center" type="index" label="序号" width="60px"/>
            <el-table-column align="left" label="订单日期">
              <template slot-scope="scope">
                <span>{{new Date(scope.row.created_on)|formattime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="product_info.product_number" label="产品编号" :show-overflow-tooltip="true"/>
            <el-table-column align="left" prop="product_info.product_name" label="产品名称" :show-overflow-tooltip="true"/>
            <el-table-column align="left" prop="blockchain_code" label="区块链码"  :min-width="160"/>
            <el-table-column align="left" prop="label" label="标签码" :min-width="160"/>
            <el-table-column align="left" label="溯源节点" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span class="font_main cursor_pointer" @click="getNodeDetail(scope.row)">{{scope.row.label_node_count}}</span>
              </template>
            </el-table-column>
          </el-table>
        </c-content>
      </section>
    </section>
  </div>
</template>

<script>
import { getLabel_tracking } from '@/api/xapi'
import NodeList from "./getNodeList";

export default {
  components: {
    CTitle: () => import('@/components/CTitle/index'),
    CContent: () => import('@/components/CContent'),
    CSearch: () => import('@/components/CSearch/index'),
    NavbarRight:() => import('@/components/NavbarRight'),
  },
  computed: {
  },
  data() {
    return {
      pages: this.$mpages,
      dataList: [],
      label_apply_id:''
    }
  },
  created() {
    this.$getReset();
    if(this.$route.query.id){
      this.label_apply_id = Number(this.$route.query.id)
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
    //溯源节点信息列表
    async getNodeDetail(row){
      this.$layer.iframe({
        shadeClose:false,
        content: {
          content: NodeList,
          parent: this,
          data: {
            row:row
          },
        },
        maxmin: true,
        area: ['467px', '287px'],
      })
    },
    /* 查询 */
    async getList() {
      const obj = {}
      Object.assign(obj, {
        label_apply_id:this.label_apply_id,
        page:this.pages.page,
        num: this.pages.num,
      })
      const {data,count} = await getLabel_tracking(obj)
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

</style>
