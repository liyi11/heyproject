<template>
  <section class="xm-content addEditApply">
    <section class="addTitle">
      <c-title>
            <span slot="secTxt" class="secTxt">
               申请二维码
            </span>
      </c-title>
    </section>
    <el-form ref="form"
             v-loading="box_loading"
             :model="form" :rules="rules"
             label-position="left"
             label-width="100%" :inline-message="false">
      <el-row :span="24" class="addEdit-form">
        <el-col :span="7" class="marginRight20">
          <el-form-item label="标签数量" prop="quantity">
            <el-input  @change="changeQuantity"  :disabled="disableEdit"  v-model.number="form.quantity" clearable placeholder="请输入标签数量" />
            <p class="ft12 font_main" v-if="available_label_msg">可用标签数量: <span>{{available_label}}</span></p>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="marginRight20">
          <el-form-item label="标签类型" prop="label_type">
            <el-select  v-model="form.label_type"
                        clearable filterable
                        :disabled="disableEdit"
                        @change="change_label_type"
                        placeholder="请选择标签类型">
              <el-option v-for="item in label_type_list" :key="item.value"
                         :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="marginRight20">
          <el-form-item label="产品" >
            <el-select  v-model="form.product_id"
                        clearable filterable
                        :disabled="disableEdit"
                        @change="change_product_id"
                        placeholder="请选择产品">
              <el-option v-for="item in product_list" :key="item.id"
                         :value="item.id" :label="item.product_name" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24" class="addEdit-form main_wrap">
         <section class="box_wrap">
           <div class="item_Box" v-if="permission.includes('All')  || permission.includes('TracingPlate')||
           permission.includes('NodeTemplate')">
             <div class="item_box">
               <div class="left_box">
                 <img src="../../../assets/images/code/icon1.png" alt="">
               </div>
               <div class="right_box">
                 <div class="right_box_title ft18">溯源</div>
                 <div class="right_box_label_box flex">
                   <div>
                     <span class="ft13">节点模板</span>
                     <span class="font_main ft13 cursor_pointer" @click="jumpAdd('1')">添加新规则</span>
                   </div>
                   <span @click="getLabel_node_info" class="getLabel_node_info"><span>溯源节点</span></span>
                 </div>
                 <el-form-item prop="template_id">
                   <el-select  v-model="form.template_id"
                               clearable filterable
                               @change="change_template_id"
                               placeholder="请选择溯源节点">
                     <el-option v-for="item in node_template_list" :key="item.id"
                                :value="item.id" :label="item.name">
                       <p class="select_and"><span class="select_cirl"></span><span>{{item.name}}</span></p>
                     </el-option>
                   </el-select>
                 </el-form-item>
               </div>
             </div>
           </div>
           <div class="item_Box" v-if="permission.includes('All') || permission.includes('PointRule')">
             <div class="item_box">
               <div class="left_box">
                 <img src="../../../assets/images/code/icon2.png" alt="">
               </div>
               <div class="right_box">
                 <div class="right_box_title ft18">积分</div>
                 <div class="right_box_label_box flex">
                   <div>
                     <span class="ft13">默认积分规则</span>
                     <span class="font_main ft13 cursor_pointer" @click="jumpAdd('2')">添加新积分规则</span>
                   </div>
                 </div>
                 <el-form-item >
                   <el-select  v-model="form.point_rule_id"
                               clearable filterable
                               @change="change_point_rule_id"
                               placeholder="请选择积分规则">
                     <el-option v-for="item in point_rule_list" :key="item.id"
                                :value="item.id" :label="item.rule_name">
                       <p class="select_and"><span class="select_cirl"></span><span>{{item.rule_name}}</span></p>
                     </el-option>
                   </el-select>
                 </el-form-item>
               </div>
             </div>
           </div>
           <div class="item_Box" v-if="permission.includes('All') ||  permission.includes('TurntableLotteryRule')">
             <div class="item_box">
               <div class="left_box">
                 <img src="../../../assets/images/code/icon3.png" alt="">
               </div>
               <div class="right_box">
                 <div class="right_box_title ft18">抽奖</div>
                 <div class="right_box_label_box flex">
                   <div>
                     <span class="ft13">默认抽奖规则</span>
                     <span class="font_main ft13 cursor_pointer" @click="jumpAdd('3')">添加新抽奖规则</span>
                   </div>
                 </div>
                 <el-form-item >
                   <el-select  v-model="form.turntable_lottery_rule_id"
                               clearable filterable
                               @change="change_lottery_rule_id"
                               placeholder="请选择抽奖规则">
                     <el-option v-for="item in turntable_lottery_rule_list" :key="item.id"
                                :value="item.id" :label="item.rule_name">
                       <p class="select_and"><span class="select_cirl"></span><span>{{item.rule_name}}</span></p>
                     </el-option>
                   </el-select>
                 </el-form-item>
               </div>
             </div>
           </div>
           <div class="item_Box" v-if="permission.includes('All') || permission.includes('CashRedEnvelopeRule')">
             <div class="item_box">
               <div class="left_box">
                 <img src="../../../assets/images/code/icon4.png" alt="">
               </div>
               <div class="right_box">
                 <div class="right_box_title ft18">红包</div>
                 <div class="right_box_label_box flex">
                   <div>
                     <span class="ft13">默认红包规则</span>
                     <span class="font_main ft13 cursor_pointer" @click="jumpAdd('4')">添加新红包规则</span>
                   </div>
                 </div>
                 <el-form-item >
                   <el-select  v-model="form.cash_red_envelope_rule_id"
                               clearable filterable
                               @change="change_cash_red_envelope_rule_id"
                               placeholder="请选择红包规则">
                     <el-option v-for="item in cash_red_envelope_rule_list" :key="item.id"
                                :value="item.id" :label="item.rule_name" >
                       <p class="select_and"><span class="select_cirl"></span><span>{{item.rule_name}}</span></p>
                     </el-option>
                   </el-select>
                 </el-form-item>
               </div>
             </div>
           </div>
         </section>
      </el-row>
    </el-form>
    <div class="xm-footer">
      <c-button>
        <span @click="saves('form')" class="saves">保存</span>
        <span  size="mini" @click="close" class="close">取消</span>
      </c-button>
    </div>
    <el-dialog title=""  :visible.sync="dialogFormVisible"
               width="798px" height="568px"
     :close-on-click-modal="false">
      <LookNodeInfo :template_id="form.template_id" @close="closeLookNodeInfo"></LookNodeInfo>
    </el-dialog>
  </section>
</template>

<script>
import {getLabel_apply_page,getCheck_available_label_num,
  putLabel_apply,postLabel_apply} from '@/api/xapi'
import { label_type_list } from '@/api/map'
import LookNodeInfo from "./lookNodeInfo";
import {mapGetters} from "vuex";
export default {
  components:{
    CTitle: () => import('@/components/CTitle/index'),
    CButton: () => import('@/components/CButton'),
    LookNodeInfo
  },
  computed: {
    ...mapGetters([
      'permission'
    ])
  },
  props: {
    row:{
      default:{}
    }
  },
  data() {
    return {
      label_type_list:label_type_list,
      box_loading: false,
      btn_loading: false,
      form: {
        id:'',
        quantity:'',
        label_type:'',
        product_id:'',
        template_id:'',//节点模板
        point_rule_id:'',//积分规则id
        turntable_lottery_rule_id:'',//抽奖规则id
        cash_red_envelope_rule_id:'',//	integer现金红包规则id
      },
      rules: {
        template_id: [{ required: true, message: '必填', trigger: 'blur' }],
        quantity: [{ required: true, message: '必填且大于0',pattern:/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, trigger: 'blur' }],
        label_type: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      product_list:[],
      cash_red_envelope_rule_list:[],
      node_template_list:[],
      point_rule_list:[],
      security_code_award_rule_list:[],
      turntable_lottery_rule_list:[],
      edit_quantity:false,
      edit_label_type:false,
      edit_product_id:false,
      edit_template_id:false,
      edit_point_rule_id:false,
      edit_lottery_rule_id:false,
      edit_cash_red_envelope_rule_id:false,
      available_label:0,
      available_label_msg:'',
      disableEdit:false,//已确认订单不可编辑项
      dialogFormVisible:false,
    }
  },
  created() {
    console.log(this.permission)
    this.getLabel_apply_page();
    if(this.row.id){
      if(this.row.status == 'Confirm'){
        this.disableEdit = true;
      }
      this.form.quantity = this.row.quantity;
      this.form.label_type = this.row.label_type;
      this.form.product_id = this.row.product_info && this.row.product_info.id?this.row.product_info.id:'';
      this.form.template_id = this.row.template_id;
      this.form.id = this.row.id;
    }
    if(sessionStorage.getItem('form_data')){
      this.form = JSON.parse(sessionStorage.getItem('form_data'))
      if(this.form.id){
        this.row.id  = this.form.id;
      }
    }
    if(sessionStorage.getItem('template_id')){
      this.change_template_id();
      this.form.template_id = JSON.parse(sessionStorage.getItem('template_id'));
    }
    if(sessionStorage.getItem('point_rule_id')){
      this.change_point_rule_id();
      this.form.point_rule_id = JSON.parse(sessionStorage.getItem('point_rule_id'));
    }
    if(sessionStorage.getItem('turntable_lottery_rule_id')){
      this.change_lottery_rule_id();
      this.form.turntable_lottery_rule_id = JSON.parse(sessionStorage.getItem('turntable_lottery_rule_id'));
    }
    if(sessionStorage.getItem('cash_red_envelope_rule_id')){
      this.change_cash_red_envelope_rule_id();
      this.form.cash_red_envelope_rule_id = JSON.parse(sessionStorage.getItem('cash_red_envelope_rule_id'));
    }
  },
  methods: {
    async getLabel_apply_page(){
      let obj= {}
      if(this.row.id){
        this.$set(obj,'id',this.row.id)
      }
      const res = await getLabel_apply_page(obj);
      if(res.data.label_apply_info){
        this.form.quantity = res.data.label_apply_info.quantity?res.data.label_apply_info.quantity:'';
        this.form.product_id = res.data.label_apply_info.product_info&&res.data.label_apply_info.product_info.id?res.data.label_apply_info.product_info.id:'';
        this.form.template_id = res.data.label_apply_info.template_id?res.data.label_apply_info.template_id:'';
        this.form.point_rule_id = res.data.label_apply_info.point_rule_id?res.data.label_apply_info.point_rule_id:'';
        this.form.turntable_lottery_rule_id = res.data.label_apply_info.turntable_lottery_rule_id?res.data.label_apply_info.turntable_lottery_rule_id:'';
        this.form.cash_red_envelope_rule_id = res.data.label_apply_info.cash_red_envelope_rule_id?res.data.label_apply_info.cash_red_envelope_rule_id:'';
      }
      this.product_list = res.data.product_list;
      this.node_template_list = res.data.node_template_list;
      this.point_rule_list = res.data.point_rule_list;
      this.turntable_lottery_rule_list = res.data.turntable_lottery_rule_list;
      this.cash_red_envelope_rule_list = res.data.cash_red_envelope_rule_list;
    },
    //创建新规则，会进入到节点模板的创建页面，创建完了，就返回这个页面，自动调用刚刚创建的内容
    jumpAdd(string){
      switch(string){
        case '1':
          this.$router.push({path:'/codeManage/nodeTemplate',query: {
              editFlag:true,
              backFlag:true
            }})
          sessionStorage.setItem('form_data',JSON.stringify(this.form))
          break;
        //  积分
        case '2':
          this.$router.push({path:'/pointsManage/rule',query: {
              editFlag:true,
              backFlag:true
            }})
          sessionStorage.setItem('form_data',JSON.stringify(this.form))
          break;
        case '3':
          this.$router.push({path:'/lotteryManage/rule',query: {
              editFlag:true,
              backFlag:true
            }})
          sessionStorage.setItem('form_data',JSON.stringify(this.form))
          break;
        case '4':
          this.$router.push({path:'/redEnvelopesManage/rule',query: {
              editFlag:true,
              backFlag:true
            }})
          sessionStorage.setItem('form_data',JSON.stringify(this.form))
          break;
      }
    },
    closeLookNodeInfo(){
      this.dialogFormVisible = false;
    },
    //查看节点信息
    async getLabel_node_info(){
      if(this.form.template_id){
         this.dialogFormVisible = true
      }else{
        this.$message({ message: '请选择溯源节点', type: 'warning',duration:2000 })
      }
    },
    //标签数量检查
    async getCheck_available_label_num(){
      let obj ={
          quantity:Number(this.form.quantity),
          label_type:this.form.label_type
      }
      const res = await getCheck_available_label_num(obj);
      this.available_label = Number(res.data.available_label);
      if(res.data.msg){
        this.$message({ message: res.data.msg, type: 'error',duration:2000 })
        this.available_label_msg = res.data.msg;
      }else{
        this.available_label_msg = '操作成功';
      }
    },
    changeQuantity(){
      this.edit_quantity = true;
    },
    change_label_type(){
      this.edit_label_type = true;
      if(this.form.quantity){
        this.getCheck_available_label_num();
      }else{
        this.$message({ message: '请输入标签数量', type: 'warning',duration:1000 })
      }
    },
    change_product_id(){
      this.edit_product_id = true;
    },
    change_template_id(){
      this.edit_template_id = true;
    },
    change_point_rule_id(){
      this.edit_point_rule_id = true;
    },
   change_lottery_rule_id(){
      this.edit_lottery_rule_id = true;
    },
    change_cash_red_envelope_rule_id(){
      this.edit_cash_red_envelope_rule_id = true;
    },
    /* 添加、编辑 */
    saves(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var obj = {};
          if(this.edit_quantity){
            this.$set(obj,'quantity',Number(this.form.quantity))
          }
          if(this.edit_label_type){
            this.$set(obj,'label_type',this.form.label_type)
          }
          if(this.edit_product_id){
            this.$set(obj,'product_id',Number(this.form.product_id))
          }
          if(this.edit_template_id){
            this.$set(obj,'template_id',Number(this.form.template_id))
          }
          if(this.edit_point_rule_id){
            this.$set(obj,'point_rule_id',Number(this.form.point_rule_id))
          }
          if(this.edit_lottery_rule_id){
            this.$set(obj,'turntable_lottery_rule_id',Number(this.form.turntable_lottery_rule_id))
          }
          if(this.edit_cash_red_envelope_rule_id){
            this.$set(obj,'cash_red_envelope_rule_id',Number(this.form.cash_red_envelope_rule_id))
          }
          this.btn_loading = true;
          let res = '';
          if(this.row.id){
            this.$set(obj,'id',Number(this.row.id))
            res = await putLabel_apply(obj)
          }else{
            res = await postLabel_apply(obj)
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
.addEditApply{
  .addTitle{
    margin-bottom: 20px;
  }
  .label_title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #B2B3BD !important;
    font-size: 14px!important;
    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      p{
        width:24px;
        height:24px;
        font-size: 16px;
        text-align: center;
        line-height: 22px;
        cursor: pointer;
        border-radius: 50%;
        color: #000;
      }
      p:nth-child(1){
        background: #FFBD2F;
        margin-right:8px;
      }
      p:nth-child(2){
        background: #CCCCCC;
      }
    }

  }
  .el-checkbox-group{
    background: #0D0E0F;
    padding-left:15px;
    border-radius:4px;
  }
  .main_wrap{
    width:100%;
    background: #0D0E0F;
    border-radius: 24px;
    min-height: 233px;
    max-height: 555px;
    margin-bottom: 20px;
    .box_wrap{
      height:auto;
      padding:20px;
      display: flex;
      justify-content:space-around;
      //justify-content:flex-start;
      flex-wrap: wrap;
      .item_Box{
        width:46%;
        padding:32px 0 44px 16px;
        border-bottom:1px solid #1D1D1F;
        .item_box{
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          .left_box{
            width:48px;
            margin-right: 23px;
          }
          .right_box{
            width:calc(100% - 71px);
            .right_box_title{
              font-weight: 600;
              margin-bottom: 9px;
            }
            .right_box_label_box{
              margin-bottom: 14px;
              display: flex;
              justify-content: space-between;
              height: 35px;
              line-height: 35px;
               span:nth-child(1){
                 color:#808191;
                 margin-right: 24px;
               }
              .getLabel_node_info{
                display: inline-block;
                text-align: center;
                cursor: pointer;
                border-radius: 8px!important;
                width:100px!important;
                height:35px!important;
                line-height: 35px;
                background: #FFBD2F;
                span{
                  color:#0D0E0F!important;
                  font-size: 16px!important;
                  font-family: PingFang HK;
                  font-style: normal;
                  font-weight: normal;
                  margin-right:0!important;
                }
              }
            }
          }
        }
      }
    }
  }

}
</style>
<style lang="scss">
.addEditApply{
  .addEdit-form{
    .el-input__inner{
      background: #1D1D1F!important;
    }
  }
}
</style>
