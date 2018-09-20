<template>
	<div class="operation" id="bb">
		<div class="wrap">
			<div class="operation_mode">
				<Row>
					<Col>
						<div class="fr">
							<span>用户名称：</span>
							<Input v-model="value5" placeholder="请输入搜索的内容" class="inpnut"></Input>
							<span>登陆时间：</span>
							<DatePicker type="date" multiple placeholder="Select date"></DatePicker>
							<Button icon="ivu-icon ivu-icon-search" @click="search"></Button>
						</div>
					</Col>
				</Row>
			</div>
			<Table border ref="selection"  :columns="columns4" :data="tableData1"></Table>
			<div class="page">
				<Page :total="total" :page-size="10" @on-change="changePage"></Page>
			</div>
	</div>
</div>
</template>

<script>
	export default {
		created(){
			//ajax获取数据
			let dataArray=[
					{
						id: '001',
						storeName:'绿地云寓',
						userName: 'John Brown',
						roleName:'管理员',
						eventType:'角色调整',
						eventBrief:'增加管理员',
						signInTime: '2018-03-04',
						eventDetail:'删除John角色，增加Tom管理员'
					},
					{
						id: '001',
						storeName:'绿地云寓',
						userName: 'John Brown',
						roleName:'管理员',
						eventType:'角色调整',
						eventBrief:'增加管理员',
						signInTime: '2018-03-04',
						eventDetail:'删除John角色，增加Tom管理员'
					},
					{
						id: '001',
						storeName:'绿地云寓',
						userName: 'John Brown',
						roleName:'管理员',
						eventType:'角色调整',
						eventBrief:'增加管理员',
						signInTime: '2018-03-04',
						eventDetail:'删除John角色，增加Tom管理员'
					},
					{
						id: '001',
						storeName:'绿地云寓',
						userName: 'John Brown',
						roleName:'管理员',
						eventType:'角色调整',
						eventBrief:'增加管理员',
						signInTime: '2018-03-04',
						eventDetail:'删除John角色，增加Tom管理员'
					},
				]
				for (var i = 0; i < dataArray.length; i++) {
					let obj={
						id: dataArray[i].id,
						storeName:dataArray[i].storeName,
						userName: dataArray[i].userName,
						roleName:dataArray[i].roleName,
						eventType:dataArray[i].eventType,
						eventBrief:dataArray[i].eventBrief,
						signInTime: dataArray[i].signInTime,
						eventDetail:dataArray[i].eventDetail
					}
					this.tableData1.push(obj);					
				}

		},
		data() {
			return {
//				   event_time           datetime comment '事件生成日期',
//				   event_type_code      varchar(32) comment '事件类型',

//				   event_detail         varchar(2000) comment '事件明细',


//				   event_brief          varchar(200) comment '事件摘要',
//				   user_code            varchar(32) comment '用户代码',
//				   role_code            varchar(32) comment '角色代码',
//				   store_code           varchar(32) comment '门店代码',

				columns4: [
					{
						title:'门店名称',
						key:'storeName'
					},
					{
						title: '用户名称',
						key: 'userName',
					},
					{
						title: '角色名称',
						key: 'roleName',
					},
					{
						title:'事件类型',
						key:'eventType'
					},
					{
						title: '事件摘要',
						key: 'eventBrief',
					},
					{
						title: '登陆时间',
						key: 'signInTime',
					},
					{
						title: '事件明细',
						key: 'eventDetail',
					},
					],
				tableData1: []
			}
		},
	};
</script>
<style scoped>
	.operation_mode {
		padding: 0px 0px 10px;
	}
	.fr{  float: right;}
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