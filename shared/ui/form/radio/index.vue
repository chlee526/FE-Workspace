<template>
    <div class="dcp radio" :class="{ 'is-btn': btn, 'is-box': box, 'is-not-label': !label }">
        <input :id="id" type="radio" :name="name" :data-grp="grp" :value="val" v-model="checked" :disabled="disabled" @click="evt_click" />
        <label :for="id" @mouseover="isOver = true" @mouseout="isOver = false" :style="getStyle">
            <span v-if="!btn && !box" class="icon"></span>
            <span v-if="before" class="icon is-before" v-html="before"></span>
            <span class="txt" v-html="label"></span>
            <span v-if="after" class="icon is-after" v-html="after"></span>
        </label>
    </div>
</template>
<script>
export default {
    name: 'comp-radio',
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
        customColor: { type: String, default: null },
        disabled: { type: Boolean },
        before: { type: String },
        after: { type: String },
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
                if (this.btn || this.box) {
                    // default;
                    style += 'border-color: rgba(' + this.customColor.hexToRgb() + ', 0.4);';
                    style += 'color: ' + this.customColor + ';';

                    // Over;
                    if (this.isOver) {
                        style += 'background-color: rgba(' + this.customColor.hexToRgb() + ', 0.1);';
                    }

                    // Active
                    if ((this.$vnode.data.staticClass && this.$vnode.data.staticClass.indexOf('is-active') >= 0) || this.checked == this.val) {
                        style += 'border-color: rgba(' + this.customColor.hexToRgb() + ', 1);';
                        style += 'background-color: rgba(' + this.customColor.hexToRgb() + ', 1);';
                        style += 'color: #ffffff;';
                    }
                } else {
                    style += 'color: ' + this.customColor + ';';
                }
            }

            return style;
        },
    },
    methods: {
        evt_click(evt) {
            this.$emit('click', evt);
        },
    },
};
</script>
