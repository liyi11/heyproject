import axios from 'axios'
import { Message } from 'element-ui'
import store from './store.js'
import { getToken } from './auth.js'
const service = axios.create({
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_API,
    withCredentials: true,
    timeout: 5*6*1000
})

service.interceptors.request.use(
    config => {
      if (store.getters.token) {
          config.headers['Authorization'] = getToken()
      }
      if(config.url=="payment" && (config.method == "POST" || config.method == "PUT")){
            config.headers['Content-Type'] = "multipart/form-data"
      }
      return config
    },
    error => {
        console.log(error)
      return Promise.reject(error)
    }
)

/*  # 响应状态码
ERR_MSG_DICT = {
  401: 'token校验失败',
  402: 'sign校验失败',
  403: '未授权',
  405: '请求方法不被允许',
  406: '参数校验失败',
  407: '缺少必填参数',
  408: '已存在',
  409: '创建失败',
  410: '无法更新',
  411: '查询失败',
  412: '密码错误',
  413: '关联信息错误',
  414: '拒绝访问',
  415: '额度不足'
}*/
service.interceptors.response.use(
    response => {
        const res = response.data;
      if (res.code !== 200) {
        Message({ message: res.msg || 'Error', type: 'error' })
        if (res.code === 401 || res.code === 406) {
            Message({ message: '你的登录已过期，请重新登录', type: 'error' })
            setTimeout(()=>{
                store.dispatch('pmsRemove').then(() => { location.reload() })
            },2000)
        }
        return res
      } else {
        return res
      }
    },
    error => {
        if(error.response && error.response.data.msg){
            Message({ message:error.response.data.msg, type: 'error',duration:2000})
        }else{
            errorMsg(error);
        }
      return Promise.reject(error)
    }
)
function errorMsg(error){
    if(error.response){
        if(error.response.status){
            switch (error.response.status) {
                case 401:
                    error.message = '未授权，请重新登录'
                    setTimeout(()=>{
                        store.dispatch('pmsRemove').then(() => { location.reload() })
                    },2000)
                    break;
                case 402:
                    error.message = 'sign校验失败'
                    break;
                case 403:
                    error.message = '未授权'
                    break;
                case 405:
                    error.message = "请求方法未允许"
                    break;
                case 406:
                    error.message = "参数校验失败"
                    break;
                case 407:
                    error.message = "缺少必填参数"
                    break;
                case 408:
                    error.message = '已存在'
                    break;
                case 409:
                    error.message = '创建失败'
                    break;
                case 410:
                    error.message = '无法更新'
                    break;
                case 411:
                    error.message = '查询失败'
                    break;
                case 412:
                    error.message = '密码错误'
                    break;
                case 413:
                    error.message = '关联信息错误'
                    break;
                case 414:
                    error.message = '拒绝访问'
                    break;
                case 415:
                    error.message = '额度不足'
                    break;
                case 500:
                    error.message = '服务器端出错'
                    break;
                case 501:
                    error.message = '网络未实现'
                    break;
                case 502:
                    error.message = '网路错误'
                    break;
                case 503:
                    error.message = '服务不可用'
                    break;
                case 504:
                    error.message = '网络超时'
                    break;
                case 505:
                    error.message = 'http版本不支持该请求'
                    break;
                default:
                    error.message = `链接错误${error.response.status}`
            }
        }
    }
    Message({ message:error.message, type: 'error',duration:2000})

}
function apiAxios(params) {
    const httpDefault = {
        method: params.method,
        url: params.url,
        params: params.method === 'GET' || params.method === 'get'? params.data : null,
        data: params.method === 'POST' || params.method === 'PUT' ||
        params.method === 'PATCH' || params.method === 'DELETE' ||
        params.method === 'post' || params.method === 'put' ||
        params.method === 'patch' || params.method === 'delete'
            ? params.data : null
    }
    return new Promise((resolve, reject) => {
        service(httpDefault)
            .then((res) => {
                resolve(res)
            }).catch((response) => {
            reject(response)
        })
    })
}

export default apiAxios
