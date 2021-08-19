<template>
  <section class="xm-content addEditRole">
    <section class="addTitle">
      <c-title>
            <span slot="secTxt" class="secTxt">
               添加用户组
            </span>
      </c-title>
    </section>
    <el-form ref="form"
             class="addEdit-form"
             v-loading="box_loading"
             :model="form" :rules="rules"
             label-position="left"
             label-width="100%" :inline-message="false">
      <el-row :span="24">
        <el-col :span="11">
          <el-form-item label="用户组名称" prop="role_name">
            <el-input  @change="changeroleName" v-model="form.role_name" clearable placeholder="请输入用户组名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24" class="flex_Box">
        <section  class="flex_box" v-for="(item, index) in form.role_permission_dict" :key="index">
          <div class="margintb20 label_title add_item">
            <p>模块选择</p>
            <div class="add_item_box">
              <img src="../../../assets/images/add.png" alt="add" @click="add_item"
                   class="p_add">
              <img src="../../../assets/images/sub.png" alt="add"
                   @click="sub_item(index)" class="p_sub">
            </div>
          </div>
          <section class="item-wrap">
            <section class="item-box">
              <div class="margintb20 label_title">
                <p>模块类型</p>
              </div>
              <el-form-item :prop="'role_permission_dict.' + index + '.module'"
                             :rules="[{ required: true, message: '必填', trigger: 'blur' }]"
              >
                <el-select  v-model="item.module"
                            clearable filterable
                            placeholder="请选择模块">
                  <el-option v-for="(item,index) in management_module_list" :key="index"
                             :value="item.value" :label="item.label" >
                    <p class="select_and"><span class="select_cirl"></span><span>{{item.label}}</span></p>
                  </el-option>
                </el-select>

              </el-form-item>
              <div class="margintb20 label_title">
                <p>权限类型</p>
              </div>
              <el-form-item :prop="'role_permission_dict.' + index + '.permission'"
                            :rules="[{ required: true, message: '必填', trigger: 'blur' }]"
              >
                <el-checkbox-group
                    v-model="item.permission"
                    text-color="#FFBD2F"
                    fill="#FFBD2F"
                >
                  <el-checkbox v-for="item in permission_list" :key="item.value" :label="item.value" >{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
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
import { postUserRole, putUserRole} from '@/api/xapi'
import { management_module_list,permission_list } from '@/api/map'
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
        role_name:'',
        role_permission_dict:[
          {
            module:'',
            permission:[]
          }
        ],
      },
      rules: {
        role_name: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      editRoleName:false,
      management_module_list:management_module_list,//管理模块列表
      permission_list:permission_list,// 权限列表
    }
  },
  created() {
    if(this.row.id){
      this.form.role_name = this.row.role_name;
      this.form.role_permission_dict = this.row.role_permission_info&&this.row.role_permission_info.length>0?
          this.row.role_permission_info:this.form.role_permission_dict
    }
  },
  methods: {
    add_item(){
      this.form.role_permission_dict.push({
        module:'',
        permission:[]
      })
    },
    sub_item(index){
      if(this.form.role_permission_dict.length === 1) {
        this.$message({ message: '至少一项', type: 'warning',duration:2000 })
        return false
      }
      const j = this.form.role_permission_dict.findIndex((item, ind) => ind === index)
      this.form.role_permission_dict.splice(j, 1)
    },
    changeroleName(){
      this.editRoleName = true;
    },
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var obj = {};
          if(this.editRoleName){
            this.$set(obj,'role_name',this.form.role_name)
          }
          this.$set(obj,'role_permission_dict',this.form.role_permission_dict)
          this.btn_loading = true;
          let res = '';
          if(this.row.id){
            this.$set(obj,'id',String(this.row.id))
            console.log(obj);
            res = await putUserRole(obj)
          }else{
            console.log('post',obj);
            res = await postUserRole(obj)
          }
          this.btn_loading = false
          if (res.code !== 200){
            this.btn_loading = false;
            return false
          }
          Object.assign(this.$data.form, this.$options.data().form)
          setTimeout(()=>{
            this.$parent.close();
            // this.$parent.dataList=[];
            // this.$parent.pages.page = 1;
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
.addEditRole{
  .addTitle{
    margin-bottom: 20px;
  }
  .label_title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #B2B3BD !important;
    font-size: 14px!important;
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
    border-radius: 12px;
  }
  .flex_Box{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 500px;
    overflow-y: scroll;
    .flex_box{
      width:49%;
      .add_item{
        width:100%;
      }
      .item-wrap{
        width:100%;
        border:1px solid #6B6B6B;
        border-radius: 24px;
        margin-bottom: 20px;
        .item-box{
          padding:20px;
          border-radius: 24px;
          background: #1D1D1F;
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
