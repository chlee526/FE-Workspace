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
                        <div class="wrap is-cols-pad">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>기본</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/chart/treemap" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <strong>그래프 설정</strong>
                                                        <ul>
                                                            <li>차트 아이템 추가/삭제 및 이름/색상 변경</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>색상</strong>
                                                        <ul>
                                                            <li><strong>커스텀 색상 사용여부</strong> : 아이템 선택 색상 고정 처리 여부</li>
                                                            <li><strong>시작컬러 / 종료컬러</strong> : 차트 색상 그라데이션 효과 적용 (시작컬러 부터 종료컬러까지)</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : 차트의 가로*세로 사이즈(px)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>선택기능 사용여부</strong> : 선택기능 사용시, 단일/멀티 선택인지 설정</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>퍼센트 포함</strong> : 차트 데이터 퍼센트 표시 여부</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>증감률 포함</strong> : 차트 데이터 증감률 표시 여부</span>
                                                        <ul>
                                                            <li><strong>차트 아이템에 마우스 커스를 올려놨을 경우에 증감률(%)이 표시됩니다</strong></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <comp-filter-grp pos="BL">
                                                <template v-slot:title>그래프</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>그래프</strong> <comp-button class="ui_btn is-xsmall is-icon-only" title="그래프 추가" @click="evt_graph_add"><span class="icon">&#xe017;</span></comp-button>
                                                        </dt>
                                                        <dd>
                                                            <comp-list style="height: 150px">
                                                                <template v-slot:list>
                                                                    <comp-filter-grp v-for="(item, idx) in treemapData.data" :key="item.code" pos="R" class="is-small">
                                                                        <template v-slot:title>
                                                                            {{ item.name }}
                                                                            <button class="btn_del" title="그래프 삭제" @click.stop="evt_graph_del(item)">삭제</button>
                                                                        </template>
                                                                        <template v-slot:items>
                                                                            <dl>
                                                                                <dt>
                                                                                    <strong>이름</strong>
                                                                                </dt>
                                                                                <dd>
                                                                                    <comp-input-box :id="`code_${idx}_name`" class="is-small" v-model="item.name" placeholder="텍스트 1" label="텍스트 1 입력" style="width: 100px"></comp-input-box>
                                                                                </dd>
                                                                            </dl>
                                                                            <dl>
                                                                                <dt>
                                                                                    <strong>컬러</strong>
                                                                                </dt>
                                                                                <dd>
                                                                                    <comp-colorpicker :color="item.fill" v-model="item.fill" :useConfirm="true" />
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
                                            <comp-filter-grp pos="BL">
                                                <template v-slot:title>색상</template>
                                                <template v-slot:items
                                                    ><dl>
                                                        <dt><strong>커스텀 색상 사용여부</strong></dt>
                                                        <dd><comp-switch-btn id="chart_fixActiveColor" class="is-small" v-model="chart_fixActiveColor"></comp-switch-btn></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt><strong>시작컬러 / 종료컬러</strong></dt>
                                                        <dd>
                                                            <div style="display: flex">
                                                                <comp-colorpicker :disabled="!chart_fixActiveColor" :color="startFixActiveColor" v-model="startFixActiveColor" />
                                                                <comp-colorpicker :disabled="!chart_fixActiveColor" :color="endFixActiveColor" v-model="endFixActiveColor" style="margin-left: 10px" />
                                                            </div>
                                                        </dd>
                                                    </dl>
                                                    <hr
                                                /></template>
                                            </comp-filter-grp>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <span>크기</span>
                                                <comp-input-box id="set_wid" type="number" v-model="set.size.wid" placeholder="가로" label="가로크기 입력" min="200" style="width: 70px"></comp-input-box>
                                                <comp-input-box id="set_hgt" type="number" v-model="set.size.hgt" placeholder="세로" label="세로크기 입력" min="100" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-radio-grp id="chart_sel" class="is-small" name="chart_sel" v-model="chart_sel" :opts="chart_sel_opts" :box="true"></comp-radio-grp>
                                            <hr />

                                            <comp-switch-btn id="chart_percent" class="is-small" v-model="chart_percent" label="퍼센트 포함"></comp-switch-btn>
                                            <hr />

                                            <comp-switch-btn id="chart_fluc" class="is-small" v-model="chart_fluc" label="증감률 포함"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_row is-not-top-brd">
                                                <div class="wrap is-cols-pad">
                                                    <div class="ui_col w12">
                                                        <comp-chart-treemap id="chart_00" :opts="tmpColors" :percentage="chart_percent" :toggle-type="chart_sel" :chart-data="treemapData" v-model="treemap_sel2" @click="evt_chart_click" :style="getSize"></comp-chart-treemap>
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
import List from './list.vue';
export default {
    name: 'page-chart-treemap',
    data() {
        return {
            set: {
                size: {
                    wid: null,
                    hgt: 500,
                },
            },
            treemapData: {
                data: [
                    { code: '01', name: '타이틀 01', value: 112345, data: { test: '123' } },
                    { code: '02', name: '타이틀 02', value: 90000, data: {} },
                    { code: '03', name: '타이틀 03', value: 80000, data: {} },
                    { code: '04', name: '타이틀 04', value: 70000, data: {} },
                    { code: '05', name: '타이틀 05', value: 60000, data: {} },
                    { code: '06', name: '타이틀 06', value: 50000, data: {} },
                    { code: '07', name: '타이틀 07', value: 40000, data: {} },
                    { code: '08', name: '타이틀 08', value: 30000, data: {} },
                    { code: '09', name: '타이틀 09', value: 20000, data: {} },
                    { code: '10', name: '타이틀 10', value: 10000, data: {} },
                    { code: '11', name: '타이틀 11', value: 5000, data: {} },
                    { code: '12', name: '타이틀 12', value: 1000, data: {} },
                ],
            },

            treemap_sel2: '',
            chart_sel_opts: [
                { code: null, name: '선택없음' },
                { code: 'one', name: '단일선택' },
                { code: 'oneToggle', name: '단일선택(Toggle)' },
                { code: 'multi', name: '멀티선택' },
            ],
            chart_sel: null,
            chart_opts_value: '',
            chart_percent: false,
            chart_fluc: '',
            chart_opts: '',
            chart_fixActiveColor: false,
            startFixActiveColor: '#AE7A13',
            endFixActiveColor: '#e1d1ae',
        };
    },
    components: {
        'comp-list': List,
    },
    computed: {
        getSize() {
            return `width: ${this.set.size.wid ? this.set.size.wid + 'px' : 'auto'}; height: ${this.set.size.hgt || 500}px`;
        },
        tmpColors() {
            return this.chart_fixActiveColor ? { colors: [this.startFixActiveColor, this.endFixActiveColor], size: this.set.size } : { size: this.set.size };
        },
    },

    methods: {
        evt_chart_click($node, $e) {
            // console.log($node);
            // console.log($e);
        },
        evt_graph_add(e) {
            let lastIdx;

            if (this.treemapData.data.length > 0) {
                lastIdx = parseInt(this.treemapData.data[this.treemapData.data.length - 1].code) + 1;
            } else {
                lastIdx = 0;
            }

            this.treemapData.data.push({
                name: '아이템 ' + lastIdx,
                code: lastIdx.numAddZero(),
                value: Math.random() * 1000,
                data: {},
                fill: '',
            });
        },
        evt_graph_del(delItem) {
            this.treemapData.data = this.treemapData.data.removeItem({ code: delItem.code });
        },
    },

    watch: {
        startFixActiveColor(val) {
            this.tmpColors.colors[0] = val;
            const result = JSON.parse(JSON.stringify(this.treemapData));
            this.treemapData = result;
        },

        endFixActiveColor(val) {
            this.tmpColors.colors[1] = val;
        },

        tmpColors: {
            handler(val) {
                // console.log(val);
            },
            deep: true,
        },

        chart_fixActiveColor($val) {
            const result = JSON.parse(JSON.stringify(this.treemapData));
            this.treemapData = result;
        },

        chart_percent($val) {
            const result = JSON.parse(JSON.stringify(this.treemapData));
            this.treemapData = result;
        },
        //증감률
        chart_fluc($val) {
            const result = JSON.parse(JSON.stringify(this.treemapData));
            result.data.forEach(($item) => {
                if ($val) {
                    $item.fluc = parseInt((Math.random() * 1000 - 500).toFixed(1));
                } else {
                    delete $item.fluc;
                }
            });

            this.treemapData = result;
        },
    },
};
</script>

<style></style>
