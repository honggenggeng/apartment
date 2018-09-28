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
                    <Col> <span>合同号：</span>
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
		<div v-if="ok" style="padding: 30px 10px;">
			<Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
				<Row>
					<Col span="12">
					<FormItem label="合同号" prop="catagory">
							<InputNumber  v-model="formValidate.name" style="width:100%" :min="1"  placeholder="Enter something..."></InputNumber>
                                    				</FormItem>
					</Col>

					<Col span="12">
					<FormItem label="房间" prop="name">
						<InputNumber disabled style="width:100%" value="1025"></InputNumber>
					</FormItem>
					</Col>


				</Row>
				<Row>
					<Col span="12">
                					<FormItem label="客户名称" prop="name">
                						<Input   disabled  value="王五" ></Input>
                                						</FormItem>
                					</Col>
                				<Col span="12">
                                					<FormItem label="金额" prop="name">
                                						<InputNumber v-model="formValidate.name"  style="width:100%"  placeholder="Enter something..."></InputNumber>
                                					</FormItem>
                                					</Col>
				</Row>
				<Row>
				  <Col span="12">
				  <FormItem label="类型" prop="name">
                                  					 <Select v-model="model2" >
                                                                                                                                                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                                                                                                                                    </Select>              						</FormItem>
                                                                                					</FormItem>

                                                                        					</Col>
                                                                        					  <Col span="12">
                                                                                                                                                                    				  <FormItem label="是否已开票" prop=" ">	 <Select v-model="model2" >
                                                                                                                                                                                                                                                                                                                                                            <Option v-for="item in cityYes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                                                                                                                                                                                                                                                                                                                        </Select>              						</FormItem>

                                                                                                                                                                    					</Col>
				</Row>
					<Row>
                				  <Col span="12">
                				  <FormItem label="状态" prop="name">
                                                  					 <Select v-model="model2" >
                                                                                                                                                                                        <Option v-for="item in cityNo" :alue="item.value" :key="item.value">{{ item.label }}</Option>
                                                                                                                                                                                    </Select>              						</FormItem>
                                                                                                					</FormItem>

                                                                                        					</Col>
                                                                                        					  <Col span="12">
                                                                                                                                                                                    				  <FormItem label="支付方式" prop="name">	 <Select v-model="model2" >
                                                                                                                                                                                                                                                                                                                                                                            <Option v-for="item in cityOne" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                                                                                                                                                                                                                                                                                                                                        </Select>              						</FormItem>

                                                                                                                                                                                    					</Col>
                				</Row>
		<Row>

    				</Row>
	<Row>
		<Col span="24">
                                                        					<FormItem label="描述" prop="">
                                                        						   <Input v-model="value5" type="textarea" placeholder="Enter something..." />

                                                                                                                                                                        					         					</FormItem>
                                                        					</Col>
				</Row>


				<Col span="24">
				<FormItem style="text-align: right;">
					<Button type="primary" @click="handleSubmit('formValidate')" class="save " style="margin-left: 0px;">保存</Button>
					<Button type="ghost" @click="handleReset('formValidate')" class="button " style="margin-left: 8px">取消</Button>
				</FormItem>
				</Col>
			</Form>

		</div>
		</Col>
		<Col span="24">
        		<div v-if="particulars" style="padding: 30px 10px;">
        			<Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
        				<Row>
        					<Col span="12">
        					<FormItem label="合同号" prop="">
        							<InputNumber  disabled style="width:100%" :min="1"  value="165498123156"></InputNumber>
                                            				</FormItem>
        					</Col>

        					<Col span="12">
        					<FormItem label="房间" prop="">
        						<InputNumber disabled style="width:100%" value="1025"></InputNumber>
        					</FormItem>
        					</Col>


        				</Row>
        				<Row>
        					<Col span="12">
                        					<FormItem label="客户名称" prop="">
                        						<Input   disabled  value="王五" ></Input>
                                        						</FormItem>
                        					</Col>
                        				<Col span="12">
                                        					<FormItem label="金额" prop="">
                                        						<InputNumber  style="width:100%" disabled value="1025"></InputNumber>
                                        					</FormItem>
                                        					</Col>
        				</Row>
        				<Row>
        				  <Col span="12">
        				  <FormItem label="状态" prop="">
        				  <Input   disabled  value="已支付" ></Input>
        				  	</FormItem>

                                                                                					</Col>
                                                                                					  <Col span="12">
                                                                                                                                                                            				  <FormItem label="是否已开票" prop=" ">
                                                                                                                                                                            				   <Input   disabled  value="否" ></Input>
                                                                                                                                                                            				                						</FormItem>

                                                                                                                                                                            					</Col>
        				</Row>
        					<Row>

                                                                                                					  <Col span="12">
                                                                                                                                                                                            				  <FormItem label="支付方式" prop=" ">
                                                                                                                                                                                            				     <Input   disabled  value="现金支付" ></Input>
                                                                                                                                                                                            				               						</FormItem>

                                                                                                                                                                                            					</Col>
                        				</Row>
        		<Row>

            				</Row>
        	<Row>
        		<Col span="24">
                                                                					<FormItem label="描述" prop="" style="text-align: right;">
                                                                						   <Input  type="textarea" disabled  value="XXXXXX" />
                                                                						   <p  style="margin: 10px;padding: 6px 15px;
                                                                                                                                         font-size: 12px;
                                                                                                                                         border-radius: 4px;">已退款</p>

                                                                                                                                                                                					         					</FormItem>

                                                                					</Col>
        				</Row>


        				<Col span="24">
        				<FormItem style="text-align: right;">

        					<Button type="ghost" class="button " style="margin-left: 8px"     @click="getBack">返回</Button>
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
				particulars:false,
				ok: false,
				selection:"",
				formValidate: {
					catagory: '',
					name: '',
					site: '',
					weight: '',
					status: 'male',
				},
						cityOne: [
                                                                                                           {
                                                                                                               value: '0',
                                                                                                             label: '现金支付'
                                                                                                           },
                                                                                                            {
                                                                                                                                                   value: '1',
                                                                                                                                                   label: '微信支付'
                                                                                                                                               },
                                                                                                                                                {
                                                                                                                                                                                                                                                                                                  value: '1',
                                                                                                                                                                                                                                                                                                  label: '支付宝支付'
                                                                                                                                                                                                                                                                                              },
                                                                                                                                                                                                                                                                                               {
                                                                                                                                                                                                                                                                                                                                                                                                                                                 value: '1',
                                                                                                                                                                                                                                                                                                                                                                                                                                                 label: '银联支付'
                                                                                                                                                                                                                                                                                                                                                                                                                                             }
                                                                                                       ],
				cityNo: [
                                                                                           {
                                                                                               value: '0',
                                                                                               label: '已支付'
                                                                                           },
                                                                                            {
                                                                                                                                   value: '1',
                                                                                                                                   label: '未支付'
                                                                                                                               }
                                                                                       ],
				 cityList: [
                                    {
                                        value: '0',
                                        label: '房租'
                                    },
                                     {
                                                                            value: '1',
                                                                            label: '维修'
                                                                        },
                                                                         {
                                                                                                                                                    value: '1',
                                                                                                                                                    label: '服务'
                                                                                                                                                }
                                ],
                                	 cityYes: [
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
						    title: "合同号",
                                  key: "buildingName",
                                    sortable: true
					},

					{
					  title: "房间",
                                      key: "createTime",

					},
					/* {
					 title: "客户名称",
                              key: "businessCircle"
					},*/

        {
          title: "金额（元）",
          key: "city"
        },
          {
                        					  title: "状态",
                                                      key: "buildingAddress",
                                                        sortable: true
                        					},
         {
                  title: "账单时间",
                  key: "brightSpot"
                },


                                          /*  {
                                                   title: "是否已开票",
                                                   key: "serviceFacility"
                                                 },
                                                    					{
                                                    					  title: "状态",
                                                                                  key: "buildingAddress"
                                                    					},*/
                                                    					{
                                                                        					 title: "支付方式",
                                                                                                      key: "businessCircle"
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
                                                                                                        marginRight: "3px",
                                                                                                            padding: "6px 6px",
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
                                                                                                                                                                                          marginRight: "3px",
                                                                                                                                                                                              padding: "6px 6px",
                                                                                                                                                                                        },
                                                                                                                                                                                          on: {
                                                                                                                                                                                                                                                                                                                  click: () => {

                                                                                                                                                                                                                                                                                                                 this.modal1 = true
                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                }

                                                                                                                                   								},

                                                                                                                                   								  "删除"),
                                                                                                                                   								  	h( "Button", {
                                                                                                                                                                                                                   									props: {
                                                                                                                                                                                                                   										  type: "primary",
                                                                                                                                                                                                                                                            size: "default",

                                                                                                                                                                                                                   									},
                                                                                                                                                                                                                   									 style: {
                                                                                                                                                                                                                                                                          marginRight: "3px",
                                                                                                                                                                                                                                                                              padding: "6px 6px",
                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                         on: {
                                                                                                                                                                                                                                                                                            click: () => {
                                                                                                                                                                                                                                                                                             this.cc()
                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                   								},

                                                                                                                                                                                                                   								  "详情"),


                                                 							]);

                                                 						},

                                                 					},
				],

				tableData1: [{
						buildingName: '165498123156',
						buildingAddress: '已支付',
						createTime: '1025',
						businessCircle: '现金支付',
						city: '2000',
                        brightSpot:'2018-10-31',                       codeConduct:'150',
                       serviceFacility:'否'
					},
					{
                    						buildingName: '165498123156',
                    						buildingAddress: '已支付',
                    						createTime: '1025',
                    						businessCircle: '微信支付',
                    						city: '2000',
                                            brightSpot:'2018-10-20',                       codeConduct:'150',
                                           serviceFacility:'否'
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
                                           getBack:function(){
                                           this.showcom = true;
                                           this.particulars=false;
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
			},cc: function() {
                          				this.particulars = true;
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
    	margin-right: 10px;
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
