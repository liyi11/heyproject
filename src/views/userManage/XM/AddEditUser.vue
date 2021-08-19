<template>
  <section class="xm-content addeditUser">
    <el-form ref="form"
             class="addEdit-form"
             v-loading="box_loading"
             :model="form" :rules="rules"
             label-position="left"
             label-width="100%" :inline-message="false">
      <el-row :span="24">
         <el-col :span="11">
           <el-form-item label="用户名称" prop="name">
             <el-input  @change="changeName" v-model.trim="form.name" clearable placeholder="请输入用户名称" />
           </el-form-item>
         </el-col>
        <el-col :span="2">
          <span style="color:transparent">1</span>
        </el-col>
        <el-col :span="11">

          <el-form-item label="密码" prop="password"  :class="row && row.id?'password_wrap':''">
            <el-input :disabled="row.id ?true:false" v-model.trim="form.password"
                      clearable placeholder="请输入密码" type="password" show-password>
              <template slot="append" v-if="row && row.id">
                <p @click="editPass" class="editPass">
                  修改
                </p>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="11">
          <el-form-item label="用户组">
            <el-select  @change="changeRole" v-model.trim="form.role_id"
                       clearable filterable
                       placeholder="请选择用户组">
              <el-option v-for="(item,index) in roleList" :key="index"
                         :value="item.id" :label="item.role_name" >
                <p class="select_and"><span class="select_cirl"></span><span>{{item.role_name}}</span></p>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
             <span style="color:transparent">1</span>
        </el-col>
        <el-col :span="11">
          <el-form-item label="电话号码" prop="phone_number" class="phone_number">
            <el-input   @change="changePhone" v-model.number="form.phone_number" clearable placeholder="请输入电话号码">
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
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="11">
          <el-form-item label="邮箱地址" prop="email">
            <el-input @change="changeEmail" v-model.trim ="form.email" clearable placeholder="请输入邮箱地址" />
          </el-form-item>
        </el-col>
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
import { postUser,putUser,getUserRole,get_national_info } from '@/api/xapi'
import EditPass from './editPass'
export default {
  components:{
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
        email:'',
        name:'',
        phone_number:'',
        password:'',
        role_id:'',
      },
      rules: {
        email: [{ required: true, message: '必填', trigger: 'blur' }],
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        phone_number: [{ required: true, message: '必填', trigger: 'blur' }],
        password: [{ required: true, message: '必填', trigger: 'blur' }],
        role_id: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      roleList:[],
      editName:false,
      editEmail:false,
      editPhone_number:false,
      editRole_id:false,
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
    this.getUserRole();
    if(this.row.id){
      this.form.email = this.row.email;
      this.form.name = this.row.name;
      this.form.phone_number = this.row.phone_number;
      this.form.role_id = this.row.role_info && this.row.role_info.id ? this.row.role_info.id:'';
      this.form.password = '11111111'
      if(this.row.phone_prefix){
        this.current_national.phone_prefix = this.row.phone_prefix.indexOf('+') == -1 ?
            '+'+this.row.phone_prefix:this.row.phone_prefix;
      }
    }
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
      this.national_info_list.map(item =>{
        if(item.phone_prefix == this.current_national.phone_prefix){
          this.current_national = JSON.parse(JSON.stringify(item));
        }
      })
    },
    async getUserRole(){
      let obj={
        page:1,
        num: 10000,
      }
      const{ data } = await getUserRole(obj)
      this.roleList = data;
    },
    changeName(){
      this.editName= true;
    },
    changeEmail(){
      this.editEmail = true;
    },
    changeRole(){
      this.editRole_id = true;
    },
    changePhone(){
      this.editPhone_number= true;
    },
    //密码弹窗
    editPass(){
      this.$layer.iframe({
        shadeClose:false,
        content: {
          content: EditPass,
          parent: this,
          data: {
            row:this.row
          },
        },
        maxmin: true,
        area: ['347px', '192px'],
      })
    },
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var obj = {};
          if(this.editName){
            this.$set(obj,'name',this.form.name)
          }
          if(this.editEmail){
            this.$set(obj,'email',this.form.email)
          }
          if(this.editPhone_number){
            this.$set(obj,'phone_number',this.current_national.phone_prefix + this.form.phone_number);
          }
          if(this.editRole_id){
            this.$set(obj,'role_id',this.form.role_id)
          }
          this.btn_loading = true;
          let res = '';
          if(this.row.id){
            this.$set(obj,'id',this.row.id)
            res = await putUser(obj)
          }else{
            this.$set(obj,'password',this.form.password)
            res = await postUser(obj)
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
<style lang="scss">
 .intl-tel-input-container{
   color:#fff!important;
   .flag-list-box{
     //z-index: 9999999;
     background: #fff;
     height:200px!important;
   }
   .area-codeNum{
     padding:0 10px!important;
   }
   .tran{
     border-color:#fff transparent transparent;
   }
 }
 .addeditUser{
   .addEdit-form{
     .phone_number{
       .el-input__inner{
         border-radius: 0px 12px 12px 0px!important;
       }
       .el-input-group__prepend{
         border-radius: 12px 0px 0px 12px!important;
         border-right: 0!important;
         padding:0!important;
       }
     }
     .password_wrap{
       .el-input__inner{
         border-radius: 12px 0px 0px 12px!important;
         border-right: 0!important;
       }
       .el-input-group__append, .el-input-group__prepend{
         padding:0!important;
       }
       .el-input-group__append{
         padding:0!important;
         border-radius: 0px 12px 12px 0px !important;
         color: #1D1D1F!important;
         font-size: 18px;
         font-weight: 400!important;
         border-left: 0!important;
       }
       .editPass{
         cursor: pointer;
         text-align: center;
         border-radius: 12px;
         background: #ccc;
         width: 147px;
         height: 54px;
         line-height: 54px;
       }
     }
   }
 }


</style>
