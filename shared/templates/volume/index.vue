<template>
    <div class="ui_box">
        <slot name="header"></slot>
        <div v-if="!hasHeaderSlot && !headerDisabled" class="header">
            <div class="wrap">
                <h3>
                    <span>전체 {{ label }}</span>
                </h3>
            </div>
        </div>
        <div class="content ui-loader-container" :class="{ 'is-loading': loading }">
            <!-- 템플릿 1번 -->
            <div v-if="template == 1" class="tmpl_volume is-tmpl-1">
                <div class="wrap">
                    <span v-if="getAnal" class="ui_bedge is-customColor" :style="'--color:' + getAnal.color">{{ getAnal.name }}</span>
                    <span class="title">{{ label }}</span>
                    <span v-if="!getChartData.c_data.cnt" class="dv" :title="label + ': ' + String(getChartData.c_data.cnt).addComma()" style="pointer-events: none"><strong class="txt">0</strong>건</span>
                    <a v-else href="#" class="dv" :title="label + ': ' + String(getChartData.c_data.cnt).addComma()" @click.prevent="evt_chartClick(null)"
                        ><strong class="txt">{{ String(getChartData.c_data.cnt).addComma() }}</strong
                        ><span style="font-size: 30px"> 건</span></a
                    >
                    <span v-if="getChartData.c_data.factor_per !== undefined" class="fluc">
                        <span class="ui_fluc is-box is-dims" :title="'증감률: ' + Number(getChartData.c_data.factor_per).numToFluc('%')" v-html="Number(getChartData.c_data.factor_per).numToFlucHtml('%', 'limit')"></span>
                    </span>
                    <comp-chart-gage v-if="getChartData.data" :id="id" :class="{ 'is-nodata': getNoData }" :chart-data="getChartData.data" style="width: 200px; height: 20px" @click="evt_chartClick"></comp-chart-gage>
                </div>
            </div>

            <!-- 템플릿 2번 -->
            <div v-if="template == 2" class="tmpl_volume is-tmpl-2">
                <div class="wrap">템플릿 2번</div>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from '@shared/utils/eventBus';
import { API_volume } from '@shared/api/volume';
import { uuid } from 'vue-uuid';
import { mapGetters } from 'vuex';
import '@shared/utils/index';
export default {
    name: 'tmpl-volume',

    data: function () {
        return {
            apiUID: uuid.v4(),
            apiParams: null,
            loading: false,
            chartData: {
                c_data: {
                    cnt: 0,
                    factor_per: 0,
                },
            },
        };
    },
    props: {
        commonSearchOpts: { type: Object }, // 기본 검색 조건
        id: { type: String },
        template: { default: 1 }, // 템플릿 번호
        analsTitle: { type: Object }, // 분석대상
        useAttrs: { type: Array, default: null }, // 속성 사용시(팝업)
        label: { type: String, default: '정보량' }, // 라벨 텍스트
        headerDisabled: { type: Boolean, default: false }, // 헤더 제거
        isNoData: { type: Boolean, default: false }, // 데이터 없음 강제 설정
    },
    computed: {
        ...mapGetters(['getSentis', 'getChns']),
        getAnal() {
            return this.analsTitle && this.analsTitle.name ? this.analsTitle : null;
        },
        hasHeaderSlot() {
            return this.$slots.header ? true : false;
        },
        getChartData() {
            if (!this.chartData || this.isNoData) {
                let result = {
                    c_data: {
                        cnt: 0,
                        factor_per: 0,
                    },
                };

                result = this.getSentisData(result, 0);
                if (result.data) {
                    result.data.forEach((item) => {
                        item.per = 0;
                        item.value = 0;
                    });
                }

                return result;
            }

            let result = {};
            result.c_data = {
                cnt: this.chartData.c_data ? this.chartData.c_data.cnt : 0,
                factor_per: this.chartData.c_data ? this.chartData.c_data.factor_per : 0,
            };

            result = this.getSentisData(result);

            return result;
        },
        getNoData() {
            return !this.getChartData.c_data.cnt;
        },
    },
    mounted() {
        this.chartData.graphs = this.getGraphCodes;
        this.fetchData();
    },
    watch: {
        // 공통 검색 조건 변경
        commonSearchOpts: {
            deep: true,
            handler(val) {
                this.fetchData();
            },
        },
    },
    methods: {
        getSentisData(data) {
            const result = structuredClone(data);
            if (this.chartData.c_data) {
                for (let $key in this.chartData.c_data) {
                    if ($key.indexOf('value_') >= 0) {
                        result.c_data[$key] = this.chartData.c_data[$key];
                        let data = this.getSentis.getParseDatas({ code: $key.split('_')[1] + '_' + $key.split('_')[2] })[0];
                        if (data) {
                            data.value = this.chartData.c_data[$key];
                            if (!result.data) result.data = [];
                            result.data.push(data);
                        }
                    }
                }
            }
            return result;
        },
        async fetchData() {
            this.loading = true;
            this.apiParams = JSON.parse(JSON.stringify(this.commonSearchOpts));
            if (this.commonSearchOpts.senti) this.apiParams.grp_sub = { type: 'senti', code: this.getSentis.arrObjAttrToStr('code') };
            await API_volume(this.apiUID, this.apiParams)
                .then((res) => {
                    // 데이터 파싱
                    /**
                     * 임시데이터 사용중
                     */
                    // res.data = [
                    //     {
                    //         code: '전체',
                    //         name: '전체',
                    //         c_data: {
                    //             cnt: 603,
                    //             factor_per: '0.0',
                    //         },
                    //     },
                    // ];
                    // 여기까지
                    this.chartData = res.data[0];
                })
                .catch((err) => {
                    console.log('*********************************************************');
                    console.log(err);
                });

            this.loading = false;
        },
        evt_chartClick(val) {
            let params = JSON.parse(JSON.stringify(this.commonSearchOpts));

            // (고급)검색 대상이 있는 경우
            if (params.advs && params.analsList && params.analsList.length) {
                if (!params.title) params.title = [];
                params.advs = {};
                params.analsList.forEach(($item) => {
                    params.advs['keyword_' + $item.seq] = $item;
                    params.title.push($item);
                });
                params.s_date = params.analsList[0].s_date;
                params.e_date = params.analsList[0].e_date;
                params.ps_date = params.analsList[0].ps_date;
                params.pe_date = params.analsList[0].pe_date;
            }

            // 감성 있는 경우
            if (val) {
                if (!params.subTitle) params.subTitle = [];
                params.subTitle.push({ code: val.code, name: val.name, type: 'senti' });
            }

            // 카테고리 필터
            if (!params.cateFilters) params.cateFilters = [];

            // 채널
            let useChns = JSON.parse(JSON.stringify(this.getChns));

            useChns.forEach(($item) => {
                if (!params.sg_seq.strToArr().includes($item.code)) $item.disabled = true;
            });

            params.cateFilters.push({
                name: '채널',
                type: 'sg_seq',
                opts: useChns,
                value: params.sg_seq,
                multiple: true,
            });
            if (!this.$listeners.click) {
                if (!this.useAttrs) EventBus.$emit('MODAL_OPEN', 'relinfo', params);
                else EventBus.$emit('MODAL_OPEN', 'relinfo', params, { useAttrs: this.useAttrs });
            } else {
                this.$emit('click', val);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.ui_box {
    display: flex;
    flex-direction: column;

    > .header {
        flex: 0 0;
    }

    > .content {
        flex: 1 1;
        display: flex;
        align-items: center;
    }
}
</style>
