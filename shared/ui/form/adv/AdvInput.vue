<template>
    <div class="input_keyword">
        <div class="keyword" :style="'--color:' + color">
            <div class="inner_wrap">
                <transition name="fade_posy">
                    <span v-if="getUseAdv" class="ui_bedge validation_box" title="고급검색사용중" style="position: absolute">AS</span>
                </transition>
                <comp-input-box :id="id + '_adv_input_keyword'" v-model="adv.name" :disabled-reset="true" :placeholder="getUseAdv ? '그룹명 입력' : input_placeholder" @focus="evt_input_focus" @keyup="evt_input_enter" @keydown="evt_input_tab" :maxlength="15"></comp-input-box>
                <button type="button" class="btn_reset ui_btn is-xsmall is-icon-only" title="초기화" @click="evt_reset" tabindex="-1"><span class="icon">&#xe020;</span></button>
                <button type="button" class="btn_set ui_btn is-xsmall is-icon-only" title="고급설정" tabindex="-1" @click="evt_detail"><span class="icon">&#xe057;</span></button>
            </div>
            <transition name="fade_posy_margin_reverse">
                <comp-adv-input-lately v-if="latelyListActive" @selected="evt_latelySelect"></comp-adv-input-lately>
            </transition>
        </div>
        <comp-bubble-box content="검색어는 2글자 이상 입력해주세요." class="is-validation minlength" :arrow-fixed="true" :show-fixed="isOpen">
            <comp-textarea :id="id + '_adv_input_ta'" ref="ta" v-model="adv.keyword_normal" rows="4" :placeholder="ta_placeholder" @focus="evt_ta_focus" @blur="evt_ta_blur" @keyup="validationLength"></comp-textarea>
        </comp-bubble-box>
        <span v-if="dates.useCalendar || (!adv.name.length && !adv.keyword_normal.length)" class="dp_disabled" :class="{ 'is-disabled': dates.useCalendar }">검색시작일</span>
        <comp-datepicker v-else :id="id + '_adv_input_date'" :s_date.sync="date" :min_date="dates.min_date" :max_date="dates.max_date" data-fixed :complete-btn="null" :disabled="dates.useCalendar"></comp-datepicker>
    </div>
</template>

<script>
import $ from 'jquery';
import { combinationRule } from '@shared/utils/prototype/util.object';
import { getDatePOP } from '@shared/utils/prototype/util.date';
import compAdvInputLately from './AdvInputLately.vue';
import EventBus from '@shared/utils/eventBus';

export default {
    name: 'comp-adv-input',

    components: { compAdvInputLately },
    data() {
        return {
            date: {
                date: this.value && this.value.s_date ? this.value.s_date.date : new Date().dateToStr(),
            },
            latelyListActive: false,
            isOpen: false,
        };
    },

    props: {
        id: { type: String, default: '' }, // ID
        keyName: { type: String }, // Key 이름
        color: { type: String, default: '#000000' }, // 색상
        advs: {
            type: Object,
            default() {
                return {};
            },
        }, // 전체 키워드
        value: {
            // V-Model
            // name: '', // 이름
            // keyword_normal: '', // 일반 키워드
            // keyword_construction: '', // 구문 키워드
            // keyword_adjacency: '', // 인접 키워드
            // keyword_except: '', // 제외 키워드
            // color: '#8c59ff', // 컬러
            // rule: '', // 키워드 조합 룰
            // s_date: {
            //     date: '', // 시작 날짜
            // },
            // e_date: {
            //     date: '', // 종료 날짜
            // },
        },
        dates: { type: Object }, // 달력 날짜
        input_placeholder: { type: String, default: '검색어 입력' }, // 인풋 키워드 홀더텍스트
        ta_placeholder: { type: String, default: '일반 조건 키워드 입력\r\n동일 조건에 여러 개의 검색어 입력 시,\r\n줄바꿈으로 구분해 주세요.\r\n(or연산 적용)' }, // 텍스트 에어리어 홀더텍스트
    },

    computed: {
        adv: {
            get() {
                return this.value;
            },
            set($val) {
                this.$emit('input', $val);
            },
        },
        getNotActive() {
            return !this.adv.name.length && !this.adv.keyword_normal.length;
        },
        /**
         * 고급검색을 사용중인지 체크
         * 조건키워드가 있거나, 노멀 키워드가 2개 이상이거나 이면 'true'
         * @returns {Boolean}
         */
        getUseAdv() {
            let result = (this.adv.keyword_normal.length && this.adv.keyword_normal.split('\n').filter(($item) => $item.length).length > 1) || (this.adv.keyword_normal.length && this.adv.keyword_normal.split(' ').filter(($item) => $item.length).length > 1) || this.adv.keyword_construction.length || this.adv.keyword_adjacency.length || this.adv.keyword_except.length;
            result = result === true || result !== 0 ? true : false;
            this.setUseAdv(result);
            return result;
        },
        getRule() {
            return '';
        },
        getDateGrp() {
            var date = new Date();
            return [0, 7, date.getMonth() - 1 + 'M', date.getMonth() + 'M', date.getMonth() + 1 + 'M'];
        },
    },

    created() {
        // 초기 설정값 없을 경우 날짜 검색일수 계산해서 설정
        if (!this.adv.s_date.date) {
            let curDate = new Date();
            curDate.setDate(curDate.getDate() - this.dates.range);
            this.date.date = curDate.dateToStr();
        }
        this.setDate();
    },

    mounted() {
        this.validationLength();
        this.evt_ta_blur();
        this.adv.rule = combinationRule(this.adv);
        $(document).click(this.evt_input_blur);
    },

    watch: {
        'adv.name'($val) {
            // keyword_normal이 비어있을 때 name을 2글자 이하로 설정하면 검색 버튼 비활성화
            if (!this.adv.keyword_normal && $val.length < 2) this.adv.validation = true;
            if ($val.length > 15) this.adv.name = $val.slice(0, 14);
        },
        'adv.keyword_normal'($val) {
            this.validationLength();
            this.adv.rule = combinationRule(this.adv);
        },
        'adv.keyword_construction'($val) {
            this.adv.rule = combinationRule(this.adv);
        },
        'adv.keyword_adjacency'($val) {
            this.adv.rule = combinationRule(this.adv);
        },
        'adv.keyword_except'($val) {
            this.adv.rule = combinationRule(this.adv);
        },
        // Prop > Dates
        dates($val) {
            this.setDate();
        },
        // 검색 시작일 변경 시
        date($val) {
            this.setDate();
        },
    },
    methods: {
        validationLength() {
            // 키워드 글자수 검증
            // 앞 뒤 공백제거 & 중복공백 공백하나로 변경
            const value = this.adv.keyword_normal;
            if (value) {
                let split = value
                    .trim()
                    .replaceAll(/\s+(?=\s)|\n+(?=\s)|\s+(?=\n)|\n+(?=\n)/g, '')
                    .split(/\s|\n/);
                split = split.map((word) => {
                    return { word: word, isOpen: word.length < 2 && word.length };
                });
                // 글자수가 부족하면 bubble open
                this.isOpen = split.getParseDatas({ isOpen: true }).length > 0;

                // 검색버튼 disabled
                this.adv.validation = this.isOpen;
            } else {
                this.isOpen = false;
                this.adv.validation = false;
            }
        },
        setDate() {
            if (this.dates.useCalendar) {
                // 달력 사용
                this.adv.s_date = this.dates.s_date;
                this.adv.e_date = this.dates.e_date;
                this.adv.ps_date = this.dates.ps_date;
                this.adv.pe_date = this.dates.pe_date;
            } else {
                // 달력 미사용
                this.adv.s_date = this.date;

                let tmpEdate = this.date.date.strToDate();

                tmpEdate.setDate(tmpEdate.getDate() + ((parseInt(this.dates.range) > 0 ? parseInt(this.dates.range) : 0) || 0));
                this.adv.e_date = {
                    date: tmpEdate.dateToStr(),
                };
                Object.assign(this.adv, getDatePOP(JSON.parse(JSON.stringify(this.adv))));
            }
        },
        // 검색창 포커스
        evt_input_focus() {
            this.latelyListActive = true;
            // $(document).unbind('click', this.evt_input_blur);
            // $(document).click(this.evt_input_blur);
        },
        // 검색창 Blur
        evt_input_blur($e) {
            if (!$.contains(this.$el, $e.target)) {
                // $(document).unbind('click', this.evt_docClick);
                this.latelyListActive = false;
                if (!this.adv.name.length) {
                    if (this.getUseAdv) {
                        this.adv.name = this.adv.keyword_normal.split('\n')[0];
                    } else {
                        this.adv.keyword_normal = '';
                    }
                }
                if (!this.adv.keyword_normal.length && !this.adv.keyword_construction.length && !this.adv.keyword_adjacency.length && !this.adv.keyword_except.length) this.adv.keyword_normal = this.adv.name;
            }
        },
        evt_input_enter(e) {
            this.$refs.ta.$el.querySelector('textarea').focus();
        },
        evt_input_tab(e) {
            if (e.keyCode === 9) this.$refs.ta.$el.querySelector('textarea').focus();
            return;
        },
        // 텍스트 에어리어 Focus/Blur
        evt_ta_focus($e) {
            this.evt_input_blur({ target: this.$el });
        },
        // 앞 뒤 공백제거 & 중복공백 공백하나로 변경
        trimKeyword(obj) {
            if (this.adv[obj]) {
                this.adv[obj] = this.adv[obj].trim().replaceAll(/\s+(?=\s)|\n+(?=\s)|\s+(?=\n)|\n+(?=\n)/g, '');
            }
        },
        evt_ta_blur($e) {
            this.trimKeyword('keyword_normal');
            this.trimKeyword('keyword_construction');
            this.trimKeyword('keyword_adjacency');
            this.trimKeyword('keyword_except');

            if (!this.adv.name.length) {
                if (this.adv.keyword_normal.length) this.adv.name = this.adv.keyword_normal.split('\n')[0];
                else if (this.adv.keyword_construction.length) this.adv.name = this.adv.keyword_construction.split('\n')[0];
                else if (this.adv.keyword_adjacency.length) this.adv.name = this.adv.keyword_adjacency.split('\n')[0];
                else if (this.adv.keyword_except.length) this.adv.name = this.adv.keyword_except.split('\n')[0];
            } else {
                this.evt_input_blur({ target: this.$refs.ta.$el.querySelector('textarea') });
            }
        },
        // 검색창 Reset
        evt_reset() {
            this.adv.name = '';
            this.adv.keyword_normal = '';
            this.adv.keyword_construction = '';
            this.adv.keyword_adjacency = '';
            this.adv.keyword_except = '';
            this.validationLength();
        },
        // 고급검색
        evt_detail() {
            EventBus.$emit('MODAL_OPEN', 'adv-detail', this.advs, { selectKeywordName: this.keyName });
        },
        // 조합식 생성(rule)
        evt_latelySelect($val) {
            this.adv = Object.assign(this.adv, $val);
            this.evt_input_blur({ target: this.$el });
        },

        setUseAdv(val) {
            this.adv.useAdv = val;
        },
    },
};
</script>

<style lang="scss" scoped></style>
