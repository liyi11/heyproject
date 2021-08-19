<template>
  <section class="xm-content addEditRule">
    <section class="addTitle">
      <c-title>
            <span slot="secTxt" class="secTxt">
               积分规则设置
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
              <p class="marginlr10">--</p>
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
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="11" >
          <el-form-item label="参与条件" class="join_box">
            <p class="join_title"><span></span>溯源码</p>
            <el-form-item label="单次获得积分数量" prop="label_percent">
              <el-input  @change="change_label_percent" v-model="form.label_percent" clearable placeholder="请输入单次获得积分数量" />
            </el-form-item>
            <el-form-item label="单用户参与次数限制" prop="label_user_limit">
              <el-input  @change="change_label_user_limit" v-model="form.label_user_limit" clearable placeholder="请输入单用户参与次数限制" />
            </el-form-item>
            <el-form-item label="单个码参与次数限制" prop="label_count_limit">
              <el-input  @change="change_label_count_limit" v-model="form.label_count_limit" clearable placeholder="请输入单个码参与次数限制" />
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="11" >
          <el-form-item label="" class="join_box">
            <p class="join_title"><span></span>防伪码</p>
            <el-form-item label="单次获得积分数量" prop="block_chain_percent">
              <el-input  @change="change_block_chain_percent" v-model="form.block_chain_percent" clearable placeholder="请输入单次获得积分数量" />
            </el-form-item>
            <el-form-item label="单用户参与次数限制" prop="block_chain_user_limit">
              <el-input  @change="change_block_chain_user_limit" v-model="form.block_chain_user_limit" clearable placeholder="请输入单用户参与次数限制" />
            </el-form-item>
            <el-form-item label="单个码参与次数限制" prop="block_chain_count_limit">
              <el-input  @change="change_block_chain_count_limit" v-model="form.block_chain_count_limit" clearable placeholder="请输入单个码参与次数限制" />
            </el-form-item>
          </el-form-item>
        </el-col>
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
            <div class="flex flex_box add_item  marginBottom10 area_list" v-for="(item,index) in form.area_list" :key="index">
              <el-form-item :prop="'area_list.' + index + '.country_obj.country_name'"
                            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                <el-select  v-model="item.country_obj"
                            value-key="country_name"
                            clearable filterable
                            @change="changeCountry($event)"
                            placeholder="请选择国家">
                  <el-option v-for="(item,index) in country_info" :key="index"
                             :value="item" :label="item.country_name">
                    <p class="select_and"><span class="select_cirl"></span><span>{{item.country_name}}</span></p>
                  </el-option>
                </el-select>
              </el-form-item>
              <p class="marginlr10">--</p>
              <el-form-item :prop="'area_list.' + index + '.state_obj.name'"
                            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
                <el-select  v-model="item.state_obj"
                            clearable filterable
                            value-key="name"
                            @change="changeState($event)"
                            placeholder="请选择省份">
                  <el-option v-for="(item,index) in state_info" :key="index"
                             :value="item" :label="item.name" >
                    <p class="select_and"><span class="select_cirl"></span><span>{{item.name}}</span></p>
                  </el-option>
                </el-select>
              </el-form-item>
              <p class="marginlr10">--</p>
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
  postPointRule,
  putPointRule,
  getArea,
  get_point_rule_edit
} from '@/api/xapi'
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
        start_time:'',
        end_time:'',
        label_percent:'',
        block_chain_percent:'',
        label_user_limit:'',
        label_count_limit:'',
        block_chain_user_limit:'',
        block_chain_count_limit:'',
        // sale_agent_list:'',
        area_list:[]
      },
      rules: {
        rule_name: [{ required: true, message: '必填', trigger: 'blur' }],
        start_time: [{ required: true, message: '必选', trigger: 'blur' }],
        end_time: [{ required: true, message: '必选', trigger: 'blur' }],
        label_percent: [{ required: true, message: '必填', trigger: 'blur' }],
        block_chain_percent: [{ required: true, message: '必填', trigger: 'blur' }],
        label_user_limit:[{ required: true, message: '必填', trigger: 'blur' }],
        label_count_limit:[{ required: true, message: '必填', trigger: 'blur' }],
        block_chain_user_limit:[{ required: true, message: '必填', trigger: 'blur' }],
        block_chain_count_limit:[{ required: true, message: '必填', trigger: 'blur' }]
      },
      editRuleName:false,
      editDes:false,
      edit_label_percent:false,
      edit_block_chain_percent:false,
      edit_label_user_limit:false,
      edit_label_count_limit:false,
      edit_block_chain_user_limit:false,
      edit_block_chain_count_limit:false,
      edit_end_time:false,
      edit_start_time:false,
      country_info:[],
      state_info:[],
      city_info:[],
    }
  },
  created() {
    this.get_country_info();
    if(this.row.id){
      this.form.rule_name = this.row.rule_name;
      this.getArea();
      this.get_point_rule_edit();
    }
  },
  methods: {
    async get_point_rule_edit(){
      let obj= {
        id:this.row.id
      };
      const { data } = await get_point_rule_edit(obj);
      let point_rule = data.point_rule;
      this.form.des = point_rule.des;
      this.form.start_time = new Date(point_rule.start_time);
      this.form.end_time = new Date(point_rule.end_time);
      this.form.label_percent = point_rule.label_percent;
      this.form.block_chain_percent = point_rule.block_chain_percent;
      this.form.label_user_limit = point_rule.label_user_limit;// "2/24",  # 溯源码单个用户参与次数限制    type:str
      this.form.label_count_limit = point_rule.label_count_limit;
      this.form.block_chain_user_limit = point_rule.block_chain_user_limit;
      this.form.block_chain_count_limit = point_rule.block_chain_count_limit;
      point_rule.area_info.map(item=>{
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
    },
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
    change_label_percent(){
      this.edit_label_percent = true;
    },
    change_block_chain_percent(){
      this.edit_block_chain_percent = true;
    },
    change_label_user_limit(){
      this.edit_label_user_limit = true;
    },
    change_label_count_limit(){
      this.edit_label_count_limit = true;
    },
    change_block_chain_user_limit(){
      this.edit_block_chain_user_limit = true;
    },
    change_block_chain_count_limit(){
      this.edit_block_chain_count_limit = true;
    },
    change_start_time(){
      this.edit_start_time = true;
    },
    change_end_time(){
      this.edit_end_time = true;
    },
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var obj = {};
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
          if(this.edit_label_percent){
            this.$set(obj,'label_percent',Number(this.form.label_percent));
          }
          if(this.edit_block_chain_percent){
            this.$set(obj,'block_chain_percent',Number(this.form.block_chain_percent));
          }
          if(this.edit_label_user_limit){
            this.$set(obj,'label_user_limit',Number(this.form.label_user_limit));
          }
          if(this.edit_label_count_limit){
            this.$set(obj,'label_count_limit',Number(this.form.label_count_limit));
          }
          if(this.edit_block_chain_user_limit){
            this.$set(obj,'block_chain_user_limit',Number(this.form.block_chain_user_limit));
          }
          if(this.edit_block_chain_count_limit){
            this.$set(obj,'block_chain_count_limit',Number(this.form.block_chain_count_limit));
          }
          if(this.edit_start_time){
            this.$set(obj,'start_time',this.form.start_time);
          }
          if(this.edit_end_time){
            this.$set(obj,'end_time',this.form.end_time);
          }
          this.btn_loading = true;
          let res = '';
          if(this.row.id){
            this.$set(obj,'id',Number(this.row.id))
            res = await putPointRule(obj)
          }else{
            res = await postPointRule(obj)
          }
          this.btn_loading = false
          if (res.code !== 200){
            this.btn_loading = false;
            return false
          }
          Object.assign(this.$data.form, this.$options.data().form)
          setTimeout(()=>{
            this.$parent.dataList=[];
            this.$parent.editFlag= false;
            this.$parent.pages.page = 1;
            this.$parent.getList()
          },1000)
          this.$message({ message: '操作成功', type: 'success',duration:1000 });
          if(this.$parent.backFlag){
            this.$router.push({path:'/codeManage/codeApply',query: {
                editFlag:true,
              }})
            sessionStorage.setItem('point_rule_id',res.data.id)
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
  .join_box{
    .join_title{
      width: 100%;
      display: flex;
      align-items: center;
      span{
        display:inline-block;
        margin-right:12px;
        width:20px;
        height:20px;
        border-radius:4px;
        background:#FFBD2F;
      }
    }
  }
}
</style>
<style lang="scss">
.addEditRule {
  .addEdit-form {
    .join_box{
      .el-form-item{
        margin-bottom:15px!important;
      }
      .el-form-item__content {
        margin-left: 140px !important;
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