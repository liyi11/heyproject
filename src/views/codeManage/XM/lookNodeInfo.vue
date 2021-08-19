<template>
  <section class="xm-content lookInfoNode ">
    <el-form ref="form"
               class="addEdit-form "
               v-loading="box_loading"
               :model="form" :rules="rules"
               label-position="left"
               label-width="100%" :inline-message="false">
        <el-row :span="24" >
          <section  v-for="(item, index) in form.nodes" :key="index">
            <div class="label_title fw600 ftF margintop40">
              <p class="ft18 font_white" >溯源节点</p>
            </div>
            <section class="">
              <el-row :span="24">
                <el-col :span="11">
                  <div class="margintb20 label_title">
                    <p>节点编号</p>
                  </div>
                  <el-form-item
                  >
                    <el-input   v-model="item.node_number" clearable placeholder="" :disabled="true" />
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <span style="color:transparent">1</span>
                </el-col>
                <el-col :span="11">
                  <div class="margintb20 label_title">
                    <p>用户组</p>
                  </div>
                  <el-form-item
                  >
                    <el-input   v-model="item.group_info.role_name" clearable placeholder="" :disabled="true" />
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="margintb20 label_title">
                <p>节点内容</p>
              </div>
              <el-form-item
              >
                <el-input  type="textarea" resize="none" rows="5"
                           v-model="item.node_content" clearable placeholder="请填写内容" :disabled="true"/>
              </el-form-item>
              <div class="margintb20 label_title">
                <p>图片</p>
              </div>
              <el-form-item class="tl">
                <viewer :images="[item.image]">
                  <img :src="item.image" class="img-viewer" />
                </viewer>
              </el-form-item>
            </section>
          </section>
        </el-row>
      </el-form>
    <div class="xm-footer">
      <p @click="close" class="confirm">确定</p>
    </div>
    <div class="xm-close gray" @click="close">
      <span>×</span>
    </div>
  </section>
</template>

<script>
import { getLabel_node_info } from '@/api/xapi'
export default {
  components:{
    CTitle: () => import('@/components/CTitle/index'),
    CButton: () => import('@/components/CButton'),
    XUpload: () => import('@/components/XUpload/indexAws'),
  },
  props: {
    layerid:{
      default:0
    },
    template_id:{
      default:''
    }
  },
  data() {
    return {
      box_loading: false,
      btn_loading: false,
      form:{
        nodes:[]
      },
      rules:{}
    }
  },
  created() {
    if(this.template_id){
      this.getLabel_node_info();
    }
  },
  methods: {
    //查看节点信息
    async getLabel_node_info(){
      let obj= {
        node_template_id:this.template_id
      };
      const res = await getLabel_node_info(obj);
      this.form.nodes = res.data;
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.lookInfoNode{
  .img-viewer {
    width: 63px;
    height: 63px;
    text-align: left!important;
    border-radius: 12px;
  }
  .label_title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #B2B3BD !important;
    font-size: 14px!important;
    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      p{
        width:24px;
        height:24px;
        font-size: 16px;
        text-align: center;
        line-height: 22px;
        cursor: pointer;
        border-radius: 50%;
        color: #000;
      }
      p:nth-child(1){
        background: #FFBD2F;
        margin-right:8px;
      }
      p:nth-child(2){
        background: #CCCCCC;
      }
    }

  }
  .el-checkbox-group{
    background: #0D0E0F;
    padding-left:15px;
    border-radius:4px;
  }
}
</style>
<style lang="scss">
.lookInfoNode{
  .el-dialog,.el-dialog__body{
    padding:0!important;
  }
  .el-dialog{
    background: transparent!important;
  }
  .el-dialog__body{
    background:#0D0E0F!important;
  }
  .xm-footer{
    .confirm{
      color: #fff;
      width:100%;
      height: 56px;
      line-height: 56px;
      cursor: pointer;
      background: #0D0E0F;
      border-radius: 14px;
      font-size: 18px;
      font-weight: 400;
    }
  }
  .addEdit-form{
    padding:0 62px!important;
    .el-input__inner{
      color: #fff!important;
      background: #1D1D1F!important;
      height:56px!important;
      line-height: 56px!important;
      border-radius: 12px!important;
    }
    .el-input__inner:hover,
    .is-disabled .el-input__inner:hover{
      background: #1D1D1F!important;
    }
    .el-textarea__inner{
      background: #1D1D1F!important;
      border-radius: 12px!important;
    }
  }
}
</style>
