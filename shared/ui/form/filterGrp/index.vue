<template>
    <div class="ui-filter-grp" :class="{ 'is-expanded': isExpanded }">
        <div v-if="$slots.title || $slots.custom" ref="title" class="sortable-handle title-wrap" :class="{ 'is-active': isExpanded, title: !$slots.custom }" @click.stop="evt_click" :disabled="disabled">
            <slot name="title"></slot>
            <slot name="custom"></slot>
        </div>

        <transition :name="getTransitionName">
            <div v-if="isExpanded" ref="items_wrap" class="items_wrap" :style="getItemsWrapPos" v-init v-click-outside="evt_docClick" v-behavior-scroll-resize="evt_resizeScroll">
                <div v-if="pos.indexOf('O') >= 0 || (popoverLabel && popoverLabel.trim().length)" :class="[{ title: !$slots.custom }, { 'only-title': popoverLabel }]">
                    <template v-if="popoverLabel && popoverLabel.trim().length">
                        {{ popoverLabel }}
                    </template>
                    <template v-else>
                        <slot name="title"></slot>
                        <slot name="custom"></slot>
                    </template>
                </div>
                <template>
                    <div class="items">
                        <slot name="items" :onClick="hndl_close"></slot>
                    </div>
                </template>
                <div class="btns" v-if="useBtns">
                    <comp-button v-if="isEvtConfirm" class="is-small is-color-black" :disabled="disableConfirmBtn" @click.stop="evt_confirm"
                        ><span class="txt">{{ confirmLabel }}</span></comp-button
                    >
                    <comp-button class="is-small" @click.stop="hndl_close"
                        ><span class="txt">{{ getCloseBtnTxt }}</span></comp-button
                    >
                    <comp-button v-if="isEvtRemove" class="is-small" @click.stop="evt_remove" customColor="#ff0000"><span class="txt">삭제</span></comp-button>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import $ from 'jquery';

export default {
    name: 'comp-filter-grp',
    data() {
        return {
            isExpanded: false,
            isEvtConfirm: false,
            isEvtRemove: false,
            itemBounding: null, // ref > ItemWrap의 getBoundingClientRect()
            itemsMarginLeft: 0,
            posTop: 0,
        };
    },
    props: {
        pos: { type: String, default: 'BC' },
        enabled: { type: Boolean, default: true },
        disabled: { type: Boolean },
        disableConfirmBtn: { type: Boolean, default: false },
        // noIconShow: { type: Boolean, default: false },
        getNoIconWrapPos: {},
        useBtns: { type: Boolean, default: true }, //btn_box 사용여부
        confirmLabel: { type: String, default: '적용' },
        popoverLabel: { type: String, default: '' },
    },
    computed: {
        getCloseBtnTxt() {
            return this.isEvtConfirm ? '취소' : '닫기';
        },
        getTransitionName() {
            if (this.pos == 'L') return 'filter_grp_left';
            if (this.pos == 'R') return 'filter_grp_right';
            return 'filter_grp';
        },
        getItemsWrapPos() {
            if (this.getNoIconWrapPos) return this.getNoIconWrapPos;

            if (!this.isExpanded || !this.itemBounding) return 0;

            const space = 0;
            const tgPos = this.$refs.title?.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let pos = {
                top: parseInt(tgPos.top),
                left: parseInt(tgPos.left),
            };
            switch (this.pos) {
                case 'OL':
                    pos.top = `${pos.top - space}px`;
                    pos.left = `${pos.left - space}px`;
                    break;
                case 'OC':
                    pos.top = `${pos.top - space}px`;
                    pos.left = `${pos.left + parseInt(tgPos.width / 2)}px`;
                    pos['margin-left'] = `${this.itemsMarginLeft}px`;
                    break;
                case 'OR':
                    pos.top = `${pos.top - space}px`;
                    pos.left = `${parseInt(tgPos.left + tgPos.width - this.itemBounding.width + space)}px`;
                    break;
                case 'BL':
                    pos.top = `${pos.top + tgPos.height + 1}px`;
                    pos.left = `${parseInt(pos.left)}px`;
                    break;
                case 'BR':
                    pos.top = `${pos.top + tgPos.height + 1}px`;
                    pos.left = `${parseInt(pos.left + tgPos.width - this.itemBounding.width)}px`;
                    break;
                case 'BC':
                    pos.top = `${pos.top + tgPos.height + 1}px`;
                    pos.left = `${pos.left + parseInt(tgPos.width / 2)}px`;
                    pos['margin-left'] = `${this.itemsMarginLeft}px`;
                    break;
                case 'R':
                    pos.top = `${pos.top}px`;
                    pos.left = `${parseInt(pos.left + tgPos.width + 1)}px`;
                    break;
                case 'L':
                    pos.top = `${pos.top}px`;
                    pos.left = `${parseInt(pos.left - this.itemBounding.width + 1)}px`;
                    break;
            }

            // 화면 우측 경계 체크 및 조정
            const rightEdge = parseInt(pos.left) + this.itemBounding.width;
            if (rightEdge > windowWidth) {
                // 우측이 넘어가는 경우
                if (this.pos === 'BC' || this.pos === 'OC') {
                    // 중앙 정렬인 경우 margin-left 조정
                    const overflow = rightEdge - windowWidth;
                    pos['margin-left'] = `${this.itemsMarginLeft - overflow}px`;
                } else {
                    // 그 외의 경우 left 값 직접 조정
                    pos.left = `${windowWidth - this.itemBounding.width - 20}px`;
                }
            }

            // 화면 좌측 경계 체크 및 조정
            const leftEdge = parseInt(pos.left);
            if (leftEdge < 0) {
                if (this.pos === 'BC' || this.pos === 'OC') {
                    // 중앙 정렬인 경우 margin-left 조정
                    pos['margin-left'] = `${this.itemsMarginLeft - leftEdge + 20}px`;
                } else {
                    pos.left = '20px';
                }
            }

            // 화면 하단 경계 체크 및 조정
            const bottomEdge = parseInt(pos.top) + this.itemBounding.height;
            if (bottomEdge > windowHeight) {
                // 하단이 넘어가는 경우, 위로 표시
                if (this.pos.startsWith('B')) {
                    // Bottom 위치였던 경우 위로 전환
                    pos.top = `${parseInt(tgPos.top) - this.itemBounding.height - space}px`;
                } else {
                    pos.top = `${windowHeight - this.itemBounding.height - 20}px`;
                }
            }

            // 화면 상단 경계 체크 및 조정
            const topEdge = parseInt(pos.top);
            if (topEdge < 0) {
                if (this.pos.startsWith('O')) {
                    // Top 위치였던 경우 아래로 전환
                    pos.top = `${parseInt(tgPos.top) + tgPos.height + space}px`;
                } else {
                    pos.top = '20px';
                }
            }

            return pos;
        },
    },
    created() {
        if (this.$listeners.confirm) this.isEvtConfirm = true;
        if (this.$listeners.remove) this.isEvtRemove = true;
    },
    watch: {
        $listeners: {
            deep: true,
            handler(val) {
                this.isEvtConfirm = val.confirm ? true : false;
            },
        },
        isExpanded(val) {
            if (val) this.$emit('open');
            else this.$emit('close');
        },
    },
    methods: {
        evt_click(e) {
            if (!this.enabled) return;
            this.isExpanded = !this.disabled ? !this.isExpanded : this.isExpanded;
        },
        evt_confirm() {
            this.$emit('confirm', true);
            this.isExpanded = false;
        },
        evt_docClick(e) {
            this.hndl_close();
        },
        evt_resizeScroll(e) {
            this.hndl_close();
        },
        evt_remove(e) {
            this.$emit('remove');
        },
        hndl_close() {
            if (!this.isEvtConfirm) this.$emit('confirm');
            else this.$emit('cancel');
            this.isExpanded = false;
        },
        hndl_open() {
            this.isExpanded = true;
        },

        /**
         * 외부 접근 메서드
         * 팝오버 오픈/클로즈
         * @param {Boolean} val 오픈/클로즈
         */
        Set_Expanded(val) {
            if (val) this.hndl_open();
            else this.hndl_close();
        },
    },
    beforeDestroy() {},
    directives: {
        init: {
            inserted(el, binding, vnode) {
                setTimeout(() => {
                    vnode.context.itemBounding = el.getBoundingClientRect();
                    vnode.context.itemsMarginLeft = parseInt(-el.getBoundingClientRect().width / 2);
                }, 0);
            },
        },
    },
};
</script>
