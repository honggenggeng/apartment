<template>
	<div class="operation" id="ccc">
		<col span="24">
		<div v-if="showcom">
			<div class="operation_mode">
			  <Row type="flex" justify="space-between" style="padding-bottom:10px;">
			 <Col>
			  <Button class="button " @click='aa'>新建</Button>
              <Button class="button" @click="abd"> 删除</Button>
                  <Modal
                         v-model="modal1"
                         title="提示"
                         @on-ok="ok"
                         @on-cancel="cancel">
                        <p>您确定要删除吗？</p>

                     </Modal>
                                                                                                                     <Modal
                                                                                                                                             v-model="modal2"
                                                                                                                                             title="提示"
                                                                                                                                           >
                                                                                                                                            <p>请选择您要删除的内容</p>

                                                                                                                                         </Modal>
                 </Col>
                    <Col> <span>楼栋：</span>
                    <Input v-model="value4"  placeholder="请输入搜索的内容" class="inpnut" style="width: 200px"></Input>

 <Button icon="ivu-icon ivu-icon-search" @click="search"></Button>


                </Col>
                	</Row>
			</div>


			<Table border @on-selection-change="onSelect"  @on-select-all="onSelectAll" :data="tableData1"   :columns="columns4" stripe></Table>
			<div class="page">
				<Page :total="10" :current="1" @on-change="changePage"></Page>
			</div>

		</div>
					</col>
		<Col span="24">
		<div style="padding: 30px 10px;">
			<Form v-if="ok" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
				<Row>
					<Col span="12">
					<FormItem label="楼栋" prop="catagory">
						<Input v-model="formValidate.catagory"  placeholder="Enter something..."></Input>
					</FormItem>
					</Col>

					<Col span="12">
					<FormItem label="楼层" prop="name">
						<InputNumber v-model="formValidate.name"  style="width:100%"  placeholder="Enter something..."></InputNumber>
					</FormItem>
					</Col>


				</Row>
				<Row>
					<Col span="12">
                					<FormItem label="房间" prop="name">
                						<InputNumber  v-model="formValidate.name" style="width:100%" :min="1"  placeholder="Enter something..."></InputNumber>
                					</FormItem>
                					</Col>
                				<Col span="12">
                                					<FormItem label="保底金额" prop="catagory">
                                					<InputNumber  v-model="formValidate.name" style="width:100%" :min="1"  placeholder="Enter something..."></InputNumber>
                                                                						</FormItem>
                                					</Col>
				</Row>
				<Row>
				  <Col span="12">
				  <FormItem label="分成方式" prop="name">
                                  						<InputNumber  v-model="formValidate.name" style="width:100%" :min="1"  placeholder="Enter something..."></InputNumber>
                                  					</FormItem>

                                                                        					</Col>
                                                                        					  <Col span="12">
                                                                                                                                                                    				<FormItem label="税费" prop="name">
                                                                                                                                                                                                    						<InputNumber  v-model="formValidate.name" style="width:100%" :min="1"  placeholder="Enter something..."></InputNumber>
                                                                                                                                                                                                    					</FormItem>
                                                                                                                                                                    					</Col>
				</Row>
		<Row>
    				  <Col span="12">
                                                                            					  <FormItem prop="date" label="续住申请时间">
                                                                                                                        <DatePicker type="date" placeholder="Select date" style="width:100%" v-model="formValidate.date"></DatePicker>
                                                                                                                    </FormItem>
                                                                            					</Col>
                                                                            					  <Col span="12">
                                                                                                                                                                        					  <FormItem prop="date" label="续住取消时间">
                                                                                                                                                                                                                    <DatePicker type="date" placeholder="Select date" style="width:100%" v-model="formValidate.date"></DatePicker>
                                                                                                                                                                                                                </FormItem>
                                                                                                                                                                        					</Col>
    				</Row>
	<Row>
					<Col span="24">
                                                    					<FormItem label="维修内容" prop="catagory">
                                                    						   <Input v-model="value5" type="textarea" placeholder="Enter something..." />

                                                                                                                                                                    					         					</FormItem>
                                                    					</Col>


				</Row>

				<!--<Row>
 <Col span="24">
					<FormItem label="附近商圈" prop="site">
				  <CheckboxGroup v-model="fruit">
                        <Checkbox label="世纪联华"></Checkbox>
                        <Checkbox label="万科*活力城"></Checkbox>

                    </CheckboxGroup></FormItem>
					</Col>
					</Row>
						<Row>
					 <Col :xs="24" :lg="8">
                                       <FormItem label="服务设施" prop="lineName">
                                     	<Input v-model="formValidate.weight" placeholder="Enter something..."></Input>
                                                         					 </FormItem>
                                       </Col>
                                         <Col :xs="24" :lg="8">
                                                                       <FormItem label=" " >
                                                                         <Button >
                                                                                 添加
                                                                               </Button></FormItem>
                                                                       </Col>
				</Row>
					<Row>
                					 <Col :xs="24" :lg="8">
                                                       <FormItem label=" " prop="lineName">
                                                     	<Input v-model="formValidate.weight" placeholder="Enter something..."></Input>
                                                                         					 </FormItem>
                      </Col> </Row>
						<Row>
                	                  <Col span="8">
                                                        					<FormItem label="图片1" prop="weight">
                                                        					 <img  src="../../../../images/cou_logo.png" width="100%" key="max-logo"/>


                                                        					 <Upload action="//jsonplaceholder.typicode.com/posts/">
                                                                                    <Button icon="ios-cloud-upload-outline">Upload files</Button>
                                                                                </Upload>
                                                                                </FormItem>
                                                                                <FormItem label="描述1" prop="weight">
                                                        					<Input v-model="formValidate.weight" placeholder="Enter something..."></Input>
                                                        					   </FormItem>
                                                        					</Col>


                                                        					</Row>-->
				<!--<Row>
					<Col span="12">
					<FormItem label="状态" prop="status">
						<RadioGroup v-model="formValidate.status">
							<Radio label="male">启用</Radio>
							<Radio label="female">禁用</Radio>
						</RadioGroup>
					</FormItem>
					</Col>
				</Row>-->
				<!--<Row>
					<Col span="12">
					<FormItem>
						<div style="position: relative;left: -100px;">
							<Button type="ghost" @click="handleAdd">添加新项</Button>
							<Button type="ghost" class="button " style="margin-left: 8px">导入列表</Button>
						</div>
					</FormItem>
					</Col>
				</Row>-->
				<!--<Row>
					<Table border ref="selection" :columns="columns5" :data="data2"></Table>
					<div class="page">
						<Page :total="10"></Page>
					</div>
				</Row>-->
				<Col span="24">
				<FormItem style="text-align: right;">
					<Button type="primary" @click="handleSubmit('formValidate')" class="save " style="margin-left: 0px;">保存</Button>
					<Button type="ghost" @click="handleReset('formValidate')" class="button " style="margin-left: 8px">取消</Button>
				</FormItem>
				</Col>
			</Form>

		</div>
		</Col>
	</div>
</template>
<script>
/*import {
  shiftAdd,
  shiftCode,
  shiftList,
  shiftUpdate,
  shiftId,
  siteSpinner
} from "../../api/index.js";*/
	export default {
		data() {
			return {
			    modal1: false,
			    modal2:false,
				tableData1: this.mockTableData1,
				showcom: true,
				ok: false,
				selection:"",
				formValidate: {
					catagory: '',
					name: '',
					site: '',
					weight: '',
					status: 'male',
				},
				 cityList: [
                                    {
                                        value: '0',
                                        label: '是'
                                    },
                                     {
                                                                            value: '1',
                                                                            label: '否'
                                                                        }
                                ],
				ruleValidate: {
					catagory: [{
						required: true,
						message: '此项为必填项',
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '此项为必填项',
						trigger: 'change'
					}],
					site: [{
						required: false,
						message: '此项为必填项',
						trigger: 'change'
					}],
					weight: [{
						required: false,
						message: '此项为必填项',
						trigger: 'change'
					}],
					status: [{
						required: false,
						message: '此项为必填项',
						trigger: 'change'
					}],
				},
				columns4: [{
						type: 'selection',
						width: 60,
						align: 'center',
					},
					{
						    title: "楼栋",
                                  key: "buildingName"
					},

					{
					  title: "楼层",
                                      key: "createTime",

					},
					{
					 title: "房间",
                              key: "businessCircle"
					},

        {
          title: "保底金额（元）",
          key: "city"
        },
         {
                  title: "分成方式（%）",
                  key: "brightSpot"
                },
                {
                					  title: "税费（元）",
                                              key: "buildingAddress"
                					},

                                          {
                                                   title: "维修内容",
                                                   key: "serviceFacility"
                                                 },

                                                 	{
                                                 						title: '操作',
                                                 						align: 'center',

                                                 						render: (h, params) => {
                                                 							return h('div', [
                                                 								h( "Button", {
                                                 									props: {
                                                 										  type: "primary",
                                                                                          size: "default",

                                                 									},
                                                 									 style: {
                                                                                                        marginRight: "5px",
                                                                                                            padding: "6px 8px",
                                                                                                      },
                                                                                                       on: {
                                                                                                                          click: () => {
                                                                                                                           this.aa()
                                                                                                                          }
                                                                                                                        }
                                                 								},

                                                 								  "修改"),
                                                 								  		h( "Button", {
                                                                                                                                   									props: {
                                                                                                                                   										  type: "primary",
                                                                                                                                                                            size: "default",
                                                                                                                                   									},
                                                                                                                                   									 style: {
                                                                                                                                                                                          marginRight: "5px",
                                                                                                                                                                                              padding: "6px 8px",
                                                                                                                                                                                        },
                                                                                                                                                                                          on: {
                                                                                                                                                                                                                                                                                                                  click: () => {

                                                                                                                                                                                                                                                                                                                 this.modal1 = true
                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                }

                                                                                                                                   								},

                                                                                                                                   								  "删除"),


                                                 							]);

                                                 						},

                                                 					},
				],

				tableData1: [{
						buildingName: 'BHC中环中心',
						buildingAddress: '150',
						createTime: '五楼',
						businessCircle: '1025',
						city: '2000',
                        brightSpot:'80',
                        codeConduct:'150',
                       serviceFacility:'墙面粉刷'
					}
				],
			}
		},
		methods: {
			handleSelectAll(status) {
				this.$refs.selection.selectAll(status);
			},
			 onSelect(selection, row) {
                  this.selection = selection.length;
                  console.log( this.selection)


                },
                onSelectAll(selection, row) {
                                             this.selection = selection.length;
                                             console.log( this.selection)


                                           },
                abd:function(){
               if( this.selection >0){
                                    this.modal1=true
                                  }else{
                                  this.modal2=true
                                  }
                },
			handleSubmit(name) {

				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$Message.success('Success!');
						this.ok = false;
						this.showcom = true;
					} else {
						this.$Message.error('Fail!');
					}
				})

			},
			    editShift(row, index) {


                 /*  shiftId(row.uuid).then(res => {
                     let shiftDetail = res.data.data;
                     this.formValidate = {
                       shiftNum: shiftDetail.shiftNum,
                       shiftName: shiftDetail.shiftName,
                       siteUuid: shiftDetail.siteUuid,
                       isEnable: shiftDetail.isEnable,
                       uuid: shiftDetail.uuid
                     };
                     this.data = shiftDetail.templates
                   });*/
                   this.showcom = false;
                   this.ok = true
                 },
			handleReset(name) {
			this.showcom = true;
			this.ok = false;
			},
			aa: function() {
				this.ok = true;
				this.showcom = false;
			},
			changePage() {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				this.tableData1 = this.mockTableData1();
			},
			handleAdd () {
                this.data2.push({
                    catagory: 'AC001001',
					name: '审查_通用',
					index: this.index,
					weight: '50%',
					site: 'Aden',
					Creationtime: '2016-10-03',

                });
            },

		}
	}
</script>
<style>
	#bb .ivu-form-item-content {
		margin-left: 0px
	}

	.operation {
		margin: 20px;
		background: #fff
	}

	.operation_mode {
		padding: 10px 0px
	}

	.button {
		border-color: #F1F1F1;
		background: #FFF;
		margin:0;
	}

	.ivu-btn:hover {
		color: #FFF;
		background-color: #e25144;
		border-color: #e25144;
	}

	.ivu-btn_box {
		font-size: 16px;
	}

	.ivu-btn.active,
	.ivu-btn:active {
		color: #FFF;
		background-color: #e25144;
		border-color: #e25144;
	}

	.inpnut {
		width: 200px;

		margin-right: 10px
	}

	.page {
		float: right;
		margin: 10px
	}

	.save {
		color: #FFF;
		background-color: #e25144;
		border-color: #e25144;
	}

</style>
