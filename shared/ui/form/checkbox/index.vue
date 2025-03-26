<template>
    <div class="dcp checkbox" :class="{ 'is-btn': btn, 'is-box': box, 'is-not-label': !label }" v-init>
        <input v-if="!!value" :id="id" type="checkbox" :name="name" :data-grp="grp" :value="val" v-model="checked" :disabled="disabled" @click="evt_click" @change="$emit('change', $event)" :tabindex="tabindex" />

        <input v-else :id="id" type="checkbox" :name="name" :data-grp="grp" :value="val" :disabled="disabled" @click="evt_click" @change="$emit('change', $event)" :tabindex="tabindex" v-model="checked" />

        <label :for="id" :class="{ customColor: customColor }" @mouseover="isOver = true" @mouseout="isOver = false" :style="getStyle" @click.stop>
            <span v-if="!btn && !box" class="icon" :style="iconStyle"></span>
            <span v-if="before" class="icon is-before" v-html="before"></span>
            <span v-if="!treeview" class="txt">{{ label }}</span>
            <span v-if="treeview" class="txt">{{ classBind(label) }}</span>
            <span v-if="after" class="icon is-after" v-html="after"></span>
        </label>
    </div>
</template>
<script>
export default {
    name: 'comp-checkbox',
    data() {
        return {
            isOver: false,
        };
    },
    props: {
        id: { type: String },
        name: { type: String },
        val: {},
        value: {},
        label: { type: String },
        btn: { type: Boolean, default: false },
        box: { type: Boolean, default: false },
        grp: { type: Boolean, default: false },
        customColor: { type: String },
        disabled: { type: Boolean },
        before: { type: String },
        after: { type: String },
        treeview: { type: Boolean, default: false },
        searchName: { type: String },
        tabindex: { type: String, default: '0' },
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
        getStyle() {
            let style = this.$vnode.data.style ? this.$vnode.data.style : '';

            if (this.customColor) {
                // default;
                style += `border-color: rgba(${this.customColor.hexToRgb()}, 0.4);`;
                style += `color: ${this.customColor};`;
                // Over;
                if (this.isOver) {
                    style += `background-color: rgba(${this.customColor.hexToRgb()}, 0.1);`;
                }
                // Active
                style += `--color: ${this.customColor}`;
            }
            return style;
        },

        iconStyle() {
            let style = this.$vnode.data.style ? this.$vnode.data.style : '';

            if (this.customColor) {
                // default;
                style += `border-color: rgba(${this.customColor.hexToRgb()}, 0.4);`;
                style += `color: ${this.customColor};`;
                // Over;

                if (this.checked.indexOf(this.val) > -1) {
                    style += `background-color: rgba(${this.customColor.hexToRgb()},1);`;
                }

                // Active
                style += `--color: ${this.customColor}`;
            }
            return style;
        },
    },
    methods: {
        classBind(val) {
            let result = val;
            if (this.searchName) {
                result = String(val).replace(this.searchName, `<span class="is-hl-inputkeyword">${this.searchName}</span>`);
            }
            return result;
        },
        evt_click(e) {
            this.$emit('click', e);
        },
    },
    directives: {
        init: {
            inserted: function (el, binding, vnode) {
                if (vnode.elm.className.indexOf('is-board') >= 0) {
                    el.parentElement.style.position = 'relative';
                }
            },
        },
    },
};
</script>
