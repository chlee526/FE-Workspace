<template>
    <div class="tmpl_attr_selector" :class="'is-tmpl-' + template">
        <div class="wrap ui-loader-container" :class="{ 'is-loading': loading }">
            <tmpl-attr_selector-list :id="id" :template="template" :attr-list="getFetchAttrList" :max-sel-len="maxSelLen" v-model="selItems" @click="evt_listClick"></tmpl-attr_selector-list>
            <tmpl-attr_selector-sellist v-if="template == 1 || maxSelLen > 1" :id="id" :template="template" v-model="useSelItem" @click="evt_listClick"></tmpl-attr_selector-sellist>
            <div v-if="maxSelLen > 1" class="btns">
                <comp-button class="is-xlarge is-icon-only" title="선택초기화" @click="evt_reset"><span class="icon">&#xe020;</span></comp-button>
                <comp-button class="is-active is-xlarge is-icon-with is-before" custom-color="#000000" style="padding-right: 50px; padding-left: 50px" @click="evt_search" :disabled="!selItems.length"><span class="icon">&#xe007;</span><span class="txt">분석하기</span></comp-button>
            </div>
        </div>
    </div>
</template>
<script>
import { uuid } from 'vue-uuid';
import { API_volume } from '@shared/api/volume';

import TmplAttrSeletorList from './AttrSelectorList.vue';
import TmplAttrSeletorSelList from './AttrSelectorSelList.vue';

export default {
    name: 'tmpl-attr_selector',
    components: {
        'tmpl-attr_selector-list': TmplAttrSeletorList,
        'tmpl-attr_selector-sellist': TmplAttrSeletorSelList,
    },
    data() {
        return {
            apiUID: uuid.v4(),
            loading: false,
            fetchAttrList: [],
            selItems: [],
            selItemsColor: ['#EC5151', '#F58B39', '#F6B61F', '#ABC834', '#69B229', '#28AA53', '#1E9BC9', '#3972D5', '#9C69DF', '#AAAAAA'],
            useSelItem: [],
        };
    },
    props: {
        id: { type: String },
        commonSearchOpts: { type: Object }, // 기본 검색 조건
        template: { type: String },
        attrList: { type: Array, default: null }, // 분류체계 목록
        maxSelLen: { type: Number, default: 1 }, // 최대 선택 갯수
        fetchAttrs: { type: Object }, // Fetch > grp_sub 항목 설정
        value: { default: null }, // v-model 연결
        isNoData: { type: Boolean, default: false }, // 데이터 없음 강제 설정
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
        getFetchAttrList() {
            const result = JSON.parse(JSON.stringify(this.fetchAttrList)).map((item, idx) => {
                item.rank = idx + 1;
                return item;
            });

            // 초기 아이템 셋팅
            const tmpSelItems = [];
            for (let Loop1 = 0; Loop1 < this.maxSelLen; ++Loop1) {
                if (result[Loop1]) {
                    result[Loop1].color = this.selItemsColor[Loop1];
                    tmpSelItems[Loop1] = result[Loop1];
                } else {
                    tmpSelItems[Loop1] = null;
                }
            }
            this.setUseSelItem(tmpSelItems);
            return result;
        },
    },
    watch: {
        // 공통 검색 조건 변경
        commonSearchOpts: {
            deep: true,
            handler() {
                this.fetchData();
            },
        },
        checked($val) {
            this.useSelItem = $val;
        },
        useSelItem($val) {
            const selectedItems = [];
            $val.forEach((item) => {
                if (item) selectedItems.push(item.code);
            });
            this.selItems = this.maxSelLen == 1 ? selectedItems.toString() : selectedItems;
        },
        maxSelLen(val) {
            this.checked = this.getFetchAttrList.filter((item, idx) => idx < val);
        },
        isNoData(val) {
            this.fetchData();
        },
    },
    methods: {
        setUseSelItem(tmpSelItems) {
            this.useSelItem = [...tmpSelItems];
        },
        evt_search() {
            this.checked = JSON.parse(JSON.stringify(this.useSelItem));

            // 검색조건 변경
            const searchOpts = JSON.parse(JSON.stringify(this.commonSearchOpts));
            searchOpts.anals = JSON.parse(JSON.stringify(this.useSelItem));
        },
        evt_reset() {
            const tmp = JSON.parse(JSON.stringify(this.useSelItem));
            this.useSelItem = tmp.map(() => null);
        },
        async fetchData() {
            if (this.isNoData) {
                this.fetchAttrList = [];
                this.evt_search();
                return;
            }

            this.loading = true;
            const params = JSON.parse(JSON.stringify(this.commonSearchOpts));

            const grp = {
                code: this.attrList.arrObjAttrToStr('code'),
            };
            if (grp.code.indexOf('s_') >= 0) grp.type = 'senti';
            else if (grp.code.indexOf('c_') >= 0) grp.type = 'sg';
            else grp.type = 'code';
            params.grp = grp;

            if (this.fetchAttrs) {
                params.grp_sub = this.fetchAttrs;
            }

            await API_volume(this.apiUID, params)
                .then(($res) => {
                    this.fetchAttrList = $res.data;
                })
                .catch(($err) => {})
                .finally(() => {
                    this.loading = false;
                    this.evt_search();
                });
        },
        evt_listClick($val) {
            const selItems = JSON.parse(JSON.stringify(this.useSelItem));
            if (this.maxSelLen == 1) {
                selItems[0] = $val;
            } else {
                let delIdx;
                selItems.forEach((item, idx) => {
                    if (item?.code === $val.code) delIdx = idx;
                });
                if (delIdx >= 0) {
                    // 제거
                    selItems[delIdx] = null;
                } else {
                    // 추가
                    let addIdx;
                    try {
                        selItems.forEach((item, idx) => {
                            if (!item) {
                                addIdx = idx;
                                throw new Error('stop loop');
                            }
                        });
                    } catch (error) {
                        // console.error(error);
                    }
                    selItems[addIdx] = $val;
                }
            }

            // 색상 설정
            this.useSelItem = selItems.map((item, idx) => {
                if (item) item.color = this.selItemsColor[idx];
                return item;
            });

            if (this.maxSelLen == 1) this.evt_search();
        },
    },
};
</script>
