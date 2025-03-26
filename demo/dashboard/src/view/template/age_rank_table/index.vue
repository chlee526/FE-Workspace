<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
        <div class="wrap">
            <comp-side-follow></comp-side-follow>
            <comp-location></comp-location>
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap is-cols-pad">
                            <div class="ui_col w12">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>성별/연령별 인기 검색어 순위</span>
                                            </h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/templates/age_rank_table" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <strong>검색어 설정</strong>
                                                        <ul>
                                                            <li><strong>검색어</strong> : 템플릿 선택 키워드</li>
                                                            <li><strong>리스트</strong> : 키워드 검색 조건 추가/수정/삭제</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>검색 기간</strong> : 데이터 검색 기간</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>검색어 수량</strong> : 검색어 수량</span>
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
                                            <div class="grp">
                                                <comp-filter-grp pos="BL" style="z-index: 3">
                                                    <template #title> 검색어 설정 </template>
                                                    <template #items>
                                                        <dl>
                                                            <dt>
                                                                <strong>검색어</strong>
                                                            </dt>
                                                            <dd>
                                                                <comp-selectbox id="set_template" class="is-small" v-model="set.analsKeyword" :opts="[{ code: '', name: '없음' }, ...analsList]"></comp-selectbox>
                                                            </dd>
                                                            <dt>
                                                                <strong>리스트</strong>
                                                            </dt>
                                                            <dd>
                                                                <comp-list :datas="set.keywordList" :component="getRankComponent" @add="evt_itemAdd" @confirm="evt_confirm" @remove="evt_itemRemove"></comp-list>
                                                            </dd>
                                                        </dl>
                                                    </template>
                                                </comp-filter-grp>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>검색 기간</strong>
                                                <comp-datepicker id="ts_dp_s" :s_date.sync="topSearchInputDatas.s_date" :e_date.sync="topSearchInputDatas.e_date" range="2Y" :min_date.sync="topSearchInputDatas.min_date" :max_date.sync="topSearchInputDatas.max_date" :c_type_opts="null"></comp-datepicker>
                                            </div>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>검색어 수량</strong>
                                                <comp-input-box id="set_lenMaxRange" type="number" min="10" max="100" v-model="set.len" label="검색어 수량 입력" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_usedNoneData" class="is-small" v-model="set.usedNoneData" label="데이터없음"></comp-switch-btn>
                                            </div>
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
                                                                    <h4><span>성별/연령별 인기검색어 순위</span></h4>
                                                                </div>
                                                            </div>
                                                            <div class="content">
                                                                <tmpl-page_age_rank id="trend-compare-gender-age-charts" v-model="topSearchDatasClone" :keywordList="keywordList" :common-search-opts="topSearchInputDatas" :rankRange="set.len" @updateOpts="evt_update" />
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
    </div>
</template>

<script>
import EventBus from '@shared/utils/eventBus';
import moment from 'moment';

import CompListKeyword from './KeywordItem.vue';

export default {
    name: 'template-age_rank_table-page',
    data() {
        return {
            focusWord: '',
            keywords: [],
            topSearchDatasClone: [],
            topSearchInputDatas: {
                s_date: {
                    date: moment().subtract(2, 'month').format('YYYY-MM-DD'),
                },
                e_date: {
                    date: new Date().dateToStr(),
                },
                min_date: '2021-01-01',
                max_date: new Date().dateToStr(),

                order_type: 'T',
                use_popularity: true,
            },
            keywordList: [],
            set: {
                len: 20,
                usedNoneData: false,
                analsKeyword: '',
                keywordList: [
                    { name: '0', age: '10', gender: 'ALL' },
                    { name: '1', age: '20', gender: 'f' },
                    { name: '2', age: '30', gender: 'm' },
                    { name: '3', age: '40', gender: 'f' },
                ],
            },
            analsList: [],
        };
    },

    computed: {
        getRankComponent() {
            return CompListKeyword;
        },
        getGenderOpts() {
            let genders = this.$store.getters.getGender.map((item) => {
                if (item.code === 'ALL') {
                    item.name = '성별 전체';
                }
                return item;
            });
            return genders;
        },
        getAgeOpts() {
            let ages = this.$store.getters.getAge.map((item) => {
                if (item.code === 'ALL') {
                    item.name = '연령 전체';
                }
                return item;
            });
            return ages;
        },
        getEmptyLength() {
            // 데이터 없는 테이블 갯수 반환
            let { length } = this.keywordList;
            return length % 4 > 0 ? 4 - (length % 4) : 0;
        },
    },
    created() {
        // template 검색 조건 변경 위한 EventBus 할당
        EventBus.$on('age_setAnalsList', this.setAnalsList);
    },
    mounted() {
        this.fetchData();
    },
    beforeDestroy() {
        // EventBus 할당 건 제거
        EventBus.$off('age_setAnalsList');
    },
    watch: {
        'set.usedNoneData'(val) {
            this.fetchData();
        },

        'set.analsKeyword'(val) {
            const filterList = structuredClone(this.analsList);

            const obj = filterList.filter((item) => {
                if (item.code == val) {
                    item.name = item.originName;
                    delete item.originName;
                    return item;
                }
            });

            if (obj.length) {
                this.topSearchDatasClone = obj;
            } else {
                this.topSearchDatasClone = [];
            }
        },

        'topSearchInputDatas.s_date.date'(val) {
            this.fetchData();
        },
        'topSearchInputDatas.e_date.date'(val) {
            this.fetchData();
        },

        topSearchDatasClone(val) {
            if (val.length) {
                this.set.analsKeyword = val[0].code;
            }
        },
    },
    methods: {
        // 단어에 마우스 오버시 포커싱 css적용
        updateFocusWord(newVal) {
            this.focusWord = newVal;
        },

        fetchData() {
            this.analsList = [];
            this.keywordList = [];

            if (this.set.usedNoneData) {
                this.keywordList = [];
                return;
            }

            this.set.keywordList.forEach((keyword) => {
                this.keywordList.push([
                    {
                        name: 'gender',
                        list: [...this.getGenderOpts],
                        dv: keyword.gender,
                    },
                    {
                        name: 'age',
                        list: [...this.getAgeOpts],
                        dv: keyword.age,
                    },
                ]);
            });
        },

        /**
         * 검색어 설정 리스트에 보여주기 위한 list 재파싱 methods
         *
         * 성별/연령별로 리스트마다 fetch 후 data 리스트를 받아와 검색어 설정 리스트에 할당 처리
         *
         */
        setAnalsList(val) {
            let arr = structuredClone([...val]);

            arr = arr.map((item) => {
                item.originName = item.name;
                item.name = '조건 ' + item.code.split('_')[0] + '_' + item.name;
                return item;
            });

            const tmp = this.analsList.slice(0, arr[0].code.split('_')[0] * this.set.len);

            this.analsList = [...new Set([...tmp, ...arr])].sort((a, b) => a.id - b.id);
        },

        evt_itemAdd() {
            this.set.keywordList.push({ name: String(this.set.keywordList.length), age: '', gender: '' });

            this.keywordList.push([
                {
                    name: 'gender',
                    list: [...this.getGenderOpts],
                    dv: '',
                },
                {
                    name: 'age',
                    list: [...this.getAgeOpts],
                    dv: '',
                },
            ]);
        },

        evt_confirm(prop) {
            this.set.keywordList = this.set.keywordList.map((keyword) => {
                if (keyword.name == prop.item.name) {
                    keyword = { ...prop.item };
                }
                return keyword;
            });

            this.keywordList[prop.index].forEach((item) => {
                if (item.name == 'gender') {
                    item.dv = prop.item.gender;
                }

                if (item.name == 'age') {
                    item.dv = prop.item.age;
                }
            });
        },

        evt_itemRemove(val) {
            this.analsList = this.analsList.filter((item) => {
                if (item.id != val.name) {
                    return item;
                }
            });

            const index = this.set.keywordList.findIndex((item) => item.name === val.name && item.age === val.age && item.gender == val.gender);
            this.set.keywordList.splice(index, 1);
            this.keywordList.splice(index, 1);
        },

        evt_update(val) {
            this.analsList = this.analsList.filter((item) => item.id != val.id);

            this.set.keywordList = this.set.keywordList.map((keyword, idx) => {
                if (idx == val.id) {
                    keyword = { ...keyword, gender: val.gender, age: val.age };
                }

                return keyword;
            });

            this.keywordList.forEach((keyword, idx) => {
                if (val.id == idx) {
                    keyword = keyword.map((item) => {
                        if (item.name == 'gender') {
                            item.dv = val.gender;
                        } else {
                            item.dv = val.age;
                        }

                        return item;
                    });
                }
            });
        },
    },
};
</script>
