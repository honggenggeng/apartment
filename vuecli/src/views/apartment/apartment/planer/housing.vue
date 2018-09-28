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
                    <Col> <span>房屋名称：</span>
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
                    <FormItem label="房屋名称" prop="catagory">
                        <Input v-model="formValidate.catagory" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="楼栋" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="楼层" prop="name">
                        <InputNumber style="width:100%" v-model="formValidate.site" :min="1" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="类型" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="租金价格" prop="name">
                        <InputNumber style="width:100%" v-model="formValidate.site" :min="1" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="房型" prop="weight">
                        <Input v-model="formValidate.weight" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="面积（㎡）" prop="weight">
                        <InputNumber style="width:100%" v-model="formValidate.site" :min="1" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="状态" prop="name">
                        <Select v-model="model2">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="装修情况" prop="weight">
                        <Input v-model="formValidate.weight" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="朝向" prop="name">
                        <Select v-model="model2">
                            <Option v-for="item in cityLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="阳台" prop="weight">
                        <Select v-model="model2">
                            <Option v-for="item in cityLista" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="窗户" prop="name">
                        <Select v-model="model2">
                            <Option v-for="item in cityLista" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="边户中间户" prop="weight">
                        <RadioGroup v-model="disabledGroup">
                            <Radio label="边户"></Radio>
                            <Radio label="中间户"></Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="描述" prop="weight">
                        <Input v-model="formValidate.weight" type="textarea" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <FormItem label="配套服务" prop="weight">
                        <FormItem v-for="(list,index) in lists">
                            <img src="../../../../images/kjdf.jpg" key="max-logo" />
                            <Checkbox style="float: right;"></Checkbox>
                            <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
                                <Button icon="ios-cloud-upload-outline">Upload files</Button>
                            </Upload>
                            <Input v-model="formValidate.weight"></Input>
                        </FormItem>
                    </FormItem>
                    <p style="text-align: right;">
                        <Button @click="add">
                            添加
                        </Button>
                        <Button class="button" v-on:click="del(index)"> 删除</Button>
                    </p>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <FormItem label="户型配置" prop="weight">
                        <FormItem v-for="(list,index) in listsc">
                            <img src="../../../../images/sdd.jpg" key="max-logo" />
                            <Checkbox style="float: right;"></Checkbox>
                            <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
                                <Button icon="ios-cloud-upload-outline">Upload files</Button>
                            </Upload>
                            <Input v-model="formValidate.weight" placeholder="衣柜" style="    width: 40%;margin-right: 10px;"></Input>
                            <InputNumber v-model="formValidate.weight" :min="1" placeholder="" style="    width: 40%;float: left;margin-right: 10px;"></InputNumber><span>件</span>
                        </FormItem>
                    </FormItem>
                    <p style="text-align: right;">
                        <Button @click="addc">
                            添加
                        </Button>
                        <Button class="button" v-on:click="delc(index)"> 删除</Button>
                    </p>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <FormItem label="图片1" prop="weight">
                        <img src="../../../../images/cou_logo.png" width="100%" key="max-logo" />
                        <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline">Upload files</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="描述1" prop="weight">
                        <Input v-model="formValidate.weight" placeholder="Enter something..."></Input>
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
        let dataArcray=[{
                buildingName: '102',
                buildingAddress: 'BHC中环中心',
                createTime: '3',
                businessCircle: '标准间',
                city: '已出租',
                remark: "服务周到，性价比高",
                brightSpot: '30',
                codeConduct: '两室一厅',
                serviceFacility: '中餐、免费停车场'
            }]
        for (var i = 0; i < dataArcray.length; i++) {            
            let obj={
                buildingName: dataArcray[i].buildingName,
                buildingAddress:  dataArcray[i].buildingAddress,
                createTime:  dataArcray[i].createTime,
                businessCircle:  dataArcray[i].businessCircle,
                city:  dataArcray[i].city,
                remark:  dataArcray[i].remark,
                brightSpot:  dataArcray[i].brightSpot,
                codeConduct:  dataArcray[i].codeConduct,
                serviceFacility:  dataArcray[i].serviceFacility
            }
            this.tableData1.push(obj);
        }
    },
    data() {
        return {
            lists: [{

                tel: "qwe"
            }],
            listsc: [{

                tel: "qwe"
            }],
            modal1: false,
            modal2: false,
            tableData1: this.mockTableData1,
            showcom: true,
            ok: false,

            disabledGroup: '中间户',
            selection: "",
            formValidate: {
                catagory: '',
                name: '',
                site: '',
                weight: '',
                status: 'male',
            },
            cityLists: [{
                value: '1',
                label: '东'
            }, {
                value: '2',
                label: '南'
            }, {
                value: '4',
                label: '北'
            }, {
                value: '0',
                label: '西'
            }],
            cityList: [{
                value: '1',
                label: '已出租'
            }, {
                value: '0',
                label: '未出租'
            }],
            cityLista: [{
                value: '1',
                label: '有'
            }, {
                value: '0',
                label: '无'
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
                {
                    title: "类型",
                    key: "codeConduct"
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 150,
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
                                            this.aa()
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
        aa: function() {
            this.ok = true;
            this.showcom = false;
        },
        changePage() {
            // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server 页数改变请求数据
            this.tableData1 = this.mockTableData1();
        },
        add: function() {
            let cope = {

                tel: ""
            }
            this.lists.push(cope);
            console.log(this.lists)
        },
        del: function(index) {

            this.lists.splice(index, 1);

        },
        addc: function() {
            let cope = {

                tel: ""
            }
            this.listsc.push(cope);
            console.log(this.listsc)
        },
        delc: function(index) {

            this.listsc.splice(index, 1);

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