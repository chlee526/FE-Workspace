<template>
    <comp-filter-grp pos="R">
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
                    <strong>미사용</strong>
                </dt>
                <dd>
                    <comp-switch-btn :id="`listgrp_disabled${dummyData.code}`" class="is-small" v-model="dummyData.disabled"></comp-switch-btn>
                </dd>
            </dl>
        </template>
    </comp-filter-grp>
</template>

<script>
export default {
    name: 'comp-list-tab',
    data() {
        return {
            dummyData: JSON.parse(JSON.stringify(this.value)),
        };
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
        dummyData: {
            deep: true,
            handler(val) {
                if (JSON.stringify(this.data) === JSON.stringify(val)) return;
                this.data = val;
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
