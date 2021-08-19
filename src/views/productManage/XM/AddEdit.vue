<template>
  <section class="xm-content addEditProduct">
    <section class="page_content">
      <section class="addTitle">
        <c-title>
            <span slot="secTxt" class="secTxt">
               添加产品
            </span>
        </c-title>
      </section>
      <el-form ref="form"
               class="addEdit-form"
               v-loading="box_loading"
               :model="form" :rules="rules"
               label-position="left"
               label-width="100%" :inline-message="false">
        <el-row :span="24" >
          <el-col :span="6">
            <el-form-item label="品牌" prop="brand_id">
              <el-select
                  popper-class="select-option"
                  class="select_gray"
                  @change="change_brand_id"
                  v-model="form.brand_id"
                  clearable
                  filterable
                  placeholder="请选择品牌"
              >
                <el-option :label="item.build_brand" :value="item.id"
                           v-for="(item, index) in brand_list" :key="index" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="ENA 13" prop="ena_13">
              <el-input v-model="form.ena_13"
                        @change="change_ena_13"
                        clearable placeholder="请输入ENA 13" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品名称" prop="product_name">
              <el-input v-model="form.product_name"
                        @change="change_product_name"
                        clearable placeholder="请输入产品名称" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品编号" prop="product_number">
              <el-input v-model="form.product_number"
                        @change="change_product_number"
                        clearable placeholder="请输入产品编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24" >
          <el-col :span="6">
            <el-form-item label="分类" prop="secondary_classification_id">
              <el-select
                  @change="change_secondary_classification_id"
                  v-model="form.secondary_classification_id"
                  clearable
                  filterable
                  placeholder="请选择分类"
              >
                <el-option :label="item.classification_name" :value="item.id"
                           v-for="(item, index) in classificationList" :key="index" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24" class="flex product_image">
          <el-form-item label="产品缩略图" prop="small_image" class="small_image">
            <x-upload ref="imgupload" :filelist="fileInit1" :limit="1" :is-show="false"
                      img-size="size40" @backList="backList1"/>
            <p class="upload_tip">* 请选择正方形JPG或PNG格式图片，图片大小200kb～500kb以内即可</p>
          </el-form-item>
          <el-form-item label="产品图片" prop="product_image">
            <x-upload ref="imgupload" :filelist="fileInit2" :limit="100" :is-show="false"
                      img-size="size40" @backList="backList2"/>
            <p class="upload_tip">* 请选择正方形JPG或PNG格式图片，图片大小200kb～500kb以内即可</p>
          </el-form-item>
        </el-row>
        <el-row :span ="24" class="line marginBottom20"></el-row>
        <el-row :span ="24" class="flex desc_product">
          <el-form-item label="产品描述" >
            <el-input  type="textarea" @change="change_product_description" resize="none" rows="6"
                       v-model="form.product_description" clearable placeholder="这里是产品描述基本信息填写..." />
          </el-form-item>
          <el-form-item
              label="产品视频"
              prop="video"
          >
            <x-video ref="video"
                     :filevideo="fileVideo" typeval="video"
                     @videosback="file => videosback(file, 1)" classbox="video-box1"
                     :fileLabel="'* 请上传16:9比例（横版）视频，MP4格式，大小30mb以内的视频'" >
            </x-video>
          </el-form-item>
          <el-form-item label="视频封面" prop="video_image" class="video_image">
            <x-upload0 ref="imgupload" :filelist="fileInit3" :limit="1" :is-show="false"
                       img-size="size173" @backList="backList3"/>
          </el-form-item>
        </el-row>
        <el-row :span ="24" class="margintb20">
          <div class="spec">
            <span class="marginRight10">产品规格</span>
            <span class="marginRight10 add_item" @click="add_item">添加</span>
            <span class="marginRight10 sub_item" @click="sub_item">删除</span>
          </div>
        </el-row>
        <el-row :span="24" class="marginBottom20">
          <div class="item_Box">
            <div class="item_box"  v-for="(item, index) in form.product_specification_list" :key="index">
              <el-col :span="6">
                <el-form-item label="属性" :prop="'product_specification_list.' + index + '.label'"
                              :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                  <el-input
                      v-model="item.label" clearable placeholder="请输入属性" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="内容" :prop="'product_specification_list.' + index + '.value'"
                              :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                  <el-input v-model="item.value" clearable placeholder="请输入内容" />
                </el-form-item>
              </el-col>

            </div>
          </div>
        </el-row>
        <el-row :span="24" class="marginBottom20"></el-row>
      </el-form>
    </section>
    <div class="xm-footer">
      <c-button>
        <span @click="saves('form')" class="saves">保存</span>
        <span  size="mini" @click="close" class="close">取消</span>
      </c-button>
    </div>
  </section>
</template>

<script>
import {
  get_product_classification,
  get_brand,
  putProduct,
  postProduct
} from '@/api/xapi'
export default {
  components:{
    CTitle: () => import('@/components/CTitle/index'),
    CButton: () => import('@/components/CButton'),
    XUpload0: () => import('@/components/XUpload/indexAws'),
    XUpload: () => import('@/components/XUpload/indexAwsProduct'),
    XVideo: () => import('@/components/XVideo/indexAwsProduct'),
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
        product_number:'',
        ena_13:'',
        product_name:'',
        brand_id:'',
        secondary_classification_id:'',
        video:'',
        video_image:'',
        product_description:'',
        small_image:'',
        product_image:[],
        product_specification_list:[],
      },
      rules: {
        product_number: [{ required: true, message: '必填', trigger: 'blur' }],
        // ena_13: [{ required: true, message: '必填且大于0',pattern:/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, trigger: 'blur' }],
        ena_13: [{ required: true, message: '必填', trigger: 'blur' }],
        product_name: [{ required: true, message: '必填', trigger: 'blur' }],
        brand_id: [{ required: true, message: '必传', trigger: 'blur' }],
        secondary_classification_id: [{ required: true, message: '必选', trigger: 'blur' }],
      },
      edit_product_number:false,
      edit_ena_13:false,
      edit_product_name:false,
      edit_product_description:false,
      edit_brand_id:false,
      edit_secondary_classification_id:false,
      classificationList:[],//分类
      brand_list:[],//品牌
      fileVideo:[],
      fileInit1:[],
      fileInit2:[],
      fileInit3:[]
    }
  },
  created() {
    this.get_product_classification();
    this.get_brand();
    if(this.row.id){
      this.form.ena_13 = this.row.ena_13;
      this.form.product_name = this.row.product_name;
      this.form.product_number = this.row.product_number;
      this.form.brand_id = this.row.brand_info? this.row.brand_info.id:'';
      this.form.secondary_classification_id = this.row.secondary_classification_info?
          this.row.secondary_classification_info.id:'';

      if(this.row.small_image){
        this.fileInit1 = [{
          name: this.row.small_image,
          url: this.row.small_image
        }]
      }
      if(this.row.product_image_info.length>0){
          this.row.product_image_info.map(item=>{
            this.fileInit2.push({
              name: item.product_image,
              url: item.product_image
            })
          })
      }
      if(this.row.video_image){
        this.fileInit3 = [{
          name: this.row.video_image,
          url: this.row.video_image
        }]
      }
      if(this.row.video){
        this.fileVideo = [{
          name: this.row.video,
          url: this.row.video
        }]
      }
      if(this.row.product_specification_list.length>0){
        this.form.product_specification_list = this.row.product_specification_list;
      }
    }
  },
  methods: {
    backList1(file) {
      if (String(file) === '') {
        this.fileInit1 = []
        this.form.small_image = ''
      } else {
        this.fileInit1 = file
        this.form.small_image = file[0].name
      }
    },
    backList2(file) {
      if (String(file) === '') {
        this.fileInit2 = []
        this.form.product_image = ''
      } else {
        this.fileInit2 = file
        this.form.product_image = file.map(item => item.name)
      }
    },
    backList3(file) {
      if (String(file) === '') {
        this.fileInit3 = []
        this.form.video_image = ''
      } else {
        this.fileInit3= file
        this.form.video_image = file[0].name
      }
    },
    // 上传视频
    videosback(ary) {
      if(String(ary) == '')  {
        this.fileVideo = []
        this.form.video = ''
      } else {
        this.fileVideo = ary
        this.form.video = ary[0].name
      }
    },
    async get_brand(){
      const obj = {
        page:1,
        num:10000
      }
      const res = await get_brand(obj)
      this.brand_list = res.data;
    },
    async get_product_classification(){
      const obj = {}
      const res = await get_product_classification(obj)
      this.classificationList = res.data;
    },
    add_item(){
      this.form.product_specification_list.push({
        label:'',
        value:''
      })
    },
    sub_item(index){
      const j = this.form.product_specification_list.findIndex((item, ind) => ind === index)
      this.form.product_specification_list.splice(j, 1)
    },
    change_product_number(){
      this.edit_product_number = true;
    },
    change_ena_13(){
      this.edit_ena_13 = true;
    },
    change_product_name(){
      this.edit_product_name = true;
    },
    change_product_description(){
      this.edit_product_description = true;
    },
    change_brand_id(){
      this.edit_brand_id = true;
    },
    change_secondary_classification_id(){
      this.edit_secondary_classification_id = true;
    },
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var obj = {};
          if(this.edit_product_number){
            this.$set(obj,'product_number',this.form.product_number)
          }
          if(this.edit_ena_13){
            this.$set(obj,'ena_13',this.form.ena_13)
          }
          if(this.edit_product_name){
            this.$set(obj,'product_name',this.form.product_name)
          }
          if(this.edit_product_description){
            this.$set(obj,'product_description',this.form.product_description)
          }
          if(this.edit_brand_id){
            this.$set(obj,'brand_id',Number(this.form.brand_id))
          }
          if(this.edit_secondary_classification_id){
            this.$set(obj,'secondary_classification_id',Number(this.form.secondary_classification_id))
          }
          if(this.form.product_specification_list.length>0){
            this.$set(obj,'product_specification_list',this.form.product_specification_list)
          }
          if(this.fileInit1.length>0){
            this.$set(obj,'small_image',this.form.small_image)
          }
          if(this.fileInit2.length>0){
            this.$set(obj,'product_image',this.form.product_image)
          }
          if(this.fileInit3.length>0){
            this.$set(obj,'video_image',this.form.video_image)
          }
          if(this.fileVideo.length>0){
            this.$set(obj,'video',this.form.video)
          }
          this.btn_loading = true;
          let res = '';
          if(this.row.id){
            this.$set(obj,'id',Number(this.row.id))
            res = await putProduct(obj)
          }else{
            res = await postProduct(obj)
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
.addEditProduct{
  //background: #0D0E0F;
  //border-radius: 24px;
  .page_content{
    padding:32px!important;
  }
  .upload_tip{
    color:#B2B3BD;
    font-size: 10px;
    font-weight: 400
  }
  .addTitle{
    margin-bottom: 20px;
  }
  .line{
    border-bottom:2px solid rgba(228, 228, 228, 0.1);
  }
  .spec{
    min-height:40px;
    span{
      padding:8px 18px;
      font-size: 14px;
      text-align: center;
      border-radius: 12px;
    }
    span:nth-child(1){
      background: #FFBD2F;
      color: #000;
    }
    span:nth-child(2),span:nth-child(3){
      border:2px solid #1D1D1F;
      color: #fff;
      background: #0D0E0F;
      cursor: pointer;
    }
  }
  .item_Box,.item-box{
    width:100%;
  }
}
</style>
<style lang="scss">
.addEditProduct{
  .addEdit-form{
    .el-form-item__content{
      width:calc(100% - 17px) !important;
      margin-right:17px;
      margin-left:0!important;
    }
    .el-input__inner{
      background: #1D1D1F!important;
      border-radius: 12px!important;
    }
  }
  .el-textarea__inner{
    background: #1D1D1F!important;
    border:none!important;
    padding:18px!important;
  }
  .video_image{
    .upload-container.size173{
      .upload-view .view-item { max-width: 173px!important;width:auto!important;min-width:103px!important;}
      /deep/ .upload-btn .el-upload.el-upload--picture-card {
        max-width: 173px;min-width:103px!important;border-radius: 12px!important;
      }
    }
  }
  .product_image{
    flex-wrap: wrap;
    .small_image.el-form-item{
      margin-right:56px!important;
    }
  }
  .desc_product{
    flex-wrap: wrap;
    .el-form-item__content{
      margin-right:23px!important;
    }
    .el-textarea__inner{
      width:676px!important;
      height:173px!important;
    }
    .file-upload-container{
      .video_up_Box{
        width:447px!important;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .addEditProduct{
    .desc_product{
      .el-textarea__inner{
        width:100% !important;
      }
      .file-upload-container{
        .video_up_Box{
          width:100% !important;
        }
      }
    }
  }
}
</style>
