import router, {constantRoutes} from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import store from './store'
import {getPermission, getToken} from './auth.js'
const whiteList = ['/login','/register','/forgetPass', '/auth-redirect'] // no redirect whitelist
var publicRouter = constantRoutes;
router.beforeEach(async(to, from, next) => {
    NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
        next({path: '/'});
        NProgress.done()
    } else {
        const hasRoles = store.getters.roles && store.getters.roles.length > 0
        if (hasRoles) {
            next()
        } else {
            try {
                const accessRoutes = await store.dispatch('generateRoutes', getPermission())
                global.antRouter = accessRoutes //将路由数据传递给全局变量，做侧边栏菜单渲染工作
                for(var i=0;i<publicRouter.length;i++){
                    global.antRouter.unshift(publicRouter[i])
                }
                router.addRoutes(accessRoutes)
                next({ ...to, replace: true })
            } catch (error) {
                await store.dispatch('pmsLogout')
                Message.error(error || 'Has Error')
                next(`/login?redirect=${to.path}`)
                NProgress.done()
            }
        }
    }

  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

// router.beforeResolve((to,from,next)=>{
//   next();
// })
router.afterEach(() => {
  NProgress.done()
})
