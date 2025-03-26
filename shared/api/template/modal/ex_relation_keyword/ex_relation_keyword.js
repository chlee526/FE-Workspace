import request from '@shared/utils/request';
import { getCommonApiValidation } from '@/api/validation';

export function API_ExRelationKeywordList($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/getExRelationKeywordList.jsp';

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: getCommonApiValidation('exRelKeyword', $param),
    });
}

export function API_saveExRelationKeyword($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/saveExRelationKeyword.jsp';

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: getCommonApiValidation('exRelKeyword', $param),
    });
}

export function API_delExRelationKeyword($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/delExRelationKeyword.jsp';

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: getCommonApiValidation('exRelKeyword', $param),
    });
}
