<template>
    <a v-if="getAnchor === 'string'" class="ui_btn" :class="{ 'is-disabled': disabled != false }" @mouseover="isOver = true" @mouseout="isOver = false" :style="getStyle" :disabled="isDisabled" @click="evt_click" @focus="$emit('focus')" @blur="$emit('blur')">
        <slot></slot>
        <span v-if="loading !== undefined" class="is-loader" :class="{ 'is-loading': loading }"></span>
    </a>
    <button v-else type="button" class="ui_btn" @mouseover="isOver = true" @mouseout="isOver = false" :style="getStyle" :disabled="isDisabled" @click="evt_click" @focus="$emit('focus')" @blur="$emit('blur')">
        <slot></slot>
        <span v-if="loading !== undefined" class="is-loader" :class="{ 'is-loading': loading }"></span>
    </button>
</template>

<script>
export default {
    name: 'comp-button',
    data() {
        return {
            isOver: false,
        };
    },
    props: {
        disabled: { type: Boolean, default: false },
        customColor: { type: String, default: null },
        loading: { default: undefined },
    },
    computed: {
        isDisabled() {
            return this.loading || this.disabled === true;
        },
        getAnchor() {
            return typeof this.$vnode?.data?.attrs?.href;
        },
        getStyle() {
            let style = this.$vnode.data.style || this.$vnode.data.staticStyle || this.$vnode.data.normalizedStyle || '';
            if (style) style += ';';

            if (this.customColor) {
                // default;
                style += `border-color: rgba(${this.customColor.hexToRgb()}, 0.4);`;
                style += `color: ${this.customColor};`;

                // Over;
                if (this.isOver) {
                    style += `background-color: rgba(${this.customColor.hexToRgb()}, 0.1);`;
                }

                // Active
                if (this.$vnode.data.staticClass && this.$vnode.data.staticClass.indexOf('is-active') >= 0) {
                    style += `border-color: rgba(${this.customColor.hexToRgb()}, 1);`;
                    style += `background-color: rgba(${this.customColor.hexToRgb()}, 1);`;
                }
            }

            return style;
        },
    },
    methods: {
        evt_click(evt) {
            if (this.isDisabled) evt.preventDefault();
            this.$emit('click', evt);
        },
    },
};
</script>
