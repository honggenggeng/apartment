<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div>
        <Card>
            <Row :gutter="16">
                <Col :lg="22">
                    <Form ref="form" :model="form" :rules="rule" :label-width="120">
                        <Row>
                            <Col :xs="24" :lg="12">
                                <FormItem label="模块" prop="moduleUuid">
                                    <Select v-model.trim="form.moduleUuid" placeholder="请选择模块..."
                                            @on-change="searchModuleChange">
                                        <Option v-for="item in moduleList" :value="item.uuid" :key="item.uuid">{{
                                            item.name
                                            }}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :lg="12">
                                <FormItem label="等级" prop="level">
                                    <Input type="text" v-model.trim="form.level" number/>
                                </FormItem>
                            </Col>
                            <!--<Col :xs="24" :lg="12">-->
                            <!--<FormItem label="实体" prop="clientUuid">-->
                            <!--<Select v-model.trim="form.clientUuid" placeholder="请选择实体..." clearable>-->
                            <!--<Option v-for="item in clientByModuleList" :value="item.uuid" :key="item.uuid">-->
                            <!--{{-->
                            <!--item.name-->
                            <!--}}-->
                            <!--</Option>-->
                            <!--</Select>-->
                            <!--</FormItem>-->
                            <!--</Col>-->
                        </Row>
                        <Row>
                            <Col>
                                <FormItem label="名称" prop="name">
                                    <Input type="text" v-model.trim="form.name"/>
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label="说明" prop="description">
                                    <Input type="textarea" :maxlength="3000" v-model.trim="form.description"/>
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('form')">提交</Button>
                                    <Button type="ghost" @click="handleReset('form')" style="margin-left: 8px">重置
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
    export default {
        name: 'role-add',
        created() {
            // 登录用户信息
            this.loginUserInfo = JSON.parse(localStorage.getItem('loginUserInfo'));
        },
        activated() {
            this.activated();
        },
        data() {
            return {
                loginUserInfo: null, // 登录用户信息
                // 下拉列表
                moduleList: [],
                clientByModuleList: [],
                flag: false,
                form: {
                    name: '',
                    description: '',
                    moduleUuid: '',
                    clientUuid: ''
                },
                rule: {
                    name: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                        {type: 'string', max: 255, message: 'No more than 255 words', trigger: 'blur'}
                    ],
                    level: [
                        {required: true, type: 'number', message: '只能为数字', trigger: 'blur'}
                    ],
                    moduleUuid: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    clientUuid: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    description: [
                        {type: 'string', max: 3000, message: 'No more than 3000 words', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            activated() {
                if (this.loginUserInfo && this.loginUserInfo.module) {
                    // 处理下拉列表
                    this.$util.ajax.get('/uaa/module/GetModuleAll').then((res) => {
                        if (res.status === 200 && res.data.status === true) {
                            this.moduleList = res.data.content;
                            if (this.moduleList.length > 0 && this.form.moduleUuid === '') {
                                this.searchModuleUuid = this.moduleList[0].uuid;
                            }
                        }
                    });
                }
            },
            searchModuleChange(value) {
                this.$util.ajax.get('/uaa/client/GetClientByModuleuuid', {params: {moduleUuid: value}}).then((res) => {
                    if (res.status === 200 && res.data.status === true) {
                        this.clientByModuleList = res.data.content;
                    }
                });
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$util.ajax.post('/uaa/role/InsertRole', this.form).then((res) => {
                            if (res.status === 200 && res.data.status === true) {
                                this.$Message.success('添加成功!');
                            } else {
                                if (res.data.error && res.data.error.length > 0) {
                                    this.$Message.error('添加失败!<br/>错误消息：' + res.data.error[0]);
                                } else {
                                    this.$Message.error('添加失败!');
                                }
                            }
                        });
                    } else {
                        this.$Message.error('验证失败!');
                    }
                });
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            }
        }
    };
</script>
