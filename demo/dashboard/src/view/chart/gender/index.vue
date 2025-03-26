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
                                            <h3><span>성별 차트</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/chart/gender" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span><strong>수량 미포함(툴팁)</strong> : 수량 없이, 퍼센트로만 데이터를 받는 경우 사용 </span>
                                                    </li>
                                                    <li>
                                                        <span><strong>비율별 크기 변경</strong> : 성별 데이터 비율 크기형태로 수정</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>사용자 색상</strong> : 사용자 색상 설정 유무</span>
                                                        <ul>
                                                            <li><span>남성 색깔</span></li>
                                                            <li><span>여성 색깔</span></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <comp-switch-btn id="chart_percent" class="is-small" v-model="onlyPercent" label="수량 미포함(툴팁)"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="chart_rate" class="is-small" v-model="set.rate" label="비율별 크기 변경"></comp-switch-btn>
                                            <hr />
                                            <comp-switch-btn id="chart_color" class="is-small" v-model="colorUse" label="사용자 색상"></comp-switch-btn>
                                            <span>남성 색깔</span><comp-colorpicker v-model="maleColor" :disabled="!colorUse" /> <span>여성 색깔</span> <comp-colorpicker v-model="femaleColor" :disabled="!colorUse" />
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
                                                                    <comp-chart-gender id="chart_gender_01" :chart-data="chartData" :onlyPercentage="onlyPercent"></comp-chart-gender>
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
export default {
    name: 'page-chart-gender',
    data() {
        return {
            onlyPercent: false,
            colorUse: false,
            maleColor: '#FF7E87',
            femaleColor: '#0091FF',
            set: {
                rate: false,
            },
            chartData: {
                data: [
                    {
                        name: '남성',
                        code: '001',
                        datas: [
                            {
                                value: Math.floor(Math.random() * 1234),
                            },
                        ],
                        fill: '',
                    },
                    {
                        name: '여성',
                        code: '002',
                        datas: [
                            {
                                value: Math.floor(Math.random() * 1234),
                            },
                        ],
                        fill: '',
                    },
                ],
            },
            chartData2: {
                data: [
                    {
                        name: '여성',
                        code: '002',
                        datas: [
                            { name: '미혼', code: '002_1', value: Math.floor(Math.random() * 5678) },
                            { name: '기혼', code: '002_1', value: Math.floor(Math.random() * 5678) },
                        ],
                        fill: '#FF7E87',
                    },
                    {
                        name: '남성',
                        code: '001',
                        datas: [
                            { name: '미혼', code: '001_1', value: Math.floor(Math.random() * 5678) },
                            { name: '기혼', code: '001_2', value: Math.floor(Math.random() * 5678) },
                        ],
                        fill: '#0091FF',
                    },
                ],
            },
        };
    },
    watch: {
        colorUse(val) {
            if (val) {
                this.chartData.data[0].fill = this.maleColor;
                this.chartData.data[1].fill = this.femaleColor;
            } else {
                this.chartData.data[0].fill = '';
                this.chartData.data[1].fill = '';
            }
        },
        maleColor(val) {
            this.chartData.data[0].fill = val;
        },
        femaleColor(val) {
            this.chartData.data[1].fill = val;
        },
        set: {
            handler(val) {
                let resultData = JSON.parse(JSON.stringify(this.chartData));
                if (val.rate) {
                    resultData.data.forEach((val) => {
                        val.datas = [
                            { name: '아이템1', code: `${val.code}_1`, value: Math.floor(Math.random() * 5678) },
                            { name: '아이템2', code: `${val.code}_2`, value: Math.floor(Math.random() * 5678) },
                        ];
                    });
                } else {
                    resultData.data.forEach((val) => {
                        val.datas = [{ value: Math.floor(Math.random() * 1234) }];
                    });
                }
                this.chartData = resultData;
            },
            deep: true,
        },
    },

    methods: {
        evt_chart_click(e) {
            console.log(e);
        },
    },
};
</script>

<style></style>
