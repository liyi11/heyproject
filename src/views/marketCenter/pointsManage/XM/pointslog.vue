<template>
  <section class="xm-content xm-content-noneBtn redEnvelopelog">
    <div class="ft18 font_white tl fw600 ftF marginBottom30">
      积分领取明细：
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
        <el-table-column align="left" prop="user_info.user_name" label="用户" :show-overflow-tooltip="true"/>
        <el-table-column align="left" label="领取时间" :show-overflow-tooltip="true" min-width="100px">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.created_on)|formattime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="领取数量（分）" :show-overflow-tooltip="true" min-width="100px">
          <template slot-scope="scope">
            <p  class="font_c0">
              {{scope.row.point}}
            </p>
          </template>
        </el-table-column>
        <el-table-column align="left" label="性别" :show-overflow-tooltip="true">
          <template slot-scope="scope">
                  <span v-for = "item in user_sex_list" :key="item.value">
                  <span v-if="scope.row.user_info.sex == item.value">
                    {{item.label}}
                  </span>
                </span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="area" label="地区" :show-overflow-tooltip="true"/>
      </el-table>
    </c-content>
    <div class="xm-close gray" @click="close">
      <span>×</span></div>
  </section>
</template>

<script>
import { getPointInfo } from '@/api/xapi'
import { user_sex_list } from '@/api/map'

export default {
  components:{
    CContent: () => import('@/components/CContent'),
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
      user_sex_list:user_sex_list,
      dataList:[]
    }
  },
  created() {
    if(this.row.id){
      this.getPointInfo()
    }
  },
  methods: {
    async getPointInfo(){
      let obj= {
        id :this.row.id,
        page:this.pages.page,
        num:this.pages.num,
        // download_csv
      };
      const {data,count} = await getPointInfo(obj)
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
    close() {
      this.$layer.close(this.layerid)
    }
  }
}
</script>
<style lang="scss" scoped>
   .redEnvelopelog{
     padding:40px 30px 0 30px!important;
   }
   .look_more{
     margin-top:35px!important;
   }
</style>