// # 管理模块列表
var management_module_list = [
    {
        value:'user_management',
        label:'用户管理'
    } ,
    {
        value:'provenance_management',
        label:'二维码管理'
    },
    {
        value:'company_management',
        label:'公司管理'
    },
    {
        value:'marketing',
        label:'营销中心'
    },
    {
        value:'product_management',
        label:'产品管理'
    },
]
//# 权限列表
var permission_list =[
    {
        value:'read',
        label:'读取'
    },
    {
        value:'create',
        label:'创建'
    },
    {
        value:'update',
        label:'更新'
    },
    {
        value:'scan',
        label:'扫描'
    },
]
//# 用户可看功能模块权限列表
var table_permissions_list =[
    {
        value:'All',
        label:'所有功能模块'
    } ,
    {
        value:'TracingPlate',//节点模板
        label:'溯源板块'
    } ,
    {
        value:'NodeTemplate',//节点模板
        label:'节点模板'
    } ,
    {
        value:'LabelFile',
        label:'节点附件'
    } ,
    {
        value:'ChangeNodeApplication',
        label:'节点修复'
    } ,
    {
        value:'CashRedEnvelopeRule',//红包
        label:'红包'
    } ,
    {
        value:'PointRule',//积分
        label:'积分'
    } ,
    {
        value:'ProductLottery',
        label:'产品抽奖'
    } ,
    {
        value:'TurntableLotteryRule',//抽奖
        label:'转盘抽奖'
    } ,
    {
        value:'Payment',
        label:'支付'
    } ,
]
// # 注册时可选板块
var register_permissions_list =[
    {
        value:'NodeTemplate',
        label:'溯源管理'
    } ,
    {
        value:'CashRedEnvelopeRule',
        label:'红包管理'
    } ,
    {
        value:'TurntableLotteryRule',
        label:'抽奖管理'
    } ,
    {
        value:'PointRule',
        label:'积分管理'
    } ,
]
// # 红包规则类型
var red_rule_category_list =[
    {
        value:'2',
        label:'随机拼手气红包',// random amount
    } ,
    {
        value:'1',
        label:'普通固定红包',// fixed amount
    } ,
]
// # 用户性别类型
var user_sex_list =[
    {
        value:'0',
        label:'未知'
    } ,
    {
        value:'1',
        label:'男'
    } ,
    {
        value:'2',
        label:'女'
    } ,
]
// 二维码标签类型
var label_type_list = [
    {
        value:'rfid_label',
        label:'RFID Label'
    } ,
    {
        value:'nfc_label',
        label:'RFID+NFC Label'
    },
    {
        value:'qr_code_label',
        label:'QR Code Label'
    },
    {
        value:'free_qr_code',
        label:'Free QR Code Label'
    },
]
//# 二维码标签状态列表
var apply_status_list = [
    {
        value:null,
        label:'待审核',
        color:'#FF453A'
    } ,
    {
        value:'cancel',
        label:'待提交',
        color:'#FFBD2F'
    },
    {
        value:'In Progress',
        label:'待审核',//处理中
        color:'#FF453A'
    },
    {
        value:'Confirm',
        label:'已确认',
        color:'#32D74B'
    }
]
// # 转盘抽奖类型
var turntable_lottery_category = [
    {
        value:'2',
        label:'红包',
    },
    {
        value:'1',
        label:'积分',
    },
    {
        value:'0',
        label:'自定义产品',
    },
    {
        value:'3',
        label:'再来一次',
    },
]
// # 转盘抽奖记录状态
var turntable_lottery_log_status = [
    {
        value:'1',
        label:'创建记录',
    },
    {
        value:'2',
        //待发货,积分/钱
        label:'待到账',
    },
    {
        value:'3',
        //已发货,积分/钱
        label:'已到账',
    },
    {
        value:'4',
        //，只针对红包会出现
        label:'异常提现',
    },
]
export {
    management_module_list,//管理模块列表
    table_permissions_list,//用户可看功能模块权限列表
    register_permissions_list,//注册时可选板块
    permission_list,//权限列表
    red_rule_category_list,//红包规则类型
    user_sex_list,// # 用户性别类型
    label_type_list,//二维码标签类型
    apply_status_list,//二维码标签状态列表
    turntable_lottery_category,//转盘抽奖类型
    turntable_lottery_log_status,//转盘抽奖记录状态
}
