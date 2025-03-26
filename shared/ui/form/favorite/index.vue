<template>
    <div class="dcp_favorites">
        <input :id="id" type="checkbox" :value="val" v-model="checked" :disabled="disabled" @click="evt_click" />
        <label :for="id" :title="getTitle">
            <span class="icon">&#xe030;</span>
        </label>
    </div>
</template>
<script>
export default {
    name: 'comp-favorites',
    data() {
        return {};
    },
    props: {
        id: {},
        val: {},
        value: {},
        disabled: { type: Boolean, default: false },
        title: { default: '관심' },
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
        getTitle() {
            if (this.checked) {
                return `${this.title} 해제`;
            } else {
                return `${this.title}${this.title.length > 10 ? '' : ' 등록'}`;
            }
        },
    },
    methods: {
        evt_click(evt) {
            this.$emit('click', evt);
        },
    },
};
</script>
