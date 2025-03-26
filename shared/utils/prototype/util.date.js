/*!
 *
 * @author: RSN R&D Team LHS(GUNI)
 *			h2dlhs@realsn.com
 *
 *
 **/

// Date 체크
String.prototype.isDate = function () {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(this);
    // return new Date(this) !== 'Invalid Date' && !isNaN(new Date(this));
};

/**
 * 날짜 > 텍스트 변환
 * @param {String} $sep 구분자
 * @param {String} $format 날짜포멧(YYYY-MM-DD)
 * @returns {String} 2000-01-01
 */
Date.prototype.dateToStr = function ($sep, $format) {
    if (!$sep) $sep = '-';
    const tmpDate = new Date(this);
    const year = tmpDate.getFullYear();
    const month = (tmpDate.getMonth() + 1).numAddZero();
    const date = tmpDate.getDate().numAddZero();
    const hour = tmpDate.getHours().numAddZero();
    const min = tmpDate.getMinutes().numAddZero();
    const sec = tmpDate.getSeconds().numAddZero();

    if ($format) {
        const resultDate = [];
        const resultTime = [];
        if ($format.includes('YYYY')) resultDate.push(year);
        if ($format.includes('MM')) resultDate.push(month);
        if ($format.includes('DD')) resultDate.push(date);
        if ($format.includes('hh')) resultTime.push(hour);
        if ($format.includes('mm')) resultTime.push(min);
        if ($format.includes('ss')) resultTime.push(sec);
        return resultTime ? `${resultDate.join($sep)} ${resultTime.join(':')}` : resultDate.join($sep);
    } else {
        return [year, month, date].join($sep);
    }
};
String.prototype.dateToStr = function ($sep, $format) {
    return new Date(this).dateToStr($sep, $format);
};

/**
 * String(YYYY-MM-DD hh:mm:ss) -> Date
 * @returns {Date}
 */
String.prototype.strToDate = function () {
    let result;
    let split = this.split(' ');
    if (split.length > 1) result = new Date(split[0].split('-')[0], split[0].split('-')[1] - 1, split[0].split('-')[2], split[1].split(':')[0], split[1].split(':')[1], split[1].split(':')[2]);
    else result = new Date(split[0].split('-')[0], split[0].split('-')[1] - 1, split[0].split('-')[2], 0, 0, 0);
    return result;
};

// 날짜/시간 > 날짜만
String.prototype.dateToOnlyDate = function () {
    return this ? this.split(' ')[0] : '';
};

// 날짜 계산
/**
 * gap만큼의 날짜를 더하거나 뺀 날짜 반환
 * @param {*} $gap
 * @returns {String}
 */
String.prototype.dateCalculator = function ($gap) {
    $gap = String($gap);
    const tmpDate = new Date(this);
    let gap;
    if ($gap.toUpperCase().indexOf('Y') >= 0) {
        gap = parseInt($gap.toUpperCase().split('Y')[0]);
        tmpDate.setFullYear(tmpDate.getMonth() + gap);
    } else if ($gap.toUpperCase().indexOf('M') >= 0) {
        gap = parseInt($gap.toUpperCase().split('M')[0]);
        tmpDate.setMonth(tmpDate.getMonth() + gap);
    } else {
        gap = parseInt($gap);
        tmpDate.setDate(tmpDate.getDate() + gap);
    }
    return tmpDate.getFullYear() + '-' + (tmpDate.getMonth() + 1).numAddZero() + '-' + tmpDate.getDate().numAddZero();
};
Date.prototype.dateCalculator = function ($gap) {
    return this.dateToStr().dateCalculator($gap);
};

// 해달날짜 1일로 변경
String.prototype.getFirstDate = function () {
    var date = this.strToDate();
    date.setDate(1);
    return date.dateToStr();
};
Date.prototype.getFirstDate = function () {
    return this.dateToStr().getFirstDate();
};
// 해달날짜 마지막일로 변경
String.prototype.getLastDate = function () {
    var date = this.strToDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date.dateToStr();
};
Date.prototype.getLastDate = function () {
    return this.dateToStr().getLastDate();
};

// 해당날짜 포함 주의 요일로 날짜 구하기(기본:0(일요일))
String.prototype.getDayDate = function ($day) {
    $day = $day ? $day : 0;
    var paramDate = new Date(this + ' 00:00:00');
    while (String(paramDate.getDay()) != String($day)) {
        if (paramDate.getDay() < $day) paramDate.setDate(paramDate.getDate() + 1);
        else paramDate.setDate(paramDate.getDate() - 1);
    }
    return paramDate.dateToStr();
};
Date.prototype.getDayDate = function (day) {
    return this.dateToStr().getDayDate(day);
};

// 주차계산
String.prototype.getWeekend = function () {
    var date = this.strToDate();
    var tmpDate = new Date(date.getFullYear(), 0, 1);
    var firstDate = new Date(tmpDate.dateToStr().getDayDate().split('-')[0], tmpDate.dateToStr().getDayDate().split('-')[1] - 1, tmpDate.dateToStr().getDayDate().split('-')[2], 0, 0, 0);

    var getWeekFirstDate = new Date(date.dateToStr().getDayDate().split('-')[0], date.dateToStr().getDayDate().split('-')[1] - 1, date.dateToStr().getDayDate().split('-')[2], 0, 0, 0);

    var curDate = new Date(date);
    var curDateNext = new Date(getWeekFirstDate);
    curDateNext.setDate(curDateNext.getDate() + 6);

    var result = Math.floor((curDate - firstDate) / (1000 * 3600 * 24) / 7) + 1;

    if (getWeekFirstDate.getFullYear() != curDateNext.getFullYear()) result = 1;

    return result;
};
Date.prototype.getWeekend = function () {
    return this.dateToStr().getWeekend();
};

/**
 * 'yyyy-mm-dd' 형태의 날짜를 입력 받아 주차(yyyy-ww)로 반환
 * @returns {String} YYYY-WW
 */
String.prototype.getWeekendToStr = function () {
    let date = this.strToDate();

    const getWeekFirstDate = new Date(date.dateToStr().getDayDate().split('-')[0], date.dateToStr().getDayDate().split('-')[1] - 1, date.dateToStr().getDayDate().split('-')[2], 0, 0, 0);

    const curDateNext = new Date(getWeekFirstDate);
    curDateNext.setDate(curDateNext.getDate() + 6);

    if (getWeekFirstDate.getFullYear() != curDateNext.getFullYear() && date.getFullYear() !== curDateNext.getFullYear()) {
        return date.getFullYear() + 1 + '-' + 'W' + Number(this.getWeekend()).numAddZero();
    } else {
        return date.getFullYear() + '-' + 'W' + Number(this.getWeekend()).numAddZero();
    }
};

/**
 * 24시간 표기법 to 12시간 표기법 변환
 */
String.prototype.time24to12 = function ($format) {
    if (!this) return '';
    if (!$format) $format = 'HH:MM:SS';

    let result = '';
    let hour = parseInt(this.split(':')[0]);
    const min = this.split(':').length > 1 ? parseInt(this.split(':')[1]) : null;
    const sec = this.split(':').length > 2 ? parseInt(this.split(':')[2]) : null;
    const ampm = hour >= 12 ? 'PM' : 'AM';

    if (hour > 12) hour -= 12;
    if (hour == 0) hour = 12;

    result = getZero(hour);
    if (min != null && $format.indexOf('MM') >= 0) result += ':' + getZero(min);
    if (sec != null && $format.indexOf('SS') >= 0) result += ':' + getZero(sec);
    if ($format.indexOf('HH:MM:SS') >= 0) result += ' ' + ampm;

    return result;

    function getZero($val) {
        return $val < 10 ? '0' + $val : $val;
    }
};

/**
 *
 * @param {Object} $date  {s_date: {date: '2022-01-05'}, e_date: {date: '2022-01-10'}}
 * @returns {Object} {s_date: {date: '2022-01-05'}, e_date: {date: '2022-01-10'}, ps_date: {date: '2022-01-01'}, pe_date: {date: '2022-01-04'}}
 */
export const getDatePOP = ($date) => {
    var result = {
        ps_date: $date.s_date,
        pe_date: $date.e_date,
    };
    var gap = ($date.e_date.date.strToDate().getTime() - $date.s_date.date.strToDate().getTime()) / (1000 * 3600 * 24) - 1;
    var eDate = $date.s_date.date.strToDate();
    eDate.setDate(eDate.getDate() - 1);
    result.pe_date = { date: eDate.dateToStr() };
    eDate.setDate(eDate.getDate() - gap - 1);
    result.ps_date = { date: eDate.dateToStr() };
    return result;
};
