<template>
  <section class="xm-content xm-content-noneBtn redEnvelopelog">
    <div class="ft18 font_white tl fw600 ftF marginBottom30">
      红包领取明细：
    </div>
    <c-content
        :page.sync="pages.page"
        :pagesize.sync="pages.num"
        :total.sync="pages.total"
        class="gray_page fixedBot"
        @pagination="pageChange">
      <el-table
          slot="table"
          ref="multipleTable"
          width="100%"
          :data="dataList"
          max-height="400"
          class="expand--table detail">
        <el-table-column align="left" prop="user_name" label="用户" :show-overflow-tooltip="true"/>
        <el-table-column align="left" label="领取时间" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.modified_on)|formattime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="领取金额(元)" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <p  class="font_c0">
              <span class="ft12">￥</span>
              {{scope.row.price}}
            </p>
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
        <el-table-column align="left" prop="area" label="地区" :show-overflow-tooltip="true"/>
      </el-table>
    </c-content>
    <div class="xm-close gray" @click="close">
      <span>×</span>
    </div>
    <div class="xm-downLoad">
      <img src="../../../../assets/images/downLoad.png" alt="" @click="downLoad">
    </div>
  </section>
</template>

<script>
import { getCashRedDetail } from '@/api/xapi'
import { user_sex_list } from '@/api/map'
import {mapGetters} from "vuex";

export default {
  components:{
    CContent: () => import('@/components/CContent'),
  },
  computed: {
    ...mapGetters(['email'])
  },
  props: {
    layerid: {
      default: 0
    },
    row:{
      default:''
    }
  },
  data() {
    return {
      pages:{
        page:1,
        num:10,
        total:0
      },
      form:{
        download_csv:''
      },
      user_sex_list:user_sex_list,
      dataList:[],
      downLoadFlag:true
    }
  },
  created() {
    if(this.row.id){
      this.getCashRedDetail()
    }
  },
  methods: {
    async getCashRedDetail(){
      setTimeout(()=>{
        this.downLoadFlag = true
      },1000)
      let obj= {
        id :this.row.id,
        page:this.pages.page,
        num:this.pages.num,
      };
      if(this.form.download_csv){
        this.$set(obj,'download_csv',this.form.download_csv);
        const res = await getCashRedDetail(obj)
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
        const {data,count} = await getCashRedDetail(obj)
        this.dataList = this.dataList.concat(data);
        this.pages.total= count;
      }
    },
    async downLoad(){
      if(this.downLoadFlag){
        this.downLoadFlag = false;
        this.form.download_csv = 'true';
        this.getCashRedDetail();
      }
    },
    // 页码改变
    pageChange(param) {
      if(Math.ceil(Number(this.pages.total)/Number(this.pages.num)) > Number(this.pages.page)){
        this.pages.page = ++param.val
        this.getCashRedDetail()
      }else{
        this.$message({ message: '没有更多数据', type: 'success',duration:1000 })
      }
    },
    close() {
      this.$layer.close(this.layerid)
    }
  }
}
</script>
<style lang="scss" scoped>
   .redEnvelopelog{
     padding:40px 30px 0 30px!important;
     .xm-downLoad{
       position: fixed;
       right:54px;
       top:263px;
       cursor: pointer;
       img{
         width:48px;
         height: 48px;
       }
     }
   }
   .look_more{
     margin-top:35px!important;
   }
</style>