<template>
    <div class="list" :class="'is-tmpl-' + template">
        <ul :style="getAttrList.length < 7 ? 'height: auto; overflow: hidden' : ''">
            <li v-for="($item, $idx) in getAttrList" :key="$idx">
                <template v-if="$item">
                    <input v-if="maxSelLen == 1" :id="id + '_attr_list_' + $idx" type="radio" :name="id + '_attr_list'" :value="$item" :checked="checked.includes($item.code)" @click="evt_click($item)" />
                    <input v-else :id="id + '_attr_list_' + $idx" type="checkbox" :value="$item" @click="evt_click($item)" :checked="checked.includes($item.code)" :disabled="checked.length == maxSelLen && !checked.includes($item.code)" />
                    <template v-if="template == 1">
                        <label :for="id + '_attr_list_' + $idx" :title="$item.name">
                            <span class="rank">{{ $item.rank }}.</span>
                            <strong class="title">{{ $item.name }}</strong>
                            <span class="dv">({{ Number($item.c_data.cnt).lengthLimitComma() }})</span>
                        </label>
                    </template>
                    <template v-else>
                        <label :for="id + '_attr_list_' + $idx" :style="'background:' + (checked.includes($item.code) ? $item.color : '')" :title="$item.name">
                            <span class="rank">{{ $item.rank }}</span>
                            <strong class="title">{{ $item.name }}</strong>
                            <span class="dv">({{ Number($item.c_data.cnt).lengthLimitComma() }})</span>
                        </label>
                    </template>
                </template>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'tmpl-attr_selector-list',
    props: {
        value: { default: null },
        id: { type: String },
        template: { type: String },
        attrList: { type: Array, default: null }, // 분류체계 목록
        maxSelLen: { type: Number, default: 1 }, // 최대 선택 갯수
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
        getAttrList() {
            const result = JSON.parse(JSON.stringify(this.attrList));
            if (result.length > 7 && this.template == 2) {
                const gap = result.length % 8;
                for (let Loop1 = 0; Loop1 < gap; ++Loop1) {
                    result.push(null);
                }
            }
            return result;
        },
    },
    methods: {
        evt_click($val) {
            this.$emit('click', $val);
        },
    },
};
</script>
