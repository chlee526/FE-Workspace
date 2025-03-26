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
                                            <h3><span>나이별 차트</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/chart/age" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span><strong>수량 미포함(툴팁)</strong> : 수량 없이, 퍼센트로만 데이터를 받는 경우 사용 </span>
                                                    </li>
                                                    <li>
                                                        <span><strong>비율별 크기 변경</strong> : 연령별 데이터 비율 크기형태로 수정</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>그래프</strong></span>
                                                        <ul>
                                                            <li><span>커스텀 색상 사용 여부</span></li>
                                                            <li><span>연령별 그래프</span></li>
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
                                                        <dt><strong>커스텀 색상 사용여부</strong></dt>
                                                        <comp-switch-btn id="chart_fixActiveColor" class="is-small" v-model="chart_fixActiveColor"></comp-switch-btn>
                                                    </dl>
                                                    <hr />
                                                    <dl>
                                                        <dt>
                                                            <strong>연령별 그래프</strong>
                                                        </dt>
                                                        <dd>
                                                            <comp-list :disabled="!chart_fixActiveColor">
                                                                <template v-slot:list>
                                                                    <comp-filter-grp v-for="item in chartData.data" :key="item.code" pos="R" class="is-small">
                                                                        <template v-slot:title>
                                                                            {{ item.category }}
                                                                        </template>
                                                                        <template v-slot:items>
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
                                        </div>
                                        <div class="rc">
                                            <comp-switch-btn id="chart_percent" class="is-small" v-model="onlyPercent" label="수량 미포함(툴팁)"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_row is-not-top-brd">
                                                <div class="wrap is-cols-pad">
                                                    <div class="ui_col w12">
                                                        <div class="ui_box is-2dp">
                                                            <div class="content">
                                                                <div class="wrap">
                                                                    <comp-chart-age id="chart_01" :chart-data="chartData" :only-percentage="onlyPercent" style="height: 200px"></comp-chart-age>
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
    </div>
</template>

<script>
import List from './list.vue';
export default {
    name: 'page-chart-age',
    data() {
        return {
            colorUse: false,
            onlyPercent: false,
            chart_fixActiveColor: false,
            chartData: {
                data: [
                    {
                        category: '10대 이하',
                        categoryCode: '1',
                        value: 400,
                        fill: '',
                    },
                    {
                        category: '20대',
                        categoryCode: '2',
                        value: 600,
                        fill: '',
                    },
                    {
                        category: '30대',
                        categoryCode: '3',
                        value: 900,
                        fill: '',
                    },
                    {
                        category: '40대',
                        categoryCode: '4',
                        value: 800,
                        fill: '',
                    },
                    {
                        category: '50대 이상',
                        categoryCode: '5',
                        value: 700,
                        fill: '',
                    },
                ],
            },
        };
    },
    components: {
        'comp-list': List,
    },
    methods: {
        evt_chart_click(e) {
            console.log(e);
        },
    },
    watch: {
        chart_fixActiveColor(val) {
            this.chartData.data.forEach((val) => {
                val.fill = '';
            });
        },
    },
};
</script>

<style></style>
