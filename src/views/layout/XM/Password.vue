<template>
  <section class="xm-content changePassword">
    <el-form ref="form"
             v-loading="box_loading"
             :model="form" :rules="rules"
             >
      <el-form-item label="密码" prop="passwordone">
        <el-input v-model="form.passwordone" type="password" placeholder="请输入密码" :show-password="true" />
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordtwo">
        <el-input v-model="form.passwordtwo" type="password" placeholder="请确认密码" :show-password="true" />
      </el-form-item>
    </el-form>
    <div class="xm-footer">
      <el-button type="primary" size="mini" :loading="btn_loading" @click="saves('form')">确 定</el-button>
      <el-button type="info" size="mini" @click="close">关 闭</el-button>
    </div>
  </section>
</template>

<script>
import { updPassword } from '@/api/user'
export default {
  props: {
    layerid: {
      default: 0
    },
    row: {
      default: {}
    }
  },
  data() {
    return {
      box_loading: false,
      btn_loading: false,
      form: {
        passwordone: '',
        passwordtwo: '',

      },
      rules: {
        passwordone: [{ required: true, message: '必填', trigger: 'blur' }],
        passwordtwo: [{ required: true, message: '必填', trigger: 'blur' }]
      },
    }
  },
  methods: {
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if(this.form.passwordone !== this.form.passwordtwo) {
            this.$message({ message: '两次密码输入不一致！', type: 'error' })
            return false
          }
          this.btn_loading = true
          const obj = {
            password:this.form.passwordone,
          }
          const res = await updPassword(obj)
          this.btn_loading = false
          if (res.code !== 200) return false
          Object.assign(this.$data, this.$options.data())
          this.$layer.close(this.layerid)
          this.$message({ message: '密码修改成功, 请登陆。', type: 'success',duration:1000 })
          setTimeout(() => { this.$parent.logout() }, 1000)
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

<style lang="scss">
   .changePassword{
     text-align: left!important;
   }
</style>
