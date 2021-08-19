<template>
  <div class="page product">
    <div class="navBar">
      <c-search @init_getList="init_getList"></c-search>
      <NavbarRight></NavbarRight>
    </div>
    <section>
      <c-title>
        <span slot="title">
           产品管理
        </span>
      </c-title>
    </section>
    <section class="page_body" v-if="getday<0">
      <Expire></Expire>
    </section>
    <section class="page_body" v-else>
      <section v-if="!editFlag" class="page_content">
        <section class="addBtn">
          <c-button>
            <span @click="openXM" class="main_button_gray">添加产品</span>
          </c-button>
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
            <el-table-column align="center" type="index" label="序号" width="90px"/>
            <el-table-column align="left" label="品牌&产品图"  min-width="250px">
              <template slot-scope="scope">
                <div class="flex" >
                  <viewer :images="[scope.row.product_image_info[0].product_image]" v-if="scope.row.product_image_info.length>0">
                    <img :src="scope.row.product_image_info[0].product_image" class="img-viewer96">
                  </viewer>
                  <div style="margin-left: 31px;">
                    <p class="font_white ft14">{{scope.row.brand_info.build_brand}}</p>
                    <p class="font_gray ft14 fw400">ENA13:{{scope.row.ena_13}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="product_name" label="产品名称" :show-overflow-tooltip="true"/>
            <el-table-column align="left" label="产品编号" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.product_number}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="规格" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span class="font_main">{{scope.row.product_specification_num}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="操作" width="345">
              <template slot-scope="scope">
                <c-button>
                  <span @click="openXM(scope.row)" class="green">编辑</span>
                  <span @click="handleDel(scope.row)" class="info" style="margin-right: 34px">删除</span>
                  <span @click="jumpCode(scope.row)" class="main_button">二维码申请</span>
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
import { getProduct, deleteProduct} from '@/api/xapi'
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
      console.log(e)
      this.form.search_name = e;
      this.$getReset();
      this.dataList = [];
      this.getList()
    },
    jumpCode(){
      this.$router.push({path:'/codeManage/codeApply',query: {
          editFlag:true,
          backFlag:true
        }})
    },
    /* 查询 */
    async getList() {
      const obj = JSON.parse(JSON.stringify(this.form))
      Object.assign(obj, {
        page:this.pages.page,
        num: this.pages.num,
      })
      const {data,count} = await getProduct(obj)
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
          '您确定要删除此产品？' +'</br>'+
          '删除后信息不可找回！'+'</span>',
          {
            shadeClose:false,
            btn:['确定','取消'],
            area: ['347px', '192px'],
          },
          async (index) => {
            const { code } = await deleteProduct({ id: row.id })
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

<style lang="scss">
   .product{
     .el-table {
       .el-table__row{
         height:128px!important;
         line-height: 128px!important;
       }
       td:last-child{
         .cell{
           padding-right:0px!important;
         }
       }
     }
   }
</style>
