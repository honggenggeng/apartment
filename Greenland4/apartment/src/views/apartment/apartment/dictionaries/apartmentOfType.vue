<!--房间装修字典-->
<template>
	<div class="operation" id="bb">
		<div class="wrap">
			<div v-if="showcom">
				<!--以下是搜索条件-->
				<div class="operation_mode">
					<Row type="flex" justify="space-between" style="padding-bottom:10px;">
						<Col>
							<Button class="save " @click='aa'>添加</Button>
							<Button class="button" @click="modal1 = true"> 删除</Button>
						</Col>
						<Col>
							<!--<span>ID：</span>
							<Input v-model="value4" placeholder="请输入搜索的内容" class="inpnut"></Input>-->
							<span>类型名称：</span>
							<Input v-model="value5" placeholder="请输入搜索的内容" class="inpnut"></Input>
							<Button icon="ivu-icon ivu-icon-search" @click="search"></Button>
						</Col>
					</Row>
				</div>
				<!--以上是搜索条件-->
				<!--以下是表格-->
				<Table border ref="selection" @on-row-dblclick="edituser" :columns="columns4" :data="tableData1"></Table>
				<!--以上是表格-->
				<!--以下是表格分页-->	
				<div class="page">
					<Page :total="total" :page-size="10" @on-change="changePage"></Page>
				</div>
				<!--以上是表格分页-->
			</div>
			<!--以下是数据字典的添加-->	
			<Col span="24">
			<Form v-if="ok" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
				<Row>
					<Col span="12">
					<FormItem label="类型代码" prop="apartmentTypeCode">
						<Input type="number" v-model="formValidate.apartmentTypeCode" placeholder="请输入id"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="类型名称" prop="apartmentTypeName">
						<Input v-model="formValidate.apartmentTypeName" placeholder="请输入字典名称"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="12">
					<FormItem label="时间选择方式" prop="duration">
						<Input v-model="formValidate.duration" placeholder="请输入表名称"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="取消时间设置" prop="cancelLimit">
						<Input v-model="formValidate.cancelLimit" placeholder="请输入字段名称"></Input>
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
			<!--以下是数据字典的添加-->
			<!--以下是数据字典的删除-->	
			<Modal v-model="modal1" title="提示" @on-ok="sure" @on-cancel="cancel">
				<p>您确定要删除吗？</p>
			</Modal>
			<!--以上是数据字典的删除-->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData1: this.mockTableData1,
				showcom: true,
				ok: false,
				modal1: false,
				deletindex: '',
				formValidate: {
					apartmentTypeCode: '',
					apartmentTypeName: '',
					duration: '',
					cancelLimit: '',
				},
				ruleValidate: {
					apartmentTypeCode: [{
						required: true,
						message: 'ID is required',
						validatorid: 'validateID',
						trigger: 'change'
					}],
					apartmentTypeName: [{
						trigger: 'change'
					}],
					duration: [{
						trigger: 'change'
					}],
					cancelLimit: [{
						trigger: 'change'
					}],
				},
				columns4: [{
						type: 'selection',
						width: 60,
						align: 'center',
					},
					{
						title: '类型代码',
						key: 'apartmentTypeCode'
					},
					{
						title: '类型名称',
						key: 'apartmentTypeName',

					},
					{
						title: '时间选择方式',
						key: 'duration'
					},
					{
						title: '取消时间设置',
						key: 'cancelLimit'
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
											this.aa()
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
				tableData1: [{
						apartmentTypeCode: '001',
						apartmentTypeName: '标准间',
						duration: '订单时间',
						cancelLimit: '默认客户'
					},
					{
						apartmentTypeCode: '001',
						apartmentTypeName: '标准间',
						duration: '订单时间',
						cancelLimit: '默认客户'
					},
					{
						apartmentTypeCode: '001',
						apartmentTypeName: '标准间',
						duration: '订单时间',
						cancelLimit: '默认客户'
					}
				]
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
			aa: function() {
				this.ok = true;
				this.showcom = false;
			},

			changePage() {
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