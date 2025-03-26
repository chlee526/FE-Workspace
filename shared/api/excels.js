import request from '@shared/utils/request';
import merge from 'lodash/merge';

/**
 * 쿼리스트링 URL을 path와 data로 분리
 * @param {String} APIURL
 * @param {Object} param
 * @returns {Object} {data, path}
 */
const parseQueryString = (url, param) => {
    const queryString = url.split('?');
    const data = param ? structuredClone(param) : {};

    const result = { data: data, path: process.env.VUE_APP_BASE_API + url };

    if (queryString.length > 1) {
        result.path = process.env.VUE_APP_BASE_API + queryString[0];
        result.data = merge(data, queryString[1].queryStrToJson());
    }

    return result;
};

// 엑셀 다운로드 key or link
export function API_excel($id, $param) {
    const path = process.env.VUE_APP_BASE_API + process.env.VUE_APP_API_PATH_EXCEL;

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: $param || {},
    });
}

// 엑셀 다운로드 목록 or 진행상태
export function API_excels($id, $param) {
    const result = parseQueryString(process.env.VUE_APP_API_PATH_EXCEL_LIST, $param);

    return request({
        id: $id,
        url: result.path,
        method: 'post',
        data: result.data || {},
    });
}

// 엑셀 다운로드 삭제
export function API_delExcels($id, $param) {
    const result = parseQueryString(process.env.VUE_APP_API_PATH_EXCEL_REMOVE, $param);

    return request({
        id: $id,
        url: result.path,
        method: 'post',
        data: result.data || {},
    });
}
