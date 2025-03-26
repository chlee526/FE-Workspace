import request from '@shared/utils/request';

export function API_lately($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/getMemberSearchKeyword' + (!$param.excel ? '.jsp' : '_excel.jsp');

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: $param,
    });
}
