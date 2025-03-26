/*!
 *
 * @author: RSN R&D Team LHS(GUNI)
 *			h2dlhs@realsn.com
 *
 **/

/**
 * 숫자인지 확인후 데이터 : 0 반환
 * @returns {Number}
 */
Number.prototype.isNum = function () {
    return /[-+]?[0-9]*\.?[0-9]+/.test(this) ? parseFloat(this) : 0;
};
String.prototype.isNum = function () {
    return /[-+]?[0-9]*\.?[0-9]+/.test(this) ? parseFloat(this) : 0;
};

/**
 * 숫자에 ,(콤마) 포함 및 축약(제한 자릿수 이상부터 축약)
 * @param {*} $digits 소수점 표현 자릿수(default: 1)
 * @param {*} $limit 해당 자릿수 이상일 경우 축약(default: 8)
 * @returns {String}
 */
Number.prototype.lengthLimitComma = function ($digits, $limit) {
    const digits = $digits == null || $digits == undefined ? 1 : $digits;
    const limit = $limit == null || $limit == undefined ? 8 : $limit;

    if (String(this).split('.')[0].length <= limit) {
        if (String(this).indexOf('.') >= 0 || $digits) return String(this.toFixed(digits)).addComma();
        else return String(this).addComma();
    }

    var si = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (this >= si[i].value) {
            break;
        }
    }
    return (this / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};
String.prototype.lengthLimitComma = function ($digits, $limit) {
    return this.isNum().lengthLimitComma($digits, $limit);
};

/**
 * 데이터에 3자리마다 ,(콤마) 포함
 * @returns {String}
 */
Number.prototype.addComma = function () {
    return String(this).addComma();
};
String.prototype.addComma = function () {
    var txtNumber = '' + this;
    if (isNaN(txtNumber) || txtNumber == '') {
        //alert("숫자만 입력 하세요");
        return;
    } else {
        var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
        var arrNumber = txtNumber.split('.');
        arrNumber[0] += '.';
        do {
            arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
        } while (rxSplit.test(arrNumber[0]));

        if (arrNumber.length > 1) {
            return arrNumber.join('');
        } else {
            return arrNumber[0].split('.')[0];
        }
    }
};

/**
 * 숫자 limit(10) 미만일 때 0 더하기
 * @param {*} digit
 * @returns
 */
Number.prototype.numAddZero = function (digit) {
    if (!digit) digit = 2;
    var result = String(this);

    if (result.length < digit) {
        var len = digit - result.length;
        for (var Loop1 = 0; Loop1 < len; ++Loop1) {
            result = '0' + result;
        }
    }

    return result;
};
String.prototype.numAddZero = function (digit) {
    return this.isNum().numAddZero(digit);
};

// 등락
Number.prototype.numToFluc = function ($unit, $limit) {
    var state = '';
    var val = Math.abs(this);
    if (this > 0) {
        state = '▲';
    } else if (this < 0) {
        state = '▼';
    }
    val = $limit ? val.lengthLimitComma($limit) : String(val).addComma();
    return state + val + ($unit ? (this != 0 ? $unit : '') : '');
};
Number.prototype.numToFlucHtml = function ($unit, $limit) {
    var state = '';
    var val = Math.abs(this);
    if (this > 0) {
        state = 'up';
    } else if (this < 0) {
        state = 'down';
    }
    val = $limit ? val.lengthLimitComma() : String(val).addComma();
    // return '<span class="is-' + state + '">' + val + ($unit ? (parseInt(this) != 0 ? $unit : '') : '') + '</span>';
    return '<span class="is-' + state + '">' + val + ($unit ? $unit : '') + '</span>';
};
