<template>
  <div>
    <div class="page_content">
      <h4>批次号</h4>
      <h3 class="text">{{ editdata.value_info.vaule }}</h3>
      <h4>成品检验报告</h4>

      <el-form
        ref="form"
        class="addEdit-form"
        v-loading="box_loading"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="100px"
        :inline-message="true"
      >
        <el-row :span="24">
          <section v-for="(item, index) in form.nodes" :key="index">
            <el-col :span="10">
              <h3 class="biaoti">{{ item.file_type_content }}</h3>
              <el-row :span="24">
                <el-form-item
                  :prop="'nodes.' + index + '.image'"
                  :rules="[
                    { required: true, message: '必填', trigger: 'blur' },
                  ]"
                  class="img_box"
                >
                  <x-upload
                    :ref="'imgupload' + index"
                    :filelist="item.fileInit"
                    :limit="1"
                    :is-show="false"
                    img-size="size40"
                    @backList="(file) => backList(file, index)"
                  />
                </el-form-item>
              </el-row>
            </el-col>
          </section>
        </el-row>
      </el-form>
    </div>

    <div class="xm-footer">
      <c-button>
        <span @click="saves()" class="saves">保存</span>
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
  put_label_file,
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
      box_loading: false,
      input: "",
      fileInit: [],
      rules: {
        name: [{ required: true, message: "必填", trigger: "blur" }],
        desc: [{ required: true, message: "必填", trigger: "blur" }],
      },
      form: {
        name: "",
        desc: "",
        nodes: [],
      },
    };
  },
  created() {
    console.log(this.editdata);
    var label_file_images_info = this.editdata.label_file_images_info;
    if (label_file_images_info.length == 0) {
      this.form.nodes = [
        {
          node_number: "",
          image: "",
          node_content: "",
          group_id: "",
          file_type_content: "",
        },
      ];
    } else {
      this.form.nodes = label_file_images_info.map((item) => {
        if (item.image == null) {
          var obj = {
            node_number: "",
            image: "",
            node_content: "",
            group_id: item.id,
            file_type_content: item.file_type_content,
          };
          return obj;
        } else {
          item.fileInit = [{ name: item.image, url: item.image }];
          item.group_id = item.id;
          return item;
        }
      });
    }
  },
  methods: {
    //   取消返回
    goback() {
      this.$parent.go()
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
      var all = []
      all = this.form.nodes.map((item)=>{
        var obj = {
          file_type_content:item.file_type_content,
          id:item.group_id,
          image:item.image
        }
        return obj
      })
      var data = {
        id:this.editdata.id,
        label_file_images:all,
        create_time:this.editdata.create_time
      }
      const res = await put_label_file(data);
      if(res.code==200){
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.goback()
      }else{
        this.$message({
          message: '请稍后重试'
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
.biaoti {
  padding: 15px 0;
}
</style>