<template>
    <div class="wrap" id="bb">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
            <Row>
                <Col :xs="24" :lg="12">
                <FormItem label="站点" prop="siteUuid">
                    <Select v-model="formValidate.siteUuid" @on-change="siteChange"> 
                        <Option v-for="(item,index) in siteList" :value="item.uuid" :key="index">{{ item.siteName }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col :xs="24" :lg="12">
                <FormItem label="名称" prop="workOrderName">
                    <Input  v-model="formValidate.workOrderName"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :xs="24" :lg="12">
                <FormItem label="执行人" prop="assignUserUuid">
                    <Select v-model="formValidate.assignUserUuid" placeholder="请选择">
                         <Option v-for="(item,index) in receiveList" :value="item.uuid" :key="index">{{ item.userName }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <!-- <Col :xs="24" :lg="12">
                <FormItem label="状态" prop="isEnable">
                    <RadioGroup v-model="formValidate.isEnable">
                        <Radio :label="0">启用</Radio>
                        <Radio :label="1">禁用</Radio>
                    </RadioGroup>
                </FormItem>
                </Col> -->

            </Row>
            <Row>
                
                <Col :xs="24" :lg="12">
                <FormItem label="建议开始时间">
                    <Row>
                        <Col span="12">
                        <FormItem prop="proposalStartTime">
                            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期" v-model="formValidate.proposalStartTime"></DatePicker>
                        </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="任务详请" prop="workOrderRemark">
                    <Input v-model="formValidate.workOrderRemark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
                </FormItem>
            </Row>
            <Col :xs="24" :lg="12">
            <FormItem>
                <Button type="primary"    @click="handleSubmit('formValidate')" class="save " style="margin-left: 0px;">保存</Button>
                <Button type="ghost" @click="handleReset('formValidate')" class="button " style="margin-left: 8px">取消</Button>
            </FormItem>
            </Col>
        </Form>
    </div>
</template>

<script>
import {siteSpinner,userSpinner,workOrderAdd} from "../../api/index.js"
export default {
  data() {
    return {
        siteList:[],
        receiveList:[],
      formValidate: {
        siteUuid:"",
        workOrderName:"",
        assignUserUuid:"",
        isEnable:0,
        workOrderRemark:"",
        proposalStartTime:""
      },
      ruleValidate: {
        siteUuid: [
          {
            required: true,
            message: "站点状态为必填项",
            trigger: "change"
          }
        ],
        assignUserUuid: [
          {
            required: true,
            message: "分配为必填项",
            trigger: "change"
          }
        ],
        workOrderName: [
          {
            required: true,
            message: "备注为必填项",
            trigger: "change"
          }
        ],
        proposalStartTime: [
          {
            required: true,
            message: "日期为必填项",
            trigger: "change",
            type: "date"
          }
        ],
        workOrderRemark: [
          {
            required: true,
            message: "任务详细为必填项",
            trigger: "change"
          }
        ]
      },
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "工单号",
          key: "workorder"
        },
        {
          title: "名称",
          key: "remark"
        },
        {
          title: "优先级",
          key: "priority"
        },
        {
          title: "站点",
          key: "site"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "分配",
          key: "assignUserUuid"
        },
        {
          title: "创建时间",
          key: "createdtime"
        },
        {
          title: "状态",
          key: "status"
        }
      ]
      
    };
  },
  created(){
      siteSpinner().then(res=>{
          this.siteList = res.data.data
      })
  },
  computed: {
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          workOrderAdd(this.formValidate).then(res=>{
            this.$router.push({
              name:"soptTask"
            })
          })
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      //this.$refs[name].resetFields();
      this.$router.back(-1)
    },
    handleRemove(index) {
      this.formValidate.items[index].status = 0;
    },
    siteChange(value){
      userSpinner({siteUuids:value}).then(res=>{
        this.receiveList = res.data.data
      })
    }
  }
};
</script>
<style scoped>

</style>