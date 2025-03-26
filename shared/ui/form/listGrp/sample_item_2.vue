<template>
    <div class="ui_btn item sortable-handle" @click.stop="$emit('click', data)">
        <span class="txt">{{ value.name }}</span>
        <button class="btn_list_del" title="삭제" @click.stop="$emit('remove', data)">삭제</button>
    </div>
</template>

<script>
export default {
    name: 'comp-sample-additem-2',
    data() {
        return {};
    },
    props: {
        value: {},
    },
    computed: {
        data: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
    },
};
</script>

<style></style>
