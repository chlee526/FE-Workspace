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
                                            <h3><span>차트 - Radar</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/chart/radar" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <strong>카테고리/그래프</strong>
                                                        <ul>
                                                            <li>카테고리 갯수 : 카테고리 갯수 설정 (최소 3개 , 최대 10개)</li>
                                                            <li>그래프 : 그래프 생성 및 수정 삭제</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : 차트의 가로*세로 사이즈(px)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>Total포함</strong> : 차트 총 데이터 Total 문구 표시여부</span>
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
                                                <template v-slot:title>카테고리/그래프</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>카테고리 갯수</strong>
                                                        </dt>
                                                        <dd><comp-input-box id="set_category_len" class="is-small" type="number" v-model="set.categoryLen" min="3" max="10" label="카테고리 갯수 입력" style="width: 80px"></comp-input-box></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>그래프</strong> <comp-button class="ui_btn is-xsmall is-icon-only" title="순위 추가" @click="evt_graph_add"><span class="icon">&#xe017;</span></comp-button>
                                                        </dt>
                                                        <dd>
                                                            <comp-list style="height: 150px">
                                                                <template v-slot:list>
                                                                    <comp-filter-grp v-for="(item, idx) in chartDatas.graphs" :key="item.graphCode" pos="R" class="is-small">
                                                                        <template v-slot:title>
                                                                            <dt>{{ item.name }}</dt>
                                                                            <button v-if="chartDatas.graphs.length > 1" class="btn_del" title="그래프 삭제" @click.stop="evt_graph_del(item)">삭제</button>
                                                                        </template>
                                                                        <template v-slot:items>
                                                                            <dl>
                                                                                <dt>
                                                                                    <strong>그래프</strong>
                                                                                </dt>
                                                                                <dd>
                                                                                    <comp-input-box :id="`code_${idx}_name`" class="is-small" v-model="item.name" placeholder="그래프" label="그래프 입력" style="width: 100px"></comp-input-box>
                                                                                </dd>
                                                                            </dl>
                                                                            <dl>
                                                                                <dt>
                                                                                    <strong>컬러</strong>
                                                                                </dt>
                                                                                <dd>
                                                                                    <comp-colorpicker v-model="item.fill" />
                                                                                </dd>
                                                                            </dl>
                                                                        </template>
                                                                    </comp-filter-grp>
                                                                </template>
                                                            </comp-list>
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
                                                <comp-switch-btn id="set_total" class="is-small" v-model="set.total" label="Total포함"></comp-switch-btn>
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
                                            <comp-chart-radar id="chart_03" :legend="set.legend.pos" :legend-volume="set.legend.volume" :chart-data="getChartData" :total-label="set.total" @click="evt_chart_click" :style="getSize"></comp-chart-radar>
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
import List from './list.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'page-chart-radar',
    data() {
        return {
            set: {
                size: {
                    wid: null,
                    hgt: 500,
                },
                graphLen: '1',
                categoryLen: '3',
                total: true,
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
            colorList: ['#6ED1DB', '#49AADB', '#8154EF', '#DD3E60', '#EA8D1F', '#DADD3C', '#6CCC44', '#31C8C8'],
            chartDatas: {
                data: [],
                graphs: [
                    { name: '그래프 1', graphCode: 1, value_field: 'value_1', fill: '#6ED1DB' },
                    { name: '그래프 2', graphCode: 2, value_field: 'value_2', fill: '#49AADB' },
                    { name: '그래프 3', graphCode: 3, value_field: 'value_3', fill: '#8154EF' },
                ],
            },
        };
    },
    computed: {
        ...mapGetters(['getTpop', 'getSentis', 'getSensuality', 'getStoreType']),
        getSize() {
            return `width: ${this.set.size.wid ? this.set.size.wid + 'px' : 'auto'}; height: ${this.set.size.hgt || 500}px`;
        },
        getChartData() {
            // let result = {
            //     data: [],
            // };

            let result = JSON.parse(JSON.stringify(this.chartDatas));

            for (let Loop1 = 0; Loop1 < this.set.categoryLen; ++Loop1) {
                let data = {
                    category: '카테고리 ' + (Loop1 + 1),
                    categoryCode: Loop1,
                };
                if (result.graphs.length > 0) {
                    // for (let Loop2 = 0; Loop2 < result.graphs.length; ++Loop2) {
                    //     data['value_' + (Loop2 + 1)] = parseInt(Math.random() * 1000) + 1;
                    // }

                    result.graphs.forEach((val) => {
                        data[val.value_field] = parseInt(Math.random() * 1000) + 1;
                    });
                } else {
                    data.value = parseInt(Math.random() * 1000) + 1;
                }
                result.data.push(data);
            }

            return result;
        },
    },
    components: {
        'comp-list': List,
    },
    methods: {
        evt_graph_add(e) {
            let lastIdx;

            // let last = this.copyLegendCustom.pop();

            if (this.chartDatas.graphs.length > 0) {
                lastIdx = parseInt(this.chartDatas.graphs[this.chartDatas.graphs.length - 1].graphCode) + 1;
            } else {
                lastIdx = 1;
            }

            this.chartDatas.graphs.push({
                name: '그래프 ' + lastIdx,
                graphCode: lastIdx.numAddZero(),
                value_field: 'value_' + lastIdx,
                fill: this.colorList[this.chartDatas.graphs.length + 1],
                // color: '#' + Math.round(Math.random() * 0xffffff).toString(16),
                // color: this.colorList[this.chartDatas.graphs.length + 1],
            });
        },
        evt_chart_click(e) {
            console.log(e);
        },
        evt_graph_del(delItem) {
            this.chartDatas.graphs = this.chartDatas.graphs.removeItem({
                graphCode: delItem.graphCode,
            });
        },
    },
};
</script>

<style></style>
