/*
 * desc：全局过滤器：时间戳过滤为日期
 */ 

// 时间戳过滤
let formattime = (timestamp, fmt = 'yyyy年M月d日') => {
    timestamp = String(timestamp).length == 10 ? timestamp * 1000 : timestamp
    const date = new Date(timestamp)
    // console.log(date)
    const o = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(),      // 日
        'h+': date.getHours(),     // 小时
        'm+': date.getMinutes(),   // 分
        's+': date.getSeconds(),   // 秒
        // 'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        // 'S': this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
let formattime1 = (timestamp, fmt = 'yyyy年M月d日 hh:mm') => {
    timestamp = String(timestamp).length == 10 ? timestamp * 1000 : timestamp
    const date = new Date(timestamp)
    // console.log(date)
    const o = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(),      // 日
        'h+': date.getHours(),     // 小时
        'm+': date.getMinutes(),   // 分
        's+': date.getSeconds(),   // 秒
        // 'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        // 'S': this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    for (const k in o) { 
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}
   
// 根据身份证号码判断男女
let sexIdcardFilter = value => {
    if (!value) {
      return ''
    } else {
      let data = value.substr(16, 1) % 2 === 1 ? '男' : '女'
      return data
    }
}
   
// 身份证号脱敏('331082199708094687' 转换成 '33108219********87') 第8位开始替换8个
let IDcardHide = num => {
    let data = num.replace(/(\d{8})\d{8}(\d*)/, '$1********$2')
    return data
}
   
// 手机号脱敏('13912345678' 转换成 '139****5678') 第3位开始替换4个
let telHide = num => {
    let data = num.replace(/(\d{3})\d{4}(\d*)/, '$1****$2')
    return data
}
   
// 姓名脱敏(小明 转换成 *明   李小明 转换成 李*明   欧阳小明 转换成 欧**明)
let nameHide = name => {
    if (name.length === 2) {
      return new Array(name.length).join('*') + name.substr(-1)
    } else {
      return (
        name.substr(0, 1) + new Array(name.length - 1).join('*') + name.substr(-1)
      )
    }
}
   
export default {
    formattime,
    formattime1,
    sexIdcardFilter,
    IDcardHide,
    telHide,
    nameHide
}