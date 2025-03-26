<template>
    <TransitionGroup name="fade_scale" tag="div" :class="`popup_container ${this.name && 'is-contentMode'}`" :style="getStyle">
        <component v-for="($item, idx) in modalDatas" :ref="'modal_' + idx" :is="$item.target" :pop-name="$item.target" :search-params="$item.params" :hgt="contentHgt" v-bind:key="$item.target + '-' + idx" v-bind="$item.props"></component>
    </TransitionGroup>
</template>
<script>
import EventBus from '@shared/utils/eventBus';
import { throttle } from 'lodash';

export default {
    name: 'comp-modal',
    data() {
        return {
            modalDatas: [],
            contentHgt: 0,
            contentModeStyle: {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
            },
        };
    },
    props: {
        name: { type: String, default: null },
    },
    computed: {
        getStyle() {
            let result = '';

            if (this.name === 'contentMode') {
                result = {
                    top: `${this.contentModeStyle.top}px`,
                    left: `${this.contentModeStyle.left}px`,
                    width: `${this.contentModeStyle.width}px`,
                    height: `${this.contentModeStyle.height}px`,
                };

                if (this.modalDatas.length === 0) result = {};
            }

            return result;
        },
        // 리사이즈 감지를 위한 store 감시용
        resizeWatcher() {
            return {
                lnb: this.$store.getters.getUseageLNB,
                asideWidth: this.$store.getters.getAsideWidth,
            };
        },
    },
    created() {
        EventBus.$on('MODAL_OPEN', this.modalOn);
        EventBus.$on('MODAL_CLOSE', this.modalClose);
        EventBus.$on('MODAL_CLOSE_ALL', this.modalCloseAll);
        window.addEventListener('resize', this.evt_resize);
        window.addEventListener('scroll', this.evtScroll);
    },
    beforeDestroy() {
        EventBus.$off('MODAL_OPEN', this.modalOn);
        EventBus.$off('MODAL_CLOSE', this.modalClose);
        EventBus.$off('MODAL_CLOSE_ALL', this.modalCloseAll);
        window.removeEventListener('resize', this.evt_resize);
        window.removeEventListener('scroll', this.evtScroll);
    },
    watch: {
        modalDatas() {
            const wrap = document.querySelector('#wrap');
            if (this.modalDatas.length) wrap.classList.add('is-blured');
            else wrap.classList.remove('is-blured');
        },
        resizeWatcher() {
            this.evt_resize();
        },
    },
    methods: {
        modalOn($name, $params, $props) {
            const modalName = $props?.modalName || null;

            if (this.name === modalName) {
                const newObj = {
                    target: 'tmpl-modal-' + $name,
                    params: $params,
                    props: $props,
                };

                if (this.name === 'contentMode') {
                    // 동일한 target을 가진 모달이 있는지 확인
                    const existingIndex = this.modalDatas.findIndex((item) => item.target === newObj.target);

                    if (existingIndex !== -1) {
                        // 동일한 모달이 있으면 교체
                        this.$set(this.modalDatas, existingIndex, newObj);
                    } else {
                        // 동일한 모달이 없으면 새로 추가
                        this.modalDatas.splice(this.modalDatas.length, 0, newObj);
                    }
                } else {
                    this.modalDatas.splice(this.modalDatas.length, 0, newObj);
                }

                this.$nextTick(() => {
                    this.evt_resize();
                });
            }
        },
        modalClose($name) {
            this.modalDatas.splice(this.modalDatas.indexOf($name), 1);
        },
        modalCloseAll() {
            this.modalDatas = [];
        },
        setWrapElStyle() {
            const result = {};

            this.$nextTick(() => {
                const wrapEl = this.$el.querySelector('.wrap');
                if (wrapEl) {
                    if (this.name === 'contentMode') {
                        Object.assign(wrapEl.style, {
                            top: `${this.contentModeStyle.top}px`,
                            left: `${this.contentModeStyle.left}px`,
                            width: `${this.contentModeStyle.width}px`,
                            height: `${this.contentModeStyle.height}px`,
                        });
                    }
                }
            });
        },
        evt_resize() {
            this.contentHgt = window.innerHeight;

            if (this.name === 'contentMode') {
                const elLocator = document.querySelector('#locator');
                const elContainer = document.querySelector('#container');
                const scrollY = window.pageYOffset || window.scrollY;

                const boundRect = {
                    top: elContainer.getBoundingClientRect().top + scrollY,
                    left: elContainer.getBoundingClientRect().left,
                    width: elContainer.getBoundingClientRect().width - (this.$store.getters.getAsideWidth || 0),
                    height: Math.min(window.innerHeight - elContainer.getBoundingClientRect().top, elContainer.getBoundingClientRect().height) - scrollY,
                    // height: elContainer.getBoundingClientRect().height - (elContainer.getBoundingClientRect().top + scrollY),
                };

                if (elLocator) {
                    boundRect.top = elLocator.getBoundingClientRect().top + scrollY;
                    boundRect.height = boundRect.height + elLocator.getBoundingClientRect().height;
                    // boundRect.height = Math.min(window.innerHeight - elLocator.getBoundingClientRect().top, elContainer.getBoundingClientRect().height) - scrollY;
                    // height: elContainer.getBoundingClientRect().height - (elContainer.getBoundingClientRect().top + scrollY),
                }

                this.contentModeStyle = boundRect;

                this.setWrapElStyle();
            }
        },
        evtScroll: throttle(function () {
            if (this.$el.children[0]) this.$el.children[0].style.marginLeft = `${-window.scrollX}px`;
        }, 0),
    },
};
</script>
