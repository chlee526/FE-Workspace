<template>
    <div class="ui_box is-2dp" style="height: 100%">
        <div class="ui_function is-box is-small">
            <div class="rc">
                <comp-radio-grp :id="id + '_viewtype'" class="is-icon is-small" :opts="viewTypeOpts" :name="id + '_viewtype'" v-model="selViewType" :box="true"></comp-radio-grp>
                <hr v-if="$store.getters.getExcelUsage" />
                <comp-button v-if="$store.getters.getExcelUsage" class="is-icon-only is-small" title="Excel 다운로드" @click="evt_excel" :loading="excelLoading"><span class="icon">&#xe005;</span></comp-button>
            </div>
        </div>

        <div class="content ui-loader-container" :class="{ 'is-loading': loading }">
            <!-- 클라우드 -->
            <div v-show="selViewType == '1'" class="wordcloud_4zone">
                <div class="wrap" :class="{ ui_nodata: !chartOrderType || !chartOrderType.length }">
                    <div v-for="($item, $idx) in chartOrderType" v-bind:key="$idx" class="cloud">
                        <div class="area" :style="'--color:' + $item.color">
                            <span>{{ $item.name }}</span>
                        </div>
                        <comp-chart-wordcloud :id="id + '_' + $idx" :opts="chartOpts" :view-type="selViewType" :use-view-type="false" :chart-data="$item" :rotation="false" toggleType="one" v-model="selected" style="height: 246px"></comp-chart-wordcloud>
                    </div>
                </div>
            </div>

            <!-- 게시판 -->
            <div v-show="selViewType == '2'" class="wordcloud_4zone is-brd">
                <div class="wrap" :class="{ ui_nodata: !chartDatas || !chartDatas.length }">
                    <div class="ui_brd is-hgt-fixed is-data-v2">
                        <div class="wrap" ref="brd">
                            <table ref="crossOverBrd">
                                <colgroup>
                                    <col style="" />
                                    <col style="width: 40px" />
                                    <col style="width: 40px" />
                                    <col style="width: 40px" />
                                    <col style="width: 40px" />
                                    <col style="width: 140px" />
                                    <col style="width: 140px" />
                                    <col style="width: 140px" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th><strong>인기 검색어</strong></th>
                                        <th>
                                            <button :class="sortOpt === 'in' && 'active'" @click="setToggle('in')" :style="sortOpt === 'in' && 'background: #9A87FA; color: #fff'"><strong>In</strong></button>
                                        </th>
                                        <th>
                                            <button :class="sortOpt === 'hot' && 'active'" @click="setToggle('hot')" :style="sortOpt === 'hot' && 'background: #FF7E87; color: #fff'"><strong>Hot</strong></button>
                                        </th>
                                        <th>
                                            <button :class="sortOpt === 'top' && 'active'" @click="setToggle('top')" :style="sortOpt === 'top' && 'background: #005DC1; color: #fff'"><strong style="top: 4px">Top</strong></button>
                                        </th>
                                        <th>
                                            <button :class="sortOpt === 'out' && 'active'" @click="setToggle('out')" :style="sortOpt === 'out' && 'background: #DB884B; color: #fff'"><strong>Out</strong></button>
                                        </th>
                                        <th><strong>비교기간 평균순위</strong><comp-table-sort id="compare_rank" name="compare_rank_sort" v-model="sortOpt"></comp-table-sort></th>
                                        <th><strong>검색기간 평균순위</strong><comp-table-sort id="cur_rank" name="cur_rank_sort" v-model="sortOpt"></comp-table-sort></th>
                                        <th><strong>평균 순위 변화</strong><comp-table-sort id="factor_rank" name="factor_rank_sort" v-model="sortOpt"></comp-table-sort></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="($item, $idx) in chartDatas" :key="$idx">
                                        <td :class="{ 'is-custom-active': selected && selected[0].code.substring(1) === $item.code, 'is-focus': selected && selected[0].name === $item.name }" :style="selected && selected[0].code.substring(1) === $item.code ? '--color:' + selected[0].color : ''">
                                            <button @click="evt_brdItemClick($item)">
                                                <span class="keyword">{{ $item.name }}</span>
                                            </button>
                                        </td>
                                        <td class="no_data"><div class="bgSel" :style="$item.attr_type_code && String($item.attr_type_code).indexOf('in') >= 0 ? 'background: #9A87FA' : ''"></div></td>
                                        <td class="no_data"><div class="bgSel" :style="$item.attr_type_code && String($item.attr_type_code).indexOf('hot') >= 0 ? 'background: #FF7E87' : ''"></div></td>
                                        <td class="no_data"><div class="bgSel" :style="$item.attr_type_code && String($item.attr_type_code).indexOf('top') >= 0 ? 'background: #005DC1' : ''"></div></td>
                                        <td class="no_data"><div class="bgSel" :style="$item.attr_type_code && String($item.attr_type_code).indexOf('out') >= 0 ? 'background: #DB884B' : ''"></div></td>
                                        <td class="no_data">
                                            <span :class="{ ui_fc_dm2: $item.compare_rank === 21 }"> {{ $item.compare_rank === 21 ? '20위+' : String($item.compare_rank) + '위' }}</span>
                                        </td>
                                        <td class="no_data">
                                            <span :class="{ ui_fc_dm2: $item.cur_rank === 21 }"> {{ $item.cur_rank === 21 ? '20위+' : String($item.cur_rank) + '위' }}</span>
                                        </td>
                                        <td class="no_data"><span class="ui_fluc" v-html="$item.factor_rank.numToFlucHtml('', 1)"></span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { API_rkeywordWithDLab } from '@shared/api/rkeyword.js';
import EventBus from '@shared/utils/eventBus';
import { uuid } from 'vue-uuid';
export default {
    name: 'tmpl-lifecycle-wordclouds',
    data() {
        return {
            apiUID: uuid.v4(),
            apiParams: null,
            loading: false,
            excelLoading: false, // 엑셀 로딩 체크
            selKeyword: null, // 선택 키워드
            selViewType: '1', // 보기 타입
            viewTypeOpts: [
                // 보기 옵션
                { code: '1', type: 'Cloud', name: '&#xe033;' },
                { code: '2', type: '게시판', name: '&#xe025;' },
            ],
            // 차트 옵션
            chartOpts: {
                maxFont: 60,
            },
            // 차트 정렬
            chartOrderType: [
                { code: 'I', name: 'In', color: '#9A87FA', txtColor: '#9A87FA', data: [] },
                { code: 'H', name: 'Hot', color: '#FF7E87', txtColor: '#FF7E87', data: [] },
                { code: 'O', name: 'Out', color: '#DB884B', txtColor: '#DB884B', data: [] },
                { code: 'T', name: 'Top', color: '#005DC1', txtColor: '#005DC1', data: [] },
            ],
            // 차트 데이터
            chartDatas: [],
            // 게시판 - 기본 정렬 옵션
            sortOpt: 'factor_rank^D',
        };
    },
    props: {
        commonSearchOpts: { type: Object }, // 기본 검색 조건
        id: { type: String },
        value: {},
        template: { type: String }, // 템플릿 번호
        isNoData: { type: Boolean, default: false }, // 데이터 없음 강제 설정
    },

    computed: {
        selected: {
            get: function () {
                return this.value;
            },
            set: function ($val) {
                this.$emit('input', $val);
            },
        },

        getChartDatas() {
            let datas = JSON.parse(JSON.stringify(this.chartDatas));
            let result = JSON.parse(JSON.stringify(this.chartOrderType));

            let filterData = datas.filter((item) => {
                return item.attr_type_code !== undefined && item.attr_type_code !== '';
            });

            filterData.forEach(($item) => {
                let attrArr = $item.attr_type_code.split(',');
                attrArr.forEach((val) => {
                    if (val === 'in') result[0].data.push(JSON.parse(JSON.stringify($item)));
                    if (val === 'hot') result[1].data.push(JSON.parse(JSON.stringify($item)));
                    if (val === 'top') result[3].data.push(JSON.parse(JSON.stringify($item)));
                    if (val === 'out') result[2].data.push(JSON.parse(JSON.stringify($item)));
                });
            });

            result.forEach((type) => {
                if (this.isNoData) {
                    // console.log(type);
                    type.data = [];
                } else {
                    type.data.forEach((item) => {
                        item.code = type.code + item.code;
                        item.color = type.color;
                        item.txtColor = type.txtColor;
                    });
                }
            });

            this.selectKeyword(result);

            console.log(result);

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

        sortOpt(val) {
            this.setRankSort(val);
        },

        selViewType(val) {
            this.$refs.brd.scrollTo(0, 0);
        },

        isNoData(val) {
            this.chartOrderType = this.getChartDatas;
        },
    },

    methods: {
        async fetchData() {
            this.loading = true;
            this.apiParams = JSON.parse(JSON.stringify(this.commonSearchOpts));
            delete this.apiParams.category;

            await API_rkeywordWithDLab(this.apiUID, this.apiParams)
                .then((res) => {
                    // 임시데이터
                    // res.data = [
                    //     { W0: 15, W0_COM: 17, W1: 15, W1_COM: 18, W2: 11, W2_COM: 21, W3: 9, W3_COM: 17, attr_type_code: 'hot', code: '단백질보충제', compare_rank: 18.3, cur_rank: 12.5, factor_rank: 5.8, name: '단백질보충제' },
                    //     { W0: 21, W0_COM: 21, W1: 21, W1_COM: 21, W2: 7, W2_COM: 21, W3: 8, W3_COM: 15, attr_type_code: 'hot', code: '홍가리비', compare_rank: 19.5, cur_rank: 14.3, factor_rank: 5.3, name: '홍가리비' },
                    //     { W0: 2, W0_COM: 21, W1: 21, W1_COM: 21, W2: 21, W2_COM: 21, W3: 21, W3_COM: 21, attr_type_code: 'in', code: '흑염소진액', compare_rank: 21, cur_rank: 16.3, factor_rank: 4.8, name: '흑염소진액' },
                    //     { W0: 21, W0_COM: 21, W1: 21, W1_COM: 21, W2: 21, W2_COM: 21, W3: 21, W3_COM: 20, attr_type_code: 'out', code: '해남고구마', compare_rank: 20.8, cur_rank: 21, factor_rank: -0.3, name: '해남고구마' },
                    //     { W0: 7, W0_COM: 21, W1: 21, W1_COM: 21, W2: 21, W2_COM: 21, W3: 21, W3_COM: 5, code: '양배추즙', compare_rank: 17, cur_rank: 17.5, factor_rank: -0.5, name: '양배추즙' },
                    //     { W0: 16, W0_COM: 11, W1: 12, W1_COM: 9, W2: 19, W2_COM: 11, W3: 19, W3_COM: 10, code: '오쏘몰이뮨', compare_rank: 10.3, cur_rank: 16.5, factor_rank: -6.3, name: '오쏘몰이뮨' },
                    //     { W0: 21, W0_COM: 21, W1: 20, W1_COM: 21, W2: 6, W2_COM: 21, W3: 21, W3_COM: 21, attr_type_code: 'in', code: '녹용', compare_rank: 21, cur_rank: 17, factor_rank: 4, name: '녹용' },
                    //     { W0: 10, W0_COM: 21, W1: 21, W1_COM: 21, W2: 21, W2_COM: 21, W3: 21, W3_COM: 21, attr_type_code: 'in', code: '화이트데이사탕', compare_rank: 21, cur_rank: 18.3, factor_rank: 2.8, name: '화이트데이사탕' },
                    //     { W0: 12, W0_COM: 21, W1: 21, W1_COM: 21, W2: 21, W2_COM: 21, W3: 21, W3_COM: 21, attr_type_code: 'in', code: '화이트데이선물', compare_rank: 21, cur_rank: 18.8, factor_rank: 2.3, name: '화이트데이선물' },
                    //     { W0: 20, W0_COM: 16, W1: 19, W1_COM: 21, W2: 21, W2_COM: 17, W3: 15, W3_COM: 21, code: '콘드로이친', compare_rank: 18.8, cur_rank: 18.8, factor_rank: 0, name: '콘드로이친' },
                    //     { W0: 21, W0_COM: 21, W1: 21, W1_COM: 21, W2: 21, W2_COM: 21, W3: 14, W3_COM: 11, code: '비타민d', compare_rank: 18.5, cur_rank: 19.3, factor_rank: -0.8, name: '비타민d' },
                    //     { W0: 5, W0_COM: 6, W1: 3, W1_COM: 5, W2: 3, W2_COM: 3, W3: 4, W3_COM: 4, attr_type_code: 'top', code: '아르기닌', compare_rank: 4.5, cur_rank: 3.8, factor_rank: 0.8, name: '아르기닌' },
                    //     { W0: 6, W0_COM: 10, W1: 4, W1_COM: 8, W2: 5, W2_COM: 4, W3: 7, W3_COM: 2, attr_type_code: 'top', code: '쌀20kg', compare_rank: 6, cur_rank: 5.5, factor_rank: 0.5, name: '쌀20kg' },
                    //     { W0: 4, W0_COM: 3, W1: 2, W1_COM: 3, W2: 2, W2_COM: 2, W3: 1, W3_COM: 3, attr_type_code: 'top', code: '오메가3', compare_rank: 2.8, cur_rank: 2.3, factor_rank: 0.5, name: '오메가3' },
                    //     { W0: 1, W0_COM: 1, W1: 1, W1_COM: 1, W2: 1, W2_COM: 1, W3: 2, W3_COM: 1, attr_type_code: 'top', code: '닭가슴살', compare_rank: 1, cur_rank: 1.3, factor_rank: -0.3, name: '닭가슴살' },
                    //     { W0: 21, W0_COM: 7, W1: 21, W1_COM: 7, W2: 21, W2_COM: 10, W3: 21, W3_COM: 21, attr_type_code: 'out', code: '고구마', compare_rank: 11.3, cur_rank: 21, factor_rank: -9.8, name: '고구마' },
                    // ];

                    if (res.data.length > 0) {
                        let tmpData = JSON.parse(JSON.stringify(res.data));
                        // 기본정렬 - 순위변화 내림차순
                        tmpData.sort(function (a, b) {
                            if (a.factor_rank > b.factor_rank) return -1;
                            if (a.factor_rank < b.factor_rank) return 1;
                        });

                        this.chartDatas = tmpData;
                    } else {
                        this.chartDatas = res.data;
                    }

                    this.chartOrderType = this.getChartDatas;
                    this.loading = false;
                })
                .catch(($err) => {
                    console.log('*********************************************************');
                    console.log($err);
                    this.loading = false;
                });
        },

        // 마운트시 키워드 선택
        selectKeyword(val) {
            let firstData = JSON.parse(JSON.stringify(val)).find((type) => {
                return type.data.length > 0;
            });
            if (firstData) {
                let minData = firstData.data[0];
                if (firstData.code === 'O') {
                    // out 일 경우 비교기간 순위 기준 가장 상위 키워드 선택
                    for (let i = 0; i < firstData.data.length; i++) {
                        if (firstData.data[i].compare_rank < minData.compare_rank) {
                            minData = firstData.data[i];
                        }
                    }
                } else {
                    for (let i = 0; i < firstData.data.length; i++) {
                        // out 외 검색기간 순위 기준 가장 상위 키워드 선택
                        if (firstData.data[i].cur_rank < minData.cur_rank) {
                            minData = firstData.data[i];
                        }
                    }
                }

                this.selected = [minData];
            } else {
                this.selected = null;
            }
        },

        // 데이터 정렬
        setRankSort(val) {
            let tmpVal = JSON.parse(JSON.stringify(val));
            let order = tmpVal.substr(-1);
            let sortKeyword = tmpVal.substring(0, tmpVal.indexOf('^'));
            let datas = JSON.parse(JSON.stringify(this.chartDatas));

            // 속성 정렬(in,hot,top,out)
            if (sortKeyword === '') {
                let sortArr = [];
                datas.forEach((item) => {
                    if (item.attr_type_code && String(item.attr_type_code).indexOf(val) >= 0) sortArr.push(item);
                });
                let filtered = datas.filter((item2) => {
                    return String(item2.attr_type_code).indexOf(val) === -1 || !item2.attr_type_code;
                });
                this.chartDatas = sortArr.concat(filtered);
            } else {
                // 순위 정렬 (비교기간,검색기간,순위변화)
                let sortArr = JSON.parse(JSON.stringify(datas)).sort(function (a, b) {
                    if (Number(a[sortKeyword]) > Number(b[sortKeyword])) return order === 'D' ? -1 : 1;
                    if (Number(a[sortKeyword]) < Number(b[sortKeyword])) return order === 'D' ? 1 : -1;
                });
                this.chartDatas = sortArr;
            }

            this.$refs.brd.scrollTo(0, 0);
        },

        setToggle(val) {
            if (val === this.sortOpt) return;
            this.sortOpt = val;
        },

        // 게시판 아이템 클릭
        evt_brdItemClick(val) {
            let keyword = {};
            JSON.parse(JSON.stringify(this.chartOrderType)).forEach((type) => {
                let attr = val.attr_type_code ? val.attr_type_code.split(',')[0] : '';
                attr = attr.charAt(0).toUpperCase() + attr.slice(1);
                if (type.name === attr) {
                    type.data.forEach((item) => {
                        if (item.code.substring(1) == val.code) keyword = item;
                    });
                } else if (attr === '') {
                    val.color = '#999999';
                    keyword = val;
                }
            });
            this.selected = [keyword];
        },

        // 엑셀다운
        evt_excel() {
            let excelParams = JSON.parse(JSON.stringify(this.apiParams));
            excelParams.excel = true;
            excelParams.excel_id = 'st_anal_sec_01';

            this.excelLoading = true;
            this.$store.dispatch('NOTY_INFO', '엑셀 다운로드를 시작합니다.');

            API_rkeywordWithDLab(this.apiUID, excelParams)
                .then(($res) => {
                    EventBus.$emit('EXCEL_DOWN', $res);
                    this.$store.dispatch('NOTY_COM', '엑셀 다운로드가 완료되었습니다.');
                })
                .catch(($err) => {
                    this.$store.dispatch('NOTY_ERR', '엑셀 다운로드에 실패하였습니다.');
                    console.log('*********************************************************');
                    console.log($err);
                })
                .finally((res) => {
                    this.excelLoading = false;
                });
        },
    },
};
</script>

<style lang="scss" scoped></style>
