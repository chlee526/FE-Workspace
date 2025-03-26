<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
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
                                            <h3><span>Column Chart</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/chart/column_line" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <strong>카테고리/그래프 설정</strong>
                                                        <ul>
                                                            <li><strong>카테고리 갯수</strong> : 카테고리(x축) 갯수 설정</li>
                                                            <li><strong>날짜 데이터 사용</strong> : 카테고리(x축)를 날짜로 사용</li>
                                                            <li><strong>비교기간 카테고리 갯수</strong> : 카테고리(x축) 비교기간 삽입 및 갯수 설정 (날짜일때만 사용 가능)</li>
                                                            <li><strong>다중 카테고리 갯수</strong> : 카테고리(x축)의 날짜가 아이템마다 다를 때 (ex: 고급검색 키워드 별로 보는데 날짜가 다를 때, 날짜일때만 사용 가능)</li>
                                                            <li><strong>그래프 갯수</strong> : 그래프(범례) 갯수, 색상지정도 가능하며 지정하지 않을 시 정해진 색상으로 표현 (최대 15개)</li>
                                                            <li><strong>고정형 라인 추가</strong> : 마지막에 Line으로 된 그래프 강제 추가, 전체 수량에 포함하지 않을 수 있음 (ex: 컬럼(정보량)과 라인(추이)을 이용하는 차트)</li>
                                                            <li><strong>추가 Y축 사용</strong> : 고정형 라인읠 Y축을 추가해서 사용</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : 차트의 가로*세로 사이즈(px)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>그래프 선택여부</strong> : 사용자가 변경하여 볼수 있는 차트 목록 제공</span>
                                                    </li>
                                                    <li>
                                                        <strong>범례</strong>
                                                        <ul>
                                                            <li>범례 표시 여부 및 위치</li>
                                                            <li><strong>정보량 포함</strong> : 범례에 정보량(점유율) 포함</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <comp-filter-grp>
                                                <template v-slot:title>카테고리/그래프</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>카테고리 갯수</strong>
                                                        </dt>
                                                        <dd><comp-input-box id="set_category_len" class="is-small" type="number" v-model="set.data.categoryLen" min="1" label="카테고리 갯수 입력" style="width: 80px"></comp-input-box></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>날짜 데이터 사용</strong>
                                                        </dt>
                                                        <dd><comp-switch-btn id="set_data_date" class="is-small" v-model="set.data.useDateData"></comp-switch-btn></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>비교기간 카테고리 갯수</strong>
                                                        </dt>
                                                        <dd><comp-input-box id="set_compare_category_len" class="is-small" type="number" v-model="set.data.categoryCompareLen" min="0" label="비교기간 카테고리 갯수 입력" style="width: 80px" :disabled="!set.data.useDateData"></comp-input-box></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>다중 카테고리 갯수</strong>
                                                        </dt>
                                                        <dd><comp-input-box id="set_category_len" class="is-small" type="number" v-model="set.data.multiCategoryLen" min="0" max="3" label="다중 카테고리 갯수 입력" style="width: 80px" :disabled="!set.data.useDateData"></comp-input-box></dd>
                                                    </dl>
                                                    <hr />
                                                    <dl>
                                                        <dt>
                                                            <strong>그래프 갯수</strong>
                                                        </dt>
                                                        <dd><comp-input-box id="set_graph_len" class="is-small" type="number" v-model="set.data.graphLen" min="1" max="15" label="그래프 갯수 입력" style="width: 80px"></comp-input-box></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>고정형 라인 추가</strong>
                                                        </dt>
                                                        <dd><comp-switch-btn id="set_graph_new" class="is-small" v-model="set.data.newGraph"></comp-switch-btn></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>추가 Y축 사용</strong>
                                                        </dt>
                                                        <dd><comp-switch-btn id="set_graph_newAxisY" class="is-small" v-model="set.data.newAxisY" :disabled="!set.data.newGraph"></comp-switch-btn></dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <span>크기</span>

                                                <comp-input-box id="set_wid" type="number" v-model="set.size.wid" placeholder="가로" label="가로크기 입력" min="350" style="width: 70px"></comp-input-box>
                                                <comp-input-box id="set_hgt" type="number" v-model="set.size.hgt" placeholder="세로" label="세로크기 입력" min="100" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>그래프선택여부</strong>
                                                <comp-selectbox id="set_graph_type" v-model="set.graphs.type" :opts="set.graphs.opts" :multiple="true" style="width: 150px"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_total" class="is-small" v-model="set.data.total" label="전체 수량"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>범례</strong>
                                                <comp-selectbox id="set_legend" v-model="set.legend.pos" :opts="set.legend.opts"></comp-selectbox>
                                                <comp-switch-btn id="set_legend_vol" class="is-small" v-model="set.legend.volume" label="정보량포함" :disabled="!set.legend.pos"></comp-switch-btn>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_row is-not-top-brd">
                                                <div class="wrap is-cols-pad">
                                                    <div class="ui_box is-2dp">
                                                        <div class="header">
                                                            <div class="wrap">
                                                                <h4>
                                                                    <span>컬럼</span>
                                                                    <div class="sub_title">
                                                                        <span title="클러스터" class="keyword">클러스터</span>
                                                                    </div>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                        <div class="content">
                                                            <div class="wrap">
                                                                <comp-chart-column-line id="chart" :chart-data="getData" type="column-stack" :type-opts="getGraphsTypeOpts" :date-type="set.data.useDateData ? 'day' : null" :total-label="set.data.total" :multiple-date="set.data.useDateData && set.data.multiCategoryLen > 1 ? getAnalTargets.default.arrObjAttrToStr('color').strToArr() : null" :legend="set.legend.pos" :legend-volume="set.legend.volume" @click="evt_chart_click" :style="getSize"></comp-chart-column-line>
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
import { mapGetters } from 'vuex';
import { merge } from 'lodash';

export default {
    name: 'page-chart_column_line',
    data() {
        return {
            tmpClick: false,
            set: {
                size: {
                    wid: null,
                    hgt: 500,
                },
                data: {
                    categoryLen: 10,
                    categoryCompareLen: 10,
                    multiCategoryLen: 0,
                    total: true,
                    graphLen: 3,
                    useDateData: true,
                    newGraph: false,
                    newAxisY: false,
                },
                graphs: {
                    type: 'line,column-cluster,column-stack,column-stack-100,bar-cluster,bar-stack,bar-stack-100',
                    opts: [
                        { code: 'line', name: '라인' },
                        { code: 'column-cluster', name: '가로' },
                        { code: 'column-stack', name: '가로 누적' },
                        { code: 'column-stack-100', name: '가로 누적 100%' },
                        { code: 'bar-cluster', name: '세로' },
                        { code: 'bar-stack', name: '세로 누적' },
                        { code: 'bar-stack-100', name: '세로 누적 100%' },
                    ],
                },
                useType: true,
                label: {
                    used: true,
                    txt1: '전체 정보량',
                    txt2: '1234',
                },
                legend: {
                    pos: 'top',
                    opts: [
                        { code: null, name: '사용안함' },
                        { code: 'top', name: '상단' },
                        { code: 'bottom', name: '아래' },
                        { code: 'right', name: '우측' },
                        { code: 'left', name: '좌측' },
                    ],
                    volume: true,
                },
            },
        };
    },
    computed: {
        ...mapGetters(['getAnalTargets']),
        getSize() {
            return `width: ${this.set.size.wid ? this.set.size.wid + 'px' : 'auto'}; height: ${this.set.size.hgt || 300}px`;
        },
        getGraphsTypeOpts() {
            return this.set.graphs.type.strToArr();
        },
        getData() {
            const _this = this;

            let tmpDate = new Date('2023-01-01');
            let tmpDate2 = new Date('2023-02-01');
            let tmpDate3 = new Date('2023-03-01');

            let result = {};
            result.graphs = [];
            if (this.set.data.graphLen > 0) {
                for (let Loop1 = 0; Loop1 < this.set.data.graphLen; ++Loop1) {
                    let graph = {
                        name: '그래프 ' + (Loop1 + 1),
                        graphCode: String(Loop1 + 1),
                        value_field: 'value_' + (Loop1 + 1),
                    };
                    result.graphs.push(graph);
                }
            }
            if (this.set.data.newGraph) {
                const cnt = parseInt(this.set.data.graphLen);
                let graph = {
                    name: '그래프 ' + (cnt + 1),
                    graphCode: String(cnt + 1),
                    value_field: 'value_' + (cnt + 1),
                    fill: '#000',
                    lineType: true,
                    newAxis: this.set.data.newAxisY ? {} : null,
                    exptTotal: true,
                };
                result.graphs.push(graph);
            }
            result.data = [];
            let addDataCnt = 0;
            if (this.set.data.useDateData) {
                for (let Loop1 = 0; Loop1 < this.set.data.categoryCompareLen; ++Loop1) {
                    addData(true);
                }
            }
            for (let Loop1 = 0; Loop1 < this.set.data.categoryLen; ++Loop1) {
                addData();
            }

            function addData(compare) {
                let item = {
                    category: _this.set.data.useDateData ? tmpDate.dateToStr() : '카테고리 ' + (addDataCnt + 1),
                    categoryCode: addDataCnt + 1,
                };
                if (compare) item.compare = true;
                if (_this.set.data.useDateData && _this.set.data.multiCategoryLen > 1) {
                    const category = addDataCnt == 0 ? '비교기간 시작일' : `+${addDataCnt}일`;
                    if (_this.set.data.multiCategoryLen == 2) item.category = `${category}\n${tmpDate.dateToStr()}\n${tmpDate2.dateToStr()}`;
                    else if (_this.set.data.multiCategoryLen == 3) item.category = `${category}\n${tmpDate.dateToStr()}\n${tmpDate2.dateToStr()}\n${tmpDate3.dateToStr()}`;
                }
                if (result.graphs.length) {
                    for (let Loop2 = 0; Loop2 < result.graphs.length; ++Loop2) {
                        item[`value_${Loop2 + 1}`] = parseInt(Math.random() * 500);
                    }
                } else {
                    item.value = parseInt(Math.random() * 500);
                }
                result.data.push(item);
                tmpDate.setDate(tmpDate.getDate() + 1);
                tmpDate2.setDate(tmpDate2.getDate() + 1);
                tmpDate3.setDate(tmpDate3.getDate() + 1);
                addDataCnt++;
            }

            return result;
        },
    },
    mounted() {},
    watch: {
        'set.graphs.type'(val) {
            // console.log(val);
        },
    },
    methods: {
        evt_FilterCategoryConfirm() {
            merge(this.set, this.filterSet);
        },
        evt_chart_click(e) {
            // console.log(e);
        },
    },
};
</script>

<style></style>
