<template>
  <section class="xm-content addEditNode">
    <section class="addTitle">
      <c-title>
            <span slot="secTxt" class="secTxt">
               添加模板
            </span>
      </c-title>
    </section>
    <section class="line"></section>
    <el-form ref="form"
             class="addEdit-form"
             v-loading="box_loading"
             :model="form" :rules="rules"
             label-position="left"
             label-width="100px" :inline-message="true">
      <el-row :span="24">
        <el-col :span="11">
          <el-form-item label="模板名称" prop="name" class="name_desc">
            <el-input  @change="changeName" v-model="form.name" clearable placeholder="请填写内容" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="11">
          <el-form-item label="描述" prop="desc" class="name_desc">
            <el-input  @change="changeDesc" v-model="form.desc" clearable placeholder="请填写内容" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24" class="flex_Box">
        <section  class="flex_box" v-for="(item, index) in form.nodes" :key="index">
          <section class="item-wrap">
            <section class="item-box">
              <div class="label_title add_item">
                <p class="title">溯源节点</p>
                <div class="add_item_box">
                  <img src="../../../assets/images/add.png" alt="add" @click="add_item"
                       class="p_add">
                  <img src="../../../assets/images/sub.png" alt="add"
                       @click="sub_item(index)" class="p_sub">
                </div>
              </div>
              <el-row :span="24">
                <el-col :span="11">
                  <div class="margint20b14 label_title">
                    <p>节点编号</p>
                  </div>
                  <el-form-item :prop="'nodes.' + index + '.node_number'"
                                :rules="[{ required: true, message: '必填', trigger: 'blur' }]"
                                class="marginBot0"
                  >
                    <el-input  v-model.number="item.node_number" clearable placeholder="请输入节点编号" />
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <span style="color:transparent">1</span>
                </el-col>
                <el-col :span="11">
                  <div class="margint20b14 label_title">
                    <p>用户组</p>
                  </div>
                  <el-form-item :prop="'nodes.' + index + '.group_id'"
                                :rules="[{ required: true, message: '必填', trigger: 'blur' }]"
                                class="marginBot0"
                  >
                    <el-select  v-model="item.group_id"
                                clearable filterable
                                placeholder="请选择用户组">
                      <el-option v-for="item in roleList" :key="item.id"
                                 :value="item.id" :label="item.role_name" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="margint20b14 label_title">
                <p>节点内容</p>
              </div>
              <el-form-item :prop="'nodes.' + index + '.node_content'"
                            :rules="[{ required: true, message: '必填', trigger: 'blur' }]"
              >
                <el-input  type="textarea" resize="none" rows="4"
                           class="marginBot0"
                           v-model="item.node_content" clearable placeholder="请填写内容" />
              </el-form-item>
              <div class="margint20b14 label_title">
                <p>图片</p>
              </div>
              <el-form-item :prop="'nodes.' + index + '.image'"
                            :rules="[{ required: true, message: '必填', trigger: 'blur' }]"
                            class="img_box"
              >
                <x-upload
                    :ref="'imgupload' + index" :filelist="item.fileInit"
                     :limit="1" :is-show="false"
                    img-size="size40" @backList="file => backList(file, index)"/>
              </el-form-item>
              <p class="ft12" style="color:#B2B3BD;font-weight:400;line-height:1.5;text-align: right">* 请选择正方形JPG或PNG格式图片，图片大小200kb～500kb以内即可</p>
            </section>
          </section>
        </section>
      </el-row>
    </el-form>
    <div class="xm-footer">
      <c-button>
        <span @click="saves('form')" class="saves">保存</span>
        <span  size="mini" @click="close" class="close">取消</span>
      </c-button>
    </div>
  </section>
</template>

<script>
import { postLabel_node_template, putLabel_node_template,getMinUserRole} from '@/api/xapi'
import { management_module_list } from '@/api/map'
export default {
  components:{
    CTitle: () => import('@/components/CTitle/index'),
    CButton: () => import('@/components/CButton'),
    XUpload: () => import('@/components/XUpload/indexAwsProduct'),
  },
  props: {
    row:{
      default:{}
    }
  },
  data() {
    return {
      area_codeNum: 86,
      box_loading: false,
      btn_loading: false,
      form: {
        name:'',
        desc:'',
        nodes:[],
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        desc: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      editName:false,
      editDesc:false,
      management_module_list:management_module_list,//管理模块列表
      fileInit:[],
      currentImage:0,
      roleList:[]
    }
  },
  created() {
    this.getMinUserRole();
    if(this.row.id){
      this.form.name = this.row.name;
      this.form.desc = this.row.desc;
      if(this.row.label_node_info&&this.row.label_node_info.length>0){
        this.form.nodes  = this.row.label_node_info.map(item => {
          item.fileInit = [{name: item.image, url: item.image}]
          item.group_id = item.group_info.id
          return item
        })
      }else{
        this.form.nodes.push(
            {
              node_number:'',
              image:'',
              node_content:'',
              group_id:'',
            }
        )
      }
    }else{
      this.form.nodes.push(
          {
            node_number:'',
            image:'',
            node_content:'',
            group_id:'',
          }
      )
    }
  },
  methods: {
    async getMinUserRole(){
      const{ data } = await getMinUserRole({})
      this.roleList = data;
    },
    backList(file, index) {
      if (String(file) === '') {
        this.form.nodes[index].fileInit = []
        this.form.nodes[index].image = ''
      } else {
        // this.form.nodes[index].fileInit = file
        this.form.nodes[index].image = file[0].name
      }
    },
    add_item(){
      this.form.nodes.push({
        node_number:'',
        image:'',
        node_content:'',
        group_id:'',
      })
    },
    sub_item(index){
      if(this.form.nodes.length === 1) {
        this.$message({ message: '至少一项', type: 'warning',duration:2000 })
        return false
      }
      const j = this.form.nodes.findIndex((item, ind) => ind === index)
      this.form.nodes.splice(j, 1)
    },
    changeName(){
      this.editName = true;
    },
    changeDesc(){
      this.editDesc = true;
    },
    /* 添加、编辑 */
    saves(formName) {
        this.$refs[formName].validate(async valid => {
        if (valid) {
          var obj = {};
          if(this.editName){
            this.$set(obj,'name',this.form.name)
          }
          if(this.editDesc){
            this.$set(obj,'desc',this.form.desc)
          }
          this.$set(obj,'nodes',this.form.nodes)
          this.btn_loading = true;
          this.btn_loading = true;
          let res = '';
          if(this.row.id){
            this.$set(obj,'id',String(this.row.id))
            res = await putLabel_node_template(obj)
          }else{
            res = await postLabel_node_template(obj)
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
          this.$message({ message: '操作成功', type: 'success',duration:1000 });
          if(this.$parent.backFlag){
            this.$router.push({path:'/codeManage/codeApply',query: {
                editFlag:true,
              }})
            sessionStorage.setItem('template_id',res.data.id)
          }
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
.addEditNode{
  .addTitle{
    margin-bottom: 30px;
  }
  .line{
    width:100%;
    border-top:1px solid #FFBD2F;
    margin-bottom: 30px;
  }
  .margint20b14{
    margin-top:20px;
    margin-bottom: 14px;
  }
  .label_title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #B2B3BD !important;
    font-size: 14px!important;
    p.title{
      font-family: PingFang HK;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      color: #FFFFFF;
      margin:7px 0 5px 0!important;
    }
    .add_item_box {
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width:24px;
        height: 24px;
        cursor: pointer;
      }
      .p_add {
        margin-right: 8px;
      }
    }
  }
  .el-checkbox-group{
    background: #0D0E0F;
    padding-left:15px;
    border-radius:4px;
  }
  .flex_Box{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 600px;
    overflow-y: scroll;
    .flex_box{
      width:49%;
      .add_item{
        width:100%;
      }
      .item-wrap{
        width:100%;
        background: #0D0E0F;
        border-radius: 14px;
        margin-bottom: 20px;
        .item-box{
          padding:28px;
          .label_title.add_item{
            padding:0!important;
            width:auto!important;
          }
        }
      }
    }
    .flex_box:nth-child(2n-1){
      margin-right: 40px;
      width:calc(49% - 40px);
    }
    .flex_box:nth-child(2n){
      width:49%;
    }
  }
  .flex_Box::-webkit-scrollbar {
    display: none;
  }
  .flex_Box::-webkit-scrollbar { width: 0 !important }
  .flex_Box { -ms-overflow-style: none; }
  .flex_Box { overflow: -moz-scrollbars-none; }

}
</style>
<style lang="scss">
   .addEditNode {
     .addEdit-form{
       .el-input__inner{
         height:48px!important;
         line-height: 48px!important;
       }
       .name_desc.el-form-item{
         .el-form-item__label {
           width: auto !important;
           color: #fff!important;
           padding:0!important;
           line-height: 48px!important;
         }
         .el-form-item__content {
           width: auto !important;
           margin-left: 110px !important;
           line-height: 48px!important;
         }
       }
       .marginBot0.el-form-item{
         margin-bottom: 0!important;
       }
     }
     .el-upload--picture-card{
       min-width:166px!important;
       margin-right: 15px!important;
     }
     .upload-container{
       .upload-view{
          border-radius: 12px!important;
          margin-right: 15px!important;
         .view-item{
           img{
             border-radius: 12px!important;
           }
         }
       }
     }
   }


</style>
