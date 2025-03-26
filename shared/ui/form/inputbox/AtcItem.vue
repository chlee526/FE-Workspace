<template>
    <div class="atc_item">
        <button ref="button" @click="evt_click" @mousedown="evt_mousedown" :class="{ 'is-active-atc': index == activeAtcItemIdx }" v-html="classBind(source.value || source.name)" tabindex="-1"></button>
    </div>
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
        val: { type: String },
        activeAtcItemIdx: { type: Number },
        evt_actItem_click: { type: Function },
        getAtcItemSelect: { type: Function },
    },

    methods: {
        evt_click() {
            this.evt_actItem_click(this.$refs.button.innerText);
        },

        evt_mousedown(e) {
            this.getAtcItemSelect(e.target.parentElement);
        },

        // 자동완성 하이라이트
        classBind(val) {
            if (this.val.trim() !== '') {
                const escapedVal = this.val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(escapedVal, 'i');
                return String(val).replace(regex, '<span class="is-hl-inputkeyword">$&</span>');
            }
            return val;
        },
    },
};
</script>
