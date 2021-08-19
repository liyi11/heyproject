<template>
  <section class="xm-content editPass">
    <section>
      <p class="ft18 marginBottom20">修改您的用户密码</p>
    </section>
    <el-form ref="form"
             :model="form" :rules="rules"
             label-position="left"
             label-width="100%" :inline-message="false">
      <el-form-item  prop="password">
        <el-input v-model="form.password" type="password" :show-password="true" clearable placeholder="请输入用户密码" />
      </el-form-item>
    </el-form>
    <div class="xm-footer">
      <el-button @click="saves('form')" class="saves">
        确定
      </el-button>
      <el-button size="mini" @click="close" class="close">
        取消
      </el-button>
    </div>
  </section>
</template>

<script>
export default {
  components:{
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
        password:'',
      },
      rules: {
        password: [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
  },
  created() {
    console.log(this.row)
    console.log(this.row.id)
  },
  methods: {
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
            // this.$parent.$parent.editFlag = !this.$parent.$parent.editFlag;
            // this.$layer.close(this.layerid);
            // this.$message({ message: '操作成功', type: 'success' })
        } else {
          this.$refs[formName].validate()
        }
      })
    },
    close() {
      this.$layer.close(this.layerid)
    }
  }
}
</script>
<style lang="scss" scoped>
 .editPass {
   .addEdit-form{
     .el-input__inner{
       color: #fff!important;
     }
   }
 }
</style>
