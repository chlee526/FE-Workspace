<template>
    <div class="ui-btn-grp">
        <comp-filter-grp ref="filter_grp" :pos="pos" :disabled="disabled" :disableConfirmBtn="disableConfirmBtn" :useBtns="useBtns">
            <template #custom>
                <slot name="title" />
            </template>

            <template #items="{ onClick }">
                <slot name="items" :onClick="onClick" />
            </template>
        </comp-filter-grp>
    </div>
</template>

<script>
export default {
    name: 'comp-button-grp',
    data() {
        return {};
    },
    props: {
        pos: { type: String, default: 'BC' },
        disabled: { type: Boolean },
        disableConfirmBtn: { type: Boolean, default: false },
        useBtns: { type: Boolean, default: true },
    },
    methods: {
        /**
         * 외부 접근 메서드
         * 팝오버 오픈/클로즈
         * @param {Boolean} val 오픈/클로즈
         */
        Set_Expanded(val) {
            this.$refs.filter_grp.Set_Expanded(val);
        },
    },
};
</script>
