<template>
    <div class="operation" id="ccc">
        <col span="24">
        <div v-if="housing">
            <div class="operation_mode">
                <Row type="flex" justify="space-between" style="padding-bottom:10px;">
                    <Col>
                    </Col>
                    <Col> <span>房屋名称：</span>
                    <Input v-model="value4" placeholder="请输入搜索的内容" class="inpnut" style="width: 200px"></Input>
                    <Button icon="ivu-icon ivu-icon-search" @click="search"></Button>
                    </Col>
                </Row>
            </div>
            <Table border @on-selection-change="onSelect" @on-select-all="onSelectAll" :data="tableData2" :columns="columns2" stripe></Table>
            <div class="page">
                <Page :total="total" :current="current" show-sizer @on-change="changePage"></Page>
            </div>
        </div>
        </col>
        <Col span="24">
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
                    <Col> <span>名称：</span>
                    <Input v-model="value4" placeholder="请输入搜索的内容" class="inpnut" style="width: 200px"></Input>
                    <Button icon="ivu-icon ivu-icon-search" @click="search"></Button>
                    </Col>
                </Row>
            </div>
            <Table border @on-selection-change="onSelect" @on-select-all="onSelectAll" :data="tableData1" :columns="columns4" stripe></Table>
            <Button class="button" @click="goBack" style="    margin: 10px;"> 返回</Button>
            <div class="page">
                <Page :total="10" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
        </col>
        <Col span="24">
        <div style="padding: 30px 10px;">
            <Form v-if="ok" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
                <Row>
                  <Row>
                    <Col span="12">
                    <FormItem label="房屋号" prop="apartmentCode">
                        <InputNumber v-model="formValidate.apartmentCode" style="width:100%" :min="1" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="名称" prop="facilityName">
                        <Select v-model="formValidate.facilityName">
                            <Option v-for="item in facilityLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>  
                    
                    <Col span="12">
                    <FormItem label="数量 " prop="facilityCount">
                        <InputNumber v-model="formValidate.facilityCount" style="width:100%" :min="1" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="价格" prop="facilityPrice">
                        <InputNumber v-model="formValidate.facilityPrice" style="width:100%" :min="1" placeholder="Enter something..."></InputNumber>
                    </FormItem>
                    </Col>
                </Row>
                <Row>                    
                    <Col span="12">
                    <FormItem label="备注" prop="facilityRemark">
                        <Input v-model="formValidate.facilityRemark" placeholder="Enter something..."></Input>
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
        let item={
            pange:1,
            pageSize:10
        }
        this.initTableData2(item);        
    },
    data() {
        return {
            modal1: false,
            modal2: false,
            tableData1: this.mockTableData1,
            tableData2: this.mockTableData2,
            showcom: false,
            housing: true,
            ok: false,
            selection: "",
            total:"",
            current:"",
            formValidate: {
              facilityCode:'',
              facilityName: '',
              facilityCount: '',
              facilityPrice: '',              
              apartmentCode: '',
              facilityRemark:'' 
            },
            facilityLists: [{
                    value: '0',
                    label: '床'
                },
                {
                    value: '1',
                    label: "桌子"
                },
                {
                    value: '2',
                    label: "椅子"
                }
            ],
            ruleValidate: {
                apartmentCode: [{
                    required: true,
                    message: '此项为必填项',
                    trigger: 'change'
                }],
                facilityName: [{
                    required: true,
                    message: '此项为必填项',
                    trigger: 'change'
                }],
                facilityCount: [{
                    required: false,
                    message: '此项为必填项',
                    trigger: 'change'
                }],
                facilityPrice: [{
                    required: false,
                    message: '此项为必填项',
                    trigger: 'change'
                }],
               
            },
            columns2: [{
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: "房屋名称",
                    key: "apartmentName"
                },
                {
                    title: "楼栋",
                    key: "buildingCode"
                },
                {
                    title: "楼层",
                    key: "floorCode",

                },
                {
                    title: "状态",
                    key: "apartmentStatus"
                },
                {
                    title: "备注",
                    key: "apartmentRemark"
                },
                {
                    title: "房型",
                    key: "apartmentTypeCode"
                },
                {
                    title: "面积（㎡）",
                    key: "apartmentArea"
                },
                /*
                {
                  title: "服务设施",
                  key: "serviceFacility"
                }, */
                {
                    title: "类型",
                    key: "apartmentStatusCode"
                },
                {
                  title: '操作',
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
                                this.initTableData1(params);                                
                                this.showcom = true;
                                this.housing = false
                              }
                          }

                        },
                        "操作"),
                    ]);
                  },
            }],
            columns4: [{
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: "房屋号",
                    key: "apartmentCode"
                },
                {
                    title: "名称",
                    key: "facilityName"
                },
                {
                    title: "数量",
                    key: "facilityCount"
                },
                {
                    title: "价格（件/元）",
                    key: "facilityPrice"

                },                
                {
                    title: "备注",
                    key: "facilityRemark"
                },
                {
                    title: '操作',
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
                                    padding: "6px 11px",
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
                                  padding: "6px 11px",
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
            tableData2: [],
        }
    },
    methods: {
        initTableData2(val){
            let me = this
            this.axios.post('/site/apartment/pageApartment', {
                "pageNo":val.pageNo,
                "pageSize":val.pageSize
            },function(data){
                console.log(data);
                if (data.code=="000000") {                    
                    me.total=data.data.count;
                    me.current=data.data.pageNo;
                    for (var i = 0; i < data.data.data.length; i++) {
                    
                        let obj ={
                          apartmentCode:data.data.data[i].apartment_code,
                          apartmentName:data.data.data[i].apartment_name,
                          buildingCode: data.data.data[i].building_code,
                          floorCode: data.data.data[i].floor_code,
                          apartmentTypeCode: data.data.data[i].apartment_type_code,
                          apartmentStatus: data.data.data[i].apartment_status_name,
                          apartmentRemark: data.data.data[i].apartment_remark,
                          apartmentArea: data.data.data[i].apartment_area,
                          apartmentStatusCode: data.data.data[i].apartment_status_code, 
                        }

                        me.tableData2.push(obj);
                    }
                } else {
                    alert("失败");
                }
             
            },function(res){
                console.log("版本测试案例2222220000")
                console.log("失败",res)
            })
        },
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
          console.log(params.row)
          if (params.row==undefined) {
            this.formValidate.facilityCode="";
            this.formValidate.facilityName="";
            this.formValidate.facilityCount="";
            this.formValidate.facilityPrice="";            
            this.formValidate.apartmentCode="";
            this.formValidate.facilityRemark="";

          } else {
            this.formValidate.facilityCode=params.row.facilityCode ;
            this.formValidate.facilityName=this.selectItem(params.row.facilityName);
            this.formValidate.facilityCount=params.row.facilityCount ;
            this.formValidate.facilityPrice=params.row.facilityPrice ;           
            this.formValidate.apartmentCode=params.row.apartmentCode ;
            this.formValidate.facilityRemark=params.row.facilityRemark ;
          }
            this.ok = true;
            this.showcom = false;
        },
        selectItem:function(val){
          switch(val) {
              case '床':
                  return '0';
              case '桌子':
                  return '1';              
              default: 
                  return '2';
          }

        },
        goBack: function() {
            this.housing = true;
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
        initTableData1(params){
          console.log(params);
          //有房间code由ajax获取房间设备表格数据
          // let dataArray=[{
          //       facilityCode:'0001',
          //       facilityName: '床',
          //       facilityCount: '1',
          //       facilityPrice: '2500',                
          //       apartmentCode: '1102',
          //       facilityRemark: '百联东郊东效购物中心',
                
          //   },{
          //       facilityCode:'0001',
          //       facilityName: '桌子',
          //       facilityCount: '2',
          //       facilityPrice: '100',                
          //       apartmentCode: '1102',
          //       facilityRemark: '百联东郊东效购物中心',
                
          //   }]
          //   for (var i = 0; i < dataArray.length; i++) {
              
          //     let obj={
          //       facilityCode:dataArray[i].facilityCode ,
          //       facilityName: dataArray[i].facilityName ,
          //       facilityCount: dataArray[i].facilityCount ,
          //       facilityPrice: dataArray[i].facilityPrice ,                
          //       apartmentCode: dataArray[i].apartmentCode ,
          //       facilityRemark:dataArray[i].facilityRemark ,
          //     }
          //     this.tableData1.push(obj);

          //   }

            let me = this;
            let obj={
               apartment_code:params.row.apartmentCode,
               facility_code:params.row.apartmentName
            }
            this.axios.post('/site/facility/getApartmentFacility',obj,function(data){
                console.log(data);
                if (data.code=="000000") {
                    
                    me.total=data.data.count;
                    me.current=data.data.pageNo;
                    
                } else {
                    alert("失败");
                }
             
            },function(res){
                console.log("失败",res)
            })
        }
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