<template>
  <div class="fileAwsBox">
    <div :class="['upload-container', imgSize, backfillList.length > 3 ? 'many' : '']">
      <div v-for="(item, index) in backfillList" :key="index" class="view-item">
          <span style="display:inline-block;width:90%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
            {{item.name}}
          </span>
        <i class="el-icon-error" @click="imgDel(index)" />
      </div>
      <div class="upload-btn" :style="{display: (String(backfillList) !== '' && limit === 1) ? 'none' : 'inline-block'}">
        <el-upload
            :limit="limit"
            multiple
            action="123"
            :http-request="upload"
            :before-upload="beforeAvatarUpload"
            :on-error="handleError"
            :file-list="backfillList"
            :list-type="listType"
            :show-file-list="isShow">
          <el-button size="small" type="primary" >点击上传</el-button>
        </el-upload>
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
      default: 'size148' // -版本(size148、size70、size36)
    }
  },
  data() {
    return {
      backfillList: [], // -接受父层回显、上传后list同步、删除同步、传给父层
      decryData:{}
    }
  },
  mounted() {
    this.get_s3_info() // -加载组件就获取凭证
    this.$nextTick(() => { this.init() })
  },
  methods: {
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
    get_s3_info: function() {
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
      s3.putObject(params, (err, data) => {
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
      // var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      // const extension = testmsg === "pdf";
      const ispdf = file.type === 'application/pdf'
      if (!ispdf) {
        this.$message.error('文件只能是 PDF 格式!')
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
<style lang="scss">
.fileAwsBox{
  .el-upload--picture-card{
    width:0!important;
    height:0!important;
    border:0!important;
  }
}
</style>