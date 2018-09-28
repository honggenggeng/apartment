import Main from '@/views/apartment/components/main/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录',
        keepAlive: true
    },
    component: () =>
        import ('@/views/apartment/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/views/apartment/components/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@/views/apartment/components/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/views/apartment/components/error-page/500.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import ('@/views/apartment/components/main/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home',
            title: {
                i18n: 'home'
            },
            name: 'home_index',
            component: () =>
                import ('@/views/apartment/components/home/home.vue')
        },
        {
            path: 'ownspace_index',
            title: {
                i18n: 'ownSpace'
            },
            name: 'ownspace_index',
            component: () =>
                import ('@/views/apartment/components/ownspace/ownspace.vue')
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
 export const appRouter = [
    
    {
        path: '/planSetup',
        title: '房源管理',
        name: 'planSetup',
        component: Main,
        children: [
          /*  { path: 'hotel', title: '酒店楼栋', name: 'hotel', component: resolve => {
                require(['@/views/apartment/apartment/planer/hotel.vue'], resolve);
            } },*/
            { path: 'apartment', title: '长租公寓楼栋', name: 'apartment', component: resolve => {
                require(['@/views/apartment/apartment/planer/apartment.vue'], resolve);
            }},
           /* { path: 'price', title: '价格配置', name: 'price', component: resolve => {
                require(['@/views/apartment/apartment/planer/price.vue'], resolve);
            }},*/
            { path: 'business', title: '商圈',name: 'business', component: resolve => {
                require(['@/views/apartment/apartment/planer/business.vue'], resolve);
            }},
          { path: 'housing', title: '房屋管理', name: 'housing', component: resolve => {
                require(['@/views/apartment/apartment/planer/housing.vue'], resolve);
            }}/*,
            { path: 'roomType', title: '房间类型', name: 'roomType', component: resolve => {
                require(['@/views/apartment/apartment/planer/roomType.vue'], resolve);
            }}*/
        ]
    },

    {
        path: '/work',
        title: '设施管理',
        name: 'work',
        component: Main,
        children: [
            { path: 'workorder', title: '设施管理', name: 'workorder', component: resolve => {
                require(['@/views/apartment/apartment/work/workorder.vue'], resolve);
            }},
            { path: 'soptTask', title: '服务管理', name: 'soptTask', component: resolve => {
                require(['@/views/apartment/apartment/work/soptTask.vue'], resolve);
            } },
           /* { path: 'broadbandApplication', title: '宽带申请', name: 'broadbandApplication', component: resolve => {
                require(['@/views/apartment/apartment/work/broadbandApplication.vue'], resolve);
            } },
            { path: 'repairs', title: '报修', name: 'repairs', component: resolve => {
                require(['@/views/apartment/apartment/work/repairs.vue'], resolve);
            } },
            { path: 'cleanKeeping', title: '保洁', name: 'cleanKeeping', component: resolve => {
                require(['@/views/apartment/apartment/work/cleanKeeping.vue'], resolve);
            } },
            { path: 'fitnessRoom', title: '健身房', name: 'fitnessRoom', component: resolve => {
                require(['@/views/apartment/apartment/work/fitnessRoom.vue'], resolve);
            } }*/
        ]
    },
    {
        path: '/planList',
        title: '任务管理',
        name: 'planList',
        component: Main,
        children: [
            { path: 'schedule', title: '预约', name: 'schedule', component: resolve => {
                require(['@/views/apartment/apartment/schedule/schedule.vue'], resolve);
            } },
            { path: 'order', title: '房客合同', name: 'order', component: resolve => {
                require(['@/views/apartment/apartment/schedule/order.vue'], resolve);
            } }
            ,
          /*  { path: 'landlordContract', title: '房东合同', name: 'landlordContract', component: resolve => {
                require(['@/views/apartment/apartment/schedule/landlordContract.vue'], resolve);
            } }
            ,
            { path: 'lossAssessment', title: '定损', name: 'lossAssessment', component: resolve => {
                require(['@/views/apartment/apartment/schedule/lossAssessment.vue'], resolve);
            } }
            ,*/
            { path: 'bill', title: '账单', name: 'bill', component: resolve => {
                require(['@/views/apartment/apartment/schedule/bill.vue'], resolve);
            } }
           /* ,
            { path: 'refund', title: '退款', name: 'refund', component: resolve => {
                require(['@/views/apartment/apartment/schedule/refund.vue'], resolve);
            } }*/
        ]
    },

    /* {
         path: '/member',
         title: '会员管理',
         name: 'member',
         component: Main,
         children: [
             { path: 'member', title: '会员', name: 'member', component: resolve => {
                 require(['@/views/apartment/apartment/member/member.vue'], resolve);
             }
         }
         ]
     },*/
     {
         path: '/steward',
         title: '管家管理',
         name: 'steward',
         component: Main,
         children: [
             { path: 'steward', title: '管家', name: 'steward', component: resolve => {
                 require(['@/views/apartment/apartment/steward/steward.vue'], resolve);
             }
             },
         /*   { path: 'calendar', title: '管家日程表', name: 'calendar', component: resolve => {
                 require(['@/views/apartment/apartment/steward/calendar.vue'], resolve);
             }
             }*/
         ]
     },
   /*  {
         path: '/publicManagement',
         title: '公共管理',
         name: 'publicManagement',
         component: Main,
         children: [
             { path: 'announ', title: '公告', name: 'announ', component: resolve => {
                 require(['@/views/apartment/apartment/publicManagement/announ.vue'], resolve);
             }
             },
             { path: 'advertising', title: '广告', name: 'advertising', component: resolve => {
                 require(['@/views/apartment/apartment/publicManagement/advertising.vue'], resolve);
             }
             }
         ]
     },*/
     {
        path: '/management',
        title: '系统管理',
        name: 'management',
        component: Main,
        children: [
         { path: 'userManage', title: '用户管理', name: 'userManage', component: resolve => {
                require(['@/views/apartment/apartment/manage/userManage.vue'], resolve);
            }},
            { path: 'roleManage', title: '角色管理', name: 'roleManage', component: resolve => {
                require(['@/views/apartment/apartment/manage/roleManage.vue'], resolve);
            }},
          /*  { path: 'authority', title: '权限管理', name: 'authority', component: resolve => {
                require(['@/views/apartment/apartment/manage/authority.vue'], resolve);
            } },
              { path: 'dictionaries', title: '字典管理', name: 'dictionaries', component: resolve => {
                require(['@/views/apartment/apartment/manage/dictionaries.vue'], resolve);
            } },*/
               { path: 'log', title: '日志管理', name: 'log', component: resolve => {
                require(['@/views/apartment/apartment/manage/logManage.vue'], resolve);
            } },
           
        ]
    },
     {
         path: '/dictionaries',
         title: '字典管理',
         name: 'dictionaries',
         component:Main,
         children:[
//      	{ path: 'districtType', title: '商圈维度字典', name: 'districtType', component: resolve => {
//          require(['@/views/apartment/apartment/manage/dictionaries/districtType.vue'], resolve);
//          } },
//          { path: 'floorManage', title: '楼层管理字典', name: 'floorManage', component: resolve => {
//              require(['@/views/apartment/apartment/manage/dictionaries/floorManage.vue'], resolve);
//          } },
             { path: 'apartmentOfType', title: '房间类型字典', name: 'apartmentOfType', component: resolve => {
                 require(['@/views/apartment/apartment/dictionaries/apartmentOfType.vue'], resolve);
             } },
             { path: 'apartmentOfOrientation', title: '房间朝向字典', name: 'apartmentOfOrientation', component: resolve => {
                 require(['@/views/apartment/apartment/dictionaries/apartmentOfOrientation.vue'], resolve);
             } },
             { path: 'apartmentOfDecoration', title: '房间装修字典', name: 'apartmentOfDecoration', component: resolve => {
                 require(['@/views/apartment/apartment/dictionaries/apartmentOfDecoration.vue'], resolve);
             } },
             { path: 'apartmentOfBalcony', title: '房间阳台字典', name: 'apartmentOfBalcony', component: resolve => {
                 require(['@/views/apartment/apartment/dictionaries/apartmentOfBalcony.vue'], resolve);
             } },
             { path: 'apartmentOfStatus', title: '房间状态字典', name: 'apartmentOfStatus', component: resolve => {
                 require(['@/views/apartment/apartment/dictionaries/apartmentOfStatus.vue'], resolve);
             } },
//          { path: 'apartmentOfWindow', title: '房间窗户字典', name: 'apartmentOfWindow', component: resolve => {
//              require(['@/views/apartment/apartment/manage/dictionaries/apartmentOfWindow.vue'], resolve);
//          } },
             { path: 'apartmentOfFaility', title: '房间设施字典', name: 'apartmentOfFaility', component: resolve => {
                 require(['@/views/apartment/apartment/dictionaries/apartmentOfFaility.vue'], resolve);
             } },
//          { path: 'apartmentOfFaility', title: '楼层管理字典', name: 'apartmentOfFaility', component: resolve => {
//              require(['@/views/apartment/apartment/manage/dictionaries/apartmentOfFaility.vue'], resolve);
//          } }
         ]
     },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
];
console.log(routers)
