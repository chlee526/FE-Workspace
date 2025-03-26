<template>
    <div class="ui_box is-3dp">
        <div class="header">
            <div class="wrap">
                <h3>
                    <span>정보량 추이</span>
                </h3>
                <div class="rc_wrap">
                    <button title="Excel 다운로드" class="ui_btn is-icon-only is-small" @click="evt_excel"><span class="icon">&#xe005;</span></button>
                </div>
            </div>
        </div>
        <div class="content ui-loader-container" :class="{ 'is-loading': loading }">
            <comp-chart-column-line :id="popName + '_volume_chart'" date-type="day" hide-date-type type="line" :chart-data="getChartData" :total-label="false" @click="evt_chart_click" style="width: 100%; height: 150px"></comp-chart-column-line>
        </div>
    </div>
</template>
<script>
import { uuid } from 'vue-uuid';
import { API_volume } from '@shared/api/volume.js';
import { getDatePOP } from '@shared/utils/prototype/util.date';
import EventBus from '@shared/utils/eventBus';

export default {
    name: 'tmpl-modal-relinfo-volume',
    data() {
        return {
            apiUID: uuid.v4(), // API 사용하는 경우, API키생성 필수
            apiParams: null,
            loading: false,
            isFirst: true,
            chartData: {
                graphs: [{ name: '', graphCode: '01', value_field: 'value', fill: '#666666' }],
                data: [
                    // {
                    //     category: '2019-01-01',
                    //     cnt: 50,
                    // },
                ],
            },
        };
    },
    props: {
        popName: { type: String, default: '' },
        searchParams: { type: Object },
    },
    computed: {
        // 차트 데이터 파싱
        getChartData() {
            const result = JSON.parse(JSON.stringify(this.chartData));
            result.data = result.data.map(($item) => {
                $item.category = $item.name;
                $item.value = $item.p_data ? $item.p_data.cnt : $item.c_data.cnt;
                $item.compare = $item.p_data ? true : false;
                return $item;
            });
            return result;
        },
    },
    mounted() {
        this.fetchData();
    },
    watch: {
        searchParams: {
            deep: true,
            handler($val, $oldVal) {
                if (!this.isFirst && JSON.stringify($val) !== JSON.stringify($oldVal)) {
                    this.fetchData();
                }
            },
        },
    },
    methods: {
        async fetchData() {
            this.loading = true;

            this.apiParams = JSON.parse(JSON.stringify(this.searchParams));

            // 추가 검색조건에서 선택한 날짜 범위가 있을 경우 s_date/e_date 업데이트
            if (this.apiParams.additionalCondition.selectDate) {
                const sDate = Array.isArray(this.apiParams.additionalCondition.selectDate) ? this.apiParams.additionalCondition.selectDate[0] : this.apiParams.additionalCondition.selectDate;
                const eDate = Array.isArray(this.apiParams.additionalCondition.selectDate) ? this.apiParams.additionalCondition.selectDate[1] : this.apiParams.additionalCondition.selectDate;
                this.apiParams.s_date.date = sDate;
                this.apiParams.e_date.date = eDate;
                Object.assign(this.apiParams, getDatePOP(JSON.parse(JSON.stringify(this.apiParams))));
            }

            this.apiParams.grp = {
                type: 'date',
            };
            if (this.apiParams.grp_sub) delete this.apiParams.grp_sub;

            await API_volume(this.apiUID, this.apiParams)
                .then(($res) => {
                    // /**
                    //  * 임시 데이터 설정
                    //  */
                    // $res.data = [];
                    // let sdate = _this.apiParams.s_date.date.strToDate();
                    // let edate = _this.apiParams.e_date.date.strToDate();

                    // sdate.setDate(sdate.getDate());
                    // edate.setDate(edate.getDate());

                    // // 현재기간 데이터 삽입
                    // do {
                    //     let item = {
                    //         code: sdate.dateToStr(),
                    //         name: sdate.dateToStr(),
                    //         c_data: {
                    //             cnt: parseInt(Math.random() * 3),
                    //         },
                    //     };
                    //     $res.data.push(item);
                    //     sdate.setDate(sdate.getDate() + 1);
                    // } while (sdate.getTime() <= edate.getTime());
                    // // 여기까지 임시 데이터

                    /**
                     * 데이터 삽입
                     */
                    this.chartData.data = $res.data;
                })
                .catch(($err) => {
                    console.log('*********************************************************');
                    console.log($err);
                });

            this.isFirst = false;
            this.loading = false;
        },

        /**
         * 차트 클릭 이벤트 - subTitleSelect 에밋 전달
         * @param {*} $e  차트 데이터
         */
        evt_chart_click($e) {
            const date = !$e.item.dataContext.categoryEndDate ? $e.item.dataContext.category : [$e.item.dataContext.category, $e.item.dataContext.categoryEndDate];
            this.$emit('subTitleSelect', { type: 'date', val: date });
        },

        // 엑셀 다운
        evt_excel() {
            const excelParams = JSON.parse(JSON.stringify(this.apiParams));
            excelParams.excel = true;
            excelParams.excel_id = 'relinfo_01';

            if (excelParams.advs) {
                const key = Object.keys(excelParams.advs)[0];
                excelParams.anal = excelParams.advs[key].name;
            } else if (excelParams.rk_seq) {
                excelParams.anal = excelParams.rk_seq[0].name;
            }

            API_volume(this.apiUID, excelParams)
                .then((res) => {
                    EventBus.$emit('EXCEL_DOWN', res);
                })
                .catch((err) => {
                    console.log('*********************************************************');
                    console.log(err);
                });
        },
    },
};
</script>
