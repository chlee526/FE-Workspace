<template>
    <header ref="header" :class="{ 'is-fixed': headerFixed && !getUseageLNB }">
        <div class="wrap">
            <!-- 커스텀 로고 사용 중이면 -->
            <slot name="logo"> </slot>
            <!-- 커스텀로고 미사용 중이면 -->
            <h1 v-if="!$slots.logo">
                <RouterLink to="/">
                    <!-- 환경설정에 이미지 사용 중이면 -->
                    <img v-if="getLogoImg" :src="getLogoImg" @load="logoImgLoad" alt="" ref="logoImg" />
                    <!-- 환경설정에 이미지 미사용 중이면 -->
                    <span v-else>{{ getTitle }}</span>
                </RouterLink>
            </h1>
            <div class="util_nav_wrap">
                <!-- <slot name="utils"></slot> -->
                <comp-header-utils>
                    <slot name="addUtils" slot="addUtils"> </slot>
                </comp-header-utils>
                <comp-header-gnb v-if="!getUseageLNB" />
                <comp-header-lnb v-else />
                <!-- 엑셀 다운로드 목록 버튼 -->
                <div v-if="getExcelList && getUseageLNB" class="excel-list-btn"><CompExcel class="is-lnb" /></div>
            </div>

            <!-- 추가 슬롯 -->
            <slot name="addSlot"></slot>
        </div>
    </header>
</template>

<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';
import EventBus from '@shared/utils/eventBus';
import { getScrollPositionY } from '@shared/utils/auth';
import CompExcel from '@shared/ui/function/excel';

import CompHeaderUtils from './Utils.vue';
import CompHeaderGnb from './Gnb.vue';
import CompHeaderLnb from './Lnb.vue';

export default {
    name: 'comp-header',
    data() {
        return {
            headerFixed: false,
            passActive: false, // 비밀번호 수정 팝업 Active
            passMdfy: {
                curPass: '',
                newPass: '',
                newPassConfirm: '',
            },
            scrollPosTop: 0,
            scrollTimer: null,
        };
    },
    components: {
        'comp-header-utils': CompHeaderUtils,
        'comp-header-gnb': CompHeaderGnb,
        'comp-header-lnb': CompHeaderLnb,
        CompExcel: () => ({
            component: import('@shared/ui/function/excel'),
            delay: 200,
        }),
    },
    computed: {
        ...mapGetters(['getMqList', 'getUseageLNB']),
        getTitle() {
            return process.env.VUE_APP_TITLE ? process.env.VUE_APP_TITLE : 'DASHBOARD';
        },
        getLogoImg() {
            return process.env.VUE_APP_TITLE_IMG && process.env.VUE_APP_TITLE_IMG.length ? require(`@/assets/img/${process.env.VUE_APP_TITLE_IMG}`) : null;
        },
        // 엑셀 목록 사용 여부
        getExcelList() {
            return process.env.VUE_APP_EXCEL_LIST === 'true';
        },
    },
    mounted: function () {
        var _this = this;

        this.scrollPosTop = $('html, body').scrollTop();
        $(window).scroll(this.evt_scroll);
        this.evt_scroll();
        window.scrollTo(0, getScrollPositionY());

        // 로더 센터 맞추기 위한 lnb 메뉴 넓이
        if (this.getUseageLNB) {
            this.setLnbWidth();
        }
    },
    watch: {
        headerFixed(e) {
            if (e) {
                EventBus.$emit('hndl_move');
            } else {
                if (!this.getUseageLNB) EventBus.$emit('moveAside', 0);
            }
        },
        getUseageLNB(val) {
            if (val) {
                this.setLnbWidth();
            }
        },
    },
    methods: {
        logoImgLoad() {
            const imgRef = this.$refs.logoImg;
            imgRef.style.height = `${imgRef.naturalHeight}px`;
        },
        evt_scroll: function ($e) {
            var time = this.scrollPosTop > $('html, body').scrollTop() ? 0 : 50;
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(function () {
                this.headerFixed = $('html, body').scrollTop() > 70;
            }, time);
            // ????...
            this.headerFixed = $('html, body').scrollTop() > 70;
            this.scrollPosTop = $('html, body').scrollTop();

            this.$el.style.left = `${-window.scrollX}px`;
        },
        evt_responsive: function ($e) {
            if ($e.matches) {
                var mq = this.getMqList.find(function (a) {
                    var tmp = a.mq.split('and');
                    var chkCnt = 0;
                    tmp.filter(function ($item) {
                        if ($e.media.replaceAll(' ', '').indexOf($item.replaceAll(' ', '').trim()) >= 0) chkCnt++;
                    });
                    if (chkCnt == tmp.length) return a;
                });
                this.$store.commit('setting/SET_MQ', mq.id);
            }
        },
        setLnbWidth() {
            if (this.getUseageLNB) {
                document.querySelector(':root').style.setProperty('--lnbWidth', `${this.$refs.header.offsetWidth}px` || '0px');
            }
        },
    },
};
</script>
