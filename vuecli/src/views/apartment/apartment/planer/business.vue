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
                    <Col> <span>商圈名称：</span>
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
                    <FormItem label="所在城市" prop="catagory">
                        <Select v-model="formValidate.city">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="商圈名称" prop="name">
                        <Input v-model="formValidate.districtName" placeholder="Enter something..."></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="商圈描述">
                        <Input v-model="formValidate.districtRemark" type="textarea" placeholder="Enter something..."></Input>
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
                id:'001',
                city: '南京',
                districtName: 'BHC中环中心',
                districtRemark: '地处北蔡御桥商贸圈,地处前滩、迪士尼、自贸区三区辐射中心位置,距自贸区约20公里',
                
            }]
    for (var i = 0; i < dataArray.length; i++) {
      let obj={
        id:dataArray[i].id,
        city:dataArray[i].city,
        districtName:dataArray[i].districtName,
        districtRemark:dataArray[i].districtRemark,
          
      }
      this.tableData1.push(obj);
    }
  },
    data() {
        return {
            lists: [{

                tel: "qwe"
            }],
            modal1: false,
            modal2: false,
            tableData1: this.mockTableData1,
            showcom: true,
            ok: false,
            selection: "",
            formValidate: {
                id:'',
                city: '',
                districtName: '',
                districtRemark: '',               
            },
            cityList: [{
                value: '1',
                label: '南京'
            }, {
                value: '0',
                label: '上海'
            }],
            ruleValidate: {
                city: [{
                    required: true,
                    message: '此项为必填项',
                    trigger: 'change'
                }],
                districtName: [{
                    required: true,
                    message: '此项为必填项',
                    trigger: 'change'
                }],
                districtRemark: [{
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
                    title: "商圈所在城市",
                    key: "city"
                },
                {
                    title: "商圈名称",
                    key: "districtName"
                },
                {
                    title: "商圈描述",
                    key: "districtRemark",
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
          console.log(params.row);
          
          if (params.row==undefined) {
            this.formValidate.id="";
            this.formValidate.city="";
            this.formValidate.districtName="";
            this.formValidate.districtRemark=""; 
          } else {
            this.formValidate.id=params.row.id;
            this.formValidate.city=params.row.city=="南京"?"0":"1";
            this.formValidate.districtName=params.row.districtName;
            this.formValidate.districtRemark=params.row.districtRemark; 
          }
                     
          this.ok = true;
          this.showcom = false;
        },
        changePage() {
            // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
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
            console.log(this.lists)
        },
        handleAdd() {
            this.data2.push({
                catagory: 'AC001001',
                name: '审查_通用',
                index: this.index,
                weight: '50%',
                site: 'Aden',
                Creationtime: '2016-10-03'
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