<template>
  <section class="xm-content addEditRule">
    <section class="addTitle">
      <c-title>
            <span slot="secTxt" class="secTxt">
               抽奖规则设置
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
          <el-form-item label="规则名称" prop="rule_name">
            <el-input  @change="changeRuleName" v-model="form.rule_name" clearable placeholder="请输入规则名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="11">
          <el-form-item label="描述">
            <el-input  @change="changeDes" v-model="form.des" clearable placeholder="请输入描述" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="11">
          <el-form-item label="奖品总数" prop="total_num">
            <el-input  @change="change_total_num" v-model.number="form.total_num"  clearable placeholder="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="24" >
          <el-form-item label="活动时间">
            <div class="flex flex_box">
              <el-form-item prop="start_time">
                <el-date-picker v-model="form.start_time" type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="startTime"
                                @change="change_start_time"
                                placeholder="请选择开始日期">
                </el-date-picker>
              </el-form-item>
              <p class="marginRight10" style="width:22px;">--</p>
              <el-form-item prop="end_time">
                <el-date-picker v-model="form.end_time" type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                format="yyyy-MM-dd HH:mm:ss"
                                @change="change_end_time"
                                :picker-options="endTime"
                                placeholder="请选择结束日期">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="11">
          <el-form-item label="中奖率" class="add_item_btn">
            <p @click="add_item"><span>添加奖品</span></p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="24">
          <el-form-item label="">
            <div class="add_Box">
              <div class="add_item_box" v-for="(item,index) in form.awards_info" :key="index">
                <div class="add_item">
                  <el-form-item label="奖品" :prop="'awards_info.' + index + '.categories'"
                                :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                    <el-select  v-model="item.categories"
                                filterable
                                placeholder="请选择奖品">
                      <el-option v-for="(item,index) in turntable_lottery_category" :key="index"
                                 :value="item.value" :label="item.label" >
                        <p class="select_and"><span class="select_cirl"></span><span>{{item.label}}</span></p>
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <div v-if="item.categories == '2'">
                    <el-form-item label="红包个数" :prop="'awards_info.' + index + '.quantity'"
                                  :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                      <el-input
                          v-model.number="item.quantity"
                          clearable placeholder="请输入红包个数" />
                    </el-form-item>
                    <el-form-item label="单个红包金额">
                      <div class='add_item_item flex'>
                        <el-form-item  :prop="'awards_info.' + index + '.min_money'"
                                       :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                          <el-input   v-model="item.min_money" clearable placeholder="最小金额" />
                        </el-form-item>
                        <span class="ft14 marginlr10">至</span>
                        <el-form-item :prop="'awards_info.' + index + '.max_money'"
                                      :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                          <el-input  v-model="item.max_money" clearable placeholder="最大金额" />
                        </el-form-item>
                        <span class="ft14 marginLeft10">元</span>
                      </div>
                    </el-form-item>
                  </div>
                  <el-form-item v-if="item.categories == '1'"
                                label="单次中奖积分" :prop="'awards_info.' + index + '.point_num'"
                                :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                    <el-input
                        v-model="item.point_num"
                        clearable placeholder="请输入单次中奖积分" />
                  </el-form-item>
                  <el-form-item v-if="item.categories == '0'"
                      label="自定义奖品" :prop="'awards_info.' + index + '.award_name'"
                                :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                    <el-input
                        v-model="item.award_name"
                        clearable placeholder="请输入自定义奖品" />
                  </el-form-item>
                  <el-form-item label="奖品数量" v-if="item.categories != '2'"
                                :prop="'awards_info.' + index + '.quantity'"
                                 :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                    <el-input   v-model.number="item.quantity" clearable placeholder="请输入奖品数量" />
                  </el-form-item>
                </div>
                <div class="delete" @click="sub_item(index)"><span>×</span></div>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="11">
          <el-form-item label="红包总金额" prop="total_money" :rules="[{ required: redEnvelopFlag?false:true, message: '必填', trigger: 'blur' }]">
            <el-input  @change="change_total_money" v-model="form.total_money"  :disabled="redEnvelopFlag" clearable placeholder="请输入红包总金额" />
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
import {
  postCodeAwordRule, putCodeAwordRule
} from '@/api/xapi'
import {turntable_lottery_category} from "@/api/map";
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
  watch:{
    form:{//深度监听，可监听到对象、数组的变化
      handler(val){
        this.redEnvelopMap = [];
        val.awards_info.map(item=>{
          this.redEnvelopMap.push(String(item.categories));
          if(this.redEnvelopMap.includes('2')){
            this.redEnvelopFlag = false;
          }else{
            this.redEnvelopFlag = true;
          }
        })
      },
      deep:true //true 深度监听
    },
    redEnvelopFlag:{
      handler(val){
        if(val){
          this.form.total_money = 0;
          this.edit_total_money = true;
        }
      },
      deep:true //true 深度监听
    }
  },
  data() {
    return {
      turntable_lottery_category:turntable_lottery_category,
      box_loading: false,
      btn_loading: false,
      startTime: {// 时间判断
        disabledDate: time => {
          let endDateVal = this.form.end_time;
          if (endDateVal) {  return time.getTime() > new Date(endDateVal).getTime()}
        }
      },
      endTime: {
        disabledDate: time => {
          let beginDateVal = this.form.start_time;
          if (beginDateVal) { return time.getTime() < new Date(beginDateVal).getTime()}
        }
      },
      form: {
        rule_name:'',
        des:'',
        start_time:'',
        end_time:'',
        total_num:'',//奖品总数
        total_money:'',
        awards_info:[]
      },
      rules: {
        rule_name: [{ required: true, message: '必填', trigger: 'blur' }],
        total_money: [{ required: true, message: '必填', trigger: 'blur' }],
        start_time: [{ required: true, message: '必选', trigger: 'blur' }],
        end_time: [{ required: true, message: '必选', trigger: 'blur' }],
        awards_info: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      editRuleName:false,
      editDes:false,
      edit_end_time:false,
      edit_start_time:false,
      redEnvelopFlag:true,//是否有红包
      redEnvelopMap:[]
    }
  },
  created() {
    if(this.row.id){
      this.form.total_num = this.row.total_num;
      this.form.rule_name = this.row.rule_name;
      this.form.des = this.row.des;
      this.form.total_money = this.row.total_money;
      this.form.start_time = new Date(this.row.start_time);
      this.form.end_time = new Date(this.row.end_time);
      if(this.row.turntable_lottery_award_info.length>0){
        this.row.turntable_lottery_award_info.map(item =>{
          let newItem = {
            award_name:String(item.award_name),
            categories:String(item.categories),
            quantity:Number(item.quantity),
            min_money:Number(item.min_money),
            max_money:Number(item.max_money),
            point_num:Number(item.point_num),
          }
          this.form.awards_info.push(newItem);
        })
      }
    }
    if(this.form.awards_info.length==0){
      this.form.awards_info.push({
        award_name:'',
        categories:'2',
        quantity:'',
        min_money:'',
        max_money:'',
        point_num:'',
      })
    }
  },
  methods: {
    awards_info(){
      console.log(333)
    },
    add_item(){
      this.form.awards_info.push({
        award_name:'',
        categories:'2',
        quantity:'',
        min_money:'',
        max_money:'',
        point_num:'',
      })
    },
    sub_item(index){
      if(this.form.awards_info.length === 1) {
        this.$message({ message: '至少一项', type: 'warning',duration:2000 })
        return false
      }
      const j = this.form.awards_info.findIndex((item, ind) => ind === index)
      this.form.awards_info.splice(j, 1)
    },
    changeRuleName(){
      this.editRuleName = true;
    },
    changeDes(){
      this.editDes = true;
    },
    change_start_time(){
      this.edit_start_time = true;
    },
    change_end_time(){
      this.edit_end_time = true;
    },
    change_total_money(){
      this.edit_total_money = true;
    },
    change_total_num(){
      this.edit_total_num = true;
    },
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var obj = {};
          if(this.editRuleName){
            this.$set(obj,'rule_name',this.form.rule_name);
          }
          if(this.editDes){
            this.$set(obj,'des',this.form.des);
          }
          if(this.edit_total_money){
            this.$set(obj,'total_money',Number(this.form.total_money));
          }
          if(this.edit_total_num){
            this.$set(obj,'total_num',Number(this.form.total_num));
          }
          if(this.edit_start_time){
            this.$set(obj,'start_time',this.form.start_time);
          }
          if(this.edit_end_time){
            this.$set(obj,'end_time',this.form.end_time);
          }
          let arr = [];
          if(this.form.awards_info.length>0){
            this.form.awards_info.map(item =>{
              let newItem = {
                award_name:String(item.award_name),
                categories:Number(item.categories),
                quantity:Number(item.quantity),
                min_money:Number(item.min_money),
                max_money:Number(item.max_money),
                point_num:Number(item.point_num),
              }
              arr.push(newItem);
            })
            this.$set(obj,'awards_info',arr);
          }
          this.btn_loading = true;
          let res = '';
          if(this.row.id){
            this.$set(obj,'id',Number(this.row.id))
            res = await putCodeAwordRule(obj)
          }else{
            res = await postCodeAwordRule(obj)
          }
          this.btn_loading = false
          if (res.code !== 200){
            this.btn_loading = false;
            return false
          }
          Object.assign(this.$data.form, this.$options.data().form)
          setTimeout(()=>{
            this.$parent.editFlag = false;
            this.$parent.dataList=[];
            this.$parent.pages.page = 1;
            this.$parent.getList()
          },1000)
          this.$message({ message: '操作成功', type: 'success',duration:1000 });
          if(this.$parent.backFlag){
            this.$router.push({path:'/codeManage/codeApply',query: {
                editFlag:true,
              }})
            sessionStorage.setItem('turntable_lottery_rule_id',res.data.id)
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
.addEditRule{
  .addTitle{
    margin-bottom: 30px;
  }
  .line{
    width:100%;
    border-top:1px solid #FFBD2F;
    margin-bottom: 30px;
  }
  .flex_box{
    p{
      color:#B2B3BD;
      width:20px;
      text-align: center;
    }
  }
  .add_Box{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .add_item_box{
      position: relative;
      width:30%;
      min-width:405px;
      margin-right:25px;
      margin-bottom: 60px;
      background: #0D0E0F;
      border:1px solid #1D1D1F;
      border-radius: 24px;
      .add_item{
        padding:50px 20px 40px 20px;
        height:215px;
        overflow-y: scroll;
      }
      .add_item::-webkit-scrollbar {
        display: none;
      }
      .add_item::-webkit-scrollbar { width: 0 !important }
      .add_item { -ms-overflow-style: none!important; }
      .add_item { overflow: -moz-scrollbars-none!important; }
      .delete{
        cursor: pointer;
        position:absolute;
        top:-20px;
        right:20px;
        border-radius: 50%;
        font-size: 25px;
        color:#1D1D1F;
        text-align: center;
        background: #6B6B6B;
        width:36px;
        height:36px;
        line-height: 34px;
        span{
          display: inline-block;
          width:100%;
          height:100%;
        }
      }
    }
  }

}
</style>
<style lang="scss">
.addEditRule {
  .addEdit-form {
    .el-form-item__label {
      width: auto !important;
      color: #fff!important;
      padding:0!important;
    }
    .el-form-item__content {
      width: auto !important;
      margin-left: 110px !important;
    }
    .flex_box{
      .el-radio{
        margin-top:10px!important;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-radio__label{
          display: flex;
          align-items: center;
          justify-content: center;
          .el-form-item__error--inline{
            display: block!important;
          }
        }
      }
      .el-form-item__label {
        width: auto !important;
      }
      .el-form-item__content {
        max-width: 252px !important;
        margin-right: 10px!important;
        margin-left: 0px !important;
      }
    }
    .add_Box{
      .add_item_item{
        .el-form-item__label {
          width: auto !important;
        }
        .el-form-item__content {
          margin-left: 0px !important;
        }
        .el-input__inner{
          padding-left: 5px!important;
        }
      }
      .el-form-item__content{
        margin-bottom: 20px!important;
      }
      .el-input__inner{
        padding-right: 0px!important;
        background: #1D1D1F !important;
      }
    }
    .add_item_btn{
      margin-top:30px!important;
      .el-form-item__content{
        line-height: 50px!important;
        p{
          width:100px!important;
          height:48px;
          text-align: center;
          background: #FFBD2F;
          border-radius: 12px!important;
          color:rgb(13,14,15)!important;
          font-size: 16px!important;
          font-weight: 400!important;
          letter-spacing: -1px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
