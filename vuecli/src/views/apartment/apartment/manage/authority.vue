<template>
	<div class="operation" id="bb">
		<div class="wrap">
			<div v-if="showcom" >
				<!--以下是搜索条件-->
				<div class="operation_mode">
					<Row type="flex" justify="space-between" style="padding-bottom:10px;">
						<Col>
							<Button class="save " @click='aa'>添加</Button> 
							<Button class="button" @click="modal1 = true"> 删除</Button>
						</Col>
						<Col>
							<span>权限名称：</span>
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
			<Col span="24">
				<!--以下是权限的添加-->	
				<Form v-if="ok" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
					<Row>			
						<Col span="12">
							<FormItem label="用户名称" prop="name">
								<Input v-model="formValidate.name" placeholder="请输入角色名称"></Input>
							</FormItem>
						</Col>	
						<Col span="12">
				            <FormItem  prop="select" label="菜单角色级别">
					            <Select v-model="formValidate.select">
					                <Option value="qiyong">系统管理员</Option>
					                <Option value="weiqiyong">超级管理员</Option>
					                <Option value="putong">普通管理员</Option>
					            </Select>
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
				<!--以上是权限的添加-->
				<!--以下是权限的分配-->	
				<Form v-if="update" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
					<Tree :data="data4" show-checkbox multiple></Tree>
				</Form>
				<!--以上是权限的分配-->
			</Col>
			<!--以下是权限的分配删除-->	
			<Modal v-model="modal1" title="提示" @on-ok="sure" @on-cancel="cancel">
				<p>您确定要删除吗？</p>
			</Modal>
			<!--以上是权限的删除-->
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
				modif: false,
				deletindex: '',
				formValidate: {
					name: '',
					select: '',				
				},
				ruleValidate: {	
					name: [
						{
							trigger: 'change'
						}
					],
					select: [
						{    
							trigger: 'change'
						}
					]
				},
				columns4: [{
						type: 'selection',
						width: 60,
						align: 'center',
					},
				
					{
						title: '权限名称',
						key: 'name',

					},										
					{
						title: '操作',
						key: 'action',
						width: 250,
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
											this.modify()
										}
									}
								}, '分配权限'),
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
								}, '更新'),
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
						name: 'John Brown',
					},
					{
						name: 'Jim Green',
					},
					{
						name: 'Joe Black',
					},
					{
						name: 'Jon Snow',
					}
				],
				 data4: [
                    {
                        title: '云寓管理',
                        expand: true,
                        selected: false,
                        children: [
                            {
                                title: '房源管理',
                                expand: false,
                                children: [
                                    {
                                        title: '酒店楼栋',
                                    },
                                    {
                                        title: '长租公寓楼栋'
                                    },
                                    {
                                        title: '价格配置',
                                    },
                                    {
                                        title: '商圈',
                                    },
                                    {
                                        title: '房屋管理',
                                    },
                                    {
                                        title: '房间类型',
                                    },
                                ]
                            },
                            {
                                title: '设施管理',
                                expand: false,
                                children: [
                                    {
                                        title: '设施管理',
                                    },
                                      {
                                        title: '服务管理'
                                    },
                                    {
                                        title: '宽带申请'
                                    },
                                        {
                                        title: '报修'
                                    },
                                        {
                                        title: '保洁'
                                    },
                                        {
                                        title: '健身房'
                                    },
                                ]
                            },
                            {
                                title: '账单管理',
                                expand: false,
                                children: [
                                    {
                                        title: '预约',
                                    },
                                      {
                                        title: '房客合同'
                                    },
                                    {
                                        title: '房东合同'
                                    },
                                        {
                                        title: '定损'
                                    },
                                        {
                                        title: '账单'
                                    },
                                        {
                                        title: '退款'
                                    },
                                ]
                            },
                             {
                                title: '账单管理',
                                expand: false,
                                children: [
                                    {
                                        title: '预约',
                                    },
                                      {
                                        title: '房客合同'
                                    },
                                    {
                                        title: '房东合同'
                                    },
                                        {
                                        title: '定损'
                                    },
                                        {
                                        title: '账单'
                                    },
                                        {
                                        title: '退款'
                                    },
                                ]
                            }, 
                            {
                                title: '会员管理',
                                expand: false,
                                children: [
                                    {
                                        title: '会员',
                                    },                                      
                                ]
                            },
                            {
                                title: '管家管理',
                                expand: false,
                                children: [
                                    {
                                        title: '管家',
                                    }, 
                                      {
                                        title: '管家日程表',
                                    }, 
                                ]
                            },
                            {
                                title: '公共管理',
                                expand: false,
                                children: [
                                    {
                                        title: '公告',
                                    }, 
                                      {
                                        title: '广告',
                                    }, 
                                ]
                            },
                            {
                                title: '系统管理',
                                expand: false,
                                children: [
                                    {
                                        title: '用户管理',
                                    }, 
                                      {
                                        title: '角色管理',
                                    }, 
                                    {
                                        title: '权限管理',
                                    },
                                    {
                                        title: '字典管理',
                                    },
                                    {
                                        title: '日志管理',
                                    },
                                ]
                            }
                        ]
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
						this.update = false;
						this.showcom = true;
					} else {
						this.$Message.error('Fail!');
					}
				})

			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			aa: function() {
				this.ok = true;
				this.showcom = false;
				this.update = false;
			},
			modify: function() {
			   this.update = true;
				this.ok = false;
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