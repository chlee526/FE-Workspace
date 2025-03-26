<template>
    <div class="tree-node" :class="[levelClass, { 'is-expand': open, 'is-active': source.is_select }]" @click="nodeClick(source)">
        <span v-if="getShowExpand" :class="{ expand: source.children && source.children.length && source.treeLevel < maxNode, 'not-expand': !source.children || !source.children.length || source.treeLevel == maxNode || source.treeLevel > maxNode }" @click.stop="toggle(source)"></span>
        <component v-on="eventTargetList" class="custom_wrap" :class="{ not_child_maxLv1: !getShowExpand }" :is="getComponent" :value="value" :maxNode="maxNode" :nodeInstance="nodeInstance" @evt_confirm="evt_confirm" @evt_modify="evt_modify" @nodeClick="nodeClick" @evt_delete="evt_delete"></component>
    </div>
</template>
<script>
import { isEmpty } from 'lodash';

import EditItem from './edit';

export default {
    name: 'tree-view-custom-item',
    data() {
        return {
            eventTargetList: {},
            clicks: 0,
            open: false,
            timer: null,
        };
    },
    props: {
        getShowExpand: { type: Boolean, default: true },
        editType: { type: Boolean, default: true },
        value: { require: true },
        openFolder: { require: true },
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
        getComponent() {
            if (this.nodeInstance.component.nodeCustom && !isEmpty(this.nodeInstance.component.nodeCustom)) {
                return this.nodeInstance.component.nodeCustom;
            } else {
                if (this.editType) {
                    return EditItem;
                } else {
                    return {};
                }
            }
        },

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

        for (let item in this.nodeInstance.event) {
            this.eventTargetList[item] = (...v) => {
                this.$emit(item, ...v);
            };
        }
    },

    watch: {
        openFolder(val) {
            val.includes(this.source.g_code) ? (this.open = true) : (this.open = false);
        },
    },

    methods: {
        nodeClick(data) {
            this.$emit('nodeClick', data);
        },
        // 트리뷰 노드 추가 이벤트 결과 값 확인 함수
        evt_confirm(data, type) {
            this.$emit('evt_confirm', data, type);
        },

        // 트리뷰 노드 수정 이벤트 결과 값 확인 함수
        evt_modify(data, type) {
            this.$emit('evt_modify', data, type);
        },

        // 트리뷰 노드 삭제 이벤트 결과 값 확인 함수
        evt_delete(data, type) {
            this.$emit('evt_delete', data, type);
        },

        // 트리뷰 폴더 타입 열림/닫힘 처리
        toggle(model) {
            if (!model.children || !model.children.length) {
                this.nodeClick(model);
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
    },
};
</script>
