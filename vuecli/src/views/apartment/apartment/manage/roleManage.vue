<template>
	<div class="operation" id="bb">
		<div class="wrap">
			<div v-if="showcom">
				<div class="operation_mode">
					<Row type="flex" justify="space-between" style="padding-bottom:10px;">
						<Col>
							<Button class="save " @click='aa'>添加</Button>
							<Button class="button" @click="modal1 = true"> 删除</Button>
						</Col>
						<Col>
							<span>角色名称：</span>
							<Input v-model="value5" placeholder="请输入搜索的内容" class="inpnut"></Input>
							<Button icon="ivu-icon ivu-icon-search" @click="search"></Button>
						</Col>
					</Row>
				</div>
				<Table border ref="selection" @on-row-dblclick="edituser" :columns="columns4" :data="tableData1"></Table>
				<div class="page">
					<Page :total="total" :page-size="10" @on-change="changePage"></Page>
				</div>
			</div>
			<Col span="24">
			<Form v-if="ok" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
				<Row>
					<Col span="12">
					<FormItem label="用户名称" prop="roleName">
						<Input v-model="formValidate.roleName" placeholder="请输入角色名称"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="12">
						<FormItem label="描述" prop="roleRemark">
							<Input v-model="formValidate.roleRemark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
						</FormItem>
					</Col>
				</Row>
				<Col span="12">
					<FormItem>
						<Button type="primary" @click="handleSubmit('formValidate')" class="save " style="margin-left: 0px;">保存</Button>
						<Button type="ghost" @click="handleReset('formValidate')" class="button " style="margin-left: 8px">取消</Button>
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
	export default {
		created(){
			//ajax请求获取数据进行渲染列表
			let dataArray=[{
						id:'001',
						roleName: 'John Brown',
						roleRemark: '现已登陆'
					},
					{
						id:'002',
						roleName: 'Jim Green',
						roleRemark: '现已登陆'
					},
					{
						id:'003',
						roleName: 'Joe Black',
						roleRemark: '现已登陆'
					},
					{
						id:'004',
						roleName: 'Jon Snow',
						roleRemark: '现已登陆'
					}
				]
			for (let i=0; i <dataArray.length; i++) {
				let obj={
					"id":dataArray[i].id,
					"roleName":dataArray[i].roleName,
					"roleRemark":dataArray[i].roleRemark
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
					id:'',
					roleName: '',
					roleRemark: '',

				},
				ruleValidate: {

					roleName: [{
						trigger: 'change'
					}],

					roleRemark: [{
						trigger: 'change'
					}],

				},
				columns4: [{
						type: 'selection',
						width: 60,
						align: 'center',
					},

					{
						title: '角色名称',
						key: 'roleName',

					},
					{
						title: '描述',
						key: 'roleRemark'
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
											this.aa(params)
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
						}
					}
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

				this.$refs[name].validate((valid) => {
					if(valid) {


						let addObj={
							"roleName":this.formValidate.roleName,
							"roleRemark":this.formValidate.roleRemark
						}
						this.tableData1.push(addObj)
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
				if (params.row==undefined) {
					this.formValidate.roleName="";
					this.formValidate.roleRemark="";
				} else {
					this.formValidate.roleName=params.row.roleName;
					this.formValidate.roleRemark=params.row.roleRemark;
				}				
				
				this.ok = true;
				this.showcom = false;
			},

			changePage() {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				this.tableData1 = this.mockTableData1();
			},

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