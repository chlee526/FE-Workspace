<template>
    <div class="wrap">
        <section ref="modal_item" class="ui_box popup_item popup_rel_info">
            <span class="bg" @click="close"></span>
            <div class="header">
                <div class="wrap">
                    <h2>
                        <!-- 타이틀 -->
                        <strong v-if="originalCondition.title.length">
                            <span v-for="$item in originalCondition.title" :key="'title' + $item" :title="$item.name">{{ $item.name }}</span>
                        </strong>
                        <strong v-else>관련정보</strong>

                        <!-- 서브 타이틀(추가정보) -->
                        <div class="sub_title">
                            <!-- 날짜 -->
                            <template v-if="originalCondition.date">
                                <span class="ui_bedge" :title="originalCondition.date.s_date.date + '~' + originalCondition.date.e_date.date">
                                    <strong>{{ originalCondition.date.s_date.date }} ~ {{ originalCondition.date.e_date.date }}</strong>
                                </span>
                            </template>

                            <!-- 일반 키워드(감성/채널...) -->
                            <template v-for="($item, idx) in getDefaultSubTitle">
                                <span :key="idx" v-if="$item.name.trim().length" class="ui_bedge" :title="$item.name">
                                    {{ $item.name }}
                                </span>
                            </template>

                            <!-- 연관 키워드 -->
                            <span v-if="getRkeywordSubTitle.length" class="ui_bedge">
                                <template v-for="($item, $idx) in getRkeywordSubTitle">
                                    <template v-if="$idx > 0"> + </template>
                                    {{ $item.name }}
                                </template>
                            </span>
                        </div>
                    </h2>
                    <button type="button" class="close" title="팝업 닫기" @click="close">팝업 닫기</button>
                </div>
            </div>
            <div class="wrap">
                <div class="ui_function">
                    <div class="lc">
                        <!-- 최대검색기간(dateMaxRange) 설정시 -->
                        <comp-datepicker v-if="originalCondition.dateMaxRange" id="popName + '_' + dp" class="is-small" :c_type_opts="null" :s_date.sync="controlCondition.date.s_date" :e_date.sync="controlCondition.date.e_date" :min_date.sync="originalCondition.date.min_date.date" :max_date.sync="originalCondition.date.max_date.date" :range="originalCondition.dateMaxRange" data-fixed="true"></comp-datepicker>

                        <hr v-if="originalCondition.dateMaxRange && controlCondition.cateFilters?.length" />
                        <!-- 필터 옵션 -->
                        <comp-selectbox v-for="($item, idx) in controlCondition.cateFilters" :key="'s' + idx" id="popName + '_' + filter + '_' + $idx" class="is-small" v-model="$item.value" :opts="$item.opts" :multiple="$item.multiple" useDisabled></comp-selectbox>

                        <hr v-if="(originalCondition.dateMaxRange || (controlCondition.cateFilters && controlCondition.cateFilters.length)) && getAdditionalCondition" />

                        <!-- 추가 검색 조건 -->
                        <div v-if="getAdditionalCondition" class="sub_title">
                            <button v-if="additionalCondition.selectDate" :title="additionalCondition.selectDate" class="keyword" @click="evt_subTitleClick({ type: 'date' })">
                                <span>{{ Array.isArray(additionalCondition.selectDate) ? additionalCondition.selectDate[0] + ' ~ ' + additionalCondition.selectDate[1] : additionalCondition.selectDate }}</span>
                            </button>
                            <button v-if="additionalCondition.selectRk" :title="additionalCondition.selectRk.word" class="keyword" :style="getSelectRkStyle" @click="evt_subTitleClick({ type: 'rk' })">
                                <span>{{ additionalCondition.selectRk.word }}</span>
                            </button>
                            <button v-if="additionalCondition.inputKeyword.trim() != ''" :title="additionalCondition.inputKeyword" class="keyword is-searchInput" @click="evt_subTitleClick({ type: 'input' })">
                                <span>{{ additionalCondition.inputKeyword.trim() }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="rc">
                        <button class="ui_btn is-icon-only is-small" title="조건 초기화" @click="evt_resetCondition" :disabled="!originalCondition.dateMaxRange && !controlCondition.cateFilters?.length && !getAdditionalCondition"><span class="icon">&#xe020;</span></button>
                    </div>
                </div>
                <div class="content" :class="{ 'is-loading': loading }" :style="'max-height:' + (hgt - contentHgt) + 'px'">
                    <div class="ui_row is-3dp">
                        <div v-if="searchCondition" class="wrap is-cols-pad">
                            <div class="ui_col w9">
                                <!-- 정보량 추이 -->
                                <div class="ui_row is-3dp">
                                    <tmpl-modal-relinfo-volume :pop-name="popName" :search-params="searchCondition" @subTitleSelect="evt_subTitleClick"></tmpl-modal-relinfo-volume>
                                </div>
                                <!-- 연관어 -->
                                <div class="ui_row is-3dp">
                                    <tmpl-modal-relinfo-rkeyword :pop-name="popName" :search-params="searchCondition" :use-attrs="useAttrs" @subTitleSelect="evt_subTitleClick"></tmpl-modal-relinfo-rkeyword>
                                </div>
                            </div>
                            <div class="ui_col w15">
                                <!-- 데이터 목록 -->
                                <tmpl-modal-relinfo-datalist :pop-name="popName" :search-params="searchCondition" @subTitleSelect="evt_subTitleClick"></tmpl-modal-relinfo-datalist>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import EventBus from '@shared/utils/eventBus';
import { deepMergeJSON } from '@shared/utils/prototype/util.object';
import { getDatePOP } from '@shared/utils/prototype/util.date';

import TempModalRelinfoDatalist from './RelinfoDataList.vue';
import TempModalRelinfoRkeyword from './RelinfoRkeyword.vue';
import TempModalRelinfoVolume from './RelinfoVolume.vue';

export default {
    name: 'tmpl-modal-relinfo',
    data: function () {
        return {
            loading: false,
            contentHgt: 170,
            isFirst: true,
            // 검색조건 원본
            originalCondition: {
                //상단 제목
                title: [],
                // 상단 표기 날짜
                date: {
                    // ps_date: {
                    //     date: '1900-01-01',
                    // },
                    // pe_date: {
                    //     date: '1900-01-01',
                    // },
                    s_date: {
                        date: '1900-01-01',
                    },
                    e_date: {
                        date: '1900-01-01',
                    },
                    min_date: {
                        date: '1900-01-01',
                    },
                    max_date: {
                        date: '1900-01-01',
                    },
                },
                // 상단 서브 타이틀
                subTitle: [
                    // { code: '1', keyword: '채널', type: 'chn' },
                    // { code: '2', keyword: '감성', type: 'senti' },
                    // { code: '3', keyword: '관능', type: 'sens' },
                    // { code: '4', keyword: '브랜드', type: 'brand' },
                    // { code: '5', keyword: '연관키워드1', type: 'rkeyword' },
                    // { code: '5', keyword: '연관키워드2', type: 'rkeyword' },
                ],
                // 최대 검색 기간(기본사용안함)
                dateMaxRange: null,
                // 필터링 옵션 항목(변함, 기본없음)
                cateFilters: [],
            },
            // 관련정보 팝업내에서 컨트롤 하기 위한 검색조건(originalCondition 복사본)
            controlCondition: {
                date: {
                    s_date: {
                        date: '1900-01-01',
                    },
                    e_date: {
                        date: '1900-01-01',
                    },
                },
            },
            // API 파라미터로 재정의 된 검색조건
            searchCondition: null,
            // 추가 검색조건
            additionalCondition: {
                selectDate: null,
                selectRk: null,
                inputKeyword: '',
            },
        };
    },
    components: {
        'tmpl-modal-relinfo-datalist': TempModalRelinfoDatalist,
        'tmpl-modal-relinfo-rkeyword': TempModalRelinfoRkeyword,
        'tmpl-modal-relinfo-volume': TempModalRelinfoVolume,
    },
    props: {
        popName: { type: String },
        searchParams: { type: Object },
        hgt: { type: Number },
        useAttrs: { default: false },
    },
    computed: {
        // api 파라미터로 재정의 하기위한 검색 조건 파싱
        getSearchCondition() {
            const result = JSON.parse(JSON.stringify(this.searchParams));
            // 분석대상
            if (this.controlCondition.title) {
                this.controlCondition.title.forEach(($item) => {
                    if (result[$item.type] && result[$item.type].length) {
                        if (!result[$item.type].strToArr().includes($item.code)) result[$item.type] += ',' + $item.code;
                    } else {
                        result[$item.type] = $item.code;
                    }
                });
            }

            // 날짜
            if (this.controlCondition.date) {
                for (const $attr in this.controlCondition.date) {
                    result[$attr] = {
                        date: this.controlCondition.date[$attr].date + (this.controlCondition.date[$attr].time ? this.controlCondition.date[$attr].time : ''),
                    };
                }
            }

            // 서브타이틀
            if (this.controlCondition.subTitle) {
                result.rkeyword = [];
                this.controlCondition.subTitle.forEach(($item) => {
                    if ($item.type == 'senti' || $item.type == 'sg_seq') result[$item.type] = $item.code;
                    else if ($item.type != 'search_keyword') result[$item.type] = $item;
                });
                if (result.rkeyword.length == 0) delete result.rkeyword;
            }

            // 필터
            if (this.controlCondition.cateFilters.length) {
                this.controlCondition.cateFilters.forEach(($item) => {
                    if ($item.value) result[$item.type] = $item.value;
                });
            }

            // 추가 검색 조건(날짜/연관어/키워드)
            result.additionalCondition = this.additionalCondition;

            // 추가 검색 조건(연관키워드)
            if (this.additionalCondition.selectRk) {
                if (!result.rkeyword) result.rkeyword = [];
                result.rkeyword.push(this.additionalCondition.selectRk);
            } else {
                result.rkeyword = [];
                this.controlCondition.subTitle.forEach(($item) => {
                    if ($item.type == 'rkeyword') {
                        result[$item.type].push($item);
                    }
                });
            }

            /**
             *
             * API 파라미터로 재 정의
             * - 날짜는 상단에서 재정의
             * - rk_seq: 연관키워드 코드
             * - search_keyword: 입력 키워드 검색
             *
             */
            // 연관키워드
            result.rk_seq = [];
            if (result.rkeyword) result.rkeyword.map(($item) => result.rk_seq.push($item));
            if (!result.rk_seq.length) delete result.rk_seq;

            // 입력 키워드
            if (this.additionalCondition.inputKeyword.length) {
                if (!result.search_keyword) result.search_keyword = [];

                result.search_keyword.push({
                    type: 'A',
                    keyword: this.additionalCondition.inputKeyword,
                });
            }

            return JSON.parse(JSON.stringify(result));
        },
        // 서브타이틀 - 일반키워드
        getDefaultSubTitle() {
            return this.originalCondition.subTitle.filter(($item) => $item.type != 'rkeyword');
        },
        // 서브타이틀 - 연관키워드
        getRkeywordSubTitle() {
            return this.originalCondition.subTitle.filter(($item) => $item.type == 'rkeyword');
        },
        // 추가 검색조건 키워드
        getAdditionalCondition() {
            return this.additionalCondition.inputKeyword.trim() != '' || this.additionalCondition.selectDate || this.additionalCondition.selectRk;
        },
        // 추가 검색조건 - 연관키워드 뱃지 스타일
        getSelectRkStyle() {
            const color = this.additionalCondition.selectRk?.color;
            let style = 'color: #fff;';
            if (color) {
                style = `${style} border-color: ${color}; background: ${color}`;
            }
            return style;
        },
    },
    mounted() {
        this.originalCondition.date = {
            e_date: this.searchParams.e_date,
            s_date: this.searchParams.s_date,
            ps_date: this.searchParams.ps_date,
            pe_date: this.searchParams.pe_date,
            min_date: this.searchParams.s_date,
            max_date: this.searchParams.e_date,
        };

        this.originalCondition = deepMergeJSON(this.originalCondition, this.searchParams);
        this.controlCondition = JSON.parse(JSON.stringify(this.originalCondition));

        this.evt_search();

        const $ui_function = this.$refs.modal_item.querySelector('.wrap > .ui_function');
        const $footer = this.$refs.modal_item.querySelector('.wrap > .footer');
        if ($ui_function) this.contentHgt += $ui_function.length > 0 ? 42 : 0;
        if ($footer) this.contentHgt += $footer.length > 0 ? 66 : 0;
    },
    watch: {
        // 필터 - 채널
        'controlCondition.cateFilters': {
            deep: true,
            handler() {
                if (!this.isFirst) this.evt_search();
            },
        },
        // 시작 날짜
        'controlCondition.date.s_date.date': {
            deep: true,
            handler() {
                if (this.controlCondition.date.ps_date) {
                    const tmp = getDatePOP(JSON.parse(JSON.stringify(this.controlCondition.date)));
                    this.controlCondition.date.ps_date = tmp.ps_date;
                    this.controlCondition.date.pe_date = tmp.pe_date;
                }
                this.evt_search();
            },
        },
        // 종료 날짜
        'controlCondition.date.e_date.date': {
            deep: true,
            handler() {
                if (this.controlCondition.date.ps_date) {
                    const tmp = getDatePOP(JSON.parse(JSON.stringify(this.controlCondition.date)));
                    this.controlCondition.date.ps_date = tmp.ps_date;
                    this.controlCondition.date.pe_date = tmp.pe_date;
                }
                this.evt_search();
            },
        },
        additionalCondition: {
            deep: true,
            handler(val) {
                console.log('$$$$$', val);
            },
        },
    },
    methods: {
        // 검색 조건 업데이트
        evt_search() {
            this.$nextTick(() => {
                this.searchCondition = JSON.parse(JSON.stringify(this.getSearchCondition));
                this.isFirst = false;
            });
        },
        /**
         * 서브타이틀(추가검색조건) 이벤트 - 서브타이틀(추가검색조건) 추가/삭제
         * @param {Object} data  추가검색조건 데이터  {type: 추가검색조건 타입명, val: 추가검색조건 값}
         */
        evt_subTitleClick(data) {
            if (data.type === 'date') this.additionalCondition.selectDate = data.val;
            else if (data.type === 'rk') this.additionalCondition.selectRk = data.val;
            else if (data.type === 'input') this.additionalCondition.inputKeyword = data.val || '';
            this.evt_search();
        },
        // 검색조건 초기화
        evt_resetCondition() {
            this.additionalCondition.selectDate = null;
            this.additionalCondition.selectRk = null;
            this.additionalCondition.inputKeyword = '';

            // 날짜 초기화
            this.controlCondition.date.e_date.date = this.originalCondition.date.e_date.date;

            this.evt_search();
        },
        close() {
            EventBus.$emit('MODAL_CLOSE', this.popName);
        },
    },
};
</script>

<style lang="scss" scoped>
.popup_item {
    > .header,
    > .wrap,
    > .footer {
        max-width: 1300px !important;
    }
}
</style>
