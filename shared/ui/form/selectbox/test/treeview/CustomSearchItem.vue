<template>
    <div class="select-box-treeview-search" :class="{ 'is-more-then-10': optsLength > 10 }">
        <comp-input-box type="search" class="is-small" v-model="inputText" placeholder="검색어 입력" focusResetVisible @search="inputSearchClick(inputText)"></comp-input-box>

        <div v-if="isMulti" class="is-header">
            <div class="tops">
                <comp-button class="is-small" @click="nodeInstance.event.allSelect()"><span class="txt">전체 선택</span></comp-button>
                <span v-if="optsLength > 10"
                    >총<strong>{{ checkedList.length }}</strong
                    >건</span
                >
            </div>
            <virtual-list v-if="optsLength > 10" class="select-virtual-list" :data-sources="checkedList" data-key="code" :data-component="{}">
                <template v-slot:item="{ item }">
                    <button class="select-item" @click.stop="nodeInstance.event.unSelect(item)" title="선택해제">
                        <span v-if="item.before" class="icon is-before" v-html="item.before"></span>
                        <span>{{ item.name }}</span>
                        <span v-if="item.after" class="icon is-after" v-html="item.after"></span>
                    </button>
                </template>
            </virtual-list>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tree-view-search-item',
    data() {
        return {
            inputText: '', // 검색 키워드
            isMulti: this.nodeInstance.prop.multiple, // 멀티 여부
            optsLength: this.nodeInstance.prop.optsLength, // 옵션 아이템 개수
            checkedList: this.nodeInstance.prop.checkedList, // 멀티 일 경우 선택된 아이템 리스트
        };
    },
    props: {
        nodeInstance: {},
    },
    computed: {
        source: {
            get() {
                return this.value;
            },
            set(val) {},
        },
    },
    watch: {
        source: {
            deep: true,
            handler(val) {
                this.inputKeyword = val.name;
            },
        },

        nodeInstance: {
            deep: true,
            handler(val) {
                this.checkedList = val.prop.checkedList;
                this.optsLength = val.prop.optsLength;
                this.isMulti = val.prop.multiple;
            },
        },
    },
    methods: {
        inputSearchClick(searchName) {
            this.$emit('search', searchName);
        },

        evtClickAllSelect() {
            this.$emit('allSelect');
        },
    },
};
</script>
