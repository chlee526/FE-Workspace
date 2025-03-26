<template>
    <div class="ui_color_picker" :class="{ 'is-expanded': isExpanded, 'is-disabled': disabled != false }">
        <div class="color_picker_exPanded">
            <!-- <button ref="title" type="button" v-if="colors == ''" class="color_picker_btn" @click="isExpanded = !isExpanded" :disabled="isDisabled" :style="getStyle"><span class="icon">&#xe019;</span></button> -->
            <button ref="title" type="button" v-if="colors == ''" class="color_picker_btn is-none" @click="isExpanded = !isExpanded" :disabled="isDisabled" :style="getStyle"><span :style="isNone"></span></button>
            <button ref="title" type="button" v-else :disabled="isDisabled" class="color_picker_btn" :style="getStyle" @click="isExpanded = !isExpanded" />
        </div>
        <transition :name="getTransitionName">
            <div ref="items_wrap" v-if="isExpanded" class="items_wrap" :style="getItemsWrapPos" v-init v-click-outside="evt_docClick" v-behavior-scroll-resize="evt_resizeScroll">
                <chrome-picker :disableAlpha="true" :value="colors" @input="updateValue"></chrome-picker>
                <div class="btns">
                    <comp-button v-if="useConfirm" class="is-small is-color-black" @click="evt_confirm">적용</comp-button>
                    <comp-button class="is-small" @click="hndl_close">{{ useConfirm ? '취소' : '닫기' }}</comp-button>
                    <comp-button v-if="useReset" class="is-small" @click="resetColor">선택없음</comp-button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { Chrome } from 'vue-color';
import $ from 'jquery';
export default {
    name: 'comp-color-picker',
    data() {
        return {
            fixedColor: '',
            colors: this.value ? this.value : '',
            isExpanded: false,
            itemsMarginLeft: 0,
            itemBounding: null, // ref > ItemWrap의 getBoundingClientRect()
            parentChck: null,
            pos_top: 0,
            pos_left: 0,
            clickTarget: null,
        };
    },
    props: {
        value: { type: String, default: '' },
        useConfirm: { type: Boolean, default: true },
        useReset: { type: Boolean, default: false },
        setPosition: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        pos: { type: String, default: 'BL' },
        useEnter: { type: Boolean, default: true },
    },

    computed: {
        isDisabled() {
            return this.disabled === true;
        },
        isNone() {
            let style = `background-color: #eb8383; transform: rotate(45deg); width: 2px; height: 100%;`;
            if (this.isDisabled) style = '';
            return style;
        },
        getStyle() {
            let style = this.$vnode.data.style ? this.$vnode.data.style : '';

            style += `color: ${this.colors};`;

            style += `background-color: rgba(${this.colors.hexToRgb()}, 1);`;

            return style;
        },
        getTransitionName() {
            if (this.pos == 'L') return 'filter_grp_left';
            if (this.pos == 'R') return 'filter_grp_right';
            return 'filter_grp';
        },
        getItemsWrapPos() {
            if (!this.isExpanded || !this.itemBounding) return 0;

            const space = 0;
            const tgPos = this.$refs.title?.getBoundingClientRect();
            const itemsWrap = this.$refs.items_wrap?.getBoundingClientRect();
            let pos = {
                top: this.setPosition ? this.pos_top : parseInt(tgPos.top),
                left: this.setPosition ? this.pos_left : parseInt(tgPos.left),
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
                    pos.top = this.setPosition ? `${pos.top}px` : `${pos.top + tgPos.height + 1}px`;
                    pos.left = this.setPosition ? `${pos.left}px` : `${parseInt(pos.left)}px`;
                    break;
                case 'BR':
                    pos.top = this.setPosition ? `${pos.top}px` : `${pos.top + tgPos.height + 1}px`;
                    pos.left = this.setPosition ? `${pos.left}px` : `${parseInt(pos.left + tgPos.width - this.itemBounding.width)}px`;
                    break;
                case 'BC':
                    pos.top = this.setPosition ? `${pos.top}px` : `${pos.top + tgPos.height + 1}px`;
                    pos.left = this.setPosition ? `${pos.left}px` : `${pos.left + parseInt(tgPos.width / 2)}px`;
                    pos['margin-left'] = `${this.itemsMarginLeft}px`;
                    break;
                case 'TL':
                    pos.top = this.setPosition ? `${pos.top}px` : `${pos.top - tgPos.height - 1}px`;
                    pos.left = this.setPosition ? `${pos.left}px` : `${parseInt(pos.left)}px`;
                    break;
                case 'TR':
                    pos.top = this.setPosition ? `${pos.top}px` : `${pos.top - tgPos.height - 1}px`;
                    pos.left = this.setPosition ? `${pos.left}px` : `${parseInt(pos.left + tgPos.width - this.itemBounding.width)}px`;
                    break;
                case 'TC':
                    pos.top = this.setPosition ? `${pos.top}px` : `${pos.top - tgPos.height - 1}px`;
                    pos.left = this.setPosition ? `${pos.left}px` : `${pos.left + parseInt(tgPos.width / 2)}px`;
                    pos['margin-left'] = `${this.itemsMarginLeft}px`;
                    break;
                case 'R':
                    pos.top = `${pos.top}px`;
                    pos.left = this.setPosition ? `${pos.left}px` : `${parseInt(pos.left + tgPos.width + 1)}px`;
                    break;
            }
            // return this.$refs.title?.getBoundingClientRect() || 0;

            return pos;
        },
    },
    components: { 'chrome-picker': Chrome },
    mounted() {},
    watch: {
        value(val) {
            this.colors = val;
        },
        isExpanded(val) {
            if (val && this.useEnter == true) {
                window.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.code === 'Enter') {
                        this.enterEvent();
                    }
                });
            } else {
                window.removeEventListener('keydown', this.enterEvent);
            }
        },
    },
    methods: {
        enterEvent(e) {
            this.evt_confirm();
        },
        resetColor(e) {
            this.fixedColor = '';
            this.$emit('input', this.fixedColor);
            this.hndl_close();
        },
        updateValue(e) {
            if (this.useConfirm) {
                this.fixedColor = e.hex;
            } else {
                this.colors = e.hex;
                this.$emit('input', this.colors);
            }
        },
        hndl_close(e) {
            // if (this.useConfirm) this.colors = this.color;
            this.isExpanded = false;
        },
        evt_docClick(e) {
            if (this.useConfirm) {
                this.hndl_close(e);
            } else {
                this.evt_confirm(e);
            }
        },
        // Scroll or Resize
        evt_resizeScroll(e) {
            if (this.useConfirm) {
                this.hndl_close(e);
            } else {
                this.evt_confirm(e);
            }
        },
        evt_confirm(e) {
            if (this.useConfirm) {
                this.colors = this.fixedColor;
            }

            this.$emit('input', this.colors);
            // this.$emit('confirm', this.colors);
            this.hndl_close();
        },
        evt_resize(e) {
            this.isExpanded = false;
        },
        set_rePos() {
            if (this.isExpanded) {
                this.pos_top = $(this.$refs.title).offset().top - $(document).scrollTop() + $(this.$refs.title).outerHeight();

                this.pos_left = $(this.$refs.title).offset().left - $(document).scrollLeft();

                if (this.pos_top + $(this.$refs.items_wrap).outerHeight() > $(window).height()) {
                    this.pos_top -= $(this.$refs.items_wrap).outerHeight() + $(this.$refs.title).outerHeight() + 2;
                }

                if (this.pos_left + $(this.$refs.items_wrap).outerWidth() > $(window).width()) {
                    this.pos_left -= $(this.$refs.items_wrap).outerWidth() - $(this.$refs.title).outerWidth();
                }
            }
        },
    },
    directives: {
        init: {
            inserted(el, evt, vnode) {
                vnode.context.itemBounding = el.getBoundingClientRect();
                vnode.context.itemsMarginLeft = parseInt(-el.getBoundingClientRect().width / 2);
                vnode.context.set_rePos();
            },
        },
    },
    beforeDestroy() {},
};
</script>

<style></style>
