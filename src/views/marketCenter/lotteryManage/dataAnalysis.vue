<template>
  <div class="page dataAnalysis">
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
               数据分析
            </span>
          </c-title>
          <img src="../../../assets/images/downLoad.png" alt="" class="downLoad" @click="downLoad">
        </section>
        <el-form slot="search" :inline="true" class="search-form" label-width="80px">
          <el-form-item  class="date_box" label="选择时间段">
            <div class="flex">
              <el-form-item class="date_wrap">
                <el-date-picker v-model="form.start_time" type="date"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                :picker-options="startTime"
                                placeholder="请选择开始时间">
                </el-date-picker>
              </el-form-item>
              <p class="marginRight10 tc" style="min-width: 20px;line-height: 56px;color:#B2B3BD">--</p>
              <el-form-item class="date_wrap">
                <el-date-picker v-model="form.end_time" type="date"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                :picker-options="endTime"
                                placeholder="请选择结束时间">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="选择区域" class="area_list_box">
            <div class="flex flex_box">
              <el-form-item class="area_list">
                <el-select  v-model="form.province"
                            clearable filterable
                            @change="changeState"
                            popper-class="select_gray"
                            placeholder="请选择省">
                  <el-option v-for="(item,index) in state_info" :key="index"
                             :value="item.id" :label="item.name" >
                    <p class="select_and"><span class="select_cirl"></span><span>{{item.name}}</span></p>
                  </el-option>
                </el-select>
              </el-form-item>
              <p class="marginRight10 tc" style="min-width: 20px;line-height: 56px">--</p>
              <el-form-item  class="area_list">
                <el-select  v-model="form.city"
                            popper-class="select_gray"
                            clearable filterable
                            placeholder="请选择市">
                  <el-option v-for="(item,index) in city_info" :key="index"
                             :value="item.id" :label="item.city_name" >
                    <p class="select_and"><span class="select_cirl"></span><span>{{item.city_name}}</span></p>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="输入订单编号" class="order_number">
            <el-input v-model="form.order_number" placeholder="请输入订单编号" clearable />
          </el-form-item>
          <el-form-item  class="search_btn_label">
            <p @click="getList(1)">
              <span  class="main_button">筛选</span>
            </p>
          </el-form-item>
          <div class="clear"></div>
        </el-form>
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
                width="100%"
                :data="dataList"
                max-height="500"
                class="expand--table">
              <el-table-column align="center" type="index" label="序号" width="100px"/>
              <el-table-column align="left" label="用户" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <p>{{scope.row.user_name}}</p>
                </template>
              </el-table-column>
              <el-table-column align="left" label="性别" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span v-for = "item in user_sex_list" :key="item.value">
                  <span v-if="scope.row.sex == item.value">
                    {{item.label}}
                  </span>
                </span>
                </template>
              </el-table-column>
              <el-table-column align="left" label="参与次数" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <p>{{scope.row.total_num}}</p>
                </template>
              </el-table-column>
              <el-table-column align="left" label="中奖次数" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <p>{{scope.row.award_num}}</p>
                </template>
              </el-table-column>
              <el-table-column align="left" label="上次参与时间" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.last_time)|formattime1}}</span>
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
import { mapGetters } from 'vuex'
import {
  getCodeAwardDataAnalysis,
  getArea
} from '@/api/xapi'
import { user_sex_list } from '@/api/map'
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
    ...mapGetters(['email'])
  },
  data() {
    return {
      getday:getDay(),
      startTime: {// 时间判断
        disabledDate: time => {
          let endDateVal = this.form.end_time;
          if (endDateVal) {  return time.getTime() > new Date(endDateVal).getTime()}
        }
      },
      endTime: {
        disabledDate: time => {
          let beginDateVal = this.form.start_time;
          if (beginDateVal) { return time.getTime() < new Date(beginDateVal).getTime()}
        }
      },
      user_sex_list:user_sex_list,
      pages: this.$mpages,
      form: {
        order_number:'',
        start_time:'',
        end_time:'',//结束时间， 格式2020-07-02 01:01:01
        city:'',
        province:'',
        download_csv:'',//下载csv，有值则根据条件下载数据
      },
      dataList: [],
      editFlag:false,
      row:{},
      state_info:[],
      city_info:[],
      downLoadFlag:true,
    }
  },
  created() {
    if(Number(this.getday) >= 0){
      this.$getReset();
      this.getList();
      this.get_state_info()
    }
  },
  methods: {
    async downLoad(){
      if(this.downLoadFlag){
        this.downLoadFlag = false;
        this.form.download_csv = 'true';
        this.getList();
      }
    },
    changeState(e){
      if(e){
        this.get_city_info(e);
      }else{
        this.city_info=[]
      }
    },
    async get_state_info(){
      let obj= {};
      this.$set(obj,'country_id',227);//中国
      const{ data } = await getArea(obj)
      this.state_info = data.state_info;
    },
    async get_city_info(state_id){
      let obj= {};
      this.$set(obj,'country_id',227);//中国
      this.$set(obj,'state_id',state_id)
      const{ data } = await getArea(obj)
      this.city_info = data.city_info;
    },
    init_getList(e){
      if(Number(this.getday) >= 0){
        this.form.search_name = e;
        this.$getReset();
        this.dataList = [];
        this.getList()
      }
    },
    /* 查询 */
    async getList(page) {
      setTimeout(()=>{
        this.downLoadFlag = true
      },1000)
      if(page){
        this.pages.page = 1;
        this.dataList =[]
      }
      const obj = {}
      Object.assign(obj, {
        page:this.pages.page,
        num: this.pages.num,
      })
      if(this.form.start_time){
        this.$set(obj,'start_time',this.form.start_time)
      }
      if(this.form.end_time){
        this.$set(obj,'end_time',this.form.end_time)
      }
      if(this.form.city){
        this.$set(obj,'city',this.form.city)
      }
      if(this.form.province){
        this.$set(obj,'province',this.form.province)
      }
      if(this.form.order_number){
        this.$set(obj,'order_number',this.form.order_number)
      }
      if(this.form.download_csv){
        this.$set(obj,'download_csv',this.form.download_csv);
        const res = await getCodeAwardDataAnalysis(obj)
        if(res.code==200){
          this.form.download_csv='';
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
        const {data,count} = await getCodeAwardDataAnalysis(obj)
        this.dataList = this.dataList.concat(data);
        this.pages.total= count;
      }
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
