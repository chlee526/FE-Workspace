<template>
    <div :ref="`node_${source.g_code}`" @click.stop>
        <div class="bg" @click.stop="handleNodeClick(source)"></div>
        <div class="node-name" @click.stop="handleNodeClick(source)">
            <div class="input">{{ source.name }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tree-view-custom-item',
    props: {
        value: {},
        nodeInstance: {},
    },
    computed: {
        source: {
            get() {
                return this.value;
            },
            set(val) {},
        },
    },
    methods: {
        handleNodeClick(data) {
            this.$emit('nodeClick', data);
        },
    },
};
</script>
