<template>
	<div class="operation" id="bb">
		<div class="wrap">
		<div v-if="showcom" >
			<div class="operation_mode">
				<Row type="flex" justify="space-between" style="padding-bottom:10px;">
					<Col>
						<Button class="save " @click='aa'>添加</Button> 
						<Button class="button" @click="modal1 = true"> 删除</Button>
					</Col>
					<Col>
						<span>登录名：</span>
						<Input v-model="value4" placeholder="请输入搜索的内容" class="inpnut"></Input>
						<span>用户名：</span>
						<Input v-model="value5" placeholder="请输入搜索的内容" class="inpnut"></Input>
						<Button icon="ivu-icon ivu-icon-search" @click="search"></Button>
					</Col>
				</Row>
			</div>
			<Table border ref="selection" @on-row-dblclick="edituser" :columns="columns6" :data="tableData1"></Table>
			<div class="page">
				<Page :total="total" :page-size="10" @on-change="changePage"></Page>
			</div>
		</div>
		<Col span="24">
			<Form v-if="ok" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
				<Row>
					<Col span="12">
						<FormItem label="用户名" prop="userName">
							<Input v-model="formValidate.userName" placeholder="请输入用户名"></Input>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem  label="联系方式" prop="userMobile">
							<Input type="number" v-model="formValidate.userMobile" placeholder="请输入联系方式" ></Input>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="12">
						<FormItem  label="登录名" prop="signInName">
							<Input  v-model="formValidate.signInName" placeholder="请输入登录名" ></Input>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem  label="密码" prop="userPass">
							<Input type="password" v-model="formValidate.userPass" placeholder="请输入密码"></Input>
						</FormItem>
					</Col>
          		</Row>
         		<Row>
			        <!--<Col span="12">
			            <FormItem  label="创建时间">
			              <DatePicker type="date" placeholder="Select date" v-model="formValidate.date" style="width: 100%;"></DatePicker>
			            </FormItem>
			        </Col> -->
			        <Col span="12">
			            <FormItem label="角色" prop="roleName">
			              <Input type="text" placeholder="请输入角色" v-model="formValidate.roleName" ></Input>
			            </FormItem>
			        </Col>
			        <Col span="12">
			            <FormItem  prop="userStatus" label="状态">
				            <Select v-model="formValidate.userStatus">
				                <Option value="qiyong">已启用</Option>
				                <Option value="weiqiyong">未启用</Option>
				            </Select>
			        	</FormItem>
			        </Col>
                </Row>
				<Col span="12">
					<FormItem>
						<Button type="primary" @click="handleSubmit('formValidate')" class="save " ref="save" style="margin-left: 0px;">保存</Button>
						<Button type="ghost" @click="handleReset('formValidate')" class="button " ref="cancel"  style="margin-left: 8px">取消</Button>
					</FormItem>
				</Col>
			</Form>
		</Col>
		<Modal v-model="modal1" title="提示" @on-ok="sure" @on-cancel="cancel">
			<p>您确定要删除吗？</p>
		</Modal>
	</div>
</div>
</template>

<script>
	import {pageUser} from "../../api/index.js"
	export default {
		created(){
			let data={parameter:JSON.stringify({"code":"","data":{"pageSize":"1","pageSize":"10"},"msg":"","serialNumber":""})};
			pageUser(data).then(function(data){			

				console.log(data);
				
			},function(err){
				console.log(err);
			})
			let dataArray=[{
						id:"001",
						userName: 'John Brown',
						userMobile:'13027756852',
						signInName:'归一',
						userPass: 123456,
						roleName:'管理员',
						starTime: '2018-03-04',
						userStatus: 'qiyong'
					},
					{
						id:"002",
						userName: 'John Brown',
						userMobile:'13027756852',
						signInName:'归一',
						userPass: 123456,
						roleName:'管理员',
						starTime: '2018-03-04',
						userStatus: 'qiyong'
					},{
						id:"003",
						userName: 'John Brown',
						userMobile:'13027756852',
						signInName:'归一',
						userPass: 123456,
						roleName:'管理员',
						starTime: '2018-03-04',
						userStatus: 'qiyong'
					},{
						id:"004",
						userName: 'John Brown',
						userMobile:'13027756852',
						signInName:'归一',
						userPass: 123456,
						roleName:'管理员',
						starTime: '2018-03-04',
						userStatus: 'qiyong'
					}
				]
				for(let i=0;i<dataArray.length;i++){
					let obj={
						"id":dataArray[i].id,
						"userName":dataArray[i].userName,
						"userMobile":dataArray[i].userMobile,
						"signInName":dataArray[i].signInName,
						"userPass":dataArray[i].userPass,
						"roleName":dataArray[i].roleName,
						"starTime":dataArray[i].starTime,
						"userStatus":dataArray[i].userStatus=="qiyong"?"已启用":"未启用",
					}
					this.tableData1.push(obj);
				}

		},
		data() {
			return {
				tableData1: this.mockTableData1,
				showcom: true,
				ok: false,
				modal1: false,
				deletindex: '',
				formValidate: {
					userName: '',
					userMobile:'',
					signInName:'',
					userPass: '',
					roleName:'',
					starTime:'',
					userStatus: '',
				},
				ruleValidate: {
					signInName: [{
						required: true,
						message: 'signInName is required',
						validatorid: 'validateID',
						trigger: 'change'
					}],
					userName: [
						{
							required: true,
							trigger: 'change'
						}
					],
					userPass: [
						{
							required: true,
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: 'The password length cannot be less than 6 bits',
							trigger: 'blur'
						},
					],
					userMobile:[
					{
						required: true,
						trigger:'change'
					}],
					roleName:[
						{
							trigger: 'change'
						}
					],
//					starTime: [
//						{
//							type: 'date',  trigger: 'change'
//						}
//					],
					userStatus: [
						{
							trigger: 'change'
						}
					],
//					select: [
//						{
//							trigger: 'change'
//						}
//					]
				},

				columns6: [{
						type: 'selection',
						width: 60,
						align: 'center',
					},
					{
						title: '用户名',
						key: 'userName',
					},
					{
						title: '联系方式',
						key: 'userMobile'
					},
					{
						title: '登录名',
						key: 'signInName',
					},
					{
						title: '密码',
						key: 'userPass'
					},
					{
						title: '角色',
						key: 'roleName',
						align: 'center'
					},
					{
						title: '创建时间',
						key: 'starTime'
					},
					{
						title: '状态',
						key: 'userStatus',
						align: 'center'
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											
											this.aa(params);
										}
									}
								}, '修改'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.modal1 = true,
											this.deletindex = params.index
										}
										/*click: () => {

                      this.tableData1.splice(params.index, 1);
										}*/
									}
								}, '删除')
							]);
						},
					},
				],
				tableData1: []
			}
		},
		methods: {
			sure() {
				this.tableData1.splice(this.deletindex, 1);
			},

			remove(index) {
				this.data1.splice(index, 1);
			},
			handleSelectAll(status) {
				this.$refs.selection.selectAll(status);
			},
			handleSubmit(name) {
				var thisItem=this;
				this.$refs[name].validate((valid) => {

					if(valid) {
						let addObj={
							userName: this.formValidate.userName,
							userMobile:this.formValidate.userMobile,
							signInName:this.formValidate.signInName,
							userPass: this.formValidate.userPass,
							roleName:this.formValidate.roleName,
							starTime:'2018-09-20',
							userStatus:this.formValidate.userStatus=="qiyong"?"已启用":"未启用",
						}
						//后台返回增加成功信息进行下一步或者刷新获取界面数据
						this.tableData1.push(addObj);

						this.$Message.success('Success!');
						this.ok = false;
						this.add = false;
						this.showcom = true;
					} else {
						this.$Message.error('Fail!');
					}
				})

			},
			handleReset(name) {
				this.showcom = true;
				this.ok = false;
				this.$refs[name].resetFields();
			},

			aa: function(params) {	
				console.log(params.row);
				if (params.row==undefined) {
					this.formValidate.userName="";
					this.formValidate.userMobile="";
					this.formValidate.signInName="";
					this.formValidate.userPass="";
					this.formValidate.roleName="";
					this.formValidate.starTime="";
					this.formValidate.userStatus="";
				} else {
					this.formValidate.userName=params.row.userName;
					this.formValidate.userMobile=params.row.userMobile;
					this.formValidate.signInName=params.row.signInName;
					this.formValidate.userPass=params.row.userPass;
					this.formValidate.roleName=params.row.roleName;
					this.formValidate.starTime=params.row.starTime;
					this.formValidate.userStatus=params.row.userStatus=="已启用"?"qiyong":"weiqiyong";
				}
							
				this.ok = true;
				this.showcom = false;
			},
		
			changePage() {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				this.tableData1 = this.mockTableData1();
			}
			
		}
	};


</script>
<style scoped>
	.operation_mode {
		padding: 0px 0px 10px;
	}
	
	.inpnut {
		width: 200px;
	}
	
	.page {
		float: right;
		margin: 10px;
	}
	.wrap {
    background: #FFF;
    padding: 20px 20px;
}
</style>