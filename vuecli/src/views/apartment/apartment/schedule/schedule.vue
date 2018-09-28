<template>
    <div class="operation" id="ccc">
        <col span="24">
        <div v-if="showcom">
            <div class="operation_mode">
                <Row type="flex" justify="space-between" style="padding-bottom:10px;">
                    <Col>
                    <Button class="button" @click='aa'>新建</Button>
                    <Button class="button" @click="abd"> 删除</Button>
                    <Modal v-model="modal1" title="提示" @on-ok="ok" @on-cancel="cancel">
                        <p>您确定要删除吗？</p>
                    </Modal>
                    <Modal v-model="modal2" title="提示">
                        <p>请选择您要删除的内容</p>
                    </Modal>
                    </Col>
                    <Col> <span>房间：</span>
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
            <Form v-if="ok" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
                <Row>
                    <Col span="12">
                    <FormItem label="房间 " prop="apartmentCode">
                        <InputNumber v-model="formValidate.apartmentCode" style="width:100%" :min="1" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="管家" prop="userCode">
                        <Input disabled v-model="formValidate.userCode"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem prop="orderTime" label="预约看房时间">
                        <DatePicker type="date" placeholder="Select date" style="width:100%" v-model="formValidate.orderTime"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="状态" prop="orderStatus">
                        <Select v-model="formValidate.orderStatus">
                            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="客户姓名 " prop="customerName">
                        <Input v-model="formValidate.customerName" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="联系方式" prop="customerMobile">
                        <InputNumber v-model="formValidate.customerMobile" style="width:100%" :min="1" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="备注" prop="orderRemark">
                        <Input v-model="formValidate.orderRemark" type="textarea" placeholder="Enter something..." />
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
        let dataArray=[{
                orderCode:'001',
                apartmentCode: '1011',
                userCode: '张三',
                orderTime: '2018-8-31 10:00:00',
                customerCode:'0001',
                customerName:'张家辉',
                customerMobile: "18549281558",
                orderStatus: 0,                
                createTime: '2018-8-31 18:00:00',                
                orderRemark: "9点前看房间" 
            },
            {
                orderCode:'002',
                apartmentCode: '1012',
                userCode: '李四',
                orderTime: '2018-8-31 10:00:00',
                customerCode:'0001',
                customerName:'张家辉',
                customerMobile: "18549281558",
                orderStatus: 1,                
                createTime: '2018-8-31 18:00:00',                
                orderRemark: "9点前看房间" 
            }]
        for (var i = 0; i < dataArray.length; i++) {
            let obj={
                orderCode:dataArray[i].orderCode,
                apartmentCode: dataArray[i].apartmentCode,
                userCode: dataArray[i].userCode,
                orderTime: dataArray[i].orderTime,
                customerCode: dataArray[i].customerCode,
                customerName: dataArray[i].customerName,
                customerMobile: dataArray[i].customerMobile,
                orderStatus: dataArray[i].orderStatus==0?"未预约":"已预约",
                createTime: dataArray[i].createTime,
                orderRemark: dataArray[i].orderRemark
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
                orderCode: '',
                apartmentCode: '',
                userCode: '',
                orderTime: '',
                customerCode: '',
                customerName: '',
                customerMobile: '',                
                orderStatus: '',
                createTime: '',
                orderRemark:''
            },
            stateList: [{
                value: '0',
                label: '已预约'
            }, {
                value: '1',
                label: '未预约'
            }],
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
                    title: "房间",
                    width:100,
                    key: "apartmentCode"
                },

                {
                    title: "预约看房时间",
                    key: "orderTime",
                    width: 110,

                },
                {
                    title: "管家",
                    width:100,
                    key: "userCode"
                },
                {
                    title: "创建时间",
                    key: "createTime",
                    width: 110,

                },
                {
                    title: "客户姓名",
                    key: "customerName"
                },
                {
                    title: "联系方式",
                    key: "customerMobile"
                },
                {
                    title: "状态",
                    width:100,
                    key: "orderStatus"

                }, {
                    title: "备注",
                    key: "orderRemark"
                },
                {
                    title: '操作',
                    align: 'center',
                    width:140,
                    render: (h, params) => {
                        return h('div', [
                            h("Button", {
                                    props: {
                                        type: "primary",
                                        size: "default",

                                    },
                                    style: {
                                        marginRight: "5px",
                                        padding: "6px 7px",
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
                                        padding: "6px 7px",
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
            tableData1: [],
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
            console.log(params);
            if (params.row==undefined) {
           
                this.formValidate.orderCode="";
                this.formValidate.apartmentCode="";
                this.formValidate.userCode="";
                this.formValidate.orderTime="";
                this.formValidate.customerCode="";
                this.formValidate.customerName="";
                this.formValidate.customerMobile="";
                this.formValidate.orderStatus="";
                this.formValidate.createTime="";
                this.formValidate.orderRemark="";
            } else {
                this.formValidate.orderCode= params.row.orderCode;
                this.formValidate.apartmentCode= params.row.apartmentCode;
                this.formValidate.userCode= params.row.userCode;
                this.formValidate.orderTime= params.row.orderTime;
                this.formValidate.customerCode= params.row.customerCode;
                this.formValidate.customerName= params.row.customerName;
                this.formValidate.customerMobile= params.row.customerMobile;
                this.formValidate.orderStatus= params.row.orderStatus=="未预约"?"0":"1";
                this.formValidate.createTime= params.row.createTime;
                this.formValidate.orderRemark= params.row.orderRemark;
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