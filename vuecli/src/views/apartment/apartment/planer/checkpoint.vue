<template>
  <div class="operation" id="bb">
    <div v-if='showcom' class="wrap">
      <Row type="flex" justify="space-between" style="margin-bottom:10px;">
        <Col>
        <Button type="ghost" :disabled="power" @click='addPoint' style="margin-right:20px;">新建</Button>
        <Button type="ghost" :disabled="power" @click='removePoint' style="margin-right:20px;">
          删除
        </Button>
        <!-- <Button type="ghost" :disabled="power" @click='copyPoint'>
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
      <Table border ref="selection" @on-select="onSelect" @on-row-dblclick="editPoint" :columns="columns" :data="data"></Table>
      <div style="float:right;margin:10px;">
        <Page :total="total" :page-size='10' @on-change="onChange"></Page>
      </div>
    </div>
    <div v-else class="wrap">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">

        <Row>
          <Col :xs="24" :lg="12">
          <FormItem label="站点" prop="siteUuid">
            <Select v-model="formValidate.siteUuid" @on-change="siteChange">
              <Option v-for="item in siteList" :value="item.uuid" :key="item.siteId">{{ item.siteName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :lg="12">
          <FormItem label="sop编号" prop="sopUuid">
            <Select v-model="formValidate.sopUuid">
              <Option v-for="item in sopList" :value="item.uuid" :key="item.uuid">{{ item.sopNum }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <!-- <Col :xs="24" :lg="12">
          <FormItem label="检查点编码" prop="pointNum">
            <Input disabled v-model="formValidate.pointNum"></Input>
          </FormItem>
          </Col> -->
          <Col :xs="24" :lg="12">
          <FormItem label="检查点名称" prop="pointName">
            <Input v-model="formValidate.pointName"></Input>
          </FormItem>
          </Col>

        </Row>
        <Row>
          <Col :xs="24" :lg="12">
          <FormItem label="二维码标识" prop="qrcode">
            <Input v-model="formValidate.qrcode"></Input>
          </FormItem>
          <Col span="3" offset="1" style="margin-right:40px;">
          <Button @click="createImg">生成图片</Button>
          </Col>
          <Col span="6">
          <img style="width:100%;" :src="qrcodeUrl" alt="">
          </Col>
          </Col>
        </Row>
        <Row>
          <FormItem label="状态" prop="isEnable">
            <RadioGroup v-model="formValidate.isEnable">
              <Radio :label="0">启用</Radio>
              <Radio :label="1">禁用</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Button type="primary" :disabled="power" @click="handleSubmit('formValidate')" class="save " style="margin-left: 0px;">保存</Button>
            <Button type="ghost" @click="handleReset('formValidate')" class="button " style="margin-left: 8px">取消</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>

    </div>
  </div>
</template>

<script>
import {
  pointAdd,
  pointCode,
  pointList,
  pointUpdate,
  pointId,
  siteSpinner,
  sopSpinner,
  pointQrcode
} from "../../api/index.js";
export default {
  data() {
    return {
      searchIsEnable: 0,
      startDate: "",
      endDate: "",
      operationstatus: "add",
      siteList: [],
      sopList: [],
      total: 0,
      showcom: true,
      searchValue: "",
      qrcodeUrl: "",
      searchType: "pointNum",
      searchTypeList: [
        {
          title: "检查点编码",
          key: "pointNum"
        },
        {
          title: "检查点名称",
          key: "pointName"
        },
        {
          title: "站点",
          key: "siteName"
        },
        {
          title: "SOP编码 ",
          key: "sopNum"
        },
        {
          title: "状态",
          key: "isEnable"
        }
      ],
      formValidate: {
        pointNum: "",
        pointName: "",
        sopUuid: "",
        qrcode: "",
        qrcodePicture: "",
        siteUuid: "",
        isEnable: 0
      },
      ruleValidate: {
        pointName: [
          {
            required: true,
            message: "检查点名称为必填项",
            trigger: "change"
          }
        ],
        siteUuid: [
          {
            required: true,
            message: "站点为必填项",
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
          title: "检查点编码",
          key: "pointNum"
        },
        {
          title: "检查点名称",
          key: "pointName"
        },
        {
          title: "站点",
          key: "siteName"
        },
        {
          title: "SOP编码 ",
          key: "sopNum"
        },
        {
          title: "创建时间",
          key: "createTime",
          sortType: "desc"
        },
        {
          title: "状态",
          key: "isEnable"
        }
      ],
      data: []
    };
  },
  created() {
    this.getformatdata({ pageSize: 10, startPage: 1});
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
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          this.showcom = true;
          if (this.operationstatus == "add") {
            console.log(this.formValidate);
            pointAdd(this.formValidate).then(res => {
              this.getformatdata({ pageSize: 10, startPage: 1 });
            });
          } else {
            pointUpdate(this.formValidate).then(res => {
              this.getformatdata({ pageSize: 10, startPage: 1 });
            });
          }
          this.formValidate = {
            pointNum: "",
            pointName: "",
            sopUuid: "",
            qrcode: "",
            qrcodePicture: "",
            siteUuid: "",
            isEnable: 0
          };
          this.qrcodeUrl = "";
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.formValidate = {
        pointNum: "",
        pointName: "",
        sopUuid: "",
        qrcode: "",
        qrcodePicture: "",
        siteUuid: "",
        isEnable: 0
      };
      this.qrcodeUrl = "";
      this.showcom = true;
    },
    handleAdd() {
      this.index++;
      this.formValidate.items.push({
        value: "",
        index: this.index,
        status: 1
      });
    },
    handleRemove(index) {
      this.formValidate.items[index].status = 0;
    },
    addPoint() {
      this.showcom = false;
      this.operationstatus = "add";
    },
    removePoint() {},
    copyPoint() {
      if (this.selection.length == 1) {
      }
    },
    onSelect(selection, row) {
      this.selection = selection;
    },
    editPoint(row, index) {
      pointId(row.uuid).then(res => {
        let pointDetail = res.data.data;
        this.formValidate = {
          pointNum: pointDetail.pointNum,
          pointName: pointDetail.pointName,
          sopUuid: pointDetail.sopUuid,
          qrcode: pointDetail.qrcode,
          qrcodePicture: pointDetail.qrcodePicture,
          siteUuid: pointDetail.siteUuid,
          isEnable: pointDetail.isEnable,
          uuid: pointDetail.uuid
        };
        this.qrcodeUrl =
          this.$util.ajaxUrl + "/digiops" + pointDetail.qrcodePicture;
      });
      this.showcom = false;
      this.operationstatus = "edit";
    },
    createImg() {
      if (this.formValidate.qrcode != "") {
        let oData = new FormData();
        oData.append("code", this.formValidate.qrcode);
        pointQrcode(oData).then(res => {
          this.formValidate.qrcodePicture = res.data.data;
          this.qrcodeUrl = this.$util.ajaxUrl + "/digiops" + res.data.data;
        });
      }
    },
    siteChange(value) {
      console.log(value);
      sopSpinner(value).then(res => {
        console.log(res);
        this.sopList = res.data.data;
      });
      if (this.operationstatus == "add") {
        pointCode(value).then(res => {
          console.log(res);
          this.formValidate.pointNum = res.data.data;
        });
      }
    },
    onChange(startPage) {
      this.getformatdata({ pageSize: 10, startPage: startPage });
    },
    getformatdata(data) {
      pointList(data).then(res => {
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
<style scoped>
</style>