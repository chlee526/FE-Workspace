<template>
    <div class="dcp ui-select-box" v-widthInit>
        <div class="wrap">
            <button ref="selectBtn" type="button" class="select-button" :class="{ 'is-expanded': isExpanded }" @mousedown.stop="evtClickSelectBtn" @keydown.stop="evtKeydown" :title="multiple && getTitle" :disabled="disabled"><span v-html="getSelectedName"></span></button>
            <transition name="fade_posy">
                <CompSelectList v-if="isExpanded" :useSelected.sync="useSelected" :useOpts="getUseOpts" :multiple="multiple" :disableZeroSelect="disableZeroSelect" :functionFlattenOpts="flattenOpts" @click="evtClickItem" @clickConfirm="evtClickConfirm" :style="selectListStyle" v-click-outside="evtDocClick" v-behavior-scroll-resize="evtResizeScroll" v-init> </CompSelectList>
            </transition>
        </div>
    </div>
</template>

<script>
import SelectBox from '../index.vue';

import CompSelectList from './CompSelectList.vue';

export default {
    name: 'comp-select-box-treeview',
    extends: SelectBox,
    data() {
        return {
            selectListStyle: {}, // 셀렉트 목록 wrapper 스타일 설정
        };
    },
    components: { CompSelectList },
    computed: {
        selected: {
            get() {
                return this.value;
            },
            set(val) {
                if (val.length) {
                    this.useSelected = val;
                    this.$emit('input', val);
                } else {
                    this.$emit('input', '');
                }
            },
        },

        getUseOpts() {
            return structuredClone(this.opts);
        },

        /**
         * 현재 선택된 아이템 이름 반환 함수
         * @returns {String} 현재 선택된 아이템 이름
         */
        getSelectedName() {
            if (!this.multiple) {
                // 단일
                const selectedItem = this.flattenOpts(this.getUseOpts).find((item) => String(item.code) === String(this.selected));
                return selectedItem ? this.getSelectedItemName(selectedItem) : this.notSelectedLabel || '선택하세요';
            } else {
                // 멀티
                const selectedItems = this.flattenOpts(this.getUseOpts).filter((opt) => this.selected?.split(',').includes(String(opt.code)));
                return selectedItems.length > 0 ? this.getSelectedItemsName(selectedItems) : this.notSelectedLabel || '선택하세요';
            }
        },

        /**
         * 멀티일 경우, 선택된 전체 아이템 이름 반환 함수. 셀렉트 버튼 타이틀에 보여짐
         * @returns {String} 현선택된 전체 아이템 이름
         */
        getTitle() {
            const items = this.flattenOpts(this.getUseOpts).filter((opt) => this.selected?.split(',').includes(String(opt.code)));
            return !items.length ? '' : `총 ${items.length}개 / ${items.arrObjAttrToStr('name', '')}`;
        },
    },

    created() {
        if (this.allSelectedLabel && !this.value && this.multiple) {
            // 전체 아이템 선택 처리
            this.selected = this.flattenOpts(this.opts).arrObjAttrToStr('code');
        }
    },

    methods: {
        /**
         * 아이템 클릭 함수
         * @returns {Object} 클릭한 아이템
         */
        evtClickItem(item) {
            if (!this.multiple) {
                this.selected = String(item.code);
                this.isExpanded = false;
            }
        },

        // 셀렉트 버튼 클릭
        evtClickSelectBtn() {
            this.isExpanded = !this.isExpanded;
            this.useSelected = this.selected ? this.selected : '';
            this.$emit('click');
        },

        /**
         * 중첩된 옵션 배열 평탄화 함수
         * @param {Array} opts - 중첩된 옵션 배열.
         * @returns {Array} 평탄화된 옵션 배열.
         */
        flattenOpts(opts) {
            let result = [];

            opts.forEach((item) => {
                result.push(item);
                if (item.children) {
                    result = result.concat(this.flattenOpts(item.children));
                }
            });

            return result;
        },

        // 적용 버튼 클릭
        evtClickConfirm() {
            this.selected = this.useSelected ? this.useSelected : '';
            this.isExpanded = false;
        },

        // 셀렉트 리스트 wrapper 스타일 설정
        getSelectListStyle() {
            const target = this.$refs?.selectBtn.getBoundingClientRect();
            this.selectListStyle = { minWidth: target.width + 'px', top: target.bottom + 'px', left: target.left + 'px' };
        },
    },
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
