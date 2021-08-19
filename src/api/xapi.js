import request from '@/plugins/request.js'
// 1、get请求   用于获取数据。
// 2、post请求  用于提交数据（新建）、包括表单提交及文件上传。
// 3、put请求  用于更新数据（修改），将所有数据都推送到后端。
// 4、patch请求   用于更新数据（修改），只将修改的数据推送到后端。
// 5、delete请求  用于删除数据。
//渠道(代理商管理)
export function get_saleagent(data) {
    return request({
        url: 'saleagent',
        method: 'GET',
        data
    })
}
export function put_saleagent(data) {
    return request({
        url: 'saleagent',
        method: 'put',
        data
    })
}
export function post_saleagent(data) {
    return request({
        url: 'saleagent',
        method: 'post',
        data
    })
}
export function delete_saleagent(data) {
    return request({
        url: 'saleagent',
        method: 'delete',
        data
    })
}

//检测报告列表
export function get_label_file(data) {
    return request({
        url: 'label_file',
        method: 'GET',
        data
    })
}
//更新检测报告
export function put_label_file(data) {
    return request({
        url: 'label_file',
        method: 'put',
        data
    })
}

//国家
export function get_national_info(data) {
    return request({
        url: 'national_info',
        method: 'GET',
        data
    })
}
//地区
export function getArea(data) {
    return request({
        url: 'area',
        method: 'GET',
        data
    })
}
// 兑换二维码
export function exchangeCode(data) {
    return request({
        url: 'buy_label_purchase_with_code',
        method: 'POST',
        data
    })
}
// 红包订单管理
export function getCashRedList(data) {
    return request({
        url: 'cash_red_envelope_data_analysis',
        method: 'GET',
        data
    })
}
//红包领取明细
export function getCashRedDetail(data) {
    return request({
        url: 'cash_red_envelope_log',
        method: 'GET',
        data
    })
}
//红包规则
export function getCashRedRule(data) {
    return request({
        url: 'cash_red_envelope_rule',
        method: 'GET',
        data
    })
}
//新增
export function postCashRedRule(data) {
    return request({
        url: 'cash_red_envelope_rule',
        method: 'POST',
        data
    })
}
//修改
export function putCashRedRule(data) {
    return request({
        url: 'cash_red_envelope_rule',
        method: 'PUT',
        data
    })
}
//删除
export function deleteCashRedRule(data) {
    return request({
        url: 'cash_red_envelope_rule',
        method: 'DELETE',
        data
    })
}

//红包数据分析
export function getCash_red_envelope_total_data_analysis(data) {
    return request({
        url: 'cash_red_envelope_total_data_analysis',
        method: 'GET',
        data
    })
}
//创建或者编辑节点附件页面
export function getCe_label_file_page(data) {
    return request({
        url: 'ce_label_file_page',
        method: 'GET',
        data
    })
}
//节点修复
export function getChange_node_application(data) {
    return request({
        url: 'change_node_application',
        method: 'GET',
        data
    })
}
//新增
export function postChange_node_application(data) {
    return request({
        url: 'change_node_application',
        method: 'POST',
        data
    })
}
//修改
export function putChange_node_application(data) {
    return request({
        url: 'change_node_application',
        method: 'PUT',
        data
    })
}
// 检查可用标签数量
export function getCheck_available_label_num(data) {
    return request({
        url: 'check_available_label_num',
        method: 'GET',
        data
    })
}
//检查申请标签
export function getCheck_label(data) {
    return request({
        url: 'check_label',
        method: 'GET',
        data
    })
}
//仪表盘
export function getDashboard(data) {
    return request({
        url: 'dashboard',
        method: 'GET',
        data
    })
}
//申请下载标签
export function getDownload_label_apply(data) {
    return request({
        url: 'download_label_apply',
        method: 'POST',
        data
    })
}
//二维码申请
export function getLabel_apply(data) {
    return request({
        url: 'label_apply',
        method: 'GET',
        data
    })
}
//新增
export function postLabel_apply(data) {
    return request({
        url: 'label_apply',
        method: 'POST',
        data
    })
}
//修改
export function putLabel_apply(data) {
    return request({
        url: 'label_apply',
        method: 'PUT',
        data
    })
}
//修改  提交 撤销
export function patchLabel_apply(data) {
    return request({
        url: 'label_apply',
        method: 'PATCH',
        data
    })
}
//申请二维码页面
export function getLabel_apply_page(data) {
    return request({
        url: 'label_apply_page',
        method: 'GET',
        data
    })
}
// 查看溯源节点信息
export function getLabel_node_info(data) {
    return request({
        url: 'label_node_info',
        method: 'GET',
        data
    })
}

// 节点附件
export function getLabel_file(data) {
    return request({
        url: 'label_file',
        method: 'GET',
        data
    })
}
//新增
export function postLabel_file(data) {
    return request({
        url: 'label_file',
        method: 'POST',
        data
    })
}
//修改
export function putLabel_file(data) {
    return request({
        url: 'label_file',
        method: 'PUT',
        data
    })
}
//删除
export function deleteLabel_file(data) {
    return request({
        url: 'label_file',
        method: 'DELETE',
        data
    })
}
// 节点模板
export function getLabel_node_template(data) {
    return request({
        url: 'label_node_template',
        method: 'GET',
        data
    })
}
//新增
export function postLabel_node_template(data) {
    return request({
        url: 'label_node_template',
        method: 'POST',
        data
    })
}
//修改
export function putLabel_node_template(data) {
    return request({
        url: 'label_node_template',
        method: 'PUT',
        data
    })
}
//删除
export function deleteLabel_node_template(data) {
    return request({
        url: 'label_node_template',
        method: 'DELETE',
        data
    })
}
// 溯源节点信息列表
export function getLabel_provenance_node(data) {
    return request({
        url: 'label_provenance_node',
        method: 'GET',
        data
    })
}
//二维码订单
export function getLabel_purchase(data) {
    return request({
        url: 'label_purchase',
        method: 'GET',
        data
    })
}
//二维码标签详情列表
export function getLabel_tracking(data) {
    return request({
        url: 'label_tracking',
        method: 'GET',
        data
    })
}
//公司信息
export function getManufacturer(data) {
    return request({
        url: 'manufacturer',
        method: 'GET',
        data
    })
}
//新增
export function postManufacturer(data) {
    return request({
        url: 'manufacturer',
        method: 'POST',
        data
    })
}
//修改
export function putManufacturer(data) {
    return request({
        url: 'manufacturer',
        method: 'PUT',
        data
    })
}
//支付管理列表
export function getPayment(data) {
    return request({
        url: 'payment',
        method: 'GET',
        data
    })
}
//新增
export function postPayment(data) {
    return request({
        url: 'payment',
        method: 'POST',
        data
    })
}
// 修改
export function putPayment(data) {
    return request({
        url: 'payment',
        method: 'PUT',
        data
    })
}
//删除
export function deletePayment(data) {
    return request({
        url: 'payment',
        method: 'DELETE',
        data
    })
}

//积分领取明细
export function getPointInfo(data) {
    return request({
        url: 'point_log_detail',
        method: 'GET',
        data
    })
}
// 积分订单管理
export function getPointOrder(data) {
    return request({
        url: 'point_order_manager',
        method: 'GET',
        data
    })
}
//积分规则
export function getPointRule(data) {
    return request({
        url: 'point_rule',
        method: 'GET',
        data
    })
}
export function postPointRule(data) {
    return request({
        url: 'point_rule',
        method: 'POST',
        data
    })
}
export function putPointRule(data) {
    return request({
        url: 'point_rule',
        method: 'PUT',
        data
    })
}
export function deletePointRule(data) {
    return request({
        url: 'point_rule',
        method: 'DELETE',
        data
    })
}
//编辑积分规则
export function get_point_rule_edit(data) {
    return request({
        url: 'point_rule_edit',
        method: 'GET',
        data
    })
}
//积分数据分析
export function get_point_rule_data_analysis(data) {
    return request({
        url: 'point_rule_data_analysis',
        method: 'GET',
        data
    })
}
//品牌
export function get_brand(data) {
    return request({
        url: 'brand',
        method: 'GET',
        data
    })
}
//新增
export function post_brand(data) {
    return request({
        url: 'brand',
        method: 'POST',
        data
    })
}
//修改
export function put_brand(data) {
    return request({
        url: 'brand',
        method: 'PUT',
        data
    })
}
//删除
export function delete_brand(data) {
    return request({
        url: 'brand',
        method: 'DELETE',
        data
    })
}
//公司信息分类
export function getClassification(data) {
    return request({
        url: 'classification',
        method: 'GET',
        data
    })
}
//产品类型
export function get_product_classification(data) {
    return request({
        url: 'product_classification',
        method: 'GET',
        data
    })
}
//产品
export function getProduct(data) {
    return request({
        url: 'product',
        method: 'GET',
        data
    })
}
//添加
export function postProduct(data) {
    return request({
        url: 'product',
        method: 'POST',
        data
    })
}
//修改
export function putProduct(data) {
    return request({
        url: 'product',
        method: 'PUT',
        data
    })
}
//删除
export function deleteProduct(data) {
    return request({
        url: 'product',
        method: 'DELETE',
        data
    })
}
//S3信息
export function get_s3_info(data) {
    return request({
        url: 's3_info',
        method: 'GET',
        data
    })
}
//抽奖订单管理
export function getLottery_draw_management(data) {
    return request({
        url: 'turntable_lottery_draw_management',
        method: 'GET',
        data
    })
}
//抽奖数据分析
export function getCodeAwardDataAnalysis(data) {
    return request({
        url: 'turntable_lottery_award_data_analysis',
        method: 'GET',
        data
    })
}
//抽奖明细
export function getCodeAwardDetail(data) {
    return request({
        url: 'turntable_lottery_detail',
        method: 'GET',
        data
    })
}

//中奖记录
export function getCodeAwardLog(data) {
    return request({
        url: 'turntable_lottery_log',
        method: 'GET',
        data
    })
}
//
export function putCodeAwardLog(data) {
    return request({
        url: 'turntable_lottery_log',
        method: 'PUT',
        data
    })
}

//抽奖规则
export function getCodeAwordRule(data) {
    return request({
        url: 'turntable_lottery_rule',
        method: 'GET',
        data
    })
}
//添加
export function postCodeAwordRule(data) {
    return request({
        url: 'turntable_lottery_rule',
        method: 'POST',
        data
    })
}
//修改
export function putCodeAwordRule(data) {
    return request({
        url: 'turntable_lottery_rule',
        method: 'PUT',
        data
    })
}
//删除
export function deleteCodeAwordRule(data) {
    return request({
        url: 'turntable_lottery_rule',
        method: 'DELETE',
        data
    })
}

//发送验证码
export function send_code(data) {
    return request({
        url: 'send_code',
        method: 'POST',
        data
    })
}
//用户管理
export function getUser(data) {
    return request({
        url: 'user',
        method: 'GET',
        data
    })
}
//添加
export function postUser(data) {
    return request({
        url: 'user',
        method: 'POST',
        data
    })
}
//修改
export function putUser(data) {
    return request({
        url: 'user',
        method: 'PUT',
        data
    })
}
//删除
export function deleteUser(data) {
    return request({
        url: 'user',
        method: 'DELETE',
        data
    })
}

//用户组管理
export function getMinUserRole(data) {
    return request({
        url: 'min_user_role',
        method: 'GET',
        data
    })
}
export function getUserRole(data) {
    return request({
        url: 'userrole',
        method: 'GET',
        data
    })
}
//添加
export function postUserRole(data) {
    return request({
        url: 'userrole',
        method: 'POST',
        data
    })
}
//修改
export function putUserRole(data) {
    return request({
        url: 'userrole',
        method: 'PUT',
        data
    })
}
//删除
export function deleteUserRole(data) {
    return request({
        url: 'userrole',
        method: 'DELETE',
        data
    })
}


