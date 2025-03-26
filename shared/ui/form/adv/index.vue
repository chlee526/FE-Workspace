<template>
    <div class="ui_adv" style="width: 840px">
        <div class="input_wrap">
            <comp-adv-input id="adv_input_01" v-model="advs.keyword_1" key-name="keyword_1" :dates="getDates" :advs="advs" :color="getAnalTargets.ts[0].color" input_placeholder="검색어 1 입력"></comp-adv-input>
            <comp-adv-input id="adv_input_02" v-model="advs.keyword_2" key-name="keyword_2" :dates="getDates" :advs="advs" :color="getAnalTargets.ts[1].color" input_placeholder="검색어 2 입력"></comp-adv-input>
            <comp-adv-input input id="adv_input_03" v-model="advs.keyword_3" key-name="keyword_3" :dates="getDates" :advs="advs" :color="getAnalTargets.ts[2].color" input_placeholder="검색어 3 입력"></comp-adv-input>
        </div>
        <div class="dates_wrap">
            <div class="sel_input">
                <comp-switch-btn id="adv_dates_type_01" class="is-small" radio-grp="adv_dates_type" v-model="adv_dates_type" val="1"></comp-switch-btn>
                <div class="wrap">
                    <div class="inner">
                        <comp-bubble-box content="필수값 입니다" class="is-validation" :show-fixed="adv_dates_type == 2 || (adv_dates_input && adv_dates_input.length) ? false : true">
                            <strong class="title">검색일수</strong>
                        </comp-bubble-box>
                        <comp-input-box id="adv_dates_input" class="is-small" type="number" v-model="adv_dates_input" placeholder="숫자입력(0-90까지 입력 가능)" min="0" max="90" :disabled="adv_dates_type == 2" style="width: 300px"></comp-input-box>
                    </div>
                </div>
            </div>
            <div class="sel_cal">
                <comp-switch-btn id="adv_dates_type_02" class="is-small" radio-grp="adv_dates_type" v-model="adv_dates_type" val="2"></comp-switch-btn>
                <div class="wrap">
                    <div class="inner">
                        <strong class="title">검색기간</strong>
                        <comp-datepicker id="adv_dates_cal_s" class="is-small" :s_date.sync="s_date" :e_date.sync="e_date" range="6M" :min_date.sync="min_date" :max_date.sync="max_date" data-fixed="true" :c_type.sync="advs.keyword_1.sdpCtype" :date_grp="getDateGrp" :c_date_gap="cDateGap" :disabled="adv_dates_type == 1"></comp-datepicker>
                    </div>
                    <div class="inner">
                        <strong class="title">비교기간</strong>
                        <comp-datepicker
                            id="adv_dates_cal_e"
                            class="is-small"
                            :s_date.sync="ps_date"
                            :e_date.sync="pe_date"
                            range="6M"
                            :min_date.sync="p_min_date"
                            :max_date.sync="p_max_date"
                            data-fixed="true"
                            :c_type.sync="advs.keyword_1.edpCtype"
                            :p-date="{
                                s_date: s_date,
                                e_date: e_date,
                            }"
                            :p-date-chk.sync="popChk"
                            :disabled="adv_dates_type == 1"></comp-datepicker>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import compAdvInput from './AdvInput.vue';
import EventBus from '@shared/utils/eventBus';
import { mapGetters } from 'vuex';

export default {
    name: 'comp-adv',
    components: { compAdvInput },
    data() {
        return {
            input_keyword_01: '',
            input_keyword_02: '',
            input_keyword_03: '',
            adv_dates_input: '',
            adv_dates_type: 2,

            // 날짜(달력)
            s_date: {
                date: new Date().dateToStr(),
            },
            e_date: {
                date: new Date().dateToStr(),
            },
            ps_date: {
                date: new Date().dateToStr(),
            },
            pe_date: {
                date: new Date().dateToStr(),
            },
            popChk: true,
            min_date: '2022-12-01',
            max_date: new Date(new Date().setDate(new Date().getDate() + this.cDateGap)).dateToStr(),
            p_min_date: '2022-11-30',
            p_max_date: new Date(new Date().setDate(new Date().getDate() + this.cDateGap)).dateToStr(),
        };
    },

    props: {
        value: {
            type: Object,
            default: () => {
                return {
                    keyword_1: {
                        seq: 1,
                        name: '', // 이름
                        keyword_normal: '', // 일반 키워드
                        keyword_construction: '', // 구문 키워드
                        keyword_adjacency: '', // 인접 키워드
                        keyword_except: '', // 제외 키워드
                        color: this.getAnalTargets.ts[0].color, // 컬러
                        rule: '', // 키워드 조합 룰
                        s_date: {
                            date: '', // 시작 날짜
                        },
                        e_date: {
                            date: '', // 종료 날짜
                        },
                        sdpCtype: 'day',
                        edpCtype: 'day',
                        validation: false, // 최소 글자수 검증
                    },
                    keyword_2: {
                        seq: 2,
                        name: '', // 이름
                        keyword_normal: '', // 일반 키워드
                        keyword_construction: '', // 구문 키워드
                        keyword_adjacency: '', // 인접 키워드
                        keyword_except: '', // 제외 키워드
                        color: this.getAnalTargets.ts[1].color, // 컬러
                        rule: '', // 키워드 조합 룰
                        s_date: {
                            date: '', // 시작 날짜
                        },
                        e_date: {
                            date: '', // 종료 날짜
                        },
                        validation: false, // 최소 글자수 검증
                    },
                    keyword_3: {
                        seq: 3,
                        name: '', // 이름
                        keyword_normal: '', // 일반 키워드
                        keyword_construction: '', // 구문 키워드
                        keyword_adjacency: '', // 인접 키워드
                        keyword_except: '', // 제외 키워드
                        color: this.getAnalTargets.ts[2].color, // 컬러
                        rule: '', // 키워드 조합 룰
                        s_date: {
                            date: '', // 시작 날짜
                        },
                        e_date: {
                            date: '', // 종료 날짜
                        },
                        validation: false, // 최소 글자수 검증
                    },
                };
            },
        },
        cDateGap: { typeof: Number, default: 0 },
    },

    computed: {
        ...mapGetters(['getAnalTargets']),
        advs: {
            get() {
                return this.value;
            },
            set($val) {
                this.$emit('input', $val);
            },
        },
        getDates() {
            return {
                useCalendar: this.adv_dates_type == 2,
                range: this.adv_dates_input,
                s_date: this.s_date,
                e_date: this.e_date,
                ps_date: this.ps_date,
                pe_date: this.pe_date,
                min_date: this.min_date,
                max_date: this.max_date,
            };
        },
        getDateGrp() {
            let date = new Date();
            let result = [0, 7, 30];
            date.setMonth(date.getMonth() - 1);
            result.push(date.getMonth() + 1 + 'M');
            date.setMonth(date.getMonth() + 1);
            result.push(date.getMonth() + 1 + 'M');
            return result;
        },
    },
    created() {
        let tmpDate = new Date();
        tmpDate.setDate(tmpDate.getDate() - 6);
        this.s_date.date = this.advs.keyword_1.s_date.date ? this.advs.keyword_1.s_date.date : tmpDate.dateToStr();
        this.e_date.date = this.advs.keyword_1.e_date.date ? this.advs.keyword_1.e_date.date : new Date().dateToStr();
        this.ps_date.date = this.advs.keyword_1.ps_date.date ? this.advs.keyword_1.ps_date.date : new Date().dateToStr();
        this.pe_date.date = this.advs.keyword_1.pe_date.date ? this.advs.keyword_1.pe_date.date : new Date().dateToStr();
        this.popChk = this.advs.keyword_1.popChk != undefined ? this.advs.keyword_1.popChk : true;

        if (this.advs.keyword_1.date_disabled != undefined) {
            this.adv_dates_type = this.advs.keyword_1.date_disabled ? 2 : 1;
            this.adv_dates_input = this.advs.keyword_1.range;
        }

        this.dateDisableChange();
    },
    mounted() {
        EventBus.$on('ADV_SAVE', this.evt_advSave);
    },
    watch: {
        value: {
            deep: true,
            handler($val) {
                // Reset
                let _this = this;
                if ($val.keyword_1.reset) {
                    this.adv_dates_type = 2;
                    this.sdpCtype = 'day';
                    this.edpCtype = 'day';
                    setTimeout(() => {
                        _this.s_date.date = $val.keyword_1.s_date.date;
                        _this.e_date.date = $val.keyword_1.e_date.date;
                        _this.popChk = true;
                    }, 100);
                    delete $val.keyword_1.reset;
                }
            },
        },
        // 달력 Pop
        popChk($val) {
            this.advs.keyword_1.popChk = $val;
            this.advs.keyword_2.popChk = $val;
            this.advs.keyword_3.popChk = $val;
        },
        // 검색어 날짜 조건(검색일수/검색기간) 변경 시
        adv_dates_type($val) {
            this.dateDisableChange();
        },
        // 검색 일수 변경
        adv_dates_input($val) {
            this.dateDisableChange();
        },
    },
    methods: {
        dateDisableChange() {
            if (this.adv_dates_type == 1) {
                this.advs.keyword_1.date_disabled = false;
                this.advs.keyword_2.date_disabled = false;
                this.advs.keyword_3.date_disabled = false;
            } else {
                this.advs.keyword_1.date_disabled = true;
                this.advs.keyword_2.date_disabled = true;
                this.advs.keyword_3.date_disabled = true;
            }
            this.advs.keyword_1.range = this.adv_dates_input;
            this.advs.keyword_2.range = this.adv_dates_input;
            this.advs.keyword_3.range = this.adv_dates_input;
        },
        evt_advSave($val) {
            this.advs = $val;
        },
    },
};
</script>

<style></style>
