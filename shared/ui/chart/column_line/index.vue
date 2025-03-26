<!-- eslint-disable no-undef -->
<template>
    <div class="ui_chart_container">
        <div v-if="dateType || typeOpts" class="opts_wrap">
            <comp-switch-btn v-if="dateType != null && compareDate && !hideDateType" :id="id + '_compare_date'" v-model="useCompareDate" class="is-small" label="비교기간"></comp-switch-btn>
            <comp-radio-grp v-if="dateType != null && !hideDateType" :id="id + '_dateType'" class="chart_type is-icon is-small" :name="id + '_dateType'" v-model="useDateType" :opts="dateOpts_all" :box="true"></comp-radio-grp>
            <comp-radio-grp v-if="typeOpts" :id="id + '_type'" class="chart_type is-icon is-small" :name="id + '_type'" v-model="chartType" :opts="getTypeOpts" :box="true"></comp-radio-grp>
        </div>
        <div ref="chart" :id="id" class="ui_chart_wrap" type="line" :class="[{ ui_nodata: !chartData || !useChartData || useChartData.data.length == 0 || !getNoData }, { 'is-click': getClickEvtChk }, 'is-' + chartName]" :style="getStyleHgt"></div>
    </div>
</template>

<script>
import $ from 'jquery';
import { merge } from 'lodash';
import { TweenMax } from 'gsap';
import { jsgradient } from '@shared/utils/prototype/util.colors';

// const chartImgPath = require.context('../img', true, /\.*$/);
// chartImgPath.keys().forEach((modules, modulePath) => {
//     console.log(modules);
//     // set './app.js' => 'app'
//     // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
//     // const value = modulesFiles(modulePath);

//     // modules[moduleName] = value.default;

//     // return modules;
// });

export default {
    name: 'comp-chart-columnline',
    data: function () {
        return {
            elHgt: 0,
            dateOpts_all: [
                { code: 0, type: 'day', name: '일' },
                { code: 1, type: 'week', name: '주' },
                { code: 2, type: 'month', name: '월' },
            ],
            useCompareDate: this.compareFixed,
            compareDate: this.compareFixed,
            useDateType: null,
            typeOpts_all: [
                { code: 0, type: 'column-cluster', name: '&#xe038;' },
                { code: 1, type: 'column-stack', name: '&#xe072;' },
                { code: 2, type: 'column-stack-100', name: '&#xe037;' },
                { code: 3, type: 'bar-cluster', name: '&#xe036;' },
                { code: 4, type: 'bar-stack', name: '&#xe087;' },
                { code: 5, type: 'bar-stack-100', name: '&#xe035;' },
                { code: 6, type: 'line', name: '&#xe034;' },
            ],
            chart: null,
            useChartData: { data: [] },
            defaultChartOpts: {
                hideCredits: true,
                pathToImages: './img/amcharts/',
                type: 'serial',
                categoryField: 'category',
                columnWidth: 0.7,
                columnSpacing: 2,
                autoMarginOffset: 15,
                marginBottom: 30,
                marginLeft: 20,
                marginRight: 30,
                marginTop: 10,
                colors: ['#6ED1DB', '#5CBEE5', '#49AADB', '#478FDD', '#8154EF', '#DA42E2', '#DD3E60', '#EF6852', '#EA8D1F', '#EDCA1D', '#DADD3C', '#B8CC42', '#6CCC44', '#46BC94', '#31C8C8'],
                addClassNames: true,
                color: '#666666',
                fontSize: 13,
                percentPrecision: 1,
                prefixesOfBigNumbers: [
                    {
                        number: 1000,
                        prefix: 'k',
                    },
                    {
                        number: 1000000,
                        prefix: 'M',
                    },
                    {
                        number: 1000000000,
                        prefix: 'G',
                    },
                    {
                        number: 1000000000000,
                        prefix: 'T',
                    },
                    {
                        number: 1000000000000000,
                        prefix: 'P',
                    },
                    {
                        number: 1000000000000000000,
                        prefix: 'E',
                    },
                    {
                        number: 1e21,
                        prefix: 'Z',
                    },
                    {
                        number: 1e24,
                        prefix: 'Y',
                    },
                ],
                usePrefixes: true,
                categoryAxis: {
                    gridPosition: 'middle',
                    gridThickness: 0,
                    autoWrap: false,
                    axisThickness: 1,
                    axisColor: '#f2f2f2',
                },
                chartCursor: {
                    enabled: true,
                    cursorAlpha: 0.1,
                    cursorColor: '#888888',
                    fullWidth: true,
                    graphBulletSize: 1,
                    animationDuration: 0,
                    // categoryBalloonDateFormat: 'YYYY-MM-DD',
                },
                chartScrollbar: {
                    enabled: false,
                    dragIconHeight: 18,
                    dragIconWidth: 18,
                    scrollbarHeight: 6,
                    offset: 10,
                },
                trendLines: [],
                graphs: [],
                guides: [],
                valueAxes: [
                    {
                        id: 'ValueAxis-1',
                        labelsEnabled: false,
                        minimum: 0,
                        usePrefixes: true,
                        zeroGridAlpha: 0,
                        axisThickness: 0,
                        color: '#CCCCCC',
                        gridAlpha: 0.05,
                        tickLength: 0,
                        title: '',
                    },
                ],
                allLabels: [],
                balloon: {
                    adjustBorderColor: false,
                    fixedPosition: false,
                    animationDuration: 0,
                    fadeOutDuration: 0,
                    fillAlpha: 1,
                    horizontalPadding: 5,
                    shadowAlpha: 0.3,
                    verticalPadding: 3,
                },
                legend: {
                    enabled: true,
                    equalWidths: false,
                    align: 'center',
                    autoMargins: false,
                    color: '#666666',
                    marginTop: 10,
                    marginLeft: 0,
                    marginRight: 0,
                    markerSize: 13,
                    markerType: 'circle',
                    valueText: '',
                    valueWidth: 0,
                    spacing: 15,
                    verticalGap: 5,
                },
                titles: [],
            },
            chartType: null,
            chartName: '',
            chartOpts: null,
            minValue: 0,
            maxValue: 0,
            totalValue: 0,
            totalValue_newAxis: 0,
            visibleLegends: [],
        };
    },
    props: {
        id: { type: String }, // ID
        opts: { type: Object }, // Chart Options
        dateType: { type: String, default: null }, // 날짜 사용여부 및 기본 날짜 타입(일:'day', 주:'week', 월:'month)
        hideDateType: { type: Boolean, default: false }, // 강제로 숨기기
        chartData: { type: Object }, // 차트타입(컬럼, 컬럼스택, 컬럼100%스택, 바, 바스택, 바100%스택, 라인)
        legend: { type: String }, // 범례
        legendVolume: { type: Boolean, default: false },
        totalLabel: { type: Boolean, default: true },
        balloonPercentage: { type: Boolean, default: true },
        type: { type: String, default: 'column-cluster' },
        typeOpts: { type: Array, default: null },
        maxCategoryLen: { type: Number, default: 30 },
        simple: { type: Boolean, default: false }, // 심플차트 설정 여부
        compareFixed: { type: Boolean, default: false }, // 비교차트 무조건 활성
        multipleDate: { type: Array, default: null }, // 여러 날짜 표기
    },
    computed: {
        // getCategoryIsDate() {
        //     return this.chartData && this.chartData.data && this.chartData.data[0] ? this.chartData.data[0].category.isDate() : false;
        // },
        getNoData() {
            if (!this.chartData) return false;
            let totalCnt = 0;
            this.chartData.data.forEach(function ($item) {
                for (let $key in $item) {
                    if ($key.indexOf('value') >= 0) {
                        totalCnt += $item[$key];
                    }
                }
            });
            return totalCnt;
        },
        getClickEvtChk() {
            return this.$listeners.click ? true : false;
        },
        getDateType() {
            if (this.dateType == null || this.dateType == undefined) return null;
            let _this = this;
            return this.dateOpts_all.filter(function ($item) {
                if ($item.type == _this.dateType) return $item;
            })[0].code;
        },
        getType() {
            if (!this.type) return null;
            let _this = this;
            return this.typeOpts_all.filter(function ($item) {
                return $item.type == _this.type;
            })[0].code;
        },
        getTypeOpts() {
            if (!this.typeOpts) return null;
            let _this = this;
            let result = this.typeOpts_all.filter(function ($item) {
                // if ($item.type != 'line') $item.disabled = _this.useCompareDate;
                return _this.typeOpts.includes($item.type);
            });

            return result;
        },
        getStyleHgt() {
            let hgt = this.elHgt;
            if ((this.dateType && !this.hideDateType) || this.typeOpts) hgt = hgt - 32;
            return 'height:' + hgt + 'px;' + (this.simple ? 'min-height: auto;' : '');

            // if (!this.$vnode.data.staticStyle.height) return 'height: auto;';

            // let hgt = parseInt(this.$vnode.data.staticStyle.height);
            // if ((this.dateType && !this.hideDateType) || this.typeOpts) hgt = hgt - 32;

            // return 'height:' + hgt + 'px;' + (this.simple ? 'min-height: auto;' : '');
        },
        graphType() {
            if (this.chartType == 1 || this.chartType == 4) return 'stack';
            else if (this.chartType == 2 || this.chartType == 5) return '100%';
            return '';
        },
        rotate() {
            if (this.chartType == 3 || this.chartType == 4 || this.chartType == 5) return true;
            return false;
        },
    },
    created() {
        this.useDateType = this.getDateType;
        // 차트 형태에 따라 value 축 값 표시 여부 설정
        this.defaultChartOpts.valueAxes[0].labelsEnabled = this.graphType == '100%' ? false : true;
    },
    mounted: function () {
        this.useDateType = this.getDateType;
        this.chartType = this.getType;
        if (this.chartData) {
            if (this.chartData.graphs) {
                this.visibleLegends = this.chartData.graphs.arrObjAttrToStr('graphCode').strToArr();
            }
            this.useChartData = this.getParseChartData();
        }

        this.autoDateTypeChange();

        // Resize Observer
        this.evt_resize();
        const resizeObserver = new ResizeObserver(this.evt_resize);
        resizeObserver.observe(this.$el);
    },
    watch: {
        opts: {
            deep: true,
            handler: function ($val) {
                if (!this.chartData) return false;
                this.set_opts();
            },
        },
        multipleDate(val) {
            // 다중 날짜 사용 시 일별 차트에만 비교기간 허용
            if (val && this.useCompareDate && this.useDateType !== 0) {
                this.useCompareDate = false;
            }
        },
        useCompareDate($val) {
            // 다중 날짜 사용 시 일별 차트에만 비교기간 허용
            if (this.multipleDate && $val && this.useDateType !== 0) {
                this.useDateType = 0;
            } else {
                this.useChartData = this.getParseChartData();
            }
        },
        dateType($val) {
            if ($val == null) this.useDateType = null;
            else {
                this.useDateType = this.dateOpts_all.getParseDatas({ type: $val })[0].code;
            }
        },
        useDateType($val) {
            // 다중 날짜 사용 시 일별 차트에만 비교기간 허용
            if (this.multipleDate && this.useCompareDate && $val !== 0) {
                this.useCompareDate = false;
            } else {
                this.useChartData = this.getParseChartData();
            }
        },
        chartData: {
            deep: true,
            handler: function ($val, $oldVal) {
                // if (JSON.stringify($val.graphs) !== JSON.stringify(this.useChartData.graphs) || !this.useChartData.graphs.length) {
                if ($val && $val.graphs) {
                    this.visibleLegends = $val.graphs.arrObjAttrToStr('graphCode').strToArr();
                }
                // }
                this.autoDateTypeChange();
                this.useChartData = this.getParseChartData();
            },
        },
        useChartData: {
            deep: true,
            handler: function ($val) {
                if (!this.chartData) return false;
                this.set_opts();
                this.build_chart();
            },
        },
        chartType($val) {
            if (this.useChartData && this.useChartData.data) {
                this.set_opts();
                this.build_chart();
            }
            this.typeOpts_all.forEach((item) => {
                if (item.code == $val) this.chartName = item.type;
            });
        },
        typeOpts(val) {
            if (val && val.length) {
                this.chartType = this.typeOpts_all.getParseDatas({ type: val.includes(this.type) ? this.type : val[0] })[0].code;
            }
        },
        legend($val) {
            if (this.useChartData && this.useChartData.data) {
                this.set_opts();
                this.build_chart();
            }
        },
        legendVolume($val) {
            if (this.useChartData && this.useChartData.data) {
                this.set_opts();
                this.build_chart();
            }
        },
        totalLabel($val) {
            if (this.useChartData && this.useChartData.data) {
                this.set_opts();
                this.build_chart();
            }
        },
    },
    methods: {
        getParseChartData() {
            if (!this.chartData) return [];

            if (this.useDateType == null && !this.compareFixed) {
                return this.chartData;
            }

            // if (this.useDateType == null && this.compareFixed) this.useDateType = 0;

            if (!this.chartData.data) return [];

            if (!this.compareFixed) {
                if (this.chartData.data[0] && this.chartData.data[0].compare) this.compareDate = true;
                else this.compareDate = false;
            }
            let startDate, compareEndDate;
            if (this.compareDate) {
                this.chartData.data.forEach(function ($item, $idx, $arr) {
                    if ($item.compare) compareEndDate = $item.category;
                    if (!startDate && !$item.compare) startDate = $item.category;
                });
            }

            let _this = this;
            let chartDataClone = JSON.parse(JSON.stringify(this.chartData));

            // 비교기간 데이터 체크 여부에 따라 비교기간 데이터 제거
            if (this.compareDate) {
                let delCnt = 0;
                chartDataClone.data.forEach(function ($item, $idx, $arr) {
                    $item.dashed = $item.compare ? 4 : 0;
                    $item.opacity = $item.compare ? 0.5 : 1;
                    if (!_this.useCompareDate && $item.compare) delCnt++;
                });
                chartDataClone.data.splice(0, delCnt);
            }

            if (this.useDateType == 0) {
                if (_this.multipleDate) {
                    let result = JSON.parse(JSON.stringify(chartDataClone));
                    result.data.forEach(($item, $idx) => {
                        let tmp = $item.category.split('\n');
                        tmp[0] = $idx == 0 ? '시작일' : '+' + $idx + '일';
                        $item.category = tmp.join('\n');
                    });

                    return result;
                } else {
                    return chartDataClone;
                }
            } else if (this.useDateType == 1) {
                let result = JSON.parse(JSON.stringify(chartDataClone));
                let weekCnt = 0;
                result.data = [];

                // 멀티 데이트인 경우
                if (_this.multipleDate) {
                    // 그래프 별로 분할
                    let tmpDatas = [];
                    chartDataClone.graphs.forEach(function ($item, $idx) {
                        $item.idx = $idx;
                        tmpDatas[$idx] = [];
                    });
                    chartDataClone.data.filter(function ($item, $idx) {
                        let graphIdx = 0;
                        let categoryIdx = 0;
                        for (let $key in $item) {
                            if ($key.indexOf('value') >= 0) {
                                let category = $item.category.split('\n');
                                category.shift();

                                let item = {};
                                item.category = category[categoryIdx];
                                item.compare = $item.compare;
                                item[$key] = $item[$key];
                                if (tmpDatas[graphIdx]) tmpDatas[graphIdx].push(item);

                                graphIdx++;
                                categoryIdx++;
                                if (categoryIdx >= category.length) categoryIdx = 0;
                            }
                        }
                    });

                    // 주별로 묶음
                    let resultTmp = [];
                    let maxCnt = 0;
                    tmpDatas.forEach(($item, $idx) => {
                        resultTmp[$idx] = [];
                        weekCnt = 0;
                        $item.forEach(($item2, $idx2) => {
                            let date = $item2.category.strToDate();

                            if (!resultTmp[$idx][weekCnt]) {
                                resultTmp[$idx][weekCnt] = {
                                    category: date.dateToStr(),
                                };
                            }
                            for (let $key in $item2) {
                                if ($key.indexOf('value') >= 0) {
                                    if (!resultTmp[$idx][weekCnt][$key]) resultTmp[$idx][weekCnt][$key] = 0;
                                    resultTmp[$idx][weekCnt][$key] += $item2[$key];
                                }
                            }

                            resultTmp[$idx][weekCnt].compare = $item2.compare;
                            resultTmp[$idx][weekCnt].dashed = $item2.compare ? 4 : 0;
                            resultTmp[$idx][weekCnt].opacity = $item2.compare ? 0.5 : 1;

                            resultTmp[$idx][weekCnt].categoryEndDate = date.dateToStr();

                            if (compareEndDate == date.dateToStr() || date.getDay() == 6) {
                                weekCnt++;
                            }

                            maxCnt = Math.max(maxCnt, resultTmp[$idx].length);
                        });
                    });

                    // 전체 묶음
                    let cnt = 0;
                    let categoryLen = chartDataClone.data && chartDataClone.data[0] ? chartDataClone.data[0].category.split('\n').length - 1 : 0;

                    for (let Loop1 = 0; Loop1 < maxCnt; ++Loop1) {
                        let item = {
                            category: Loop1 == 0 ? '시작주' : '+' + Loop1 + '주',
                            categoryEndDate: Loop1 == 0 ? '종료주' : '+' + Loop1 + '주',
                        };
                        result.data.push(item);

                        resultTmp.forEach(($item, $idx) => {
                            if ($idx < categoryLen) {
                                if ($item[Loop1]) {
                                    item.category += '\n' + $item[Loop1].category;
                                    item.categoryEndDate += '\n' + $item[Loop1].categoryEndDate;
                                } else {
                                    item.category += '\n-';
                                    item.categoryEndDate += '\n-';
                                }
                            }

                            for (let $key in $item[Loop1]) {
                                if ($key.indexOf('value_') >= 0) {
                                    item[$key] = $item[Loop1][$key];
                                }
                            }

                            item.compare = $item[Loop1] && $item[Loop1].compare;
                            item.dashed = item.compare ? 4 : 0;
                            item.opacity = item.compare ? 0.5 : 1;
                        });
                    }
                } else {
                    // 멀티 데이트 아닌 경우
                    chartDataClone.data.filter(function ($item, $idx) {
                        let date = $item.category.strToDate();

                        if (!result.data[weekCnt]) {
                            result.data[weekCnt] = {
                                category: date.dateToStr(),
                            };
                        }
                        for (let $key in $item) {
                            if ($key != 'category') {
                                if (!result.data[weekCnt][$key]) result.data[weekCnt][$key] = 0;
                                result.data[weekCnt][$key] += $item[$key];
                            }
                        }

                        result.data[weekCnt].compare = $item.compare;
                        result.data[weekCnt].dashed = $item.compare ? 4 : 0;
                        result.data[weekCnt].opacity = $item.compare ? 0.5 : 1;

                        if (compareEndDate == date.dateToStr() || date.getDay() == 6 || $idx == chartDataClone.data.length - 1) {
                            result.data[weekCnt].categoryEndDate = date.dateToStr();
                            weekCnt++;
                        }
                    });
                }

                return result;
            } else {
                let result = JSON.parse(JSON.stringify(chartDataClone));
                let monthCnt = 0;
                result.data = [];

                // 멀티 데이트인 경우
                if (_this.multipleDate) {
                    // 그래프 별로 분할
                    let tmpDatas = [];
                    chartDataClone.graphs.forEach(function ($item, $idx) {
                        $item.idx = $idx;
                        tmpDatas[$idx] = [];
                    });
                    chartDataClone.data.filter(function ($item, $idx) {
                        let graphIdx = 0;
                        let categoryIdx = 0;
                        for (let $key in $item) {
                            if ($key.indexOf('value') >= 0) {
                                let category = $item.category.split('\n');
                                category.shift();

                                let item = {};
                                item.category = category[categoryIdx];
                                item.compare = $item.compare;
                                item[$key] = $item[$key];
                                if (tmpDatas[graphIdx]) tmpDatas[graphIdx].push(item);

                                graphIdx++;
                                categoryIdx++;
                                if (categoryIdx >= category.length) categoryIdx = 0;
                            }
                        }
                    });

                    // 월별로 묶음
                    let resultTmp = [];
                    let maxCnt = 0;
                    tmpDatas.forEach(($item, $idx) => {
                        resultTmp[$idx] = [];
                        monthCnt = 0;
                        $item.forEach(($item2, $idx2) => {
                            let date = $item2.category.strToDate();

                            if (!resultTmp[$idx][monthCnt]) {
                                resultTmp[$idx][monthCnt] = {
                                    category: date.dateToStr(),
                                };
                            }
                            for (let $key in $item2) {
                                if ($key != 'category') {
                                    if (!resultTmp[$idx][monthCnt][$key]) resultTmp[$idx][monthCnt][$key] = 0;
                                    resultTmp[$idx][monthCnt][$key] += $item2[$key];
                                }
                            }

                            resultTmp[$idx][monthCnt].compare = $item2.compare;
                            resultTmp[$idx][monthCnt].dashed = $item2.compare ? 4 : 0;
                            resultTmp[$idx][monthCnt].opacity = $item2.compare ? 0.5 : 1;

                            resultTmp[$idx][monthCnt].categoryEndDate = date.dateToStr();

                            if (compareEndDate == date.dateToStr() || date.dateToStr() == date.dateToStr().getLastDate()) {
                                monthCnt++;
                            }

                            maxCnt = Math.max(maxCnt, resultTmp[$idx].length);
                        });
                    });

                    // 전체 묶음
                    let cnt = 0;
                    let categoryLen = chartDataClone.data && chartDataClone.data[0] ? chartDataClone.data[0].category.split('\n').length - 1 : 0;

                    for (let Loop1 = 0; Loop1 < maxCnt; ++Loop1) {
                        let item = {
                            category: Loop1 == 0 ? '시작월' : '+' + Loop1 + '월',
                            categoryEndDate: Loop1 == 0 ? '종료월' : '+' + Loop1 + '월',
                        };
                        result.data.push(item);

                        resultTmp.forEach(($item, $idx) => {
                            if ($idx < categoryLen) {
                                if ($item[Loop1]) {
                                    item.category += '\n' + $item[Loop1].category;
                                    item.categoryEndDate += '\n' + $item[Loop1].categoryEndDate;
                                } else {
                                    item.category += '\n-';
                                    item.categoryEndDate += '\n-';
                                }
                            }

                            for (let $key in $item[Loop1]) {
                                if ($key.indexOf('value_') >= 0) {
                                    item[$key] = $item[Loop1][$key];
                                }
                            }

                            item.compare = $item[Loop1] && $item[Loop1].compare;
                            item.dashed = item.compare ? 4 : 0;
                            item.opacity = item.compare ? 0.5 : 1;
                        });
                    }
                } else {
                    // 멀티 데이트 아닌 경우
                    let beforeMonth;
                    let monthPlusChk = false;
                    chartDataClone.data.filter(function ($item, $idx, $arr) {
                        let date = $item.category.strToDate();
                        let endDate = $item.category.strToDate();
                        endDate.setDate(1);
                        endDate.setMonth(endDate.getMonth() + 1);
                        endDate.setDate(0);
                        if ($idx == $arr.length - 1) endDate = date;
                        if (date.getMonth() != beforeMonth) {
                            if (!monthPlusChk && beforeMonth != null && beforeMonth != undefined) {
                                monthPlusChk = true;
                                if ($idx > 0) {
                                    result.data[monthCnt].categoryEndDate = chartDataClone.data[$idx - 1].category;
                                }
                                monthCnt++;
                            }
                            beforeMonth = date.getMonth();
                        }

                        if (!monthPlusChk && startDate == date.dateToStr() && $idx != 0) {
                            monthPlusChk = true;
                            if ($idx > 0) result.data[monthCnt].categoryEndDate = chartDataClone.data[$idx - 1].category;
                            monthCnt++;
                        }

                        if (!beforeMonth) beforeMonth = date.getMonth();
                        if (!result.data[monthCnt]) {
                            result.data[monthCnt] = {
                                category: date.dateToStr(),
                                categoryEndDate: endDate.dateToStr(),
                            };
                        }
                        if ($idx == $arr.length - 1) {
                            result.data[monthCnt].categoryEndDate = endDate.dateToStr();
                        }
                        for (let $key in $item) {
                            if ($key != 'category') {
                                if (!result.data[monthCnt][$key]) result.data[monthCnt][$key] = 0;
                                result.data[monthCnt][$key] += $item[$key];
                            }
                        }

                        result.data[monthCnt].compare = $item.compare;
                        result.data[monthCnt].dashed = $item.compare ? 4 : 0;
                        result.data[monthCnt].opacity = $item.compare ? 0.5 : 1;

                        monthPlusChk = false;
                    });
                }
                return result;
            }
        },

        // 데이터 수에 따른 날짜 자동 변경
        autoDateTypeChange() {
            if (this.dateType) {
                return;
            }

            let gap = this.$el.getBoundingClientRect().width - 600;
            let cnt = 40;
            if (gap > 0) {
                cnt += Math.floor(gap / 100) * 10;
            }

            if (this.chartData) {
                if (this.chartData.graphs) this.visibleLegends = this.chartData.graphs.arrObjAttrToStr('graphCode').strToArr();

                if (this.dateType != null && this.dateType != undefined) {
                    if (this.chartData.data.length > cnt && this.chartData.data.length / 7 < cnt) {
                        this.useDateType = 1;
                    } else if (this.chartData.data.length >= cnt + 60) {
                        this.useDateType = 2;
                    } else {
                        this.useDateType = 0;
                        this.useChartData = this.getParseChartData();
                    }
                }
            }
        },
        set_opts: function () {
            let _this = this;
            this.chartOpts = JSON.parse(JSON.stringify(this.defaultChartOpts));

            // Rotate
            this.chartOpts.rotate = this.rotate;
            if (this.rotate) {
                this.chartOpts.marginRight = 30;
                this.chartOpts.marginLeft = 30;
            }

            if (this.chartOpts.valueAxes[0].minimum == null || this.chartType == 6) {
                delete this.chartOpts.valueAxes[0].minimum;
            }

            // Has Graphs Colors
            if (this.useChartData.graphs && this.useChartData.graphs.length > 0) {
                let tmp = [];
                this.useChartData.graphs.filter((item, idx) => {
                    if (item.fill || item.color) tmp.push(item.fill || item.color);
                    else tmp.push(this.chartOpts.colors[idx]);
                });
                if (tmp.length > 0) merge(this.chartOpts.colors, tmp);
            }

            // Graph Type
            if (_this.graphType == 'stack') this.chartOpts.valueAxes[0].stackType = 'regular';
            else if (_this.graphType == '100%') {
                this.chartOpts.valueAxes[0].stackType = '100%';
                this.chartOpts.valueAxes[0].unit = '%';
            }

            // Total value & Max Value
            let exptValues = [];
            if (this.useChartData.graphs) {
                for (let Loop1 = 0; Loop1 < this.useChartData.graphs.length; ++Loop1) {
                    if (this.useChartData.graphs[Loop1].exptTotal) exptValues.push(this.useChartData.graphs[Loop1].value_field);
                }
            }
            this.maxValue = 0;
            this.totalValue = 0;
            this.totalValue_newAxis = 0;
            for (let Loop1 = 0; Loop1 < this.useChartData.data.length; ++Loop1) {
                let max = 0;
                Object.keys(this.useChartData.data[Loop1]).forEach(function ($key, $idx) {
                    if ($key.indexOf('value') >= 0) {
                        _this.totalValue += parseInt(_this.useChartData.data[Loop1][$key]);
                        if (_this.graphType != 'stack') _this.maxValue = _this.maxValue > parseInt(_this.useChartData.data[Loop1][$key]) ? _this.maxValue : parseInt(_this.useChartData.data[Loop1][$key]);
                        max += parseInt(_this.useChartData.data[Loop1][$key]);
                    }
                });
                if (_this.graphType == 'stack') {
                    _this.maxValue = _this.maxValue > max ? _this.maxValue : max;
                }

                for (let Loop2 = 0; Loop2 < exptValues.length; ++Loop2) {
                    _this.totalValue -= parseInt(_this.useChartData.data[Loop1][exptValues[Loop2]]);
                    _this.totalValue_newAxis += parseInt(_this.useChartData.data[Loop1][exptValues[Loop2]]);
                }
            }
            if (_this.graphType != '100%' && _this.totalLabel && _this.chartOpts.valueAxes[0].minimum == 0) {
                this.chartOpts.valueAxes.filter(function ($item) {
                    $item.minMaxMultiplier = 1.3;
                });
                // this.chartOpts.valueAxes[ 0 ].maximum = parseInt( this.maxValue ) * 1.3;
            }

            // New Axe
            if (this.useChartData.graphs) {
                let newAxeChk = false;
                let newAxeUnit = '';
                let min;
                let max;
                this.useChartData.graphs.filter(function ($item) {
                    if ($item.newAxis) {
                        newAxeChk = true;
                        newAxeUnit = $item.newAxis.unit;
                        min = $item.newAxis.min;
                        max = $item.newAxis.max;
                    }
                });
                if (newAxeChk) {
                    let axis = {
                        id: 'ValueAxis-2',
                        position: 'right',
                        usePrefixes: true,
                        zeroGridAlpha: 0,
                        axisThickness: 0,
                        color: '#CCCCCC',
                        gridAlpha: 0,
                        tickLength: 0,
                        title: '',
                        unit: newAxeUnit,
                    };
                    if (min) axis.minimum = min;
                    if (max) axis.maximum = max;
                    this.chartOpts.valueAxes.push(axis);
                }
            }

            // Total Label
            if (_this.graphType != '100%' && _this.totalLabel) {
                this.chartOpts.allLabels = [];
                let label = {
                    align: !this.rotate ? 'center' : 'right',
                    bold: true,
                    id: 'Label-total',
                    size: $(this.$el).outerHeight() * 0.25,
                    text: '전체 ' + String(this.totalValue).addComma() + '건',
                    color: '#000000',
                    alpha: 0.03,
                    // y: !this.rotate ? `${-3}%` : '5%',
                    y: 0,
                };

                if (this.rotate) label.x = '97%';
                _this.chartOpts.allLabels.push(label);
            }

            // Category Axe Date
            this.chartOpts.categoryAxis.minHorizontalGap = 140;
            if (this.useChartData.data.length > 0) {
                if (String(this.useChartData.data[0].category).isDate()) {
                    // this.chartOpts.categoryAxis.dateFormats = [
                    //     {
                    //         period: 'fff',
                    //         format: 'JJ:NN:SS',
                    //     },
                    //     {
                    //         period: 'ss',
                    //         format: 'JJ:NN:SS',
                    //     },
                    //     {
                    //         period: 'mm',
                    //         format: 'JJ:NN',
                    //     },
                    //     {
                    //         period: 'hh',
                    //         format: 'JJ:NN',
                    //     },
                    //     {
                    //         period: 'DD',
                    //         format: 'MM-DD',
                    //     },
                    //     {
                    //         period: 'WW',
                    //         format: 'MMM DD',
                    //     },
                    //     {
                    //         period: 'MM',
                    //         format: 'MMM',
                    //     },
                    //     {
                    //         period: 'YYYY',
                    //         format: 'YYYY',
                    //     },
                    // ];
                    // if (this.useDateType == 0 && this.chartType == 6 && !this.multipleDate) this.chartOpts.categoryAxis.parseDates = true;
                    // else this.chartOpts.categoryAxis.parseDates = false;
                    this.chartOpts.categoryAxis.equalSpacing = this.rotate ? false : true;
                    this.chartOpts.categoryAxis.gridPosition = 'start';
                    this.chartOpts.categoryAxis.autoWrap = false;

                    if (this.$el.getBoundingClientRect().width > 600) this.chartOpts.categoryAxis.minHorizontalGap = 180;
                    else this.chartOpts.categoryAxis.minHorizontalGap = 140;

                    this.chartOpts.categoryAxis.minVerticalGap = 18;
                    // this.chartOpts.categoryAxis.labelFrequency = 1;
                    this.chartOpts.categoryAxis.markPeriodChange = false;
                    // this.chartOpts.categoryAxis.startOnAxis = true;
                    // this.chartOpts.categoryAxis.minPeriod = "DD";
                    // this.chartOpts.categoryAxis.renderer.minGridDistance = 0;

                    // "gridPosition": "start",
                    //     "startOnAxis": true,
                    //         "axisColor": "#dcdcdc",
                    //             "gridAlpha": 0,
                    //                 "minHorizontalGap": 100

                    // this.chartOpts.categoryAxis.autoGridCount = true;

                    // let categoryAxisVisibleItemLen = Math.floor((this.$el.getBoundingClientRect().width - 100) / 90);
                    // this.chartOpts.categoryAxis.labelFrequency = Math.ceil(this.useChartData.data.length / categoryAxisVisibleItemLen);

                    // if (this.useDateType == 0) {
                    //     // delete this.chartOpts.categoryAxis.minHorizontalGap;
                    //     this.chartOpts.categoryAxis.minHorizontalGap = 130;
                    // } else if (this.useDateType == 1) {
                    //     // delete this.chartOpts.categoryAxis.minHorizontalGap;
                    //     this.chartOpts.categoryAxis.minHorizontalGap = 100;
                    // } else if (this.useDateType == 2) {
                    //     // delete this.chartOpts.categoryAxis.minHorizontalGap;
                    //     this.chartOpts.categoryAxis.minHorizontalGap = 100;
                    // }
                }
            }

            this.chartOpts.categoryAxis.labelFunction = function ($val, $item, $e) {
                if (!$val) return '';
                if (_this.useDateType == null) return $val;
                if (this.chart.boundingRect.width < 160 && $e.chart.categoryAxis.allLabels.length) return '';
                if (_this.useDateType == 0 && _this.chartType == 6) {
                    if (_this.multipleDate) return $val;
                    // else return _this.$options.filters.dateToStr(new Date($item));
                    else return $val;
                } else if (_this.useDateType == 1 && $val) {
                    if (_this.multipleDate) {
                        let result = '';
                        if (_this.chartType == 0 || _this.chartType == 1 || _this.chartType == 2 || _this.chartType == 6) {
                            let tmp = $val.split('\n');
                            tmp.forEach(($item) => {
                                result += !$item.isDate() ? ($item == '-' ? '\n-' : $item) : '\n' + $item.getWeekendToStr();
                            });
                        } else {
                            result = $val.split('\n')[0];
                        }
                        return result;
                    } else {
                        /**
                         * 데이터 타입 (주) , 1 주차 , val의 연도가 전년도일 경우
                         * 1주차 연도가 아닌 전년도로 출력 되는 상황 코드 수정
                         *
                         * ex) 2024-12-29 ~ 2025-01-04 => 25년 1주차이지만 24년 1주차로 출력 됨
                         *
                         * props로 받아오는 chartData의 마지막 날짜와 비교 대상 날짜의 연도가 다를 경우 마지막 날짜 연도로 변경처리
                         *
                         */

                        return $val.getWeekendToStr();
                        // return $val.split('-')[0] + '-W' + $val.getWeekend().numAddZero();
                    }
                } else if (_this.useDateType == 2) {
                    if (_this.multipleDate) {
                        let result = '';
                        if (_this.chartType == 0 || _this.chartType == 1 || _this.chartType == 2 || _this.chartType == 6) {
                            let tmp = $val.split('\n');
                            tmp.forEach(($item) => {
                                result += !$item.isDate() ? ($item == '-' ? '\n-' : $item) : '\n' + $item.substr(0, 7);
                            });
                        } else {
                            result = $val.split('\n')[0];
                        }
                        return result;
                    } else return $val.split('-')[0] + '-' + $val.split('-')[1];
                }
                if (_this.multipleDate && (_this.chartType == 3 || _this.chartType == 4 || _this.chartType == 5)) {
                    return $val.isDate() ? $val.split('-')[0] + '-' + $val.split('-')[1] + '-' + $val.split('-')[2] : $val.split('\n')[0];
                } else {
                    return $val.isDate() ? $val.split('-')[0] + '-' + $val.split('-')[1] + '-' + $val.split('-')[2] : $val;
                }
            };

            if (this.useChartData.graphs && this.useChartData.graphs.length > 6) {
                this.chartOpts.balloon.horizontalPadding = 3;
                this.chartOpts.balloon.verticalPadding = 1;
            }

            this.chartOpts.chartCursor.categoryBalloonFunction = function ($val, a, b, c) {
                let result = $val;
                if (_this.useDateType == 0) {
                    if (_this.multipleDate) {
                        return $val.replaceAll('\n', '<br>');
                    } else {
                        let tmpDate = new Date($val);
                        return tmpDate.dateToStr();
                    }
                } else if (_this.useDateType == 1) {
                    if (_this.multipleDate) {
                        let result = '';
                        const dateData = _this.useChartData.data.filter(function ($item) {
                            return $item.category == $val;
                        });
                        if (dateData[0]) {
                            let tmpS = dateData[0].category.split('\n');
                            let tmpE = dateData[0].categoryEndDate.split('\n');
                            result += tmpS[0];
                            tmpS.shift();
                            tmpE.shift();
                            tmpS.forEach(($item, $idx) => {
                                result += $item != '-' ? '<br>' + $item + ' ~ ' + tmpE[$idx] : '<br>-';
                            });
                        }
                        return result;
                    } else {
                        let tmpDate = new Date($val);
                        let dateData = _this.useChartData.data.filter(function ($item) {
                            return $item.category == tmpDate.dateToStr();
                        });
                        let tmpEndDate = dateData[0] && dateData[0].categoryEndDate ? dateData[0].categoryEndDate : null;

                        if (tmpEndDate) {
                            result = new Date($val).dateToStr() + ' ~ ' + tmpEndDate;
                        } else {
                            tmpDate.setDate(tmpDate.getDate() + 6);
                            if (tmpDate.getTime() > _this.chartData.data[_this.chartData.data.length - 1].category.strToDate().getTime()) {
                                tmpDate = _this.chartData.data[_this.chartData.data.length - 1].category.strToDate();
                            }
                            result = new Date($val).dateToStr() + ' ~ ' + tmpDate.dateToStr();
                        }
                    }
                } else if (_this.useDateType == 2) {
                    if (_this.multipleDate) {
                        let result = '';
                        const dateData = _this.useChartData.data.filter(function ($item) {
                            return $item.category == $val;
                        });
                        if (dateData[0]) {
                            let tmpS = dateData[0].category.split('\n');
                            let tmpE = dateData[0].categoryEndDate.split('\n');
                            result += tmpS[0];
                            tmpS.shift();
                            tmpE.shift();
                            tmpS.forEach(($item, $idx) => {
                                result += $item != '-' ? '<br>' + $item + ' ~ ' + tmpE[$idx] : '<br>-';
                            });
                        }
                        return result;
                    } else {
                        let tmpDate = new Date($val);
                        let dateData = _this.useChartData.data.filter(function ($item) {
                            return $item.category == tmpDate.dateToStr();
                        });
                        let tmpEndDate = dateData[0] && dateData[0].categoryEndDate ? dateData[0].categoryEndDate : null;

                        if (tmpEndDate) {
                            result = new Date($val).dateToStr() + ' ~ ' + tmpEndDate;
                        } else {
                            tmpDate.setDate(1);
                            tmpDate.setMonth(tmpDate.getMonth() + 1);
                            tmpDate.setDate(0);
                            if (tmpDate > _this.chartData.data[_this.chartData.data.length - 1].category.strToDate()) {
                                tmpDate = _this.chartData.data[_this.chartData.data.length - 1].category.strToDate();
                            }
                            result = new Date($val).dateToStr() + ' ~ ' + tmpDate.dateToStr();
                        }
                    }
                }

                if (_this.rotate && String(result).isDate()) {
                    if (_this.useDateType == 1 || _this.useDateType == 2) {
                        return result.replace(' ~ ', '<br>');
                    }
                    return result.replace('-', '<br>');
                }
                return result;
            };

            // Chart Scroll Bar
            if (this.useChartData.data.length > this.maxCategoryLen) {
                this.chartOpts.chartScrollbar.enabled = true;
            }

            // Legend
            if (this.legend) this.chartOpts.legend.position = this.legend;
            else this.chartOpts.legend.enabled = false;
            if (this.legend == 'top') this.chartOpts.legend.marginTop = 0;
            else if (this.legend == 'left' || this.legend == 'right') {
                this.chartOpts.legend.marginLeft = 15;
                this.chartOpts.legend.marginRight = 15;
                if (this.legend == 'left') this.chartOpts.legend.marginRight = 25;
                if (this.legend == 'right') this.chartOpts.legend.marginLeft = 25;
            } else if (this.legend == 'bottom') {
                this.chartOpts.legend.marginTop = 0;
                this.chartOpts.legend.marginBottom = 0;
            }

            // Graph Event(Over)
            if (this.legend && this.legendVolume) {
                this.chartOpts.legend.equalWidths = true;
                this.chartOpts.legend.valueText = '[[value]] ([[percents]]%)';
                this.chartOpts.legend.valueWidth = 110;
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
                            if ($e.exptTotal) cnt = (_this.chart && _this.chart.nf ? AmCharts.addPrefix(cnt, _this.chart.prefixesOfBigNumbers, _this.chart.prefixesOfSmallNumbers, _this.chart.nf) : 0) + '건';
                            else cnt = (_this.chart && _this.chart.nf ? AmCharts.addPrefix(cnt, _this.chart.prefixesOfBigNumbers, _this.chart.prefixesOfSmallNumbers, _this.chart.nf) : 0) + '건 (' + ((cnt / total) * 100).isNum().toFixed(1) + '%)';
                            if ($e.hidden) {
                                cnt = 0 + '건 (' + ((cnt / total) * 100).isNum().toFixed(1) + '%)';
                            }
                        } else if (!$e.data) {
                            $e.graph.chart.graphs.filter(function ($it) {
                                if (!$it.hidden && !$it.exptTotal) {
                                    colArr.push($it.valueField);
                                }
                            });
                            let totalSumArr = [];
                            $e.graph.chart.chartData.filter(function (c) {
                                let category = $e.category.isDate() ? new Date($e.category).dateToStr() : $e.category;
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
            this.chartOpts.legend.listeners = [
                {
                    event: 'rollOverItem',
                    method: function ($e) {
                        let selIdx = $e.dataItem.index;
                        $e.chart.graphs.filter(function ($item, $idx) {
                            if ($idx != selIdx) {
                                let opacity = _this.chartType == 6 ? 0.1 : 0.3;
                                TweenMax.to($(_this.$el).find('.amcharts-graph-' + $item.id), 0.3, { autoAlpha: opacity });
                            }
                        });
                        TweenMax.to($e.event.target, 0.24, { 'fill-opacity': 0.4 });
                    },
                },
                {
                    event: 'rollOutItem',
                    method: function ($e) {
                        let selIdx = $e.dataItem.index;
                        $e.chart.graphs.filter(function ($item, $idx) {
                            TweenMax.to($(_this.$el).find('.amcharts-graph-' + $item.id), 0.3, { autoAlpha: 1 });
                        });
                        TweenMax.to($e.event.target, 0.24, { 'fill-opacity': 0.15 });
                    },
                },
                {
                    event: 'showItem',
                    method: function ($e) {
                        _this.visibleLegends = _this.visibleLegends.addItem($e.dataItem.graphCode);
                    },
                },
                {
                    event: 'hideItem',
                    method: function ($e) {
                        _this.visibleLegends = _this.visibleLegends.removeItem($e.dataItem.graphCode);
                    },
                },
            ];

            // init
            this.chartOpts.listeners = [
                {
                    event: 'init',
                    method: function ($e) {
                        // 레저드 꺼저 있는지 체크
                        $e.chart.graphs.forEach(($item) => {
                            if (_this.chartData.graphs && !_this.visibleLegends.includes($item.graphCode)) {
                                $e.chart.hideGraph($item);
                            }
                        });

                        $(_this.$refs.chart).show();
                        _this.$emit('init', $e);
                    },
                },
                {
                    event: 'drawn',
                    method: function ($e) {
                        _this.evt_chartInit($e);
                        _this.$emit('drawn', $e);

                        if (_this.multipleDate) {
                            // 라벨 생성후 색상 변경
                            if ($e.chart.categoryAxis.allLabels) {
                                $e.chart.categoryAxis.allLabels.forEach(($item) => {
                                    Array.from($item.node.children).map(($item2, $idx2) => {
                                        // if ($e.chart.graphs[$idx2 - 1]) $item2.setAttribute('fill', $e.chart.graphs[$idx2 - 1].graphColor);
                                        if ($idx2 > 0) $item2.setAttribute('fill', _this.multipleDate[$idx2 - 1]);
                                    });
                                });
                            }
                        }
                    },
                },
                {
                    event: 'rendered',
                    method: function ($e) {
                        if ($e.chart.chartDiv.querySelector('.amcharts-label-Label-total')) {
                            $e.chart.chartDiv.querySelector('.amcharts-label-Label-total').setAttribute('transform', `translate(${$e.chart.chartDiv.getBoundingClientRect().width / 2},0)`);
                            // $e.chart.chartDiv.querySelector('.amcharts-label-Label-total').setAttribute('text-anchor', 'middle');
                            $e.chart.chartDiv.querySelector('.amcharts-label-Label-total').setAttribute('y', '0');
                            $e.chart.chartDiv.querySelector('.amcharts-label-Label-total > tspan').setAttribute('y', '0');
                            $e.chart.chartDiv.querySelector('.amcharts-label-Label-total > tspan').style.alignmentBaseline = 'text-before-edge';

                            if ($e.chart.chartDiv.getBoundingClientRect().width < $e.chart.chartDiv.querySelector('.amcharts-label-Label-total').getBoundingClientRect().width) {
                                const overPer = $e.chart.chartDiv.getBoundingClientRect().width / $e.chart.chartDiv.querySelector('.amcharts-label-Label-total').getBoundingClientRect().width;
                                // const tmpOverPer = 1 - overPer;
                                const fontSize = parseInt($e.chart.chartDiv.querySelector('.amcharts-label-Label-total').getAttribute('font-size'));

                                // $e.chart.chartDiv.querySelector('.amcharts-label-Label-total').setAttribute('font-size', parseInt(fontSize * overPer));

                                _this.chartOpts.valueAxes.filter(function ($item) {
                                    $item.minMaxMultiplier = 0.3 * overPer + 1;
                                });

                                _this.chartOpts.allLabels[0].size = parseInt(fontSize * overPer);
                                _this.build_chart();
                            }
                        }

                        _this.$emit('rendered', $e);
                    },
                },
            ];

            // Simple Chart
            if (this.simple) {
                this.chartOpts.autoMargins = false;
                this.chartOpts.marginBottom = 0;
                this.chartOpts.marginLeft = 0;
                this.chartOpts.marginRight = 0;
                this.chartOpts.marginTop = 20;
                this.chartOpts.categoryAxis.labelsEnabled = false;
                this.chartOpts.categoryAxis.gridAlpha = 0;
                this.chartOpts.categoryAxis.axisThickness = 0;
                this.chartOpts.valueAxes[0].labelsEnabled = false;
                this.chartOpts.valueAxes[0].gridAlpha = 0;
                this.chartOpts.valueAxes[0].axisThickness = 0;
                delete this.chartOpts.chartCursor;
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

                    if ($key == 'chartCursor' && !Object.keys(_this.opts[$key]).length) delete _this.chartOpts.chartCursor;
                });

                if (this.opts.colors && !this.useChartData.graphs) {
                    this.useChartData.data.filter(function ($item, $idx) {
                        $item.fill = _this.opts.colors[$idx];
                    });
                }
            }
        },
        build_chart: function () {
            let _this = this;

            if (this.chart) {
                this.chart.clear();
                this.chart = null;
            }

            $(this.$refs.chart).hide();
            this.buildGraphs();
            this.chartOpts.dataProvider = this.useChartData.data;
            this.chart = AmCharts.makeChart(this.$refs.chart, this.chartOpts);
            this.chart.invalidateSize();

            // Events
            // this.chart.addListener( "drawn", this.evt_chartInit );
            if (this.getClickEvtChk) {
                this.chart.addListener('clickGraphItem', this.evt_chartClick);
            }
        },
        buildGraphs: function () {
            let _this = this;
            let graphs = [];
            if (this.useChartData.graphs) {
                this.useChartData.graphs.filter(function ($item, $idx) {
                    let graph;
                    if (_this.chartType == 6 || $item.lineType) {
                        graph = {
                            graphCode: $item.graphCode,
                            // "balloonText": '<div class="v3_chart_tooltip"><strong class="title">[[title]]</strong><span class="dv">[[value]]</span><span class="per">([[percents]]%)</span><div>[[total]]</div></div>',
                            balloonFunction: function ($val, $e) {
                                if ($item.lineType) {
                                    if ($item.balloonTitle_category) {
                                        if ($e.axisUnit == '%') return '<div class="v3_chart_tooltip' + (jsgradient.getReversal($val.lineColor || $e.lineColorR) ? '' : ' is-black') + '"><strong class="title">' + $val.graph.title + '</strong><span class="dv">' + $val.values.value.length(1) + '%</span></div>';
                                        return '<div class="v3_chart_tooltip' + (jsgradient.getReversal($val.lineColor || $e.lineColorR) ? '' : ' is-black') + '"><strong class="title">' + $val.graph.title + '</strong><span class="dv">' + $val.values.value.toString().addComma() + '건</span>' + '</div>';
                                    } else {
                                        if ($e.axisUnit == '%') return '<div class="v3_chart_tooltip' + (jsgradient.getReversal($val.lineColor || $e.lineColorR) ? '' : ' is-black') + '"><strong class="title">' + $val.graph.title + '</strong><span class="dv">' + $val.values.value.toFixed(1) + '%</span></div>';
                                        return '<div class="v3_chart_tooltip' + (jsgradient.getReversal($val.lineColor || $e.lineColorR) ? '' : ' is-black') + '"><strong class="title">' + $val.graph.title + '</strong><span class="dv">' + $val.values.value.toString().addComma() + '건</span>' + '</div>';
                                    }
                                } else {
                                    return '<div class="v3_chart_tooltip2' + (jsgradient.getReversal($val.lineColor || $e.fillColorsR) ? '' : ' is-black') + '"><strong class="title">' + $val.graph.title + '</strong><span class="dv">' + ($val.values.value || 0).toString().addComma() + '건</span>' + (_this.balloonPercentage && _this.useChartData.graphs.length > 1 ? '<span class="per">(' + ((($val.values.value || 0) / ($val.values.total || 0)) * 100 || 0).toFixed(1) + '%)</span>' : '') + '</div>';
                                }
                            },
                            // "fillAlphas": 1,
                            connect: false,
                            graphColor: _this.chartOpts.colors[$idx],
                            fillColors: _this.chartOpts.colors[$idx],
                            fillAlphas: 0,
                            id: 'AmGraph-' + $idx,
                            title: $item.name,
                            // "labelText": _this.graphType == "stack" ? "[[value]]" : ( _this.graphType == "100%" ? "[[percents]]%" : "" ),
                            // "type": "column",
                            color: _this.graphType == '100%' || _this.graphType ? '#ffffff' : '',
                            fontSize: 13,
                            valueAxis: $item.newAxis ? 'ValueAxis-2' : 'ValueAxis-1',
                            valueField: $item.value_field,
                            dashLengthField: 'dashed',
                            showHandOnHover: _this.getClickEvtChk ? true : false,
                            bullet: 'round',
                            bulletBorderAlpha: 1,
                            bulletBorderColor: '#FFFFFF',
                            bulletBorderThickness: _this.chartType == 6 && !$item.lineType ? 2 : 4,
                            bulletSize: _this.chartType == 6 && !$item.lineType ? 10 : 16,
                            lineThickness: _this.chartType == 6 && !$item.lineType ? 2 : 4,
                        };
                        if ($item.newAxis && $item.newAxis.unit == '%') graph.axisUnit = '%';
                        if ($item.fill || $item.color) {
                            graph.graphColor = $item.fill || $item.color;
                            graph.lineColor = $item.fill || $item.color;
                            graph.fillColors = $item.fill || $item.color;
                        }
                        if ($item.fill_field) {
                            graph.lineColorField = $item.fill_field;
                        }

                        if ($item.alpha_field) {
                            graph.opacity = $item.alpha_field;
                        }

                        if ($item.alpha) {
                            graph.fillAlphas = 0.4;
                        }

                        if ($item.opts) Object.assign(graph, $item.opts);
                    } else {
                        graph = {
                            graphCode: $item.graphCode,
                            balloonFunction: function ($val, $e) {
                                if (_this.graphType == '100%') {
                                    return (
                                        '<div class="v3_chart_tooltip2' +
                                        (jsgradient.getReversal($val.fillColors || $e.fillColorsR) ? '' : ' is-black') +
                                        '"><strong class="title">' +
                                        ($item.balloon && $item.balloon.title == 'category' ? $val.category : $val.graph.title) +
                                        ($item.balloon && $item.balloon.titleUnit ? $item.balloon.titleUnit : '') +
                                        '</strong><span class="dv">' +
                                        $val.values.value.toString().addComma() +
                                        ($item.balloon && $item.balloon.valueUnit ? $item.balloon.valueUnit : '') +
                                        '건</span>' +
                                        (_this.balloonPercentage && _this.useChartData.graphs.length > 1 ? '<span class="per">(' + ($val.values.percents == 100 && Object.keys($val.dataContext).filter(($item) => $item.indexOf('value_') >= 0).length == 1 ? (($val.values.value / _this.totalValue) * 100).toFixed(1) : ($val.values.percents || 0).toFixed(1)) + '%)</span>' : '') +
                                        '</div>'
                                    );
                                }
                                return (
                                    '<div class="v3_chart_tooltip2' +
                                    (jsgradient.getReversal($val.fillColors || $e.fillColorsR) ? '' : ' is-black') +
                                    '"><strong class="title">' +
                                    ($item.balloon && $item.balloon.title == 'category' ? $val.category : $val.graph.title) +
                                    ($item.balloon && $item.balloon.titleUnit ? $item.balloon.titleUnit : '') +
                                    '</strong><span class="dv">' +
                                    ($val.values.value ? $val.values.value.toString().addComma() : 0) +
                                    ($item.balloon && $item.balloon.valueUnit ? $item.balloon.valueUnit : '') +
                                    '건</span>' +
                                    (_this.balloonPercentage && _this.useChartData.graphs.length > 1 ? '<span class="per">(' + ($val.values.percents == 100 && Object.keys($val.dataContext).filter(($item) => $item.indexOf('value_') >= 0).length == 1 ? (($val.values.value / _this.totalValue) * 100).toFixed(1) : ($val.values.percents || 0).toFixed(1)) + '%)</span>' : '') +
                                    '</div>'
                                );
                            },
                            graphColor: _this.chartOpts.colors[$idx],
                            fillColors: _this.chartOpts.colors[$idx],
                            lineColor: _this.chartOpts.colors[$idx],
                            fillAlphas: 1,
                            id: 'AmGraph-' + $idx,
                            title: $item.name,
                            labelText: _this.graphType == 'stack' ? '[[value]]' : _this.graphType == '100%' ? '[[percents]]%' : '',
                            type: 'column',
                            color: _this.graphType == '100%' || _this.graphType ? '#ffffff' : '',
                            fontSize: 13,
                            valueField: $item.value_field,
                            alphaField: 'opacity',
                            showHandOnHover: _this.getClickEvtChk ? true : false,
                        };
                        if (_this.graphType == '100%' || _this.graphType == 'stack') {
                            graph.lineAlpha = 1;
                            graph.lineColor = '#ffffff';
                            graph.lineThickness = 0.2;
                        }
                        if ($item.fill || $item.color) {
                            graph.graphColor = $item.fill || $item.color;
                            graph.fillColors = $item.fill || $item.color;
                        }
                        if ($item.fill_field) {
                            graph.fillColorsField = $item.fill_field;
                            graph.lineColorField = $item.fill_field;
                        }

                        if ($item.alpha_field) {
                            graph.opacity = $item.alpha_field;
                        }

                        if ($item.alpha) {
                            graph.fillAlphas = 0.4;
                        }

                        if ($item.opts) Object.assign(graph, $item.opts);
                    }
                    graph.exptTotal = $item.exptTotal;
                    graphs.push(graph);
                });
            } else {
                let graph = {
                    balloonFunction: function ($val, $e) {
                        return '<div class="v3_chart_tooltip' + (jsgradient.getReversal($val.lineColor || $e.fillColorsR) ? '' : ' is-black') + '"><strong class="title">' + $val.category + '</strong><span class="dv">' + $val.values.value.toString().addComma() + '건</span>' + (_this.balloonPercentage ? '<span class="per">(' + (($val.values.value / _this.totalValue) * 100).toFixed(1) + '%)</span>' : '') + '</div>';
                    },
                    fillAlphas: 1,
                    id: 'AmGraph-0',
                    labelText: '[[value]]',
                    title: '정보량',
                    type: 'column',
                    fontSize: 14,
                    valueField: 'value',
                    showHandOnHover: _this.getClickEvtChk ? true : false,
                    colorField: 'fill',
                    lineColorField: 'fill',
                };
                graphs.push(graph);
            }

            this.chartOpts.graphs = graphs;
        },
        evt_chartInit: function ($e) {
            let _this = this;
            $e.chart.graphs.filter(function ($item, $idx) {
                // Legend Reset
                let rect = $($e.chart.legendDiv).find('.amcharts-legend-item-AmGraph-' + $idx + ' rect');
                rect.attr('x', -5);
                rect.attr('y', -2);
                rect.attr('width', parseInt(rect.attr('width')) + 30);
                rect.attr('height', 22);
                // rect.attr('fill', $item.fillColors);
                rect.attr('fill', '#ccc');
                rect.attr('fill-opacity', 0.15);
                rect.attr('rx', 11);
                rect.attr('ry', 11);
                $($e.chart.legendDiv)
                    .find('.amcharts-legend-item-AmGraph-' + $idx)
                    .prepend(rect);

                let circle = $($e.chart.legendDiv)
                    .find('.amcharts-legend-item-AmGraph-' + $idx)
                    .find('circle');
                circle.attr('fill', $item.fillColors);
                circle.attr('stroke', $item.fillColors);
            });
        },
        evt_chartClick: function ($e) {
            this.$emit('click', $e);
        },
        evt_resize($e) {
            if (this.chart && $e) {
                if ($e[0].contentRect.width > 600) this.chart.categoryAxis.minHorizontalGap = 180;
                else this.chart.categoryAxis.minHorizontalGap = 140;
            }

            // this.chartOpts.categoryAxis.minHorizontalGap = 200;

            this.elHgt = this.$el.clientHeight;

            this.set_opts();
            this.build_chart();
        },
    },
    // directives: {
    //     init: {
    //         inserted: function (el, binding, vnode) {
    //             console.log(el);
    //             console.log(binding);
    //             console.log(vnode.context.elHgt);
    //             vnode.context.elHgt = el.getBoundingClientRect().height;
    //         },
    //         update: function (el, binding, vnode) {
    //             console.log(el);
    //             console.log(binding);
    //             console.log(vnode.context.elHgt);
    //         },
    //     },
    // },
    destroyed: function () {
        if (!this.chart) return false;
        this.chart.clear();
        this.chart = null;
    },
};
</script>
