<template>
    <div class="dcp_radios" :class="{ 'is-grp': box }">
        <template v-if="getOptGrp">
            <template v-for="($grp, $grpIdx) in opts">
                <comp-radio v-for="(item, idx) in $grp" :class="[getClass, { 'is-grp': grp || box, 'is-first': 0 == idx, 'is-last': $grp.length - 1 == idx }]" :key="item.id" :name="name" :label="item.name" v-model="checked" :val="item.code" :id="id + '_' + $grpIdx + '_' + idx" :before="item.before" :after="item.after" :btn="btn" :box="box" :custom-color="item.color" :disabled="item.disabled || disabled" :grp="true"></comp-radio>
                <hr v-if="opts.length - 1 > $grpIdx" :key="$grpIdx" />
            </template>
        </template>
        <template v-else>
            <comp-radio v-for="(item, idx) in opts" :class="[getClass, { 'is-grp': box }]" :key="item.id" :name="name" :label="item.name" v-model="checked" :val="item.code" :id="id + '_' + idx" :before="item.before" :after="item.after" :btn="btn" :box="box" :custom-color="item.color" :disabled="item.disabled || disabled" :grp="true"></comp-radio>
        </template>
    </div>
</template>
<script>
import CompRadio from '@shared/ui/form/radio';
export default {
    name: 'comp-radio-grp',
    compoents: {
        CompRadio: 'comp-radio',
    },
    data() {
        return {
            className: '',
        };
    },
    props: {
        id: { type: String },
        value: {}, //checked
        name: { type: String },
        disabled: { type: Boolean },
        btn: { type: Boolean, default: false },
        box: { type: Boolean, default: false },
        opts: {
            default: function () {
                return [];
            },
        },
    },
    watch: {
        $attrs: {
            deep: true,
            handler() {
                this.className = this.$vnode.data.class || this.$vnode.data.staticClass;
            },
        },
    },
    mounted() {
        this.className = this.$vnode.data.class || this.$vnode.data.staticClass;
    },
    computed: {
        checked: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
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
    },
};
</script>
