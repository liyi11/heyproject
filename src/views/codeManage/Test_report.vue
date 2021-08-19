<template>
  <div class="page codeApply">
    <div class="navBar">
      <c-search @init_getList="init_getList"></c-search>
      <NavbarRight></NavbarRight>
    </div>
    <section>
      <c-title>
        <span slot="title" class="title"> 二维码管理 </span>
      </c-title>
    </section>
    <section class="page_body" v-if="getday < 0">
      <Expire></Expire>
    </section>
    <section class="page_body" v-else>
      <Editreport v-if="Editreport" :editdata='editdata'></Editreport>
      <section v-if="!editFlag&&!Editreport">
        <section class="page_content">
          <h3>检测报告列表</h3>
          <!-- 报告列表 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="value_info.vaule" label="批次号" width="180">
            </el-table-column>
            <el-table-column prop="label_file_images_info.length" label="检测报告" width="180">
            </el-table-column>
            <el-table-column prop="update_email" label="修改人" width="180"> </el-table-column>
            <el-table-column prop="modified_on" label="修改时间" >
            </el-table-column>
            <el-table-column prop="name" label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="warning" @click="go(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

        </section>
      </section>
    </section>
  </div>
</template>

<script>
import {
  getLabel_apply,
  patchLabel_apply,
  getCheck_label,
  getProduct,
  getDownload_label_apply,
  get_label_file,
} from "@/api/xapi";
import { label_type_list, apply_status_list } from "@/api/map";
import { mapGetters } from "vuex";
import { getDay } from "@/plugins/auth";
export default {
  components: {
    CTitle: () => import("@/components/CTitle/index"),
    CContent: () => import("@/components/CContent"),
    CButton: () => import("@/components/CButton"),
    CSearch: () => import("@/components/CSearch/index"),
    NavbarRight: () => import("@/components/NavbarRight"),
    Expire: () => import("@/components/expire"),
    Editreport:()=> import('./XM/EditReport'),
  },
  computed: {
    ...mapGetters(["email"]),
  },
  data() {
    return {
      editdata:'', //查看修改的数据
      label_type_list: label_type_list,
      apply_status_list: apply_status_list,
      pages: this.$mpages,
      form: {
        search_keyword: "",
        product_id: "",
        order_number: "",
        date: "",
        status: "", //取值:['All’, 'Confirm’, 'WaitVerify’, ‘WaitSubmit’]
      },
      dataList: [],
      editFlag: false,
      Editreport:false,
      row: {},
      tableData:[],
      status_list: [
        {
          label: "全部列表",
          value: "All",
        },
        {
          label: "已确认",
          value: "Confirm",
        },
        {
          label: "待审核",
          value: "WaitVerify",
        },
        {
          label: "待提交",
          value: "WaitSubmit",
        },
      ],
      productList: [],
      checked_list: [],
      getday: getDay(),
    };
  },
  created() {
    this.get__label()
    if (this.$route.query.editFlag) {
      this.editFlag = this.$route.query.editFlag;
    }
    if (Number(this.getday) >= 0) {
      this.$getReset();
      this.getList();
      this.getProduct();
    }
  },
  methods: {
    // 修改页面
    go(res){
      this.editdata = res
      this.Editreport=!this.Editreport
    },
    async get__label(){
        let obj = {
          page : 1,
          num : 1000
        };
        const res = await get_label_file(obj);
        this.tableData = res.data
        console.log(res)
    },

    async downLoad() {
      if (this.checked_list.length != 0) {
        let obj = {
          label_apply_ids: this.checked_list,
        };
        const res = await getDownload_label_apply(obj);
        if (res.code == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          setTimeout(() => {
            this.$layer.confirm(
              '<p class="font_main ft18">' +
                "提 示" +
                "</p>" +
                "</br>" +
                '<span class="font_white ft13 line-height15">' +
                "我们会将处理的结果，发送到您的电子邮" +
                "</br>" +
                "件地址" +
                this.email +
                "</span>",
              {
                shadeClose: false,
                btn: ["确定", "取消"],
                area: ["347px", "192px"],
              },
              async (index) => {
                this.$layer.close(index);
              }
            );
          }, 1000);
        }
      } else {
        this.$message({ message: "请选择数据", type: "error", duration: 2000 });
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // //获取所有选中项的
      this.checked_list = selection.map((item) => item.id);
    },
    getId(row) {
      return row.id;
    },
    //清空选中数据
    clearChecked() {
      this.$refs.multipleTable.clearSelection();
    },
    async getProduct() {
      let obj = {
        page: 1,
        num: 100000,
      };
      const { data } = await getProduct(obj);
      this.productList = data;
    },
    init_getList(e) {
      this.form.search_name = e;
      this.$getReset();
      this.dataList = [];
      this.getList();
    },
    /* 查询 */
    async getList(page) {
      if (page) {
        this.pages.page = 1;
        this.dataList = [];
      }
      const obj = JSON.parse(JSON.stringify(this.form));
      Object.assign(obj, {
        page: this.pages.page,
        num: this.pages.num,
      });
      const { data, count } = await getLabel_apply(obj);
      this.dataList = this.dataList.concat(data);
      this.pages.total = count;
    },
    close() {
      this.editFlag = false;
    },
    //检查
    async getCheck_label(row) {
      this.$layer.confirm(
        '<p class="font_main ft18">' +
          "检 查" +
          "</p>" +
          "</br>" +
          '<span class="font_white ft13 line-height15">' +
          "我们会将处理的结果，发送到您的电子邮" +
          "</br>" +
          "件地址" +
          this.email +
          "</span>",
        {
          shadeClose: false,
          btn: ["确定", "取消"],
          area: ["347px", "192px"],
        },
        async (index) => {
          let obj = {
            id: row.id,
          };
          const res = await getCheck_label(obj);
          if (res.code !== 200) {
            return false;
          }
          this.dataList = [];
          this.pages.page = 1;
          this.getList();
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          this.$layer.close(index);
        }
      );
    },
    //+'<img src="../../assets/images/title.png" />'
    //提交撤销
    async patchLabel_apply(row, string) {
      if (string == "2") {
        this.$layer.confirm(
          '<p class="font_main ft18">' +
            "撤 销" +
            "</p>" +
            "</br>" +
            '<span class="font_white ft13 margintop15 displayBlock">' +
            "您确定要撤销所选内容吗？" +
            "</span>",
          {
            shadeClose: false,
            btn: ["确定", "取消"],
            area: ["347px", "192px"],
          },
          async (index) => {
            this.label_apply(row, string, index);
          }
        );
      } else {
        this.label_apply(row, string);
      }
    },
    async label_apply(row, string, index) {
      let obj = {
        id: row.id,
        action: string,
      };
      const res = await patchLabel_apply(obj);
      if (res.code !== 200) {
        return false;
      }
      this.dataList = [];
      this.pages.page = 1;
      this.getList();
      if (index) {
        this.$layer.close(index);
      }
      this.$message({ message: "操作成功", type: "success", duration: 1000 });
    },
    openXM(row) {
      this.row = row;
      this.editFlag = true;
      if (sessionStorage.getItem("template_id")) {
        sessionStorage.removeItem("template_id");
      }
      if (sessionStorage.getItem("point_rule_id")) {
        sessionStorage.removeItem("point_rule_id");
      }
      if (sessionStorage.getItem("turntable_lottery_rule_id")) {
        sessionStorage.removeItem("turntable_lottery_rule_id");
      }
      if (sessionStorage.getItem("cash_red_envelope_rule_id")) {
        sessionStorage.removeItem("cash_red_envelope_rule_id");
      }
      if (sessionStorage.getItem("form_data")) {
        sessionStorage.removeItem("form_data");
      }
    },
    //查看   详情
    getLabel_tracking(row) {
      this.$router.push({
        path: "/detail",
        query: {
          id: row.id,
        },
      });
    },
    // 页码改变
    pageChange(param) {
      if (
        Math.ceil(Number(this.pages.total) / Number(this.pages.num)) >
        Number(this.pages.page)
      ) {
        this.pages.page = ++param.val;
        this.getList();
      } else {
        this.$message({
          message: "没有更多数据",
          type: "success",
          duration: 1000,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.codeApply {
  .page_content {
    padding: 48px 30px;
  }
  .addTitle {
    margin-bottom: 20px;
  }
  .text_block {
    display: flex;
    align-items: center;
    .block {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 4px;
      margin-right: 8px;
    }
  }
  .downLoad_wrap {
    display: flex;
    align-items: center;
    .downLoad_Box {
      text-align: right;
      margin-right: 35px;
    }
    .downLoad {
      cursor: pointer;
      width: 48px;
      height: 48px;
      vertical-align: middle;
    }
  }
}
</style>
<style lang="scss">
.codeApply {
  .el-checkbox .el-checkbox__inner {
    border: 2px solid #313131 !important;
    border-radius: 4px !important;
  }
  .search-form {
    .el-form-item {
      width: 310px !important;
      margin-right: 18px !important;
    }
    .el-form-item__content {
      width: 100% !important;
    }
    .el-form-item__label {
      margin-right: calc(100% - 80px) !important;
    }
    .el-date-editor {
      width: 310px !important;
    }
    .all_List {
      .el-form-item__content {
        width: 355px !important;
      }
      .el-form-item__label {
        margin-right: calc(100% - 80px) !important;
      }
    }
    .search_box {
      flex-wrap: wrap;
      .el-form-item {
        margin-right: 35px !important;
      }
      .el-form-item.search_keyword {
        margin-right: 0 !important;
        .el-form-item__label {
          width: 140px !important;
        }
        .el-form-item__label {
          margin-right: calc(100% - 140px) !important;
        }
        .el-form-item__content {
          margin-right: 0px !important;
        }
      }
    }
  }
}
</style>
