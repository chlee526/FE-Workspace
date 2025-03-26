<template>
    <div class="dcp ui-select-box is-autocomplete" v-widthInit>
        <div class="wrap">
            <button ref="selectBtn" type="button" class="select-button" :class="{ 'is-expanded': isExpanded }" @click="evtClickSelectBtn" @keydown.stop="evtKeydown" :title="multiple && getTitle" :disabled="disabled"><span v-html="getSelectedName"></span></button>
            <transition name="fade_posy">
                <CompSelectList v-if="isExpanded" ref="selectList" v-model="inputKeyword" :useOpts="getUseOpts" :multiple="multiple" :useSelected.sync="useSelected" :useColor="useColor" :selectItemIdx="selectItemIdx" :disableZeroSelect="disableZeroSelect" @keyupEnter="$refs.selectBtn.focus()" @input="getInputKeyword" @keydownInput="keydownInput" @clickItem="evtClickItem" @clickConfirm="evtClickConfirm" :style="selectListStyle" v-click-outside="evtDocClick" v-behavior-scroll-resize="evtResizeScroll" v-init></CompSelectList>
            </transition>
        </div>
    </div>
</template>

<script>
import SelectBox from './index.vue';
export default {
    name: 'comp-select-box-autocomplete',
    extends: SelectBox,
    data() {
        return {
            inputKeyword: '',
            isScrollList: null,
        };
    },
    computed: {
        getUseOpts() {
            let result = structuredClone(this.opts);

            if (result.length) {
                if (this.allSelectedLabel && !this.multiple) {
                    let allCode = this.opts.filter((item) => !item.disabled).map((item) => item.code);
                    result.unshift({
                        code: allCode.join(','),
                        name: this.allSelectedLabel,
                        color: '#666',
                    });
                }

                if (this.inputKeyword.trim().length) {
                    const regex = new RegExp(this.inputKeyword.trim(), 'i');
                    result = this.opts.filter((item) => regex.test(item.name));
                }

                if (!this.notSelectedLabel && !this.allSelectedLabel && !this.value && !this.multiple) {
                    this.$emit('input', result[0].code);
                }
            }

            return result;
        },
    },

    watch: {
        isExpanded(val) {
            if (!val) {
                this.inputKeyword = '';
                setTimeout(() => {
                    this.selectItemIdx = -1;
                });
            }
        },
    },

    methods: {
        // 스크롤 대상 목록 반환
        getScrollList() {
            const refTarget = this.$refs.selectList?.$el;
            return this.isScrollList ? this.isScrollList.$el : this.multiple ? refTarget?.children[0].children[2].children[0] : refTarget?.children[1].children[0];
        },

        // 선택 아이템 코드 반환
        getSelectCode() {
            const uncheckedList = this.opts.filter((item) => this.useSelected.indexOf(item.code) < 0);

            if (this.inputKeyword.length) return this.getUseOpts[this.selectItemIdx].code;
            return this.opts.length > 10 ? uncheckedList[this.selectItemIdx].code : this.getUseOpts[this.selectItemIdx].code;
        },

        // 셀렉트 목록 아이템 개수 반환
        getSelectOptsLength() {
            const uncheckedList = this.opts.filter((item) => this.useSelected.indexOf(item.code) < 0);

            if (this.inputKeyword.length) return this.getUseOpts.length;
            return this.opts.length > 10 ? uncheckedList.length : this.getUseOpts.length;
        },

        /**
         * 입력창 키다운 이벤트
         * @param {Event} e - 키보드 이벤트 객체
         * @param {HTMLElement} scrollList - 스크롤 대상 목록
         */
        keydownInput(e, scrollList) {
            if (scrollList) this.isScrollList = scrollList;
            this.evtKeydown(e);
        },

        getInputKeyword(val) {
            this.inputKeyword = val;
        },
    },
};
</script>

<style lang="scss" scoped></style>
