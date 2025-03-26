import request from '@shared/utils/request';
import { parseQueryString } from '@shared/utils/prototype/util.string';

export async function API_helperList(id, param) {
    const result = parseQueryString(process.env.VUE_APP_API_PATH_HELPER_LIST, param);

    return request({
        id: id,
        url: result.path,
        method: 'post',
        data: { ...param, cmd: result.data.cmd },
    });
}

export async function API_helperDetail(id, param) {
    const result = parseQueryString(process.env.VUE_APP_API_PATH_HELPER, param);

    return request({
        id: id,
        url: result.path,
        method: 'post',
        data: { ...param, cmd: result.data.cmd },
    });
}

export async function API_helperCUD(id, param) {
    const result = parseQueryString(process.env.VUE_APP_API_PATH_HELPER_CUD, param);

    return request({
        id: id,
        url: result.path,
        method: 'post',
        data: { ...param, cmd: result.data.cmd },
    });
}
