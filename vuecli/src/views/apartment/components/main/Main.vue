    <style lang="less">
    @import "./main.less";
  
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'90px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :theme="menuTheme"
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="!shrink" src="../../../../images/cou_logo.png" key="max-logo" style="height: 86px;" />
                    <img v-show="shrink" src="../../../../images/cou_logo.png" key="min-logo" style="height: 86px;"/>
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'90px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                            @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <!-- <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <lock-screen></lock-screen>
                    <message-tip v-model="mesCount"></message-tip>
                    <theme-switch></theme-switch> -->
                    <div class="user-dropdown-menu-con" style="margin-right:90px;">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                         <!--    <Dropdown transfer trigger="click">
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
                            </Dropdown>-->
                        </Row>
                    </div>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" style="margin-right:30px;" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">{{$t('personalinformation')}}</DropdownItem>
                                    <DropdownItem name="loginout" divided>{{$t('signout')}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    import lockScreen from './main-components/lockscreen/lockscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';

    export default {
        components: {
            lang: '',
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch
        },
        data () {
            return {
                lang: '',
                pageLang: '',
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {

            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            // lang () {
            //     return this.$store.state.app.lang;
            // },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            },
            placeholderText () {
                return this.$t('placeholderText');
            },
            placeholderDate () {
                return this.$t('placeholderDate');
            }
        },
        created () {
            util.ajax.get("/digiops/role/queryMenuList").then(res=>{
                console.log(res)
            })
        },
        methods: {
            Switch (lang) {
                this.lang = lang;
                localStorage.lang = lang;
                this.$store.commit('switchLang', lang); // 如果你要自己实现多语言切换，那么只需要执行这行代码即可，修改语言类型
                this.columnsI18n = [
                    {
                        key: 'name',
                        title: this.$t('name')
                    },
                    {
                        key: 'company',
                        title: this.$t('company')
                    }
                ];// 像iview的table组件这样一次渲染如果数据不更新视图就不更新的组件，如果切换语言需要更新一下数据才能切换组件内的多语言
            },
            en_US () {
                this.pageLang = 'English';
                this.Switch('en-US');
                localStorage.lang = 'en-US';
                console.log(localStorage.lang);
            },
            zh_CN () {
                this.pageLang = '简体中文';
                this.Switch('zh-CN');
                localStorage.lang = 'zh-CN';
                console.log(localStorage.lang);
                // 如果你要自己实现多语言切换，那么只需要执行这行代码即可，修改语言类型
            },
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                // edit by aptenodyte
                this.userName = localStorage.getItem('user_name');
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    // 之前的路由，全屏跳出，现在用子栏目
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                    // this.$router.push({
                    //     name: 'ownspace_index'
                    // });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$util.ajax.get('/auth/oauth/removeToken').then(res=>{
                        this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    
                    this.$router.push({
                        name: 'login'
                    });
                    })
                    
                } 
                return localStorage.lang = this.lang;
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // this.$router.push({
                //     name: val
                // });
                //  console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        mounted () {
            this.init();
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            console.log(localStorage.lang);
            this.lang = this.$lang;
            // console.log(this.lang);
            if (this.lang === 'zh-CN') {
                this.pageLang = '简体中文';
            } else if (this.lang === 'en-US') {
                this.pageLang = 'English';
            }
        }
    };
</script>
