<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <Row type="flex" justify="center" align="middle" class="advanced-router"
                         style="margin-bottom:30px;">
                        <div class="table_box">
                        </div>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                actionUrl: '',
                userItem: '',
                username: '',
                learName: '',
                balance: '',
                dataCustomerNum: {
                    customerNum: ''
                }
            };
        },
        created () {
       
            // this.userItem = JSON.parse(localStorage.getItem('loginUserInfo'));
            // // console.log(JSON.parse(localStorage.getItem('loginUserInfo')));
            // // console.log(this.userItem.role.name);
            // // console.log(this.userItem.username);
            // console.log(localStorage.getItem('basic_auth'));
            // console.log(localStorage.getItem('access_token'));
            // this.actionUrl = this.$util.ajaxUrl + '/recharge/fileUpload?access_token=' + localStorage.getItem('access_token');
            // console.log(this.actionUrl);
            // this.dataCustomerNum.customerNum = this.userItem.username;
            // if (this.userItem.role.name === 'SystemAdmin') {
            //     console.log('这是SystemAdmin');
            // } else if (this.userItem.role.name === 'SystemUser') {
            //     console.log('这是SystemUser');
            // } else if (this.userItem.role.name === 'SiteManager') {
            //     console.log('SiteManager');
            // } else if (this.userItem.role.name === 'SiteFinance') {
            //     console.log('SiteFinance');
            // } else if (this.userItem.role.name === 'Finance') {
            //     console.log('Finance');
            // } else if (this.userItem.role.name === 'Card') {
            //     console.log('Card');
            //     console.log(this.dataCustomerNum.customerNum);
            //     this.$util.ajax.get('/recharge/queryBalanceByNumber', {params: this.dataCustomerNum}).then((res) => {
            //         if (res.status === 200 && res.data.status === true) {
            //             console.log(res);
            //             this.username = res.data.content.number;
            //             this.learName = res.data.content.name;
            //             this.balance = res.data.content.balance;
            //         } else {
            //             console.log('未查到出错');
            //         }
            //     });
            // }
        }
    };
</script>

<style scoped>
    .table_box {
        width: 100%;
        height: auto;
        position: relative;
    }

    .table_box ul {
        list-style: none;
        border: 1px solid #e9eaec;
        border-radius: 5px;
        box-shadow: 0 0 5px #cdcfd2;
        color: #495060;
    }

    .table_box ul li {
        position: relative;
        min-height: 47px;
        border-bottom: 1px solid #e9eaec;
    }

    .table_box ul li:nth-child(1) {
        background: #f8f8f9;
    }

    .table_box ul li span {
        display: block;
        width: 50%;
        height: 100%;
        position: relative;
        float: left;
        line-height: 47px;
        font-size: 12px;
    }

    .table_box ul li:nth-child(1) span {
        font-weight: bold;
        text-indent: 18px;
        font-size: 14px;
    }

    .table_box ul li span:nth-child(1) {
        text-indent: 18px;
    }
</style>
