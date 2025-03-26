<template>
    <div class="tmpl_rk ui-loader-container" :class="{ 'is-loading': loading, 'is-not-header': !hasHeaderSlot || nodeNot1Dp }" v-init>
        <slot name="header"></slot>
        <div class="ui_function" :class="{ 'is-box': !hasHeaderSlot || nodeNot1Dp }" v-if="hideFunctions === false">
            <div class="lc">
                <template v-if="useSort">
                    <comp-radio-grp :id="id + '_sort'" class="is-small" :opts="$store.getters.getRkSorts" :name="id + '_sort'" v-model="order_type" :box="true"></comp-radio-grp>
                </template>
                <hr v-if="useSort && exceptWord" />
                <comp-button v-if="exceptWord" class="is-small" @click="exceptClick">
                    <span>{{ exceptWord.name || '키워드' }} 제외</span>
                </comp-button>
            </div>
            <div class="rc">
                <comp-datepicker v-if="range" :id="id + '_dp'" class="is-small" :c_type_opts="null" :s_date.sync="dates.s_date" :e_date.sync="dates.e_date" :range="range" :min_date.sync="dates.min_date" :max_date="dates.max_date" data-fixed="true"></comp-datepicker>
                <hr v-if="range" />
                <tmpl-rkeyword-attrs v-if="useAttrs" :id="id + '_attrs'" class="is-small" :attrs="useAttrs" :deatil-attrs="useDeatilAttrs" is-small v-model="rkAttrs"></tmpl-rkeyword-attrs>
                <hr v-if="useAttrs" />
                <button v-if="range || useAttrs" type="button" class="ui_btn is-icon-only is-color-black is-small" @click="evt_search" :disabled="loading || loading_2nd || (useAttrs && !rkAttrs.length) ? true : false"><span class="icon">&#xe007;</span></button>
            </div>
        </div>
        <div class="content">
            <div class="ui_row">
                <div ref="colWrap" class="wrap is-cols-pad">
                    <!-- 단일 연관어 -->
                    <template v-if="!commonSearchOpts?.analsList || (commonSearchOpts?.analsList && !commonSearchOpts?.analsList.length) || analsCode.strToArr().length == 1">
                        <div class="ui_col" :class="{ 'is-loading': loading, w14: use2ndRk }">
                            <span v-if="!hideAnalsList" class="ui_bedge is-customColor is-wide" :style="'--color:' + useRkDatas.color">{{ useRkDatas.name }}</span>
                            <!-- Function 영역이 없으면 -->
                            <template v-if="hideFunctions === true">
                                <comp-chart-wordcloud v-if="use2ndRk || typeof value !== 'undefined'" :id="id + '_cloud'" :chart-data="useRkDatas" v-model="selectedRk" :opts="cloudOpts ? cloudOpts : { maxFont: 80 }" :view-type="useViewType" toggle-type="one" :sort="order_type" :legend="useLegend" :legendShow="legendShow" :style="getChartHgt" @click="evt_keywordClick" :rotation="false" :except-word="exceptWord" @exceptClick="exceptClick" :label-name="exceptWord && exceptWord.name ? exceptWord.name : '연관어'" :use-rank="useRank"></comp-chart-wordcloud>
                                <comp-chart-wordcloud v-else :id="id + '_cloud'" :chart-data="useRkDatas" :opts="cloudOpts ? cloudOpts : { maxFont: 80 }" :view-type="useViewType" :sort="order_type" :legend="useLegend" :legendShow="legendShow" :style="getChartHgt" @click="evt_keywordClick" :rotation="false" :except-word="exceptWord" @exceptClick="exceptClick" :label-name="exceptWord && exceptWord.name ? exceptWord.name : '연관어'" :use-rank="useRank"></comp-chart-wordcloud>
                            </template>
                            <!-- Function 영역이 있으면 -->
                            <template v-else>
                                <comp-chart-wordcloud v-if="use2ndRk || typeof value !== 'undefined'" :id="id + '_cloud'" :chart-data="useRkDatas" v-model="selectedRk" :opts="cloudOpts ? cloudOpts : { maxFont: 80 }" :view-type="useViewType" toggle-type="one" :sort="order_type" :legend="useLegend" :legendShow="legendShow" :style="getChartHgt" @click="evt_keywordClick" :rotation="false" :label-name="exceptWord && exceptWord.name ? exceptWord.name : '연관어'" :use-rank="useRank"></comp-chart-wordcloud>
                                <comp-chart-wordcloud v-else :id="id + '_cloud'" :chart-data="useRkDatas" :opts="cloudOpts ? cloudOpts : { maxFont: 80 }" :view-type="useViewType" :sort="order_type" :legend="useLegend" :legendShow="legendShow" :style="getChartHgt" @click="evt_keywordClick" :rotation="false" :label-name="exceptWord && exceptWord.name ? exceptWord.name : '연관어'" :use-rank="useRank"></comp-chart-wordcloud>
                            </template>
                        </div>
                        <div v-if="use2ndRk" class="ui_col w10">
                            <div class="ui_box is-3dp" :class="{ 'is-loading': loading_2nd }">
                                <div class="header">
                                    <div class="wrap">
                                        <h4>
                                            <span>2차 연관키워드</span>
                                            <div v-if="selectedRk && selectedRk.length" class="sub_title">
                                                <span v-for="($item, $idx) in selectedRk" :key="$item + $idx" @key="'subtitle_' + $idx" :title="$item.name" class="keyword" :class="{ 'is-customColor': $item.color }" v-html="$item.name" :style="$item.color ? '--color:' + $item.color : ''"></span>
                                            </div>
                                        </h4>
                                    </div>
                                </div>
                                <div v-if="useSort2nd" class="ui_function is-box">
                                    <div class="lc">
                                        <comp-radio-grp :id="id + '_2nd_sort'" class="is-small" :opts="$store.getters.getRkSorts" :name="id + '_2nd_sort'" v-model="order_type_2nd" :box="true"></comp-radio-grp>
                                    </div>
                                </div>
                                <div class="content">
                                    <comp-chart-wordcloud :id="id + '_2nd_brd'" :chart-data="useRkDatas_2nd" :use-view-type="false" view-type="2" :use-attr-fixed="useAttrs ? true : false" :use-fluc-fixed="useSort2nd ? true : false" :style="get2ndRkHgt" @click="evt_2nd_keywordClick" :use-rank="useRank"></comp-chart-wordcloud>
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- 멀티 연관어 -->
                    <template v-else>
                        <template v-for="($item, $idx) in rkDatas">
                            <hr v-if="$idx > 0" :key="$idx" />
                            <div class="ui_col" :style="colsFlexStyle" :key="$idx">
                                <span v-if="!hideAnalsList" class="ui_bedge is-customColor is-wide" :style="'position: absolute; --color:' + $item.color">{{ $item.name }}</span>
                                <comp-chart-wordcloud :id="id + '_cloud_' + $idx" :chart-data="$item" :opts="cloudOpts ? cloudOpts : { maxFont: 50 }" :view-type="useViewType" :sort="order_type" :legend="useLegend" :legendShow="legendShow" @click="evt_keywordClick" :rotation="false" :use-rank="useRank"></comp-chart-wordcloud>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { uuid } from 'vue-uuid';
import { getDatePOP } from '@shared/utils/prototype/util.date';
import { API_rkeyword, API_rkeywordWithAttr } from '@shared/api/rkeyword';
import EventBus from '@shared/utils/eventBus';

import TmplRkeywordAttrs from './RkeywordAttrs.vue';

export default {
    name: 'tmpl-rkeyword',
    components: {
        'tmpl-rkeyword-attrs': TmplRkeywordAttrs,
    },
    data() {
        return {
            apiUID: uuid.v4(), // API 사용하는 경우, API키생성 필수
            apiParams: null,
            commonChanging: false, // 상단검색조건 중첩 실행 방지
            loading: false,
            loading_2nd: false,
            nodeNot1Dp: false, // 1뎁스 컨텐츠가 아닌지 체크
            searchOpts: null,
            analsCode: '', // 선택 분석대상
            order_type: this.useSortValue ? this.useSortValue : 'T', // Top/Hot 정렬
            order_type_2nd: 'T', // 2차 키워드 Top/Hot 정렬
            dates: {
                // 날짜
                // ps_date: {
                //     date: new Date().dateToStr(),
                // },
                // pe_date: {
                //     date: new Date().dateToStr(),
                // },
                s_date: {
                    date: new Date().dateToStr(),
                },
                e_date: {
                    date: new Date().dateToStr(),
                },
                min_date: '',
                max_date: '',
            },
            rkAttrs: '', // 속성
            row_limit: this.keywordLen, // 키워드 갯수
            useViewType: this.viewType, // View Type(1: 워드클라우드, 2: 게시판)
            viewTypeOpts: [
                { code: '1', type: 'Cloud', name: '&#xe033;' },
                { code: '2', type: '게시판', name: '&#xe025;' },
            ],
            selectedRk: null,
            rkData: {
                data: [],
            },
            rkData_2nd: {
                data: [],
            },
            rkDatas: [{ data: [] }],
            colsFlexStyle: '',
            useRkDatas: {
                data: [],
            },
            useRkDatas_2nd: {
                data: [],
            },
        };
    },
    props: {
        id: { type: String },
        commonSearchOpts: { type: Object }, // 기본 검색 조건
        keywordLen: { type: Number, default: 50 }, // 최대 키워드 갯수
        cloudOpts: { type: Object, default: null }, // 워드 클라우드 옵션
        orTypeCode: { type: Array }, // 분석 대상
        range: { type: String, default: null }, // 기간설정(설정되면 달력 표기)
        useAttrs: {}, // 속성 사용 여부
        useDeatilAttrs: { type: Boolean, default: false }, // 속성상세설정 사용 여부
        useSort: { type: Boolean, default: true }, // Top/Hot 사용여부
        useSortValue: { type: String, default: null }, // Top/Hot 시작 설정 값
        viewType: { type: String, default: '1' }, // 초기 View설정(1: 클라우드, 2:게시판)
        use2ndRk: { type: Boolean, default: true }, // 2차 연관키워드 사용 여부
        useSort2nd: { type: Boolean, defalut: false }, // 2차 연관어 Top/Hot 사용여부
        useLegend: {}, // 범례기능 사용 시, 점유율/순위/사용자설정
        legendShow: { type: Boolean, default: false }, // 범례 show/hide
        useAttrsPopup: { type: Boolean, default: false }, // 팝업(관련정보) 속성 사용 여부
        useRank: { type: Boolean, default: false }, // 워드클라우드 버블 순위 사용 여부 - 형식: (1/30)
        popupCateFilters: { type: Array, default: null }, // 관련정보 팝업에서 카테필터 사용시 설정
        hideAnalsList: { type: Boolean, default: false }, // 분석대상 숨김 처리
        hideFunctions: { type: Boolean, default: false }, //ui_function 사용 여부
        exceptWord: { type: Object, default: null },
        value: {}, //선택 키워드
        isNoData: { type: Boolean, default: false }, // 데이터 없음 강제 설정
    },
    computed: {
        checked: {
            //선택 키워드
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        getAnals() {
            if (!this.commonSearchOpts.analsList) return [];
            return this.commonSearchOpts.analsList.filter(($item) => {
                if ($item) return $item;
            });
        },
        getUseAnals() {
            if (!this.commonSearchOpts || !this.commonSearchOpts.analsList) return [];
            return this.commonSearchOpts.analsList.filter(($item) => {
                if ($item && this.analsCode.strToArr().includes($item.code)) return $item;
            });
        },
        hasHeaderSlot() {
            return this.$slots.header ? true : false;
        },
        getChartHgt() {
            let result = 507;
            if (this.cloudOpts && this.cloudOpts.height) result = this.cloudOpts.height;

            if (!this.use2ndRk) result = 440;
            else if (!this.useSort2nd) result = 462;
            // else if (!this.use2ndRk || !this.useSort2nd) result -= 67;

            return 'height:' + result + 'px';
        },
        get2ndRkHgt() {
            return 'height: 404px';
        },
        getSearchOpts() {
            if (!this.commonSearchOpts) return {};

            const result = JSON.parse(JSON.stringify(this.commonSearchOpts));

            // 정렬조건(top/hot)
            result.order_type = this.order_type;

            // 날짜
            if (this.range) {
                result.s_date = this.dates.s_date;
                result.e_date = this.dates.e_date;
            }
            result.ps_date = this.dates.ps_date;
            result.pe_date = this.dates.pe_date;

            // // 속성
            if (this.useAttrs) {
                result.attr_type_code = this.rkAttrs;
            }

            // 갯수
            result.row_limit = this.row_limit;

            return result;
        },
        getAllItemCodes() {
            if (!this.useAttrs) return [];

            let result = [];
            this.useAttrs.forEach(($item) => {
                getItemCode($item);
            });
            function getItemCode($data) {
                $data.forEach(($item) => {
                    if ($item.children) {
                        getItemCode($item.children);
                    } else {
                        result.push($item.code.toString());
                    }
                });
            }
            return result;
        },
        getRkDatas() {
            const result = JSON.parse(JSON.stringify(this.rkData));

            if (this.isNoData) return { ...result, data: [] };

            // 분석 대상 있을 때
            if (this.analsCode && this.analsCode.strToArr().length >= 1) {
                result.code = this.analsCode;
                const item = this.commonSearchOpts.analsList.getParseDatas({ code: result.code });
                if (item.length) {
                    result.name = item[0].name;
                    result.color = item[0].color;
                    result.attr_type_code = item[0].attr_type_code || '';
                    if (item[0].seq) result.seq = item[0].seq;
                }
            }

            // 속성 사용시 컬러 설정
            if (this.useAttrs) {
                result.data.forEach(($item) => {
                    const get1dpData = this.useAttrs.flat().getRootData($item.attr_type_code);
                    $item.color = get1dpData.length ? get1dpData[0].color : '#666666';
                    $item.attrName = get1dpData.length ? get1dpData[0].name : '-';
                });
            }

            return result;
        },
        getRkDatas_2nd() {
            const result = JSON.parse(JSON.stringify(this.rkData_2nd));

            if (this.isNoData) return { ...result, data: [] };

            // 분석 대상 있을 때
            if (this.analsCode && this.analsCode.strToArr().length >= 1) {
                result.code = this.analsCode;
                const item = this.commonSearchOpts.analsList.getParseDatas({ code: result.code });
                if (item.length) {
                    result.name = item[0].name;
                    result.color = item[0].color;
                    if (item[0].seq) result.seq = item[0].seq;
                }
            }

            // 속성 사용시 컬러 설정
            if (this.useAttrs) {
                result.data.forEach(($item) => {
                    var get1dpData = this.useAttrs.flat().getRootData($item.attr_type_code);
                    $item.color = get1dpData.length ? get1dpData[0].color : '#666666';
                    $item.attrName = get1dpData.length ? get1dpData[0].name : '-';
                });
            }

            return result;
        },
    },
    beforeMount() {
        this.rkAttrs = this.getAllItemCodes.toString();
    },
    mounted() {
        if (!this.commonSearchOpts) return;

        if (this.commonSearchOpts.s_date) {
            const tmp = {
                s_date: JSON.parse(JSON.stringify(this.commonSearchOpts.s_date)),
                e_date: JSON.parse(JSON.stringify(this.commonSearchOpts.e_date)),
                min_date: JSON.parse(JSON.stringify(this.commonSearchOpts.s_date)).date,
                max_date: JSON.parse(JSON.stringify(this.commonSearchOpts.e_date)).date,
            };
            if (this.commonSearchOpts.ps_date) tmp.ps_date = JSON.parse(JSON.stringify(this.commonSearchOpts.ps_date));
            if (this.commonSearchOpts.pe_date) tmp.pe_date = JSON.parse(JSON.stringify(this.commonSearchOpts.pe_date));
            this.dates = tmp;
        }

        if (this.commonSearchOpts.analsList) {
            if (Object.keys(this.commonSearchOpts).length && Object.keys(this.commonSearchOpts.analsList).length) {
                this.analsCode = this.commonSearchOpts.analsList.arrObjAttrToStr('code', ',').trim();
            }
        }

        if (this.exceptWord) {
            // 제외 팝업 종료 시 API 호출
            EventBus.$on('MODAL_CLOSE', this.modalClose);
        }
    },
    watch: {
        isNoData(val) {
            this.useRkDatas = this.getRkDatas;
            this.useRkDatas_2nd = this.getRkDatas_2nd;
        },
        viewType(val) {
            this.useViewType = val;
        },
        // 공통 검색 조건 변경
        commonSearchOpts: {
            deep: true,
            handler($val, $oldVal) {
                if (!$val) {
                    this.useRkDatas = {
                        data: [],
                    };
                    this.useRkDatas_2nd = {
                        data: [],
                    };
                    this.rkDatas = [{ data: [] }];
                    return;
                }

                if (!Object.keys($val).length) return;

                const tmp = {
                    s_date: {
                        date: $val.s_date ? JSON.parse(JSON.stringify($val.s_date)).date : new Date().dateToStr(),
                    },
                    e_date: {
                        date: $val.e_date ? JSON.parse(JSON.stringify($val.e_date)).date : new Date().dateToStr(),
                    },
                    min_date: $val.ps_date ? JSON.parse(JSON.stringify($val.s_date)).date : '2010-01-01',
                    max_date: $val.pe_date ? JSON.parse(JSON.stringify($val.e_date)).date : new Date().dateToStr(),
                };
                if ($val.ps_date) tmp.ps_date = JSON.parse(JSON.stringify($val.ps_date));
                if ($val.pe_date) tmp.pe_date = JSON.parse(JSON.stringify($val.pe_date));
                this.dates = tmp;

                /**
                 * Date가 바뀌는 부분이 비동기 처리되어, timer사용해서 Dispatch
                 */
                setTimeout(() => {
                    if ($val.analsList) {
                        if (this.analsCode != $val.analsList.arrObjAttrToStr('code', ',').trim()) {
                            this.analsCode = $val.analsList.arrObjAttrToStr('code', ',').trim();
                        } else {
                            if ($oldVal.analsList && $oldVal.analsList.arrObjAttrToStr('code', ',').trim() == $val.analsList.arrObjAttrToStr('code', ',').trim()) {
                                this.evt_search();
                            } else if (!this.analsCode.trim().length) {
                                this.evt_search();
                            }
                        }
                    } else {
                        this.evt_search();
                    }
                }, 100);
            },
        },
        analsCode() {
            this.evt_search();
        },
        dates: {
            deep: true,
            handler($val) {
                if (this.useSort) {
                    if (!$val.ps_date && !$val.pe_date) {
                        const tmp = getDatePOP(JSON.parse(JSON.stringify(this.dates)));
                        this.dates = Object.assign($val, tmp);
                    }
                }
            },
        },
        useAttrs(oldval, newval) {
            this.rkAttrs = this.getAllItemCodes.toString();
            // API 중복 호출 방지
            if (JSON.stringify(oldval) !== JSON.stringify(newval)) {
                this.evt_search();
            }
        },
        // 정렬 변경
        order_type() {
            this.evt_search();
        },
        // 선택 키워드 변경
        checked($val) {
            this.selectedRk = $val;
        },
        selectedRk($val) {
            if (this.use2ndRk && $val) {
                this.fetchData_2nd();
            } else if (typeof this.value !== 'undefined') {
                this.checked = $val;
            }
        },
        // 2차 키워드 정렬 변경
        order_type_2nd() {
            this.fetchData_2nd();
        },
    },
    methods: {
        hndl_setPastDate() {
            this.dates = JSON.parse(JSON.stringify(this.dates));
        },
        async fetchData() {
            this.loading = true;
            this.apiParams = JSON.parse(JSON.stringify(this.searchOpts));

            if (this.exceptWord) this.apiParams.sec_id = this.exceptWord.sc_id;

            if (this.rkAttrs && this.rkAttrs.trim().length) this.apiParams.attr_type_code = this.rkAttrs;

            if (this.apiParams.advs) {
                this.apiParams.s_date = this.apiParams.analsList[0].s_date;
                this.apiParams.e_date = this.apiParams.analsList[0].e_date;
                this.apiParams.ps_date = this.apiParams.analsList[0].ps_date;
                this.apiParams.pe_date = this.apiParams.analsList[0].pe_date;
            }

            let api;

            if (this.useAttrs) api = API_rkeywordWithAttr(this.apiUID, this.apiParams);
            else api = API_rkeyword(this.apiUID, this.apiParams);

            await api
                .then(($res) => {
                    /**
                     * 임시 데이터 사용
                     */
                    // $res = {
                    //     data: [],
                    // };

                    // for (let index = 0; index < this.apiParams.row_limit; index++) {
                    //     let num = Math.floor(Math.random() * 506);
                    //     let arr = ['1_1', '1_2', '4_5', '4_4', '3_2', '3_3'];
                    //     let pick = arr[Math.floor(Math.random() * arr.length)];

                    //     let res = { cnt_d: num, cnt_p: '0', code: '연관어' + index, factor_cnt: '0.0', factor_per: '0.0', name: '연관어' + index, new: 'new', senti_1: '0', senti_2: num, senti_3: '0', attr_type_code: pick };

                    //     $res.data.push(res);
                    // }

                    // $res.data.sort((a, b) => {
                    //     return b.cnt_d - a.cnt_d;
                    // });
                    // 여기까지
                    if (!this.checked) this.selectedRk = null;
                    this.rkData = {
                        data: $res.data,
                    };
                    this.useRkDatas = this.getRkDatas;
                    this.$emit('excelParams', this.apiParams);
                })
                .catch(function ($err) {
                    console.error($err);
                });

            this.loading = false;
        },
        async fetchData_2nd() {
            this.loading_2nd = true;

            this.apiParams = JSON.parse(JSON.stringify(this.searchOpts));
            if (this.analsCode && this.analsCode.strToArr().length > 0) this.apiParams.or_type_code = this.analsCode;

            if (this.exceptWord) this.apiParams.sec_id = this.exceptWord.sc_id;

            if (!this.apiParams.rk_seq) this.apiParams.rk_seq = [];
            this.selectedRk.forEach((item) => {
                this.apiParams.rk_seq.push({ code: item.code, name: item.name, attr_type_code: item.attrCode });
            });

            this.apiParams.order_type = this.order_type_2nd;

            if (this.apiParams.advs) {
                if (this.apiParams.analsList[0].s_date) this.apiParams.s_date = this.apiParams.analsList[0].s_date;
                if (this.apiParams.analsList[0].e_date) this.apiParams.e_date = this.apiParams.analsList[0].e_date;
                if (this.apiParams.analsList[0].ps_date) this.apiParams.ps_date = this.apiParams.analsList[0].ps_date;
                if (this.apiParams.analsList[0].pe_date) this.apiParams.pe_date = this.apiParams.analsList[0].pe_date;
            }

            this.$emit('excelParams_sec', this.apiParams);
            let api;
            if (this.useAttrs) api = API_rkeywordWithAttr(this.apiUID, this.apiParams);
            else api = API_rkeyword(this.apiUID, this.apiParams);

            await api
                .then(($res) => {
                    // /**
                    //  * 임시 데이터 사용
                    //  */
                    // $res = {
                    //     data: [],
                    // };

                    // for (let index = 0; index < _this.apiParams.row_limit; index++) {
                    //     let num = Math.floor(Math.random() * 506);
                    //     let arr = ['1_1', '1_2', '4_5', '4_4', '3_2', '3_3'];
                    //     let pick = arr[Math.floor(Math.random() * arr.length)];

                    //     let res = { cnt_d: num, cnt_p: '0', code: index, factor_cnt: '0.0', factor_per: '0.0', name: '연관어' + index, new: 'new', senti_1: '0', senti_2: num, senti_3: '0', attr_type_code: pick };

                    //     $res.data.push(res);
                    // }

                    // $res.data.sort((a, b) => {
                    //     return b.cnt_d - a.cnt_d;
                    // });
                    // // 여기까지

                    this.rkData_2nd = {
                        data: $res.data,
                    };
                    this.useRkDatas_2nd = this.getRkDatas_2nd;
                })
                .catch(($err) => {
                    console.error($err);
                });

            this.loading_2nd = false;
        },
        // 다중 연관어
        fetchDatas() {
            this.loading = true;
            this.loading_2nd = false;
            const _this = this;

            this.apiParams = JSON.parse(JSON.stringify(this.searchOpts));
            this.apiParams.row_limit = 30;

            // exceptWord가 정의되어 있으면 sec_id를 설정
            if (this.exceptWord) this.apiParams.sec_id = this.exceptWord.sc_id;

            let result = [];
            let loadCnt = this.analsCode.strToArr().length;

            // 분석대상 갯수만큼 api 호출
            for (let Loop1 = 0; Loop1 < this.analsCode.strToArr().length; ++Loop1) {
                (function ($idx) {
                    // commonSearchOpts.analsList에서 code를 기반으로 항목 가져오기
                    let item = _this.commonSearchOpts.analsList.getParseDatas({ code: _this.analsCode.strToArr()[$idx] })[0];

                    let itemParam = JSON.parse(JSON.stringify(_this.apiParams));
                    if (item.s_date) itemParam.s_date = item.s_date;
                    if (item.e_date) itemParam.e_date = item.e_date;
                    if (item.ps_date) itemParam.ps_date = item.ps_date;
                    if (item.pe_date) itemParam.pe_date = item.pe_date;

                    // excelParams 설정
                    let excelParams = JSON.parse(JSON.stringify(_this.apiParams));
                    excelParams.s_date = itemParam.s_date;
                    excelParams.e_date = itemParam.e_date;
                    excelParams.ps_date = itemParam.ps_date;
                    excelParams.pe_date = itemParam.pe_date;

                    if (itemParam.analsList) {
                        // itemParam에 analsList가 있는 경우, itemParam에서 키워드와 값을 advs에 설정
                        itemParam.advs = {};
                        itemParam.advs['keyword_' + itemParam.analsList[$idx].seq] = itemParam.analsList[$idx];
                    }

                    let api;
                    if (_this.useAttrs) api = API_rkeywordWithAttr(_this.apiUID + '_' + $idx, itemParam);
                    else api = API_rkeyword(_this.apiUID + '_' + $idx, itemParam);

                    api.then(($res) => {
                        /**
                         * 임시 데이터 사용
                         */
                        // $res = {
                        //     data: [],
                        // };

                        // for (let index = 0; index < _this.apiParams.row_limit; index++) {
                        //     let num = Math.floor(Math.random() * 506);
                        //     let arr = _this.useAttrs.flat();
                        //     let pick = arr[Math.floor(Math.random() * arr.length)].code;

                        //     let res = { cnt_d: num, cnt_p: '0', code: index, factor_cnt: '0.0', factor_per: '0.0', name: '연관어' + index, new: 'new', senti_1: '0', senti_2: num, senti_3: '0', attr_type_code: pick };

                        //     $res.data.push(res);
                        // }

                        // $res.data.sort((a, b) => {
                        //     return b.cnt_d - a.cnt_d;
                        // });

                        // 여기까지

                        result[$idx] = {
                            code: item.code,
                            name: item.name,
                            color: item.color,
                            data: $res.data,
                        };
                        if (item.seq) result[$idx].seq = item.seq;

                        loadCnt--;

                        if (loadCnt == 0) {
                            // 속성사용시 컬러/속성이름 매칭
                            if (_this.useAttrs) {
                                result.forEach(($item) => {
                                    $item.data.forEach(($item2) => {
                                        let rootItem = _this.useAttrs.flat().getRootData($item2.attr_type_code)[0];
                                        $item2.attrName = rootItem ? rootItem.name : '';
                                        $item2.color = rootItem ? rootItem.color : '#666666';
                                    });
                                });
                            }

                            _this.colsFlexStyle = 'flex: 0 0 ' + parseInt(_this.$refs.colWrap.getBoundingClientRect().width - 41 * Math.min(2, result.length - 1)) / Math.min(3, result.length) + 'px';
                            _this.rkDatas = result;
                            _this.loading = false;
                            _this.loading_2nd = false;
                            _this.$emit('excelParams', excelParams);
                        }
                    }).catch(($err) => {
                        console.error($err);
                    });
                })(Loop1);
            }
        },
        evt_search() {
            if (!this.commonSearchOpts) return;

            this.searchOpts = this.getSearchOpts;

            if (!this.commonSearchOpts.analsList || this.analsCode.strToArr().length == 1) {
                this.fetchData();
            } else {
                // 다중연관어
                this.fetchDatas();
            }
        },
        openModal($e) {
            let param = JSON.parse(JSON.stringify(this.searchOpts));

            // 분석대상
            if ($e.anals) {
                let titleItem = { code: $e.anals.code, name: $e.anals.name, attr_type_code: $e.anals.attr_type_code, type: $e.anals.type };
                if ($e.anals.attr_type_code != null && $e.anals.attr_type_code != undefined) titleItem.type = 'rkeyword';
                param.title = [titleItem];

                // 고급검색일 경우 날짜 설정
                if ($e.anals.seq && param.advs && Object.keys(param.advs).length) {
                    let selKeyword = param.advs['keyword_' + $e.anals.seq];
                    param.s_date = selKeyword.s_date;
                    param.e_date = selKeyword.e_date;
                    param.ps_date = selKeyword.ps_date;
                    param.pe_date = selKeyword.pe_date;
                    param.advs = {};
                    param.advs['keyword_' + $e.anals.seq] = selKeyword;
                }
            }

            // 서브 타이틀
            param.subTitle = [{ code: $e.code, name: $e.name, attr_type_code: $e.attrCode, type: 'rkeyword' }];

            // 카테고리 필터 사용시
            if (this.popupCateFilters) {
                param.cateFilters = this.popupCateFilters;
            }

            // 외부 클릭 이벤트가 걸려 있으면 이벤트 발생 시키고 여기서 종료
            if (this.$listeners?.click) {
                this.$emit('click', param);
                return false;
            }

            if (this.useAttrsPopup) {
                // 연관키워드 속성 사용 팝업
                this.$store.dispatch('MODAL_OPEN', ['relinfo', param, { useAttrs: this.$store.getters.getRkAttrs.default }]);
            } else {
                // 연관키워드 속성 미사용 팝업
                this.$store.dispatch('MODAL_OPEN', ['relinfo', param]);
            }
        },
        evt_keywordClick($e) {
            this.openModal($e);
        },
        evt_2nd_keywordClick($e) {
            let param = JSON.parse(JSON.stringify(this.searchOpts));

            // 분석대상
            if ($e.anals) {
                let titleItem = { code: $e.anals.code, name: $e.anals.name, type: $e.anals.type };
                if (titleItem.type == 'rkeyword') titleItem.attr_type_code = $e.anals.attr_type_code;
                param.title = [titleItem];

                // 고급검색일 경우 날짜 설정
                if (!param.s_date && $e.anals.seq && param.advs && Object.keys(param.advs).length) {
                    let selKeyword = param.advs['keyword_' + $e.anals.seq];
                    param.s_date = selKeyword.s_date;
                    param.e_date = selKeyword.e_date;
                    param.ps_date = selKeyword.ps_date;
                    param.pe_date = selKeyword.pe_date;
                    param.advs = {};
                    param.advs['keyword_' + $e.anals.seq] = selKeyword;
                }
            }

            param.subTitle = this.selectedRk.map(($item) => {
                return {
                    code: $item.code,
                    name: $item.name,
                    attr_type_code: $item.attr_type_code,
                    type: 'rkeyword',
                };
            });
            param.subTitle.push({ code: $e.code, name: $e.name, type: 'rkeyword', attr_type_code: $e.attr_type_code || '' });

            // 카테고리 필터 사용시
            if (this.popupCateFilters) {
                param.cateFilters = this.popupCateFilters;
            }

            // 외부 클릭 이벤트가 걸려 있으면 이벤트 발생 시키고 여기서 종료
            if (this.$listeners?.click) {
                this.$emit('click', param);
                return false;
            }

            if (this.useAttrsPopup) {
                // 연관키워드 속성 사용 팝업
                this.$store.dispatch('MODAL_OPEN', ['relinfo', param, { useAttrs: this.$store.getters.getRkAttrs.default }]);
            } else {
                // 연관키워드 속성 미사용 팝업
                this.$store.dispatch('MODAL_OPEN', ['relinfo', param]);
            }
        },
        //제외 키워드 클릭
        exceptClick(e) {
            let tmp = JSON.parse(JSON.stringify(this.exceptWord));
            tmp.name = tmp.name || '키워드';
            tmp.uid = this.apiUID;
            this.$store.dispatch('MODAL_OPEN', ['ex_relation_keyword', { ...tmp }]);
        },
        // 제외 팝업 종료 시 API 호출
        modalClose(name, param) {
            if (name === 'comp-modal-ex_relation_keyword' && param) {
                // 현재 컴포넌트에서 호출한 팝업이거나 함께 리로드 되어야하는 컴포넌트에서 호출했는지 확인
                if (param.sc_id === this.exceptWord.sc_id || this.exceptWord.reload_id.includes(param.sc_id)) {
                    // API 호출
                    this.evt_search();
                }
            }
        },
    },
    directives: {
        init: {
            inserted(el, binding, vnode) {
                if (el.className.indexOf('is-2dp') >= 0 || el.className.indexOf('is-3dp') >= 0) vnode.context.nodeNot1Dp = true;
            },
        },
    },
};
</script>
