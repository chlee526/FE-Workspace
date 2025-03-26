import request from '@shared/utils/request';
import { merge } from 'lodash';

export function API_attrs(param) {
    let path = process.env.VUE_APP_BASE_API + process.env.VUE_APP_API_PATH_CODES;
    const qsParam = process.env.VUE_APP_API_PATH_CODES.split('?');
    let cloneParam = param ? JSON.parse(JSON.stringify(param)) : {};
    if (qsParam.length > 1) {
        path = process.env.VUE_APP_BASE_API + qsParam[0];
        merge(cloneParam, qsParam[1].queryStrToJson());
    }

    return request({
        url: path,
        method: 'post',
        data: cloneParam || {},
    });
}
