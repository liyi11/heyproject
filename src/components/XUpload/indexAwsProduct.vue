<template>
  <div :class="['upload-container', imgSize, backfillList.length > 3 ? 'many' : '']">
    <div class="flex" style="width:100%;justify-content: space-between;align-items: center">
      <viewer :images="backfillList.map(item => item.url)" class="upload-view">
        <div v-for="(item, index) in backfillList" :key="index" class="view-item">
          <img :src="item.url">
          <i class="el-icon-error" @click="imgDel(index)" />
        </div>
      </viewer>
      <div style="justify-content: space-between;align-items: center">
        <div class="upload-btn">
          <el-upload
              :limit="limit"
              multiple
              action="123"
              :http-request="upload"
              :before-upload="beforeAvatarUpload"
              :on-error="handleError"
              :file-list="backfillList"
              :list-type="listType"
              :on-exceed="handleExceed"
              :show-file-list="isShow">
            <el-button type="primary" class="btn">选择图片</el-button>
          </el-upload>
        </div>
        <el-button type="info" class="btn" @click="imgDel(0)">删除</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import { get_s3_info } from '@/api/xapi'
import cryptoJs from 'crypto-js'
// const  Base64 = require('js-base64').Base64;
import AWS from 'aws-sdk'
export default {
  props: {
    fileLabel:{
      dafault:''
    },
    filelist: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 1
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    isShow: {
      type: Boolean,
      default: true
    },
    imgSize: {
      type: String,
      default: 'size152' // -版本(size152、size70、size36)
    }
  },
  data() {
    return {
      backfillList: [], // -接受父层回显、上传后list同步、删除同步、传给父层
      decryData:{}
    }
  },
  watch:{
    filelist:{
      handler () {
        this.backfillList = JSON.parse(JSON.stringify(this.filelist))
      },
      deep: true // 深度监听父组件传过来对象变化
    }
  },
  mounted() {
    this.get_s3_info() // -加载组件就获取凭证
    this.$nextTick(() => { this.init() })
  },

  methods: {
    handleExceed(files,fileList){
      if(fileList.length>= this.limit){
        this.$message({ message: '只能上传'+this.limit+'个文件', type: 'error',duration:1000 })
      }
    },
    /**
     * 1. 获取s3
     */
    //解密
    decrypt(word, keyStr){
      keyStr = keyStr ? keyStr : 'CVA7Qs8ro3gD2nI9';
      var key  = cryptoJs.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
      var decrypt = cryptoJs.AES.decrypt(word, key, {mode:cryptoJs.mode.ECB,padding: cryptoJs.pad.Pkcs7});
      return cryptoJs.enc.Utf8.stringify(decrypt).toString();
    },
    get_s3_info() {
      // sign算法
      var private_key='CVA7Qs8ro3gD2nI9';
      var timestamp= parseInt(new Date().getTime()/1000);
      var data = [];
      data['timestamp']=timestamp
      var sorted_keys = Object.keys(data).sort();
      var sign_str = '';
      for(var item in sorted_keys){
        var key = sorted_keys[item];
        if(key !== 'sign' && key !== 'key'){
          sign_str+=key+'='+data[key];
        }
      }
      sign_str += 'key=' + private_key;
      var sign =  cryptoJs.MD5(sign_str).toString();
      let obj={
        sign:sign,
        timestamp:timestamp
      }
      get_s3_info(obj).then(res => {
        if (res) {
          this.decryData =  JSON.parse(this.decrypt(res.data))
        }
      })
    },
    upload(res){
      let file = res.file;  //注意：直接上传file文件，不要用FormData对象的形式传
      const val = file.name
      var suffix = val.substring(val.lastIndexOf('.') + 1, val.length) // -拿到后缀，又把后缀拼回去
      let objectKey = new Date().format('yyyyMMdd') + '/' + file.uid + '.' + suffix;//文件名

      let s3 = new AWS.S3({
        'accessKeyId' : this.decryData.AWS_ACCESS_KEY_ID,
        'secretAccessKey' : this.decryData.AWS_SECRET_ACCESS_KEY,
        'region': this.decryData.AWS_S3_REGION_NAME,
      });
      let params = {
        Bucket: this.decryData.AWS_STORAGE_BUCKET_NAME, /* required */
        Key: objectKey,
        Body: file
      };
      s3.putObject(params, (err) => {
        if (err) {
          console.log('失败');
          console.log(err, err.stack) // an error occurred
        } else {
          // //成功之后将获取的objectKey值来替换img的路径
          this.backfillList.push({
            url:'https://'+this.decryData.AWS_S3_CUSTOM_DOMAIN+'/'+objectKey,
            name:'https://'+this.decryData.AWS_S3_CUSTOM_DOMAIN+'/'+objectKey
          })
          this.$emit('backList', this.backfillList)
        }
      })
    },
    changePlus(){
      this.$emit('changePlus')
    },
    /**
     * 2. 上传前：判断
     */
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      // const isLt2K = file.size / 1024  > 200
      const isLt2K = file.size / 1024  > 2

      const isLt5K = file.size / 1024 < 500
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2K) {
        this.$message.error('图片大小不能小于 200KB!')
        return false
      }
      if (!isLt5K) {
        this.$message.error('图片大小不能超过 500KB!')
        return false
      }
    },
    /**
     * Init. 回填(加载)
     */
    init() {
      this.backfillList = JSON.parse(JSON.stringify(this.filelist))
    },
    /**
     * 3. 上传后：处理
     */
    // handleAvatarSuccess(res, file, list) {
    //   console.log(res);
    //   return false;
    //   this.backfillList = list.map(item => {
    //     if (item.response) {
    //       // -新鲜的
    //       item.name = item.url = this.$QNIMAGE + item.response.key
    //     } else {
    //       // -初始的
    //       item.name = item.url = item.name
    //     }
    //     return item
    //   })
    //   this.$emit('backList', this.backfillList)
    // },
    /**
     * 事件：用户删图
     */
    imgDel(index) {
      this.backfillList.splice(index, 1)
      this.$emit('backList', this.backfillList)
    },

    /**
     * 事件：上传报错
     */
    handleError: function(res) {
      console.log('失败')
      alert(res)
    }
  }
}
</script>
<style lang="scss" scoped>
.btn{
  width:166px!important;
  border-radius: 12px!important;
  height: 40px!important;
}
.upload-container {
  //display: inline-block;
  vertical-align: middle;
  /* 左展示容器 */
  &.many .upload-view .view-item {
    margin: 0 15px 10px 0;
  } /* 单图或单图以下，无下边距，多图时(> 3)才出现下边距 */
  .upload-view {
    display: inline-block;
    vertical-align: top;
    .view-item {
      position: relative;
      display: inline-block;
      margin: 0 15px 0 0;
      vertical-align: top;
      img { width: 100%; height: 100%; cursor: pointer; border-radius: 12px; }
      i.el-icon-error { position: absolute; top: -15px; right: -10px; font-size: 22px;
        color: #FE7676; cursor: pointer; z-index: -1; transition: all .3s ease; opacity: 0;}
      &:hover i.el-icon-error { top: -10px; right: -10px; z-index: 1; opacity: 1;}
    }
  }
  /* 右 UI 组件 */
  .upload-btn {
    display: inline-block;
    vertical-align: middle;
    width:166px;
    height:63px;
    margin-right:17px;
    .el-upload-list {display: none !important;} // 永久隐藏Element-UI组件的展示图部分
  }
}
/* 3. -36版 */
.upload-container.size40 {
  .upload-view .view-item {
    width:63px; height:63px;
    i.el-icon-error { top: -20px; right: -10px; font-size: 20px; z-index: -1; }
    &:hover i.el-icon-error { top: -20; right: -10px; z-index: 1; }
  }
  /deep/ .upload-btn .el-upload.el-upload--picture-card { background-color: transparent!important;
    border: 1px solid transparent!important;width: 63px; height: 63px; line-height: 63px; }
  /deep/ .upload-btn i.el-icon-plus { font-size: 16px;color:#fff!important; }
}
</style>