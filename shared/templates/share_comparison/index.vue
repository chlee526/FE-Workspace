<template>
    <div class="ui_box">
        <div class="header">
            <div class="wrap">
                <slot name="title"></slot>
                <div class="rc_wrap">
                    <comp-button v-if="$store.getters.getExcelUsage" class="ui_btn is-icon-only is-small" title="Excel 다운로드" @click="evt_excel" :loading="excelLoading"><span class="icon">&#xe005;</span></comp-button>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="wrap">
                <div class="share_comparison" :id="id">
                    <div v-if="!exist || !chartData || !chartData.data || !chartData.graphs" class="ui_nodata"></div>
                    <div v-else class="ui-loader-container" :class="{ 'is-loading': loading }">
                        <div class="share_label_wrap">
                            <div v-for="(item, idx) in chartData.data" :key="idx">
                                <div class="share_label">
                                    <span>{{ item.category }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="share_chart_wrap">
                            <comp-chart-column-line ref="chart" :id="id + '_share_comparison_chart'" :type="graphType" :type-opts="typeOpts" legend="top" :legend-volume="true" :chart-data="chartData" :total-label="false" :opts="opts" :style="{ height: getHeight }" @rendered="setLabelsPosition" @click="evt_click"> </comp-chart-column-line>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import { API_volume } from '@shared/api/volume';
import { uuid } from 'vue-uuid';
export default {
    name: 'tmpl-share-comparision',
    data() {
        return {
            apiUID: uuid.v4(), // API 사용하는 경우, API키생성 필수
            apiParams: null,
            loading: false,
            excelLoading: false, // 엑셀 로딩 체크
            opts: {
                categoryAxis: {
                    labelsEnabled: false,
                    ignoreAxisWidth: true,
                    labelFunction: null,
                },
                chartCursor: {},
                columnWidth: 0.6,
            },
            typeOpts: ['bar-stack-100', 'bar-stack'],
            legendHgt: 0,
            chartData: { graphs: [], data: [] },
            exist: false,
            tmpExParams: {},
        };
    },
    props: {
        id: { type: String },
        commonSearchOpts: { type: Object },
        graphType: { type: String, default: 'bar-stack-100' },
    },
    computed: {
        getHeight() {
            let { length } = this.chartData.data;
            let hgt = 50 * length + 45 + 34 + this.legendHgt;
            return `${hgt}px`;
        },
    },
    mounted() {
        this.fetchGraphs();
        this.tmpExParams = this.commonSearchOpts;
    },
    watch: {
        commonSearchOpts: {
            deep: true,
            handler(val) {
                this.fetchGraphs();
                this.tmpExParams = val;
            },
        },
        chartData: {
            deep: true,
            handler() {
                this.init();
            },
        },
    },
    methods: {
        init() {
            if (this.chartData?.data?.length > 0 && this.chartData?.graphs?.length > 0) {
                this.$nextTick(function () {
                    this.setLabelColor();
                });
            }
        },

        setLabelsPosition() {
            this.legendHgt = $(this.$refs.chart.$el).find('.amChartsLegend').outerHeight();
            let { style } = document.querySelector(`#${this.id} .share_label_wrap`);
            style.paddingTop = `${this.legendHgt + 10 + 34}px`;
        },

        setLabelColor() {
            let labels = document.querySelectorAll(`#${this.id} .share_label`);

            if (labels.length) {
                this.chartData.data.forEach((item, idx) => {
                    if (!item.fill) {
                        //커스텀 색상이 없을때
                        this.setColorProperty(labels[idx], '#ddd');
                    } else {
                        //커스텀 색상이 있을때
                        this.setColorProperty(labels[idx], item.fill);
                    }
                });
            }
        },

        setColorProperty(item, hexColor) {
            let color = hexColor;
            item.style.setProperty('--color', color);
            item.style.setProperty('color', '#fff');
        },

        // 팝업 데이터 전달(검색어 시퀀스 존재시 함께 전달)
        evt_click($e) {
            let idx = $e.item.index;
            $e.seq = this.commonSearchOpts.analsList[idx].seq ? this.commonSearchOpts.analsList[idx].seq : '';
            if (this.commonSearchOpts.advs) {
                $e.advs = {};
                $e.advs['keyword_' + $e.seq] = this.commonSearchOpts.advs['keyword_' + $e.seq];
            }
            this.$emit('click', $e);
        },

        getGraphsCode(graphs) {
            let codeArr = graphs.map((graph) => graph.code);
            return codeArr.toString();
        },

        // 데이터 패치
        async fetchGraphs() {
            const _this = this;
            this.loading = true;
            this.apiParams = { ...this.commonSearchOpts };
            this.chartData.graphs = this.apiParams.graphs;
            this.chartData.data = [];
            let res = [];

            switch (this.apiParams.graphs[0]?.type) {
                case 'sg_seq':
                    this.apiParams.grp_sub = { type: 'sg' };
                    break;
                case 'senti':
                    this.apiParams.grp_sub = { type: 'senti' };
                    break;
                default:
                    this.apiParams.grp_sub = { type: 'code' };
                    break;
            }

            // this.apiParams.grp = { type: 'date' };
            this.apiParams.grp_sub.code = this.getGraphsCode(this.apiParams.graphs);

            // 분석대상 갯수만큼 fetch
            const promises = this.apiParams.analsList.map(async (anal, idx) => {
                _this.apiParams.advs = {};
                _this.apiParams.advs[`keyword_${anal.seq}`] = { ...anal };
                _this.apiParams.s_date = anal.s_date ? anal.s_date : _this.apiParams.s_date;
                _this.apiParams.e_date = anal.e_date ? anal.e_date : _this.apiParams.e_date;

                // 비교기간 날짜 필요없음(제거)
                _this.apiParams.ps_date = anal.ps_date ? anal.ps_date : _this.apiParams.ps_date;
                _this.apiParams.pe_date = anal.pe_date ? anal.pe_date : _this.apiParams.pe_date;
                // delete _this.apiParams.ps_date;
                // delete _this.apiParams.pe_date;

                return await API_volume(_this.apiUID + '_' + idx, _this.apiParams)
                    .then(($res) => {
                        // 임시데이터 Start-------------------------------------------
                        // {
                        //     "category": "서울우유",
                        //     "categoryCode": "2_7",
                        //     "fill": "#28AA53",
                        //     "value_c_93": 212,
                        //     "value_c_113": 506,
                        //     "value_c_94": 1096,
                        //     "value_c_95": 370,
                        //     "value_c_97": 813,
                        //     "value_c_99": 468
                        // }
                        // $res.data = [];
                        // this.chartData.graphs.forEach((item) => {
                        //     $res.data.push({
                        //         c_data: { cnt: Math.floor(Math.random() * 1000) + 100 },
                        //         code: item.code,
                        //         name: item.name,
                        //         p_data: { cnt: 0 },
                        //     });
                        // });
                        // 임시데이터 End-------------------------------------------
                        if ($res.data.length) {
                            let graphData = { category: anal.name, categoryCode: anal.code, fill: anal.color };
                            graphData = Object.assign(graphData, $res.data[0].c_data);
                            return graphData;
                        } else {
                            return null;
                        }
                    })
                    .catch((error) => console.error(error));
            });

            await Promise.allSettled(promises)
                .then(($res) => {
                    $res.forEach((item) => {
                        if (item.value) {
                            res.push(item.value);
                        }
                    });
                })
                .finally(() => {
                    _this.chartData.data = res;
                    _this.loading = false;
                    _this.exist = _this.chartData.data.length ? true : false;
                });
        },

        // 엑셀 다운
        evt_excel() {
            let excelParams = JSON.parse(JSON.stringify(this.apiParams));
            excelParams.excel = true;
            excelParams.excel_id = 'ts_sec_02';
            excelParams.advs = this.tmpExParams.advs;
            if (excelParams.advs && excelParams.advs.keyword_1) excelParams.date_disabled = excelParams.advs.keyword_1.date_disabled;

            this.excelLoading = true;
            this.$store.dispatch('NOTY_INFO', '엑셀 다운로드를 시작합니다.');

            API_volume(this.apiUID, excelParams)
                .then((res) => {
                    this.$store.EventBus.$emit('EXCEL_DOWN', res);
                    this.$store.dispatch('NOTY_COM', '엑셀 다운로드가 완료되었습니다.');
                })
                .catch((err) => {
                    this.$store.dispatch('NOTY_ERR', '엑셀 다운로드에 실패하였습니다.');
                    console.log('*********************************************************');
                    console.log(err);
                })
                .finally((res) => {
                    this.excelLoading = false;
                });
        },
    },
};
</script>

<style></style>
