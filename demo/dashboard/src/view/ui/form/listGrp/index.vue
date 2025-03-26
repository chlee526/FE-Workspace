<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible" />
        <div class="wrap">
            <!-- Location -->
            <comp-location></comp-location>
            <!-- // Location -->

            <!-- 본문 컨텐츠 -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>List</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/listGrp" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>FilterGroup - 확장형 필터링 모음</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <strong class="title">크기</strong>
                                                <comp-input-box id="set_wid" v-model="set.size.wid" placeholder="가로 자동" label="가로 입력" style="width: 100px"></comp-input-box>
                                                <comp-input-box id="set_hgt" v-model="set.size.hgt" placeholder="세로 자동" label="세로 입력" style="width: 100px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>타입</strong>
                                                <comp-radio-grp id="set_type" name="btnType" v-model="set.type.value" :opts="set.type.opts" :box="true"></comp-radio-grp>
                                                <strong>추가/삭제 형태</strong>
                                                <comp-radio-grp id="set_type_detail" name="btnTypeDetail" v-model="set.typeDetail.value" :opts="set.typeDetail.opts" :box="true" :disabled="set.type.value == 0"></comp-radio-grp>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_sortable" class="is-small" v-model="set.sortable" label="정렬"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_selectable" class="is-small" v-model="set.selectable" label="선택"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" label="미사용"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content" style="display: flex; justify-content: center">
                                        <div class="wrap ui_ac">
                                            <comp-list v-if="set.type.value == 0" id="selectable_list" :style="getStyle" :disabled="set.disabled" :sortable="set.sortable" :selectable="set.selectable">
                                                <template v-slot:default>
                                                    <button class="ui_btn" :disabled="set.disabled"><span class="txt">버튼 1</span></button>
                                                    <button class="ui_btn" :disabled="set.disabled"><span class="txt">버튼 2</span></button>
                                                    <button class="ui_btn" :disabled="set.disabled"><span class="txt">버튼 3</span></button>
                                                    <comp-filter-grp pos="R" :disabled="set.disabled">
                                                        <template v-slot:title> 필터모음 </template>
                                                        <template v-slot:items>
                                                            <dl>
                                                                <dt>
                                                                    <strong>추가아이템</strong>
                                                                </dt>
                                                                <dd>컴포넌트</dd>
                                                            </dl>
                                                        </template>
                                                    </comp-filter-grp>
                                                    <comp-filter-grp pos="L" :disabled="set.disabled">
                                                        <template v-slot:custom>
                                                            <div style="background: red; line-height: 40px; color: #fff">커스텀 필터 모음</div>
                                                        </template>
                                                        <template v-slot:items>
                                                            <dl>
                                                                <dt>
                                                                    <strong>추가아이템</strong>
                                                                </dt>
                                                                <dd>컴포넌트</dd>
                                                            </dl>
                                                        </template>
                                                    </comp-filter-grp>
                                                </template>
                                            </comp-list>

                                            <template v-else>
                                                <div class="wrap" style="display: flex; gap: 20px">
                                                    <div style="display: flex; flex-direction: column">
                                                        <span>정렬 기능 리스트</span>
                                                        <comp-list id="sortable_list" :style="getStyle" :disabled="set.disabled" :datas="getItems" @add="evt_itemAdd" @confirm="evt_confirm" @remove="evt_itemRemove" @click="evt_itemClick" @update="evt_update" :component="getComponent" :sortable="set.sortable" :sortTargetClass="set.typeDetail.value === 1 ? 'title-wrap' : ''"></comp-list>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column">
                                                        <span>선택 기능 리스트</span>
                                                        <comp-list id="selectable_list" :style="getStyle" :disabled="set.disabled" :datas="set.selectableDatas" @add="evt_itemAdd" @confirm="evt_confirm" @remove="evt_itemRemove" @click="evt_itemClick" @update="evt_update" @selectedUpdate="evt_selected" :component="getComponent" :selectable="set.selectable"></comp-list>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- // 본문 컨텐츠 -->
        </div>
    </div>
</template>

<script>
import CompSampleItem1 from '@shared/ui/form/listGrp/sample_item.vue';
import CompSampleItem2 from '@shared/ui/form/listGrp/sample_item_2.vue';

export default {
    name: 'comp-listgrp',
    data() {
        return {
            set: {
                size: {
                    wid: 200,
                    hgt: 500,
                },
                type: {
                    value: 1,
                    opts: [
                        { code: 0, name: '사용자설정형' },
                        { code: 1, name: '추가/삭제형' },
                    ],
                },
                typeDetail: {
                    value: 1,
                    opts: [
                        { code: 0, name: '샘플 1(기본)' },
                        { code: 1, name: '샘플 1(필터그룹)' },
                        { code: 2, name: '샘플 2(버튼)' },
                    ],
                },
                sortable: true,
                selectable: true,
                disabled: false,
                datas: [],
                datas1: [],
                datas2: [],
                selectableDatas: [],
            },
            sample2_datas: [],
            compListAddItem: CompSampleItem1,
        };
    },
    computed: {
        getStyle() {
            return `width: ${this.set.size.wid ? this.set.size.wid + 'px' : 'auto'}; height: ${this.set.size.hgt ? this.set.size.hgt + 'px' : 'auto'}`;
        },
        getItems() {
            return this.set.typeDetail.value === 1 ? this.set.datas1 : this.set.typeDetail.value === 2 ? this.set.datas2 : this.set.datas;
        },
        getComponent() {
            switch (this.set.typeDetail.value) {
                case 1:
                    return CompSampleItem1;
                case 2:
                    return CompSampleItem2;
            }
            return null;
        },
    },
    watch: {
        'set.typeDetail.value': {
            handler(val) {
                this.set.sortable = true;
            },
        },
    },
    created() {
        for (let i = 0; i < 1000; i++) {
            this.set.datas.push({ seq: i, name: `기본 아이템${i + 1}`, fill: '#ff0000' });
            this.set.datas1.push({ seq: i, name: `추가 아이템${i + 1}`, fill: '#ff0000' });
            this.set.datas2.push({ seq: i, name: `버튼 ${i + 1}`, fill: '#ff0000' });
            this.set.selectableDatas.push({ seq: i, name: `선택 아이템 ${i + 1}`, fill: '#ff0000' });
        }
    },

    mounted() {},

    methods: {
        evt_itemAdd() {
            let datasName = this.set.typeDetail.value === 1 ? 'datas1' : this.set.typeDetail.value === 2 ? 'datas2' : 'datas';
            this.set[datasName].push({
                name: `${datasName === 'datas' ? '기본 아이템' : datasName === 'datas1' ? '추가 아이템' : '버튼'} ${this.set[datasName].length + 1}`,
                fill: '#ff0000',
            });
        },
        evt_itemRemove(tg) {
            let datasName = this.set.typeDetail.value === 1 ? 'datas1' : this.set.typeDetail.value === 2 ? 'datas2' : 'datas';
            this.set[datasName] = this.set[datasName].removeItem(tg);
        },
        evt_itemClick(val) {
            console.log('click!!!', val);
        },

        evt_confirm(val) {
            let datasName = this.set.typeDetail.value === 1 ? 'datas1' : this.set.typeDetail.value === 2 ? 'datas2' : 'datas';
            this.$set(this.set[datasName], val.index, val.item);
        },

        evt_update(val) {
            let datasName = this.set.typeDetail.value === 1 ? 'datas1' : this.set.typeDetail.value === 2 ? 'datas2' : 'datas';
            this.set[datasName] = structuredClone(val);
        },
        evt_selected(val) {
            console.log('evt_selected', val);
        },
    },
};
</script>

<style lang="scss" scope>
.sample_data {
    display: inline-flex;
    flex-direction: column;
    gap: 2px;
    margin-left: 300px;
    vertical-align: top;

    > * {
        display: flex;
        white-space: nowrap;

        > * {
            line-height: 30px;
        }

        > strong {
            flex: 0 0 100px;
        }
    }
}
.ui-selected {
    .ui-filter-grp > .title,
    .item {
        background-color: var(--primary) !important;
        color: #fff !important;
    }
}
.ui-selecting {
    .ui-filter-grp > .title,
    .item {
        background-color: var(--tertiary) !important;
        color: #fff !important;
    }
}
</style>
