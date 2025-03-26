<template>
    <component ref="addGrp" id="addGrp" class="inputs" :is="getCustomComponent" @search="searchNode" :nodeInstance="nodeInstance" @evt_confirm="evt_confirm" />
</template>

<script>
export default {
    name: 'treeview-customSearch',
    data() {
        return {};
    },
    props: {
        nodeInstance: {
            type: Object,
            default: () => {
                return {
                    component: {
                        nodeCustom: {},
                        searchCustom: {},
                    },
                    event: {},
                    props: {},
                };
            },
        },
    },
    computed: {
        getCustomComponent() {
            return this.nodeInstance.component.searchCustom;
        },
    },
    methods: {
        searchNode(searchName) {
            this.$emit('search', searchName);
        },
        evt_confirm(data) {
            this.$emit('evt_confirm', data);
        },
    },
};
</script>
