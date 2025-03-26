import request from '@shared/utils/request';

import store from '@/store';

/**
 * 사용자 인증 및 권한
 */
export function API_auth() {
    const path = process.env.VUE_APP_BASE_API + process.env.VUE_APP_API_PATH_AUTH;
    const isCheck = !store.getters.getRoutes.length ? false : true;
    const params = { isCheck: isCheck };

    return request({
        url: path,
        method: 'post',
        data: params,
    });
}
