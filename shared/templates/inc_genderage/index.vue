<template>
    <div class="ui_box tmpl_inc_gender_age" :class="{ 'is-2dp': get2Depth }" v-init>
        <div class="header">
            <div class="wrap">
                <h4>
                    <span>라이프 사이클</span>
                </h4>
                <div class="rc_wrap">
                    <comp-helpbox-btn id="helper_lifeCycle"></comp-helpbox-btn>
                </div>
            </div>
            <div class="ui_help_box" data-for="helper_lifeCycle">
                <div class="wrap" v-html="getHelperContent.sample2"></div>
            </div>
        </div>
        <div class="content">
            <div class="wrap">
                <div class="ui_row is-2dp" data-track="성별 / 연령별 점유율">
                    <div class="wrap is-cols-pad">
                        <div class="ui_col w18">
                            <tmpl-lifecycle-wordclouds :id="id + '_wc'" :common-search-opts="commonSearchOpts" v-model="selKeyword" :isNoData="isNoData"></tmpl-lifecycle-wordclouds>
                        </div>
                        <div v-if="!!onlyLifecycle === false" class="ui_col w6">
                            <div class="ui_box is-3dp" style="height: 100%">
                                <div class="content ui-loader-container" :class="{ 'is-loading': loading }" :style="setContStyle">
                                    <div v-if="selKeyword && selKeyword.length > 0" :style="setStyle">
                                        <TmplIncGenderageGender :id="id" :common-search-opts="topSearchDatasClone" @excelParams="getGenExcelParam" :isNoData="isNoData"></TmplIncGenderageGender>
                                        <TmplIncGenderageAge :id="id" :common-search-opts="topSearchDatasClone" @excelParams="getAgeExcelParam" :isNoData="isNoData"></TmplIncGenderageAge>
                                    </div>
                                    <div v-else class="ui_nodata" style="height: 100%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 하단 컨텐츠 SLOT -->
        <slot name="bottom"></slot>
    </div>
</template>

<script>
import { uuid } from 'vue-uuid';
import { API_age } from '@shared/api/datalab/age';
import { mapGetters } from 'vuex';
import EventBus from '@shared/utils/eventBus';

import TmplLifecycleWordclouds from './LifecycleWordclouds';
import TmplIncGenderageAge from './Age';
import TmplIncGenderageGender from './Gender';
export default {
    name: 'tmpl-inc-genderage',
    components: { TmplIncGenderageGender, TmplIncGenderageAge, TmplLifecycleWordclouds },
    data() {
        return {
            apiUID: uuid.v4(),
            apiParams: null,
            loading: false,
            excelLoading: false, // 엑셀 로딩 체크
            topSearchDatasClone: {}, // 성별/연령별 점유율에서 사용하는 검색조건(분석대상 포함)
            get2Depth: false, // 엘리먼트 static class가 '2dp'인지 '3dp' 인지 구분
            selKeyword: null, // 선택 키워드(워드클라우드 v-model), null or []
            genExcelParam: {},
            ageExcelParam: {},
        };
    },

    props: {
        id: { type: String }, // 아이디
        commonSearchOpts: { type: Object }, // 기본 검색 조건
        onlyLifecycle: { type: Boolean, default: false }, // 라이프사이클 단일 템플릿
        isNoData: { type: Boolean, default: false }, // 데이터 없음 강제 설정
    },

    computed: {
        ...mapGetters(['getHelperContent', 'getExcelUsage']),
        setContStyle() {
            let result = {
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100% - 34px)',
            };
            return result;
        },

        setStyle() {
            let result = {
                display: 'flex',
                flexDirection: 'column',
                marginTop: 40 + 'px',
                height: '100%',
            };
            return result;
        },

        setAnalColor() {
            let color = this.selKeyword[0].color || '';
            let style = { background: color, borderColor: color, color: '#fff' };
            return style;
        },
    },
    watch: {
        selKeyword: {
            immediate: true,
            deep: true,
            handler(val) {
                this.setAnalsList(val);
                this.$emit('select', val);
            },
        },
    },

    methods: {
        setAnalsList(val) {
            this.loading = true;
            if (val !== null) {
                setTimeout(() => {
                    this.topSearchDatasClone = JSON.parse(JSON.stringify(this.commonSearchOpts));
                    this.topSearchDatasClone.analsList = val;
                    this.loading = false;
                }, 600);
            } else {
                this.loading = false;
            }
        },
        getGenExcelParam(val) {
            this.genExcelParam = val;
        },
        getAgeExcelParam(val) {
            this.ageExcelParam = val;
        },

        // 엑셀다운
        async evt_excel() {
            let excelParams = {};
            excelParams.excel = true;
            excelParams.excel_id = 'st_anal_sec_02';

            excelParams.Gender = {
                menu_id: this.genExcelParam.menu_id,
                user_id: this.genExcelParam.user_id,
                s_date: this.genExcelParam.s_date,
                e_date: this.genExcelParam.e_date,
                ps_date: this.genExcelParam.ps_date,
                pe_date: this.genExcelParam.pe_date,
                rk_seq: this.genExcelParam.rk_seq,
                type_code: this.genExcelParam.type_code,
            };
            excelParams.Age = {
                menu_id: this.ageExcelParam.menu_id,
                user_id: this.ageExcelParam.user_id,
                s_date: this.ageExcelParam.s_date,
                e_date: this.ageExcelParam.e_date,
                ps_date: this.ageExcelParam.ps_date,
                pe_date: this.ageExcelParam.pe_date,
                rk_seq: this.ageExcelParam.rk_seq,
                type_code: this.ageExcelParam.type_code,
            };

            this.excelLoading = true;
            this.$store.dispatch.$emit('NOTY_INFO', '엑셀 다운로드를 시작합니다.');

            await API_age(this.apiUID, excelParams)
                .then(($res) => {
                    EventBus.$emit('EXCEL_DOWN', $res);
                    this.$store.dispatch('NOTY_COM', '엑셀 다운로드가 완료되었습니다.');
                })
                .catch(($err) => {
                    this.$store.dispatch('NOTY_ERR', '엑셀 다운로드에 실패하였습니다.');
                    console.log('*********************************************************');
                    console.log($err);
                })
                .finally((res) => {
                    this.excelLoading = false;
                });
        },
    },
    directives: {
        init: {
            inserted($el, $evt, $vnode) {
                // 1뎁스 or 2뎁스 체크 후 반환
                $vnode.context.get2Depth = $vnode.data.staticClass && $vnode.data.staticClass.indexOf('is-2dp') >= 0;
            },
        },
    },
};
</script>

<style lang="scss" scoped></style>
