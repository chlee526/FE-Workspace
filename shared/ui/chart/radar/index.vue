<template>
    <div class="ui_chart_container is-radar">
        <div v-if="totalLabel" class="opts_wrap">
            <div class="rc">
                Total. <strong style="font-size: 13px">{{ getTotalData }}건</strong>
            </div>
        </div>
        <div ref="chart" :id="id" class="ui_chart_wrap" :class="[{ ui_nodata: !chartData.data || chartData.data.length == 0 }, { 'is-click': getClickEvtChk }]"></div>
    </div>
</template>

<script>
import sharedStyle from '@shared/styles/styles.module.scss';
import { jsgradient } from '@shared/utils/prototype/util.colors';
import { TweenMax } from 'gsap';
export default {
    name: 'comp-chart-radar',
    data() {
        return {
            chart: null,
            defaultChartOpts: {
                hideCredits: true,
                pathToImages: './img/amcharts/',
                type: 'radar',
                categoryField: 'category',
                colors: ['#6ED1DB', '#49AADB', '#8154EF', '#DD3E60', '#EA8D1F', '#DADD3C', '#6CCC44', '#31C8C8'],
                autoDisplay: true,
                addClassNames: true,
                usePrefixes: true,
                radius: '40%',
                fontSize: 13,
                graphs: [],
                guides: [],
                valueAxes: [
                    {
                        axisTitleOffset: 10,
                        id: 'va',
                        color: '#999',
                        gridAlpha: 0.15,
                        minimum: 0,
                        axisThickness: 0,
                        dashLength: 1,
                        tickLength: 3,
                        axisAlpha: 0,
                        labelsEnabled: false,
                    },
                ],
                allLabels: [],
                balloon: {
                    adjustBorderColor: false,
                },
                legend: {
                    enabled: true,
                    position: this.legend ? this.legend : 'top',
                    align: 'center',
                    equalWidths: false,
                    color: '#666666',
                    marginTop: 0,
                    marginLeft: 10,
                    marginRight: 10,
                    markerSize: this.getSharedFontSize(),
                    markerType: 'circle',
                    spacing: 15,
                    verticalGap: 5,
                    valueText: '',
                    valueWidth: 0,
                },
                titles: [],
                dataProvider: [
                    // {
                    //     category: 'Czech Republic',
                    //     litres: 156.9,
                    // },
                    // {
                    //     category: 'Ireland',
                    //     litres: 131.1,
                    // },
                    // {
                    //     category: 'Germany',
                    //     litres: 115.8,
                    // },
                    // {
                    //     category: 'Australia',
                    //     litres: 109.9,
                    // },
                    // {
                    //     category: 'Austria',
                    //     litres: 108.3,
                    // },
                    // {
                    //     category: 'UK',
                    //     litres: 99,
                    // },
                ],
            },
        };
    },
    props: {
        id: { type: String },
        opts: { type: Object, default: null },
        chartData: { type: Object, default: null },
        useAxis: { type: Boolean, default: true },
        totalLabel: { type: Boolean, default: false },
        legend: { type: String, default: null },
        legendVolume: { type: Boolean, default: false },
    },
    computed: {
        getClickEvtChk() {
            return this.$listeners.click ? true : false;
        },

        // 전체 합계 계산  - total_cnt 가 있으면 total_cnt 출력, 없으면 value 합산
        getTotalData() {
            let result = 0;
            let tmpData = JSON.parse(JSON.stringify(this.chartData));
            if (tmpData.total_cnt) {
                result = tmpData.total_cnt;
            } else {
                if (!tmpData.graphs) {
                    // 단일그래프
                    tmpData.data.forEach((ctg) => {
                        result += ctg.value;
                    });
                } else {
                    // 멀티그래프
                    tmpData.data.forEach((ctg) => {
                        Object.keys(ctg).forEach((val) => {
                            if (val.indexOf('value') >= 0) {
                                result += ctg[val];
                            }
                        });
                    });
                }
            }

            return result.lengthLimitComma(0);
        },
    },
    mounted: function () {
        if (this.chartData.data) {
            this.set_opts();
            this.build_chart();
        }
    },
    watch: {
        opts: {
            deep: true,
            handler: function ($val) {
                this.set_opts();
            },
        },
        chartData: {
            deep: true,
            handler: function ($val) {
                this.set_opts();
                this.build_chart();
            },
        },
        legend(val) {
            this.set_opts();
            this.build_chart();
        },

        legendVolume(val) {
            this.set_opts();
            this.build_chart();
        },
    },
    methods: {
        // shared style module에서 공통 style가져오기
        // computed로 옮기면 동작 X
        getSharedFontSize() {
            return Number(sharedStyle.font_size.replace('px', ''));
        },
        set_opts: function () {
            const _this = this;
            this.chartOpts = JSON.parse(JSON.stringify(this.defaultChartOpts));

            // Graphs
            // let totalValue = 0;
            // this.chartData.data.forEach(function ($item) {
            //     totalValue += parseInt($item.value);
            // });

            // Label
            if (this.chartData.label) {
                this.chartOpts.allLabels = [];
                const labelLen = Object.keys(this.chartData.label).length;

                const divHeight = document.querySelector('#' + this.id).clientHeight;
                const centerY = Math.floor(((divHeight - this.getSharedFontSize()) / 2 / divHeight) * 100) + '%';

                this.chartOpts.allLabels = Object.keys(this.chartData.label).map((key, idx) => {
                    return {
                        align: 'center',
                        bold: idx == 1,
                        id: 'Label-title',
                        size: idx == 0 ? this.getSharedFontSize() : this.getSharedFontSize() * 2,
                        text: idx == 0 ? _this.chartData.label[key] : Number(_this.chartData.label[key]).lengthLimitComma(0) + '건',
                        color: idx == 0 ? '#333333' : '#666666',
                        y: labelLen == 1 ? centerY : idx == 0 ? '44%' : '49%',
                    };
                });
            }

            if (this.legend) {
                this.chartOpts.legend.position = this.legend;
                this.chartOpts.legend.listeners = [
                    {
                        event: 'rollOverItem',
                        method: function (evt) {
                            const selIdx = evt.dataItem.index;

                            _this.chartOpts.graphs.forEach((item, idx) => {
                                if (idx != selIdx) {
                                    if (item.set) TweenMax.to(item.set.node, 0.3, { autoAlpha: 0.1 });
                                }
                            });

                            TweenMax.to(evt.event.target, 0.24, { 'fill-opacity': 0.4 });
                        },
                    },
                    {
                        event: 'rollOutItem',
                        method: function (evt) {
                            const selIdx = evt.dataItem.index;
                            _this.chartOpts.graphs.forEach((item, idx) => {
                                if (idx != selIdx) {
                                    if (item.set) TweenMax.to(item.set.node, 0.3, { autoAlpha: 1 });
                                }
                            });

                            TweenMax.to(evt.event.target, 0.24, { 'fill-opacity': 0.15 });
                        },
                    },
                    {
                        event: 'hideItem',
                        method: function (evt) {
                            _this.evt_chartInit(evt);
                        },
                    },
                    {
                        event: 'showItem',
                        method: function (evt) {
                            _this.evt_chartInit(evt);
                        },
                    },
                ];
            } else {
                this.chartOpts.legend.enabled = false;
            }

            // Graph Event(Over)
            if (this.legend && this.legendVolume) {
                this.chartOpts.legend.equalWidths = true;

                this.chartOpts.legend.valueText = '[[value]]';
                this.chartOpts.legend.valueWidth = 80;
                this.chartOpts.legend.valueFunction = function ($e, b, $percent) {
                    if ($percent == undefined) $percent = true;

                    let cnt = 0;
                    let colArr = [];

                    if ($e.index != undefined) {
                        let total = 0;
                        let itemTotal;
                        let per = 0;

                        if ($e.data) {
                            $e.chart.graphs.filter(function ($it) {
                                if (!$it.hidden && !$it.exptTotal) {
                                    colArr.push($it.valueField);
                                }
                            });
                            let totalSumArr = [];
                            $e.data.filter(function (c) {
                                cnt += parseInt(c.dataContext[$e.valueField]) ? parseInt(c.dataContext[$e.valueField]) : 0;

                                for (let i = 0; i < colArr.length; i++) {
                                    let nowNa = colArr[i];
                                    totalSumArr.push(c.dataContext[nowNa]);
                                }
                            });
                            total = totalSumArr.arrCalcSum();

                            // if ($e.exptTotal) cnt = (_this.chart && _this.chart.nf ? AmCharts.addPrefix(cnt, _this.chart.prefixesOfBigNumbers, _this.chart.prefixesOfSmallNumbers, _this.chart.nf) : 0) + '건';
                            // else cnt = (_this.chart && _this.chart.nf ? AmCharts.addPrefix(cnt, _this.chart.prefixesOfBigNumbers, _this.chart.prefixesOfSmallNumbers, _this.chart.nf) : 0) + '건 (' + ((cnt / total) * 100).isNum().toFixed(1) + '%)';
                            // if ($e.hidden) {
                            //     cnt = 0 + '건 (' + ((cnt / total) * 100).isNum().toFixed(1) + '%)';
                            // }

                            cnt = cnt.addComma();
                            cnt += '건';
                        } else if (!$e.data) {
                            $e.graph.chart.graphs.filter(function ($it) {
                                if (!$it.hidden && !$it.exptTotal) {
                                    colArr.push($it.valueField);
                                }
                            });
                            let totalSumArr = [];
                            $e.graph.chart.chartData.filter(function (c) {
                                let category = new Date($e.category).dateToStr().isDate() ? new Date($e.category).dateToStr() : $e.category;
                                if (category == c.dataContext.category) {
                                    cnt += parseInt(c.dataContext[$e.graph.valueField]) ? parseInt(c.dataContext[$e.graph.valueField]) : 0;
                                    for (let i = 0; i < colArr.length; i++) {
                                        let nowNa = colArr[i];
                                        totalSumArr.push(c.dataContext[nowNa]);
                                    }
                                }
                            });
                            total = totalSumArr.arrCalcSum();
                            if ($e.graph.exptTotal) cnt = (_this.chart && _this.chart.nf ? AmCharts.addPrefix(cnt, _this.chart.prefixesOfBigNumbers, _this.chart.prefixesOfSmallNumbers, _this.chart.nf) : 0) + '건';
                            else cnt = (_this.chart && _this.chart.nf ? AmCharts.addPrefix(cnt, _this.chart.prefixesOfBigNumbers, _this.chart.prefixesOfSmallNumbers, _this.chart.nf) : 0) + '건 (' + ((cnt / total) * 100).isNum().toFixed(1) + '%)';
                            if ($e.graph.hidden) {
                                cnt = 0 + '건 (' + ((cnt / total) * 100).isNum().toFixed(1) + '%)';
                            }
                        }
                    }
                    return cnt;
                };
            }

            // init
            this.chartOpts.listeners = [
                {
                    event: 'rendered',
                    method: function (evt) {
                        _this.evt_chartInit(evt);
                    },
                },
                {
                    event: 'resized',
                    method: function (evt) {
                        _this.evt_chartInit(evt);
                    },
                },
            ];

            const GraphItem = function () {
                return {
                    balloonText: '[[title]] [[value]]',
                    balloonFunction: function ($val, $e) {
                        let totalValue = 0;
                        for (let Loop1 = 0; Loop1 < _this.chartData.data.length; ++Loop1) {
                            Object.keys(_this.chartData.data[Loop1]).forEach(function ($key, $idx) {
                                if ($key.indexOf($val.graph.valueField) >= 0) {
                                    totalValue += _this.chartData.data[Loop1][$key];
                                }
                            });
                        }

                        return '<div class="v3_chart_tooltip2' + (jsgradient.getReversal($val.lineColor || $e.fillColorsR) ? '' : ' is-black') + '"><strong class="title">' + ($val.graph.title ? $val.graph.title : $val.category) + '</strong><span class="dv">' + $val.values.value.toString().addComma() + '건</span><span class="per">(' + (_this.chartData.graphs && _this.chartData.graphs.length > 1 ? (($val.values.value / totalValue || 0) * 100).toFixed(1) : (($val.values.value / totalValue || 0) * 100).toFixed(1)) + '%)</span></div>';
                    },
                    bullet: 'round',
                    bulletAlpha: 0,
                    bulletSize: 20,
                    fillAlphas: 0.2,
                    id: 'graph_1',
                    title: '',
                    valueField: 'value',
                    showHandOnHover: _this.getClickEvtChk ? true : false,
                };
            };
            if (this.chartData.graphs) {
                this.chartOpts.graphs = [];
                this.chartData.graphs.forEach(function ($item, $idx) {
                    let item = new GraphItem();
                    item.id = 'graph_' + $idx;
                    item.title = $item.name;
                    item.valueField = $item.value_field;
                    item.graphCode = $item.graphCode;
                    if ($item.fill || $item.color) {
                        item.fillColors = $item.fill || $item.color;
                        item.lineColor = $item.fill || $item.color;
                    }
                    _this.chartOpts.graphs.push(item);
                });
            } else {
                let item = new GraphItem();
                _this.chartOpts.graphs = [item];
            }

            // Axis
            if (this.useAxis) {
                // this.chartOpts.valueAxes[0].axisAlpha = 1;
                this.chartOpts.valueAxes[0].axisAlpha = 0.5;
                this.chartOpts.valueAxes[0].labelsEnabled = true;
            }

            // 사용자 옵션 덮어쓰기
            if (this.opts) {
                Object.keys(this.opts).forEach(function ($key, $idx) {
                    if (_this.opts[$key].constructor == Object) {
                        _this.chartOpts[$key] = Object.assign(_this.chartOpts[$key], _this.opts[$key]);
                    } else if (_this.opts[$key].constructor == Array) {
                        _this.opts[$key].filter(function ($item, $idx2) {
                            if ($item.constructor == Object) {
                                _this.chartOpts[$key][$idx2] = Object.assign(_this.chartOpts[$key][$idx2], $item);
                            } else {
                                _this.chartOpts[$key][$idx2] = $item;
                            }
                        });
                    } else {
                        _this.chartOpts[$key] = _this.opts[$key];
                    }
                });
            }
        },
        build_chart: function () {
            if (this.chart) {
                this.chart.clear();
                this.chart = null;
            }

            this.chartOpts.dataProvider = this.chartData.data;

            this.chart = AmCharts.makeChart(this.$refs.chart, this.chartOpts);

            // Events
            if (this.getClickEvtChk) {
                this.chart.addListener('clickGraphItem', this.evt_chartClick);
            }
        },

        evt_chartInit(evt) {
            const switchElements = [...evt.chart.legendDiv.querySelectorAll('.amcharts-legend-switch')];

            switchElements.forEach((item, idx) => {
                const parent = item.parentElement;

                parent.classList.add('amcharts-legend-item-AmGraph-' + idx);
                const rect = parent.querySelector('rect');
                rect.setAttribute('x', -5);
                rect.setAttribute('y', -2);
                rect.setAttribute('width', parseInt(parent.getBBox().width) + 5);
                rect.setAttribute('height', 22);
                rect.setAttribute('fill', '#ccc');
                rect.setAttribute('fill-opacity', 0.15);
                rect.setAttribute('rx', 11);
                rect.setAttribute('ry', 11);

                parent.prepend(rect);

                const circle = parent.querySelector('circle');
                // circle.setAttribute('fill', evt.chart.chartData[idx].color);
                // circle.setAttribute('stroke', evt.chart.chartData[idx].color);
            });
        },
        evt_chartClick: function ($e) {
            this.$emit('click', $e);
        },
    },
    destroyed: function () {
        if (!this.chart) return false;
        this.chart.clear();
        this.chart = null;
    },
};
</script>

<style></style>
