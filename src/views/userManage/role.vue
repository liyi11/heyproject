<template>
  <div class="page userRole">
    <div class="userRole_box" >
      <div class="navBar">
        <c-search @init_getList="init_getList"></c-search>
        <NavbarRight></NavbarRight>
      </div>
      <section>
        <c-title>
        <span slot="title" class="title">
           用户组管理
        </span>
        </c-title>
      </section>
      <div class="maskActive page_body" v-if="maskActive">
        <p class="font_white ft36 tc line-height15">抱歉，您没有该模块权限，</br>若需开通，请联系Hyebird客服</p>
      </div>
      <section class="page_body" v-else>
        <section v-if="!editFlag">
          <section class="addTitle">
            <c-title>
            <span slot="secTxt" class="secTxt">
               用户组列表
            </span>
            </c-title>
            <c-button>
              <span @click="openXM" class="main_button">添加用户组</span>
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
                class="expand--table active-row">
              <el-table-column align="center" type="index" label="序号" width="120"/>
              <el-table-column align="left" prop="role_name" label="用户组名称" :show-overflow-tooltip="true"/>
              <el-table-column align="left" label="操作" width="200">
                <template slot-scope="scope">
                  <c-button>
                    <span @click="openXM(scope.row)" class="edit">编辑</span>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserRole,deleteUserRole } from '@/api/xapi'
export default {
  components: {
    CTitle: () => import('@/components/CTitle/index'),
    CContent: () => import('@/components/CContent'),
    CButton: () => import('@/components/CButton'),
    AddEdit:()=> import('./XM/AddEditRole'),
    CSearch: () => import('@/components/CSearch/index'),
    NavbarRight:() => import('@/components/NavbarRight'),
  },
  computed: {
    ...mapGetters([
      'isactive',
    ])
  },
  data() {
    return {
      tab_loading: false,
      pages: this.$mpages,
      form: {
        search_name:'',
      },
      dataList: [],
      row:{},
      editFlag:false,
      maskActive:false
    }
  },
  created() {
    if(this.isactive == true || this.isactive == 'true'||this.isactive == 'True'){
      this.$getReset();
      this.getList()
    }else{
      this.maskActive = true;
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
      const {data,count} = await getUserRole(obj)
      this.dataList = this.dataList.concat(data);
      this.pages.total= count;
    },
    close(){
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
          '您确定要删除此用户组信息资料？' +'</br>'+
          '删除后信息不可找回！'+'</span>',
          {
            shadeClose:false,
            btn:['确定','取消'],
            area: ['347px', '192px'],
          },
          async (index) => {
            const { code } = await deleteUserRole({ id: String(row.id) })
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
.userRole{
  position: relative;
  .maskActive{
    text-align: center;
    min-height:600px;
    p{
      padding-top:200px;
    }
  }
}
</style>
