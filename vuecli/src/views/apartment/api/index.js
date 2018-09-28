//import Vue from 'vue'
//import axios from '../http.js'
//const  process.env.API_ROOT+'/digiops'

import util from '@/libs/util.js';


//上传权限菜单
//Vue.prototype.axios = axios                this.$util.ajax
export const insertRole = (data) => { return util.ajax.post('/digiops/role/insertRole',data)}

//login
export const login = (data) => { return util.ajax.post('/digiops/digiops/login',data)}

//图片上传
export const upload = (data) => { return util.ajax.post('/digiops/upload/picture',data)}

//所有主菜单列表
export const menu = () => { return util.ajax.get('/digiops/role/queryMenuList')}
//权限菜单列表
export const rolemenuList = () => { return util.ajax.get('/digiops/role/menuList') }
//角色列表
export const rolelist = () => { return util.ajax.get('/digiops/role/list') }
//角色详情
export const roleId = (data) => { return util.ajax.get('/digiops/role/'+data) }
//添加角色
export const roleadd = (data) => { return util.ajax.post('/digiops/role/add',data) }
//修改角色
export const roleupdate = (data) => { return util.ajax.post('/digiops/role/update',data) }


//站点增加
export const siteadd = (data) => { return util.ajax.post('/digiops/site/add',data)}
//查询所有站点
export const siteallList = (data) => { return util.ajax.post('/digiops/site/allList',data)}
//分页查询站点列表
export const sitelist= (data) => { return util.ajax.post('/digiops/site/list',data)}
//查询重复站点编号
export const siteIsExist= (data) => { return util.ajax.post('/digiops/site/isExist',data)}
//站点修改
export const siteupdate= (data) => { return util.ajax.post('/digiops/site/update',data)}
//站点下拉列表
export const siteSpinner= (data) => { return util.ajax.post('/digiops/site/siteSpinner',data)}
//根据id查询
export const siteid= (data) => { return util.ajax.get('/digiops/site/'+data)}


//用户增加
export const useradd = (data) => { return util.ajax.post('/digiops/user/add',data)}
//验证密码
export const userpassword = (data) => { return util.ajax.get('/digiops/user/password',data)}
//分页查询用户列表
export const userlist= (data) => { return util.ajax.post('/digiops/user/list',data)}
//查询重复用户
export const userIsExist= (data) => { return util.ajax.post('/digiops/user/isExist',data)}
//用户修改
export const userupdate= (data) => { return util.ajax.post('/digiops/user/update',data)}
//获取用户信息
export const userid= (data) => { return util.ajax.get('/digiops/user/'+data)}
//获取用户信息
export const userSpinner= (data) => { return util.ajax.post('/digiops/user/userSpinner',data)}

//新增SOP
export const sopAdd = (data) => { return util.ajax.post('/digiops/sop/add',data)}
//生成SOP编码
export const sopCode= (data) => { return util.ajax.get('/digiops/sop/generatedCode/'+data)}
//获取所有SOP
export const sopList= (data) => { return util.ajax.post('/digiops/sop/list',data)}
//修改SOP
export const sopUpdate= (data) => { return util.ajax.post('/digiops/sop/update',data)}
//获取SOP信息
export const sopId= (data) => { return util.ajax.get('/digiops/sop/'+data)}
//获取SOP下拉列表
export const sopSpinner= (data) => { return util.ajax.get('/digiops/sop/sopSpinner/'+data)}
//导入SOP列表
export const inputExcel= (data) => { return util.ajax.post('/digiops/sop/inputExcel',data)}


//新增检查点
export const pointAdd = (data) => { return util.ajax.post('/digiops/point/add',data)}
//生成检查点编码
export const pointCode= (data) => { return util.ajax.get('/digiops/point/generatedCode/'+data)}
//获取所有检查点
export const pointList= (data) => { return util.ajax.post('/digiops/point/list',data)}
//修改检查点
export const pointUpdate= (data) => { return util.ajax.post('/digiops/point/update',data)}
//获取检查点信息
export const pointId= (data) => { return util.ajax.get('/digiops/point/'+data)}
//获取检查点下拉列表
export const pointSpinner= (data) => { return util.ajax.get('/digiops/point/pointSpinner/'+data)}
//生成二维码检查点
export const pointQrcode= (data) => { return util.ajax.post('/digiops/upload/qrcode',data)}

//新增路线
export const lineAdd = (data) => { return util.ajax.post('/digiops/line/add',data)}
//生成路线编码
export const lineCode= (data) => { return util.ajax.get('/digiops/line/generatedCode/'+data)}
//获取所有路线
export const lineList= (data) => { return util.ajax.post('/digiops/line/list',data)}
//修改路线
export const lineUpdate= (data) => { return util.ajax.post('/digiops/line/update',data)}
//获取路线信息
export const lineId= (data) => { return util.ajax.get('/digiops/line/'+data)}
//获取路线信息
export const lineSpinner= (data) => { return util.ajax.get('/digiops/line/lineSpinner/'+data)}

//新增审计
export const auditAdd = (data) => { return util.ajax.post('/digiops/audit/add',data)}
//生成审计编码
export const auditCode= (data) => { return util.ajax.get('/digiops/audit/generatedCode/'+data)}
//获取所有审计
export const auditList= (data) => { return util.ajax.post('/digiops/audit/list',data)}
//修改审计
export const auditUpdate= (data) => { return util.ajax.post('/digiops/audit/update',data)}
//获取审计信息
export const auditId= (data) => { return util.ajax.get('/digiops/audit/'+data)}
//获取审计下拉列表
export const auditSpinner= (data) => { return util.ajax.get('/digiops/audit/auditSpinner/'+data)}

//新增交接班
export const shiftAdd = (data) => { return util.ajax.post('/digiops/shift/add',data)}
//生成交接班编码
export const shiftCode= (data) => { return util.ajax.get('/digiops/shift/generatedCode/'+data)}
//获取所有交接班
export const shiftList= (data) => { return util.ajax.post('/digiops/shift/list',data)}
//修改交接班
export const shiftUpdate= (data) => { return util.ajax.post('/digiops/shift/update',data)}
//获取交接班信息
export const shiftId= (data) => { return util.ajax.get('/digiops/shift/'+data)}
//获取交接班信息
export const shiftSpinner= (data) => { return util.ajax.get('/digiops/shift/shiftSpinner/'+data)}

//新增交接班
export const planAdd = (data) => { return util.ajax.post('/digiops/plan/add',data)}
//获取所有交接班
export const planList= (data) => { return util.ajax.post('/digiops/plan/list',data)}
//修改交接班
export const planUpdate= (data) => { return util.ajax.post('/digiops/plan/update',data)}
//获取交接班信息
export const planId= (data) => { return util.ajax.get('/digiops/plan/'+data)}


//添加临时任务
export const workOrderAdd= (data) => { return util.ajax.post('/digiops/workOrder/add',data)}
//工单查询列表
export const workOrderList= (data) => { return util.ajax.post('/digiops/workOrder/list',data)}

//用户
export const pageUser= (data) => { return util.ajax.post('/sys/user/pageUser',data)}