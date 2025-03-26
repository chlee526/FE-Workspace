<template>
    <div class="appContainerWrap">
        <div id="container" class="page-error">
            <div id="content">
                <div class="error">
                    <div class="wrap">
                        <h2 id="page_title">{{ $route.params.code }}</h2>
                        <div class="infos">
                            <div class="titles">{{ getMsg }}</div>
                            <div v-if="!isPopup" class="txts" v-html="getText"></div>
                        </div>
                        <div v-if="!isPopup" class="btns">
                            <router-link :to="getLink" class="ui_btn is-color-hl is-xlarge">
                                <strong class="txt">{{ getBtnText }}</strong>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAccessToken, getUserNo, removeAccessToken, removeRefreshToken, removeUserNo } from '@shared/utils/auth';

export default {
    name: 'Page-error',
    data() {
        return {
            isPopup: false,
            // errCode: this.$route.params.code || '404',
            errors: [
                { code: '401', title: '인증 세션이 만료되어 로그아웃되었습니다.', txts: '아래 버튼을 클릭하시면 로그인 페이지로 이동합니다.', btn: '로그인', link: '/view/member/login' },
                { code: '403', title: '접근 권한이 없습니다.', txts: '아래 버튼을 클릭하시면 메인 페이지로 이동합니다.', btn: '메인페이지로 이동', link: '/' },
                { code: '404', title: '페이지를 찾을 수 없습니다.', txts: '아래 버튼을 클릭하시면 메인 페이지로 이동합니다.', btn: '메인페이지로 이동', link: '/' },
                { code: '500', title: '일시적인 서버 에러 입니다.', txts: '문제가 지속될 경우, 관리자에게 문의하세요. <br>아래 버튼을 클릭하시면 로그인 페이지로 이동합니다.', btn: '로그인', link: '/view/member/login' },
            ],
            autoPageTimer: null,
        };
    },
    computed: {
        errCode() {
            if (parseInt(this.$route.params.code) >= 500) return '500';
            return this.$route.params.code || '404';
        },
        getMsg() {
            return this.errors.getParseDatas({ code: this.errCode })[0]?.title;
        },
        getText() {
            if (parseInt(this.$route.params.code) >= 500) return this.errors.getParseDatas({ code: this.errCode })[0]?.txts;
            if (this.errCode != '401') {
                if (getAccessToken() || getUserNo()) {
                    return this.errors.getParseDatas({ code: this.errCode })[0]?.txts;
                } else {
                    return this.errors[0].txts;
                }
            }
            return this.errors.getParseDatas({ code: this.errCode })[0]?.txts;
        },
        getBtnText() {
            if (this.errCode != '401') {
                if (getAccessToken() || getUserNo()) {
                    return this.errors.getParseDatas({ code: this.errCode })[0]?.btn;
                } else {
                    return this.errors[0].btn;
                }
            }
            return this.errors.getParseDatas({ code: this.errCode })[0]?.btn;
        },
        getLink() {
            if (this.errCode != '401') {
                if (getAccessToken() || getUserNo()) {
                    return this.errors.getParseDatas({ code: this.errCode })[0]?.link;
                } else {
                    return this.errors[0].link;
                }
            }
            return this.errors.getParseDatas({ code: this.errCode })[0]?.link;
        },
    },
    mounted() {
        this.isPopup = !!window.opener;

        // 401(인증세션만료) 진입시 5초후 로그인 자동 이동
        if (this.errCode == '401') {
            this.autoPageTimer = setTimeout(() => {
                location.href = '/';
            }, 5000);
        }

        // 500 에러인 경우 Token/Session 초기화
        // if (this.errCode == '500') {
        //     removeAccessToken();
        //     removeRefreshToken();
        //     removeUserNo();
        // }
    },
    methods: {
        login() {
            this.$router.push({ path: '/view/member/login' });
        },
    },
    destroyed() {
        clearTimeout(this.autoPageTimer);
    },
};
</script>

<style>
@import './style.scss';
</style>
