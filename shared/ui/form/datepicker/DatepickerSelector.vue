<template>
    <div class="ui_calendar">
        <div class="date_wrap">
            <div class="year">{{ getDate_year }}</div>
            <div class="month_date">{{ data_months[getDate_month] }}-{{ Number(getDate_date).numAddZero() }}</div>
            <div class="day">{{ getDate_day }}요일</div>
        </div>
        <div ref="dp_wrap" class="calendar_wrap is-selector">
            <div class="btns_grp" v-if="type !== 'year'">
                <div class="lc">
                    <button type="button" class="ui_btn is-icon-only is-small" title="이전년도" @click.prevent="prev_year" :disabled="getPrevYearDisabled"><span class="icon">&#xe001;</span></button>
                </div>
                <span class="title">{{ year }}</span>
                <div class="rc">
                    <button type="button" class="ui_btn is-icon-only is-small" title="다음년도" @click.prevent="next_year" :disabled="getNextYearDisabled"><span class="icon">&#xe000;</span></button>
                </div>
            </div>
            <div class="selector_wrap">
                <button type="button" v-for="(item, idx) in getOpts" :key="idx" :class="{ 'is-checked': ischecked(item) }" :style="setButtonWidth" :disabled="item.disabled" @click="selectValue(item)">
                    <span>{{ item.name }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'comp-datepicker-selector',
    data() {
        return {
            isFirst: true,
            curDate: new Date(),
            maxRange: 5,
            data_months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            data_days: ['일', '월', '화', '수', '목', '금', '토'],
            year: '',
            month: '',
            quarter: '',
            half: '',
            minDate: this.mindate ? this.mindate.strToDate() : null,
            maxDate: this.maxdate ? this.maxdate.strToDate() : null,
        };
    },
    props: ['id', 'value', 'mindate', 'maxdate', 'type', 'calType'],
    computed: {
        date: {
            get() {
                return this.value;
            },
            set($val) {
                this.$emit('input', $val);
            },
        },
        getDateToDate() {
            return this.date.date.strToDate();
        },
        getDate() {
            return this.date.date;
        },
        getDate_year() {
            return this.getDateToDate.getFullYear();
        },
        getDate_month() {
            return this.getDateToDate.getMonth();
        },
        getDate_date() {
            return this.getDateToDate.getDate();
        },
        getDate_day() {
            return this.data_days[this.getDateToDate.getDay()];
        },
        getPrevYearDisabled() {
            if (this.mindate) {
                return new Date(this.getDate).getFullYear() == new Date(this.mindate).getFullYear();
            } else {
                // 최소날짜가 정해져 있지 않으면 현재일로부터 5년까지 제공
                return new Date(this.getDate).getFullYear() == this.getYearList[0].code;
            }
        },
        getNextYearDisabled() {
            if (this.maxdate) {
                return new Date(this.getDate).getFullYear() == new Date(this.maxdate).getFullYear();
            } else {
                // 최대날짜가 정해져 있지 않으면 현재일로부터 5년까지 제공
                return new Date(this.getDate).getFullYear() == this.getYearList[this.getYearList.length - 1].code;
            }
        },
        getYearList() {
            const opts = [];
            const loopLimit = this.minDate ? this.maxDate.getFullYear() - this.minDate.getFullYear() + 1 : this.maxRange;

            for (let Loop1 = 0; Loop1 < loopLimit; ++Loop1) {
                if (this.minDate && this.minDate.getFullYear() > this.curDate.getFullYear() - Loop1) continue;
                if (this.maxDate && this.maxDate.getFullYear() < this.curDate.getFullYear() - Loop1) continue;
                opts.push({ code: this.curDate.getFullYear() - Loop1, name: this.curDate.getFullYear() - Loop1 + '년' });
            }
            return opts.reverse();
        },
        getMonthList() {
            const opts = [];
            for (let Loop1 = 0; Loop1 < 12; ++Loop1) {
                if (this.minDate && this.minDate.getFullYear() >= this.year && this.minDate.getMonth() > Loop1) {
                    opts.push({ code: Loop1, name: this.data_months[Loop1] + '월', disabled: true, year: this.year });
                    continue;
                }
                if (this.maxDate && this.maxDate.getFullYear() <= this.year && this.maxDate.getMonth() < Loop1) {
                    opts.push({ code: Loop1, name: this.data_months[Loop1] + '월', disabled: true, year: this.year });
                    continue;
                }
                opts.push({ code: Loop1, name: this.data_months[Loop1] + '월', disabled: false, year: this.year });
            }
            return opts;
        },
        getQuarterList() {
            const opts = [];
            for (let Loop1 = 0; Loop1 < 4; ++Loop1) {
                if (this.minDate && this.minDate.getFullYear() >= this.year && this.minDate.getMonth() + 1 > (Loop1 + 1) * 3) {
                    opts.push({ code: Loop1, name: Loop1 + 1 + '분기', disabled: true, year: this.year });
                    continue;
                }
                if (this.maxDate && this.maxDate.getFullYear() <= this.year && Math.ceil((this.maxDate.getMonth() + 1) / 3) <= Loop1) {
                    opts.push({ code: Loop1, name: Loop1 + 1 + '분기', disabled: true, year: this.year });
                    continue;
                }
                opts.push({ code: Loop1, name: Loop1 + 1 + '분기', disabled: false, year: this.year });
            }
            return opts;
        },
        getHalfList() {
            const opts = [];
            for (let Loop1 = 0; Loop1 < 2; ++Loop1) {
                // 최대 날짜가 현재 연도의 하반기 이전이면 disabled
                if (this.maxDate && this.maxDate.getFullYear() <= this.year && this.maxDate.getMonth() + 1 < 6 && Loop1 == 1) {
                    opts.push({ code: Loop1, name: '하반기', disabled: true, year: this.year });
                    continue;
                }
                opts.push({ code: Loop1, name: Loop1 == 0 ? '상반기' : '하반기', disabled: false, year: this.year });
            }
            return opts;
        },
        getOpts() {
            let opts = [];
            switch (this.type) {
                case 'month':
                    opts = this.getMonthList;
                    break;
                case 'quarter':
                    opts = this.getQuarterList;
                    break;
                case 'half':
                    opts = this.getHalfList;
                    break;
                case 'year':
                    opts = this.getYearList;
                    break;
            }
            return opts;
        },
        setButtonWidth() {
            let style = '';
            if (this.getOpts.length >= 4) {
                style = 'width: calc((100% - (5px * 3)) / 4);';
            } else {
                style = `width: calc((100% - (5px * ${this.getOpts.length - 1})) / ${this.getOpts.length});`;
            }
            return style;
        },
    },
    created() {
        this.year = this.getDate_year;
        this.month = this.getDate_month;
        this.quarter = Math.floor(this.getDate_month / 3);
        this.half = Math.floor(this.getDate_month / 6);
    },
    watch: {
        date: {
            handler() {
                if (this.year != this.getDate_year) {
                    this.year = this.getDate_year;
                }
                if (this.type == 'month') {
                    this.month = this.getDate_month;
                }
                if (this.type == 'quarter') {
                    this.quarter = parseInt(this.getDate_month / 3);
                }
                if (this.type == 'half') {
                    this.half = parseInt(this.getDate_month / 6);
                }
            },
            deep: true,
        },
        year($val) {
            if (!$val || this.isFirst) return false;

            const date = new Date(this.getDateToDate);
            date.setFullYear($val);
            date.setMonth(0);
            date.setDate(1);

            if (this.calType != 'start') {
                date.setMonth(11);
                date.setDate(31);
            }
            this.date = {
                date: date.dateToStr(),
            };
        },
        month($val) {
            if (this.isFirst) return;

            const date = new Date(this.getDateToDate);
            if (this.calType != 'start') {
                date.setMonth($val + 1);
                date.setDate(0);
            } else {
                date.setMonth($val);
                date.setDate(1);
            }
            this.date = {
                date: date.dateToStr(),
            };
        },
        quarter($val) {
            if (this.isFirst) return;

            const date = new Date(this.getDateToDate);
            date.setDate(1);
            date.setMonth($val * 3);
            if (this.calType != 'start') {
                date.setMonth(date.getMonth() + 3);
                date.setDate(0);
            }
            this.date = {
                date: date.dateToStr(),
            };
        },
        half($val) {
            if (this.isFirst) {
                this.isFirst = false;
                return;
            }

            const date = new Date(this.getDateToDate);
            date.setDate(1);
            date.setMonth($val * 6);
            if (this.calType != 'start') {
                date.setMonth(date.getMonth() + 6);
                date.setDate(0);
            }
            this.date = {
                date: date.dateToStr(),
            };
        },
    },
    methods: {
        prev_year() {
            this.year = --this.year;
        },
        next_year() {
            this.year = ++this.year;
        },
        selectValue(item) {
            switch (this.type) {
                case 'year':
                    this.year = item.code;
                    break;
                case 'month':
                    this.month = item.code;
                    break;
                case 'quarter':
                    this.quarter = item.code;
                    break;
                case 'half':
                    this.half = item.code;
                    break;
            }
        },
        ischecked(item) {
            if (this.type === 'year') {
                return item.code === this.getDate_year;
            } else {
                return item.code === this[this.type];
            }
        },
    },
};
</script>
