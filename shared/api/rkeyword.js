import request from '@shared/utils/request';

import { getCommonApiValidation } from '@/api/validation';

const apiPath = process.env.VUE_APP_BASE_API;

export function API_rkeywordGroupAdd($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '';

    console.log(path + '경로로 통신중 .....');

    // return request({
    //     id: $id,
    //     url: path,
    //     method: 'post',
    //     data: getCommonApiValidation('rk', $param),
    // });
}

export function API_rkeywordGroupUpdate($id, $param) {
    console.log('키워드 동작 코드 === >', $param);
}

// 속성 미사용 연관키워드
export function API_rkeyword($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/getRelationKeywordList' + (!$param.excel ? '.jsp' : '_excel.jsp');

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: getCommonApiValidation('rk', $param),
    });
}

// 속성 사용 연관키워드
export function API_rkeywordWithAttr($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/getRelationKeywordListAttr' + (!$param.excel ? '.jsp' : '_excel.jsp');

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: getCommonApiValidation('rk', $param),
    });
}

// 라이프사이클
export function API_rkeywordWithDLab($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/getRelationKeywordListDLab' + (!$param.excel ? '.jsp' : '_excel.jsp');

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: getCommonApiValidation('rk', $param),
    });
}
