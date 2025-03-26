<template>
    <button class="item" :class="{ 'is-active': String(source.code) == String(selected), 'is-hover': index === activeSelectItemIdx, 'ui-ellipsis': useEllipsis }" :title="getTitle" :value="source.code" @click="evt_click">
        <span v-if="source.before" class="ui_icon is-before" v-html="source.before"></span>
        <span v-html="classBind(source.name)" />
        <span v-if="source.after" class="ui_icon is-after" v-html="source.after"></span>
    </button>
</template>

<script>
export default {
    name: 'comp-atcItem',
    data() {
        return {};
    },
    props: {
        index: { type: Number },
        source: { type: Object },
        searchName: { type: String },
        selected: {},
        evt_itemClick: { type: Function },
        autoComplete: { type: Boolean },
        useTitle: { type: Boolean, default: false },
        activeSelectItemIdx: { type: Number },
        useEllipsis: { type: Boolean, default: false },
    },
    computed: {
        getTitle() {
            if (this.useTitle) {
                return `${this.source.name} 선택해제`;
            }
            return this.source.name;
        },
    },
    methods: {
        evt_click(e) {
            this.evt_itemClick(e);
        },

        // 자동완성 하이라이트
        classBind(val) {
            if (this.searchName.trim() !== '' && this.autoComplete) {
                const escapedVal = this.searchName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(escapedVal, 'i');
                return String(val).replace(regex, '<span class="is-hl-inputkeyword">$&</span>');
            }
            return val;
        },
    },
};
</script>
