<template>
  <div class="page drawRecord">
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
               中奖记录
            </span>
          </c-title>
        </section>
        <section class="page_content">
          <c-content
              :page.sync="pages.page"
              :pagesize.sync="pages.num"
              :total.sync="pages.total"
              class="gray_page"
              @pagination="pageChange">
            <el-form slot="search" :inline="true" class="search-form">
              <el-form-item>
                <el-select  v-model="form.status"
                            clearable filterable
                            popper-class="select_gray"
                            placeholder="请选择状态"
                            @change="getList(1)">
                  <el-option v-for="item in status_list" :key="item.value"
                             :value="item.value" :label="item.label" >
                    <p class="select_and"><span class="select_cirl"></span><span>{{item.label}}</span></p>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="phone_name">
                <el-input v-model="form.phone_or_username" placeholder="用户手机号/姓名" clearable @change="getList(1)" />
              </el-form-item>
            </el-form>
            <el-table
                slot="table"
                ref="multipleTable"
                width="100%"
                :data="dataList"
                max-height="500"
                class="expand--table">
              <el-table-column align="center" type="index" label="序号" width="100px"/>
              <el-table-column align="left" prop="award_name" label="中奖产品" :show-overflow-tooltip="true"/>
              <el-table-column align="left" prop="id" label="记录ID" />
              <el-table-column align="left" prop="name" label="姓名" :show-overflow-tooltip="true" />
              <el-table-column align="left" prop="phone_number" label="手机号" :show-overflow-tooltip="true" />
              <el-table-column align="left" prop="address" label="地址" :show-overflow-tooltip="true" />
              <el-table-column align="left" label="发货状态" witdh="160px" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div class="flex">
                    <span v-if="scope.row.categories == 0 && scope.row.status == 2">待发货</span>
                    <span v-if="scope.row.categories == 1 && scope.row.status == 2">积分/待到账</span>
                    <span v-if="scope.row.categories == 2 && scope.row.status == 2">红包/待到账</span>
                    <span v-if="scope.row.categories == 0 && scope.row.status == 3">已发货</span>
                    <span v-if="scope.row.categories == 1 && scope.row.status == 3">积分/已到账</span>
                    <span v-if="scope.row.categories == 2 && scope.row.status == 3">红包/已到账</span>
                    <span v-if="scope.row.status == 4">异常提现</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" label="创建时间" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.created_on)|formattime1}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" label="操作" width="200">
                <template slot-scope="scope">
                  <c-button>
                    <span @click="openXM(scope.row)" v-if="scope.row.categories == 0 && scope.row.status == 2">确认发货</span>
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
import { getCodeAwardLog,putCodeAwardLog } from '@/api/xapi'
import { turntable_lottery_log_status,turntable_lottery_category2  } from '@/api/map'
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
      turntable_lottery_category2:turntable_lottery_category2,
      turntable_lottery_log_status:turntable_lottery_log_status,
      tab_loading: false,
      pages: this.$mpages,
      form: {
        search_name:'',
        phone_or_username:'',
        status:''
      },
      dataList: [],
      editFlag:false,
      row:{},
      status_list:[
        {
          value:'3',
          label:'已发货'
        },
        {
          value:'2',
          label:'未发货'
        },
      ],
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
      const {data,count} = await getCodeAwardLog(obj)
      this.dataList = this.dataList.concat(data);
      this.pages.total= count;
    },
    openXM(row) {
      this.$layer.confirm(
          '<p class="font_main ft18">'+'提 示'+'</p>'+'</br>'+
          '<span class="font_white ft13">'+
          '您是否确认发货？'+'</span>',
          {
            shadeClose:false,
            btn:['确定','取消'],
            area: ['347px', '192px'],
          },
          async (index) => {
            const { code } = await putCodeAwardLog({ id: row.id,confirm:'true' })
            if (code === 200) {
              this.$message({ message: '操作成功', type: 'success' });
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
.drawRecord{
  .search-form{
    .el-form-item{
      width:345.5px!important;
      margin-right:31px!important;
    }
  }
}
</style>
