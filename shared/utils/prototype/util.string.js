/*!
 *
 * @author: RSN R&D Team LHS(GUNI)
 *			h2dlhs@realsn.com
 *
 *
 **/
import { merge } from 'lodash';

import store from '../../store';

/**
 * 텍스트 치환
 * @param {*} $bTxt 치환 전 텍스트
 * @param {*} $aTxt 치환 후 텍스트
 * @returns {String} 변환된 텍스트
 */
String.prototype.replaceAll = function ($bTxt, $aTxt) {
    const regexp = new RegExp($bTxt, 'g');
    return this.replace(regexp, $aTxt);
};

/**
 * 말줄임
 * @param {*} $limit 최대 글자 수
 * @returns {String} 최대 글자 수 뒤에 '...'붙여서 반환
 */
String.prototype.lengthLimit = function ($limit) {
    let result = this;
    if ($limit && result.length > $limit) result = result.substring(0, $limit) + '...';
    return result;
};

/**
 * 쿼리스트링을 JSON형태로 반환
 * @returns {Object}
 */
String.prototype.queryStrToJson = function () {
    let query_string = {};
    const vars = this.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        pair[0] = decodeURIComponent(pair[0]);
        pair[1] = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[pair[0]] === 'undefined') {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === 'string') {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
};

/**
 * 감성 코드를 아이콘 감성 클래스로 반환
 * @returns {String}
 */
String.prototype.sentiToIcoClass = function () {
    if (this.indexOf('1') >= 0) return 'is-positive';
    else if (this.indexOf('2') >= 0) return 'is-negative';
    else return 'is-neutral';
};

/**
 * 텍스트에서 특수문자 치환
 *
 * @returns String
 */
String.prototype.strEscape = function () {
    return String(this).replace(/[&<>"'`=()/]/g, function (s) {
        return '\\' + s;
    });
};
String.prototype.strUnEscape = function () {
    return String(this).replace(/\/]/g, '');
};

/**
 * trim, ZeroWidthSpace 제거
 * @returns {String}
 */
String.prototype.escapeSpace = function () {
    return String(this)
        .trim()
        .replaceAll(/(^[\s\u200b]*|[\s\u200b]*$)/g, '');
};

/**
 * 개행 문자 유니코드를 공백 또는 replacement 로 치환
 * @param {String} replacement 바뀔 텍스트
 */
String.prototype.replaceGap = function (replacement) {
    replacement = replacement == undefined ? ' ' : replacement;
    const sentence = String(this);
    const regex = /\\r\\n|\\n\\r|\\n|\\r/g;

    return sentence.replace(/\\+(?=\\)/g, '').replace(regex, replacement);
};

/**
 * 클립보드 copy
 * @param {Boolean} useNoty 클립보드 복사 성공/실패 Noty 노출 여부 - 설정 시 성공여부 return 안함
 * @return {Boolean, undefined} useNoty 설정 시 return 값 없음
 */
String.prototype.copyClipBoard = async function (useNoty) {
    let result = false;
    const copyTxt = this;

    // 클립보드 API 지원안될 때(deprecated)
    const copyFallback = () => {
        const tempInput = document.createElement('input');
        tempInput.setAttribute('type', 'text');
        tempInput.value = copyTxt;

        tempInput.style.opacity = 0;
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';

        document.body.appendChild(tempInput);
        tempInput.select();
        result = document.execCommand('copy');
        document.body.removeChild(tempInput);
    };

    // 클립보드 API
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard
                .writeText(copyTxt)
                .then(() => {
                    result = true;
                })
                .catch(() => {
                    throw new Error();
                });
        } else {
            throw new Error();
        }
    } catch (error) {
        copyFallback();
    }

    if (!useNoty) return result;
    else {
        if (result) store.noty.actions.NOTY_COM({}, '클립보드에 복사되었습니다.');
        else store.noty.actions.NOTY_ERR({}, '클립보드 복사를 실패 했습니다.');
    }
};

/**
 * HTML간접 표현식이 들어간 문자열 데이터를 특수기호로 변환해서 반환
 * @returns
 */
String.prototype.decodeHTMLEntities = function () {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = this;
    return textArea.value;
};

/**
 * 쿼리스트링 URL을 path와 data로 분리
 * @param {String} APIURL
 * @param {Object} param
 * @returns {Object} {data, path}
 */
export const parseQueryString = (APIURL, param) => {
    const queryString = APIURL.split('?');
    const data = param ? structuredClone(param) : {};

    const result = { data: data, path: process.env.VUE_APP_BASE_API + APIURL };

    if (queryString.length > 1) {
        result.path = process.env.VUE_APP_BASE_API + queryString[0];
        result.data = merge(data, queryString[1].queryStrToJson());
    }

    return result;
};

/**
 * HTML 태그로 이루어진 문자열에서 텍스트만 추출
 * @returns {String} 추출된 텍스트
 */
String.prototype.getHtmlTextToStr = function () {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = this;
    return tempElement.textContent || tempElement.innerText || '';
};
