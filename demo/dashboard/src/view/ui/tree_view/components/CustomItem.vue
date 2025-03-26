<template>
    <div :ref="`node_${source.g_code}`" :class="{ 'on-tooltip': filterOn }" @click.stop>
        <span class="icon" :class="levelClass"></span>
        <div class="bg" @click.stop="handleNodeClick(source)"></div>
        <div class="node-name" @click.stop="handleNodeClick(source)">
            <div class="input">{{ source.name }}</div>
        </div>

        <div class="filter_wrap">
            <component :is="getModuleComponent" :ref="`modifyGrp_${source.g_code}`" :id="`modifyGrp_${source.g_code}`" :noIconShow="true" :setWrapPos="getItemsWrapPos" @evt_confirm="evt_modify" @evt_close="evt_cancel" @onTool="onTool" :value="source" />

            <component :is="getModuleComponent" v-if="source.treeLevel < maxNode" :ref="`addGrp_${source.g_code}`" :id="`addGrp_${source.g_code}`" @evt_confirm="evt_confirm" :evt_cancel="evt_cancel" @onTool="onTool" :value="source" />

            <div class="btnDel" @click="evt_delete(source)"><span>&#xe022;</span></div>
            <div @click.stop>
                <comp-switch-btn :id="`op_switch_${source.g_code}`" class="is-xxsmall" v-model="useYnValue"></comp-switch-btn>
            </div>
        </div>
    </div>
</template>
<script>
import FilterModule from '../modules/FilterModule.vue';
let id = 1000;
export default {
    name: 'tree-view-custom-item',
    data() {
        return {
            filterOn: false,
            clicks: 0,
            showFilterGrp: false,
            inputKeyword: '',
            open: false,
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
        value: {},
        clickType: { type: Boolean, default: false },
        openFolder: {},
        maxNode: {},
        nodeInstance: {},
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

        getItemsWrapPos() {
            return `top:${this.pos.top}px; left: ${this.pos.left}px`;
        },
        isFolder() {
            return this.source.children && this.source.children.length;
        },
        levelClass() {
            if (this.source.level != undefined) {
                return 'node-l' + this.source.level;
            } else {
                return 'node-0';
            }
        },
    },
    created() {
        this.source.is_open ? (this.open = this.source.is_open) : (this.open = false);
        this.inputKeyword = this.source.name;
    },

    watch: {
        source: {
            deep: true,
            handler(val) {
                this.inputKeyword = val.name;
            },
        },
        openFolder(val) {
            val.includes(this.source.g_code) ? (this.open = true) : (this.open = false);
        },
    },

    methods: {
        onTool(data) {
            this.filterOn = data;
        },
        evt_confirm({ data, input }) {
            let targetRef = `addGrp_${data.g_code}`;

            if (input.name.length < 1) {
                // this.$store
                //     .dispatch('DIALOG_ERR', ['키워드 그룹 이름은 빈값을 넣을 수 없습니다.', 0])
                //     .then(($val) => {})
                //     .catch(($err) => {});
            } else {
                const newChild = {
                    treeLevel: data.treeLevel,
                    level: data.level,
                    name: input.name,
                    g_code: data.g_code,
                    code: data.code,
                    sg_seqs: input.sg_seqs,
                    p_seqs: data.sg_seqs,
                    use_yn: 'Y',
                    p_code: data.g_code,
                    children: data.children,
                };

                console.log(newChild);

                this.$emit('evt_confirm', newChild);
            }
        },
        evt_cancel() {
            // this.offTool();
        },
        evt_delete(data) {
            this.$emit('evt_delete', data);
        },
        evt_modify({ data, type, input }) {
            let targetRef = `modifyGrp_${data.g_code}`;

            let arr1 = data.sg_seqs.split(',').sort();
            let arr2 = input.sg_seqs.split(',').sort();

            if (type == undefined) {
                if (input.name.length < 1) {
                    // this.$store.dispatch('DIALOG_ERR', ['키워드 그룹 이름은 빈값을 넣을 수 없습니다.', 0]);
                } else if (arr1.join() === arr2.join()) {
                    let modify = { ...data };

                    modify.type = 'u';
                    modify.name = type == true ? data.name : input.name;
                    modify.sg_seqs = input.sg_seqs;

                    if (type == 'switch') {
                        modify.sg_seqs = data.sg_seqs;
                        modify.name = data.name;
                    }

                    // this.modifyNode(modify, type);
                    this.$emit('evt_modify', modify, type);
                    this.$refs[targetRef].hndl_close();
                } else {
                    this.$store
                        .dispatch('DIALOG_WRN', ['저장 시 하위 노드 변경이 있을 수 있습니다', '저장하시겠습니까?', 2])
                        .then((res) => {
                            let modify = { ...data };

                            modify.type = 'u';
                            modify.name = type == true ? data.name : input.name;
                            modify.sg_seqs = input.sg_seqs;

                            if (type == 'switch') {
                                modify.sg_seqs = data.sg_seqs;
                                modify.name = data.name;
                            }

                            // this.modifyNode(modify, type);
                            this.$emit('evt_modify', modify, type);
                            this.$refs[targetRef].hndl_close();
                        })
                        .catch((err) => {});
                }
            } else {
                let modify = { ...data };

                modify.type = 'u';

                if (type == 'switch') {
                    modify.sg_seqs = data.sg_seqs;
                    modify.name = data.name;
                }

                // this.modifyNode(modify, type);
                this.$emit('evt_modify', modify, type);
                this.$refs[targetRef].hndl_close();
            }
        },

        dbClick(data) {
            let targetRef = `node_${data.g_code}`;

            this.$nextTick(() => {
                this.tgPos = this.$refs[targetRef].getBoundingClientRect();

                this.pos = {
                    top: parseInt(this.tgPos.top),
                    left: parseInt(this.tgPos.left),
                };

                let targetRef2 = `modifyGrp_${data.g_code}`;

                // this.$emit('dbClick', { data, getItemsWrapPos: this.getItemsWrapPos });
                this.$refs[targetRef2]?.hndl_open();
            });
        },
        handleNodeClick(data) {
            this.clicks++;
            if (this.clicks === 1) {
                this.timer = setTimeout(() => {
                    // this.nodeClick(data);
                    this.$emit('nodeClick', data);
                    this.clicks = 0;
                }, 200);
            } else {
                if (this.clickType == 2) {
                    return;
                }
                this.dbClick(data);
                clearTimeout(this.timer);
                this.clicks = 0;
            }
        },

        toolGrpClick(data) {
            setTimeout(() => {
                // this.$refs.treeView.onTool(data);

                this.onTool(data);
                // this.$parent.onTool(data);
            }, 100);

            this.input.name = '';
            this.modify.name = data.name;
            this.modify.sg_seqs = data.sg_seqs;
            this.modify.p_seqs = data.p_seqs;
            this.modify.edit_seqs = data.sg_seqs;
            this.input.sg_seqs = data.sg_seqs;
        },
    },
};
</script>
