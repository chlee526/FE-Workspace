<template>
    <div class="dcp_chkboxs" :class="{ 'is-all': allLabel, 'is-btn': btn, 'is-box': box, 'is-grid': grid }" :style="getGridColumn">
        <template v-if="allLabel">
            <template v-if="!allUnchkDisabled">
                <comp-switch-btn v-if="!btn && !box" :id="id + '_all'" class="is-small" v-model="allChk" @click="evt_allClick"></comp-switch-btn>
                <comp-switch-btn v-else :id="id + '_all'" class="is-small" :class="[getClass]" v-model="allChk" @click="evt_allClick"></comp-switch-btn>
            </template>
            <comp-button v-else class="allChk is-small" @click="evt_allClick"><span class="txt">전체선택</span></comp-button>
        </template>
        <hr v-if="allLabel" />

        <template v-if="getOptGrp">
            <template v-for="($grp, $grpIdx) in opts">
                <template v-for="($item, $idx) in $grp">
                    <comp-checkbox v-if="$item" :class="[getClass, { 'is-first': 0 == $idx, 'is-last': $grp.length - 1 == $idx }]" :key="id + '_' + $grpIdx + '_' + $idx" :id="id + '_' + $grpIdx + '_' + $idx" :name="name" :val="$item.code" v-model="values" :label="$item.name" :before="$item.before" :after="$item.after" :btn="btn" :box="box" :grp="true" :custom-color="$item.color" :disabled="$item.disabled" @click="evt_itemClick"></comp-checkbox>
                </template>
                <hr v-if="opts.length - 1 > $grpIdx" :key="$grpIdx" />
            </template>
        </template>

        <template v-else>
            <template v-for="($item, $idx) in opts">
                <comp-checkbox v-if="$item" :class="[getClass, { 'is-first': 0 == $idx, 'is-last': opts.length - 1 == $idx }]" :key="id + '_' + $idx" :id="id + '_' + $idx" :name="name" :val="$item.code" :label="$item.name" :before="$item.before" :after="$item.after" :btn="btn" :box="box" :grp="true" :custom-color="$item.color" :disabled="$item.disabled" @click="evt_itemClick" v-model="values"></comp-checkbox>
            </template>
        </template>
    </div>
</template>
<script>
export default {
    name: 'comp-checkbox-grp',
    data() {
        return {
            allChk: false,
            className: '',
        };
    },
    props: {
        id: { type: String },
        name: { type: String },
        opts: {
            default() {
                return [];
            },
        },
        allLabel: { type: String },
        btn: { type: Boolean, default: false },
        box: { type: Boolean, default: false },
        grid: { type: Number, default: null },
        allUnchkDisabled: { type: Boolean, default: false },
        value: {}, //v-model
    },
    computed: {
        getGridColumn() {
            if (this.grid === null) return '';
            return `grid-template-columns: repeat(${this.grid}, 1fr)`;
        },
        values: {
            get() {
                if (this.value === '') return [];
                return this.value.split(',');
            },
            set($val) {
                if (this.allUnchkDisabled && $val.length == 0) return;
                const result = $val.filter((item) => String(item) !== '');
                this.$emit('input', result.toString());
            },
        },
        getOptGrp() {
            if (this.opts.length > 0) {
                return Array.isArray(this.opts[0]);
            }
            return null;
        },
        getClass() {
            return this.className;
        },
        optCnt() {
            let result = 0;
            JSON.parse(JSON.stringify(this.opts))
                .flat()
                .forEach(($item) => {
                    if ($item && !$item.disabled) result += 1;
                });
            return result;
        },
        getAllDisabled() {
            let result = true;
            this.opts.forEach(($item) => {
                if ($item && !$item.disabled) result = false;
            });
            return result;
        },
    },
    watch: {
        $attrs: {
            deep: true,
            handler(val) {
                this.className = this.$vnode.data.class || this.$vnode.data.staticClass;
            },
        },
        values($val) {
            if ($val.length > 0 && $val.length == this.optCnt) {
                this.allChk = true;
            } else {
                this.allChk = false;
            }
        },
        opts: {
            deep: true,
            handler($val) {
                let opts = $val.filter(($item) => {
                    if (!$item?.disabled) return $item;
                });
                opts = opts.arrObjAttrToStr('code');
                let values = JSON.parse(JSON.stringify(this.values));
                values = values.filter(($item) => {
                    if (opts.includes($item)) return $item;
                });
                this.values = values;
            },
        },
    },
    created() {
        if (this.values.length == this.opts.length) this.allChk = true;
    },
    mounted() {
        this.className = this.$vnode.data.class || this.$vnode.data.staticClass;
    },
    methods: {
        evt_allClick($e) {
            let chk = $e ? $e.target.checked : true;
            if ($e.target.checked == undefined) chk = true;
            this.allChk = chk;
            let result = [];
            if (chk) {
                JSON.parse(JSON.stringify(this.opts))
                    .flat()
                    .filter(($item) => {
                        if ($item && !$item.disabled) result.push($item.code);
                    });
            } else {
                if (this.allUnchkDisabled) return;
            }
            this.$emit('input', result.toString());
        },
        evt_itemClick($e) {
            if (this.allUnchkDisabled && !$e.target.checked && this.values.length == 1) {
                $e.target.checked = true;
                return false;
            }
        },
    },
};
</script>
