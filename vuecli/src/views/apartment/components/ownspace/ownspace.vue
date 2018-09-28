<template>
	<div class="operation" id="ccc">

		<Col span="24">
		<div style="padding: 30px 10px;">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<Row>
					<Col span="12">
						<FormItem label="用户ID" prop="useID">
							<Input v-model="formValidate.useID"  disabled></Input>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="用户名" prop="name">
							<Input v-model="formValidate.name" placeholder="输入用户名称"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="12">
						<FormItem label="E-mail" prop="mail">
							<Input v-model="formValidate.mail" placeholder="输入邮箱"></Input>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="联系方式" prop="contact">
							<Input v-model="formValidate.contact" placeholder="联系方式" ></Input>
						</FormItem>
					</Col>					
				</Row>
				<Row>
					<Col span="12">
						<FormItem label="站点" prop="site">
							<Input v-model="formValidate.site" placeholder="输入站点" disabled></Input>
						</FormItem>
					</Col>
					
				</Row>
				<Row>
					<Col span="12">
						<FormItem label="重置密码" prop="passwd">
            				<Input type="password" v-model="formValidate.passwd" placeholder="输入新密码"></Input>
						</FormItem>
					</Col>	
					<Col span="12">
						 <FormItem label="确认密码" prop="repeatPwd">
            				<Input type="password" v-model="formValidate.repeatPwd" placeholder="重新输入新密码"></Input>
       					 </FormItem>
					</Col>
				</Row>
				<FormItem>
					<Button type="primary" @click="handleSubmit('formValidate')" class="save " style="margin-left: 0px;">保存</Button>
					<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">返回</Button>
				</FormItem>
			</Form>
		</div>
		</Col>
	</div>
</template>
<script>
    export default {
        data () {
  
       const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback();
                } else {
                    if (this.formValidate.repeatPwd !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('repeatPwd');
                    }
                    callback();
                }
            };
            const validateRepeatPwd = (rule, value, callback) => {
                if (value === '') {
                    callback();
                } else if (value !== this.formValidate.passwd) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            };
            
            return {
                formValidate: {
                	useID:'',
                    name: '',
                    mail: '',
                    contact:'',
                    passwd: '',
                    repeatPwd: '',              
                },
                ruleValidate: {
                	useID: [
                        { required: false,trigger: 'change' }
                    ],
                    name: [
                        { required: true,message: '用户名为必填项',  trigger: 'blur' }
                    ],
                    mail: [
                        { required: false, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: '电子邮件格式不正确', trigger: 'blur' }
                    ],
                    site: [
                        { required: false,  trigger: 'change' }
                    ],
                    passwd: [
                        {required: false, validator: validatePass, trigger: 'change' },
                    ],
                    repeatPwd: [
                        {required: false, validator: validateRepeatPwd, trigger: 'change' }
                    ],
                    contact: [
	                    {required:false, message: '电话号码不能为空', trigger: 'change'},
                        { type: 'string',pattern:/^1(3|4|5|7|8)\d{9}$/, message:'手机号为11位数字', trigger:'blur'},
 					],
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$router.back(-1)
            }
        },
        created(){
            this.$util.ajax.get('/digiops/user/token').then(res=>{
                console.log(res.data)
                let userInfo = res.data.result
                this.formValidate= {
                	useID:userInfo.userNum,
                    name: userInfo.userName,
                    mail: userInfo.email,
                    contact:userInfo.telephone,    
                }
            })
        }
    }
</script>
<style scoped>
</style>