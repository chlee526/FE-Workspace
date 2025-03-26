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
                                            <h3><span>GAGE Chart</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/chart/gage" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span><strong>그래프</strong> : 그래프 내 아이템 이름/컬러 설정</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>길이 설정</strong> : 차트 길이(px) 수정</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>높이 설정</strong> : 차트 높이(px) 수정</span>
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
                                                            <comp-list>
                                                                <template v-slot:list>
                                                                    <comp-filter-grp v-for="(item, idx) in chartDatas.data" :key="item.code" pos="R" class="is-small">
                                                                        <template v-slot:title>
                                                                            {{ item.name }}
                                                                            <button class="btn_del" title="그래프 삭제" @click.stop="evt_graph_del(item)">삭제</button>
                                                                        </template>
                                                                        <template v-slot:items
                                                                            ><dl>
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
                                                                                    <comp-colorpicker :color="item.color" v-model="item.color" :useConfirm="true" />
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
                                            <!-- <div class="grp">
                                                <strong>그래프 타입</strong>
                                                <comp-selectbox id="set_graph_type" v-model="set.graphs.type" :opts="set.graphs.opts"></comp-selectbox>
                                            </div> -->

                                            <span>길이(px)</span><comp-input-box id="set_wid" type="number" v-model="set.width" placeholder="길이" label="길이 입력" style="width: 70px"></comp-input-box>
                                            <hr />
                                            <span>높이(px)</span><comp-input-box id="set_wid" type="number" v-model="set.height" placeholder="높이" label="높이 입력" style="width: 70px"></comp-input-box>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_row is-not-top-brd">
                                                <div class="wrap is-cols-pad">
                                                    <div class="ui_col w12">
                                                        <div class="ui_box is-2dp">
                                                            <div class="header">
                                                                <div class="wrap">
                                                                    <h4>
                                                                        <span>게이지 - {{ graphType }}</span>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <div class="content">
                                                                <div class="wrap ui_ac">
                                                                    <comp-chart-gage id="gage_01" :chart-data="chartDatas.data" :style="{ display: 'inline-block', width: set.width + 'px', height: set.height + 'px', verticalAlign: 'top' }" @click="evt_chartClick"></comp-chart-gage>
                                                                    <!-- <comp-chart-gage v-if="set.graphs.type == '1'" id="gage_01" :chart-data="gageDataSenti.data" :style="{ display: 'inline-block', width: set.width + 'px', height: set.height + 'px' }"></comp-chart-gage>
                                                                    <comp-chart-gage v-else-if="set.graphs.type == '3'" id="gage_01" :chart-data="gageCustom.data" :style="{ display: 'inline-block', width: set.width + 'px', height: set.height + 'px' }"></comp-chart-gage>
                                                                    <comp-chart-gage v-else id="gage_02" :chart-data="gageDataChn.data" :style="{ display: 'inline-block', width: set.width + 'px', height: set.height + 'px' }" @click="evt_chartClick"></comp-chart-gage> -->
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
    name: 'page-chart-gage',
    data() {
        return {
            chart_fixActiveColor: true,
            set: {
                width: 500,
                height: 16,
                graphs: {
                    type: '3',
                    opts: [
                        // { code: '1', name: '감성' },
                        // { code: '2', name: '채널' },
                        { code: '3', name: '사용자 설정' },
                    ],
                },
            },
            chartDatas: {
                data: [
                    { code: 'code_1', name: '아이템_1', color: '#78B4DC', value: 123 },
                    { code: 'code_2', name: '아이템_2', color: '#E25B5B', value: 234 },
                    { code: 'code_3', name: '아이템_3', color: '#A5A5A5', value: 234 },
                ],
            },
            // gageCustom: {
            //     data: [
            //         { code: 'code_1', name: '아이템_1', color: '#78B4DC', value: 123 },
            //         { code: 'code_2', name: '아이템_2', color: '#E25B5B', value: 234 },
            //         { code: 'code_3', name: '아이템_3', color: '#A5A5A5', value: 234 },
            //     ],
            // },

            // gageDataSenti: {
            //     data: [
            //         { code: 's_1', name: '긍정', color: '#78B4DC', value: 123 },
            //         { code: 's_2', name: '부정', color: '#E25B5B', value: 234 },
            //         { code: 's_3', name: '중립', color: '#A5A5A5', value: 234 },
            //     ],
            // },
            // gageDataChn: {
            //     data: [
            //         { code: 'c_93', name: '언론', color: '#97CBFF', value: 123 },
            //         { code: 'c_113', name: '포탈', color: '#BD70F9', value: 234 },
            //         { code: 'c_94', name: '블로그', color: '#9AE674', value: 454 },
            //         { code: 'c_95', name: '카페', color: '#FFAE0C', value: 421 },
            //         { code: 'c_97', name: '커뮤니티', color: '#EE7CDF', value: 354 },
            //         { code: 'c_99', name: '트위터', color: '#6BD3E8', value: 145 },
            //         { code: 'c_100', name: '페이스북', color: '#6490F2', value: 365 },
            //         { code: 'c_102', name: '유튜브', color: '#F26464', value: 589 },
            //         { code: 'c_110', name: '정부기관', color: '#EECC3B', value: 547 },
            //         { code: 'c_111', name: '공공/단체', color: ' #3CD6A2', value: 684 },
            //         { code: 'c_112', name: '기타', color: '#E56F21', value: 60 },
            //     ],
            // },
        };
    },
    components: {
        'comp-list': List,
    },
    computed: {
        graphType() {
            return this.set.graphs.opts.filter((val) => {
                return val.code == this.set.graphs.type;
            })[0].name;
        },
    },
    methods: {
        evt_graph_del(delItem) {
            this.chartDatas.data = this.chartDatas.data.removeItem({ code: delItem.code });
        },
        evt_chartClick(e) {
            console.log(e);
        },
        evt_graph_add(e) {
            const lastIdx = this.chartDatas.data.length + 1;
            this.chartDatas.data.push({
                name: '아이템_' + lastIdx,
                code: '아이템_' + lastIdx.numAddZero(),
                value: parseInt(Math.random() * 1000),
                color: '#A5A5A5',
            });
        },
    },

    watch: {
        // 'set.graphs.type': function (val) {
        //     switch (val) {
        //         case '1':
        //             this.chartDatas = this.gageDataSenti;
        //             break;
        //         case '2':
        //             this.chartDatas = this.gageDataChn;
        //             break;
        //         case '3':
        //             this.chartDatas = this.gageCustom;
        //             break;
        //     }
        // },
    },
};
</script>

<style></style>
