import request from '@shared/utils/request';

export function API_popupList($param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/getPopupList.jsp';
    return request({
        url: path,
        method: 'post',
        data: {},
    });
}
