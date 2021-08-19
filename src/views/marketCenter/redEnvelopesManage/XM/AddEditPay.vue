<template>
  <section class="xm-content addEditPay">
    <section class="addTitle">
      <c-title>
            <span slot="secTxt" class="secTxt">
                 支付管理
            </span>
      </c-title>
    </section>
    <el-form ref="form"
             v-loading="box_loading"
             :model="form" :rules="rules"
             label-position="left"
             label-width="100%" :inline-message="false">
      <el-row :span="24" class="addEdit-form main_wrap">
        <section class="box_wrap">
          <el-col :span="11">
            <div class="item_Box">
              <div class="item_box">
                <div class="left_box">
                  <img src="../../../../assets/images/mCenter/icon1.png" alt="">
                </div>
                <div class="right_box">
                  <div class="right_box_title ft18">微信公众号App ID</div>
                  <el-form-item prop="app_id">
                    <el-input    @change = "change_app_id" v-model="form.app_id"
                                 clearable placeholder="请输入微信公众号App ID" />
                  </el-form-item>
                  <div class="right_box_label_box flex font_main">
                    如何获取微信公众号App ID？
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <span style="color:transparent">1</span>
          </el-col>
          <el-col :span="11">
            <div class="item_Box">
              <div class="item_box">
                <div class="left_box">
                  <img src="../../../../assets/images/mCenter/icon1.png" alt="">
                </div>
                <div class="right_box">
                  <div class="right_box_title ft18">小程序App ID</div>
                  <el-form-item prop="sub_app_id">
                    <el-input    v-model="form.sub_app_id"
                                 @change = "change_sub_app_id"
                                 clearable placeholder="请输入微信公众号App ID" />
                  </el-form-item>
                  <div class="right_box_label_box flex font_main">
                    如何获取小程序App ID？
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="item_Box">
              <div class="item_box">
                <div class="left_box">
                  <img src="../../../../assets/images/mCenter/icon1.png" alt="">
                </div>
                <div class="right_box">
                  <div class="right_box_title ft18">商户号</div>
                  <el-form-item prop="pid">
                    <el-input    v-model="form.pid"
                                 @change = "change_pid"
                                 clearable placeholder="请输入商户号" />
                  </el-form-item>
                  <div class="right_box_label_box flex font_main">
                    如何获取？
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="2" >
            <span style="color:transparent">1</span>
          </el-col>
          <el-col :span="11">
            <div class="item_Box">
              <div class="item_box">
                <div class="left_box">
                  <img src="../../../../assets/images/mCenter/icon1.png" alt="">
                </div>
                <div class="right_box">
                  <div class="right_box_title ft18">商户号密钥Key</div>
                  <el-form-item prop="key">
                    <el-input    v-model="form.key"
                                 @change = "change_key"
                                 clearable placeholder="请输入商户号密钥Key" />
                  </el-form-item>
                  <div class="right_box_label_box flex font_main">
                    如何获取？
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="item_Box">
              <div class="item_box">
                <div class="left_box">
                  <img src="../../../../assets/images/mCenter/icon1.png" alt="">
                </div>
                <div class="right_box">
                  <div class="right_box_title ft18">商户号证书</div>
                  <el-form-item prop="mch_cert">
                    <el-upload
                        multiple
                        :limit="1"
                        class="upload-demo"
                        ref="upload"
                        accept=".pdf"
                        action
                        :on-change="change_mch_cert"
                        :auto-upload="false"
                        :on-remove="handleRemove0"
                        :on-exceed="handleExceed"
                        :file-list="backfillList0">
                      <el-button size="small" type="primary" class="upload_file">上传文件</el-button>
                    </el-upload>
                  </el-form-item>
                  <div class="right_box_label_box flex font_main">
                    如何获取？
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="2" >
            <span style="color:transparent">1</span>
          </el-col>
          <el-col :span="11">
            <div class="item_Box">
              <div class="item_box">
                <div class="left_box">
                  <img src="../../../../assets/images/mCenter/icon1.png" alt="">
                </div>
                <div class="right_box">
                  <div class="right_box_title ft18">商户号证书密钥</div>
                  <el-form-item prop="mch_key">
                    <el-upload
                        multiple
                        :limit="1"
                        class="upload-demo"
                        ref="upload"
                        accept=".pdf"
                        action
                        :on-change="change_mch_key"
                        :auto-upload="false"
                        :on-remove="handleRemove"
                        :on-exceed="handleExceed"
                        :file-list="backfillList">
                      <el-button size="small" type="primary" class="upload_file">上传文件</el-button>
                    </el-upload>
                  </el-form-item>
                  <div class="right_box_label_box flex font_main">
                    如何获取？
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </section>
      </el-row>
    </el-form>
    <div class="xm-footer">
      <c-button>
        <span @click="handelSave('form')" class="saves">提交</span>
        <span  size="mini" @click="close" class="close">取消</span>
      </c-button>
    </div>
  </section>
</template>

<script>
import {postPayment,putPayment} from '@/api/xapi'
export default {
  components:{
    CTitle: () => import('@/components/CTitle/index'),
    CButton: () => import('@/components/CButton'),

  },
  props: {
    row:{
      default:{}
    }
  },
  data() {
    return {
      box_loading: false,
      btn_loading: false,
      form: {
        app_id:'',
        sub_app_id:'',
        pid:'',
        key:'',
        mch_cert:'',
        mch_key:'',
      },
      rules: {
        app_id: [{ required: true, message: '必填', trigger: 'blur' }],
        sub_app_id: [{ required: true, message: '必填', trigger: 'blur' }],
        pid: [{ required: true, message: '必填', trigger: 'blur' }],
        key: [{ required: true, message: '必填', trigger: 'blur' }],
        mch_cert: [{ required: true, message: '必填', trigger: 'blur' }],
        mch_key: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      edit_app_id:false,
      edit_sub_app_id:false,
      edit_pid:false,
      edit_key:false,
      edit_mch_cert:false,
      edit_mch_key:false,

      uploadData:new FormData(),
      backfillList0:[],
      backfillList:[],
    }
  },
  created() {
    if(this.row.id){
      this.form.app_id = this.row.app_id;
      this.form.sub_app_id = this.row.sub_app_id;
      this.form.pid = this.row.pid;
      this.form.key = this.row.key;
      this.backfillList0=[
        {
          url:this.row.mch_cert,
          name:this.row.mch_cert
        }
      ]
      this.form.mch_cert =this.row.mch_cert;
      this.form.mch_key =this.row.mch_key;
      this.backfillList=[
        {
          url:this.row.mch_key,
          name:this.row.mch_key
        }
      ]
    }
  },
  methods: {
    handleExceed(files,fileList){
      if(fileList.length>=1){
        this.$message({ message: '只能上传一个文件', type: 'error',duration:1000 })
      }
    },
    handleRemove0() {
      this.form.mch_cert = '';
      this.backfillList0 = [];
    },
    handleRemove() {
      this.form.mch_key = '';
      this.backfillList = []
    },
    change_app_id(){
      this.edit_app_id = true;
    },
    change_sub_app_id(){
      this.edit_sub_app_id = true;
    },
    change_pid(){
      this.edit_pid = true;
    },
    change_key(){
      this.edit_key = true;
    },
    handelSave(formName){
      this.$layer.confirm(
          '<p class="font_main ft18">'+'提 示'+'</p>'+'</br>'+
          '<span class="font_white ft13 line-height15">'+
          '提交后，请申请二维码并配置红包规则，扫码测试红包功能是否正常' +  '</br>'+
          '如有疑问，可以联系Hyebird客服'+'</span>',
          {
            shadeClose:false,
            btn:['确定','取消'],
            area: ['441px', '196px'],
          },
          async (index) => {
            this.$layer.close(index);
            this.saves(formName);
          },
      );
    },
    change_mch_cert(e){
      const file = e.raw;
      this.uploadData.append('mch_cert',file);// 通过append向form对象添加数据,可以通过append继续添加数据
      this.$set(this.form,'mch_cert',file.name);
    },
    change_mch_key(e){
      const file = e.raw;
      this.uploadData.append('mch_key',file);// 通过append向form对象添加数据,可以通过append继续添加数据
      this.$set(this.form,'mch_key',file.name);
    },
    editData(data){
      if(this.edit_app_id){
        data.append("app_id", this.form.app_id);
      }
      if(this.edit_sub_app_id){
        data.append("sub_app_id", this.form.sub_app_id);
      }
      if(this.edit_pid){
        data.append("pid", this.form.pid);
      }
      if(this.edit_key){
        data.append("key", this.form.key);
      }
      if(this.row.id) {
        this.$set(data, 'id', Number(this.row.id));
        putPayment(data).then(res => {
          if (res.code !== 200){
            return false
          }
          setTimeout(()=>{
            this.$parent.close();
            this.$parent.dataList=[];
            this.$parent.pages.page = 1;
            this.$parent.getList()
          },1000)
          this.$message({ message: '操作成功', type: 'success',duration:1000 })
        });
      }else{
        postPayment(data).then(res => {
          if (res.code !== 200){
            return false
          }
          setTimeout(()=>{
            this.$parent.close();
            this.$parent.dataList=[];
            this.$parent.pages.page = 1;
            this.$parent.getList()
          },1000)
          this.$message({ message: '操作成功', type: 'success',duration:1000 })
        });
      }
    },
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if(this.edit_app_id){
            this.uploadData.append("app_id", this.form.app_id);
          }
          if(this.edit_sub_app_id){
            this.uploadData.append("sub_app_id", this.form.sub_app_id);
          }
          if(this.edit_pid){
            this.uploadData.append("pid", this.form.pid);

          }
          if(this.edit_key){
            this.uploadData.append("key", this.form.key);
          }
          this.btn_loading = true;
          let res = '';
          if(this.row.id){
            this.uploadData.append("id",Number(this.row.id));
            res = await putPayment(this.uploadData)
          }else{
            res = await postPayment(this.uploadData)
          }
          this.btn_loading = false
          if (res.code !== 200){
            this.btn_loading = false;
            return false
          }
          Object.assign(this.$data.form, this.$options.data().form)
          setTimeout(()=>{
            this.$parent.close();
            this.$parent.dataList=[];
            this.$parent.pages.page = 1;
            this.$parent.getList()
          },1000)
          this.$message({ message: '操作成功', type: 'success',duration:1000 })
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
.addEditPay{
  .addTitle{
    margin-bottom: 20px;
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
  .main_wrap{
    width:100%;
    background: #0D0E0F;
    border-radius: 24px;
    min-height: 233px;
    max-height: 747px;
    margin-bottom: 20px;
    .box_wrap{
      height:auto;
      padding:20px;
      .item_Box{
        padding:32px 0 35px 16px;
        border-bottom:1px solid #1D1D1F;
        .item_box{
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          .left_box{
            width:48px;
            margin-right: 23px;
          }
          .right_box{
            width:calc(100% - 71px);
            .right_box_title{
              font-weight: 600;
              margin-bottom: 9px;
            }
            .right_box_label_box{
              margin-bottom: 14px;
              display: flex;
              justify-content: flex-end;
              height: 35px;
              line-height: 35px;
              span:nth-child(1){
                color:#808191;
                margin-right: 24px;
              }
            }
          }
        }
      }
    }
  }
  .upload_file{
    font-size: 12px!important;
    border-radius: 8px!important;
  }
}
</style>
<style lang="scss">
.addEditPay{
  .addEdit-form.main_wrap{
    .el-input__inner{
      background: #1C1C1E!important;
    }
  }
  .el-upload-list{
    .el-upload-list__item-name{
      color:#fff!important;
    }
    .el-upload-list__item:hover{
      background: transparent!important;
    }
    .el-upload-list__item:hover .el-upload-list__item-name{
      color:#FFBD2F!important;
    }
    .el-icon-close{
      display: block!important;
      color:#fff!important;
    }
  }

}
</style>
