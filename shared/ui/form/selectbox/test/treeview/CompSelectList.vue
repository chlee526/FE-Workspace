<template>
    <div class="select-list-wrap">
        <tree-view class="select-box-treeview" :class="{ 'is-multi': multiple }" v-model="copySelected" :opts="useOpts" selectBox :nodeInstance="getNodeInstance" :editType="false" :multiple="multiple" :maxNode="getChildDepth" @click="evtClickItem"> </tree-view>
        <div v-if="multiple" class="is-footer">
            <comp-button class="is-small is-icon-only" title="선택초기화" @click.stop="evtClickReset"><span class="icon">&#xe020;</span></comp-button>
            <comp-button class="is-small is-color-black" :disabled="disableZeroSelect && !useSelected.length" @click.stop="evtClickConfirm"><span class="txt">적용</span></comp-button>
        </div>
    </div>
</template>

<script>
import TreeviewItem from './CustomItem.vue';
import TreeviewSearchItem from './CustomSearchItem.vue';

export default {
    name: 'comp-select-list-treeview',
    data() {
        return {
            copySelected: this.useSelected,
        };
    },
    props: {
        useOpts: { type: Array, required: true }, // 옵션 목록
        useSelected: { type: String, required: true }, // 선택 아이템 코드
        multiple: { type: Boolean, required: true }, // 멀티 여부
        disableZeroSelect: { type: Boolean, required: true }, // true: 선택 값 최소 한개이상. 미만일 경우 적용 버튼 disabled
        functionFlattenOpts: { type: Function, required: true }, // 중첩된 옵션 평탄화 함수
    },
    computed: {
        // 트리뷰 컴포넌트 커스텀 인스턴스 설정
        getNodeInstance() {
            return {
                component: { nodeCustom: TreeviewItem, searchCustom: TreeviewSearchItem },
                prop: { multiple: this.multiple, optsLength: this.functionFlattenOpts(this.useOpts).length, checkedList: structuredClone(this.getCheckedList) },
                event: { allSelect: this.evtAllSelect, unSelect: this.evtUnSelect },
            };
        },

        // 트리뷰 최대 노드 값 반환
        getChildDepth() {
            return Math.max(...this.useOpts.map((item) => this.calculateDepth(item, 0))) + 1;
        },

        // 선택된 아이템 목록 반환
        getCheckedList() {
            const arrSelected = this.useSelected?.split(',');
            const result = [];

            this.functionFlattenOpts(this.useOpts).filter((item) => {
                if (arrSelected.indexOf(String(item.code)) >= 0) {
                    result.push(structuredClone(item));
                }
            });
            return result;
        },
    },

    watch: {
        useSelected(val) {
            this.copySelected = val;
        },

        copySelected(val) {
            this.$emit('update:useSelected', val);
        },
    },
    methods: {
        /**
         * children 속성 최대 뎁스 계산
         * @param {Object} item - 계산할 아이템
         * @param {number} depth - 현재 아이템의 뎁스
         * @returns {number} 최대 뎁스
         */
        calculateDepth(item, depth) {
            if (!item.children || item.children.length === 0) return depth;

            const childDepths = item.children.map((child) => this.calculateDepth(child, depth + 1));
            return Math.max(...childDepths);
        },

        // 셀렉트 아이템 클릭
        evtClickItem(item) {
            this.$emit('click', item);
        },

        // 전체 선택 버튼 클릭
        evtAllSelect() {
            this.copySelected = this.functionFlattenOpts(this.useOpts)
                .map((item) => String(item.code))
                .join();
        },

        /**
         * 셀렉트 아이템 선택해제 함수
         * @param {Object} item - 선택 해제할 아이템
         */
        evtUnSelect(item) {
            let dupSelected = this.copySelected.length ? structuredClone(this.copySelected.split(',')) : [];
            const itemCodeIndex = dupSelected.indexOf(String(item.code));

            if (itemCodeIndex !== -1) {
                dupSelected.splice(itemCodeIndex, 1);
                this.copySelected = dupSelected.join(',');
            }
        },

        // 적용 버튼 클릭
        evtClickConfirm() {
            this.$emit('clickConfirm');
        },

        // 초기화 버튼 클릭
        evtClickReset() {
            this.copySelected = '';
        },
    },
};
</script>

<style lang="scss" scoped></style>
