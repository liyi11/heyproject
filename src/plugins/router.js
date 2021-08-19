import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Layout from '@/views/layout/Layout';
//如首页和登录页和一些不用权限的公用页面
export const constantRoutes = [
    /* 登陆 */
    {
        path: '/login',
        name:'login',
        component: () => import('@/views/login.vue'),
    },
    {
        path: '/register',
        name:'register',
        component: () => import('@/views/register.vue'),
    },
    {
        path: '/forgetPass',
        name:'forgetPass',
        component: () => import('@/views/forgetPass.vue'),
    },
    {
        path: '/404',
        name:'404',
        component: () => import('@/views/404.vue'),
    },
    {
        path: "/companyInfo",
        component: Layout,
        meta: {
            title: "公司信息",
            icon: "company",
        },
        children: [
            {
                path: "index",
                component: () => import('@/views/companyInfo/index.vue'),
                meta: {
                    title: "公司信息",
                    icon: "company",
                }
            },
        ]
    },
    {
        path: "",
        component: Layout,
        name:'dashBoard',
        redirect: "dashBoard",
        meta: {
            title: "仪表盘",
            icon: "Activity",
        },
        children: [
            {
                path: "dashBoard",
                component: () => import('@/views/dashBoard/index.vue'),
                meta: {
                    title: "仪表盘",
                    icon: "Activity",
                }
            },
        ]
    },
]
export const asyncRoutes = [
    {
        path: "/userManage",
        component: Layout,
        meta: {
            title: "用户管理",
            icon: "user",
        },
        children: [
            {
                path: "/user",
                component: () => import('@/views/userManage/user.vue'),
                meta: {
                    title: "用户管理",
                    icon:'leftRight'
                }
            },
            {
                path: "/role",
                component: () => import('@/views/userManage/role.vue'),
                meta: {
                    title: "用户组管理",
                    icon:'leftRight'
                }
            },
        ]
    },
    {
        path: "/productManage",
        component: Layout,
        meta: {
            title: "产品管理",
            icon: "product",
        },
        children: [
            {
                path: "index",
                component: () => import('@/views/productManage/index.vue'),
                meta: {
                    title: "产品管理",
                }
            },
        ]
    },
    {
        path: "/XM",
        component: Layout,
        hidden: true,
        children: [
            {
                path: "/detail",
                component: () => import('@/views/codeManage/XM/detail.vue'),
                meta: {
                    title: "订单详情",
                }
            },
        ]
    },
    {
        path: "/codeManage",
        component: Layout,
        meta: {
            title: "二维码管理",
            icon: "ecode",
        },
        children: [
            {
                path: "codeOrder",
                component: () => import('@/views/codeManage/codeOrder.vue'),
                meta: {
                    title: "二维码订单",
                    icon:'leftRight'
                }
            },
            {
                path: "nodeTemplate",
                component: () => import('@/views/codeManage/nodeTemplate.vue'),
                meta: {
                    roles: ['NodeTemplate','TracingPlate'],
                    title: "节点模板",
                    icon:'leftRight'
                }
            },
            {
                path: "codeApply",
                component: () => import('@/views/codeManage/codeApply.vue'),
                meta: {
                    title: "二维码申请",
                    icon:'leftRight'
                }
            },
            {
                path: "testreport",
                component: () => import('@/views/codeManage/Test_report.vue'),
                meta: {
                    title: "检测报告",
                    icon:'leftRight'
                }
            },
        ]
    },
    {
        path: "/marketCenter",
        component: Layout,
        meta: {
            roles: ['All','CashRedEnvelopeRule','PointRule','TurntableLotteryRule'],
            title: "营销中心",
            icon: "mcenter",
        },
        children: [
            {
                path: "/redEnvelopesManage",
                component: {render(c) {return c('router-view')}},
                meta: {
                    roles: ['CashRedEnvelopeRule'],
                    title: "红包管理",
                    icon:'leftRight'
                },
                children: [
                    {
                        path: "orderManage",
                        component: () => import('@/views/marketCenter/redEnvelopesManage/orderManage.vue'),
                        meta: {
                            roles: ['CashRedEnvelopeRule'],
                            title: "红包订单管理",
                        }
                    },
                    {
                        path: "rule",
                        component: () => import('@/views/marketCenter/redEnvelopesManage/rule.vue'),
                        meta: {
                            title: "红包规则",
                            roles: ['CashRedEnvelopeRule'],
                        }
                    },
                    {
                        path: "dataAnalysis",
                        component: () => import('@/views/marketCenter/redEnvelopesManage/dataAnalysis.vue'),
                        meta: {
                            title: "数据分析",
                            roles: ['CashRedEnvelopeRule'],
                        }
                    },
                    {
                        path: "payManage",
                        component: () => import('@/views/marketCenter/redEnvelopesManage/payManage.vue'),
                        meta: {
                            title: "支付管理",
                            roles: ['Payment'],
                        }
                    },

                ]
            },
            {
                path: "/pointsManage",
                component: {render(c) {return c('router-view')}},
                meta: {
                    roles: ['All','PointRule'],
                    title: "积分管理",
                    icon:'leftRight'
                },
                children: [
                    {
                        path: "orderManage",
                        component: () => import('@/views/marketCenter/pointsManage/orderManage.vue'),
                        meta: {
                            title: "积分订单管理",
                            roles: ['PointRule'],
                        }
                    },
                    {
                        path: "rule",
                        component: () => import('@/views/marketCenter/pointsManage/rule.vue'),
                        meta: {
                            title: "积分规则",
                            roles: ['PointRule'],
                        }
                    },
                    {
                        path: "dataAnalysis",
                        component: () => import('@/views/marketCenter/pointsManage/dataAnalysis.vue'),
                        meta: {
                            title: "数据分析",
                            roles: ['PointRule'],
                        }
                    },
                ]
            },
            {
                path: "/lotteryManage",
                component: {render(c) {return c('router-view')}},
                meta: {
                    roles: ['All','TurntableLotteryRule'],
                    title: "抽奖管理",
                    icon:'leftRight'
                },
                children: [
                    {
                        path: "orderManage",
                        component: () => import('@/views/marketCenter/lotteryManage/orderManage.vue'),
                        meta: {
                            title: "抽奖订单管理",
                            roles: ['TurntableLotteryRule'],
                        }
                    },
                    {
                        path: "rule",
                        component: () => import('@/views/marketCenter/lotteryManage/rule.vue'),
                        meta: {
                            title: "抽奖规则",
                            roles: ['TurntableLotteryRule'],
                        }
                    },
                    {
                        path: "drawRecord",
                        component: () => import('@/views/marketCenter/lotteryManage/drawRecord.vue'),
                        meta: {
                            title: "中奖记录",
                            roles: ['TurntableLotteryRule'],
                        }
                    },
                    {
                        path: "dataAnalysis",
                        component: () => import('@/views/marketCenter/lotteryManage/dataAnalysis.vue'),
                        meta: {
                            title: "数据分析",
                            roles: ['TurntableLotteryRule'],
                        }
                    },
                ]
            },
        ]
    },
    {
        path: "/productManage",
        component: Layout,
        meta: {
            title: "窜货管理",
            icon: "product",
        },
        children: [
            {
                path: "/agent",
                component: () => import('@/views/fleeinggoods/agent'),
                meta: {
                    title: "代理商管理",
                    icon:'leftRight'
                }
            },
            {
                path: "/goodsdata",
                component: () => import('@/views/fleeinggoods/goodsdata'),
                meta: {
                    title: "窜货数据",
                    icon:'leftRight'
                }
            },
        ]
    },
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
