<template>
    <div class="ui_bubble">
        <slot name="default"></slot>
        <transition :name="getTransition" v-if="(image && !imgError) || image == undefined">
            <div v-if="active" ref="bubble" class="bubble" :class="['is-' + pos, { 'is-customColor': getCustomColor }]" :data-pos="pos" :style="getStyle()" v-init v-click-outside="!showFixed && toggle ? evt_docClick : null" v-behavior-scroll-resize="evt_resizeScroll">
                <!--content, subcontent, htmlType, title, image 값이 한개라도 있다면 생성 -->
                <template v-if="content || subcontent || htmlType || title || image">
                    <span class="arrow" :class="{ 'is-title-only': !content && !subcontent && !htmlType, 'is-content-only': !title }" :style="getArrowPosX + ';' + getCustomColor2"></span>
                    <div v-if="!htmlType && !image" class="wrap" :style="getCustomColor2">
                        <strong v-if="title" class="title" v-html="title"></strong>
                        <span v-if="content" class="content" v-html="content.lengthLimit(contentLimit)"></span>
                        <span v-if="subcontent" class="subcontent" v-html="subcontent"></span>
                    </div>
                    <div v-else-if="!htmlType && image" class="wrap image" :class="{ 'is-loading': imgLoading }" :style="getCustomColor2">
                        <img v-if="image" :src="image" @load="evt_imgLoadComplete" />
                    </div>
                    <div v-else class="wrap html" :style="getCustomColor2">
                        <strong v-if="title" class="title" v-html="title"></strong>
                        <div class="htmlContent">
                            <slot name="html-content">내용이 없어요</slot>
                        </div>
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>
<script>
import '@shared/utils';
import { mapGetters } from 'vuex';

export default {
    name: 'comp-bubble-box',
    data() {
        return {
            active: false,
            pos_top: -99999,
            pos_left: -99999,
            arrow_pos_x: 0,
            arrow_pos_y: 0,
            max_wid: 'auto',
            title: this.subject,
            img: null,
            imgLoading: false,
            imgError: false,
            bubbleTop: 0,
            resizeObserver: null,
        };
    },
    props: {
        pos: { type: String, default: 'LT' },
        arrowFixed: { type: Boolean, default: false },
        click: { type: Boolean, default: false }, // toggle로 대체
        toggle: { type: Boolean, default: false },
        subject: { type: String, default: undefined },
        content: { type: String, default: undefined },
        contentLimit: { type: Number, default: null },
        subcontent: { type: String, default: undefined },
        htmlType: { type: Boolean, default: false },
        image: { type: String, default: undefined },
        customColor: { type: String, default: null },
        showFixed: { type: [Boolean, null], default: null },
    },
    computed: {
        ...mapGetters(['getChns', 'getIssues', 'getBrdViewLen', 'getExcelUsage', 'getScrollWidth']),
        getTransition() {
            return this.pos.indexOf('T') >= 0 ? 'fade_posy_margin' : 'fade_posy_margin_reverse';
        },
        getBubbleTop() {
            return 'top : ' + this.pos_top + 'px;';
        },
        getBubbleLeft() {
            return 'left : ' + this.pos_left + 'px;';
        },
        getBubbleMaxWid() {
            return 'max-width : ' + this.max_wid + 'px;';
        },
        getArrowPosX() {
            if (this.pos.indexOf('L') >= 0) return 'left: ' + this.arrow_pos_x + 'px';
            else if (this.pos.indexOf('R') >= 0) return 'right: ' + this.arrow_pos_x + 'px';
            else return '';
        },
        getCustomColor() {
            return this.customColor ? 'background:' + this.customColor : '';
        },
        getCustomColor2() {
            return this.customColor ? '--bg-color:' + this.customColor : '';
        },
    },
    created() {
        // 이미지 선로드 체크
        if (this.image) {
            this.img = new Image();
            this.img.onload = this.evt_imgLoad;
            this.img.onerror = this.evt_imgError;
            this.img.src = this.image;
        }
    },
    mounted() {
        const slotElement = this.$slots.default[0].elm;
        this.arrow_pos_x = slotElement.offsetWidth / 2;

        if (this.arrowFixed) {
            this.arrow_pos_x = 14;
        }
        if (this.click || this.toggle) {
            slotElement.addEventListener('click', this.evt_click);
        } else if (this.showFixed) {
            this.active = true;
        } else {
            slotElement.addEventListener('mouseenter', this.evt_hover);
            slotElement.addEventListener('mouseleave', this.evt_hover);
        }

        // 페이지에 새 요소 추가로 말풍선 위치 조정이 필요할 때 동작
        this.observeContentResized();

        // 클래스 변화 감지 Oberver
        this.observer = new MutationObserver(() => {
            this.set_rePos();
        });

        this.observer.observe(this.$el, { attributes: true, attributeFilter: ['class'] });

        // 요소 위치 변화 감지
        const content = document.querySelector('#content');
        this.observer.observe(content, { childList: true, characterData: true, subtree: true });

        // 스크롤바 넓이 구하기
        if (!this.getScrollWidth) {
            this.getScrollbarWidth();
        }
    },
    watch: {
        pos(val) {
            this.set_rePos();
        },
        click(val) {
            this.addTargetEvents();
        },
        toggle(val) {
            this.addTargetEvents();
        },
        active(val) {
            if (this.click || this.toggle) {
                const slotElement = this.$slots.default[0].elm;
                if (val) {
                    // document.addEventListener('click', this.evt_docClick);
                    slotElement?.classList.add('is-active');
                } else {
                    // document.removeEventListener('click', this.evt_docClick);
                    slotElement?.classList.remove('is-active');
                }
            }
        },
        image(val) {
            if (val) {
                this.imgLoading = true;
                this.imgError = false;
                this.img = new Image();
                this.img.onload = this.evt_imgLoad;
                this.img.onerror = this.evt_imgError;
                this.img.src = this.image;
            }
        },
        subject(val) {
            // if (!val && !this.htmlType) this.title = this.$slots.default[0].elm.innerText;
            // else this.title = val;
            this.title = val;
            this.set_rePos();
        },
        content(val) {
            this.set_rePos();
        },
        subcontent(val) {
            this.set_rePos();
        },
        showFixed(val) {
            this.active = val ? true : false;
            this.addTargetEvents();
        },
    },
    methods: {
        getStyle() {
            const top = 'top : ' + this.pos_top + 'px;';
            const left = 'left : ' + this.pos_left + 'px;';
            const staticStyle = this.$vnode.data.staticStyle || this.$vnode.data.normalizedStyle;
            let wid = 'width : ' + (staticStyle && staticStyle.width ? staticStyle.width : 'max-content') + ';';
            let mw = 'max-width : ' + (staticStyle && staticStyle['max-width'] ? staticStyle['max-width'] : this.max_wid + 'px') + ';';
            if (this.image) mw = 'auto';
            return `${top} ${left} ${mw} ${wid}`;
        },
        addTargetEvents() {
            this.$nextTick(function () {
                const slotElement = this.$slots.default[0].elm;
                slotElement.removeEventListener('click', this.evt_click);
                slotElement.removeEventListener('mouseenter', this.evt_hover);
                slotElement.removeEventListener('mouseleave', this.evt_hover);

                if (this.click || this.toggle) {
                    slotElement.addEventListener('click', this.evt_click);
                } else if (this.showFixed) {
                    this.active = true;
                } else {
                    slotElement.addEventListener('mouseenter', this.evt_hover);
                    slotElement.addEventListener('mouseleave', this.evt_hover);
                }
            });
        },
        getScrollbarWidth() {
            // 스크롤바 넓이 구할 임시 요소 만들기
            const div = document.createElement('div');

            // div 숨기도록 스타일 설정
            div.style.width = '100px';
            div.style.height = '100px';
            div.style.position = 'absolute';
            div.style.top = '-9999px';
            div.style.overflow = 'scroll';

            document.body.appendChild(div);

            // 스크롤 넓이 저장
            const width = div.offsetWidth - div.clientWidth;
            this.$store.commit('setting/SET_SCROLLWIDTH', width);

            // body에서 div 제거
            document.body.removeChild(div);
        },
        // 페이지에 새 요소 추가로 말풍선 위치 조정이 필요할 때 동작
        observeContentResized() {
            const content = document.querySelector('#content');
            const aside = document.querySelector('aside');

            // ResizeObserver 인스턴스 만들어서 할당
            this.resizeObserver = new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    // #content의 크기가 변경되었을때 말풍선 위치 재조정
                    // aside가 있으면 aside 크기가 변경되었을때 말풍선 위치 재조정
                    if (entry.target === content || (aside && entry.target === aside)) {
                        this.set_rePos();
                    }
                });
            });
            // content 관찰 시작
            this.resizeObserver.observe(content);

            // aside 관찰 시작
            if (aside) this.resizeObserver.observe(aside);
        },
        evt_resizeScroll(e) {
            if (!this.showFixed) this.active = false;
            else this.set_rePos();
        },

        /**
         *
         * 250113
         * showFixed 값에 따라 처리
         *
         * 기존 사용 방법 true, false, null
         *
         * true : 툴팁 고정
         * false : 툴팁 제거상태
         * null(default) : 툴팁 on/off 처리 가능
         *
         * content, subcontent, htmlType, title, image 값 없어도 스타일이 적용 되는 문제 생겨 template 영역에 if 조건문 추가
         *
         */

        evt_hover(evt) {
            if (this.showFixed != null) {
                return false;
            } else {
                // null 일 경우에도 content, subcontent, htmlType, title, image props 전달 값이 없는 경우 안보여지도록

                this.active = evt.type === 'mouseenter';
            }
        },
        evt_click() {
            this.active = !this.active;
        },
        evt_docClick(evt) {
            this.active = false;
            // if (!this.$el.contains(evt.target)) this.active = false;
        },
        set_rePos() {
            this.$nextTick(() => {
                const slotElement = this.$slots.default[0].elm;
                const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                const windowScrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

                if (this.pos.indexOf('T') >= 0) this.pos_top = slotElement.getBoundingClientRect().top + window.scrollY - windowScrollTop - 4;
                else if (this.pos.indexOf('M') >= 0) this.pos_top = slotElement.getBoundingClientRect().top + window.scrollY - windowScrollTop - 4 + slotElement.offsetHeight / 2;
                else if (this.pos.indexOf('B') >= 0) this.pos_top = slotElement.getBoundingClientRect().top + window.scrollY - windowScrollTop + slotElement.offsetHeight + 4;

                if (this.$refs.bubble?.offsetWidth > slotElement.getBoundingClientRect().width) {
                    if (this.pos.indexOf('L') >= 0) {
                        this.arrow_pos_x = slotElement.offsetWidth / 2 + 6;
                        this.pos_left = slotElement.getBoundingClientRect().left - window.scrollX + windowScrollLeft - 6;
                    } else if (this.pos.indexOf('R') >= 0) {
                        this.arrow_pos_x = slotElement.offsetWidth / 2 + 6;
                        this.pos_left = slotElement.getBoundingClientRect().left + slotElement.getBoundingClientRect().width - this.$refs.bubble?.getBoundingClientRect().width - window.scrollX + windowScrollLeft + 6;
                    } else if (this.pos.indexOf('C') >= 0) {
                        this.pos_left = slotElement.getBoundingClientRect().left + slotElement.offsetWidth / 2;
                    }
                } else {
                    if (this.pos.indexOf('L') >= 0) {
                        this.arrow_pos_x = 15;
                        this.pos_left = slotElement.getBoundingClientRect().left;
                    } else if (this.pos.indexOf('R') >= 0) {
                        this.arrow_pos_x = 15;
                        this.pos_left = slotElement.getBoundingClientRect().left + slotElement.getBoundingClientRect().width - this.$refs.bubble?.getBoundingClientRect().width;
                    } else if (this.pos.indexOf('C') >= 0) {
                        this.pos_left = slotElement.getBoundingClientRect().left + slotElement.offsetWidth / 2;
                    }
                }

                if (this.pos == 'L' || this.pos == 'R') {
                    this.pos_top = slotElement.getBoundingClientRect().top + window.pageYOffset - windowScrollTop + (slotElement.offsetHeight / 2 - this.$refs.bubble?.offsetHeight / 2);
                    if (this.pos == 'L') this.pos_left = slotElement.getBoundingClientRect().left - this.$refs.bubble?.offsetWidth / 2 - 10;
                    if (this.pos == 'R') this.pos_left = slotElement.getBoundingClientRect().left + slotElement.offsetWidth + this.$refs.bubble?.offsetWidth / 2;
                    // if (this.pos == 'L') this.pos_left = slotElement.getBoundingClientRect().left - (window.scrollX || window.pageXOffset) - this.$refs.bubble?.offsetWidth / 2 - this.getScrollWidth;
                    // if (this.pos == 'R') this.pos_left = slotElement.getBoundingClientRect().left + slotElement.offsetWidth - window.scrollX + this.$refs.bubble?.offsetWidth / 2;
                }

                if (this.$vnode.data.staticStyle && this.$vnode.data.staticClass == 'is-board' && !this.$vnode.data.staticStyle.width) this.max_wid = this.$el.parentNode?.offsetWidth;
            });
        },
        evt_imgLoad() {
            this.imgLoading = true;
        },
        evt_imgLoadComplete() {
            this.imgLoading = false;
            this.set_rePos();
        },
        evt_imgError() {
            this.imgError = true;
        },
    },
    beforeDestroy() {
        // 메모리 누수 방지를 위해 이벤트 해제
        const slotElement = this.$slots.default[0].elm;
        slotElement.removeEventListener('click', this.evt_click);
        slotElement.removeEventListener('mouseenter', this.evt_hover);
        slotElement.removeEventListener('mouseleave', this.evt_hover);

        // document.removeEventListener('click', this.evt_docClick);

        if (this.resizeObserver) this.resizeObserver.disconnect();
    },
    directives: {
        // 달력 Insereted
        init: {
            inserted(el, binding, vnode) {
                vnode.context.set_rePos();
            },
        },
    },
};
</script>
