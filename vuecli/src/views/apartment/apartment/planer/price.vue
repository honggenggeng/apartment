<template>
  <div class="operation" id="route">

    <div v-if="showcom" class="wrap">
      <Row type="flex" justify="space-between" style="padding-bottom:10px;">
        <Col>
        <Button type="ghost" :disabled="power" @click='addRoute' style="margin-right:20px;">新建</Button>
        <Button type="ghost" :disabled="power" @click='removeRoute' style="margin-right:20px;">
          删除
        </Button>
        <!-- <Button type="ghost" :disabled="power">
          复制
        </Button> -->
        </Col>
        <Col>
        <span>开始时间：</span>
        <DatePicker type="date" v-model="startDate" placeholder="选择时间"></DatePicker>
        <span>结束时间：</span>
        <DatePicker type="date" v-model="endDate" placeholder="选择时间"></DatePicker>
        <Select v-model="searchType" style="width:100px">
          <Option v-for="item in searchTypeList" :value="item.key" :key="item.key">{{ item.title }}</Option>
        </Select>
        <Input v-if="searchType != 'isEnable'" v-model="searchValue" placeholder="请输入搜索的内容" style="width: 200px"></Input>
        <Select v-if="searchType == 'isEnable'" v-model="searchIsEnable" style="width:200px">
          <Option :value="0">启用</Option>
          <Option :value="1">禁用</Option>
        </Select>
        <Button icon="ivu-icon ivu-icon-search" @click="search"></Button>
        </Col>
      </Row>

      <Table border @on-row-dblclick="editRoute" :data="data" :columns="columns"></Table>
      <div style="float:right;margin:10px;">
        <Page :total="total" :page-size='10' @on-change="changePage"></Page>
      </div>

    </div>
    <Form v-else class="wrap" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="120">
      <Row>
       <!-- <Col :xs="24" :lg="12">
        <FormItem label="站点名称" prop="siteUuid">
          <Select v-model="formValidate.siteUuid" @on-change="siteChange">
            <Option v-for="(item,index) in siteList" :key="index" :value="item.uuid">{{item.siteName}}</Option>
          </Select>
        </FormItem>
        </Col>-->
        <!-- <Col :xs="24" :lg="12">
        <FormItem label="路线编号" prop="lineNum">
          <Input disabled v-model="formValidate.lineNum"></Input>
        </FormItem>
        </Col> -->
      </Row>

        <p style="font-size: 20px;">酒店</p>
         <Row>
        <Col :xs="24" :lg="8">
        <FormItem label="时间（天）" prop="lineName">
          <InputNumber style="width:100%" v-model="formValidate.lineName"></InputNumber >
        </FormItem>
        </Col>
         <Col :xs="24" :lg="8">
                <FormItem label="优惠（%）" prop="lineName">
                  <InputNumber style="width:100%"  v-model="formValidate.lineName"></InputNumber >
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
                                        <FormItem label="时间（天）" prop="lineName">
                                          <InputNumber style="width:100%" v-model="formValidate.lineName"></InputNumber >
                                        </FormItem>
                                        </Col>
                                         <Col :xs="24" :lg="8">
                                                <FormItem label="优惠（%）" prop="lineName">
                                                  <InputNumber style="width:100%"  v-model="formValidate.lineName"></InputNumber >
                                                </FormItem>
                                                </Col>
                                                 </Row>
        <!-- <Col :xs="24" :lg="12">
        <FormItem label="状态">
          <RadioGroup v-model="formValidate.isEnable">
            <Radio :label="0">启用</Radio>
            <Radio :label="1">禁用</Radio>
          </RadioGroup>
        </FormItem>
        </Col>-->
      </Row>
      <Row>
           <p style="font-size: 20px;">公寓</p>
             <Row>
           <Col :xs="24" :lg="8">
           <FormItem label="付款方式（月）" prop="lineName">
             <InputNumber style="width:100%" :min="1"  v-model="formValidate.lineName"></InputNumber >
           </FormItem>
           </Col>
            <Col :xs="24" :lg="8">
                   <FormItem label="优惠（%）" prop="lineName">
                     <InputNumber style="width:100%" :min="1"  v-model="formValidate.lineName"></InputNumber >
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
                                                                <FormItem label="付款方式（月）" prop="lineName">
                                                                  <InputNumber style="width:100%"   :min="1" v-model="formValidate.lineName"></InputNumber >
                                                                </FormItem>
                                                                </Col>
                                                                 <Col :xs="24" :lg="8">
                                                                        <FormItem label="优惠（%）" prop="lineName">
                                                                          <InputNumber style="width:100%" :min="1"  v-model="formValidate.lineName"></InputNumber >
                                                                        </FormItem>
                                                                        </Col>
                                                     </Row>
           <!-- <Col :xs="24" :lg="12">
           <FormItem label="状态">
             <RadioGroup v-model="formValidate.isEnable">
               <Radio :label="0">启用</Radio>
               <Radio :label="1">禁用</Radio>
             </RadioGroup>
           </FormItem>
           </Col>-->
         </Row>
     <!-- <Row style="margin-bottom:20px;">
        <Col span="2">
        <Button type="ghost" @click="add">添加新项</Button>
        </Col>
        <Col span="2" >
        <Upload name="file" :show-upload-list='false' :on-success="handleSuccess" :action='$util.ajaxUrl+"/digiops/line/inputExcel"'>
          <Button type="ghost">导入列表</Button>
        </Upload>
        </Col>
      </Row>-->
      <!-- <Table :columns="columns1" :data="data1" border></Table>-->
      <Col :xs="24" :lg="24" style="margin-top:20px;">
      <FormItem   style="text-align: right;">
        <Button type="primary" :disabled="power" @click="handleSubmit('formValidate')" class="save " style="margin-left: 0px;">保存</Button>
        <Button type="ghost" @click="handleReset('formValidate')" class="button " style="margin-left: 8px">取消</Button>
      </FormItem>
      </Col>
    </Form>

  </div>
</template>
<script>
/*import {
  lineAdd,
  lineCode,
  lineList,
  lineUpdate,
  lineId,
  siteSpinner,
  pointSpinner
} from "../../api/index.js";*/
export default {
  data() {
    return {
      searchIsEnable: 0,
      startDate: "",
      endDate: "",
      total: 0,
      siteList: [],
      checkPointList: [],
      searchValue: "",
      searchType: "lineNum",
      searchTypeList: [
        {
          title: "路线编号",
          key: "lineNum"
        },
        {
          title: "路线名称",
          key: "lineName"
        },

        {
          title: "站点名称",
          key: "siteName"
        },
        {
          title: "状态",
          key: "isEnable"
        }
      ],
      showcom: false,
      operationstatus: "add",
      formValidate: {
        lineNum: "",
        lineName: "",
        siteUuid: 0,
        guideline: "",
        isEnable: 0,
        linePointList: ""
      },
      ruleValidate: {
        lineNum: [
          {
            required: true,
            trigger: "blur",
            message: "路线编号为必填项"
          }
        ],
        lineName: [
          {
            required: true,
            message: "路线名称为必填项",
            trigger: "blur"
          }
        ],
        siteUuid: [
          {
            required: true,
            message: "站点名称为必填项",
            trigger: "change"
          }
        ]
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "路线编号",
          key: "lineNum"
        },
        {
          title: "路线名称",
          key: "lineName"
        },

        {
          title: "站点名称",
          key: "siteName"
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true
        },
        {
          title: "状态",
          key: "isEnable"
        }
      ],
      data: [],
      columns1: [
        {
          title: "序号",
          width: 80,
          key: "index",
          type: "index",
          align: "center"
        },
        {
          title: "检查点",
          key: "uuid",
          render: (h, params) => {
            return h(
              "Select",
              {
                props: {
                  value: this.data1[params.index].uuid
                },
                on: {
                  "on-change": event => {
                    this.data1[params.index].uuid = event;
                  }
                }
              },
              this.checkPointList.map(item => {
                return h(
                  "Option",
                  {
                    props: {
                      value: item.uuid
                    }
                  },
                  item.pointName
                );
              })
            );
          }
        },
        {
          title: "操作",
          key: "sopDetailAction",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "default"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.data1.splice(params.index, 1);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "default"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      //this.remove(params.index);
                      if (params.index > 0) {
                        var up = this.data1[params.index];
                        this.data1.splice(params.index, 1);
                        this.data1.splice(params.index - 1, 0, up);
                      }
                    }
                  }
                },
                "上移"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "default"
                  },
                  on: {
                    click: () => {
                      if (params.index < this.data1.length) {
                        var down = this.data1[params.index];
                        this.data1.splice(params.index, 1);
                        this.data1.splice(params.index + 1, 0, down);
                      }
                    }
                  }
                },
                "下移"
              )
            ]);
          }
        }
      ],
      data1: []
    };
  },
  created() {
    this.getformatdata({ pageSize: 10, startPage: 1 });
    siteSpinner().then(res => {
      this.siteList = res.data.data;
    });
  },
  computed: {
    power() {
      return false;
    }
  },
  methods: {
    search() {
      let searchData = {
        pageSize: 10,
        startPage: 1,
        startDate: this.startDate,
        endDate: this.endDate
      };
      if (this.searchType == "isEnable") {
        searchData.isEnable = this.searchIsEnable;
      } else {
        searchData[this.searchType] = this.searchValue;
      }
      if (this.endDate != "" && this.startDate != "") {
        if (this.endDate >= this.startDate) {
          this.getformatdata(searchData);
        } else {
          this.$Message.info("结束时间应大于开始时间");
          this.endDate = "";
        }
      } else {
        this.getformatdata(searchData);
      }
    },
    handleSuccess(res,file){
      this.data1 =res.data
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          console.log(this.data1);
          console.log(this.formValidate.linePointList);
          this.data1.forEach((item, index) => {
            this.formValidate.linePointList += item.uuid + "@" + index + ",";
          });
          this.formValidate.linePointList = this.formValidate.linePointList.substr(
            0,
            this.formValidate.linePointList.length - 1
          );

          console.log(this.formValidate);
          if (this.operationstatus == "add") {
            lineAdd(this.formValidate).then(res => {
              this.getformatdata({ pageSize: 10, startPage: 1 });
            });
          } else {
            lineUpdate(this.formValidate).then(res => {
              this.getformatdata({ pageSize: 10, startPage: 1 });
            });
          }
          this.formValidate = {
            lineNum: "",
            lineName: "",
            siteUuid: 0,
            guideline: "",
            isEnable: 0,
            linePointList: ""
          };
          this.data1 = [];
          this.showcom = true;
          console.log(this.formValidate);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.showcom = true;
      this.$refs[name].resetFields();
      this.data1 = [];
    },
    addRoute: function() {
      this.showcom = false;
      this.operationstatus = "add";
    },
    removeRoute() {},
    changePage() {},
    add() {
      this.data1.push({
        uuid: ""
      });
    },
    editRoute(row, index) {
      lineId(row.uuid).then(res => {
        let lineDetail = res.data.data;
        this.formValidate = {
          lineNum: lineDetail.lineNum,
          lineName: lineDetail.lineName,
          siteUuid: lineDetail.siteUuid,
          guideline: lineDetail.guideline,
          isEnable: lineDetail.isEnable,
          uuid: lineDetail.uuid,
          linePointList: ""
        };
        this.data1 = lineDetail.points;
      });
      this.showcom = false;
      this.operationstatus = "edit";
    },
    siteChange(value) {
      console.log(value);
      if (this.operationstatus == "add") {
        lineCode(value).then(res => {
          console.log(res);
          this.formValidate.lineNum = res.data.data;
        });
      }
      pointSpinner(value).then(res => {
        this.checkPointList = res.data.data;
      });
    },
    getformatdata(data) {
      lineList(data).then(res => {
        console.log(res);
        this.data = res.data.data.records;
        this.total = res.data.data.total;
        this.data.forEach(item => {
          item.createTime = this.$util.formatTime(item.createTime);
          item.isEnable = item.isEnable == 0 ? "启用" : "禁用";
        });
      });
    }
  }
};
</script>
<style>

</style>
