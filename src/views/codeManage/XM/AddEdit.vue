<template>
  <section class="xm-content addEdit exchangeCode">
    <section>
      <p class="ft32 fw600">兑换二维码</p>
    </section>
    <el-form ref="form"
             :model="form" :rules="rules"
             label-position="left"
             label-width="100%" :inline-message="false">
      <p class="ft18 tips">请输入您通过Hyebird购买的码包Key</p>
      <el-form-item  prop="key">
        <el-input v-model="form.key" type="password" :show-password="true" clearable placeholder="请输入您通过Hyebird购买的码包Key" />
      </el-form-item>
      <p class="ft12 margintb20 cursor_pointer" @click="concatCode">联系客服购买码包Key</p>
    </el-form>
    <div class="xm-close gray" @click="close">
      <span>×</span>
    </div>
    <div class="xm-footer">
      <el-button @click="saves('form')" class="saves">
        确定
      </el-button>
    </div>
    <el-dialog title="" :visible.sync="dialogFormVisible"
               width="298px" height="409px"
               :close-on-click-modal="false">
      <ConcatCode  @close="closeConcatCode"></ConcatCode>
    </el-dialog>
  </section>

</template>

<script>
import { exchangeCode } from '@/api/xapi'
import ConcatCode from "./concatCode";

export default {
  components:{
    ConcatCode
  },
  props: {
    layerid: {
      default: 0
    },
    row:{
      default:{}
    }
  },
  data() {
    return {
      form: {
        key:'',
      },
      rules: {
        key: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      dialogFormVisible:false,
    }
  },
  created() {
  },
  methods: {
    closeConcatCode(){
      this.dialogFormVisible = false;
    },
    concatCode(){
      this.dialogFormVisible =true;
    },
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var obj = {};
          this.$set(obj,'key',this.form.key);
          this.btn_loading = true;
          let res = await exchangeCode(obj)
          if (res.code !== 200){
            this.btn_loading = false;
            return false
          }
          this.$emit('close');
          this.$emit('initSaves');
          this.$message({ message: '兑换成功', type: 'success'})
        } else {
          this.$refs[formName].validate()
        }
      })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.exchangeCode{
  padding:39px 20px 20px 20px;
  .tips{
    margin:17px 0 26px 0;
  }
}
</style>
<style lang="scss">
 .exchangeCode.xm-content{
   text-align: center!important;
   color: #fff!important;
    padding-top:45px!important;
     .el-input__inner{
       color: #fff!important;
       border: 1px solid #313131 !important;
       background: #1D1D1F!important;
       border-radius: 12px!important;
     }
   .xm-footer{
     .el-button:nth-child(1){
       border-right: none!important;
       font-size: 18px!important;
     }
   }

 }
</style>