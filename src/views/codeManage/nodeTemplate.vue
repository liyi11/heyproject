<template>
  <div class="page nodeTemplate">
    <div class="navBar">
      <c-search @init_getList="init_getList"></c-search>
      <NavbarRight></NavbarRight>
    </div>
    <section>
      <c-title>
        <span slot="title"  class="title">
           节点模板
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
               节点模板
            </span>
          </c-title>
          <c-button>
            <span @click="openXM" class="main_button">添加模板</span>
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
            <el-table-column align="left" prop="name" label="模板名称" :show-overflow-tooltip="true"/>
            <el-table-column align="left" prop="desc" label="描述" :show-overflow-tooltip="true"/>
            <el-table-column align="left" label="操作" width="200">
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
      <section v-else>
        <AddEdit ref="AddEdit" :row="row" @close="close"></AddEdit>
      </section>
    </section>
  </div>
</template>

<script>
import { getLabel_node_template,deleteLabel_node_template } from '@/api/xapi'
import {getDay} from "@/plugins/auth";

export default {
  components: {
    CTitle: () => import('@/components/CTitle/index'),
    CContent: () => import('@/components/CContent'),
    CButton: () => import('@/components/CButton'),
    AddEdit:()=> import('./XM/AddEditNodeTemplate'),
    CSearch: () => import('@/components/CSearch/index'),
    NavbarRight:() => import('@/components/NavbarRight'),
    Expire:()=> import('@/components/expire'),
  },
  computed: {
  },
  data() {
    return {
      pages: this.$mpages,
      form: {
        search_name:'',
      },
      dataList: [],
      editFlag:false,
      row:{},
      backFlag:false,
      getday:getDay()
    }
  },
  created() {
    if(this.$route.query.editFlag){
      this.editFlag = this.$route.query.editFlag;
    }
    if(this.$route.query.backFlag){
      this.backFlag = this.$route.query.backFlag;
    }
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
      Object.assign(obj, {
        page:this.pages.page,
        num: this.pages.num,
      })
      const {data,count} = await getLabel_node_template(obj)
      this.dataList = this.dataList.concat(data);
      this.pages.total= count;
    },
    close(){
      if(this.backFlag){
        // this.$router.back();
        this.$router.push({path:'/codeManage/codeApply',query: {
            editFlag:true,
          }})
      }
      this.editFlag = false;
    },
    openXM(row) {
      this.row = row;
      this.editFlag = true;
    },
    //删除
    handleDel(row){
      this.$layer.confirm(
          '<p class="font_main ft18">'+'删 除'+'</p>'+'</br>'+
          '<span class="font_white ft13 line-height15">'+
          '您确定要删除此节点模板？' +'</br>'+
          '删除后信息不可找回！'+'</span>',
          {
            shadeClose:false,
            btn:['确定','取消'],
            area: ['347px', '192px'],
          },
          async (index) => {
            const { code } = await deleteLabel_node_template({ id: row.id })
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
.nodeTemplate{
  .page_body{
    .addTitle{
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
}
</style>
