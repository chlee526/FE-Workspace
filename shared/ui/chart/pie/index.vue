<template>
    <div ref="chart" :id="id" class="ui_chart_wrap" :class="{ ui_nodata: !chartData?.data || chartData.data.length == 0 || !getNoData, 'is-click': getClickEvtChk }"></div>
</template>
<script>
import sharedStyle from '@shared/styles/styles.module.scss';
import { jsgradient } from '@shared/utils/prototype/util.colors';
import { TweenMax } from 'gsap';

export default {
    name: 'comp-chart-v3-pie',
    data() {
        return {
            chart: null,
            defaultChartOpts: {
                hideCredits: true,
                pathToImages: './img/amcharts/',
                type: 'pie',
                balloonText: '<div class="v3_chart_tooltip"><strong class="title">[[title]]</strong><span class="dv">[[value]]</span><span class="per">([[percents]]%)</span></div>',
                colors: ['#6ED1DB', '#5CBEE5', '#49AADB', '#478FDD', '#8154EF', '#DA42E2', '#DD3E60', '#EF6852', '#EA8D1F', '#EDCA1D', '#DADD3C', '#B8CC42', '#6CCC44', '#46BC94', '#31C8C8'],
                fontSize: this.getSharedFontSize(),
                autoDisplay: true,
                addClassNames: true,
                radius: '40%',
                innerRadius: '60%',
                labelRadius: -20,
                labelText: ' [[percents]]%',
                hideLabelsPercent: 4,
                labelColorField: '#FFFFFF',
                marginBottom: 0,
                marginTop: 0,
                startDuration: 0,
                titleField: 'category',
                valueField: 'value',
                color: '#FFFFFF',
                pullOutRadius: '0%',
                usePrefixes: true,
                percentPrecision: 1,
                colorField: 'fill',
                allLabels: [],
                balloon: {
                    adjustBorderColor: false,
                    fixedPosition: true,
                    animationDuration: 0,
                    fadeOutDuration: 0,
                    fillAlpha: 1,
                    horizontalPadding: 5,
                    shadowAlpha: 0.1,
                    verticalPadding: 3,
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
            },
            chartOpts: null,
        };
    },
    props: {
        id: { type: String },
        opts: { type: Object },
        chartData: { type: Object },
        legend: { type: String, default: null },
        legendVolume: { type: Boolean, default: false },
    },
    computed: {
        /**
         * 'is-click' class Bind를 위한 메소드
         * @return {Boolean}
         */
        getClickEvtChk() {
            // 차트 이벤트를 받아와 boolean 반환
            return this.$listeners.click ? true : false;
        },

        /**
         * 'ui_nodata' class Bind를 위한 메소드
         *  @return {Number} chartData 각 항목 총합
         */
        getNoData() {
            let totalCnt = 0;
            // chartData 각 항목 값 더하기
            this.chartData.data.forEach((item) => {
                totalCnt += item.value;
            });
            return totalCnt;
        },
    },
    mounted() {
        // chartData data가 있을 때
        if (this.chartData?.data) {
            // 차트 옵션 설정
            this.set_opts();
            // DOM에 차트 그리기
            this.build_chart();
        }
    },
    watch: {
        opts: {
            deep: true,
            handler() {
                // 차트 옵션 변경시 재설정
                if (this.chartData) this.set_opts();
            },
        },
        chartData: {
            deep: true,
            handler(val) {
                // chartData 변경시 차트 옵션 재설정, 차트 다시 그리기
                if (val) {
                    this.set_opts();
                    this.build_chart();
                }
            },
        },
        legend(val) {
            // 범례 변경시 차트 옵션 재설정, 차트 다시 그리기
            this.set_opts();
            this.build_chart();
        },
        legendVolume(val) {
            // 범례 표기 여부 변경 시 차트 옵션 재설정, 차트 다시 그리기
            this.set_opts();
            this.build_chart();
        },
    },
    methods: {
        /**
         * shared style module에서 공통 style가져오기
         * * computed로 옮기면 동작 X
         * @return {Number} font_size
         */
        getSharedFontSize() {
            return Number(sharedStyle.font_size.replace('px', ''));
        },

        /**
         * 차트 옵션 설정
         */
        set_opts() {
            const _this = this;
            this.chartOpts = structuredClone(this.defaultChartOpts);

            // Color Field(기본 'fill' 이지만, 'color'가 잇으면 'color'로 대체)
            if (this.chartData && this.chartData.data.length && this.chartData.data[0].color) this.chartOpts.colorField = 'color';

            // Label
            if (this.chartData.label) {
                this.setLabelOpts();
            }

            // Balloon 각 요소 툴팁 내용 지정(색상, 제목, 값, 퍼센테이지)
            this.chartOpts.balloonFunction = function (val, $e) {
                return `<div class="v3_chart_tooltip ${jsgradient.getReversal(val.color) ? '' : ' is-black'}">
                    <strong class="title">${val.title}</strong>
                    <span class="dv">${String(val.value).addComma()}건</span>
                    <span class="per">(${Number(val.percents).lengthLimitComma(1)}%)</span>
                    </div>`;
            };

            // Legend Events
            if (this.legend) {
                // 범례 위치, 이벤트 리스너(롤오버 및 롤아웃) 정의
                this.setLegendOpts();
            } else {
                this.chartOpts.legend.enabled = false;
            }

            // Graph Event(Over)
            // 범례 설정이 존재하고 legendVolume이 true인 경우에만 실행
            // 범례 아이템 너비, 텍스트 형식 지정
            if (this.legend && this.legendVolume) {
                this.chartOpts.legend.equalWidths = true;
                this.chartOpts.legend.valueText = '[[value]]건 ([[percents]]%)';
                this.chartOpts.legend.valueWidth = 100;
            }

            // init
            // 그래프 rendered 및 resized 이벤트
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

            if (this.opts) {
                // this.opts를 this.chartOpts에 병합
                Object.keys(this.opts).forEach((key) => {
                    if (this.opts[key].constructor == Object) {
                        // Object type 병합
                        this.chartOpts[key] = Object.assign(this.chartOpts[key], this.opts[key]);
                    } else if (this.opts[key].constructor == Array) {
                        // Array type 병합
                        this.opts[key].filter((item, idx2) => {
                            if (item.constructor == Object) {
                                this.chartOpts[key][idx2] = Object.assign(this.chartOpts[key][idx2], item);
                            } else {
                                this.chartOpts[key][idx2] = item;
                            }
                        });
                    } else {
                        // 그 외 타입
                        this.chartOpts[key] = this.opts[key];
                    }
                });
            }
        },

        /**
         * set_opts에서 label 설정
         * 텍스트 크기, 위치, 글꼴 색상
         */
        setLabelOpts() {
            const _this = this;

            // allLabels 설정 초기화
            this.chartOpts.allLabels = [];
            // 라벨 갯수
            const labelLen = Object.keys(this.chartData.label).length;
            // 현재 element 높이
            const divHeight = document.querySelector('#' + this.id).clientHeight;
            // 가운데 위치
            const centerY = Math.floor(((divHeight - this.getSharedFontSize()) / 2 / divHeight) * 100) + '%';

            // 라벨 정보를 추가하며, 각 라벨에 대한 설정을 정의(텍스트 크기, 위치, 글꼴 색상)
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
        },

        /**
         * set_opts에서 legend(범례) 설정
         * 범례 위치, 이벤트 리스너(롤오버 및 롤아웃)
         */
        setLegendOpts() {
            const _this = this;

            // 범례 위치 설정
            this.chartOpts.legend.position = this.legend;

            // 범례 아이템에 대한 이벤트 리스너 설정
            this.chartOpts.legend.listeners = [
                {
                    // 범례 아이템에 마우스가 올라갈 때의 동작
                    event: 'rollOverItem',
                    method: function (evt) {
                        const selIdx = evt.dataItem.index;
                        // 선택된 아이템을 제외한 다른 아이템의 투명도를 낮추고, 선택된 아이템 강조
                        evt.chart.chartData.forEach((item, idx) => {
                            if (idx != selIdx) {
                                if (item.wedge) TweenMax.to(item.wedge.node, 0.3, { autoAlpha: 0.1 });
                            }
                        });
                        TweenMax.to(evt.event.target, 0.24, { 'fill-opacity': 0.4 });
                    },
                },
                {
                    // 범례 아이템에서 마우스가 나갈 때의 동작
                    event: 'rollOutItem',
                    method: function (evt) {
                        const selIdx = evt.dataItem.index;
                        // 다른 아이템의 투명도를 복원하고, 선택된 아이템의 강조 효과 제거
                        evt.chart.chartData.forEach((item, idx) => {
                            if (idx != selIdx) {
                                if (item.wedge) TweenMax.to(item.wedge.node, 0.3, { autoAlpha: 1 });
                            }
                        });
                        TweenMax.to(evt.event.target, 0.24, { 'fill-opacity': 0.15 });
                    },
                },
                {
                    // 범례 아이템 숨김 이벤트
                    event: 'hideItem',
                    method: function (evt) {
                        // evt_chartInit 함수 호출
                        _this.evt_chartInit(evt);
                    },
                },
                {
                    // 범례 아이템 표시 이벤트
                    event: 'showItem',
                    method: function (evt) {
                        // evt_chartInit 함수 호출
                        _this.evt_chartInit(evt);
                    },
                },
            ];
        },

        /**
         * 차트 빌드, 초기화
         */
        build_chart() {
            // 이미 차트가 존재하면 이전 차트 지우고 초기화
            if (this.chart) {
                this.chart.clear();
                this.chart = null;
            }

            // 새로운 데이터로 새 차트 생성
            this.chartOpts.dataProvider = this.chartData.data;
            this.chart = AmCharts.makeChart(this.$refs.chart, this.chartOpts);

            // Events
            if (this.getClickEvtChk) {
                // getClickEvtChk 활성화 시, 차트 클릭 이벤트 추가
                this.chart.addListener('clickSlice', this.evt_chartClick);
            }
        },

        /**
         * 각 범례 항목에 스타일 적용
         * @param {Object} evt 이벤트 대상 {type, chart}
         */
        evt_chartInit(evt) {
            const switchElements = [...evt.chart.legendDiv.querySelectorAll('.amcharts-legend-switch')];
            switchElements.forEach((item, idx) => {
                const parent = item.parentElement;
                parent.classList.add('amcharts-legend-item-AmGraph-' + idx);

                // 범례 항목에 그릴 사각형 설정
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

                // 범례 항목에 그릴 원 설정
                const circle = parent.querySelector('circle');
                circle.setAttribute('fill', evt.chart.chartData[idx].color);
                circle.setAttribute('stroke', evt.chart.chartData[idx].color);
            });
        },

        /**
         * 차트 클릭 이벤트
         * @param {Object} $e 이벤트 대상
         */
        evt_chartClick($e) {
            this.$emit('click', $e);
        },
    },
    destroyed() {
        // 차트 제거
        if (!this.chart) return false;
        this.chart.clear();
        this.chart = null;
    },
};
</script>
