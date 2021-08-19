<template>
  <div class="page codeApply">
    <div class="navBar">
      <c-search @init_getList="init_getList"></c-search>
      <NavbarRight></NavbarRight>
    </div>
    <section>
      <c-title>
        <span slot="title" class="title">
           二维码申请
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
               二维码标签列表
            </span>
          </c-title>
          <c-button>
            <span @click="openXM" class="main_button">申请二维码</span>
          </c-button>
        </section>
        <section class="page_content">
          <c-content
              :page.sync="pages.page"
              :pagesize.sync="pages.num"
              :total.sync="pages.total"
              class="gray_page"
              @pagination="pageChange">
            <el-form slot="search" :inline="true" class="search-form" label-width="80px">
              <el-row :span="24" class="downLoad_wrap">
                <el-col :span="21">
                  <el-form-item label="全部列表" class="all_List">
                    <el-select  v-model="form.status"
                                class="select_gray"
                                clearable filterable
                                @change="getList(1)">
                      <el-option v-for="(item,index) in status_list" :key="index"
                                 :value="item.value" :label="item.label" >
                        <p class="select_and"><span class="select_cirl"></span><span>{{item.label}}</span></p>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3" class="downLoad_Box">
                  <img src="../../assets/images/downLoad.png" alt="" @click="downLoad" class="downLoad">
                </el-col>
              </el-row>
              <el-row :span="24" class="flex search_box">
                <el-form-item label="选择日期">
                  <el-date-picker v-model="form.date" type="date"
                                  value-format="yyyy-MM-dd"
                                  format="yyyy-MM-dd"
                                  @change="getList(1)"
                                  placeholder="请选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="选择产品">
                  <el-select  v-model="form.product_id"
                              clearable filterable
                              placeholder="请选择产品"
                              @change="getList(1)">
                    <el-option v-for="item in productList" :key="item.id"
                               :value="item.id" :label="item.product_name" />
                  </el-select>
                </el-form-item>
                <el-form-item label="订单编号">
                  <el-input v-model="form.order_number" placeholder="请输入订单编号" clearable @change="getList(1)" />
                </el-form-item>
                <el-form-item label="产品标签或区块链码" class="search_keyword">
                  <el-input v-model="form.search_keyword" placeholder="请输入产品标签或区块链码" clearable @change="getList(1)" />
                </el-form-item>
              </el-row>
            </el-form>
            <el-table
                slot="table"
                ref="multipleTable"
                width="100%"
                :data="dataList"
                max-height="500"
                :row-key="getId"
                @selection-change="handleSelectionChange"
                class="expand--table">
              <el-table-column type="selection" width="55" />
              <el-table-column align="center" type="index" label="序号"/>
              <el-table-column align="left" prop="order_number" label="订单编号" :show-overflow-tooltip="true"/>
              <el-table-column align="left" prop="product_info.product_number" label="产品编号" :show-overflow-tooltip="true"/>
              <el-table-column align="left" label="码数">
                <template slot-scope="scope">
                  <span class="font_main">{{scope.row.quantity}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" label="标签类型" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                <span v-for = "item in label_type_list" :key="item.value">
                  <span v-if="scope.row.label_type == item.value">
                    {{item.label}}
                  </span>
                </span>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="provenance_node_count" label="节点"/>
              <el-table-column align="left" label="申请日期" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.created_on)|formattime}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" label="用户" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.create_user}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" label="状态" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                <span v-for = "item in apply_status_list" :key="item.value">
                  <span v-if="scope.row.status == item.value" class="text_block">
                    <span class="block" :style="scope.row.status == item.value ?
                    'background:'+item.color:''"></span>
                    {{item.label}}
                  </span>
                </span>
                </template>
              </el-table-column>
              <el-table-column align="left" label="操作" width="250">
                <template slot-scope="scope">
                  <c-button>
                    <span @click="getLabel_tracking(scope.row)" v-if="scope.row.status == 'Confirm'">查看</span>
                    <span  class="info" @click="patchLabel_apply(scope.row,'2')"
                           v-if="scope.row.status == null || scope.row.status == 'In Progress'">撤销</span>
                    <span  class="green" @click="patchLabel_apply(scope.row,'1')" v-if="scope.row.status == 'cancel'">提交</span>
                    <span class="info" @click="openXM(scope.row)"
                          v-if="scope.row.status != null">编辑</span>
                    <span  class="trans" @click="getCheck_label(scope.row)" v-if="scope.row.status == 'Confirm'">检查</span>
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
  getLabel_apply,
  patchLabel_apply,
  getCheck_label,
  getProduct,
  getDownload_label_apply} from '@/api/xapi'
import { label_type_list,apply_status_list } from '@/api/map'
import {mapGetters} from 'vuex'
import {getDay} from "@/plugins/auth";
export default {
  components: {
    CTitle: () => import('@/components/CTitle/index'),
    CContent: () => import('@/components/CContent'),
    CButton: () => import('@/components/CButton'),
    AddEdit:()=> import('./XM/AddEditApply'),
    CSearch: () => import('@/components/CSearch/index'),
    NavbarRight:() => import('@/components/NavbarRight'),
    Expire:()=> import('@/components/expire'),
  },
  computed: {
    ...mapGetters([
      'email'
    ]),
  },
  data() {
    return {
      label_type_list:label_type_list,
      apply_status_list:apply_status_list,
      pages: this.$mpages,
      form: {
        search_keyword:'',
        product_id:'',
        order_number:'',
        date:'',
        status:'',//取值:['All’, 'Confirm’, 'WaitVerify’, ‘WaitSubmit’]
      },
      dataList: [],
      editFlag:false,
      row:{},
      status_list:[
        {
          label:'全部列表',
          value:'All'
        },
        {
          label:'已确认',
          value:'Confirm'
        },
        {
          label:'待审核',
          value:'WaitVerify'
        },
        {
          label:'待提交',
          value:'WaitSubmit'
        }
      ],
      productList:[],
      checked_list:[],
      getday:getDay()
    }
  },
  created() {
    if(this.$route.query.editFlag){
      this.editFlag = this.$route.query.editFlag;
    }
    if(Number(this.getday) >= 0){
      this.$getReset();
      this.getList();
      this.getProduct();
    }
  },
  methods: {
    async downLoad(){
      if(this.checked_list.length!=0){
        let obj={
          label_apply_ids:this.checked_list
        }
        const res = await getDownload_label_apply(obj);
        if(res.code==200){
          this.$message({ message: '操作成功', type: 'success',duration:1000 })
          setTimeout(()=>{
            this.$layer.confirm(
                '<p class="font_main ft18">'+'提 示'+'</p>'+'</br>'+
                '<span class="font_white ft13 line-height15">'+
                '我们会将处理的结果，发送到您的电子邮'+'</br>'+'件地址'+this.email+'</span>',
                {
                  shadeClose:false,
                  btn:['确定','取消'],
                  area: ['347px', '192px'],
                },
                async (index) => {
                  this.$layer.close(index);
                },
            );
          },1000)
        }
      }else{
        this.$message({ message: '请选择数据', type: 'error',duration:2000 })
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // //获取所有选中项的
      this.checked_list = selection.map(item => item.id);
    },
    getId(row){
      return row.id;
    },
    //清空选中数据
    clearChecked(){
      this.$refs.multipleTable.clearSelection();
    },
    async getProduct() {
      let obj={
        page:1,
        num: 100000,
      }
      const {data} = await getProduct(obj);
      this.productList = data;
    },
    init_getList(e){
      this.form.search_name = e;
      this.$getReset();
      this.dataList = [];
      this.getList()
    },
    /* 查询 */
    async getList(page) {
      if(page){
        this.pages.page = 1;
        this.dataList =[]
      }
      const obj = JSON.parse(JSON.stringify(this.form))
      Object.assign(obj, {
        page:this.pages.page,
        num: this.pages.num,
      })
      const {data,count} = await getLabel_apply(obj)
      this.dataList = this.dataList.concat(data);
      this.pages.total= count;
    },
    close(){
      this.editFlag = false;
    },
    //检查
    async getCheck_label(row){
      this.$layer.confirm(
          '<p class="font_main ft18">'+'检 查'+'</p>'+'</br>'+
          '<span class="font_white ft13 line-height15">'+
          '我们会将处理的结果，发送到您的电子邮'+'</br>'+'件地址'+this.email+'</span>',
          {
            shadeClose:false,
            btn:['确定','取消'],
            area: ['347px', '192px'],
          },
          async (index) => {
            let obj={
              id:row.id,
            }
            const res = await getCheck_label(obj)
            if (res.code !== 200){
              return false
            }
            this.dataList=[];
            this.pages.page = 1;
            this.getList();
            this.$message({ message: '操作成功', type: 'success',duration:1000 })
            this.$layer.close(index);
          },
      );
    },
    //+'<img src="../../assets/images/title.png" />'
    //提交撤销
    async patchLabel_apply(row,string){
      if(string == '2'){
        this.$layer.confirm(
            '<p class="font_main ft18">'+'撤 销'+'</p>'+'</br>'+
            '<span class="font_white ft13 margintop15 displayBlock">'+
            '您确定要撤销所选内容吗？'+'</span>',
            {
              shadeClose:false,
              btn:['确定','取消'],
              area: ['347px', '192px'],
            },
            async (index) => {
              this.label_apply(row,string,index)
            },
        );
      }else{
        this.label_apply(row,string)
      }
    },
    async label_apply(row,string,index){
      let obj={
        id:row.id,
        action:string,
      }
      const res = await patchLabel_apply(obj)
      if (res.code !== 200){
        return false
      }
      this.dataList=[];
      this.pages.page = 1;
      this.getList();
      if(index){
        this.$layer.close(index);
      }
      this.$message({ message: '操作成功', type: 'success',duration:1000 })
    },
    openXM(row) {
      this.row = row;
      this.editFlag = true;
      if(sessionStorage.getItem('template_id')){
        sessionStorage.removeItem('template_id')
      }
      if(sessionStorage.getItem('point_rule_id')){
        sessionStorage.removeItem('point_rule_id')
      }
      if(sessionStorage.getItem('turntable_lottery_rule_id')){
        sessionStorage.removeItem('turntable_lottery_rule_id')
      }
      if(sessionStorage.getItem('cash_red_envelope_rule_id')){
        sessionStorage.removeItem('cash_red_envelope_rule_id')
      }
      if(sessionStorage.getItem('form_data')){
        sessionStorage.removeItem('form_data')
      }
    },
    //查看   详情
    getLabel_tracking(row){
      this.$router.push({path:'/detail',query: {
          id:row.id,
        }})
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
.codeApply{
  .page_content{
    padding:48px 30px;
  }
  .addTitle{
    margin-bottom: 20px;
  }
  .text_block{
    display: flex;
    align-items: center;
    .block{
      display: inline-block;
      width:20px;
      height: 20px;
      line-height: 20px;
      border-radius: 4px;
      margin-right:8px;
    }
  }
  .downLoad_wrap{
    display: flex;
    align-items: center;
    .downLoad_Box{
      text-align: right;
      margin-right:35px;
    }
    .downLoad{
      cursor: pointer;
      width:48px;
      height:48px;
      vertical-align: middle;
    }
  }
}
</style>
<style lang="scss">
.codeApply{
  .el-checkbox .el-checkbox__inner{
    border: 2px solid #313131!important;
    border-radius: 4px!important;
  }
  .search-form{
    .el-form-item{
      width: 310px!important;
      margin-right: 18px!important;
    }
    .el-form-item__content{
      width: 100%!important;
    }
    .el-form-item__label{
      margin-right: calc(100% - 80px) !important;
    }
    .el-date-editor{
      width:310px!important;
    }
    .all_List{
      .el-form-item__content{
        width: 355px!important;
      }
      .el-form-item__label{
        margin-right: calc(100% - 80px) !important;
      }
    }
    .search_box{
      flex-wrap: wrap;
      .el-form-item{
        margin-right:35px!important;
      }
      .el-form-item.search_keyword{
        margin-right:0!important;
        .el-form-item__label{
          width:140px!important;
        }
        .el-form-item__label{
          margin-right: calc(100% - 140px) !important;
        }
        .el-form-item__content{
          margin-right: 0px!important;
        }
      }
    }
  }
}

</style>
