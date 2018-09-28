<template>
	<div class="operation" id="ccc">
		<col span="24">
		<div v-if="showcom">
			<div class="operation_mode">
			  <Row type="flex" justify="space-between" style="padding-bottom:10px;">
			 <Col>

			  </Col>
                    <Col> <span>房屋名称：</span>
                    <Input v-model="value4"  placeholder="请输入搜索的内容" class="inpnut" style="width: 200px"></Input>

 <Button icon="ivu-icon ivu-icon-search" @click="search"></Button>


                </Col>
                	</Row>
			</div>


			<Table border @on-selection-change="onSelect"  @on-select-all="onSelectAll" :data="tableData1"   :columns="columns4" stripe></Table>
			<Col span="24" style="text-align: right;    margin: 15px 0;">

            					<Button type="primary" @click="handleSubmit('formValidate')" class="save " style="margin-left: 0px;">保存</Button>
            					<Button type="ghost" @click="handleReset('formValidate')" class="button " style="margin-left: 8px">取消</Button>
            				  </Col>

			<div class="page">
				<Page :total="10" :current="1" @on-change="changePage"></Page>
			</div>

		</div>
					</col>

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
			  lists:[{

                            tel:"qwe"
                        }],
                          listsc:[{

                                                    tel:"qwe"
                                                }],
			    modal1: false,
			    modal2:false,
				tableData1: this.mockTableData1,
				showcom: true,
				ok: false,

				   disabledGroup: '中间户',
				selection:"",
				formValidate: {
					catagory: '',
					name: '',
					site: '',
					weight: '',
					status: 'male',
				},
					 cityLists: [
                                                    {
                                                        value: '1',
                                                        label: '东'
                                                    },  {
                                                                                              value: '2',
                                                                                              label: '南'
                                                                                          },     {
                                                                                                                                                    value: '4',
                                                                                                                                                    label: '北'
                                                                                                                                                },  {
                                                                                                                                                                                          value: '0',
                                                                                                                                                                                          label: '西'
                                                                                                                                                                                      }
                                                ],
				 cityList: [
                                    {
                                        value: '1',
                                        label: '已出租'
                                    },  {
                                                                              value: '0',
                                                                              label: '未出租'
                                                                          }
                                ],
                                 cityLista: [
                                                                    {
                                                                        value: '1',
                                                                        label: '有'
                                                                    },  {
                                                                                                              value: '0',
                                                                                                              label: '无'
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
						    title: "房屋名称",
                                  key: "buildingName"
					},
					{
					  title: "楼栋",
                              key: "buildingAddress"
					},
					{
					  title: "楼层",
                                      key: "createTime",

					},
					 {
                              title: "状态",
                              key: "city"
                            },
                          {
                                                       title: "备注",
                                                       key: "remark"
                                                     },
					{
					 title: "房型",
                              key: "businessCircle"
					},


         {
                  title: "面积（㎡）",
                  key: "brightSpot"
                },
                       /*
                                 ,
                                          {
                                                   title: "服务设施",
                                                   key: "serviceFacility"
                                                 }, */
                                                {
                                                                                    title: "类型",
                                                                                    key: "codeConduct"
                                                                                  },
                                                 	{
                                                 						title: '分配管家',
                                                 						align: 'center',

                                                 render: (h, params) => {
                                                 return h('Select', {
                                                                     props:{
                                                                         value: params.row.style,
                                                                     },
                                                                     on: {
                                                                         'on-change':(event) => {
                                                                           console.log(event);
                                                                           self.selectData[params.index].style = event;
                                                                           // self.$refs.selectDataTable.objData[params.index]['style'] = value;
                                                                             // this.data[params.index].volumeType = event;
                                                                         }
                                                                     },
                                                                 },
                                                                 [
                                                                     h('Option',{
                                                                         props: {
                                                                             value: 'Y'
                                                                         }
                                                                     },'李四'),
                                                                     h('Option',{
                                                                         props: {
                                                                             value: 'M'
                                                                         }
                                                                     },'王五'),
                                                                     h('Option',{
                                                                         props: {
                                                                             value: 'D'
                                                                         }
                                                                     },'张三')

                                                                 ]);
                                                 },

                                                 					},
				],

				tableData1: [{
						buildingName: '102',
						buildingAddress: 'BHC中环中心',
						createTime: '3',
						businessCircle: '标准间',
						city: '已出租',
						remark:"服务周到，性价比高",
                        brightSpot:'30',
                       codeConduct:'两室一厅',
                       serviceFacility:'中餐、免费停车场'
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
			add:function() {
                            			   let cope = {

                                                            tel:""
                                                        }
                                                        this.lists.push(cope);
                                                        console.log(this.lists)
                            			},
                            			 del:function(index){

                                                        this.lists.splice(index,1);

                                                    },
                                                    	addc:function() {
                                                                                			   let cope = {

                                                                                                                tel:""
                                                                                                            }
                                                                                                            this.listsc.push(cope);
                                                                                                            console.log(this.listsc)
                                                                                			},
                                                                                			 delc:function(index){

                                                                                                            this.listsc.splice(index,1);

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
