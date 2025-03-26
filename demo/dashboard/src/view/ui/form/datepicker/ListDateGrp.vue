<template>
    <comp-filter-grp pos="R" class="is-small" @confirm="evt_confirm" @cancel="evt_cancel">
        <template v-slot:title>
            {{ getDateGrpName(data) }}
            <button class="btn_list_del" title="그룹 삭제" @click.stop="$emit('remove', data)">삭제</button>
        </template>
        <template v-slot:items>
            <dl>
                <dt>
                    <strong>기간</strong>
                </dt>
                <dd>
                    <comp-input-box :id="`grp_${dummyData.code}_value`" type="number" class="is-small" v-model="dummyData.value" placeholder="1" :min="1" style="width: 120px"></comp-input-box>
                </dd>
            </dl>
            <dl>
                <dt>
                    <strong>단위</strong>
                </dt>
                <dd>
                    <comp-selectbox :id="`grp_${dummyData.code}_unit`" class="is-small" v-model="dummyData.unit" :opts="dateGrpUnit"></comp-selectbox>
                </dd>
            </dl>
        </template>
    </comp-filter-grp>
</template>
<script>
export default {
    name: 'comp-list-date-grp',
    data() {
        return {
            dummyData: JSON.parse(JSON.stringify(this.value)),
            dateGrpUnit: [
                { code: 'd', name: '일' },
                { code: 'BM', name: '개월' },
                { code: 'M', name: '월' },
                { code: 'BY', name: '년전' },
                { code: 'Y', name: '년' },
            ],
        };
    },
    props: {
        value: {},
    },
    watch: {
        value: {
            deep: true,
            handler(val) {
                this.dummyData = JSON.parse(JSON.stringify(val));
            },
        },
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
    methods: {
        getDateGrpName(item) {
            switch (item.unit) {
                case 'd':
                    return `${item.value}일`;
                case 'BM':
                    return `${item.value}개월`;
                case 'M':
                    return `${item.value}월`;
                case 'BY':
                    return `${item.value}년`;
                case 'Y':
                    return `${item.value}년`;
            }
        },
        evt_confirm() {
            this.data = JSON.parse(JSON.stringify(this.dummyData));
        },
        evt_cancel() {
            this.dummyData = JSON.parse(JSON.stringify(this.data));
        },
    },
};
</script>
