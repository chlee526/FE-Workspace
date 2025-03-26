<template>
    <comp-filter-grp pos="R" class="is-small" @confirm="evt_confirm" @cancel="evt_cancel">
        <template v-slot:title>
            <template v-if="data.rank !== ''">~ {{ data.rank }}{{ data.rank !== '추가 순위' ? '위' : '' }}</template>
            <template v-else>그 외</template>
            <button v-if="data.rank != ''" class="btn_list_del" title="삭제" @click.stop="$emit('remove', dummyData)">삭제</button>
        </template>
        <template v-slot:items>
            <dl>
                <dt>
                    <strong>순위</strong>
                </dt>
                <dd>
                    <comp-input-box :id="`listgrp_name_${dummyData.code}`" type="number" class="is-small" v-model="dummyData.rank" placeholder="순위" label="순위 입력" style="width: 100px"></comp-input-box>
                </dd>
            </dl>
            <dl>
                <dt>
                    <strong>컬러</strong>
                </dt>
                <dd>
                    <comp-colorpicker class="is-small" v-model="dummyData.color" />
                </dd>
            </dl>
        </template>
    </comp-filter-grp>
</template>

<script>
import CompColorPicker from '@shared/ui/form/colorPicker';

export default {
    name: 'comp-list-rank',
    data() {
        return {
            dummyData: JSON.parse(JSON.stringify(this.value)),
        };
    },
    components: {
        'comp-colorpicker': CompColorPicker,
    },
    props: {
        value: {},
        itemIndex: {},
    },
    computed: {
        data: {
            get() {
                return this.value;
            },
        },
    },

    watch: {
        value: {
            deep: true,
            handler(val) {
                this.dummyData = JSON.parse(JSON.stringify(val));
            },
        },
    },
    methods: {
        evt_confirm(val) {
            this.$emit('confirm', { index: this.itemIndex, item: { ...this.dummyData, name: this.dummyData.rank } });
        },
        evt_cancel(val) {
            this.dummyData = JSON.parse(JSON.stringify(this.data));
        },
    },
};
</script>

<style></style>
