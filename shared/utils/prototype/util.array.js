/*!
 *
 * @author: RSN R&D Team LHS(GUNI)
 *			h2dlhs@realsn.com
 *
 *
 **/

import { shuffle, sum } from 'lodash';

// Shuffle
Array.prototype.shuffle = function () {
    return shuffle(this);
    // return this.sort(() => Math.random() - 0.5);
};

// Array to String
Array.prototype.arrToStr = function ($sep) {
    var arr = this;
    if (!$sep) $sep = ',';
    var result = '';
    arr.forEach((item, $idx) => {
        result += item;
        if ($idx < arr.length - 1) result += $sep;
    });
    return result;
};

// String to Array
String.prototype.strToArr = function ($sep) {
    if (!$sep) $sep = ',';
    var result = this.split($sep);
    return this.length ? result : [];
};

/**
 * JSON데이터 내에서 해당 속성의 값을 String형태로 반환
 * 상단검색조건 선택값 결과 표시할때 주로 사용
 * @param {*} $attr - 속성명
 * @param {*} $sep - 리턴 할때 구분값(기본: ,)
 * @param {*} $lim - Number(표시 제한 개수)
 * @returns {String}
 *      $lim = null
 *          - '1,2,3'
 *      $lim = '3'
 *          - 3개 초과: '1 외 3개'
 *          - 3개 이하: '1,2,3'
 *
 */
Array.prototype.arrObjAttrToStr = function ($attr, $sep, $lim) {
    if (!$sep) $sep = ',';
    var result = '';

    if ($lim) {
        var tmpArr = this.length > $lim ? this.slice(0, 1) : this.slice(0, $lim);
        var rest = this.length - tmpArr.length;
        tmpArr.filter(function ($item, $idx) {
            if ($item && $item[$attr]) {
                if (result.trim() != '') result += $sep;
                result += $item[$attr];
            }
        });
        return rest >= 1 ? result + ' 외 ' + String(rest) + '개' : result;
    } else {
        this.filter(function ($item, $idx) {
            if ($item && $item[$attr]) {
                if (result.trim() != '') result += $sep;
                result += $item[$attr];
            }
        });
        return result;
    }
};

// Array(Int) Sum
/**
 * Int형 데이터의 Sum 반환
 * @returns {Int}
 *
 * 2023-06-12 Lodash 기능으로 변경 > Lodash(sum) 사용 요망
 */
Array.prototype.arrCalcSum = function () {
    return sum(this);
    // return this.reduce(function (a, b) {
    //     return parseInt(a) + (parseInt(b) || 0);
    // }, 0);
};

/**
 * $key에 해당하는 조건과 매칭되는 데이터 반환
 * @param {*} $key JSON Object
 * @param {*} $returnNullCheck Null인경우 처리필요한 경우 true
 * @returns {Array}
 */
Array.prototype.getParseDatas = function ($key, $returnNullCheck) {
    var result = [];
    this.filter(function ($item) {
        if (!$item) return;
        var keyCnt = 0;
        var sameKeyCnt = 0;
        for (let key in $key) {
            key = String(key).trim();
            if ($key[key] != undefined && $key[key] != null) {
                if (typeof $key[key] == 'string') {
                    var tmp = $key[key].split(',');
                    tmp.filter(function ($item2) {
                        if ($item[key] == $item2) sameKeyCnt++;
                    });
                } else {
                    if ($item[key] == $key[key]) sameKeyCnt++;
                }
                keyCnt++;
            }
        }
        if (keyCnt != 0 && keyCnt == sameKeyCnt) result.push($item);
    });

    if (!$returnNullCheck) {
        return result;
    } else {
        return result.length > 0 ? result : null;
    }
};

/**
 * Json데이터 가장 상위 아이템 가져오기
 * code를 넘기면 해당 코드가 들어 있는 가장 상위 아이템 반환
 *
 * @param {String} $codeVal - 시퀀스 코드
 * @return {Object}
 */
Array.prototype.getRootData = function ($codeVal) {
    return this.filter(function ($item) {
        delete $item.useChkChildren;
        if ($item.code == $codeVal) return $item;
        else {
            if ($item.children) {
                $item.useChkChildren = true;
                if ($item.children.getRootData($codeVal).length) return $item;
            }
        }
    });
};

/**
 * Array 데이터 내 Object에서 속성 삭제후 리턴
 * @param {String} $attr - 속성명
 * @returns {Array}
 */
Array.prototype.delAttr = function ($attr) {
    var result = JSON.parse(JSON.stringify(this));
    return result.filter(function ($item) {
        delete $item[$attr];
        return $item;
    });
};

/**
 * JSON Array 데이터 내 Object에서 속성과 매칭되는 데이터 제외 후 리턴
 * @param {Object} $attr - 속성명
 * @returns {Array}
 */
Array.prototype.exptAttr = function ($attr) {
    var result = JSON.parse(JSON.stringify(this));
    var keys = Object.keys($attr);
    return result.filter(function ($item) {
        var chk = true;
        keys.forEach(function ($key) {
            if ($attr[$key].strToArr().includes($item[$key])) chk = false;
        });
        if (chk) return $item;
    });
};

/**
 * Array에 아이템이 있는지 체크 후 없으면 추가
 * Array안에 동일 아이템이 존재 할 수 없음
 * @param {*} $item - 추가할 아이템
 * @returns {Array}
 */
Array.prototype.addItem = function ($item) {
    var result = this;
    if (typeof $item == 'object') {
        let chk = false;
        this.forEach(($val) => {
            if (JSON.stringify($val) === JSON.stringify($item)) chk = true;
        });
        if (!chk) result.push($item);
    } else {
        if (!result.includes($item)) result.push($item);
    }
    return result;
};

/**
 * Array에 아이템이 있는지 체크 후 있으면 제거
 * @param {*} item - 제거할 아이템
 * @returns {Array}
 */
Array.prototype.removeItem = function (item) {
    if (!this.length) return this;
    let result = [];
    if (typeof item == 'object') {
        this.forEach((val) => {
            let chk = false;
            if (JSON.stringify(val) === JSON.stringify(item)) chk = true;
            if (Object.keys(item).length == 1) {
                const key = Object.keys(item)[0];
                if (val[key] === item[key]) chk = true;
            }
            if (!chk) result.push(val);
        });
    } else {
        result = JSON.parse(JSON.stringify(this));
        if (result.includes(item)) result.splice(result.indexOf(item), 1);
    }
    return result;
};

/**
 * Array Flat
 * 다중 JSON 형태의 노드 플랫화
 * @param {*} childNodeName 자식 Array노드 이름, 없으면 'children'
 * @returns {Array} 1차원 플랫 데이터
 */
Array.prototype.flatten = function (childNodeName) {
    const flattenArray = [];
    const children = childNodeName ? childNodeName : 'children';

    function flattenParser(arr, depth) {
        arr.forEach((item) => {
            const { children, ...rest } = item;
            const nodeWithDepth = { ...rest, use_level: depth };
            flattenArray.push(nodeWithDepth);
            if (children && children.length > 0) {
                flattenParser(children, depth + 1);
            }
        });
    }

    flattenParser(this, 1);
    return flattenArray;
};
