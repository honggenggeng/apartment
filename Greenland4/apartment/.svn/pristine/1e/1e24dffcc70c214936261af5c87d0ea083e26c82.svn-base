<style lang="less">
    @import '../../../styles/common.less';
    /*@import '../../tables/components/table.less';*/
</style>

<template>
    <div>
        <Card>
            <div slot="title">
                <!--<Tag type="dot" color="green">当前配置</Tag>-->
                <!--<Tag type="dot" color="green">没有加载</Tag>-->
                <router-link v-if="this.loginUserInfo.module.name == 'SYSTEM'" class="ivu-btn ivu-btn-primary"
                             tag="button" to="../system/role-add">添加
                </router-link>
                <Button v-if="this.loginUserInfo.module.name == 'SYSTEM'" type="success" @click="roleEdit()">编辑</Button>
                <Button v-if="this.loginUserInfo.module.name == 'SYSTEM'" type="error" @click="roleDelete()">删除</Button>
            </div>
            <Collapse v-model="collapse">
                <Panel>
                    查询条件
                    <div slot="content">
                        <Row :gutter="16">
                            <Col :xs="24" :md="12" :lg="6" class="search_item_margin_bottom">
                                <Select v-model.trim="searchModuleUuid" placeholder="请选择模块..." clearable transfer>
                                    <Option v-for="item in moduleList" :value="item.uuid" :key="item.uuid">{{
                                        item.name
                                        }}
                                    </Option>
                                </Select>
                            </Col>
                            <Col :xs="24" :md="12" :lg="6" class="search_item_margin_bottom">
                                <Input icon="search" v-model.trim="searchName" placeholder="请输入名称搜索..."/>
                            </Col>
                        </Row>
                        <br>
                        <Row :gutter="16">
                            <Col :xs="24" :md="12" :lg="6">
                                <Button type="primary" icon="android-search" @click="handleSearch()">查询</Button>
                                <Button type="primary" icon="android-refresh" @click="clearCondition()"
                                        :style="{marginLeft: '8px'}">清空
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Panel>
            </Collapse>

            <br v-if="displaySearchTable"/>
            <Row v-if="displaySearchTable">
                <Table highlight-row border :columns="columns1" :data="data1"
                       @on-selection-change="selectRows"></Table>
            </Row>
            <br v-if="displaySearchTable"/>
            <Row v-if="displaySearchTable" type="flex" justify="end" class="code-row-bg">
                <Col>
                    <Page :total="recordsTotal" :current="recordsCurrent" show-sizer show-elevator show-total
                          @on-change="changePage"
                          @on-page-size-change="changeSizePage">
                    </Page>
                </Col>
            </Row>
        </Card>

    </div>
</template>

<script>
    export default {
        name: 'role',
        activated () {
            // 处理下拉列表
            this.$util.ajax.get('/uaa/module/GetModuleAll').then((res) => {
                if (res.status === 200 && res.data.status === true) {
                    this.moduleList = res.data.content;
                }
            });
            // 表格显示时重新查询
            if (this.displaySearchTable) {
                // 查询数据
                this.getData(this.params);
            }
        },
        created () {
            // 登录用户信息
            this.loginUserInfo = JSON.parse(localStorage.getItem('loginUserInfo'));
        },
        // mounted () {
        //     this.getData(this.params);
        // },
        data () {
            return {
                loginUserInfo: null, // 登录用户信息
                collapse: '0', // 默认展开的折叠面板（值为panel的name属性，默认为index）
                displaySearchTable: false,
                // 下拉列表
                searchModuleUuid: '',
                moduleList: [],
                searchName: '',
                columns1: [
                    {type: 'selection', width: 60, align: 'center'},
                    {title: '名称', key: 'name'},
                    {title: '等级', key: 'level'},
                    {title: '模块', key: 'moduleName'},
                    {title: '说明', key: 'description'}
                    // {title: 'UUID', key: 'uuid'}
                ],
                data1: [],
                selectedRows: [],
                recordsTotal: 0,
                recordsCurrent: 1,
                params: {
                    pageno: 1,
                    pagecount: 10
                }
            };
        },
        methods: {
            getData (params) {
                this.$util.ajax.get('/uaa/role/GetPageRole', {params: params}).then((res) => {
                    if (res.status === 200 && res.data.status === true) {
                        this.data1 = res.data.content.records;
                        this.recordsTotal = res.data.content.total;
                        this.recordsCurrent = res.data.content.current;
                    } else {
                        this.data1 = [];
                    }
                });
            },
            changePage (index) {
                this.params.pageno = index;
                this.getData(this.params);
            },
            changeSizePage (size) {
                this.params.pagecount = size;
                this.getData(this.params);
            },
            handleSearch () {
                this.params.name = this.searchName;
                this.params.moduleUuid = this.searchModuleUuid;
                this.params.pageno = 1;
                this.displaySearchTable = true;
                this.getData(this.params);
            },
            clearCondition () {
                this.searchName = '';
                this.searchModuleUuid = '';
                this.displaySearchTable = false;
                this.data1 = [];
            },
            roleEdit () {
                // console.info('test = ' + this.data1.selectedItem);
                if (this.selectedRows.length <= 0) {
                    this.$Modal.info({title: '信息', content: '未选中任何记录'});
                } else if (this.selectedRows.length === 1) {
                    this.$router.push({
                        path: '../system/role-edit',
                        query: {
                            uuid: this.selectedRows[0].uuid
                        }
                    });
                } else {
                    this.$Modal.info({title: '信息', content: '编辑只支持单选'});
                }
            },

            roleDelete () {
                if (this.selectedRows.length <= 0) {
                    this.$Modal.info({title: '信息', content: '未选中任何记录'});
                } else if (this.selectedRows.length === 1) {

                    // 不能删除登陆用户的角色
                    if (this.selectedRows.uuid === this.loginUserInfo.role.uuid) {
                        this.$Modal.info({title: '信息', content: '不能删除登录用户关联的角色'});
                        return;
                    }

                    this.$Modal.confirm({
                        title: '确认',
                        content: '确定要删除吗？',
                        okText: '确认',
                        cancelText: '取消',
                        onOk: () => {
                            this.$util.ajax.post('/uaa/role/DeleteRole', this.selectedRows[0]).then((res) => {
                                this.params.pageno = 1;
                                this.getData(this.params);
                                if (res.status === 200 && res.data.status === true) {
                                    this.$Message.success('删除成功!');
                                } else {
                                    if (res.data.error && res.data.error.length > 0) {
                                        this.$Message.error('删除失败!<br/>错误消息：' + res.data.error[0]);
                                    } else {
                                        this.$Message.error('删除失败!');
                                    }
                                }
                            });
                        }
                    });
                } else {

                    // 不能删除登陆用户的角色
                    var hasLoginRole = false;
                    this.selectedRows.map((item) => {
                        if (item.uuid === this.loginUserInfo.role.uuid) {
                            hasLoginRole = true;
                        }
                    });

                    if (hasLoginRole) {
                        this.$Modal.info({title: '信息', content: '不能删除登录用户关联的角色'});
                        return;
                    }

                    this.$Modal.confirm({
                        title: '确认',
                        content: '确定要删除吗？',
                        okText: '确认',
                        cancelText: '取消',
                        onOk: () => {
                            let ids = [];
                            this.selectedRows.map((item) => {
                                ids.push(item.id);
                            });

                            this.$util.ajax.post('/uaa/role/DeleteSelectRole', {ids: ids}).then((res) => {
                                this.params.pageno = 1;
                                this.getData(this.params);
                                if (res.status === 200 && res.data.status === true) {
                                    this.$Message.success('删除成功!');
                                } else {
                                    if (res.data.error && res.data.error.length > 0) {
                                        this.$Message.error('删除失败!<br/>错误消息：' + res.data.error[0]);
                                    } else {
                                        this.$Message.error('删除失败!');
                                    }
                                }
                            });
                        }
                    });
                }
            },
            selectRows (selection) {
                this.selectedRows = selection;
            }

        }
    };
</script>

<style scoped>
    .search_item_margin_bottom {
        margin-bottom: 4px;
    }
</style>
