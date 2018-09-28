<template>
    <div class="operation" id="ccc">
        <col span="24">
          <div v-if="showcom">
              <div class="operation_mode">
                  <Row type="flex" justify="space-between" style="padding-bottom:10px;">
                      <Col>
                      <Button class="button " @click='aa'>新建</Button>
                      <Button class="button" @click="abd"> 删除</Button>
                      <Modal v-model="modal1" title="提示" @on-ok="ok" @on-cancel="cancel">
                          <p>您确定要删除吗？</p>
                      </Modal>
                      <Modal v-model="modal2" title="提示">
                          <p>请选择您要删除的内容</p>
                      </Modal>
                      </Col>
                      <Col> <span>合同号：</span>
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
        <div v-if="ok" style="padding: 30px 10px;">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
                <Row>
                    <Col span="12">
                    <FormItem label="合同号" prop="contractCode">
                        <InputNumber v-model="formValidate.contractCode" style="width:100%" :min="1" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="房间" prop="apartmentCode">
                        <InputNumber v-model="formValidate.apartmentCode" style="width:100%"></InputNumber>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="客户名称" prop="customerCode">
                        <Input v-model="formValidate.customerCode"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="金额" prop="billMoney">
                        <InputNumber v-model="formValidate.billMoney" style="width:100%" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="类型" prop="billTypeCode">
                        <Select v-model="formValidate.billTypeCode">
                            <Option v-for="item in billMoneyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="是否已开票" prop="invoiceFlag">
                        <Select v-model="formValidate.invoiceFlag">
                            <Option v-for="item in billMoneyYes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>                   
                    <Col span="12">
                    <FormItem label="状态" prop="billStatus">
                        <Select v-model="formValidate.billStatus">
                            <Option v-for="item in billMoneyNo" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="支付方式" prop="payTypeCode">
                        <Select v-model="formValidate.payTypeCode">
                            <Option v-for="item in billMoneyOne" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="描述" prop="">
                        <Input v-model="formValidate.billRemark" type="textarea" placeholder="Enter something..." />
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
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
                <Row>
                    <Col span="12">
                    <FormItem label="合同号" prop="">
                        <InputNumber disabled v-model="formValidate.contractCode" style="width:100%" :min="1"></InputNumber>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="房间" prop="">
                        <InputNumber disabled v-model="formValidate.apartmentCode" style="width:100%"></InputNumber>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="客户名称" prop="">
                        <Input disabled v-model="formValidate.customerCode"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="金额" prop="">
                        <InputNumber style="width:100%" disabled v-model="formValidate.billMoney"></InputNumber>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="状态" prop="">
                        <Input disabled v-model="formValidate.billStatus"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="是否已开票" prop=" ">
                        <Input disabled v-model="formValidate.invoiceFlag"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="支付方式" prop=" ">
                        <Input disabled v-model="formValidate.payTypeCode"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                </Row>
                <!-- <Row>
                    <Col span="24">
                    <FormItem label="描述" prop="" style="text-align: right;">
                        <Input type="textarea" disabled v-model="formValidate.billRemark" />
                        <p style="margin: 10px;padding: 6px 15px;font-size: 12px;border-radius: 4px;">已退款</p>
                    </FormItem>
                    </Col>
                </Row> -->
                <Col span="24">
                <FormItem style="text-align: right;">
                    <Button type="ghost" class="button " style="margin-left: 8px" @click="getBack">返回</Button>
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
      let dataArray=[{
        billCode:'001',
        billTypeCode:'1',
        contractCode: '165498123156',
        billStatus: '0',
        apartmentCode: '1025',
        customerCode:'张三',
        payTypeCode: '现金支付',
        billMoney: '2000',
        billTime: '2018-10-31',
        invoiceNumber: '1501005',                    
        invoiceFlag:'未开票',
        billRemark:'请维修人员定期检查设备设施，防止二次资源浪费'
    },
    {   billCode:'002',
        billTypeCode:'0',
        contractCode: '165498123156',
        billStatus: '1',
        apartmentCode: '1025',
        customerCode:'李四',
        payTypeCode: '微信支付',
        billMoney: '2000',
        billTime: '2018-10-20',
        invoiceNumber: '1502005',
        invoiceFlag:'已开票',
        billRemark:'房租到期，请及时续费，以免给您带来不便'
    }]

    for (var i = 0; i < dataArray.length; i++) {      
      let obj={
        billCode:dataArray[i].billCode,
        billTypeCode:dataArray[i].billTypeCode==0?'房租':dataArray[i].billTypeCode==1?'维修':'服务',
        contractCode: dataArray[i].contractCode,
        billStatus: dataArray[i].billStatus=='0'?'已支付':'未支付',
        apartmentCode: dataArray[i].apartmentCode,
        customerCode:dataArray[i].customerCode,
        payTypeCode: dataArray[i].payTypeCode,
        billMoney: dataArray[i].billMoney,
        billTime: dataArray[i].billTime,
        invoiceNumber:dataArray[i].invoiceNumber,
        invoiceFlag:dataArray[i].invoiceFlag, 
        billRemark:dataArray[i].billRemark       
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
            particulars: false,
            ok: false,
            selection: "",
            formValidate: {
              billCode:'',
              billTypeCode:'',
              contractCode: '',
              apartmentCode: '',
              customerCode: '',
              billMoney: '',
              billStatus: '',
              billTime:'',
              payTypeCode:'',
              invoiceFlag:'',
              billRemark:'',
              invoiceNumber:''
            },
            billMoneyOne: [{
                    value: '0',
                    label: '现金支付'
                },
                {
                    value: '1',
                    label: '微信支付'
                },
                {
                    value: '2',
                    label: '支付宝支付'
                },
                {
                    value: '3',
                    label: '银联支付'
                }
            ],
            billMoneyNo: [{
                    value: '0',
                    label: '未支付'
                },
                {
                    value: '1',
                    label: '已支付'
                }
            ],
            billMoneyList: [{
                    value: '0',
                    label: '房租'
                },
                {
                    value: '1',
                    label: '维修'
                },
                {
                    value: '2',
                    label: '服务'
                }
            ],
            billMoneyYes: [{
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
                    key: "contractCode",                    
                },
                {
                  title:"账单类型",              
                  key:"billTypeCode"
                },
                {
                    title: "房间",                  
                    key: "apartmentCode",
                },
                {
                  title: "客户名称",
                  key: "customerCode"
                },
                {
                    title: "金额/元",                    
                    key: "billMoney"
                },
                {
                    title: "状态",                   
                    key: "billStatus",                    
                },
                {
                    title: "账单时间",
                    width:110,
                    key: "billTime"
                },
                {
                  title: "是否已开票",
                  key: "invoiceFlag"
                },                
                {
                    title: "支付方式",
                    key: "payTypeCode"
                },
                {
                    title: '操作',
                    align: 'center',
                    width:160,
                    render: (h, params) => {
                      return h('div', [
                        h("Button", {
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
                        h("Button", {
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
                                  this.cc(params)
                              }
                          }
                      },
                      "详情"),
                      ]);
                    },
                },
            ],
            tableData1:[]
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
        getBack: function() {
            this.showcom = true;
            this.particulars = false;
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
            this.formValidate.billCode= '';
            this.formValidate.billTypeCode= '';
            this.formValidate.contractCode= '';
            this.formValidate.billStatus= '';
            this.formValidate.apartmentCode= '';
            this.formValidate.customerCode='';
            this.formValidate.payTypeCode= '';
            this.formValidate.billMoney= '';
            this.formValidate.billTime= '';
            this.formValidate.invoiceNumber='';
            this.formValidate.invoiceFlag='';
            this.formValidate.billRemark='';
          } else {
            this.formValidate.billCode= params.row.billCode;   
            this.formValidate.billTypeCode= params.row.billTypeCode=='房租'?'0':(params.row.billTypeCode=='维修'?'1':'2');
            this.formValidate.contractCode= params.row.contractCode;
            this.formValidate.billStatus= this.toBillStatus(params.row.billStatus);
            this.formValidate.apartmentCode= params.row.apartmentCode;
            this.formValidate.customerCode=params.row.customerCode;
            this.formValidate.payTypeCode=this.toPayTypeCode(params.row.payTypeCode);
            this.formValidate.billMoney= params.row.billMoney;
            this.formValidate.billTime= params.row.billTime;
            this.formValidate.invoiceNumber=params.row.invoiceNumber;
            this.formValidate.invoiceFlag=params.row.invoiceFlag=='未开票'?'0':'1'; 
            this.formValidate.billRemark=params.row.billRemark; 
          }
            this.ok = true;
            this.showcom = false;
        },
        toPayTypeCode(val) {
          switch(val) {
              case '现金支付':
                  return "0";
              case '微信支付':
                  return "1";
              case '支付宝支付':
                  return "1";
              default: 
                  return "3";
          }
        },
        toBillStatus(val){
                 
          switch(val) {
              case '未支付':
                  return '0';              
              default: 
                  return '1';
          }
        },
        cc: function(params) {
            this.formValidate.billCode= params.row.billCode;   
            this.formValidate.billTypeCode= params.row.billTypeCode;
            this.formValidate.contractCode= params.row.contractCode;
            this.formValidate.billStatus= params.row.billStatus;
            this.formValidate.apartmentCode= params.row.apartmentCode;
            this.formValidate.customerCode=params.row.customerCode;
            this.formValidate.payTypeCode= params.row.payTypeCode;
            this.formValidate.billMoney= params.row.billMoney;
            this.formValidate.billTime= params.row.billTime;
            this.formValidate.invoiceNumber=params.row.invoiceNumber;
            this.formValidate.invoiceFlag=params.row.invoiceFlag; 
            this.formValidate.billRemark=params.row.billRemark; 

            this.particulars = true;
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