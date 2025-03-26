<template>
    <comp-filter-grp pos="R" class="is-small" @confirm="evt_confirm" @cancel="evt_cancel">
        <template v-slot:title>
            <template>조건 {{ itemIndex }}</template>
            <button class="btn_list_del" title="삭제" @click.stop="$emit('remove', dummyData)">삭제</button>
        </template>
        <template v-slot:items>
            <dl>
                <dt>
                    <strong>성별</strong>
                </dt>
                <dd>
                    <comp-selectbox id="gender" class="is-small" :opts="$store.getters.getGender" v-model="gender"></comp-selectbox>
                </dd>
            </dl>
            <dl>
                <dt>
                    <strong>연령</strong>
                </dt>
                <dd><comp-selectbox id="age" class="is-small" :opts="$store.getters.getAge" v-model="age"></comp-selectbox></dd>
            </dl>
        </template>
    </comp-filter-grp>
</template>

<script>
export default {
    name: 'comp-list-keyword',
    data() {
        return {
            dummyData: JSON.parse(JSON.stringify(this.value)),
            gender: null,
            age: null,
        };
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
    mounted() {
        this.gender = this.data.gender;
        this.age = this.data.age;
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
            this.$emit('confirm', { index: this.itemIndex, item: { ...this.dummyData, gender: this.gender, age: this.age } });
        },
        evt_cancel(val) {
            this.dummyData = JSON.parse(JSON.stringify(this.data));
        },
    },
};
</script>
