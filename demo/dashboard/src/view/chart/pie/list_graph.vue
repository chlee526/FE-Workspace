<template>
    <comp-filter-grp pos="R" @confirm="evt_confirm" @cancel="evt_cancel">
        <template v-slot:title>
            {{ data.name }}
            <button class="btn_list_del" title="삭제" @click.stop="$emit('remove', data)">삭제</button>
        </template>
        <template v-slot:items>
            <dl>
                <dt>
                    <strong>이름</strong>
                </dt>
                <dd>
                    <comp-input-box :id="`listgrp_name_${dummyData.code}`" v-model="dummyData.name" placeholder="이름" label="이름 입력" style="width: 200px"></comp-input-box>
                </dd>
            </dl>
            <dl>
                <dt>
                    <strong>색상</strong>
                </dt>
                <dd>
                    <comp-colorpicker class="is-small" v-model="dummyData.fill" />
                </dd>
            </dl>
        </template>
    </comp-filter-grp>
</template>

<script>
import CompColorPicker from '@shared/ui/form/colorPicker';

export default {
    name: 'comp-list-graph',
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
    },
    computed: {
        data: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
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
            this.data = JSON.parse(JSON.stringify(this.dummyData));
        },
        evt_cancel(val) {
            this.dummyData = JSON.parse(JSON.stringify(this.data));
        },
    },
};
</script>

<style></style>
