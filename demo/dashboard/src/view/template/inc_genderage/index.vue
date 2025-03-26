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

            <!-- 검색조건 -->
            <comp-topsearch :search-input-datas.sync="topSearchInputDatas" :search-datas.sync="topSearchDatas">
                <!-- 조건 -->
                <template slot="input_forms">
                    <tr>
                        <th><h4>검색기간</h4></th>
                        <td>
                            <comp-datepicker id="ts_dp_s" :s_date.sync="topSearchInputDatas.s_date" :e_date.sync="topSearchInputDatas.e_date" range="2Y" :min_date.sync="topSearchInputDatas.min_date" :max_date.sync="topSearchInputDatas.max_date" data-fixed="true" :date_grp="getDateGrp"></comp-datepicker>
                        </td>
                    </tr>
                    <tr>
                        <th><h4>비교기간</h4></th>
                        <td>
                            <comp-datepicker id="ts_dp_e" :s_date.sync="topSearchInputDatas.ps_date" :e_date.sync="topSearchInputDatas.pe_date" range="2Y" :min_date.sync="topSearchInputDatas.p_min_date" :max_date.sync="topSearchInputDatas.p_max_date" data-fixed="true" :p-date="{ s_date: topSearchInputDatas.s_date, e_date: topSearchInputDatas.e_date }"></comp-datepicker>
                        </td>
                    </tr>
                </template>

                <template slot="input_result">
                    <strong>{{ topSearchInputDatas.s_date.date }} ~ {{ topSearchInputDatas.e_date.date }}</strong>
                    <span
                        >{{ topSearchInputDatas.ps_date.date }} ~ {{ topSearchInputDatas.pe_date.date }}
                        <hr />
                        POP</span
                    >
                </template>

                <!-- 결과 -->
                <template slot="results">
                    <span class="item">
                        <span>{{ topSearchDatas.ps_date ? topSearchDatas.ps_date.date + ' ~ ' + topSearchDatas.pe_date.date + ' vs ' : '' }}</span>
                        <strong>{{ topSearchDatas.s_date ? topSearchDatas.s_date.date + ' ~ ' + topSearchDatas.e_date.date : '' }}</strong>
                    </span>
                </template>
            </comp-topsearch>
            <!-- // 검색조건 -->

            <!-- 본문 컨텐츠 -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap is-cols-pad">
                            <div class="ui_col w12">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>라이프사이클</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/templates/volume" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>라이프사이클 템플릿<br />연관키워드의 기간 내 변화를 볼수 있음.</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>성별/연령 차트 포함</strong> : 성별/연령별 차트 포함 여부부</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="ui_function">
                                        <div class="rc">
                                            <comp-switch-btn id="set_useOtherChart" class="is-small" v-model="set.useOtherChart" label="성별/연령 차트 포함"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="set_usedNoneData" class="is-small" v-model="set.usedNoneData" label="데이터없음"></comp-switch-btn>
                                        </div>
                                    </div>

                                    <div class="content">
                                        <div class="wrap">
                                            <tmpl-inc-genderage id="lifecycle" :common-search-opts="topSearchDatas" class="is-2dp" :onlyLifecycle="!set.useOtherChart" :isNoData="set.usedNoneData"></tmpl-inc-genderage>
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
import '@shared/utils/index';
export default {
    name: 'template-inc-genderage',

    data() {
        return {
            set: {
                useOtherChart: true,
                usedNoneData: false,
            },
            s_tmpDate: new Date(2022, 8, 12, 0, 0, 0).dateToStr(),
            e_tmpDate: new Date(2022, 8, 20, 0, 0, 0).dateToStr(),
            ps_tmpDate: new Date(2022, 8, 1, 0, 0, 0).dateToStr(),
            pe_tmpDate: new Date(2022, 8, 9, 0, 0, 0).dateToStr(),
            topSearchInputDatas: {
                // 날짜(달력)
                s_date: {
                    date: new Date().dateToStr(),
                },
                e_date: {
                    date: new Date().dateToStr(),
                },
                ps_date: {
                    date: new Date().dateToStr(),
                },
                pe_date: {
                    date: new Date().dateToStr(),
                },
                min_date: '2021-01-01',
                max_date: new Date().dateToStr(),
                p_min_date: '2021-01-01',
                p_max_date: new Date().dateToStr(),
            },
            topSearchDatas: {},
            topSearchDatasClone: {}, // 인기검색어 순위변화에서 사용하는 검색조건(분석대상 포함)

            keywordList: [],
            exists: false,
        };
    },

    computed: {
        getDateGrp() {
            let date = new Date();
            return [0, 7, date.getMonth() - 1 + 'M', date.getMonth() + 'M', date.getMonth() + 1 + 'M'];
        },
    },
    watch: {},

    mounted() {},

    methods: {
        setTopSearchDatasClone(val) {
            this.topSearchDatasClone = JSON.parse(JSON.stringify(val));
        },
    },
};
</script>

<style lang="scss" scoped></style>
