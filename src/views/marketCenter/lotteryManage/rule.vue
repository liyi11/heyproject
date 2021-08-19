<template>
  <div class="page rule">
    <div class="navBar">
      <c-search @init_getList="init_getList"></c-search>
      <NavbarRight></NavbarRight>
    </div>
    <section class="title">
      <c-title>
        <span slot="title">
           抽奖管理
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
               抽奖规则
            </span>
          </c-title>
          <c-button>
            <span @click="openXM" class="main_button">创建规则</span>
          </c-button>
        </section>
        <section class="page_content">
          <c-content
              :page.sync="pages.page"
              :pagesize.sync="pages.num"
              :total.sync="pages.total"
              class="gray_page"
              @pagination="pageChange">
            <el-table
                slot="table"
                ref="multipleTable"
                v-loading="tab_loading"
                width="100%"
                :data="dataList"
                max-height="500"
                class="expand--table">
              <el-table-column align="center" type="index" label="序号" width="100px"/>
              <el-table-column align="left" label="规则名称" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <p class="font_main">{{scope.row.rule_name}}</p>
                </template>
              </el-table-column>
              <el-table-column align="left" label="开始日期" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.start_time)|formattime1}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" label="结束日期" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.end_time)|formattime1}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="total_num" label="数量" :show-overflow-tooltip="true"/>
              <el-table-column align="left" prop="username" label="修改人" :show-overflow-tooltip="true"/>
              <el-table-column align="left" label="修改日期" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.modified_on)|formattime1}}</span>
                </template>
              </el-table-column>
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
      </section>
      <section v-else>
        <AddEdit ref="AddEdit" :row="row" @close="close"></AddEdit>
      </section>
    </section>
  </div>
</template>

<script>
import {
  getCodeAwordRule,
  deleteCodeAwordRule } from '@/api/xapi'
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
      tab_loading: false,
      pages: this.$mpages,
      form: {
        search_name:'',
      },
      dataList: [],
      editFlag:false,
      backFlag:false,
      row:{},
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
      this.getList();
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
      const {data,count} = await getCodeAwordRule(obj)
      this.dataList = this.dataList.concat(data);
      this.pages.total= count;
    },
    openXM(row) {
      this.row = row;
      this.editFlag = true;
    },
    close(){
      if(this.backFlag){
        this.$router.push({path:'/codeManage/codeApply',query: {
            editFlag:true,
          }})
      }
      this.editFlag = false;
    },
    //删除
    handleDel(row){
      this.$layer.confirm(
          '<p class="font_main ft18">'+'删 除'+'</p>'+'</br>'+
          '<span class="font_white ft13 line-height15">'+
          '您确定要删除此抽奖规则？' +'</br>'+
          '删除后信息不可找回！'+'</span>',
          {
            shadeClose:false,
            btn:['确定','取消'],
            area: ['347px', '192px'],
          },
          async (index) => {
            const { code } = await deleteCodeAwordRule({ id: row.id })
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
.rule{
  .addTitle{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .page_body{
    padding:30px 30px 45px 30px;
  }
}
</style>
<style lang="scss">
.rule{
  .c-button span.saves{
    margin-top:30px!important;
  }
}
</style>
