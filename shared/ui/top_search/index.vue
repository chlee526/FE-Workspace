<template>
    <div class="top_searchs" ref="wrap" :class="[{ 'is-expanded': getTopSearchExpanded }, { 'no-result': hasResultsSlot }]">
        <div class="wrap">
            <div class="inner_wrap" ref="inner_wrap">
                <!-- 검색 조건 -->
                <div class="searchs" ref="searchs">
                    <div class="input_form" ref="input_form">
                        <table class="wrap" ref="input_form_wrap" v-init>
                            <slot name="input_forms" />
                        </table>
                    </div>
                    <div class="input_result">
                        <div class="wrap" ref="input_result_wrap" :style="'flex: 1 1 ' + inputResultHgt + 'px'">
                            <slot name="input_result" />
                        </div>
                        <div class="btns">
                            <comp-button class="is-icon-only is-large" title="검색 조건 초기화" @click="reset"><span class="icon">&#xe020;</span></comp-button>
                            <comp-button class="btn_search is-icon-with is-before is-large is-color-black" title="검색" @click="searchingClick" :disabled="searchInputDatas.searchDisabled"><span class="icon">&#xe007;</span><span class="txt">검색</span></comp-button>
                        </div>
                    </div>
                </div>
                <!-- // 검색 조건 -->
                <!-- 검색 결과 -->
                <div class="results" ref="results" @click="evt_openCloseClick">
                    <slot name="results" />
                </div>
                <!-- // 검색 결과 -->
            </div>
        </div>
        <button v-if="hasResultsSlot" ref="btn_expander" id="btn_expander" class="btn_expander" @click="evt_openCloseClick">열고/닫기</button>
    </div>
</template>

<script>
import { debounce } from 'lodash';
import { mapGetters } from 'vuex';
import $ from 'jquery';
import { TweenMax } from 'gsap';
import EventBus from '@shared/utils/eventBus';

export default {
    name: 'comp-topsearch',
    data() {
        return {
            asideToMargin: 50, //aside(도움말)과 inner_wrap과의 margin 차이
            scrollPos: 0,
            space: 0,
            // hasResultsSlot: false,
            firstObserver: null,
            inputResultHgt: 0,
            defaultSearchDatas: null,
            tweening: false,
            isFirst: true,
            topScroll: process.env.VUE_APP_TOP_SCROLL === 'true' ? true : false, //Scroll Up 액션에 대한 사용여부(Up 일어났을 때 검색조건 열림)
            searchDisabled: false,
            isWheeling: false,
            wheelTimer: null,
        };
    },
    props: {
        notyDisabled: { type: Boolean, default: false }, // true 일 경우 페이지 내 검색중 noty 화면 비활성화처리
        searchInputDatas: {},
        searchDatas: {},
    },
    computed: {
        ...mapGetters(['getUseageLNB', 'getTopSearchExpanded']),
        hasResultsSlot() {
            return !!this.$slots['results'];
        },
    },
    created() {
        this.$store.commit('setting/SET_TOPSEARCHEXPANDED', true);
        EventBus.$on('hndl_move', this.hndl_move);
    },
    mounted() {
        $(window).scroll(this.evt_scroll);
        $(window).resize(this.evt_resize);
        window.addEventListener('wheel', this.evt_wheel);

        this.defaultSearchDatas = JSON.parse(JSON.stringify(this.searchInputDatas));
        this.searching();

        this.$store.commit('setting/SET_SCROLL_POSITION_Y', { resultOffsetHeigth: $(this.$refs.results).outerHeight(), inputFormOffsetHeigth: $(this.$refs.input_form).outerHeight() });

        this.$nextTick(() => {
            this.hndl_move(0);
        });
    },
    watch: {
        getTopSearchExpanded: function ($val) {
            if (!$val && Object.keys(this.searchDatas).length > 0) {
                this.$emit('update:searchInputDatas', JSON.parse(JSON.stringify(this.searchDatas)));
            }

            this.hndl_move();
        },
        getUseageLNB(val) {
            this.hndl_move();
        },
    },
    methods: {
        evt_openCloseClick: debounce(
            function () {
                this.$store.commit('setting/SET_TOPSEARCHEXPANDED', !this.getTopSearchExpanded);
            },
            300,
            { leading: true, trailing: false },
        ),
        hndl_move($tweenTime) {
            if (this.tweening) return;

            this.tweening = true;

            var _this = this;
            if ($tweenTime == undefined) $tweenTime = 0.5;
            if (this.isFirst) {
                $tweenTime = 0;
                this.isFirst = false;
            }

            let posY = 0;
            let movePosY = 0;
            const innerWrapPosY = 40;
            const $locator = document.querySelector('#locator');

            if (this.getTopSearchExpanded) {
                if (this.$refs.searchs) TweenMax.to(this.$refs.searchs, $tweenTime, { 'margin-top': 0, ease: 'Expo.easeInOut' });

                movePosY = -$(this.$refs.results).outerHeight();
                posY = innerWrapPosY + (this.$refs.searchs ? this.$refs.searchs.getBoundingClientRect().height : 0);
            } else {
                if (this.$refs.searchs) TweenMax.to(this.$refs.searchs, $tweenTime, { 'margin-top': -$(this.$refs.searchs).outerHeight(), ease: 'Expo.easeInOut' });

                movePosY = 0;
                posY = innerWrapPosY + (this.$refs.results ? this.$refs.results.getBoundingClientRect().height : 0);
            }

            if ($locator) posY += $locator.offsetHeight;

            if (this.$refs.results) {
                TweenMax.to(this.$refs.results, $tweenTime, {
                    'margin-bottom': movePosY,
                    ease: 'Expo.easeInOut',
                    onComplete: function () {
                        _this.tweening = false;
                    },
                });
            }

            // aside(도움말) 포지션 위치를 getTopSearchExpanded 와 inner_wrap 위치 값에 따라 변경해주는 이벤트에 위치값 할당
            if (this.getUseageLNB) {
                EventBus.$emit('moveAside', posY + this.asideToMargin - 40);
                return false;
            }
            if ($(window).scrollTop() != 0) {
                EventBus.$emit('moveAside', posY + this.asideToMargin);
            } else {
                EventBus.$emit('moveAside', 0);
            }
        },
        evt_scroll: function ($e) {
            const tg = $e.target;
            var deltaY = $(tg).scrollTop() < this.scrollPos ? 'up' : 'dn';
            this.scrollPos = $(tg).scrollTop();
            if (this.scrollPos < (!this.getUseageLNB ? 125 + $(this.$refs.searchs).outerHeight() / 2 : 0)) {
                return false;
            }

            if (deltaY == 'up') {
                // if (this.topScroll) this.$store.commit('setting/SET_TOPSEARCHEXPANDED', true);
            } else {
                if (!this.tweening) this.$store.commit('setting/SET_TOPSEARCHEXPANDED', false);
            }
        },

        evt_wheel(e) {
            if (!this.isWheeling && this.scrollPos == 0 && e.deltaY < 0 && !this.getTopSearchExpanded) {
                this.$store.commit('setting/SET_TOPSEARCHEXPANDED', true);
            }

            this.isWheeling = true;

            clearTimeout(this.wheelTimer);
            this.wheelTimer = setTimeout(() => {
                this.isWheeling = false;
            }, 300);
        },
        searching() {
            this.$emit('update:searchDatas', JSON.parse(JSON.stringify(this.searchInputDatas)));

            // 전체 로딩 시작
            if (this.notyDisabled == false) this.$store.dispatch('opts/LOAD_START');
        },
        searchingClick: debounce(
            function (e) {
                this.$emit('update:searchDatas', JSON.parse(JSON.stringify(this.searchInputDatas)));

                // 전체 로딩 시작
                if (this.notyDisabled == false) this.$store.dispatch('opts/LOAD_START');
            },
            1000,
            { leading: true, trailing: false },
        ),

        reset() {
            this.$emit('update:searchInputDatas', JSON.parse(JSON.stringify(this.defaultSearchDatas)));
        },
    },
    directives: {
        init: {
            inserted($el, $evt, $vnode) {
                $vnode.context.inputResultHgt = $vnode.children.length * 20 - 5;
            },
        },
    },
    beforeDestroyed() {
        $(window).off('scroll', this.evt_scroll);
        $(window).off('resize', this.evt_resize);
        window.removeEventListener('wheel', this.evt_wheel);
        EventBus.$off('hndl_move', this.hndl_move);
    },
};
</script>
