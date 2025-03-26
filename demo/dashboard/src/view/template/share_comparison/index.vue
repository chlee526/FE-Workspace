<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">asdasd</h2>
        <div class="wrap">
            <!-- 사이드 영역 -->
            <comp-side-follow></comp-side-follow>
            <!-- 사이드 영역 -->

            <!-- Location -->
            <comp-location>
                <span class="item">로케이션</span>
            </comp-location>
            <!-- // Location -->

            <!-- 본문 컨텐츠 -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap is-cols-pad">
                            <div class="ui_col w12">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>분석 대상별 언급량 점유율</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/templates/share_comparison" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span><strong>분석대상</strong> : 비교할 분석 대상 목록(카테고리)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>분류</strong> : 분석 대상의 분류(그래프)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>제목</strong> : 컨텐츠 제목</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>데이터없음</strong> : 데이터없는 경우</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <comp-filter-grp pos="BL">
                                                <template v-slot:title>분석대상</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>목록</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-list id="custom_rank_list" :datas="set.analsList" :component="getListItemComponent" @add="evt_itemAdd" @confirm="evt_confirm" @remove="evt_itemRemove"></comp-list>
                                                        </dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                            <hr />
                                            <div class="grp">
                                                <strong>분류</strong>
                                                <comp-radio-grp id="set_type" name="set_type" v-model="set.type.value" :opts="set.type.opts" :box="true"></comp-radio-grp>
                                            </div>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>제목</strong>
                                                <comp-input-box id="set_label" v-model="set.title" placeholder="제목" label="라벨명 입력" style="width: 150px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_usedNoneData" class="is-small" v-model="set.usedNoneData" label="데이터없음"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <tmpl-share-comparision id="default" class="is-2dp" :common-search-opts="searchOpts" :code="searchOpts.tab" @click="evt_click">
                                                <h4 v-if="set.title.trim().length" slot="title">
                                                    <span>{{ set.title }}</span>
                                                </h4>
                                            </tmpl-share-comparision>
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
import { mapGetters } from 'vuex';
import moment from 'moment';

import CompListAnal from './ListAnal.vue';

export default {
    name: 'page-share_comparison',
    data() {
        return {
            searchOpts: {
                s_date: {
                    date: moment().subtract(20, 'day').format('YYYY-MM-DD'),
                },
                e_date: {
                    date: moment().format('YYYY-MM-DD'),
                },
                ps_date: {
                    date: moment().subtract(41, 'day').format('YYYY-MM-DD'),
                },
                pe_date: {
                    date: moment().subtract(21, 'day').format('YYYY-MM-DD'),
                },
            },
            set: {
                // 날짜(달력)
                title: '언급량 점유율 비교',
                analsList: [],
                type: {
                    value: 1,
                    opts: [
                        { code: 1, name: '그룹별' },
                        { code: 2, name: '채널별' },
                    ],
                },
                graphs: [],
                usedNoneData: false,
            },
        };
    },
    computed: {
        ...mapGetters(['getChns', 'getSentis']),
        // 분석대상 목록 컴포넌트
        getListItemComponent() {
            return CompListAnal;
        },
    },
    mounted() {
        // 최초 분석 대상 store에서 가져다가 기본값 설정
        // this.$nextTick(() => {
        this.set.analsList = structuredClone(this.$store.getters.getAnalTargets.comp);
        // });
    },
    watch: {
        // 데이터 없음
        'set.usedNoneData'(val) {
            if (val) {
                this.searchOpts = { ...this.searchOpts, ...this.set, analsList: [], graphs: [] };
                return;
            }
            this.searchOpts = { ...this.searchOpts, ...this.set };
        },

        // 분석대상
        'set.analsList': {
            deep: true,
            handler(val) {
                this.searchOpts = { ...this.searchOpts, ...this.set };
            },
        },
        // 분류 변경시 그래프 변경
        'set.type.value': {
            immediate: true,
            handler(val) {
                const graphs = val == 1 ? this.getChns : this.getSentis;
                graphs.forEach((item) => {
                    item.graphCode = item.code;
                    item.value_field = `value_${item.graphCode}`;
                    item.type = val === 1 ? 'sg_seq' : 'senti';
                });
                this.set.graphs = graphs;
                this.searchOpts = { ...this.searchOpts, ...this.set };
            },
        },
    },
    methods: {
        // 팝업이벤트
        evt_click($e) {
            const item = $e.item;
            let label = $e.target.legendTextReal;
            let graphs = this.set.graphs;
            if (item) {
                let titleCode = item.dataContext.categoryCode;
                let title = item.category;
                let subCode = graphs.getParseDatas({ name: label })[0].graphCode;
                let opts = graphs.map((item) => {
                    return { name: item.name, code: item.graphCode };
                });
                let params = JSON.parse(JSON.stringify(this.set));
                params.title = [{ code: titleCode, name: title, type: 'or_type_code' }];
                params.subTitle = [{ code: subCode, name: label, type: this.tab }];
                params.cateFilters = [
                    {
                        name: '채널',
                        type: this.tab,
                        opts: opts,
                        value: $e.target.graphCode,
                        multiple: true,
                    },
                ];
                if (!params.type_code) {
                    params.type_code = {};
                }
                params.type_code.analCodes = titleCode;
                this.$store.dispatch('MODAL_OPEN', ['relinfo', params]);
            }
        },

        // 분석 대상 추가/삭제/수정
        evt_itemAdd() {
            this.set.analsList.push({
                code: `${this.set.analsList.length + 1}`,
                name: '추가 아이템',
                color: '#ff0000',
            });
        },
        evt_itemRemove(tg) {
            const index = this.set.analsList.findIndex((item) => item.code === tg.code);
            this.set.analsList.splice(index, 1);
        },
        evt_confirm(val) {
            this.$set(this.set.analsList, val.index, val.item);
        },
    },
};
</script>

<style></style>
