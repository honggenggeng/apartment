<template>
  <div class="operation" id="ccc">

    <div v-if="showcom" class="wrap">
      <Row style="margin-bottom:10px;" type="flex" justify="space-between">
        <Col>
        <Button type="ghost" @click='addAudit' style="margin-right:20px;">新建</Button>
        <Button type="ghost" @click='removeAudit'>
          删除
        </Button>
        </Col>
        <Col>
        <span>开始时间：</span>
        <DatePicker type="date" v-model="startDate"  placeholder="选择时间"></DatePicker>
        <span>结束时间：</span>
        <DatePicker type="date" v-model="endDate"  placeholder="选择时间"></DatePicker>
        <Select v-model="searchType" style="width:100px">
          <Option v-for="item in searchTypeList" :value="item.key" :key="item.key">{{ item.title }}</Option>
        </Select>
        <Input v-if="searchType != 'isEnable'" v-model="searchValue"   placeholder="请输入搜索的内容" style="width: 200px"></Input>
        <Select v-if="searchType == 'isEnable'" v-model="searchIsEnable"  style="width:200px">
          <Option  :value="0" >启用</Option>
          <Option  :value="1" >禁用</Option>
        </Select>
        <Button icon="ivu-icon ivu-icon-search" @click="search"></Button>
        </Col>
      </Row>
      <Table border @on-select="onSelect" @on-row-dblclick="editAudit" :data="tableData" :columns="columns"></Table>
      <div style="float:right;margin:10px">
        <Page :total="total" :page-size='10' @on-change="onChange"></Page>
      </div>
    </div>
    <Form v-else class="wrap" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
      <Row>
        <Col :xs="24" :lg="12">
        <FormItem label="站点名称" prop="siteUuid">
          <Select v-model="formValidate.siteUuid" @on-change="siteChange">
            <Option v-for="(item,index) in siteList" :key="index" :value="item.uuid">{{item.siteName}}</Option>
          </Select>
        </FormItem>
        </Col>
        <!-- <Col :xs="24" :lg="12">
        <FormItem label="审计编号" prop="auditNum">
          <Input disabled v-model="formValidate.auditNum"></Input>
        </FormItem>
        </Col> -->
      </Row>
      <Row>

        <Col :xs="24" :lg="12">
        <FormItem label="审计名称" prop="auditName">
          <Input v-model="formValidate.auditName"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :lg="12">
        <FormItem label="权重" prop="auditWeight">
          <Input v-model="formValidate.auditWeight" placeholder="请输入数字">
          <span slot="append">%</span>
          </Input>
        </FormItem>
        </Col>
      </Row>
      <!-- <Row>
        <Col :xs="24" :lg="12">
        <FormItem label="状态" prop="isEnable">
          <RadioGroup v-model="formValidate.isEnable">
            <Radio :label="0">启用</Radio>
            <Radio :label="1">禁用</Radio>
          </RadioGroup>
        </FormItem>
        </Col>
      </Row> -->
      <Row style="margin-bottom:20px;">
          <Col span="2">
        <Button type="ghost" @click="add">添加新项</Button>
        </Col>
        <Col span="2">
        <Upload name="file" :on-success="handleSuccess" :action='$util.ajaxUrl+"/digiops/sop/inputExcel"'>
          <Button type="ghost">导入列表</Button>
        </Upload>
        </Col>
      </Row>
      <Table :columns="auditColumns" :data="data" :border="true"></Table>
      <Modal v-model="modal" title="Common Modal dialog box title" @on-ok="saveOption" @on-cancel="cancel">
        <Button type="primary" @click="addOption">添加</Button>
        <Row v-for="(item,index) in optionList" :key="index" style="margin:5px 0">
          <Col span="20" class-name="optionStyleBtn">
          <Input v-model="item.value"></Input>
          </Col>
          <Col span="2" style="margin-left:10px;">
          <Button @click="delOption(index)">删除</Button>
          </Col>
        </Row>
      </Modal>
      <Col :xs="24" :lg="12" style="margin-top:20px;">
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')" class="save " style="margin-left: 0px;">保存</Button>
        <Button type="ghost" @click="handleReset('formValidate')" class="button " style="margin-left: 8px">取消</Button>
      </FormItem>
      </Col>
    </Form>
  </div>
</template>
<script>
import {
  auditAdd,
  auditCode,
  auditList,
  auditUpdate,
  auditId,
  siteSpinner
} from "../../api/index.js";
export default {
  data() {
    const validateMobile = (rule, value, callback) => {
               console.log(value)
                if ((value+'').match(/^([1-9][0-9]{0,1}|100)$/)) {
                    callback();
                } else {
                    callback(new Error('1到100整数'));
                }
            }
    return {
      searchIsEnable:0,
      startDate: "",
      endDate: "",
      operationstatus: "add",
      optionList: [],
      auditColumns: [
        {
          title: "序号",
          width: 80,
          align: "center",
          type: "index"
        },
        {
          title: "审计名称",
          key: "title",
          render: (h, params) => {
            return h("Input", {
              props: {
                type: "text",
                value: this.data[params.index].title //此处如何让数据双向绑定
              },
              on: {
                "on-blur": event => {
                  this.data[params.index].title = event.target.value;
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "sopDetailAction",
          align: "center",
          width: "500",
          render: (h, params) => {
            return h("div", [
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
                      this.activeindex = params.index;
                      this.modal = true;
                      if (typeof this.data[params.index].content == "string") {
                        this.optionList = JSON.parse(
                          this.data[params.index].content
                        );
                      } else {
                        this.optionList = this.data[params.index].content;
                      }
                    }
                  }
                },
                "设置"
              ),
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
                      this.data.splice(params.index, 1);
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
                        var up = this.data[params.index];
                        this.data.splice(params.index, 1);
                        this.data.splice(params.index - 1, 0, up);
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
                      if (params.index < this.data.length) {
                        var down = this.data[params.index];
                        this.data.splice(params.index, 1);
                        this.data.splice(params.index + 1, 0, down);
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
      data: [ { title: 2, content: [] }],
      modal: false,
      total: 0,
      searchValue: "",
      searchType: "auditNum",
      searchTypeList: [
        {
          title: "审计编号",
          key: "auditNum"
        },
        {
          title: "审计名称",
          key: "auditName"
        },
        {
          title: "站点名称",
          key: "siteName"
        }
      ],
      selection: [],
      siteList: [],
      optionList: [],
      showcom: true,
      activeindex: 0,
      formValidate: {
        auditNum: "",
        auditName: "",
        siteUuid: "",
        auditWeight: "",
        isEnable: 0
      },
      ruleValidate: {
        auditNum: [
          {
            required: false,
            trigger: "change"
          }
        ],
        auditName: [
          {
            required: true,
            message: "名称为必填项",
            trigger: "change"
          }
        ],
        siteUuid: [
          {
            required: true,
            message: "站点为必填项",
            trigger: "change"
          }
        ],
        auditWeight: [
          {
            required: true,
            message: "权重为必填项",
            trigger: "change",
            type: "number"
          },
          {
            validator: validateMobile,
            trigger: "blur"
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
          title: "审计编号",
          key: "auditNum"
        },
        {
          title: "审计名称",
          key: "auditName"
        },
        {
          title: "权重",
          key: "auditWeight"
        },
        {
          title: "站点名称",
          key: "siteName"
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true
        }
        // {
        //   title: "状态",
        //   key: "isEnable",
        //   sortable: true
        // }
      ],
      tableData: []
    };
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
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          this.data.forEach((item, index) => {
            item.seq = index;
          });
          this.formValidate.auditTemplate = JSON.stringify(this.data);
          console.log(this.formValidate);

          if (this.operationisEnable == "add") {
            auditAdd(this.formValidate).then(res => {
              this.getformatdata({ pageSize: 10, startPage: 1 });
              
            });
          } else {
            auditUpdate(this.formValidate).then(res => {
              this.getformatdata({ pageSize: 10, startPage: 1 });
            });
          }
          
          this.showcom = true;
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleSuccess(res,file){

    },
    handleReset(name) {
      
      this.showcom = true;
      this.$refs[name].resetFields();
      this.data = [];
    },
    addAudit: function() {
      this.formValidate = {
                auditNum: "",
                auditName: "",
                siteUuid: "",
                auditWeight: "",
                isEnable: 0
              };
              this.data = [];
      this.showcom = false;
      this.operationisEnable = "add";
    },
    add() {
      this.data.push({
        title: 2,
        content: []
      });
    },
    changepage(index) {},
    addOption() {
      console.log(this.optionList);
      this.optionList.push({
        value: ""
      });
    },
    delOption(index) {
      this.optionList.splice(index, 1);
    },
    saveOption() {
      this.data[this.activeindex].content = this.optionList;
      this.optionList = [];
      console.log(this.data);
    },
    cancel() {},
    editAudit(row, index) {
      auditId(row.uuid).then(res => {
        let auditDetail = res.data.data;
        this.formValidate = {
          siteUuid: auditDetail.siteUuid,
          auditNum: auditDetail.auditNum,
          auditName: auditDetail.auditName,
          auditWeight: auditDetail.auditWeight,
          isEnable: auditDetail.isEnable,
          uuid: auditDetail.uuid
        };
        this.data = auditDetail.templates;
        console.log(this.data);
      });
      this.showcom = false;
      this.operationisEnable = "edit";
    },
    onSelect(selection, row) {
      this.selection = selection;
    },
    removeAudit(){

    },
    onChange(startPage) {
      this.getformatdata({ pageSize: 10, startPage: startPage });
    },

    siteChange(value) {
      if (this.operationisEnable == "add") {
        auditCode(value).then(res => {
          this.formValidate.auditNum = res.data.data;
        });
      }
    },
    getformatdata(data) {
      auditList(data).then(res => {
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
        this.tableData.forEach(item => {
          item.createTime = this.$util.formatTime(item.createTime);
          item.isEnable = item.isEnable == 0 ? "启用" : "禁用";
        });
      });
    }
  },
  created() {
    this.getformatdata({ pageSize: 10, startPage: 1 });
    siteSpinner().then(res => {
      this.siteList = res.data.data;
    });
  }
};
</script>
<style scoped>
</style>
