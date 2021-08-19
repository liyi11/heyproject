<template>
  <div class="page dashBoard">
    <div class="navBar navBarRight">
      <NavbarRight></NavbarRight>
    </div>
    <section>
      <c-title>
        <span slot="title"  class="title">
           仪表盘
        </span>
      </c-title>
    </section>
    <section class="page_body">
      <div class="main_wrap">
        <div class="left_box">
          <section class="addTitle">
            <c-title>
              <span slot="secTxt" class="secTxt">
                 扫描次数展示
              </span>
            </c-title>
          </section>
           <div class="left_box_top">
             <div id="mapBox" ref="mapBox" style="width: 100%; height: 100%"></div>
             <div class="mask font_white ">
               <div class="mask_wrap">
                 <div class="mask_title mask_item">扫码排行榜</div>
                 <el-row :span="24" class="mask_item tc">
                   <el-col :span="6">
                     排行
                   </el-col>
                   <el-col :span="9">
                     地区
                   </el-col>
                   <el-col :span="9">
                     扫描统计
                   </el-col>
                 </el-row>
                 <el-row :span="24" class="mask_item tc"  v-for="(item,index) in area_scan_count" :key="index">
                   <el-col :span="6" :class="index<=3?'font_main':''" class="index_text">
                     {{ index+1 }}
                   </el-col>
                   <el-col :span="9">
                     {{ item.provance }}
                   </el-col>
                   <el-col :span="9">
                     {{ item.count+'张' }}
                   </el-col>
                 </el-row>
               </div>
             </div>
           </div>
          <div class="flex desc_box">
            <section>
              <c-title>
              <span slot="secTxt" class="secTxt">
                 剩余二维码数量
              </span>
              </c-title>
            </section>
            <div class="right_desc">
              <p><span class="circ"></span><span class="font_main">二维码使用总数</span> <span class="count">{{total_used_num?total_used_num:0}}个</span></p>
              <p class="line"></p>
              <p><span class="circ"></span><span class="font_main">二维码扫描总数</span> <span class="count">{{ total_scan_count?total_scan_count:0 }}个</span></p>
            </div>
          </div>
          <div class="left_box_bot">
            <div class="left_box_item">
              <div class="left_box_item_wrap">
                <div class="item_left">
                  <div class="item_left_top flex">
                    <div class="img_box">
                      <img src="../../assets/images/dash_icon1.png" alt="">
                    </div>
                    <div class="desc_title">
                      <p>NFC标签</p>
                      <p>总量：{{total_and_used_data.nfc_label.total_num}}万张</p>
                    </div>
                  </div>
                  <div class="item_left_bot">
                    <p>{{total_and_used_data.nfc_label.rest_num}}<span>张</span></p>
                    <p>剩余标签数量</p>
                  </div>
                </div>
                <div class="item_right">
                  <div class="left_bot_line1" id="left_bot_line1"
                       style="width: 100%;height: 68px;"></div>
                </div>
              </div>
            </div>
            <div class="left_box_item">
              <div class="left_box_item_wrap">
                <div class="item_left">
                  <div class="item_left_top flex">
                    <div class="img_box">
                      <img src="../../assets/images/dash_icon2.png" alt="">
                    </div>
                    <div class="desc_title">
                      <p>RFID标签</p>
                      <p>总量：{{total_and_used_data.rfid_label.total_num}}万张</p>
                    </div>
                  </div>
                  <div class="item_left_bot">
                    <p>{{total_and_used_data.rfid_label.rest_num}}  <span>张</span></p>
                    <p>剩余标签数量</p>
                  </div>
                </div>
                <div class="item_right">
                  <div class="left_bot_line2" id="left_bot_line2"
                       style="width: 100%;height: 68px;"></div>
                </div>
              </div>
            </div>
            <div class="left_box_item">
              <div class="left_box_item_wrap">
                <div class="item_left">
                  <div class="item_left_top flex">
                    <div class="img_box">
                      <img src="../../assets/images/dash_icon3.png" alt="">
                    </div>
                    <div class="desc_title">
                      <p>防伪标签</p>
                      <p>总量：{{total_and_used_data.qr_code_label.total_num}}万张</p>
                    </div>
                  </div>
                  <div class="item_left_bot">
                    <p>{{total_and_used_data.qr_code_label.rest_num}}<span>张</span></p>
                    <p>剩余标签数量</p>
                  </div>
                </div>
                <div class="item_right">
                  <div class="left_bot_line3" id="left_bot_line3"
                       style="width: 100%;height: 68px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right_box">
          <div class="right_box_wrap">
            <div class="right_box_top">
              <section class="top_title">
                <c-title>
                  <span slot="secTxt" class="secTxt">
                     二维码使用总量
                  </span>
                </c-title>
              </section>
              <p class="ft12">单位：万个</p>
              <div class="right_top_option_main" id="right_top_option_main" style="width: 100%;height: 250px;"></div>
            </div>
            <div class="right_box_bot">
              <p class="ft12 bot-title">二维码使用总量：</p>
              <div class="flex_box">
                <div class="flex_item">
                  <div class="flex_item_left flex">
                    <div class="img_box">
                      <img src="../../assets/images/dash_icon.png" alt="" >
                    </div>
                    <div class="flex_title">
                      <p>防伪标签总量</p>
                      <p class="ft12">{{new Date()|formattime('yyyy-MM-dd')}}</p>
                    </div>
                  </div>
                  <div class="flex_item_right">
                    <p>{{total_and_used_data.qr_code_label.used_num}}</p>
                    <p class="sub_span">张</p>
                  </div>
                </div>
                <div class="flex_item">
                  <div class="flex_item_left flex">
                    <div class="img_box">
                      <img src="../../assets/images/dash_icon.png" alt="">
                    </div>
                    <div class="flex_title">
                      <p>NFC标签总量</p>
                      <p class="ft12">{{new Date()|formattime('yyyy-MM-dd')}}</p>
                    </div>
                  </div>
                  <div class="flex_item_right">
                    <p>{{total_and_used_data.nfc_label.used_num}}</p>
                    <p class="sub_span">张</p>
                  </div>
                </div>
              </div>
              <div class="flex_box">
                <div class="flex_item">
                  <div class="flex_item_left flex">
                    <div class="img_box">
                      <img src="../../assets/images/dash_icon.png" alt="">
                    </div>
                    <div class="flex_title">
                      <p>RFID标签总量</p>
                      <p class="ft12">{{new Date()|formattime('yyyy-MM-dd')}}</p>
                    </div>
                  </div>
                  <div class="flex_item_right">
                    <p>{{total_and_used_data.rfid_label.used_num}}</p>
                    <p class="sub_span">张</p>
                  </div>
                </div>
                <div class="flex_item">
                  <div class="flex_item_left flex">
                    <div class="img_box">
                      <img src="../../assets/images/dash_icon.png" alt="">
                    </div>
                    <div class="flex_title">
                      <p>溯源二维码总量</p>
                      <p class="ft12">{{new Date()|formattime('yyyy-MM-dd')}}</p>
                    </div>
                  </div>
                  <div class="flex_item_right">
                    <p>{{total_and_used_data.free_qr_code.used_num}}</p>
                    <p class="sub_span">张</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="right_box_btn_box" @click="jumpCode()">
              <p class="right_box_btn">二维码兑换</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
require('echarts/theme/macarons.js');
var echarts = require('echarts');
const chinaJson = require("../../../public/mapJson/china.json");
import { getDashboard } from '@/api/xapi';
export default {
  components: {
    CTitle: () => import('@/components/CTitle/index'),
    NavbarRight:() => import('@/components/NavbarRight'),
  },
  computed: {
  },
  data() {
    return {
      area_scan_count:[],
      month_label_used:[],
      total_and_used_data:{
        free_qr_code:{},
        nfc_label:{},
        qr_code_label:{},
        rfid_label:{}
      },
      total_scan_count:'',
      total_used_num:'',

      myChart:'',
      distributionOptions:''
    }
  },
  created() {
    this.$getReset();
  },
  mounted() {
    this.getDashboard();
  },
  methods: {
    jumpCode(){
      this.$router.push('codeManage/codeOrder');
    },
    async getDashboard(){
      const res = await getDashboard({});
      this.area_scan_count = res.data.area_scan_count;//扫码地区
      this.total_and_used_data = res.data.total_and_used_data;
      this.total_scan_count = res.data.total_scan_count;
      this.total_used_num = res.data.total_used_num;
      this.total_scan_count = res.data.total_scan_count;
      this.month_label_used = res.data.month_label_used;// # 每月使用量统计
      this.init_right_top_option();
      this.init_left_bot_line1();
      this.init_left_bot_line2();
      this.init_left_bot_line3();
      this.$nextTick(()=>{
        this.init_left_top_map();
      })
    },
    changeOptions (name) {
      // 经纬度数据
      const seriesList =[];
      let data =[]
      if(this.area_scan_count.length>0){
        this.area_scan_count.map(item =>{
          data.push(item.lg.concat(item.count).concat(item.provance))
          seriesList.push({
            data
          })
        })
      }
      // 图标
      const series = seriesList.map(v => {
        return {
          type: "scatter", //配置显示方式为用户自定义
          coordinateSystem: "geo",
          data: v.data,
          encode: {
            value: 2
          },
          symbolSize: 25,
          itemStyle: {
            normal: {
              color:'#FFBD2F',
              borderWidth: 2,//区域边框宽度
              borderColor: '#FFBD2F',//区域边框颜色

            },
          },
          label: {
            normal: {
              color:"#000",
              show: true,//显示市区标签
              textStyle:{
                color:"#000",
                fontFamily:'PingFang HK'
              }//省份标签字体颜色
            },
          },

        };
      });
      this.distributionOptions = {
        series,  // 数据
        geo: {
          map: name || 'china',  // 引入地图 省份或者 国家
          layoutCenter: ["50%", "50%"], //设置后left/right/top/bottom等属性无效
          layoutSize: "80%",
          roam: true, //开启鼠标缩放和漫
          zoom: 3,
          label: {
            normal: {
              //静态的时候展示样式
              show: true, //是否显示地图省份得名称
              textStyle: {
                color: "#919191",
                fontSize: 10,
                fontFamily: "PingFang HK",
              }
            },
            emphasis: {  // 高亮状态下的样式
              //动态展示的样式
              color: "#919191"
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#333332',
              borderColor: '#444445',
              shadowBlur: 0,          // 图形阴影的模糊大小
              shadowOffsetX: 0,        // 阴影水平方向上的偏移距离。
            },
            emphasis: {
              areaColor: '#252525',
              borderColor: '#444445',
              shadowBlur: 0,          // 图形阴影的模糊大小
              shadowOffsetX: 0,        // 阴影水平方向上的偏移距离。
            }
          },
        }
      };
    },
    init_left_top_map(){
      echarts.registerMap("china", chinaJson);
      this.changeOptions("china")
      this.myChart = echarts.init(document.getElementById("mapBox"));
      this.myChart.setOption(this.distributionOptions);
    },
    init_left_bot_line1(){
      let total_num = Number(this.total_and_used_data.nfc_label.total_num +'00000');
      let used_num = Number(this.total_and_used_data.nfc_label.used_num);
      var option = {
        xAxis: {
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          type: 'category',
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '80%',
        },
        series: [{
          data: [0,used_num,total_num ],
          type: 'line',
          smooth: true,
          symbolSize:6,
          boundaryGrap:false,
          itemStyle : {
            normal : {
              color: '#000', //改变折线点的颜色
              lineStyle: {
                color: '#FFBD2F' //改变折线颜色
              }
            }
          },
          lineStyle: {
            color: '#FFBD2F' //改变折线颜色
          }
        }]
      };
      var mychart = echarts.init(document.getElementById('left_bot_line1'));
      mychart.setOption(option);
    },
    init_left_bot_line2(){
      let total_num = Number(this.total_and_used_data.rfid_label.total_num +'00000');
      let used_num = Number(this.total_and_used_data.rfid_label.used_num);
      var option = {
        xAxis: {
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          type: 'category',
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '80%',
        },
        series: [{
          data: [0,used_num,total_num ],
          type: 'line',
          smooth: true,
          symbolSize:6,
          boundaryGrap:false,
          itemStyle : {
            normal : {
              color: '#000', //改变折线点的颜色
              lineStyle: {
                color: '#FFBD2F' //改变折线颜色
              }
            }
          },
          lineStyle: {
            color: '#FFBD2F' //改变折线颜色
          }
        }]
      };
      var mychart = echarts.init(document.getElementById('left_bot_line2'));
      mychart.setOption(option);
    },
    init_left_bot_line3(){
      let total_num = Number(this.total_and_used_data.qr_code_label.total_num +'00000');
      let used_num = Number(this.total_and_used_data.qr_code_label.used_num);
      var option = {
        xAxis: {
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          type: 'category',
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '80%',
        },
        series: [{
          data: [0,used_num,total_num ],
          type: 'line',
          smooth: true,
          symbolSize:6,
          boundaryGrap:false,
          itemStyle : {
            normal : {
              color: '#000', //改变折线点的颜色
              lineStyle: {
                color: '#FFBD2F' //改变折线颜色
              }
            }
          },
          lineStyle: {
            color: '#FFBD2F' //改变折线颜色
          }
        }]
      };
      var mychart = echarts.init(document.getElementById('left_bot_line3'));
      mychart.setOption(option);
    },
    init_right_top_option(){
      let lengendData = [];
      let month_data = [];
      let series_data = [];
      let series_data0 = [];
      let series_data1 = [];
      let series_data2 = [];
      let series_data3 = [];
      this.month_label_used.map(item =>{
        lengendData.push(item.label_type);
        series_data.push(item.year_data);
      })
      for(var key in series_data[0]){
        month_data.push(key);
        series_data0.push(series_data[0][key])
      }
      for(var key1 in series_data[1]){
        series_data1.push(series_data[1][key1])
      }
      for(var key2 in series_data[2]){
        series_data2.push(series_data[2][key2])
      }
      for(var key3 in series_data[3]){
        series_data3.push(series_data[3][key3])
      }
      var option ={
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: month_data,
          boundaryGap:["1","0"],
          axisLine: {
            lineStyle:{
              color:'#313131',     //X轴的颜色
              width:1
            },
          },
          axisLabel:{
            textStyle:{
              color:'#888998',
              fontFamily: 'PingFang HK'
            },
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle:{
              color:'#313131',     //横向边框
              width:1
            },
          },
        },
        series: [
          {
            name: lengendData[0],
            type: 'line',
            symbolSize:3,
            data: series_data0,
            smooth: true,
            itemStyle: {
              normal: {
                color: '#FFB34C',
                lineStyle:{
                  width:1//设置线条粗细
                }
              }
            }
          },
          {
            name: lengendData[1],
            type: 'line',
            data: series_data1,
            smooth: true,
            itemStyle: {
              normal: {
                color: '#AEA3FF',
                lineStyle:{
                  width:1//设置线条粗细
                }
              }
            }
          },
          {
            name: lengendData[2],
            type: 'line',
            data: series_data2,
            smooth: true,
            itemStyle: {
              normal: {
                color: '#5583EF',
                lineStyle:{
                  width:1//设置线条粗细
                }
              }
            }
          },
          {
            name: lengendData[3],
            type: 'line',
            data: series_data3,
            smooth: true,
            itemStyle: {
              normal: {
                color: '#FFA2C0',
                lineStyle:{
                  width:1//设置线条粗细
                }
              }
            }
          }
        ]
      }
      var mychart = echarts.init(document.getElementById('right_top_option_main'));
      mychart.setOption(option);
    },
  }
}
</script>

<style lang="scss" scoped>
   .dashBoard{
     /deep/ #mapBox{
       border-radius: 24px;
       background: #181919;
     }
     /deep/ #mapBox > div{
       border-radius: 24px!important;
     }
     /deep/ #mapBox canvas{
       border-radius: 24px!important;
     }
     .main_wrap{
       display: flex;
       justify-content: space-between;
       .addTitle{
         margin-bottom: 27px;
       }
       .left_box{
         width:57%;
         .left_box_top{
           height:475px;
           border-radius: 24px;
           border: 1px solid rgb(25,26,26);
           box-shadow: 5px 5px 12px 5px rgb(25,26,26);
           position: relative;
           .mask{
             position: absolute;
             width: 244px;
             max-height: 200px;
             right: 20px;
             top: 20px;
             background: #000000;
             border-radius: 13px;
             .mask_wrap{
               overflow-y: scroll;
               padding:25px;
               .mask_title{
                 font-size: 14px!important;
               }
               .mask_item{
                 font-weight: 400;
                 font-size: 8px;
                 margin-bottom: 16px;
               }
               .index_text{
                 font-weight: 500;
               }
             }
             .mask_wrap::-webkit-scrollbar {
               display: none;
             }
             .mask_wrap::-webkit-scrollbar { width: 0 !important }
             .mask_wrap { -ms-overflow-style: none; }
             .mask_wrap { overflow: -moz-scrollbars-none; }
           }
         }
         .desc_box{
           margin-top:41px;
           margin-bottom:27px;
           justify-content: space-between;
           align-content: center;
           align-items: center;
           .right_desc{
             display: flex;
             justify-content: space-between;
             align-content: center;
             align-items: center;
             span{
               display: inline-block;
             }
             .circ{
               width: 8px;
               height: 8px;
               background: #FFBD2F;
               border-radius: 8px;
               margin-right: 10px;
             }
             .line{
               width:1px;
               height: 29px;
               border-right: 1px solid #000;
               margin:0 18px;
             }
             .count{
               margin-left:18px;
             }
           }
         }
         .left_box_bot{
           min-height:141px;
           display: flex;
           justify-content: flex-start;
           flex-wrap: wrap;
           .left_box_item{
             flex:1;
             min-width:213px;
             max-width:246px;
             margin-right:31px;
             margin-bottom: 10px;
             background: #000000;
             border: 1px solid rgba(59, 59, 59, 0.497951);
             box-sizing: border-box;
             border-radius: 16px;
             .left_box_item_wrap{
               padding:15px 10px;
               height: calc(100% - 30px);
               display: flex;
               justify-content: space-between;
               align-items: center;
               .item_left{
                 .item_left_top{
                   .img_box{
                     width:50px;
                     height:48.5px;
                     margin-right: 5px;
                     img{
                       width:100%;
                       height:100%;
                     }
                   }
                   .desc_title{
                     p:nth-child(2){
                       font-size: 10px;
                       font-weight: 400;
                       color:#8D8D8D;
                       margin-top: 5px;
                     }
                   }
                 }
                 .item_left_bot{
                   margin-left:5px;
                   p:nth-child(1){
                     font-weight: 700;
                     font-size: 30px;
                     span{
                       margin-left:5px;
                       font-weight: 400;
                       font-size: 10px;
                       color:#8D8D8D;
                     }
                   }
                   p:nth-child(2){
                     font-weight: 400;
                     font-size: 10px;
                     color:#8D8D8D;
                     margin-top:2px;
                   }
                 }
               }
               .item_right{
                 width:85px;
               }
             }
           }
           .left_box_item:nth-child(3){
             margin-right:0px;
           }
         }
       }
       .right_box{
         width:calc(43% - 40px);
         background: #000;
         border-radius: 20px;
         .right_box_wrap{
           padding:37px 40px;
           .right_box_top{
             .top_title{
               margin-bottom: 31px;
             }
           }
           .right_box_bot{
             .bot-title{
               margin-top:39px;
               margin-bottom:27px;
             }
             .flex_box{
               display: flex;
               justify-content:center;
               align-items: center;
               flex-wrap: wrap;
               .flex_item{
                 flex:1;
                 margin-bottom: 10px;
                 margin-right:10px;
                 max-width:220px;
                 min-width:154px;
                 padding:10px;
                 height:60px;
                 border-radius: 12px;
                 background: #1D1D1D;
                 justify-content:space-between;
                 align-items: center;
                 display: flex;
                 .flex_item_left{
                   justify-content:space-between;
                   align-items: center;
                   .img_box{
                     width:35px;
                     height:35px;
                     vertical-align: middle;
                     margin-right:7px;
                     img{
                       width:100%;
                       heihgt:100%;
                     }
                   }
                   .flex_title{
                     margin-right:10px;
                     p:nth-child(2){
                       color:#808080;
                       font-size: 6px;
                       margin-top:2px;
                     }
                   }
                 }
                 .flex_item_right{
                    p{
                      font-size:19px;
                      font-weight: 700;
                    }
                   .sub_span{
                     float: right;
                     color:#808080;
                     font-size: 6px;
                   }
                 }
               }
             }

           }
           .right_box_btn_box{
             text-align: center;
             margin:40px auto 0px auto;
             width:160px;
             height:54px;
             line-height: 54px;
             cursor: pointer;
             .right_box_btn{
               height:54px;
               border-radius:12px;
               background: #ccc;
               color:#000000;
               font-size: 16px;
             }
           }
         }
       }
     }
   }
</style>
<style  lang="scss">
.dashBoard{
  .navBar{
    //padding-top:20px!important;
    //height:47px!important;
  }
}
</style>
