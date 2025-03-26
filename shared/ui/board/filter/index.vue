<template>
    <div class="ui-table-filter">
        <comp-filter-grp class="is-small is-table-title" pos="OC" @confirm="evtConfirm" @cancel="evtCloseClick" :disableConfirmBtn="multi && disableZeroValue && selectedValueArr.length === 0" :isBoard="true">
            <template v-slot:custom>
                <div class="is-table-title">
                    <strong>{{ name }}</strong>
                    <span class="selected-label" :title="getSelectedLabel('all')">{{ !getSelectedLabel() ? `( ${name} 없음 )` : `( ${getSelectedLabel()} )` }}</span>
                    <comp-button v-if="multi" class="is-xsmall all-select-btn" @click="evtAllSelectClick"><span class="txt">전체선택</span></comp-button>
                </div>
            </template>

            <template v-if="opts" v-slot:items>
                <dl v-for="(item, idx) in opts" :key="`${item}_${idx}`">
                    <dt>{{ item.name }}</dt>
                    <dd>
                        <comp-switch-btn v-if="!multi" :id="`switch_${idx}`" :key="item.code" radio-grp="switch_radio" class="switch-btn is-xsmall" v-model="selectedValue" :val="item.code"></comp-switch-btn>

                        <comp-switch-btn v-else :id="`switch_${idx}`" :key="item.code" class="switch-btn is-xsmall" v-model="selectedValueArr" :val="item.code"></comp-switch-btn>
                    </dd>
                </dl>
            </template>
        </comp-filter-grp>
    </div>
</template>

<script>
export default {
    name: 'comp-table-filter',

    data() {
        return {
            selectedValue: this.value,
            selectedValueArr: null,
        };
    },
    props: {
        id: {},
        name: { type: String },
        value: {},
        opts: { type: Array, default: null },
        multi: { type: Boolean, default: false },
        disableZeroValue: { type: Boolean, default: true }, // 멀티선택 일 경우 선택된 값이 없을 경우 적용 버튼 비활성화 여부
        labelVisibleNum: { type: Number, default: null }, // 선택된 값의 라벨명 표시 개수 설정
    },
    computed: {
        selected: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
                this.selectedValue = val;
                this.selectedValueArr = this.selectedValue.split(',');
            },
        },
    },
    created() {
        // if (this.multi) this.selectedValueArr = this.value.split(',');
    },
    watch: {
        value: {
            immediate: true,
            handler(val) {
                this.selectedValueArr = val.split(',');
            },
        },

        selectedValueArr(val) {
            let select = structuredClone(val);
            if (select[0] === '') select.shift();

            this.selectedValue = select.join(',');
        },
    },

    methods: {
        getSelectedLabel(all) {
            const names = [];
            this.opts?.forEach((val) => {
                if (String(this.selectedValue).split(',').includes(String(val.code))) {
                    names.push(val);
                }
            });
            if (all) {
                return names.arrObjAttrToStr('name');
            } else {
                return this.opts?.length === names.length ? '전체' : names.arrObjAttrToStr('name', '', this.labelVisibleNum);
            }
        },

        evtConfirm() {
            this.selected = this.selectedValue;
            this.$emit('confirm', this.selectedValue);
        },

        evtCloseClick() {
            if (this.multi) this.selectedValueArr = this.selected.split(',');
            else this.selectedValue = this.selected;
        },

        evtAllSelectClick() {
            let allSelectValue = [];

            this.opts.forEach((item) => {
                allSelectValue.push(String(item.code));
            });
            this.selectedValueArr = allSelectValue;
        },
    },
};
</script>

<style lang="scss" scoped></style>
