<template>
    <div class="appContainerWrap ui-loader-container" :class="{ 'is-loading': loading }">
        <div id="container" class="page-helper">
            <div id="content">
                <CompLnb :helperData="getHelperDatas" />
                <div class="content">
                    <router-view v-if="!getIndexPage" :helperData="getHelperDatas"></router-view>
                    <CompSearch v-else :helperData="getHelperDatas" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { API_helperList } from '@shared/api/helper';

import CompLnb from './components/lnb';
import CompSearch from './components/search';

export default {
    name: 'HelperPage',
    data() {
        return {
            loading: false,
            helperDatas: [],
        };
    },
    computed: {
        ...mapGetters(['getRoutes']),
        // 현재 path가 index 페이지 인지 체크
        getIndexPage() {
            return this.$route.path === '/view/helper';
        },
        // 도움말 패칭 데이터
        getHelperDatas() {
            return this.helperDatas || [];
        },
    },
    components: {
        CompLnb,
        CompSearch,
    },
    // created() {
    //     if (getAccessToken() || getRefreshToken() || getUserNo()) {
    //         this.$store.commit('user/SET_ACCESS_TOKEN', '');
    //         this.$store.commit('user/SET_REFRESH_TOKEN', '');
    //         this.$store.commit('user/SET_IS_PWD_CERTIFY', '');

    //         removeAccessToken();
    //         removeUserNo();
    //         removeRefreshToken();
    //         removeIsPwdCertify();
    //     }
    //     //로그인 페이지 이동 시 y 좌표 초기화처리
    //     this.$store.commit('setting/SET_SCROLL_POSITION_Y', '');
    //     removeScrollPositionY();
    // },
    mounted() {
        // console.log('$route.matched', this.$route.matched);
        // alert(this.getAccessToken());
        // this.$nextTick(() => {
        //     // this.$refs.btnLogin.focus();
        //     // this.$refs.inputbox_id.$el.querySelector('input').focus();
        //     const clickEvent = new MouseEvent('click', {
        //         bubbles: true,
        //         cancelable: true,
        //     });
        //     document.querySelector('#wrap').dispatchEvent(clickEvent);
        // });
        this.fetchDatas();
    },
    methods: {
        async fetchDatas() {
            this.loading = true;

            const params = {
                admin: 'N',
            };
            await API_helperList(this.apiUID, params)
                .then((res) => {
                    if (res.data.result.list) this.helperDatas = res.data.result.list;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="scss">
@import './style.scss';
</style>
