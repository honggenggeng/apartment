<template>
    <div class="operation" id="ccc">
        <col span="24">
        <div v-if="showcom">
            <div class="operation_mode">
                <Row type="flex" justify="space-between" style="padding-bottom:10px;">
                    <Col>
                    <Button class="button " @click='aa'>新建</Button>
                    <Button class="button" @click="abd"> 删除</Button>
                    <Button class="button"> 打印合同</Button>
                    <Modal v-model="modal1" title="提示" @on-ok="ok" @on-cancel="cancel">
                        <p>您确定要删除吗？</p>
                    </Modal>
                    <Modal v-model="modal2" title="提示">
                        <p>请选择您要删除的内容</p>
                    </Modal>
                    </Col>
                    <Col> <span>楼栋：</span>
                    <Input v-model="value4" placeholder="请输入搜索的内容" class="inpnut" style="width: 200px"></Input>
                    <Button icon="ivu-icon ivu-icon-search" @click="search"></Button>
                    </Col>
                </Row>
            </div>
            <Table border @on-selection-change="onSelect" @on-select-all="onSelectAll" :data="tableData1" :columns="columns4" stripe></Table>
            <div class="page">
                <Page :total="10" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
        </col>
        <Col span="24">
        <div style="padding: 30px 10px;">
            <Form v-if="ok" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="120">
                <Row>
                    <Col span="12">
                    <FormItem label="楼栋" prop="buildingCode">
                        <Input v-model="formValidate.buildingCode" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="楼层" prop="floorCode">
                        <InputNumber v-model="formValidate.floorCode" style="width:100%" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="房间" prop="apartmentCode">
                        <InputNumber v-model="formValidate.apartmentCode" style="width:100%" :min="1" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="房客" prop="customerCode">
                        <Input v-model="formValidate.customerCode" style="width:100%" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="管家" prop="userCode">
                        <Input v-model="formValidate.userCode" style="width:100%" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="入住人">
                        <InputNumber v-model="formValidate.customerCode2" style="width:100%" :min="1" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="房费金额" prop="rentMoney">
                        <InputNumber v-model="formValidate.rentMoney" style="width:100%" :min="0" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="押金金额" prop="depositMoney">
                        <InputNumber v-model="formValidate.depositMoney" style="width:100%" :min="0" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem prop="name" label="租赁起始时间">
                        <DatePicker type="date" placeholder="Select date" style="width:100%" v-model="formValidate.rentBegin"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem prop="name" label="租赁终止时间">
                        <DatePicker type="date" placeholder="Select date" style="width:100%" v-model="formValidate.rentEnd"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="金额" prop="totleMoney">
                        <InputNumber disabled  v-model="totleMoney" style="width:100%" :min="0" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="管家状态确认" prop="weight">
                        <Select v-model="formValidate.userStatus">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem prop="date" label="续住申请时间">
                        <DatePicker type="date" placeholder="Select date" style="width:100%" v-model="formValidate.rentLimitAmount"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem prop="date" label="续住取消时间">
                        <DatePicker type="date" placeholder="Select date" style="width:100%" v-model="formValidate.rentLimitCode"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="合同路径" prop="">
                        <Input v-model="formValidate.contactPath" style="width:100%" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="入住状态" prop="">
                        <Select v-model="formValidate.customerStatus2">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
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
    created(){

      //ajax请求数据
      let dataArray=[{                
          buildingCode: 'BHC中环中心',
          floorCode: '一楼',
          apartmentCode: '1201',
          customerCode: '张三',
          userCode: '李四',
          customerCode2: '张三',
          rentMoney: '1000',
          depositMoney: '1000',
          rentBegin: '2018-10-01',
          rentEnd: '2019-10-01',          
          userStatus: '1',
          rentLimitAmount: '是',
          rentLimitCode: '是',
          contactPath: 'xxxxxxx',
          customerStatus2: '1'
      }]
      for (let i = 0; i < dataArray.length; i++) {
        
            let obj={
              buildingCode: dataArray[i].buildingCode ,
              floorCode: dataArray[i].floorCode ,
              apartmentCode: dataArray[i].apartmentCode ,
              customerCode: dataArray[i].customerCode ,
              userCode: dataArray[i].userCode ,
              customerCode2: dataArray[i].customerCode2 ,
              rentMoney: dataArray[i].rentMoney ,
              depositMoney: dataArray[i].depositMoney ,
              rentBegin: dataArray[i].rentBegin ,
              rentEnd: dataArray[i].rentEnd ,
              totleMoney: parseFloat(dataArray[i].rentMoney)+parseFloat(dataArray[i].depositMoney) ,
              userStatus: dataArray[i].userStatus=='1'?'已入住':'未入住' ,
              rentLimitAmount: dataArray[i].rentLimitAmount ,
              rentLimitCode: dataArray[i].rentLimitCode ,
              contactPath: dataArray[i].contactPath ,
              customerStatus2: dataArray[i].customerStatus2 =='1'?'已入住':'未入住'
            }
            this.tableData1.push(obj);
      }
    },
    data() {
        return {
            modal1: false,
            modal2: false,
            tableData1: this.mockTableData1,
            showcom: true,
            ok: false,
            selection: "",                       
            formValidate: {
              buildingCode:'' ,
              floorCode:'' ,
              apartmentCode:'',
              customerCode:'',
              userCode:'',
              customerCode2:'',
              rentMoney:'',
              depositMoney:'',                
              rentBegin:'',
              rentEnd:'',                
              userStatus:'',
              rentLimitAmount:'',
              rentLimitCode:'',
              contactPath:'',
              customerStatus2:''
            },
            cityList: [
              {
                value: '0',
                label: '已入住'
              },
              {
                value: '1',
                label: '未入住'
              }
            ],
            /*/楼栋/buildingCode /楼层/floorCode /房间/apartmentCode/房客/customerCode/管家/userCode/入住人/customerCode2/房费金额/rentMoney/押金金额/depositMoney/租赁起始时间/rentBegin/租赁终止时间/rentEnd/金额/totleMoney/管家状态确认/userStatus/续住申请时间/rentLimitAmount/续住取消时间/rentLimitCode/合同路径/contactPath/入住状态/customerStatus2*/
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
                    key: "buildingCode"
                },
                {
                    title: "房间",
                    key: "apartmentCode",
                },
                {
                    title: "起始时间",
                    key: "rentBegin"
                },
                {
                    title: "终止时间",
                    key: "rentEnd"
                },
                {
                    title: "房客",
                    key: "customerCode"
                },
                {
                    title: "管家",
                    key: "userCode"
                },
                {
                    title: "金额（元）",
                    key: "totleMoney"
                },
                {
                    title: '操作',
                    width:150,
                    align: 'center',
                    render: (h, params) => {
                      return h('div', [
                          h("Button", {
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
                                      this.aa(params)
                                  }
                              }
                          },
                          "修改"),
                          h("Button", {
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
            tableData1: []
        }
    },
    computed:{      
      totleMoney: function () {
        return parseFloat(this.formValidate.rentMoney) +parseFloat(this.formValidate.depositMoney) ;
      }
    },    
    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status);
        },
        onSelect(selection, row) {
            this.selection = selection.length;
            console.log(this.selection)


        },
        onSelectAll(selection, row) {
            this.selection = selection.length;
            console.log(this.selection)


        },
        abd: function() {
            if (this.selection > 0) {
                this.modal1 = true
            } else {
                this.modal2 = true
            }
        },
        handleSubmit(name) {

            this.$refs[name].validate((valid) => {
                if (valid) {
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
        aa: function(params) {          
          if (params.row==undefined) {
            this.formValidate.buildingCode= '' ,
            this.formValidate.floorCode= '' ,
            this.formValidate.apartmentCode= '' ,
            this.formValidate.customerCode= '' ,
            this.formValidate.userCode= '' ,
            this.formValidate.customerCode2= '' ,
            this.formValidate.rentMoney= '' ,
            this.formValidate.depositMoney= '' ,
            this.formValidate.rentBegin= '' ,
            this.formValidate.rentEnd= '' ,            
            this.formValidate.userStatus= '' ,
            this.formValidate.rentLimitAmount= '' ,
            this.formValidate.rentLimitCode= '' ,
            this.formValidate.contactPath= '' ,
            this.formValidate.customerStatus2= '' 
          } else {
            this.formValidate.buildingCode= params.row.buildingCode ,
            this.formValidate.floorCode= params.row.floorCode ,
            this.formValidate.apartmentCode= params.row.apartmentCode ,
            this.formValidate.customerCode= params.row.customerCode ,
            this.formValidate.userCode= params.row.userCode ,
            this.formValidate.customerCode2= params.row.customerCode2 ,
            this.formValidate.rentMoney= params.row.rentMoney ,
            this.formValidate.depositMoney= params.row.depositMoney ,
            this.formValidate.rentBegin= params.row.rentBegin ,
            this.formValidate.rentEnd= params.row.rentEnd ,       
            this.formValidate.userStatus= params.row.userStatus=='已入住'?'1':'0' ,
            this.formValidate.rentLimitAmount= params.row.rentLimitAmount ,
            this.formValidate.rentLimitCode= params.row.rentLimitCode ,
            this.formValidate.contactPath= params.row.contactPath ,
            this.formValidate.customerStatus2= params.row.customerStatus2=='已入住'?'1':'0' 
          }
              
            this.ok = true;
            this.showcom = false;
        },
        changePage() {
            // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
            this.tableData1 = this.mockTableData1();
        },
        handleAdd() {
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
    margin: 0;
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