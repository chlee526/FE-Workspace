<template>
    <div class="sel_list">
        <div class="wrap">
            <ul>
                <template>
                    <li v-for="($item, $idx) in checked" :key="$idx">
                        <transition name="fade_scale">
                            <button v-if="$item" type="button" class="item box" :style="'background: ' + ($item && checked.includes($item) ? $item.color : '')" :disabled="checked.length == 1 ? true : false" @click.once="$emit('click', $item)" :title="$item.name">
                                <template v-if="template == 1">
                                    <span class="rank">{{ $item.rank }}</span>
                                    <strong class="title">{{ $item.name }}</strong>
                                    <span class="dv">({{ String($item.c_data.cnt).addComma() }})</span>
                                    <span v-if="$item.p_data && !$item.new" class="ui_fluc is-box" :title="Number($item.c_data.factor_per).numToFluc('%')" v-html="Number($item.c_data.factor_per).numToFlucHtml('%', 'limit')"></span>
                                </template>
                                <template v-if="template == 2">
                                    <span class="title">{{ $item.name }}</span>
                                </template>
                            </button>
                        </transition>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tmpl-attr_selector-sellist',
    props: {
        value: { default: null },
        id: { type: String },
        template: { type: String },
        selList: { type: Array, default: null }, // 분류체계 목록
    },
    computed: {
        checked: {
            get() {
                return this.value;
            },
            set($val) {
                this.$emit('input', $val);
            },
        },
    },
};
</script>
