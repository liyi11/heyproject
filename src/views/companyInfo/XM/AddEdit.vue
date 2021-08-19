<template>
  <section class="xm-content addEditCompany">
    <el-form ref="form"
             class="addEdit-form"
             v-loading="box_loading"
             :model="form" :rules="rules"
             :inline="true"
             label-width="90px" >
      <el-form-item label="品牌名称:" prop="build_brand" class="flex_box">
        <el-input v-model="form.build_brand"
                  @change="change_build_brand"
                  clearable placeholder="请输入品牌名称" />
      </el-form-item>
      <el-form-item label="品牌标志" prop="brand_logo" class="flex_box brand_logo">
        <x-upload ref="imgupload" :filelist="fileInit1" :limit="1" :is-show="false"
                  img-size="size56" @backList="backList1"/>
      </el-form-item>
      <el-form-item label="联系电话" prop="company_phone_number" class="phone_number flex_box">
        <el-input   @change="change_company_phone_number" v-model.number="form.company_phone_number" clearable placeholder="请输入联系电话">
          <template slot="prepend">
            <div @click="show_nation_info" class="company_number">
              <p class="label">
                <img :src="current_national.image" alt="">
                <span class="down"></span>
                <span class="phone_prefix">{{current_national.phone_prefix}}</span>
              </p>
              <div class="mask" v-if="show_nation_info_flag" >
                <div v-for="(item,index) in national_info_list" :key="index" @click="change_nation_info(item)" >
                  <div class="wrap" :class="current_national.phone_prefix == item.phone_prefix?'selected':''">
                    <div class="wrap select_and">
                      <p class="select_cirl" :class="current_national.phone_prefix == item.phone_prefix?'select_cirl_selected':''"></p>
                      <p class="name">
                        {{item.name}}
                      </p>
                    </div>
                    <img :src="item.image" alt="" height="20" >
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="联系邮箱" prop="company_email" class="flex_box">
        <el-input v-model="form.company_email" @change="change_company_email" clearable placeholder="请输入联系邮箱" />
      </el-form-item>
      <el-row :span="24" >
        <el-col :span="12">
          <el-form-item label="分类" prop="classification_id_list" class="classification_id_list">
            <el-select
                @change="change_classification_id_list"
                v-model="form.classification_id_list"
                clearable
                filterable
                multiple
                placeholder="请选择分类"
            >
              <el-option :label="item.classification_name" :value="item.id"
                         v-for="(item, index) in classificationList" :key="index" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span ="24">
        <div class="flex" style="max-width: 100%;flex-wrap: wrap!important;">
          <el-form-item label="公司介绍" prop="introduction" class="introduction">
            <el-input  type="textarea" resize="none" rows="8"
                       v-model="form.introduction"
                       @change="change_introduction"
                       clearable placeholder="填写您需要展示的公司信息…" />
          </el-form-item>
          <el-form-item
              label="公司视频"
              prop="video"
              class="video"
          >
            <x-video ref="video"
                     :filevideo="fileVideo" typeval="video"
                     @videosback="file => videosback(file, 1)" classbox="video-box1"
                     :fileLabel="'添加企业宣传视频'"
                     :video_image="form.video_image">
            </x-video>
          </el-form-item>
          <el-form-item label="视频封面" prop="video_image" class="video_image">
            <x-upload ref="imgupload" :filelist="fileInit2" :limit="1" :is-show="false"
                      img-size="size201" @backList="backList2" :fileLabel="'视频封面'"/>
          </el-form-item>
        </div>
      </el-row>
    </el-form>
    <div class="xm-footer">
      <c-button>
        <span @click="saves('form')" class="saves">保存</span>
      </c-button>
    </div>
  </section>
</template>

<script>
import {
  getManufacturer,
  getClassification,
  postManufacturer,
  putManufacturer,
  get_national_info
} from '@/api/xapi'

export default {
  components:{
    CButton: () => import('@/components/CButton'),
    XUpload: () => import('@/components/XUpload/indexAws'),
    XVideo: () => import('@/components/XVideo/indexAws'),
  },
  data() {
    return {
      box_loading: false,
      btn_loading: false,
      form: {
        company_phone_number:'',
        company_email:'',
        introduction:'',
        video:'',
        video_image:'',
        build_brand:'',
        brand_logo:'',
        classification_id_list:[],
      },
      rules: {
        company_phone_number: [{ required: true, message: '必填', trigger: 'blur' }],
        company_email: [{ required: true, message: '必填', trigger: 'blur' }],
        introduction: [{ required: true, message: '必填', trigger: 'blur' }],
        video: [{ required: true, message: '必传', trigger: 'blur' }],
        video_image: [{ required: true, message: '必传', trigger: 'blur' }],
        build_brand: [{ required: true, message: '必填', trigger: 'blur' }],
        brand_logo: [{ required: true, message: '必传', trigger: 'blur' }],
        classification_id_list: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      edit_quantity:false,
      classificationList:[],//分类
      fileInit1:[],
      fileInit2:[],
      fileVideo:[],
      row:{},
      edit_company_phone_number:false,
      edit_company_email:false,
      edit_introduction:false,
      edit_video:false,
      edit_video_image:false,
      edit_build_brand:false,
      edit_brand_logo:false,
      edit_classification_id_list:false,
      national_info_list:[],
      show_nation_info_flag:false,
      current_national:{
        image:'',
        name:'',
        phone_prefix:'+86'
      }
    }
  },
  created() {
    this.get_national_info();
    this.getClassification();
    this.getManufacturer();
  },
  methods: {
    change_nation_info(item){
      this.current_national = JSON.parse(JSON.stringify(item));
    },
    show_nation_info(){
      this.show_nation_info_flag = !this.show_nation_info_flag;
    },
    async get_national_info(){
      const res = await get_national_info()
      this.national_info_list = res.data;
    },
    async getManufacturer(){
      const res = await getManufacturer({})
      if(res.data.id){
        this.fileInit1 = [{
          name: res.data.brand_info.brand_logo,
          url: res.data.brand_info.brand_logo
        }]
        this.fileInit2 = [{
          name: res.data.video_image,
          url: res.data.video_image
        }]
        this.fileVideo = [{
          name: res.data.video,
          url: res.data.video
        }]
        this.row = JSON.parse(JSON.stringify(res.data));
        //赋值
        if(res.data.phone_prefix){
          this.current_national.phone_prefix = res.data.phone_prefix.indexOf('+') == -1 ?
              '+'+res.data.phone_prefix:res.data.phone_prefix;
          this.national_info_list.map(item =>{
            if(item.phone_prefix == this.current_national.phone_prefix){
              this.current_national = JSON.parse(JSON.stringify(item));
            }
          })
        }
        this.form.company_phone_number = res.data.phone_number;
        this.form.company_email = res.data.company_email;
        this.form.introduction = res.data.introduction;
        this.form.company_email = res.data.company_email;
        this.form.video = res.data.video;
        this.form.video_image = res.data.video_image;
        this.form.build_brand = res.data.brand_info.build_brand;
        this.form.brand_logo = res.data.brand_info.brand_logo;
        if(res.data.brand_info.classification_list &&
          res.data.brand_info.classification_list.length>0){
          res.data.brand_info.classification_list.map(item=>{
            this.form.classification_id_list.push(item.id);
          })
        }
      }else{
        this.national_info_list.map(item =>{
          if(item.phone_prefix == this.current_national.phone_prefix){
            this.current_national = JSON.parse(JSON.stringify(item));
          }
        })
      }
    },
    async getClassification(){
      const obj = {
        level:'2'
      }
      const res = await getClassification(obj)
      this.classificationList = res.data;
    },
    change_company_phone_number(){
      this.edit_company_phone_number = true;
    },
    change_company_email(){
      this.edit_company_email = true;
    },
    change_introduction(){
      this.edit_introduction = true;
    },
    change_build_brand(){
      this.edit_build_brand = true;
    },
    change_classification_id_list(){
      this.edit_classification_id_list = true;
    },

    backList1(file) {
      if (String(file) === '') {
        this.fileInit1 = []
        this.form.brand_logo = ''
      } else {
        this.fileInit1 = file
        this.form.brand_logo = file[0].name
      }
    },
    backList2(file) {
      if (String(file) === '') {
        this.fileInit2 = []
        this.form.video_image = ''
      } else {
        this.fileInit2 = file
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
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var obj = {};
          if(this.edit_company_phone_number){
            this.$set(obj,'company_phone_number',this.current_national.phone_prefix + this.form.company_phone_number);
          }
          if(this.edit_company_email){
            this.$set(obj,'company_email',this.form.company_email)
          }
          if(this.edit_introduction){
            this.$set(obj,'introduction',this.form.introduction)
          }
          if(this.edit_classification_id_list){
            this.$set(obj,'classification_id_list',this.form.classification_id_list)
          }
          if(this.edit_build_brand){
            this.$set(obj,'build_brand',this.form.build_brand)
          }

          this.$set(obj,'video',this.form.video)
          this.$set(obj,'video_image',this.form.video_image)
          this.$set(obj,'brand_logo',this.form.brand_logo)
          this.btn_loading = true;
          let res = '';
          if(this.row.id){
            this.$set(obj,'id',Number(this.row.id))
            res = await putManufacturer(obj)
          }else{
            res = await postManufacturer(obj)
          }
          this.btn_loading = false
          if (res.code !== 200){
            this.btn_loading = false;
            return false
          }
          Object.assign(this.$data.form,res.data)
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
.addEditCompany{
  border-radius: 24px;
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
}
</style>
<style lang="scss">
.addEditCompany{
  .addEdit-form{
    .phone_number{
      .el-input__inner{
        border-radius: 0px 12px 12px 0px!important;
      }
      .el-input-group__append, .el-input-group__prepend{
        padding:0!important;
      }
      .el-input-group__prepend{
        padding:0!important;
        border-radius: 12px 0px 0px 12px!important;
        border-right: 0!important;
      }
    }
    .el-input__inner{
      background: #1C1C1E!important;
    }
    .el-input-group__prepend{
      background: #1C1C1E!important;
    }
    .flex_box{
      .el-form-item__label{
        margin-right: calc(100% - 102px) !important;
      }
    }
    .flex_box.el-form-item{
      width: 346px!important;
      margin-right:16px!important;
    }
    .flex_box.el-form-item:nth-child(4){
      margin-right:0px!important;
    }
    .classification_id_list{
      .el-form-item__label{
        width:60px!important;
        margin-right: calc(100% - 72px) !important;
      }
      .el-form-item__content{
        width: 708px!important;
      }
    }
    .introduction{
      .el-form-item__label{
        margin-right: calc(100% - 102px) !important;
      }
      .el-form-item__content{
        width: 708px!important;
        margin-right:23px!important;
      }
      .el-textarea__inner{
        padding:15.5px!important;
      }
    }
    .video{
      .el-form-item__label{
        margin-right: calc(100% - 102px) !important;
      }
      .el-form-item__content{
        width: 549px!important;
      }
    }
    .video_image{
      .el-form--inline .el-form-item{
        margin-right:0px!important;
      }
      .el-form-item__label{
        margin-right: calc(100% - 102px) !important;
      }
      .el-form-item__content{
        width: 133px!important;
        margin-left:23px!important;
      }
    }
  }
}
</style>
