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
                                            <h3>
                                                <span>인기 검색어 순위변화</span>
                                            </h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/templates/modal/relinfo" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <strong>검색어 설정</strong>
                                                        <ul>
                                                            <li><strong>검색어</strong> : 검색어 있는 경우 검색어 설정</li>
                                                            <li><strong>현재 페이지 보기</strong> : 현재 페이지 위치를 보여줌(검색어 사용 시)</li>
                                                            <li><strong>사용자 색상</strong> : 사용자 색상 정의(검색어 사용 시)</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>검색 기간</strong> : 데이터 검색 기간</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>검색어 수량</strong> : 검색어 수량</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>분석목록</strong> : Table(본문)의 배경을 흰색으로 고정</span>
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
                                                <template v-slot:title>검색어 설정</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>검색어</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-selectbox id="set_template" v-model="set.analsKeyword" :opts="[{ code: '', name: '없음' }, ...analsList]"></comp-selectbox>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>현재 페이지 보기</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-switch-btn id="set_usedPaging" class="is-small" v-model="set.usedPaging" :disabled="set.analsKeyword === ''"></comp-switch-btn>
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>사용자 색상</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-list id="custom_rank_list" :disabled="set.analsKeyword === ''" :datas="set.customColor.default" :component="getRankComponent" @add="evt_itemAdd" @confirm="evt_confirm" @remove="evt_itemRemove"></comp-list>
                                                        </dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                            <hr />
                                            <div class="grp">
                                                <strong>검색 기간</strong>
                                                <comp-datepicker id="ts_dp_s" :s_date.sync="topSearchInputDatas.s_date" :e_date.sync="topSearchInputDatas.e_date" range="2Y" :min_date.sync="topSearchInputDatas.min_date" :max_date.sync="topSearchInputDatas.max_date" :c_type_opts="null"></comp-datepicker>
                                            </div>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>검색어 수량</strong>
                                                <comp-input-box id="set_dateMaxRange" type="number" min="10" max="100" v-model="set.len" label="검색어 수량 입력" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_usedWhiteBg" class="is-small" v-model="set.usedWhiteBg" label="배경(화이트)"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_usedNoneData" class="is-small" v-model="set.usedNoneData" label="데이터없음"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_row">
                                                <div class="wrap">
                                                    <div class="ui_col">
                                                        <div class="ui_box is-2dp">
                                                            <div class="header">
                                                                <div class="wrap">
                                                                    <h4>
                                                                        <span>인기 검색어 순위변화</span>
                                                                        <div v-if="topSearchInputDatas?.analsList[0]" class="sub_title">
                                                                            <span>{{ topSearchInputDatas.analsList[0].name }}</span>
                                                                        </div>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <div class="content ui-loader-container" :class="{ 'is-loading': loading }">
                                                                <tmpl-hot-keyword id="tmp-hot-keyword-01" :class="{ 'is-white': set.usedWhiteBg }" :common-search-opts="topSearchInputDatas" :keyword-list="keywordList" :rankRange="set.len" :focousBoxOnOff="set.usedPaging" :customColor="set.customColor"></tmpl-hot-keyword>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
</template>
<script>
import { uuid } from 'vue-uuid';
import moment from 'moment';
import { API_rkeyword } from '@shared/api/rkeyword';

import CompListColor from './ListColor.vue';

export default {
    name: 'template-hot_keyword_rank_table-page',
    data() {
        return {
            apiUID: uuid.v4(),
            topSearchInputDatas: {
                s_date: {
                    date: moment().subtract(2, 'month').format('YYYY-MM-DD'),
                },
                e_date: {
                    date: new Date().dateToStr(),
                },
                min_date: '2021-01-01',
                max_date: new Date().dateToStr(),

                //분석대상
                analsList: [],
            },
            analTargets: [],
            loading: true,
            analsList: [],
            keywordList: [],
            set: {
                len: 20,
                usedPaging: false,
                usedNoneData: false,
                analsKeyword: '',
                usedWhiteBg: false,
                customColor: {
                    default: [
                        // rank, color(Only Hex code)
                        { code: '1', name: '5', rank: '5', color: '#f26522' },
                        { code: '2', name: '10', rank: '10', color: '#99cc00' },
                        { code: '3', name: '15', rank: '15', color: '#3366cc' },
                        { code: '4', name: '20', rank: '20', color: '#666666' },
                    ],
                },
            },
        };
    },
    computed: {
        getRankComponent() {
            return CompListColor;
        },
        getDateGrp() {
            const date = new Date();
            return [0, 7, date.getMonth() - 1 + 'M', date.getMonth() + 'M', date.getMonth() + 1 + 'M'];
        },
        getDateArr() {
            // api 루프 횟수 및 각 테이블 별 검색 조건 날짜 설정
            let dateArr = [];
            let start_date = this.topSearchInputDatas?.s_date?.date;
            let end_date = this.topSearchInputDatas?.e_date?.date;

            if (typeof start_date === 'string') {
                let index = 0;
                let start = new Date(start_date.getDayDate(0));
                let end = start.dateToStr().getDayDate(6);

                while (end_date.strToDate() > end.strToDate()) {
                    start = new Date(start_date.getDayDate(0));
                    start.setDate(start.getDate() + 7 * index);
                    end = start.dateToStr().getDayDate(6);

                    if (index > 0) {
                        dateArr.push({ s_date: { date: start.dateToStr() }, e_date: { date: end } });
                    } else {
                        dateArr.push({ s_date: { date: start_date }, e_date: { date: end } });
                    }
                    index++;
                }

                if (dateArr.length) {
                    dateArr[dateArr.length - 1] = {
                        s_date: { date: start.dateToStr() },
                        e_date: { date: end_date },
                    };
                } else {
                    dateArr[dateArr.length] = {
                        s_date: { date: start_date },
                        e_date: { date: end_date },
                    };
                }
            }
            return dateArr;
        },
    },
    watch: {
        'topSearchInputDatas.s_date'(val) {
            this.fetchData();
        },
        'topSearchInputDatas.e_date'(val) {
            this.fetchData();
        },
        'set.len': {
            deep: true,
            handler(val) {
                this.$set(this.topSearchInputDatas.analsList, 0, { ...this.analTargets[0] });
            },
        },
        'set.usedNoneData': {
            deep: true,
            handler(val) {
                this.fetchData();
                // this.$set(this.topSearchInputDatas.analsList, 0, { ...this.analTargets[0] });
            },
        },
        'set.analsKeyword'(val) {
            this.$set(this.topSearchInputDatas.analsList, 0, this.analsList.getParseDatas({ code: val })[0]);
        },
    },
    mounted() {
        this.$set(this.topSearchInputDatas.analsList, 0, this.analsList.getParseDatas({ code: this.set.analsKeyword })[0]);
        this.fetchData();
    },
    methods: {
        async fetchData() {
            if (this.set.usedNoneData) {
                this.keywordList = [];
                return;
            }

            this.loading = true;
            const params = JSON.parse(JSON.stringify(this.topSearchInputDatas));
            params.row_limit = this.set.len;
            const promises = this.getDateArr.map(async (item, idx) => {
                const apiUID = uuid.v4();
                const promiseParam = { ...params, s_date: item.s_date.date, e_date: item.e_date.date };
                return await API_rkeyword(apiUID, promiseParam)
                    .then((res) => {
                        return {
                            s_date: item.s_date.date,
                            e_date: item.e_date.date,
                            weekend: item.s_date.date.getWeekend(),
                            list: res.data,
                        };
                    })
                    .catch(function ($err) {
                        console.error($err);
                    });
            });

            await Promise.allSettled(promises)
                .then((res) => {
                    this.keywordList = [];
                    res.forEach((item) => {
                        if (item.status === 'fulfilled') {
                            this.keywordList.push(item.value);
                        }
                    });
                })
                .finally(() => {
                    this.loading = false;
                    this.setAnalsList();
                });
        },

        // 데이터 가져온 후, 분석 대상 목록 변경
        setAnalsList() {
            const allKeywords = this.keywordList.flatMap((item) => item.list);
            const uniqueKeywords = new Set();
            const uniqueList = allKeywords.filter((keyword) => {
                if (!uniqueKeywords.has(keyword.name)) {
                    uniqueKeywords.add(keyword.name);
                    return true;
                }
                return false;
            });

            this.analsList = uniqueList.map((item, idx) => {
                return { code: item.name, name: item.name };
            });
        },

        evt_itemAdd() {
            this.set.customColor.default.push({
                code: `${this.set.customColor.default.length + 1}`,
                name: '추가 순위',
                rank: '추가 순위',
                fill: '#ff0000',
            });
        },
        evt_itemRemove(tg) {
            const index = this.set.customColor.default.findIndex((item) => item.code === tg.code && item.rank === tg.rank);
            this.set.customColor.default.splice(index, 1);
        },
        evt_confirm(val) {
            this.$set(this.set.customColor.default, val.index, val.item);
        },
    },
};
</script>
