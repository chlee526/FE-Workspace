<template>
    <div class="ui_calendar" :class="{ 'is-time': getTimeUse }">
        <div class="date_wrap">
            <div class="year">{{ getDate_year }}</div>
            <div class="month_date" v-html="getDate_month.numAddZero() + '-' + getDateRenderText"></div>
            <div class="day">{{ getDate_day }}요일</div>
        </div>
        <div ref="dp_wrap" class="calendar_wrap" v-init></div>
        <div class="time_wrap" v-if="getTimeUse">
            <comp-timepicker :id="id + 'tpc'" v-model="date.time" :box-mode="true" :minutes-set="minuteEdit" :seconds-set="secondEdit"></comp-timepicker>
        </div>
        <div class="btns_grp">
            <div class="lc">
                <button type="button" class="ui_btn is-icon-only is-small" title="이전년도" @click.prevent="prev_year()" :disabled="getPrevYearDisabled"><span class="icon">&#xe003;</span></button>
                <button type="button" class="ui_btn is-icon-only is-small" title="이전달" @click.prevent="prev_month()" :disabled="getPrevMonthDisabled"><span class="icon">&#xe001;</span></button>
            </div>
            <div class="rc">
                <button type="button" class="ui_btn is-icon-only is-small" title="다음달" @click.prevent="next_month()" :disabled="getNextMonthDisabled"><span class="icon">&#xe000;</span></button>
                <button type="button" class="ui_btn is-icon-only is-small" title="다음년도" @click.prevent="next_year()" :disabled="getNextYearDisabled"><span class="icon">&#xe002;</span></button>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import CompTimePicker from '@shared/ui/form/timepicker';

export default {
    name: 'comp-datepicker-calendar',
    data() {
        return {
            dp: null,
            date_mtd: new Date(this.value),
            data_months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            data_days: ['일', '월', '화', '수', '목', '금', '토'],
        };
    },
    props: {
        id: {},
        value: {},
        mindate: {},
        maxdate: {},
        hgt: {},
        minuteEdit: {},
        secondEdit: {},
        type: {},
        otherDateStart: {},
        otherDateEnd: {},
    },
    components: {
        'comp-timepicker': CompTimePicker,
    },
    computed: {
        date: {
            get() {
                return this.value;
            },
            set($val) {
                this.$emit('input', $val);
            },
        },
        getTimeUse() {
            return this.date && this.date.time ? true : false;
        },
        getDate() {
            return this.date && this.date.date;
        },
        getTime() {
            return this.date.time ? this.date.time : '';
        },
        getDate_year() {
            const tmp = new Date(this.getDate);
            return tmp.getFullYear();
        },
        getDate_month() {
            const tmp = new Date(this.getDate);
            return tmp.getMonth() + 1;
        },
        getDate_date() {
            const tmp = new Date(this.getDate);
            return tmp.getDate();
        },
        getDate_day() {
            const tmp = new Date(this.getDate);
            return this.data_days[tmp.getDay()];
        },
        getPrevYearDisabled() {
            return new Date(this.getDate).getFullYear() == new Date(this.mindate).getFullYear();
        },
        getPrevMonthDisabled() {
            return new Date(this.getDate).getFullYear() == new Date(this.mindate).getFullYear() && new Date(this.getDate).getMonth() == new Date(this.mindate).getMonth();
        },
        getNextMonthDisabled() {
            return new Date(this.getDate).getFullYear() == new Date(this.maxdate).getFullYear() && new Date(this.getDate).getMonth() == new Date(this.maxdate).getMonth();
        },
        getNextYearDisabled() {
            return new Date(this.getDate).getFullYear() == new Date(this.maxdate).getFullYear();
        },
        getOtherDate() {
            if (this.otherDateStart) return new Date(this.otherDateStart.split('-')[0], this.otherDateStart.split('-')[1] - 1, this.otherDateStart.split('-')[2], 0, 0, 0);
            if (this.otherDateEnd) return new Date(this.otherDateEnd.split('-')[0], this.otherDateEnd.split('-')[1] - 1, this.otherDateEnd.split('-')[2], 0, 0, 0);
            return null;
        },
        getDateRenderText() {
            let result = Number(this.getDate_date).numAddZero();
            if (this.type == 'week') result += '<span class="small_txt">(' + this.date.date.getDayDate(0).getWeekend() + '주)</span>';
            return result;
        },
    },
    mounted() {
        if (this.type == 'week') {
            this.date = this.value;
        }
        this.dp = $(this.$refs.dp_wrap);
        this.dp
            .datepicker({
                dateFormat: 'yy-mm-dd',
                monthNames: this.data_months,
                dayNamesMin: this.data_days,
                minDate: this.mindate,
                maxDate: this.maxdate,
                onSelect: this.dp_Select,
                showOtherMonths: true,
                selectOtherMonths: true,
                showWeek: this.type == 'week' ? true : false,
                weekHeader: '#',
                calculateWeek: function ($date) {
                    const result = $date.dateToStr().getWeekend();
                    return '<span>' + result + '</span>';
                },
            })
            .datepicker('setDate', this.getDate);
    },
    watch: {
        date: {
            handler($val) {
                this.date_mtd = new Date($val.date);
                this.dp.datepicker('setDate', $val.date);
                this.reDraw_range();
            },
            deep: true,
        },
        calTime($val) {
            this.date = {
                date: this.getDate,
                time: Number($val).numAddZero() + ':00:00',
            };
        },
        mindate($val) {
            if ($val) this.dp.datepicker('option', 'minDate', $val);
        },
        maxdate($val) {
            if ($val) this.dp.datepicker('option', 'maxDate', $val);
        },
        otherDateStart() {
            this.reDraw_range();
        },
        otherDateEnd() {
            this.reDraw_range();
        },
    },
    methods: {
        dp_Select($date) {
            const tmp = {
                date: $date,
            };
            if (this.getTimeUse) tmp.time = this.getTime;
            this.date = tmp;
            this.$emit('selected');
        },
        prev_year() {
            this.dp.datepicker('setDate', 'c-1y');
            const tmp = {
                date: this.dp.datepicker('getDate').dateToStr(),
            };
            if (this.getTimeUse) tmp.time = this.getTime;
            this.date = tmp;
        },
        prev_month() {
            this.dp.datepicker('setDate', 'c-1m');
            const tmp = {
                date: this.dp.datepicker('getDate').dateToStr(),
            };
            if (this.getTimeUse) tmp.time = this.getTime;
            this.date = tmp;
        },
        next_year() {
            this.dp.datepicker('setDate', 'c+1y');
            const tmp = {
                date: this.dp.datepicker('getDate').dateToStr(),
            };
            if (this.getTimeUse) tmp.time = this.getTime;
            this.date = tmp;
        },
        next_month() {
            this.dp.datepicker('setDate', 'c+1m');
            const tmp = {
                date: this.dp.datepicker('getDate').dateToStr(),
            };
            if (this.getTimeUse) tmp.time = this.getTime;
            this.date = tmp;
        },
        reDraw_range() {
            if (!this.otherDateStart && !this.otherDateEnd) return;

            const _this = this;

            $(this.$refs.dp_wrap).find('.ui-datepicker-calendar tbody').find('th, td').removeClass('is-range').removeClass('is-range-start').removeClass('is-range-end');
            $(this.$refs.dp_wrap)
                .find('.ui-datepicker-calendar tbody')
                .find('th, td')
                .each(function () {
                    let itemDate = new Date($(this).data('year'), $(this).data('month'), $(this).text(), 0, 0, 0);
                    let sDate, eDate;

                    if (_this.otherDateStart) {
                        sDate = _this.getOtherDate;
                        eDate = _this.getDate.strToDate();
                    } else {
                        sDate = _this.getDate.strToDate();
                        eDate = _this.getOtherDate;
                    }
                    if (itemDate.getTime() >= sDate.getTime() && itemDate.getTime() <= eDate.getTime()) {
                        $(this).addClass('is-range');
                        if (this.type == 'week') $(this).parent().find('> *:first-child').addClass('is-range');
                        if (itemDate.dateToStr() == sDate.dateToStr()) $(this).addClass('is-range-start');
                        if (itemDate.dateToStr() == eDate.dateToStr()) $(this).addClass('is-range-end');
                    }
                });
        },
    },
    directives: {
        // 달력 Insereted
        init: {
            inserted(el, binding, vnode) {
                setTimeout(() => {
                    vnode.context.reDraw_range();
                }, 10);
            },
        },
    },
};
</script>
