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
                                            <h3><span>차트 - Pie</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/chart/pie" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <strong>그래프설정</strong>
                                                        <ul>
                                                            <li>그래프 추가/삭제/설정</li>
                                                            <li>
                                                                <span><strong>그래프 목록</strong> : 그래프 추가(+), 삭제(x)</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>목록내 그래프 선택</strong> : 그래프 이름, 컬러 변경 가능</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : 차트의 가로*세로 사이즈(px)</span>
                                                    </li>
                                                    <li>
                                                        <strong>중앙라벨</strong>
                                                        <ul>
                                                            <li>차트 가운데 중앙라벨 활성화 여부</li>
                                                            <li>
                                                                <span><strong>중앙라벨 타이틀</strong> : 중앙라벨 타이틀</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>중앙라벨 데이터 값</strong> : 중앙라벨 데이터 값</span>
                                                            </li>
                                                        </ul>
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
                                            <comp-filter-grp pos="BL">
                                                <template v-slot:title>아이템 설정</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>아이템</strong> <comp-button class="ui_btn is-xsmall is-icon-only" title="아이템 추가" @click="evt_graph_add"><span class="icon">&#xe017;</span></comp-button>
                                                        </dt>
                                                        <dd>
                                                            <comp-list v-model="chartDatas.data" :component="set.graphComp" sortable></comp-list>
                                                        </dd>
                                                    </dl>
                                                </template>
                                            </comp-filter-grp>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <span>크기</span>

                                                <comp-input-box id="set_wid" type="number" v-model="set.size.wid" placeholder="가로" label="가로크기 입력" min="200" style="width: 70px"></comp-input-box>
                                                <comp-input-box id="set_hgt" type="number" v-model="set.size.hgt" placeholder="세로" label="세로크기 입력" min="100" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>중앙라벨</strong>
                                                <comp-switch-btn id="set_label_used" class="is-small" v-model="set.label.used"></comp-switch-btn>
                                                <comp-input-box id="set_label_txt1" v-model="set.label.txt1" placeholder="텍스트 1" label="텍스트 1 입력" :disabled="!set.label.used" style="width: 150px"></comp-input-box>
                                                <comp-input-box id="set_label_txt2" v-model="set.label.txt2" placeholder="텍스트 2" label="텍스트 2 입력" :disabled="!set.label.used || !set.label.txt1.trim().length" style="width: 150px"></comp-input-box>
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
                                                    <div class="ui_col">
                                                        <comp-chart-pie id="chart" :opts="{ radius: '45%', innerRadius: '55%', labelRadius: -35 }" :legend="set.legend.pos" :legend-volume="set.legend.volume" :chart-data="getChartDatas" @click="evt_chart_click" :style="getSize"></comp-chart-pie>
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
    </div>
</template>

<script>
import CompListGrp_Graph from './list_graph.vue';

export default {
    name: 'page-chart-pie',
    data() {
        return {
            tmpArr: ['OL', 'OC', 'OR', 'BL', 'BC', 'BR'],
            set: {
                size: {
                    wid: null,
                    hgt: 500,
                },
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
                graphComp: CompListGrp_Graph,
            },
            chartDatas: {
                data: [
                    {
                        name: '아이템 1',
                        category: '아이템 1',
                        categoryCode: '01',
                        fill: '#EC5D46',
                        value: 900,
                    },
                    {
                        name: '아이템 2',
                        category: '아이템 2',
                        categoryCode: '02',
                        fill: '#F29341',
                        value: 800,
                    },
                    {
                        name: '아이템 3',
                        category: '아이템 3',
                        categoryCode: '03',
                        fill: '#F3BE2B',
                        value: 700,
                    },
                    {
                        name: '아이템 4',
                        category: '아이템 4',
                        categoryCode: '04',
                        fill: '#E1D039',
                        value: 600,
                    },
                    {
                        name: '아이템 5',
                        category: '아이템 5',
                        categoryCode: '05',
                        fill: '#A3C72C',
                        value: 400,
                    },
                ],
            },
        };
    },
    computed: {
        getSize() {
            return `width: ${this.set.size.wid ? this.set.size.wid + 'px' : 'auto'}; height: ${this.set.size.hgt || 500}px`;
        },
        getChartDatas() {
            let result = JSON.parse(JSON.stringify(this.chartDatas));
            if (this.set.label.used) {
                result.label = {};
                if (this.set.label.txt1.trim().length && this.set.label.txt2.trim().length) {
                    result.label.title = this.set.label.txt1;
                    result.label.value = this.set.label.txt2;
                } else if ((this.set.label.txt1.trim().length && !this.set.label.txt2.trim().length) || (this.set.label.txt1.trim().length && !this.set.label.txt2.trim().length)) {
                    result.label.value = this.set.label.txt1.trim() || this.set.label.txt2.trim();
                }
            }
            result.data.forEach((item) => {
                item.category = item.name;
            });
            return result;
        },
    },
    methods: {
        evt_chart_click(e) {
            console.log(e);
        },
        evt_graph_add(e) {
            const lastIdx = parseInt(this.chartDatas.data[this.chartDatas.data.length - 1].categoryCode) + 1;
            this.chartDatas.data.push({
                name: '추가 아이템',
                category: '추가 아이템 ',
                categoryCode: lastIdx.numAddZero(),
                value: parseInt(Math.random() * 1000),
            });
        },
        evt_graph_del(delItem) {
            this.chartDatas.data = this.chartDatas.data.removeItem({ categoryCode: delItem.categoryCode });
        },
    },
};
</script>

<style></style>
