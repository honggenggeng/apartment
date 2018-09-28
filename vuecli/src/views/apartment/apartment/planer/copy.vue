<template>
  <div class="operation">
    <Form >
      <FormItem :label="item.menuName"  v-for="(item,index) in menulistPC" :key="index">
          <RadioGroup  v-model="formValidate[item.uuid]">
            <Radio :label="1">禁用</Radio>
            <Radio :label="2">查看</Radio>
            <Radio :label="3">编辑</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="切换" >
          <RadioGroup  v-model="formValidate.shift">
            <Radio :label="1">禁用</Radio>
            <Radio :label="2">查看</Radio>
            <Radio :label="3">编辑</Radio>
          </RadioGroup>
        </FormItem>
    </Form>
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
  data() {
    return {
     formValidate:{
       //shift:1
      //   aaa:1,
      //  bbb:2,
      //  ccc:3,
     },
     zhongjian:{

     },
     menulistPC:[
       {
         name:"aaa",
         uuid:"aaa"
       },
       {
         name:"bbb",
         uuid:"bbb"
       },
       {
         name:"ccc",
         uuid:"ccc"
       }
     ]
  }
  },
  created() {
    this.menulistPC.forEach(item=>{
      this.zhongjian[item["uuid"]] = 3
    })
    // this.formValidate.shift = 2
    // for(var i=0;i<this.menulistPC.length;i++){
    //   this.zhongjian[this.menulistPC[i].uuid] = 3
    // }

    //this.formValidate.aaa = 3
    this.formValidate = Object.assign({}, this.formValidate, this.zhongjian)
  },
  
  methods: {
  },
  computed: {
    // formValidate(){
    //   return 
    // }
  }
};
</script>
<style scoped>
</style>
