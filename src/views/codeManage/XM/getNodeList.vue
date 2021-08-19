<template>
  <section class="xm-content xm-content-noneBtn nodeList">
    <div class="ft14 font_white tl">
      溯源节点：
    </div>
    <el-table
        slot="table"
        ref="multipleTable"
        width="100%"
        :data="dataList"
        max-height="280"
        class="expand--table">
      <el-table-column align="left" prop="node_number" label="节点" :show-overflow-tooltip="true"/>
      <el-table-column align="left" prop="user_info" label="用户" :show-overflow-tooltip="true"/>
      <el-table-column align="left" prop="location" label="位置" :show-overflow-tooltip="true"/>
      <el-table-column align="left" label="创建时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{new Date(scope.row.created_on)|formattime1}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column align="left" label="溯源节点" :show-overflow-tooltip="true">-->
<!--        <template slot-scope="scope">-->
<!--          <span class="font_main cursor_pointer" @click="getNodeDetail(scope.row)">{{scope.row.label_node_count}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <div class="xm-close gray" @click="close">
      <span>×</span></div>
  </section>
</template>

<script>
import { getLabel_provenance_node } from '@/api/xapi'
export default {
  components:{
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
      dataList:[]
    }
  },
  created() {
    if(this.row.id){
      this.getLabel_provenance_node()
    }
  },
  methods: {
    async getLabel_provenance_node(){
      let obj= {
        label_tracking_id :this.row.id
      };
      const res = await getLabel_provenance_node(obj);
      this.dataList =res.data;
    },
    close() {
      this.$layer.close(this.layerid)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>