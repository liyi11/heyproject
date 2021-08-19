<template>
  <section class="xm-content addEditRule addEditRule_redEnve">
    <section class="addTitle">
      <c-title>
            <span slot="secTxt" class="secTxt">
               红包规则设置
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
        <el-col :span="16">
          <el-form-item label="红包类型" prop="category">
            <el-radio-group v-model="form.category" @change="change_category">
              <el-radio :label="item.value" v-for="item in red_rule_category_list" :key="item.value">
                {{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="amount_Box" v-if="form.category == '2'">
        <div class="flex amount_box">
          <p class="ft14">总金额</p>
          <el-form-item prop="amount">
            <el-input @change="change_amount" v-model="form.amount" clearable  />
          </el-form-item>
          <p class="ft14"><span style="margin-right:41px">元</span>红包个数</p>
          <el-form-item prop="num">
            <el-input   @change="change_num" v-model.number="form.num"  clearable  />
          </el-form-item>
          <p class="ft14"><span style="margin-right:41px">个</span></p>
          <p class="ft14" style="min-width: 120px">单个红包金额范围</p>
          <el-form-item prop="min_amount">
            <el-input  @change="change_min_amount"   v-model="form.min_amount" clearable placeholder="最小金额" />
          </el-form-item>
          <span class="ft14 marginRight10">至</span>
          <el-form-item prop="max_amount">
            <el-input @change="change_max_amount"  v-model="form.max_amount" clearable placeholder="最大金额" />
          </el-form-item>
          <span class="ft14 marginLeft10">元</span>
        </div>
      </el-form-item>
      <el-form-item class="amount_Box" v-else>
        <div class="flex amount_box">
          <p class="ft14">单个金额</p>
          <el-form-item prop="min_amount">
            <el-input @change="change_min_amount" v-model="form.min_amount" clearable/>
          </el-form-item>
          <p class="ft14"><span style="margin-right:41px">元</span>红包个数</p>
          <el-form-item prop="num">
            <el-input   @change="change_num" v-model.number="form.num"  clearable  />
          </el-form-item>
          <p class="ft14"><span style="margin-right:41px;">个</span><span style="font-weight: 600;font-family: PingFang HK;
font-style: normal;">总金额：<span>{{form.min_amount&& form.num? (form.min_amount * form.num).toFixed(2) +'&nbsp;元':'系统自动判定总金额'}}</span></span></p>
        </div>
      </el-form-item>
      <el-form-item label="活动时间" class="date_time">
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
          <p class="marginlr10 ft16 fontBolder">-&nbsp;-</p>
          <el-form-item prop="end_time">
            <el-date-picker v-model="form.end_time" type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="endTime"
                            @change="change_end_time"
                            placeholder="请选择结束日期">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form-item>
      <el-row :span="24">
        <el-form-item label="抽奖条件" prop="checked">
          <div class="amount_box checked">
            <el-radio-group v-model="form.checked">
              <el-radio label="1" ><span class="font_white">不限制用户参与的抽奖次数</span></el-radio>
              <div class="flex flex_box">
                <el-radio label="2" >
                  <span class="marginRight10">1个用户</span>
                  <el-form-item prop="how_many_days"
                                :rules="[{ required: form.checked=='2'?true:false, message: '必填且大于0',pattern:/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,trigger: 'blur' }]"
                  >
                    <el-input  @change="change_how_many_days" v-model="form.how_many_days"
                               clearable placeholder="多少" />
                  </el-form-item>
                  <span class="marginRight10">天，最多参与</span>
                  <el-form-item prop="how_many_nums"
                                :rules="[{ required: form.checked=='2'?true:false, message: '必填且大于0',pattern:/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, trigger: 'blur' }]">
                    <el-input  @change="change_how_many_nums" v-model="form.how_many_nums" clearable placeholder="多少" />
                  </el-form-item>
                  次
                </el-radio>
              </div>
            </el-radio-group>
          </div>
        </el-form-item>
      </el-row>
      <el-row :span="24">
        <el-col :span="24">
          <el-form-item label="扫码区域限制">
            <div class="flex flex_box add_item" v-if="form.area_list.length == 0" style="height: 48px;">
              <div class="add_item_box">
                <img src="../../../../assets/images/add.png" alt="add" @click="add_item"
                     v-if="form.area_list.length == 0" class="p_add">
                <img src="../../../../assets/images/sub.png" alt="add"
                     @click="sub_item(0)" class="p_sub">
              </div>
            </div>
            <div class="flex flex_box add_item marginBottom10 area_list" v-for="(item,index) in form.area_list" :key="index" >
              <el-form-item :prop="'area_list.' + index + '.country_obj.country_name'"
                            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                <el-select  v-model="item.country_obj"
                            value-key="country_name"
                            clearable filterable
                            @change="changeCountry($event)"
                            placeholder="请选择国家">
                  <el-option v-for="(item,index) in country_info" :key="index"
                             :value="item" :label="item.country_name" >
                    <p class="select_and"><span class="select_cirl"></span><span>{{item.country_name}}</span></p>
                  </el-option>
                </el-select>
              </el-form-item>
              <p class="marginlr10 ft16 fontBolder">-&nbsp;-</p>
              <el-form-item :prop="'area_list.' + index + '.state_obj.name'"
                            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                <el-select  v-model="item.state_obj"
                            clearable filterable
                            value-key="name"
                            @change="changeState($event)"
                            placeholder="请选择省份">
                  <el-option v-for="(item,index) in state_info" :key="index"
                             :value="item" :label="item.name"  >
                    <p class="select_and"><span class="select_cirl"></span><span>{{item.name}}</span></p>
                  </el-option>
                </el-select>
              </el-form-item>
              <p class="marginlr10 ft16 fontBolder">-&nbsp;-</p>
              <el-form-item :prop="'area_list.' + index + '.city_obj.city_name'"
                            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                <el-select  v-model="item.city_obj"
                            value-key="city_name"
                            clearable filterable
                            placeholder="请选择城市">
                  <el-option v-for="(item,index) in city_info" :key="index"
                             :value="item" :label="item.city_name" >
                    <p class="select_and"><span class="select_cirl"></span><span>{{item.city_name}}</span></p>
                  </el-option>
                </el-select>
              </el-form-item>
              <div class="add_item_box">
                <img src="../../../../assets/images/add.png" alt="add" @click="add_item"
                     v-if="index == 0" class="p_add">
                <img src="../../../../assets/images/sub.png" alt="add"
                     @click="sub_item(index)" class="p_sub">
              </div>
            </div>
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
  putCashRedRule,
  postCashRedRule,
  getArea
} from '@/api/xapi'
import { red_rule_category_list } from '@/api/map'
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
        amount:'',
        num:'',
        category:'2',
        max_amount:'',
        min_amount:'',
        start_time:'',
        end_time:'',
        how_many_days:'',
        how_many_nums:'',
        sale_agent_id:'',
        area_list:[],//["中国.上海市.上海市", “中国.重庆市.重庆市”]
        checked:'2',//抽奖条件
      },
      rules: {
        rule_name: [{ required: true, message: '必填', trigger: 'blur' }],
        amount: [{ required: true, message: '必填', trigger: 'blur' }],
        num: [{ required: true, message: '必填且大于0',pattern:/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, trigger: 'blur' }],
        category: [{ required: true, message: '必选', trigger: 'blur' }],
        min_amount: [{ required: true, message: '必填且大于0',pattern:/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, trigger: 'blur' }],
        max_amount: [{ required: true, message: '必填且大于0',pattern:/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, trigger: 'blur' }],
        start_time: [{ required: true, message: '必填', trigger: 'blur' }],
        end_time: [{ required: true, message: '必填', trigger: 'blur' }],
        checked:[{ required: true, message: '必选', trigger: 'blur' }]
      },
      editRuleName:false,
      editDes:false,
      edit_amount:false,
      edit_num:false,
      edit_category:false,
      edit_max_amount:false,
      edit_min_amount:false,
      edit_end_time:false,
      edit_start_time:false,
      edit_how_many_days:false,
      edit_how_many_nums:false,
      red_rule_category_list:red_rule_category_list,//红包规则类型
      country_info:[],
      state_info:[],
      city_info:[],
    }
  },
  created() {
    this.get_country_info();
    if(this.row.id){
      this.getArea();
      this.row.area_info.map(item=>{
        this.form.area_list.push({
          city_obj:{
            id: String(item.area_id.city_id),
            city_name:item.area.split('.')[2],
            state_id:String(item.area_id.state_id)
          },
          country_obj:{
            id:String(item.area_id.country_id),
            country_name:item.area.split('.')[0]
          },
          state_obj:{
            id: String(item.area_id.state_id),
            Countries_id:String(item.area_id.country_id),
            name:item.area.split('.')[1]
          }
        })
      });
      this.form.amount = this.row.amount;
      this.form.category = String(this.row.category);
      this.form.des = this.row.des!= null?this.row.des:'';
      this.form.start_time = new Date(this.row.start_time);
      this.form.end_time = new Date(this.row.end_time);
      if(this.row.how_many_days == -1 && this.row.how_many_nums == -1){
        this.form.checked = '1';
        this.form.how_many_days = '';
        this.form.how_many_nums = '';
      }else{
        this.form.checked = '2';
        this.form.how_many_days = this.row.how_many_days;
        this.form.how_many_nums = this.row.how_many_nums;
      }
      this.form.max_amount = this.row.max_amount;
      this.form.min_amount = this.row.min_amount;
      this.form.num = this.row.num;
      this.form.rule_name = this.row.rule_name;
    }
    this.edit_category = true;
  },
  methods: {
    add_item(){
      this.form.area_list.push({
        city_obj:{
          id: '',
          city_name:'',
          state_id:'',
        },
        country_obj:{
          id: '',
          country_name:''
        },
        state_obj:{
          id: '',
          Countries_id:'',
          name:''
        }
      })
      this.state_info = [];
      this.city_info = [];
    },
    sub_item(index){
      const j = this.form.area_list.findIndex((item, ind) => ind === index)
      this.form.area_list.splice(j, 1)
    },
    async getArea(){
      let obj= {};
      const{ data } = await getArea(obj)
      this.country_info = data.country_info;
      this.state_info = data.state_info;
      this.city_info = data.city_info;
    },
    async get_country_info(){
      let obj= {};
      const{ data } = await getArea(obj)
      this.country_info = data.country_info;
    },
    async get_state_info(country_id){
      let obj= {};
      this.$set(obj,'country_id',country_id)
      const{ data } = await getArea(obj)
      this.state_info = data.state_info;
    },
    async get_city_info(country_id,state_id){
      let obj= {};
      this.$set(obj,'country_id',country_id)
      this.$set(obj,'state_id',state_id)
      const{ data } = await getArea(obj)
      this.city_info = data.city_info;
    },
    changeCountry(e){
      if(e.id){
        this.get_state_info(e.id);
      }else{
        this.state_info=[]
      }
    },
    changeState(e){
      if(e.id){
        this.get_city_info(e.Countries_id,e.id);
      }else{
        this.city_info=[]
      }
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
    change_amount(){
      this.edit_amount = true;
    },
    change_num(){
      this.edit_num = true;
    },
    change_category(){
      this.edit_category = true;
      this.edit_min_amount = false;
      this.edit_amount = false;
      this.edit_max_amount = false;
      this.edit_num = false;
      this.form.min_amount = '';
      this.form.amount = '';
      this.form.num = '';
      this.form.max_amount = '';
    },
    change_max_amount(){
      this.edit_max_amount = true;
    },
    change_min_amount(){
      this.edit_min_amount = true;
      if(this.form.category == 1){
        console.log(this.form.max_amount)
      }
    },
    change_how_many_days(){
      this.edit_how_many_days = true;
    },
    change_how_many_nums(){
      this.edit_how_many_nums = true;
    },
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var obj = {};
          if(this.form.checked=='2'){
            if(this.edit_how_many_days){
              this.$set(obj,'how_many_days',Number(this.form.how_many_days));//多少天, 负数为不下限制参与天数
            }
            if(this.edit_how_many_nums){
              this.$set(obj,'how_many_nums',Number(this.form.how_many_nums));//多少天, 负数为不下限制参与天数
            }
          }else{
            if(this.edit_how_many_nums){
              this.$set(obj,'how_many_nums',Number(-1));//多少天, 负数为不下限制参与天数
            }
            if(this.edit_how_many_days){
              this.$set(obj,'how_many_days',Number(-1));//多少天, 负数为不下限制参与天数
            }
          }
          let arr =[];
          this.form.area_list.map(item=>{
            arr.push(item.country_obj.country_name +'.'+item.state_obj.name +'.'+item.city_obj.city_name)
          });
          this.$set(obj,'area_list',arr);
          if(this.editRuleName){
            this.$set(obj,'rule_name',this.form.rule_name);
          }
          if(this.editDes){
            this.$set(obj,'des',this.form.des);
          }
          if(this.edit_amount){
            this.$set(obj,'amount',Number(this.form.amount));
          }
          if(this.edit_num){
            this.$set(obj,'num',Number(this.form.num));
          }
          if(this.edit_category){
            this.$set(obj,'category',Number(this.form.category));
          }
          if(this.edit_max_amount){
            this.$set(obj,'max_amount',Number(this.form.max_amount));
          }
          if(this.edit_min_amount){
            this.$set(obj,'min_amount',Number(this.form.min_amount));
            if(this.form.category == '1'){
              this.$set(obj,'max_amount',Number(this.form.min_amount));
            }
          }
          if(this.edit_start_time){
            this.$set(obj,'start_time',this.form.start_time);
          }
          if(this.edit_end_time){
            this.$set(obj,'end_time',this.form.end_time);
          }
          this.btn_loading = true;
          let res = '';
          if(Number(this.form.min_amount)< Number(0.3)){
            this.$message({ message: '单个金额不能小于0.3元', type: 'error',duration:2000 });
            return false;
          }
          if(this.row.id){
            this.$set(obj,'id',Number(this.row.id))
            res = await putCashRedRule(obj)
          }else{
            res = await postCashRedRule(obj)
          }
          this.btn_loading = false
          if (res.code !== 200){
            this.btn_loading = false;
            return false
          }
          Object.assign(this.$data.form, this.$options.data().form)
          setTimeout(()=>{
            this.$parent.dataList=[];
            this.$parent.pages.page = 1;
            this.$parent.getList();
            this.$parent.editFlag = false;
          },1000)
          this.$message({ message: '操作成功', type: 'success',duration:1000 });
          if(this.$parent.backFlag){
            this.$router.push({path:'/codeManage/codeApply',query: {
                editFlag:true,
              }})
            sessionStorage.setItem('cash_red_envelope_rule_id',res.data.id)
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
  .amount_box{
    flex-wrap: wrap;
    p{
      margin-right: 10px;
    }
    p:nth-child(1){
      min-width:50px;
    }
    p:nth-child(3){
      min-width:80px;
    }
  }
  .flex_box{
    flex-wrap: wrap;
    p{
      color:#B2B3BD;
      text-align: center;
      display: flex;
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
  .add_item{
    flex-wrap: wrap;
  }
}
</style>
<style lang="scss">
.addEditRule_redEnve{
  .addEdit-form{
    .date_time.el-form-item{
      margin-bottom: 35px!important;
    }
    .amount_Box.el-form-item .el-form-item{
      margin-bottom:10px!important;
    }
    .amount_box.checked{
      margin-top:15px;
      .el-form-item{
        margin-bottom:0px!important;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .addEditRule_redEnve{
    .addEdit-form{
      .area_list {
        .el-form-item{
          .el-input__inner{
            margin-bottom:10px!important;
          }
        }
      }

    }
  }
}
</style>