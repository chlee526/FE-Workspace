import request from '@shared/utils/request';
import { getCommonApiValidation } from '@/api/validation';

export function API_gender($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/getDataLabGender' + (!$param.excel ? '.jsp' : '_excel.jsp');

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: getCommonApiValidation(null, $param),
    });
}
