<template>
    <div class="ui_datepicker" :class="{ 'is-range': end_date.date, 'is-time': getTimeUse }">
        <div class="input_wrap">
            <div class="wrap" ref="input">
                <comp-selectbox v-if="hasEndDate && c_type_opts" id="id + '_types'" ref="ctype_select" class="type-selector" :class="$vnode.data.staticClass" :opts="get_ctype_opts" v-model="cType" :disabled="disabled" @click="active = false" @change="evt_typeChange"></comp-selectbox>
                <div :id="id" class="date_result" :class="{ 'is-active': active }" readonly :disabled="disabled" @click="active = !active">{{ renderDate }}</div>
            </div>
            <ul class="date_grp" v-if="getDateGrp && getDateGrp.length > 0">
                <li v-for="($item, $idx) in getDateGrp" v-bind:key="$idx">
                    <button type="button" :data-value="$item.name" @click="dateGrpClick($item.name)" :class="[$vnode.data.staticClass, { 'is-active': $item.active }]" :disabled="$item.disabled">
                        <span>{{ $item.name | grpToStr(c_date_gap) }}</span>
                    </button>
                </li>
            </ul>
            <ul class="date_grp" v-if="pDate">
                <li>
                    <comp-checkbox :id="id + '_pop'" :class="$vnode.data.staticClass" v-model="popChk" label="PoP" :btn="true" :disabled="disabled"></comp-checkbox>
                </li>
            </ul>
        </div>
        <transition name="fade_posy">
            <span v-if="active" class="mobile_bg" @click="active = false"></span>
        </transition>
        <transition name="fade_posy">
            <div v-if="active && !disabled" ref="calendars" class="calendars" :class="'is-' + cType" :style="'top: ' + pos_top + 'px; left: ' + pos_left + 'px;'" v-init v-click-outside="evt_docClick" v-behavior-scroll-resize="evt_resizeScroll">
                <comp-tab v-if="s_date && e_date" :id="id + '_dp_tab'" :opts="dpTabOpts" v-model="dpTabSelected"></comp-tab>
                <div class="calendars_container">
                    <div class="wrap">
                        <div ref="dp_start_wrap" class="dp_wrap searchs_dp_start" :class="{ 'is-active': dpTabSelected == '1' }">
                            <comp-datepicker-calendar v-if="cType === 'day' || cType === 'week'" ref="start_dp" :id="id + '_start'" :type="cType" v-model="start_date" :other-date-end="end_date.date" :mindate="min_date" :maxdate="max_date" :minute-edit="minuteEdit" :second-edit="secondEdit" @selected="evt_dateSelected"></comp-datepicker-calendar>
                            <comp-datepicker-selector v-else ref="start_dp" :id="id + '_start'" :type="cType" v-model="start_date" cal-type="start" :mindate="min_date" :maxdate="max_date" @selected="evt_dateSelected"></comp-datepicker-selector>
                        </div>

                        <hr v-if="end_date.date" />
                        <div v-if="end_date.date" ref="dp_end_wrap" class="dp_wrap searchs_dp_end" :class="{ 'is-active': dpTabSelected == '2' }">
                            <comp-datepicker-calendar v-if="cType === 'day' || cType === 'week'" ref="end_dp" :id="id + '_end'" :type="cType" v-model="end_date" :other-date-start="start_date.date" :mindate="min_date" :maxdate="max_date" :minute-edit="minuteEdit" :second-edit="secondEdit"></comp-datepicker-calendar>
                            <comp-datepicker-selector v-else ref="end_dp" :id="id + '_end'" :type="cType" v-model="end_date" cal-type="end" :mindate="min_date" :maxdate="max_date"></comp-datepicker-selector>
                        </div>
                    </div>
                </div>
                <div class="bottom" v-if="completeBtn">
                    <div v-if="getRangeTxt" class="range_info">
                        <span>최대 {{ getRangeTxt }}까지 선택 가능 <em>(선택 일자 포함)</em></span>
                    </div>
                    <button class="ui_btn is-small is-color-black" @click="evt_confirmClick">
                        <span>{{ completeBtn }}</span>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import $ from 'jquery';

import DatepickerCalendar from './DatepickerCalendar';
import DatepickerSelector from './DatepickerSelector';

export default {
    name: 'comp-datepicker',
    data: function () {
        return {
            curDate: new Date(),
            active: false,
            evtState: null,
            evtStateTimer: null,
            start_date: this.s_date ? JSON.parse(JSON.stringify(this.s_date)) : {},
            end_date: this.e_date ? JSON.parse(JSON.stringify(this.e_date)) : {},
            hasEndDate: this.e_date.date ? true : false,
            min_date_fix: null,
            getTimeUse: this.s_date.time ? true : false,
            pos_top: 0,
            pos_left: 0,
            dpTabSelected: 1,
            dpTabOpts: [
                { code: '1', name: '시작날짜' },
                { code: '2', name: '종료날짜' },
            ],
            dateMoveRange: '1M',
            isDateGrpClick: false,
            clickGrpItem: null,
            dateGrpTimer: null,
            isCtypeChange: false,
            cTypeTimer: null,
            cType: null,
            dateChangeTimer: null,
            startDateAction: false,
            endDateAction: false,
            sDateFix: false,
            eDateFix: false,
            get_ctype_opts: [],
            endDateChange: false,
            popChk: this.pDateChk && this.pDateChk ? true : false,
        };
    },
    components: {
        'comp-datepicker-calendar': DatepickerCalendar,
        'comp-datepicker-selector': DatepickerSelector,
    },
    props: {
        id: { type: String }, // ID
        range: { type: String, default: '1M' }, // 날짜 범위
        s_date: {
            // 시작 날짜
            type: Object,
            default: function () {
                return {};
            },
        },
        e_date: {
            // 종료 날짜
            type: Object,
            default: function () {
                return {};
            },
        },
        c_type_opts: {
            type: Array,
            default: function () {
                return ['day', 'week', 'month', 'quarter', 'half', 'year'];
            },
        },
        c_type: {
            type: String,
            default: function () {
                return this.c_type_opts ? this.c_type_opts[0] : 'day';
            },
        },
        min_date: { type: String }, // 최소 날짜
        max_date: { type: String }, // 최대 날짜
        c_date_gap: { type: Number, default: 0 }, // 오늘날짜 갭
        date_grp: { type: Array, default: null }, // 날짜그룹 활성 여부
        completeBtn: { type: String, default: '확인' }, // '확인' 버튼 활성 여부
        disabled: { type: Boolean, default: false }, // Disabled
        minuteEdit: { type: Boolean, default: false }, // 분단위 Edit
        secondEdit: { type: Boolean, default: false }, // 초단위 Edit
        pDate: { type: Object }, // 이전기간달력
        pDateChk: { type: Boolean }, // 이전기간달력 POP
    },
    created() {
        this.cType = this.c_type;
        var opts = [
            { code: 'day', name: '일' },
            { code: 'week', name: '주' },
            { code: 'month', name: '월' },
            { code: 'quarter', name: '분기' },
            { code: 'half', name: '반기' },
            { code: 'year', name: '년' },
        ];
        this.get_ctype_opts = opts.filter(($item) => this.c_type_opts && this.c_type_opts.indexOf($item.code) >= 0);

        if (new Date(this.s_date.date) < new Date(this.min_date)) this.start_date.date = this.min_date;
        else if (new Date(this.s_date.date) > new Date(this.max_date)) this.start_date.date = this.max_date;

        if (this.e_date && new Date(this.e_date.date) < new Date(this.min_date)) this.end_date.date = this.min_date;
        else if (this.e_date && new Date(this.e_date.date) > new Date(this.max_date)) this.end_date.date = this.max_date;

        if (this.s_date) this.start_date = this.s_date;
        if (this.e_date) this.end_date = this.e_date;
        if (this.range) this.endDateChange = true;

        if (this.c_date_gap) this.curDate.setDate(this.curDate.getDate() + this.c_date_gap);
    },
    computed: {
        renderDate() {
            if (this.getTimeUse) {
                if (!this.e_date.date) {
                    return this.s_date.date + (this.s_date.time ? ' ' + String(this.s_date.time).time24to12() : '');
                } else {
                    return this.s_date.date + (this.s_date.time ? ' ' + String(this.s_date.time).time24to12() : '') + ' ~ ' + this.e_date.date + (this.e_date.time ? ' ' + String(this.e_date.time).time24to12() : '');
                }
            } else {
                if (!this.hasEndDate) return this.s_date.date;
                else {
                    return this.s_date.date + ' ~ ' + this.e_date.date;
                }
            }
        },
        getDateGrp() {
            // date_grp 데이터가 없을 경우 null 반환
            if (!this.date_grp) return null;
            const result = [];
            this.date_grp.forEach(($item) => {
                const item = {
                    name: $item,
                    disabled: this.disabled,
                };
                // 해당 date group 항목이 활성화된 기간에 해당하는지 확인하는 함수 호출
                const itemDate = this.getDateGrpActive(item.name);

                item.active = itemDate.sDate && itemDate.sDate == this.s_date.date && itemDate.eDate == this.e_date.date;
                // 이미 active된 값이 있으면 첫번째 active만 적용
                if (item.active && result.some((item2) => item2.active)) item.active = false;

                // clickGrpItem 값에 따라 item.active 값 설정
                if (this.clickGrpItem === $item) {
                    // clickGrpItem외에 전부 active false
                    result.forEach((item2) => (item2.active = false));

                    item.active = itemDate.sDate && itemDate.sDate == this.s_date.date && itemDate.eDate == this.e_date.date;
                    this.clickGrpItem = null;
                }
                result.push(item);
            });
            return result;
        },
        getRangeTxt() {
            if (!this.range) return false;
            let result = this.range;
            if (this.range.indexOf('W') >= 0) result = result.replace('W', '주');
            else if (this.range.indexOf('M') >= 0) result = result.replace('M', '개월');
            else if (this.range.indexOf('Y') >= 0) result = result.replace('Y', '년');
            else result = result + '일';
            return result;
        },
    },
    mounted() {
        let tmp = this.getSizeClass;
        if (this.pDate && this.popChk) this.pDateChange();
    },
    beforeDestroy() {},
    filters: {
        grpToStr($val, $gap) {
            if ($gap == undefined) $gap = 0;
            if (String($val).toUpperCase().indexOf('BY') >= 0) return String($val).toUpperCase().split('BY')[0] + '년';
            else if (String($val).toUpperCase().indexOf('Y') >= 0) return String($val).toUpperCase().split('Y')[0] + '년';
            else if (String($val).toUpperCase().indexOf('BM') >= 0) return String($val).toUpperCase().split('BM')[0] + '개월';
            else if (String($val).toUpperCase().indexOf('M') >= 0) return String($val).toUpperCase().split('M')[0] + '월';
            else return $val == 0 ? ($gap == -1 ? '전일' : '1일') : $val + '일';
        },
    },
    watch: {
        s_date: {
            handler($date) {
                if (this.start_date?.date !== $date.date) {
                    this.start_date = $date;
                }
            },
            deep: true,
        },
        e_date: {
            handler($date) {
                if (this.end_date?.date !== $date.date) {
                    this.end_date = $date;
                }
            },
            deep: true,
        },
        start_date: {
            handler($date) {
                if (!this.sDateFix) {
                    // 주간 달력이고 현재 날짜가 일요일이 아니면 날짜를 이전 일요일로 설정
                    if (this.cType == 'week' && $date.date != $date.date.getDayDate(0)) {
                        this.sDateFix = true;
                        $date.date = $date.date.getDayDate(0);
                        return;
                    }
                }
                // min_date가 설정되어 있고 현재일이 그 이전일 경우,
                // 현재 날짜를 최소 날짜로 설정
                if (this.min_date && $date.date.strToDate() < this.min_date.strToDate()) {
                    this.sDateFix = true;
                    $date.date = this.min_date;
                    return;
                }

                // end_date가 있는 경우 현재 날짜가 그 이후가 아닌지 확인

                if (this.hasEndDate) {
                    const tmp_s = new Date($date.date + ' 00:00:00');
                    const tmp_e = new Date(this.end_date.date + ' 00:00:00');

                    if (tmp_s > tmp_e) {
                        // 달력 유형에 따라 end_date 조정
                        // 월별 달력: end_date를 현재 달의 마지막 날로 설정
                        // 주간/일별 달력: end_date를 현재 날짜로 설정
                        // 연도 달력: end_date를 현재 연도의 12월 31일로 설정
                        if (this.cType == 'day' || this.cType == 'week') {
                            this.end_date = JSON.parse(JSON.stringify($date));
                        } else if (this.cType == 'month') {
                            tmp_e.setFullYear(tmp_s.getFullYear());
                            tmp_e.setDate(1);
                            tmp_e.setMonth($date.date.strToDate().getMonth() + 1);
                            tmp_e.setDate(0);
                            this.end_date.date = tmp_e.dateToStr();
                        } else if (this.cType == 'quarter') {
                            tmp_e.setFullYear(tmp_s.getFullYear());
                            tmp_e.setDate(1);
                            tmp_e.setMonth($date.date.strToDate().getMonth() + 1);
                            tmp_e.setDate(0);
                            this.end_date.date = tmp_e.dateToStr();
                        } else if (this.cType == 'half') {
                            tmp_e.setFullYear(tmp_s.getFullYear());
                            tmp_e.setDate(1);
                            tmp_e.setMonth($date.date.strToDate().getMonth() + 6);
                            tmp_e.setDate(0);
                            this.end_date.date = tmp_e.dateToStr();
                        } else if (this.cType == 'year') {
                            tmp_e.setFullYear(tmp_s.getFullYear());
                            tmp_e.setDate(1);
                            tmp_e.setMonth(11);
                            tmp_e.setDate(31);
                            this.end_date.date = tmp_e.dateToStr();
                        }
                    } else {
                        // 현재 날짜가 end_date 이후가 아니라면, range를 기준으로 end_date 다시 계산
                        if (!this.endDateChange) {
                            const tmp_c = new Date($date.date + ' 00:00:00');

                            if (this.range?.toUpperCase().indexOf('Y') >= 0) {
                                tmp_c.setFullYear(tmp_c.getFullYear() + parseInt(this.range?.toUpperCase().split('Y')[0]));
                            } else if (this.range?.toUpperCase().indexOf('M') >= 0) {
                                tmp_c.setMonth(tmp_c.getMonth() + parseInt(this.range?.toUpperCase().split('M')[0]));
                            } else if (this.range?.toUpperCase().indexOf('W') >= 0) {
                                let sDateWeek = tmp_c.dateToStr().getWeekend();
                                let eDateWeek = tmp_c.dateToStr().getWeekend();
                                let gap = parseInt(this.range?.toUpperCase().split('W')[0]) - 1;
                                let dayGap = 6 - tmp_c.getDay();
                                if (eDateWeek - sDateWeek >= gap) gap -= 1;
                                tmp_c.setDate(tmp_c.getDate() + dayGap);
                                tmp_c.setDate(tmp_c.getDate() + gap * 7);
                            } else {
                                tmp_c.setDate(tmp_c.getDate() + parseInt(this.range) - 1);
                            }

                            if (tmp_c < tmp_e) {
                                this.eDateFix = true;
                                this.end_date.date = tmp_c.dateToStr();
                            }
                        }
                    }
                }

                if (this.isDateGrpClick || !this.completeBtn || this.isCtypeChange || (this.pDate && this.sDateFix)) {
                    if ($date.date !== this.s_date.date) {
                        this.$emit('update:s_date', $date);
                    }
                }
                this.sDateFix = false;
            },
            deep: true,
        },
        end_date: {
            handler($date) {
                if (!this.eDateFix) {
                    if (this.cType == 'week' && $date.date != $date.date.getDayDate(6)) {
                        this.eDateFix = true;
                        this.end_date.date = $date.date.getDayDate(6);
                        return;
                    }
                }
                if (this.hasEndDate && this.max_date && $date.date.strToDate() > this.max_date.strToDate()) {
                    this.eDateFix = true;
                    $date.date = this.max_date;
                    return;
                }

                const tmp_s = new Date(this.start_date.date + ' 00:00:00');
                const tmp_e = new Date($date.date + ' 00:00:00');
                if (tmp_s > tmp_e) {
                    if (this.cType == 'day' || this.cType == 'week') {
                        this.start_date = JSON.parse(JSON.stringify($date));
                    } else if (this.cType == 'month') {
                        tmp_s.setFullYear(tmp_e.getFullYear());
                        tmp_s.setDate(1);
                        tmp_s.setMonth($date.date.strToDate().getMonth());
                        this.start_date.date = tmp_s.dateToStr();
                    } else if (this.cType == 'quarter') {
                        tmp_s.setFullYear(tmp_e.getFullYear());
                        tmp_s.setDate(1);
                        tmp_s.setMonth($date.date.strToDate().getMonth());
                        this.start_date.date = tmp_s.dateToStr();
                    } else if (this.cType == 'half') {
                        tmp_s.setFullYear(tmp_e.getFullYear());
                        tmp_s.setDate(1);
                        tmp_s.setMonth($date.date.strToDate().getMonth() - 6);
                        this.start_date.date = tmp_s.dateToStr();
                    } else if (this.cType == 'year') {
                        tmp_s.setFullYear(tmp_e.getFullYear());
                        tmp_s.setDate(1);
                        tmp_s.setMonth(0);
                        this.start_date.date = tmp_s.dateToStr();
                    }

                    this.endDateChange = true;
                } else {
                    const tmp_c = new Date($date.date + ' 00:00:00');
                    if (this.range?.toUpperCase().indexOf('Y') >= 0) {
                        tmp_c.setFullYear(tmp_c.getFullYear() - parseInt(this.range?.toUpperCase().split('Y')[0]));
                    } else if (this.range?.toUpperCase().indexOf('M') >= 0) {
                        tmp_c.setMonth(tmp_c.getMonth() - parseInt(this.range?.toUpperCase().split('M')[0]));
                    } else if (this.range?.toUpperCase().indexOf('W') >= 0) {
                        let sDateWeek = tmp_c.dateToStr().getWeekend();
                        let eDateWeek = tmp_e.dateToStr().getWeekend();
                        let gap = parseInt(this.range?.toUpperCase().split('W')[0]) - 1;
                        let dayGap = tmp_c.getDay();
                        if (eDateWeek - sDateWeek >= gap) gap -= 1;
                        tmp_c.setDate(tmp_c.getDate() - dayGap);
                        tmp_c.setDate(tmp_c.getDate() - gap * 7);
                    } else {
                        tmp_c.setDate(tmp_c.getDate() - parseInt(this.range) + 1);
                    }

                    if (tmp_c > tmp_s) {
                        this.sDateFix = true;
                        this.start_date.date = tmp_c.dateToStr();
                    }

                    this.endDateChange = false;
                }

                if ((this.hasEndDate && !this.completeBtn) || this.isDateGrpClick || this.isCtypeChange || (this.eDateFix && this.pDate)) {
                    if ($date.date !== this.e_date.date) {
                        this.$emit('update:e_date', $date);
                    }
                }

                this.eDateFix = false;
            },
            deep: true,
        },
        c_type($val) {
            this.cType = $val;
        },
        cType($val, $before) {
            if (!$val) return;

            this.$emit('update:c_type', $val);

            if ($val == 'week') {
                this.sDateFix = true;
                this.eDateFix = true;
                this.start_date.date = this.start_date.date.getDayDate(0);
                this.end_date.date = this.end_date.date.getDayDate(6);
            } else if ($val == 'month') {
                this.sDateFix = true;
                this.eDateFix = true;
                this.start_date.date = this.start_date.date.getFirstDate();
                this.end_date.date = this.end_date.date.getLastDate();
            } else if ($val == 'quarter') {
                this.sDateFix = true;
                this.eDateFix = true;
                let sdate = new Date(this.start_date.date.strToDate());
                sdate.setMonth(parseInt(this.start_date.date.strToDate().getMonth() / 3) * 3);
                sdate = sdate.dateToStr();
                let edate = new Date(this.end_date.date.strToDate());
                edate.setMonth(parseInt(this.end_date.date.strToDate().getMonth() / 3) * 3 + 2);
                edate = edate.dateToStr();
                this.start_date.date = sdate.getFirstDate();
                this.end_date.date = edate.getLastDate();
            } else if ($val == 'half') {
                this.sDateFix = true;
                this.eDateFix = true;
                let sdate = new Date(this.start_date.date.strToDate());
                sdate.setMonth(parseInt(this.start_date.date.strToDate().getMonth() / 6) * 6);
                sdate = sdate.dateToStr();
                let edate = new Date(this.end_date.date.strToDate());
                edate.setMonth(parseInt(this.end_date.date.strToDate().getMonth() / 6) * 6 + 5);
                edate = edate.dateToStr();
                this.start_date.date = sdate.getFirstDate();
                this.end_date.date = edate.getLastDate();
            } else if ($val == 'year') {
                this.sDateFix = true;
                this.eDateFix = true;
                let sdate = new Date(this.start_date.date.strToDate());
                sdate.setDate(1);
                sdate.setMonth(0);
                sdate = sdate.dateToStr();
                let edate = new Date(this.end_date.date.strToDate());
                edate.setDate(1);
                edate.setMonth(11);
                edate.setDate(31);
                edate = edate.dateToStr();
                this.start_date.date = sdate.getFirstDate();
                this.end_date.date = edate.getLastDate();
            }

            this.isCtypeChange = true;
            if (this.cTypeTimer) clearTimeout(this.cTypeTimer);
            this.cTypeTimer = setTimeout(() => {
                this.isCtypeChange = false;
                this.cTypeTimer = null;
            }, 100);
        },
        active($val) {
            if ($val) {
                this.start_date = this.s_date ? JSON.parse(JSON.stringify(this.s_date)) : {};
                this.end_date = this.e_date ? JSON.parse(JSON.stringify(this.e_date)) : {};
            }
        },
        evtState($val) {
            if ($val) {
                clearTimeout(this.evtStateTimer);
                this.evtStateTimer = setTimeout(() => {
                    clearTimeout(this.evtStateTimer);
                    this.evtStateTimer = null;
                    this.evtState = null;
                }, 1000);
            }
        },
        pDate(val) {
            this.pDateChange();
        },
        pDateChk($val) {
            this.popChk = $val;
        },
        popChk($val) {
            this.$emit('update:pDateChk', $val);
            if ($val) this.pDateChange();
        },
    },
    methods: {
        pDateChange() {
            if (this.pDate) {
                // 이전 기간 달력 데이터가 있으면
                let tmp_s = this.pDate.s_date.date.strToDate();
                let tmp_e = this.pDate.e_date.date.strToDate();
                let gap = Math.ceil((tmp_e.getTime() - tmp_s.getTime()) / (1000 * 3600 * 24));
                tmp_e = new Date(tmp_s);
                tmp_e.setDate(tmp_e.getDate() - 1);
                tmp_s = new Date(tmp_e);
                tmp_s.setDate(tmp_s.getDate() - gap);

                let tmp_s_min = this.min_date.strToDate();
                let tmp_e_max = this.max_date.strToDate();
                if (tmp_s < tmp_s_min) tmp_s = tmp_s_min;
                if (tmp_e > tmp_e_max) tmp_e = tmp_e_max;

                let tmp_c = new Date(tmp_e);
                if (this.range?.toUpperCase().indexOf('Y') >= 0) {
                    tmp_c.setFullYear(tmp_c.getFullYear() - parseInt(this.range?.toUpperCase().split('Y')[0]));
                } else if (this.range?.toUpperCase().indexOf('M') >= 0) {
                    tmp_c.setMonth(tmp_c.getMonth() - parseInt(this.range?.toUpperCase().split('M')[0]));
                } else if (this.range?.toUpperCase().indexOf('W') >= 0) {
                    let sDateWeek = tmp_s.dateToStr().getWeekend();
                    let eDateWeek = tmp_c.dateToStr().getWeekend();
                    let gap = parseInt(this.range?.toUpperCase().split('W')[0]) - 1;
                    let dayGap = tmp_c.getDay();
                    if (eDateWeek - sDateWeek >= gap) gap -= 1;
                    tmp_c.setDate(tmp_c.getDate() - dayGap);
                    tmp_c.setDate(tmp_c.getDate() - gap * 7);
                } else {
                    tmp_c.setDate(tmp_c.getDate() - parseInt(this.range) - 1);
                }
                if (tmp_c > tmp_s) {
                    tmp_s = tmp_c;
                }

                // 최대 날짜 설정
                const maxDate = new Date(this.pDate.s_date.date.strToDate());
                maxDate.setDate(maxDate.getDate() - 1);

                this.$emit('update:max_date', maxDate.dateToStr());

                this.sDateFix = true;
                this.eDateFix = true;

                if (this.popChk) {
                    this.start_date.date = tmp_s.dateToStr();
                    this.end_date.date = tmp_e.dateToStr();
                } else {
                    tmp_s = new Date(this.pDate.s_date.date.strToDate());
                    tmp_e = new Date(this.pDate.e_date.date.strToDate());
                    let tmpSDate = this.start_date.date.strToDate();
                    let tmpEDate = this.end_date.date.strToDate();

                    if (tmp_s.getTime() <= tmpEDate.getTime()) {
                        tmp_s.setDate(tmp_s.getDate() - 1);
                        this.end_date.date = tmp_s.dateToStr();
                        tmpEDate = tmp_s;

                        if (tmpEDate.getTime() <= tmpSDate.getTime()) {
                            this.start_date.date = tmp_s.dateToStr();
                        }
                    }
                }
            }
        },
        evt_resizeScroll() {
            this.active = false;
        },
        evt_confirmClick() {
            this.popChk = false;
            this.active = false;
            this.$emit('update:s_date', this.start_date);
            if (this.hasEndDate) this.$emit('update:e_date', this.end_date);
            this.$emit('confirmClick');
        },
        evt_docClick(e) {
            if (this.$el !== e.target || !this.$el.contains(e.target)) {
                this.active = false;
            }
        },
        dateGrpClick($val) {
            this.clickGrpItem = $val;

            let eDate = new Date(this.curDate);
            let sDate = new Date(this.curDate);
            let tmpDate;

            this.cType = 'day';

            if (this.cType == 'week') {
                tmpDate = eDate.dateToStr().getDayDate(6);
                sDate = new Date(tmpDate.split('-')[0], tmpDate.split('-')[1] - 1, tmpDate.split('-')[2], 0, 0, 0);
                eDate = new Date(sDate);
            }

            if (String($val).toUpperCase().indexOf('Y') >= 0 && String($val).toUpperCase().indexOf('BY') < 0) {
                sDate.setFullYear(parseInt(String($val).split('Y')[0]));
                sDate.setDate(1);
                sDate.setMonth(0);
                if (this.e_date) {
                    eDate.setFullYear(parseInt(String($val).split('Y')[0]));
                    eDate.setMonth(11);
                    eDate.setDate(31);
                }
            } else if (String($val).toUpperCase().indexOf('BY') >= 0) {
                sDate.setFullYear(sDate.getFullYear() - parseInt(String($val).split('BY')[0]));
                if (this.e_date) sDate.setDate(eDate.getDate() + 1);
            } else if (String($val).toUpperCase().indexOf('BM') >= 0) {
                sDate.setMonth(sDate.getMonth() - parseInt(String($val).split('BM')[0]));
                if (this.e_date) sDate.setDate(eDate.getDate() + 1);
            } else if (String($val).toUpperCase().indexOf('M') >= 0 && String($val).toUpperCase().indexOf('BM') < 0) {
                sDate.setDate(1);
                sDate.setMonth(parseInt(String($val).split('M')[0]) - 1);
                if (this.e_date) {
                    eDate.setDate(1);
                    eDate.setMonth(parseInt(String($val).split('M')[0]));
                    eDate.setDate(eDate.getDate() - 1);
                }

                if (sDate > this.curDate) {
                    sDate.setFullYear(sDate.getFullYear() - 1);
                    eDate.setFullYear(eDate.getFullYear() - 1);
                }
            } else {
                sDate.setDate(sDate.getDate() - (parseInt($val) > 0 ? parseInt($val) - 1 : parseInt($val)));
            }

            if (sDate < new Date(this.min_date)) sDate = new Date(this.min_date);

            tmpDate = new Date(eDate);
            if (this.range?.toUpperCase().indexOf('Y') >= 0) {
                tmpDate.setFullYear(tmpDate.getFullYear() - parseInt(this.range?.toUpperCase().split('Y')[0]));
            } else if (this.range?.toUpperCase().indexOf('M') >= 0) {
                tmpDate.setMonth(tmpDate.getMonth() - parseInt(this.range?.toUpperCase().split('M')[0]));
            } else {
                tmpDate.setDate(tmpDate.getDate() - parseInt(this.range) + 1);
            }
            if (tmpDate > sDate) {
                sDate = tmpDate;
            }

            this.isDateGrpClick = true;
            if (this.dateGrpTimer) clearTimeout(this.dateGrpTimer);
            this.dateGrpTimer = setTimeout(() => {
                this.isDateGrpClick = false;
                this.dateGrpTimer = null;
            }, 100);

            this.$emit('update:s_date', { date: sDate.dateToStr() });
            if (this.hasEndDate) this.$emit('update:e_date', { date: eDate.dateToStr() });
        },
        getDateGrpActive($item) {
            if (!this.e_date || !this.e_date.date) return false;

            const eDate = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), this.curDate.getDate(), '0', '0', '0');
            const sDate = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), this.curDate.getDate(), '0', '0', '0');

            if (String($item).toUpperCase().indexOf('Y') >= 0 && String($item).toUpperCase().indexOf('BY') < 0) {
                sDate.setFullYear(parseInt(String($item).split('BY')[0]));
                sDate.setDate(1);
                sDate.setMonth(0);
                eDate.setFullYear(parseInt(String($item).split('BY')[0]));
                eDate.setMonth(11);
                eDate.setDate(31);
            } else if (String($item).toUpperCase().indexOf('BY') >= 0) {
                sDate.setFullYear(sDate.getFullYear() - parseInt(String($item).split('Y')[0]));
                sDate.setDate(eDate.getDate() + 1);
            } else if (String($item).toUpperCase().indexOf('M') >= 0 && String($item).toUpperCase().indexOf('BM') < 0) {
                sDate.setDate(1);
                sDate.setMonth(parseInt(String($item).split('M')[0]) - 1);
                sDate.setDate(1);
                eDate.setDate(1);
                eDate.setMonth(parseInt(String($item).split('M')[0]));
                eDate.setDate(0);
                // 월 선택시 max_date보다 eDate가 커도 active될 수 있게
                if (this.max_date != undefined && eDate > this.max_date.strToDate()) {
                    eDate.setDate(this.max_date.strToDate().getDate());
                }
            } else if (String($item).toUpperCase().indexOf('BM') >= 0) {
                sDate.setMonth(sDate.getMonth() - parseInt(String($item).split('BM')[0]));
                sDate.setDate(eDate.getDate() + 1);
            } else {
                if ($item > 0) sDate.setDate(sDate.getDate() - (parseInt($item) > 0 ? parseInt($item) - 1 : parseInt($item)));
            }

            return { sDate: sDate.dateToStr(), eDate: eDate.dateToStr() };
        },
        set_rePos() {
            if (this.active) {
                this.pos_top = $(this.$refs.input).offset().top - $(document).scrollTop() + $(this.$refs.input).outerHeight();
                this.pos_left = $(this.$refs.input).offset().left - $(document).scrollLeft();

                if (this.pos_top + $(this.$refs.calendars).outerHeight() > $(window).height()) this.pos_top -= $(this.$refs.calendars).outerHeight() + $(this.$refs.input).outerHeight() + 2;
                if (this.pos_left + $(this.$refs.calendars).outerWidth() > $(window).width()) this.pos_left -= $(this.$refs.calendars).outerWidth() - $(this.$refs.input).outerWidth();

                if (this.pos_top < 0) this.pos_top = $(this.$refs.input).offset().top - $(document).scrollTop() + $(this.$refs.input).outerHeight();
            }
        },
        evt_typeChange() {
            if (this.pDate && this.cType != 'day') this.popChk = false;
        },
        evt_dateSelected() {
            if (!this.completeBtn && !this.hasEndDate) {
                this.active = false;
            }
        },
    },
    directives: {
        // 달력 Insereted
        init: {
            inserted: function (el, binding, vnode) {
                vnode.context.set_rePos();
            },
        },
    },
};
</script>
