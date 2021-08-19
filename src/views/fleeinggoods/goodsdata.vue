<template>
  <div class="page userRole">
    <div class="userRole_box" >
      <div class="navBar">
        <c-search @init_getList="init_getList"></c-search>
        <NavbarRight></NavbarRight>
      </div>
      <section>
        <c-title>
        <span slot="title" class="title">
           窜货数据
        </span>
        </c-title>
      </section>
      <div class="maskActive page_body" v-if="maskActive">
        <p class="font_white ft36 tc line-height15">抱歉，您没有该模块权限，</br>若需开通，请联系Hyebird客服</p>
      </div>
      <section class="page_body" v-else>
        <section v-if="!editFlag">
          <section class="addTitle">
            <c-title>
            <span slot="secTxt" class="secTxt">
              查看详情
            </span>
            </c-title>
          </section>
          <!-- 搜索框 -->
          <div class="el-input__inner_">
            <el-input
              placeholder="请输入内容"
              v-model="search"
              clearable>
            </el-input>
            <el-button type="warning">搜索</el-button>
          </div>
          <!-- 遍历代理商 -->
          <div>
            <div>
              <span>A代理商</span>
              <span>标签总数/异常标签数</span>
            </div>
          </div>

        </section>
        <section v-else>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserRole, deleteUserRole } from "@/api/xapi";
export default {
  components: {
    CTitle: () => import("@/components/CTitle/index"),
    CContent: () => import("@/components/CContent"),
    CButton: () => import("@/components/CButton"),
    CSearch: () => import("@/components/CSearch/index"),
    NavbarRight: () => import("@/components/NavbarRight"),
  },
  computed: {
    ...mapGetters(["isactive"]),
  },
  data() {
    return {
      search: "", //搜索订单号
      tab_loading: false,
      pages: this.$mpages,
      form: {
        search_name: "",
      },
      dataList: [],
      row: {},
      editFlag: false,
      maskActive: false,
    };
  },
  created() {
    if (
      this.isactive == true ||
      this.isactive == "true" ||
      this.isactive == "True"
    ) {
      this.$getReset();
      this.getList();
    } else {
      this.maskActive = true;
    }
  },
  methods: {
    init_getList(e) {
      this.form.search_name = e;
      this.$getReset();
      this.dataList = [];
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.userRole {
  position: relative;
  .maskActive {
    text-align: center;
    min-height: 600px;
    p {
      padding-top: 200px;
    }
  }
}
.el-input__inner_ {
  display: flex;
  .el-input{
    width: 220px !important;
  }
  .el-input__inner {
    display: inline-block;
    width: 300px !important;
  }
  .el-button--medium{
    height: 54px !important;
    margin-left: 15px;
    border-radius: 12px !important;
  }
}
</style>
