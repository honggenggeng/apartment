<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="logo"></div>
        <div class="login-con">
            <p class="title">
                {{$t('login_signin')}}
            </p>
            <div class="form-con">
                <Form ref="loginForm" :model="form" :rules="rules">
                    <FormItem prop="userName">
                        <input v-model="form.userName" class="username" placeholder="请输入用户名" />
                    </FormItem>
                    <FormItem prop="password">
                        <input type="password" v-model="form.password" class="password" :placeholder="$t('login_inputUserName')">
                    </FormItem>
                    <FormItem style="width:280px;">
                        <FormItem style="width:100%;float:right;">
                            <!-- <input type="checkbox" name="" @click="selectRemember()"
                                   :class="{isRememberPassword:!isRememberPassword,rememberPassword:isRememberPassword}"><span
                                class="rememberme">{{$t('rememberMe')}}</span> -->
                          <!--  <Dropdown transfer trigger="click" style="width:138px;float:left;">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{pageLang}}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem>
                                        <Button type="text" @click="zh_CN">简体中文</Button>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Button type="text" @click="en_US">English</Button>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown> -->
                            <span class="forgotpassword" style="bdisplay:block;width:100%;float:left;left:0;text-align:right;margin-bottom: -20px;">
                                <p @click="modal1=true" style="cursor:pointer;">{{$t('login_forgotPassword')}}</p>
                            </span>
                        </FormItem>
                      <!--  <Checkbox v-model="isSystemAdmin" style="color:#2d8cf0;">{{$t('login_systemAdmin')}}</Checkbox>
                        -->
                      <span @click="handleSubmit" style="display:inline-block;padding:5px 15px;width:auto;height:auto;position:relative;" class="submit">{{$t('login_signin')}}</span>
                    </FormItem>
                </Form>
                <Modal v-model="modal1" title="提示">
                    <p>请联系400-621-9606更换密码</p>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
//import {router} from '../../router/router';
import { router } from "../../router/index";
import { menu } from "./api/index";

export default {
  data() {
    return {
      modal1: false,
      routerList: [],
      isSystemAdmin: false,
      pageLang: "",
      lang: "",
      isRememberPassword: true,
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    selectRemember: function() {
      this.isRememberPassword = !this.isRememberPassword;
      this.lang = localStorage.lang;
    },
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 根据“系统管理员”选项将 Basic Auth 写到 localStorage
          // if (this.isSystemAdmin) {
          //     localStorage.setItem('basic_auth', 'Basic ' + window.btoa('SYSTEM' + ':' + 'SYSTEM'));
          // } else {
          //     localStorage.setItem('basic_auth', 'Basic ' + window.btoa('DIGIPAY' + ':' + 'SYSTEM'));
          // }
          if (this.isSystemAdmin) {
            localStorage.setItem(
              "basic_auth",
              "Basic " + window.btoa("clientTest" + ":" + "123456")
            );
          } else {
            localStorage.setItem(
              "basic_auth",
              "Basic " + window.btoa("clientTest" + ":" + "123456")
            );
          }

          // 参数占位符，edge浏览器里ajax.post第二个参数不加一个有效值，会自动转为post请求
          var edgeParam = { param: "edge" };
          console.log(localStorage.getItem("basic_auth"));
          this.$util.ajax
            .post(
              "/auth/oauth/token?grant_type=password&username=" +
                this.form.userName +
                "&password=" +
                this.form.password,
              edgeParam
            )
            .then(res => {
              //this.$util.ajax.post('http://192.168.0.151:8081/oauth/token?grant_type=password&username=' + this.form.userName + '&password=' + this.form.password, edgeParam).then(res => {
              // 保存token
              console.log(res);
              localStorage.setItem("access_token", res.data.access_token);
              localStorage.setItem("refresh_token", res.data.refresh_token);
              // this.$util.ajax.get("/digiops/role/queryMenuList").then(res => {
              //   console.log(res.data.data);
              //   res.data.data.forEach(item => {
              //     item.path = "/" + item.menu_link;
              //     item.name = item.menu_link;
              //     item.title = item.menu_name;
              //     item.component = (resolve) => { require(["@/views/aden/components/main/Main.vue"], resolve);};
              //     item.menu_son.forEach(item => {
              //       item.path = item.menuLink;
              //       item.name = item.menuLink;
              //       item.title = item.title;
              //       item.component = (resolve) => { require([`@/views/aden/digiops/${item.component}.vue`], resolve);};
              //       item.title = item.menuName;
              //       delete item.menuId;
              //       delete item.menuLink;
              //       delete item.menuName;
              //       delete item.pageSize;
              //       delete item.parentId;
              //       delete item.powerType;
              //       delete item.roleId;
              //       delete item.startPage;
              //       delete item.uuid;
              //       delete item.roleUuid;
              //       delete item.parentUuid;
              //       delete item.conponent;
              //       delete item.startDate;
              //       delete item.endDate;
              //     });
              //     item.children = item.menu_son;
              //     delete item.menu_link;
              //     delete item.menu_name;
              //     delete item.conponent;
              //     delete item.parent_uuid;
              //     delete item.menu_uuid;
              //     delete item.menu_son;
              //   });
              //   this.routerList = res.data.data;
              //    console.log(this.routerList)
              //   console.log(this.$router);
              //   console.log(router);
              //   // this.$router.addRoutes(this.routerList)
              //   localStorage.setItem('routerList',JSON.stringify(this.routerList))
              //   this.$store.commit('updateMenulist2', this.routerList)
              //   router.addRoutes(this.routerList);
              //   this.$router.options.routes.push(this.routerList)
              //   this.$router.push({path:'/home'})
              //   console.log(this.$router);
              //   console.log(this.routerList);
              // });
              this.$router.push({
                  name: 'home_index'
              });
              // // 取得登录用户信息
              // this.$util.ajax.get('/digiops/user/token').then(res => {
              //     console.log(res)
              //     if (res.status === 200 && res.data.status === true) {
              //         // 用户名
              //         localStorage.setItem('user_name', res.data.content.realName);

              //         // 保存登陆用户信息
              //         localStorage.setItem('loginUserInfo', JSON.stringify(res.data.content));

              //         // 跳转到主页
              //         this.$router.push({
              //             name: 'home_index'
              //         });
              //     } else {
              //         // 清空 token 信息
              //         localStorage.setItem('access_token', '');
              //         localStorage.setItem('refresh_token', '');
              //         localStorage.setItem('loginUserInfo', '');
              //         localStorage.setItem('user_name', '');

              //         alert('Incorrect username or password!');
              //     }
              // }).catch(function (error) {
              //     // 清空 token 信息
              //     localStorage.setItem('access_token', '');
              //     localStorage.setItem('refresh_token', '');
              //     localStorage.setItem('loginUserInfo', '');
              //     localStorage.setItem('user_name', '');

              //     alert('Incorrect username or password!' + error);
              // });
            });
          // .catch(function (error) {
          //     // 清空 token 信息
          //     localStorage.setItem('access_token', '');
          //     localStorage.setItem('refresh_token', '');
          //     localStorage.setItem('loginUserInfo', '');
          //     localStorage.setItem('user_name', '');

          //     alert('Incorrect username or password!' + error);
          // });
        }
      });
    },
    en_US() {
      this.pageLang = "English";
      this.Switch("en-US");
      localStorage.lang = "en-US";
      console.log(localStorage.lang);
    },
    zh_CN() {
      this.pageLang = "简体中文";
      this.Switch("zh-CN");
      localStorage.lang = "zh-CN";
      console.log(localStorage.lang);
    },
    Switch(lang) {
      this.lang = lang;
      localStorage.lang = lang;
      this.$store.commit("switchLang", lang);
    }
  },
  created() {
    // TODO 如果有登录，先注销？
    // if (localStorage.getItem('isRememberPassword') === 'true') {
    //     this.form.userName = localStorage.getItem('user');
    //     this.form.password = localStorage.getItem('password');
    //     this.isRememberPassword = localStorage.getItem('isRememberPassword');
    // }
    // console.log(navigator.language);
    // localStorage.lang = navigator.language;

    // console.log(navigator.language);
    // localStorage.lang = navigator.language;
    this.lang = this.$lang;
    // console.log(this.$lang);
    // console.log(localStorage.lang);
    if (this.lang === "zh-CN") {
      this.pageLang = "简体中文";
    } else if (this.lang === "en-US") {
      this.pageLang = "English";
    }
  }
};
</script>

<style>
</style>
