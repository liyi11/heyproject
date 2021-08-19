<template>
  <!-- 文件上传mp4 集合 -->
  <div class="file-upload-container">
      <p  class="video_up_Box" v-if="String(filelist) == '' || limit != 1">
        <span v-if="typeval == 'video'" @click="btnClick" class="video_up_box">
          <img src="../../assets/images/video.png"/>
          {{ fileLabel }}
        </span>
        <span v-if="typeval == 'music'" @click="btnClick">上传音频</span>
      </p>
      <el-progress :percentage="progressPercent" color="#909399" v-show="progressShow"></el-progress>
      <!-- 动态的音频视频无法播放问题，可以通过ref去解决，这用的别一种方式 -->
      <div class="video-box" v-if="!videoing" >
        <!-- 音频、视频 -->
        <div class="video-item" v-for="(item, index) in filelist" :key="index" >
          <div class="video-data" v-if="typeval == 'video'">
            <video controls="controls" name="media" width="100%" height="173" >
              <source class="video-dom" :src="item.name" type="video/mp4">
              您的浏览器不支持视频标签，请用谷歌浏览器打开
            </video>
          </div>
<!--          <div class="haveVideoImage" v-if="video_image" :style="{backgroundImage:'url(' + video_image + ')'}"></div>-->
          <div class="music-data" v-if="typeval == 'music'">
            <audio controls="controls">
              <!-- name="media" width="230" height="150" -->
              <source class="music-dom" :src="item.name" type="audio/mpeg">
              您的浏览器不支持音频标签，请用谷歌浏览器打开
            </audio>
          </div>
          <i class="el-icon-error" @click="handleRemove(index)"></i>
        </div>
      </div>
      <el-upload
          style="display: none;"
          :class="['avatar-uploader', classbox]"
          :limit="limit"
          multiple
          action="123"
          :http-request="upload"
          :before-upload="beforeAvatarUpload"
          :file-list="filelist"
          :on-exceed="handleExceed"
          list-type="picture-card"
          :show-file-list="false">
        <i class="el-icon-plus avatar-uploader-icon"/>
      </el-upload>
  </div>
</template>

<script>
import { get_s3_info } from '@/api/xapi'
import cryptoJs from 'crypto-js'
// const  Base64 = require('js-base64').Base64;
import AWS from 'aws-sdk'
export default {
  props: {
    video_image:{
      dafault:''
    },
    fileLabel:{
      default:''
    },
    filevideo: {
      default:[]
    },
    limit: {
      type: Number,
      default: 1
    },
    classbox: {
      type: String,
      default: 'video-box'
    },
    typeval: {
      type: String,
      default: 'video' // video || music
    },
  },
  data() {
    return {
      filelist: [],
      progressShow: false,
      progressPercent: 0,
      videoing: false,
      decryData:{}
    }
  },
  watch:{
    filevideo:{
      handler () {
        this.filelist = JSON.parse(JSON.stringify(this.filevideo))
      },
      deep: true // 深度监听父组件传过来对象变化
    }
  },
  created() {
    this.init()
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
    init() {
      this.filelist = JSON.parse(JSON.stringify(this.filevideo))
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
      s3.putObject(params, (err) => {
        if (err) {
          console.log('失败');
          console.log(err, err.stack) // an error occurred
        } else {
          // //成功之后将获取的objectKey值来替换img的路径
          this.filelist.push({
            url:'https://'+this.decryData.AWS_S3_CUSTOM_DOMAIN+'/'+objectKey,
            name:'https://'+this.decryData.AWS_S3_CUSTOM_DOMAIN+'/'+objectKey
          })
          this.$emit('videosback', this.filelist)

        }
      })
    },
    btnClick() {
      document.querySelector('.' + this.classbox + ' input').click()
    },
    /**
     * 上传 前置 判断
     */
    beforeAvatarUpload(file) {
        if(this.typeval == 'video' && file.name.indexOf('.mp4') !== -1) {
            const isLt200M = file.size / 1024 / 1024 < 30
            if (!isLt200M) {
                this.$message.error('视频大小不能超过 30MB!')
                return false
            }
        } else if(this.typeval == 'video' && file.name.indexOf('.mp4') == -1) {
            this.$message.error('视频格式要求MP4!')
            return false
        }
        if(this.typeval == 'music' && file.name.indexOf('.mp3') !== -1) {
            const isLt200M = file.size / 1024 / 1024 < 30
            if (!isLt200M) {
                this.$message.error('音频大小不能超过 30MB!')
                return false
            }
        } else if(this.typeval == 'music' && file.name.indexOf('.mp3') == -1) {
            this.$message.error('音频格式要求MP3!')
            return false
        }
    },
    // 删视频
    handleRemove(i) {
        this.videoing = true
        this.filelist.splice(i, 1)
        this.$emit('videosback', this.filelist);
        this.$nextTick(() => { this.videoing = false })
    },
    // -自定义视频上传 (为了进度条做的自定义)
    customUpload(param) {
        let file = param.file
        // console.log(file)
        let form = new FormData() // 通过 FormData 对象上传文件
        form.append("file", file)
        form.append('key', this.uploadData.key)
        form.append('token', this.uploadData.token)
        this.progressShow = true
        axios.post(this.uploadUrl, form, {
          headers: {'Content-Type': 'multipart/form-data'},
          onUploadProgress: event => {
              event.percent = Math.floor(event.loaded / event.total * 100)
              this.progressPercent = event.percent
          }
        }).then(res=>{
          // console.log(res)
          res = res.data
          if (this.progressPercent >= 100) {
              this.progressShow = false
              this.progressPercent = 0
          }
          if(this.limit == 1) {
            this.filelist = [{name: this.$QNIMAGE +　res.key, url: this.$QNIMAGE + res.key}]
          } else {
            this.filelist.push({name: this.$QNIMAGE +　res.key, url: this.$QNIMAGE + res.key})
          }
          this.$emit('videosback', this.filelist)
        }, err => {
          console.log(err)
          axios.defaults.uploadfile = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.file-upload-container {
  .video_up_Box{
    display: inline-block!important;
    background: #1D1D1F!important;
    border-radius: 12px!important;
    width:100% !important;
    height:173px!important;
    text-align: center!important;
    cursor: pointer;
    .video_up_box{
      display: flex!important;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin:40px auto;
      line-height: 1.5;
      color:#BBBCC4;
      font-size: 10px;
      font-weight: 400;
      img{
        width:36px;
        height:36px;
      }
    }
  }
  .haveVideoImage{
    width: 100%;height: 201px;
    position: absolute;
    z-index: 4;
    left: 0;
    top:0;
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .video-box {
    position: relative;
    .video-item {
      position: relative;
      width: 100%;
      z-index: 3;
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      video {width: 100%;height: 173px;border-radius: 12px}
      audio {    cursor: pointer;}
      i.el-icon-error { position: absolute; top: -15px; right: -10px; font-size: 24px;
      color: #FE7676; cursor: pointer; z-index: -1; transition: all .3s ease; opacity: 0;}

      &:hover i.el-icon-error { top: -10px; right: -10px; z-index: 6; opacity: 1;}
    }
  }
  .el-progress {display: inline;margin-left: 15px;}
  /deep/ .el-progress-bar { width: 200px; }
}
</style>
