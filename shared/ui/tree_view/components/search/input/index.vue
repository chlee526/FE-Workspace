<template>
    <CustomSearch v-if="getCustomComponent" :nodeInstance="nodeInstance" @evt_confirm="evt_confirm" @search="inputSearchClick" />
    <div class="inputs" v-else>
        <template>
            <comp-input-box type="search" v-model="inputText" placeholder="내용을 검색하세요" focusResetVisible @search="inputSearchClick(inputText)"></comp-input-box>

            <template v-if="editType">
                <comp-filter-grp :disableConfirmBtn="input.name.length < 1" ref="filterGrp" class="is-small btnAdd" @confirm="evt_confirm({ data: { treeLevel: 0 }, input: { name: input.name } })" @open="addNodeFilterOpen" pos="R">
                    <template v-slot:custom><span>&#xe017;</span></template>
                    <template v-slot:items>
                        <dl>
                            <dt><strong>이름</strong></dt>
                            <dd><comp-input-box ref="inputBox" class="is-small" v-model="input.name" @enter="evt_confirm" placeholder="키워드 입력"></comp-input-box></dd>
                        </dl>
                    </template>
                </comp-filter-grp>
            </template>
        </template>
    </div>
</template>

<script>
import { isEmpty } from 'lodash';

import CustomSearch from '../custom';

export default {
    name: 'treeview-inputSearch',
    data() {
        return {
            inputText: '',
            input: {
                name: '',
            },
        };
    },
    components: {
        CustomSearch,
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
        editType: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        getCustomComponent() {
            if (!isEmpty(this.nodeInstance.component.searchCustom)) {
                return true;
            } else {
                return false;
            }
        },
    },

    methods: {
        evt_confirm(data) {
            this.$emit('evt_confirm', data);
        },
        inputSearchClick(searchName) {
            this.$emit('search', searchName);
        },
        addNodeFilterOpen() {
            this.input.name = '';
        },
    },
};
</script>

<style></style>
