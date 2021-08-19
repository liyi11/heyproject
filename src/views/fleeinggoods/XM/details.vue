<template>
  <div>
    <div>
      <el-form
        :model="form"
        :label-position="labelPosition"
        class="demo-form-inline el-input__inner_"
      >
        <el-row :span="24">
          <el-col :span="10">
            <el-form-item label="编号">
              <el-input
                v-model="form.num"
                class="el-input__inner_"
                placeholder="编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="姓名">
              <el-input
                v-model="form.name"
                class="el-input__inner_"
                placeholder="姓名"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :span="24">
          <div class="login-center-input-text active">手机号码：</div>
          <el-col :span="7">
            <!-- 手机号码 -->
            <el-form-item class="login-center-input" prop="phone_number">
              <div class="flex input_phone">
                <div style="width: 100px">
                  <el-select
                    v-model="area_codeNum"
                    popper-class="select_national_info"
                    class="select_national_info"
                    filterable
                  >
                    <el-option
                      v-for="(item, index) in national_info_list"
                      :key="index"
                      :value="item.phone_prefix"
                      :label="item.phone_prefix"
                    >
                      <div class="wrap">
                        <div class="wrap select_and">
                          <p class="select_cirl"></p>
                          <p class="name">
                            {{ item.name }}
                          </p>
                        </div>
                        <img :src="item.image" alt="" height="20" />
                      </div>
                    </el-option>
                  </el-select>
                </div>
                <el-input
                  class="noBorder"
                  v-model.number="form.phone_number"
                  clearable
                  placeholder="请输入电话号码"
                />
              </div>
            </el-form-item>
          </el-col>
          <!-- 省市选择 -->
          <el-col :span="10">
            <el-form-item label="" class="area_list_box">
              <div class="flex flex_box">
                <el-form-item class="area_list">
                  <el-select
                    v-model="form.province"
                    clearable
                    filterable
                    popper-class="select_gray"
                    @change="changeState"
                    placeholder="请选择省"
                  >
                    <el-option
                      v-for="(item, index) in state_info"
                      :key="index"
                      :value="item.id"
                      :label="item.name"
                    >
                      <p class="select_and">
                        <span class="select_cirl"></span
                        ><span>{{ item.name }}</span>
                      </p>
                    </el-option>
                  </el-select>
                </el-form-item>
                <p
                  class="marginRight10 tc"
                  style="min-width: 20px; line-height: 56px"
                >
                  --
                </p>
                <el-form-item class="area_list">
                  <el-select
                    v-model="form.city"
                    class="select_gray"
                    clearable
                    filterable
                    popper-class="select_gray"
                    placeholder="请选择市"
                  >
                    <el-option
                      v-for="(item, index) in city_info"
                      :key="index"
                      :value="item.id"
                      :label="item.city_name"
                    >
                      <p class="select_and">
                        <span class="select_cirl"></span
                        ><span>{{ item.city_name }}</span>
                      </p>
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="xm-footer">
      <c-button>
        <span @click="saves('form')" class="saves">保存</span>
        <span size="mini" @click="goback()" class="close">取消</span>
      </c-button>
    </div>
  </div>
</template>

<script>
import {
  postLabel_node_template,
  putLabel_node_template,
  getMinUserRole,
  get_national_info,
  getArea,
  put_saleagent,
  post_saleagent,
} from "@/api/xapi";
import { management_module_list } from "@/api/map";
export default {
  components: {
    CTitle: () => import("@/components/CTitle/index"),
    CButton: () => import("@/components/CButton"),
    XUpload: () => import("@/components/XUpload/indexAwsProduct"),
  },
  props: {
    editdata: {
      default: {},
    }, //接收父组件的值
  },

  data() {
    return {
      area_codeNum: "+86",
      national_info_list: [],
      labelPosition: "top",
      box_loading: false,
      form: {
        num: "",
        name: "",
        phone_number: "",
        province: "",
        city: "",
      },
      fileInit: [],
      state_info: [],
      city_info: [],
    };
  },
  created() {
    if (this.editdata) {
      this.form.num = this.editdata.number;
      this.form.name = this.editdata.name;
      this.form.phone_number = this.editdata.phone_number;
      this.form.province = this.editdata.area_info[0].state_info.id;
      this.form.city = this.editdata.area_info[0].city_info.id;
    }
    this.get_national_info();
    this.get_state_info();
    this.get_city_info(this.form.province);
  },
  methods: {
    //   获取国家
    async get_state_info() {
      let obj = {};
      this.$set(obj, "country_id", 227); //中国
      const { data } = await getArea(obj);
      this.state_info = data.state_info;
    },
    async get_city_info(state_id) {
      let obj = {};
      this.$set(obj, "country_id", 227); //中国
      this.$set(obj, "state_id", state_id);
      const { data } = await getArea(obj);
      console.log(data);
      this.city_info = data.city_info;
    },
    init_getList(e) {
      this.form.search_name = e;
      this.$getReset();
      this.dataList = [];
      this.getList();
    },

    changeState(e) {
      if (e) {
        this.get_city_info(e);
        this.form.city = "";
      } else {
        this.city_info = [];
      }
    },
    //   获取号码国家
    async get_national_info() {
      const res = await get_national_info();
      this.national_info_list = res.data;
    },
    //   取消返回
    goback() {
      this.$parent.go();
      this.$parent.get_saleagent();
    },
    backList(file, index) {
      if (String(file) === "") {
        this.form.nodes[index].fileInit = [];
        this.form.nodes[index].image = "";
      } else {
        // this.form.nodes[index].fileInit = file
        this.form.nodes[index].image = file[0].name;
        console.log(file[0].name);
      }
    },
    /* 添加、编辑 */
    async saves() {
      var all = [
        {
          country_id: 227,
          city_id: this.form.city,
          state_id: this.form.province,
        },
      ];
      // 修改
      if (this.editdata != "") {
        var obj = {
          id: this.editdata.id,
          name: this.form.name,
          number: this.form.num,
          phone: "+86" + this.form.phone_number,
          area_info: all,
        };
        var data = await put_saleagent(obj);
      } else {
        // 添加
        var obj = {
          name: this.form.name,
          number: this.form.num,
          phone: "+86" + this.form.phone_number,
          area_info: all,
        };
        var data = await post_saleagent(obj);
      }
      if (data.code == 200) {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.goback();
      } else {
        this.$message({
          message: "请稍后重试",
        });
      }
    },
  },
};
</script>

<style scoped>
.text {
  width: 200px;
  margin: 20px 0 30px 0;
  padding: 15px 10px;
  border-radius: 15px;
  border: 1px solid rgb(48, 48, 48);
}
.img_box {
  display: inline-block;
  width: 300px !important;
}
.login-center-input-text {
  padding: 10px 0;
}
</style>
