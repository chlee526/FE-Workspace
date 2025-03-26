import request from '@shared/utils/request';

// 즐겨찾기 추가
export function API_addFavorites($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/addFavoritesMemberSearchKeyword' + (!$param.excel ? '.jsp' : '_excel.jsp');

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: $param,
    });
}

// 즐겨찾기 제거
export function API_delFavorites($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/delFavoritesMemberSearchKeyword' + (!$param.excel ? '.jsp' : '_excel.jsp');

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: $param,
    });
}
