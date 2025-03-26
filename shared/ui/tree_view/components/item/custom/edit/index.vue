<template>
    <div :ref="`node_${source.g_code}`" :class="{ 'on-tooltip': filterOn }" @click.stop>
        <span class="icon" :class="[levelClass]"></span>
        <div class="bg" @click.stop="handleNodeClick(source)"></div>
        <div class="node-name" @click.stop="handleNodeClick(source)">
            <div class="input">{{ source.name }}</div>
        </div>
        <div class="filter_wrap">
            <component v-on="eventTargetList" :is="getModuleComponent" :ref="`modifyGrp_${source.g_code}`" :id="`modifyGrp_${source.g_code}`" :noIconShow="true" :setWrapPos="getItemsWrapPos" @evt_confirm="evt_modify" :value="source" @onTool="onTool" />

            <component v-on="eventTargetList" :is="getModuleComponent" v-if="source.treeLevel < maxNode" :ref="`addGrp_${source.g_code}`" :id="`addGrp_${source.g_code}`" @evt_confirm="evt_confirm" :value="source" @onTool="onTool" />

            <div class="btnDel" @click.stop="evt_delete(source)"><span>&#xe022;</span></div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

import FilterModule from './modules/FilterModule.vue';
export default {
    name: 'tree-view-edit-item',
    data() {
        return {
            eventTargetList: {},
            filterOn: false,
            clicks: 0,
            tgPos: {},
            pos: {},
            timer: null,
            input: {
                name: '',
                sg_seqs: '',
            },
        };
    },

    props: {
        value: { require: true },
        maxNode: { type: Number, default: 2 },
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
        getModuleComponent() {
            return FilterModule;
        },
        useYnValue: {
            get() {
                return this.source.use_yn;
            },
            set(val) {
                this.source.use_yn = val;
                this.evt_modify({ data: this.source, input: this.input, type: 'switch' });
            },
        },
        source: {
            get() {
                return this.value;
            },
            set(val) {},
        },
        ...mapGetters(['getUseYNOpts']),

        getItemsWrapPos() {
            return `top:${this.pos.top}px; left: ${this.pos.left}px`;
        },

        levelClass() {
            if (this.source.treeLevel != undefined) {
                return 'node-l' + this.source.treeLevel;
            } else {
                return 'node-0';
            }
        },
    },
    created() {
        for (let item in this.nodeInstance.event) {
            this.eventTargetList[item] = (...v) => {
                this.$emit(item, ...v);
            };
        }
    },

    methods: {
        onTool(data) {
            this.filterOn = data;
        },
        evt_confirm({ data, input }) {
            this.$emit('evt_confirm', { data, input });
        },

        evt_delete(data) {
            this.$emit('evt_delete', data);
        },
        evt_modify({ data, input }) {
            this.$emit('evt_modify', { data, input });
        },

        dbClick(data) {
            let targetRef = `node_${data.g_code}`;

            this.$nextTick(() => {
                this.tgPos = this.$refs[targetRef].parentNode.getBoundingClientRect();

                this.pos = {
                    top: parseInt(this.tgPos.top),
                    left: parseInt(this.tgPos.left),
                };

                let targetRef2 = `modifyGrp_${data.g_code}`;

                this.$refs[targetRef2]?.hndl_open();
            });
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
