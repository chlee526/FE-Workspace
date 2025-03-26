<template>
    <div class="ui_table_sort">
        <div class="up">
            <input :id="`${name}_${id}^A`" type="radio" :name="name" v-model="checked" :value="`${id}^A`" @click="evt_click" />
            <label :for="`${name}_${id}^A`"></label>
        </div>
        <div class="dn">
            <input :id="`${name}_${id}^D`" type="radio" :name="name" v-model="checked" :value="`${id}^D`" @click="evt_click" />
            <label :for="`${name}_${id}^D`"></label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'comp-table-sort',
    props: {
        id: {},
        name: {},
        value: {},
        minOneValue: { type: Boolean, default: true },
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
    },
    methods: {
        evt_click(e) {
            if (this.minOneValue) return;
            if (e.target.value === this.checked) this.checked = '';
        },
    },
};
</script>
