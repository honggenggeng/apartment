<template>
  <div class="operation" id="bb">
    <div v-if='showcom' class="wrap">
      <Row type="flex" justify="space-between" style="padding-bottom:10px;">
        <Col>
        <Button type="ghost" @click="addWork" style="margin-right:10px;">新建</Button>
        <Button type="ghost" @click="closeWork" style="margin-right:10px;">关闭</Button>
        </Col>
        <Col>
        <span>开始时间：</span>
        <DatePicker type="date" v-model="startDate" placeholder="选择时间"></DatePicker>
        <span>结束时间：</span>
        <DatePicker type="date" v-model="endDate" placeholder="选择时间"></DatePicker>
        </Col>
      </Row>
      <Row style="margin-bottom:10px;" type="flex" justify="end">
        <Col style="margin-right:5px;"> 编号：
        <Input v-model="workOrderNum" placeholder="请输入" style="width:auto;" />
        </Col>
        <Col style="margin-right:5px;"> 工单名称：
        <Input v-model="workOrderName" placeholder="请输入" style="width:auto;" />
        </Col>
        <Col style="margin-right:5px;"> 优先级：
        <Select v-model="priority" style="width:100px">
          <Option :value="0">低</Option>
          <Option :value="1">中</Option>
          <Option :value="2">高</Option>
        </Select>
        </Col>
        <Col style="margin-right:5px;"> 站点名称：
        <Input v-model="siteName" placeholder="请输入" style="width:auto;" />
        </Col>
        <Col style="margin-right:5px;"> 类型：
        <Select v-model="workOrderType" style="width:100px">
          <Option :value="0">巡检</Option>
          <Option :value="1">交接班</Option>
          <Option :value="2">审计</Option>
        </Select>
        </Col>
        <Col style="margin-right:5px;"> 执行人：
        <Input v-model="userName" placeholder="请输入" style="width:auto;" />
        </Col>
        <Col style="margin-right:5px;"> 工单状态：
        <Select v-model="executeState" style="width:80px">
          <Option :value="0">未开始</Option>
          <Option :value="1">执行中</Option>
          <Option :value="2">已完成</Option>
          <Option :value="3">拒绝</Option>
        </Select>
        </Col>
        <Col style="margin-right:5px;"> 状态：
        <Select v-model="state" style="width:80px">
          <Option :value="0">启用</Option>
          <Option :value="1">关闭</Option>
        </Select>
        </Col>
        <Col style="margin-right:5px;">
        <Button icon="ivu-icon ivu-icon-search" @click="search"></Button>
        </Col>
      </Row>
      <!-- <Row style="margin-bottom:10px;" type="flex" justify="end">
       <Col style="margin-right:5px;">
        编号：<Input v-model="startDate" placeholder="请输入" style="width:auto;" />
       </Col>
       <Col style="margin-right:5px;">
        工单名称：<Input v-model="startDate" placeholder="请输入"  style="width:auto;"/>
       </Col>
       <Col style="margin-right:5px;">
        优先级：<Input v-model="startDate" placeholder="请输入"  style="width:auto;"/>
       </Col>
       <Col style="margin-right:5px;">
        站点名称：<Input v-model="startDate" placeholder="请输入"  style="width:auto;"/>
       </Col>
       <Col style="margin-right:5px;">
        类型：<Input v-model="startDate" placeholder="请输入"  style="width:auto;"/>
       </Col>
       <Col style="margin-right:5px;">
        发送给：<Input v-model="startDate" placeholder="请输入"  style="width:auto;"/>
       </Col>
       
        <Col style="margin-right:5px;">
        <Select  v-model="searchIsEnable" >
          <Option  :value="0" >启用</Option>
          <Option  :value="1" >禁用</Option>
        </Select>
        </Col>
        <Col style="margin-right:5px;">
        <Button icon="ivu-icon ivu-icon-search" @click="search"></Button>
        </Col>
			</Row> -->

      <Table border ref="selection" @on-select="onSelect" :columns="columns4" @on-row-dblclick="editWork" :data="data1"></Table>

      <Page :total="total" style="float:right;margin-top:10px;" />

    </div>

    <Form v-else class="wrap" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">

      <Row>
        <Col :xs="24" :lg="12">
        <FormItem label="工单编号" >
          <Input disabled  v-model="formValidate.workOrderNum"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :lg="12">
        <FormItem label="名称">
          <Input disabled v-model="formValidate.workOrderName"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :lg="12">
        <FormItem label="优先级">
          <Input  disabled v-model="formValidate.priority"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :lg="12">
        <FormItem label="工单类型">
          <Input  disabled v-model="formValidate.workOrderType"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :lg="12">
        <FormItem label="发送对象">
          <Input  disabled v-model="formValidate.userName"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :lg="12">
        <FormItem label="站点">
          <Input disabled  v-model="formValidate.siteName"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :lg="12">
        <Col span="12">
        <FormItem label="建议开始时间">
          <Input  disabled v-model="formValidate.proposalStartTime"></Input>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="建议结束时间">
          <Input  disabled v-model="formValidate.proposalEndTime"></Input>
        </FormItem>
        </Col>
        </Col>
        <Col :xs="24" :lg="12">
        <Col span="12">
        <FormItem label="实际开始时间">
          <Input  disabled v-model="formValidate.stardate"></Input>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="实际开始时间">
          <Input  disabled v-model="formValidate.Enddate"></Input>
        </FormItem>
        </Col>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :lg="12">
        <FormItem label="任务计划">
          <Input  disabled v-model="formValidate.schedule"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :lg="12">
        <FormItem label="工单状态">
          <Input  disabled v-model="formValidate.executeState"></Input>
        </FormItem>
        </Col>

      </Row>
      <Row>
        <Col :xs="24" :lg="12">
        <FormItem label="注意事项">
          <Input  disabled v-model="formValidate.matter" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :lg="12">
        <FormItem label="备注">
          <Input  disabled v-model="formValidate.Remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :xs="24" :lg="12">
        <FormItem label="任务说明">
          <Input disabled  v-model="formValidate.Task" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
        </FormItem>
        </Col>
        <!-- <Col :xs="24" :lg="12">
        <FormItem label="状态">
          <RadioGroup v-model="formValidate.status">
            <Radio :label="0">启用</Radio>
            <Radio :label="1">禁用 </Radio>
          </RadioGroup>
        </FormItem>
        </Col> -->
      </Row>
      <Row>
        <Table border ref="selection" :columns="columns" :data="data"></Table>
        <div>
          <Page :total="10" :page-size="5" style="float:right;margin-top:10px;"></Page>
        </div>
      </Row>
      <Col :xs="24" :lg="12">
      <FormItem>
        <!-- <Button type="primary" :disabled="power" @click="handleSubmit('formValidate')" class="save " style="margin-left: 0px;">保存</Button> -->
        <Button type="ghost" @click="handleReset('formValidate')" >返回</Button>
      </FormItem>
      </Col>
    </Form>
    <Modal
        v-model="modal"
        title="确认关闭工单"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>关闭后不能开启</p>
    </Modal>
  </div>
</template>

<script>
import { workOrderList } from "../../api/index.js";
export default {
  data() {
    return {
      modal:false,
      searchIsEnable: 2,
      startDate: "",
      endDate: "",
      showcom: true,
      total:10,
        workOrderNum: "",
        workOrderName: "",
        priority: "",
        siteName: "",
        workOrderType: "",
        userName: "",
        executeState: "",
        state: "",
      formValidate: {
        workOrderNum: "sdfgsdfg",
        workOrderName: "",
        priority: "",
        siteName: "",
        workOrderType: "",
        userName: "",
        executeState: "",
        state: ""
      },
      ruleValidate: {},
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "分类/检查点",
          key: "type"
        },
        {
          title: "SOP",
          key: "SOP"
        },
        {
          title: "是否正常 ",
          key: "normal"
        },
        {
          title: "描述",
          key: "describe"
        },
        {
          title: "图片",
          key: "headimg",
          render: (h, params) => {
            console.log(params.row);
            return h(
              "div",
              {
                attrs: {
                  style: "height: 40px;"
                }
              },
              this.data[params.index].picList.map(item => {
                return h("img", {
                  attrs: {
                    src: item,
                    style: "width: 40px;height: 40px;border-radius: 2px;"
                  }
                });
              })
              // [
              //     h('img', {
              //       props: {
              //         type: 'primary'
              //       },
              //       attrs: {
              //         src: require("../../../../images/logo-min_bak.jpg"), style: 'width: 40px;height: 40px;border-radius: 2px;'
              //       },
              //       style: {
              //       },
              //     })
              //   ]
            );
          }
        }
      ],

      data: [
        {
          type: "checkPoint1",
          SOP: "AC001001",
          normal: "是",
          describe: "门窗未关",
          picList: [
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"
          ]
        },
        {
          type: "checkPoint1",
          SOP: "AC001001",
          normal: "是",
          describe: "门窗未关",
          picList: [
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"
          ]
        },
        {
          type: "checkPoint1",
          SOP: "AC001001",
          normal: "是",
          describe: "门窗未关",
          picList: [
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"
          ]
        },
        {
          type: "checkPoint1",
          SOP: "AC001001",
          normal: "是",
          describe: "门窗未关",
          picList: [
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"
          ]
        },
        {
          type: "checkPoint1",
          SOP: "AC001001",
          normal: "是",
          describe: "门窗未关",
          picList: [
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"
          ]
        },
        {
          type: "checkPoint1",
          SOP: "AC001001",
          normal: "是",
          describe: "门窗未关",
          picList: [
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"
          ]
        },
        {
          type: "checkPoint1",
          SOP: "AC001001",
          normal: "是",
          describe: "门窗未关",
          picList: [
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"
          ]
        },
        {
          type: "checkPoint1",
          SOP: "AC001001",
          normal: "是",
          describe: "门窗未关",
          picList: [
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"
          ]
        },
        {
          type: "checkPoint1",
          SOP: "AC001001",
          normal: "是",
          describe: "门窗未关",
          picList: [
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"
          ]
        },
        {
          type: "checkPoint1",
          SOP: "AC001001",
          normal: "是",
          describe: "门窗未关",
          picList: [
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"
          ]
        },
        {
          type: "checkPoint1",
          SOP: "AC001001",
          normal: "是",
          describe: "门窗未关",
          picList: [
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg"
          ]
        }
      ],
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "工单编号",
          key: "workOrderNum"
        },
        {
          title: "名称",
          key: "workOrderName"
        },
        {
          title: "优先级",
          key: "priority"
        },
        {
          title: "站点名称",
          key: "siteName"
        },
        {
          title: "类型",
          key: "workOrderType"
        },
        {
          title: "发送对象",
          key: "userName"
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "工单状态",
          key: "executeState"
        },
        {
          title: "状态",
          key: "state"
        }
      ],
      data1: []
    };
  },
  created() {
    this.getformatdata({startPage:1,pageSize:10});
  },
  methods: {
    search() {
      let searchData = {
        pageSize: 10,
        startPage: 1,
        startDate: this.startDate,
        endDate: this.endDate,
        workOrderNum: this.workOrderNum,
        workOrderName: this.workOrderName,
        priority: this.priority,
        siteName: this.siteName,
        workOrderType: this.workOrderType,
        userName: this.userName,
        executeState: this.executeState,
        state: this.state
      };
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
    onSelect(selection, row) {
      console.log(selection);
    },
    addWork() {
      this.$router.push({
        name: "soptTask"
      });
    },
    editWork() {
      this.showcom = false;
      this.formValidate ={
        workOrderNum: "sdfgsdfg",
        workOrderName: "",
        priority: "",
        siteName: "",
        workOrderType: "",
        userName: "",
        executeState: "",
        state: ""
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          this.showcom = true;
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.showcom = true;
    },
    closeWork() {
      this.modal = true
    },
    ok(){

    },
    cancel(){

    },
    getformatdata(data){
      workOrderList(data).then(res => {
      this.data1 = res.data.data.records;
      this.total = res.data.data.total;
      this.data1.forEach(item => {
        item.priority =
          item.priority == 0 ? "低" : item.priority == 1 ? "中" : "高";
        item.workOrderType =
          item.workOrderType == 0
            ? "巡检"
            : item.workOrderType == 1
              ? "交接班"
              : item.workOrderType == 2 ? "审计" : "临时任务";
        item.executeState =
          item.executeState == 0
            ? "未开始"
            : item.executeState == 1
              ? "执行中"
              : item.executeState == 2 ? "已完成" : "拒绝";
        item.state = item.state == 0 ? "启用" : "关闭";
        item.createTime = this.$util.formatTime(item.createTime);
      });
    });
    }
  }
};
</script>
<style scoped>
</style>