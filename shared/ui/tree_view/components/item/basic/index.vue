<template>
    <div class="tree-node" :class="[levelClass, { 'is-expand': open, 'is-active': source.is_select }]" @click.stop="handleNodeClick(source)">
        <span v-if="getShowExpand" :class="{ expand: source.children && source.children.length && source.treeLevel < maxNode, 'not-expand': !source.children || !source.children.length || source.treeLevel == maxNode || source.treeLevel > maxNode }" @click.stop="toggle(source)"></span>
        <div class="custom_wrap" :class="{ not_child_maxLv1: !getShowExpand }">
            <span class="icon" :class="levelClass"></span>
            <div class="node-name">
                <div class="input">{{ source.name }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tree-view-basic-item',
    data() {
        return {
            clicks: 0,
            open: false,
            timer: null,
        };
    },
    props: {
        getShowExpand: { type: Boolean, default: true },
        value: { require: true },
        openFolder: { require: true },
        maxNode: { type: Number, default: 2 },
    },
    computed: {
        isFolder() {
            return this.source.children && this.source.children.length;
        },
        levelClass() {
            if (this.source.treeLevel != undefined) {
                return 'node-l' + this.source.treeLevel;
            } else {
                return 'node-0';
            }
        },
        source: {
            get() {
                return this.value;
            },
            set(val) {},
        },
    },
    created() {
        this.source.is_open ? (this.open = this.source.is_open) : (this.open = false);
    },

    watch: {
        openFolder(val) {
            val.includes(this.source.g_code) ? (this.open = true) : (this.open = false);
        },
    },

    methods: {
        toggle(model) {
            if (!model.children || !model.children.length) {
                this.handleNodeClick(model);
            } else {
                if (this.isFolder) {
                    this.open = !this.open;
                    this.$emit('openTree', this.open, model);
                }
            }
        },
        dbClick(data) {
            this.$emit('dbClick', data);
        },
        handleNodeClick(data) {
            this.clicks++;
            if (this.clicks === 1) {
                this.timer = setTimeout(() => {
                    this.$emit('nodeClick', data);
                    this.clicks = 0;
                }, 200);
            } else {
                this.dbClick(data);
                clearTimeout(this.timer);
                this.clicks = 0;
            }
        },
    },
};
</script>
